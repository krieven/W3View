'use strict';

const factoryLoader = (function () {

  const WAITING = 'WAITING'
  const READY = 'READY'

  const status = {}

  /**
   * 
   * {
   *    src: {
   *       imports:[{name, src, type}],
   *       registry: {
   *          name: prep
   *       } | {src, raw, evaluated},
   *        src: string
   *    }
   * }
   * 
   */
  const modules = {}
  /**
   * object[src] = Map<appContext:any, factory:W3View>
   */
  const prepared = {}

  const readyHandler = {}

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
    readyHandler[src]?.forEach((handler) => handler(modules[src]))
    readyHandler[src] = []
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

  /**
   * Загружает модуль в modules и стартует загрузку зависимостей,
   * если модуль уже в статусе READY то сразу вызывает onModuleReady
   * @param {*} src - нормализованный путь к источнику
   * @param {*} reader - filereader | httpreader
   * @param {*} onModuleReady - получает модуль из modules
   * @param {*} path - путь в дереве зависимостей до загружаемого модуля (исключительно)
   */
  function loadModule(src, reader, onModuleReady, path) {
    path = path || []
    if (status[src] === READY || path.indexOf(src) > -1) {
      onModuleReady(modules[src])
      return
    }
    readyHandler[src] = readyHandler[src] || []
    readyHandler[src].unshift(onModuleReady)
    if (status[src] === WAITING) {
      return
    }
    path.push(src)
    status[src] = WAITING
    reader(src, (response) => {
      let factory = new W3View()
      factory.src = reader.showSrc && src
      factory = factory.parse(response)
      if (typeof factory === 'string') {
        modules[src] = makeJsModule(response, reader.showSrc && src)
        toReady(src)
        return
      }
      modules[src] = { imports: factory.imports, registry: factory.getRegistry(), src: reader.showSrc && src }

      if (!factory.imports || !factory.imports.length) {
        toReady(src)
        return
      }
      factory.imports.forEach(
        imp => {
          const msrc = reader.makeSrc(src, imp.src)
          loadModule(msrc, reader, (mod) => {
            if (modules[src].imports
              .every(i => path.indexOf(i.src) > -1 || status[i.src] === READY)) {
              toReady(src)
            }
          }, path.slice())
        }
      )
    })
  }

  /**
   * Загрузчик модуля и его зависимостей, передаёт в колбэк инициализированную контекстом фабрику компонентов
   * 
   * @param {*} appContext - контекст приложения
   * @param {string} src - путь к источнику
   * @param {httpreader | filereader} reader - читатель источника
   * @param {(factory: W3View) => void} onload - колбэк
   */
  return function factoryLoader(appContext, src, reader, onload) {
    src = reader.makeSrc(src)
    loadModule(src, reader, (mod) => {
      onload(makePrepared(src, appContext))
    })
  }
})()

if (typeof module !== 'undefined' && typeof require === 'function') {
  var W3View = require('../w3view.js') || W3View;
  module.exports = factoryLoader;
}