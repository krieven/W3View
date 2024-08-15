'use strict';
/**
   * Загрузчик модуля и его зависимостей, передаёт в колбэк инициализированную контекстом фабрику компонентов
   * Кэширует загруженные модули и инициализированные фабрики
   * 
   * @param {*} appContext - контекст приложения
   * @param {string} src - путь к источнику
   * @param {httpreader | filereader} reader - читатель источника
   * @param {(factory: W3View) => void} onload - колбэк
   * 
   * @property loadModules - то-же, что и factoryLoader, но для сборщика, не нужен appContext и в onload передаёт загруженные модули
   */
const factoryLoader = (function () {

  const WAITING = 'WAITING'
  const READY = 'READY'

  const status = {}
  const roots = {}
  const readyHandler = {}

  const modules = {}
  const prepared = {}

  function makeJsModule(source, src) {
    return {
      raw: source,
      evaluated: new Function('var module = {};\n' +
        source +
        '\nreturn module.exports;\n' +
        (src ? '//# sourceURL=W3View.JS:///' + src : ''))(),
      src: src
    }
  }

  function toReady(src) {
    status[src] = READY
    while (readyHandler[src]?.length) {
      readyHandler[src].pop()(modules[src])
    }
  }

  function makePrepared(src, context) {
    if (status[src] !== READY) {
      return
    }
    prepared[src] = prepared[src] || new Map()
    if (prepared[src].has(context)) {
      return prepared[src].get(context)
    }
    const module = modules[src]
    if (module.evaluated) {
      prepared[src].set(context, module)
      return prepared[src].get(context)
    }
    const factory = new W3View(context).setRegistry(module.registry)
    prepared[src].set(context, factory)

    module.imports?.forEach(item =>
      factory.putModule(item.name, makePrepared(item.src, context), item.type)
    )

    return prepared[src].get(context)
  }

  function loadModule(src, reader, onModuleReady) {
    let count = 0
    const root = src

    function load(src, reader, onload) {

      if (status[src] === READY) {
        return onload(modules[src])
      }

      readyHandler[src] = readyHandler[src] || []
      if (status[src] === WAITING) {
        roots[src] !== root && count++
        readyHandler[src].push((mod) => {
          roots[src] !== root && count--
          onload(mod)
        })
        return
      }
      readyHandler[src].push(onload)
      status[src] = WAITING
      roots[src] = root
      count++
      reader(src, (response) => {
        count--
        let factory = new W3View()
        factory.src = reader.showSrc && src
        factory = factory.parse(response)
        if (typeof factory === 'string') {
          modules[src] = makeJsModule(response, reader.showSrc && src)
          return toReady(src)
        }
        modules[src] = { imports: factory.imports, registry: factory.getRegistry(), src: reader.showSrc && src }
        if (!factory.imports?.length) {
          return toReady(src)
        }
        factory.imports.forEach(
          imp => {
            const msrc = reader.makeSrc(src, imp.src)
            load(msrc, reader, (mod) => {
              !count && toReady(src)
            })
          }
        )
      })
    }
    load(src, reader, onModuleReady)
  }

  function factoryLoader(appContext, src, reader, onload) {
    src = reader.makeSrc(src)
    loadModule(src, reader, (mod) => {
      onload(makePrepared(src, appContext))
    })
  }

  factoryLoader.loadModules = function (src, reader, onload) {
    src = reader.makeSrc(src)
    loadModule(src, reader, (mod) => {
      const extracted = {}
      const extract = (src) => {
        if (!extracted[src]) {
          extracted[src] = modules[src]
          modules[src]?.imports?.forEach(imp => extract(reader.makeSrc(src, imp.src)))
        }
      }
      onload(src, extract(src) || extracted)
    })
  }

  return factoryLoader
})()

if (typeof module !== 'undefined' && typeof require === 'function') {
  var W3View = require('../w3view.js') || W3View;
  module.exports = factoryLoader;
}