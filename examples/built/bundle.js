function w3view(appContext){var factory=[(function(appContext){
return new W3View(appContext)
.setRegistry({"WIN":{"prep":{"tgn":"DIV","as":"win","attr":{"as":"win","style":"position:fixed;\n\t\t\t\t\t\t\t border:1px solid black;\n\t\t\t\t\t\t\t padding:5px;\n\t\t\t\t\t\t\t background-color: #cccccc;\n\t\t\t\t\t\t\t box-shadow: 5px 5px 5px rgba(0,0,0,0.3);\n\t\t\t\t\t\t\t "},"ch":[{"tgn":"DIV","attr":{"ref":"topbar","style":"padding:5px 10px;\n\t\t\t\t\t\tbackground-color:blue;color:#fff;\n\t\t\t\t\t\tfont-weight:bold;\n\t\t\t\t\t\tcursor:move;"},"ch":[{"tgn":"SPAN","attr":{"ref":"caption"},"ch":["caption"]},{"tgn":"BUTTON","attr":{"ref":"close","style":"float:right;cursor:pointer;\n\t\t\t\t\t\t\tpadding:0px 5px;\n\t\t\t\t\t\t\tborder:1px solid #fff;\n\t\t\t\t\t\t\tbackground-color:#f00;\n\t\t\t\t\t\t\tvertical-align:middle;color:#fff; font-weight:bold;"},"ch":["X"]},{"tgn":"DIV","attr":{"style":"clear:both;"},"ch":[]}]},{"tgn":"DIV","attr":{"ref":"content","style":"padding:10px;width:400px; min-width: 300px; min-height:150px;border:1px solid gray;\n\t\t\t\t\t\tbackground-color:white;box-sizing: border-box; overflow:auto;"},"ch":[]},{"tgn":"DIV","attr":{"ref":"bottombar"},"ch":[{"tgn":"DIV","attr":{"ref":"resize","style":"float:right;\n\t\t\t\t\t\t\tpadding:5px;\n\t\t\t\t\t\t\tmargin:5px;\n\t\t\t\t\t\t\tcursor:se-resize;\n\t\t\t\t\t\t\tborder-width:0px 2px 2px 0px;\n\t\t\t\t\t\t\tborder-color: black;\n\t\t\t\t\t\t\tborder-style: solid;\n\t\t\t\t\t\t\t"},"ch":[]}]}],"script":function anonymous(appContext,factory,document
/**/) {


					this.ref.close.onclick=this.close=function(e){
						e.stopPropagation();
						if(this.onclose && !this.onclose()){
							return;
						}
						this.unmount();
					}.bind(this);
					
					this.onmousedown = this.ref.topbar.onclick = this.ref.resize.onclick = function(){
						this.pop();
					}.bind(this);
					
					this.pop=function(){
						this.mount(this.parentElement);
					}.bind(this);

					var sx, sy, sh, sw, st, sl;
					
					var onDown=function(event){
						event.stopPropagation();
						sx=event.clientX; sy=event.clientY;
						sh=this.ref.content.offsetHeight;
						sw=this.ref.content.offsetWidth;
						sl=this.offsetLeft;
						st=this.offsetTop;
					}.bind(this);

					function onMouseDown(action){
						return function(e){
							onDown(e);
							window.addEventListener('mousemove',action);
							window.addEventListener('mouseup',function up(){
								window.removeEventListener('mousemove',action);
								window.removeEventListener('mouseup',up);
							});
						};
					}

					var resize=function(e){
						e.preventDefault();
						this.ref.content.style.width =  (sw+e.clientX-sx)+'px';
						this.ref.content.style.height =  (sh+e.clientY-sy)+'px';
						if(this.ref.content.onresize) this.ref.content.onresize();
						return false;
					}.bind(this);

					this.ref.resize.onmousedown = onMouseDown(resize);

					var move=function(e){
						e.preventDefault();
						var left = (sl+e.clientX-sx);
						this.style.left =  (left)+'px';
						var top = (st+e.clientY-sy);
						this.style.top =  (top<0?0:top)+'px';
						return false;
					}.bind(this);

					this.ref.topbar.onmousedown = onMouseDown(move);

					this.onSetData=function(input){
						this.ref.caption.innerText=input.caption;
						this.ref.content.innerHTML=input.content;
						return false;
					};
					
					this.ref.caption.innerText=this.getAttribute('caption');
				
//# sourceURL=W3View:///win
}}},
"MODALWIN":{"prep":{"tgn":"DIV","as":"modalwin","attr":{"as":"modalwin","style":"position:fixed; \n\t\t\t\twidth:100%; height:100%; \n\t\t\t\tleft:0px; top:0px;\n\t\t\t\tpadding-left:30%;\n\t\t\t\tpadding-top:30vh;\n\t\t\t\tbackground-color:rgba(0,0,0,0.5);\n\t\t\t\t"},"ch":[{"tgn":"WIN","attr":{"ref":"modal","caption":"modal window"},"ch":[{"tgn":"HELLO:DOUBLE-HELLO-WORLD","attr":{},"ch":["\n\t\t\t\t\t\tHey! i am \"modal\" popup win, what is your name?\n\t\t\t\t\t\t",{"tgn":"DIV","attr":{"ref":"content"},"ch":[]}]},{"tgn":"DIV","attr":{"style":"text-align:right;"},"ch":[{"tgn":"BUTTON","attr":{"ref":"close"},"ch":["Close"]}]}]}],"script":function anonymous(appContext,factory,document
/**/) {


					this.ref.modal.onclose=function(){
						this.unmount();
					}.bind(this);
					this.ref.close.onclick=function(e){
						this.ref.modal.close(e);
					}.bind(this);

					this.ref.modal.pop=function(){};

					this.onSetData=function(data){
						this.ref.modal.caption.innerText=data.caption;
						this.ref.content.innerHTML=data.content;
					}
				
//# sourceURL=W3View:///modalwin
}}},
"EXT-WIN":{"prep":{"tgn":"WIN","as":"ext-win","attr":{"as":"ext-win","caption":"extended window","usetag":"a"},"ch":[{"tgn":"DIV","attr":{},"ch":["\n\n\n\t\t\t\tHelloooo! this window is EXT-WIN instance",{"tgn":"BR","attr":{},"ch":[]},"\n\t\t\t\tEXT-WIN - is extended win\n\n\n\t\t\t\t"]},{"tgn":"BUTTON","attr":{"style":"display:block;width:100%;margin-top:30px;","ref":"zcaption"},"ch":["\n\t\t\t\t\tBUTTON\n\t\t\t\t"]}],"script":function anonymous(appContext,factory,document
/**/) {


					var pcolor;
					var capt = this.ref.caption.innerHTML;
					this.ref.content.addEventListener('mouseover', function(e){
						pcolor=e.target.style.backgroundColor;
						e.target.style.backgroundColor="#cccccc";
						this.ref.caption.innerText=e.target.tagName+" "+capt;
					}.bind(this));
					this.ref.content.addEventListener('mouseout', function(e){
						e.target.style.backgroundColor=pcolor || '';
						this.ref.caption.innerText=capt;
					}.bind(this));
				
//# sourceURL=W3View:///ext-win
}}},
"GRID-WIN":{"prep":{"tgn":"WIN","as":"grid-win","attr":{"as":"grid-win","caption":"window with grid"},"ch":[{"tgn":"GRID:APP","attr":{"style":"height:100%;min-height: 150px;","ref":"grid"},"ch":[]}],"script":function anonymous(appContext,factory,document
/**/) {


					this.onMount = function(){this.ref.grid.mount(this); this.onMount=function(){};}
				
//# sourceURL=W3View:///grid-win
}}},
"APP":{"prep":{"tgn":"DIV","as":"app","attr":{"as":"app"},"ch":[{"tgn":"BUTTON","attr":{"ref":"button"},"ch":["open win"]},{"tgn":"BUTTON","attr":{"ref":"button1"},"ch":["open modal win"]},{"tgn":"BUTTON","attr":{"ref":"button2"},"ch":["open grid-win"]},{"tgn":"BUTTON","attr":{"ref":"button3"},"ch":["open ext-win"]}],"script":function anonymous(appContext,factory,document
/**/) {


					this.ref.button.onclick=function(){
						var win=factory.create('win');
						win.onclose=function(){ win.destroy(); };
						win.mount(this.parentElement);
						win.setData({
							caption:'I am popup win', 
							content:"<h1>Hello popup</h1><p>This popup was generated by W3View.</p>"+
							"<p>You can move and resize this popup window.</p>"+
							"<p>You can click first button again to open new instances.</p>"+
							"<p>Now is <b>"+new Date()+"</b></p>"
						});
						return false;
					};
					this.ref.button1.onclick=function(){
					if(!this.win){
							this.win=factory.create('modalwin');
						}
						this.win.mount(this.parentElement);
						return false;
					};
					this.ref.button2.onclick=function(){
						var win=factory.create('grid-win');
						win.onclose=function(){ this.destroy(); };
						win.mount(this.parentElement);
						return false;
					};

					this.ref.button3.onclick=function(){
						var win=factory.create('ext-win');
						win.onclose=function(){ win.destroy(); };
						win.mount(this.parentElement);					
						return false;
					};
				
//# sourceURL=W3View:///app
}}}});
})(appContext),(function(appContext){
return new W3View(appContext)
.setRegistry({"TBL":{"prep":{"tgn":"DIV","as":"tbl","attr":{"as":"tbl","style":"box-sizing:border-box;border:1px solid black;\n        width:100%;height:100%;\n        padding:0px 20px 0px 0px;"},"ch":[{"tgn":"DIV","attr":{"style":"float:left;width:100%;height:100%;overflow:hidden;min-height:150px;"},"ch":[{"tgn":"ARRAY-ITERATOR","attr":{"usetag":"table","ref":"tb","border":"1","style":"width:100%;height:100%;min-height:150px;overflow:hidden;"},"ch":[{"tgn":"ROW","attr":{},"ch":[]}]}]},{"tgn":"DIV","attr":{"style":"float:left;height:100%;width:0px;overflow:visible;"},"ch":[{"tgn":"SCROLLBAR","attr":{"ref":"scroll","style":"width:20px; height: 100%; min-height:150px;\n            border:1px solid black;"},"ch":[]}]}],"script":function anonymous(appContext,factory,document
/**/) {



          var data = {};
          this.onSetData=function(input){
            data = input || {list:[]};
            data.len = Math.round(this.parentElement.offsetHeight/30);
            data.offset = data.offset>(data.list.length-data.len)?(data.list.length-data.len):data.offset;
            if(data.offset+data.len > data.list.length) data.offset=data.list.length-data.len;
            if(data.offset < 0) data.offset=0;
            
            var frame=data.list.slice(data.offset,data.offset+data.len);
            this.ref.tb.setData(frame);
            this.ref.scroll.setData({app:this, data:data});
          };

          var resize = this.onresize =  function(){
            this.setData(data);
          }.bind(this);

          var keyDown=function(e){
            var sh={38:+1, 40:-1}[e.keyCode];
            if(sh !== undefined){
              if(!e.ctrlKey && !e.altKey && !e.shiftKey) e.preventDefault(); 
              else return;
              data.offset-=sh;
              this.setData(data);
            }
          }.bind(this);

          this.ref.tb.onwheel =function(e){
            e.preventDefault();
            if(e.deltaY>0){
              data.offset++;
            } else{
              data.offset--;
            }
            this.setData(data);
            return false;
          }.bind(this);
          
          this.onMount = function(){
            // window.addEventListener('resize',resize);
            // window.addEventListener('keydown',keyDown);
          };

          this.onUnmount = function(){
            // window.removeEventListener('resize',resize);
            // window.removeEventListener('keydown',keyDown);
          };
          
        
//# sourceURL=W3View:///tbl
}}},
"ROW":{"prep":{"tgn":"tr","as":"row","attr":{"as":"row","super":"array-iterator","tagname":"tr"},"ch":[{"tgn":"CELL","attr":{},"ch":[]}],"super":"array-iterator","script":function anonymous(appContext,factory,document
/**/) {


            var superSetData = this.onSetData.bind(this);

            this.onSetData=function(data){
              superSetData(data);
              if(data[0]%3===0){
                this.style.backgroundColor="#ccffcc";
              }
              else{
                this.style.backgroundColor="";
              }
            };

          
//# sourceURL=W3View:///row
}}},
"CELL":{"prep":{"tgn":"DIV","as":"cell","attr":{"as":"cell","usetag":"td","style":"text-align:center;width:10%;"},"ch":[],"script":function anonymous(appContext,factory,document
/**/) {



          this.onSetData=function(data){
            this.innerText=data;
          };

        
//# sourceURL=W3View:///cell
}}},
"SCROLLBAR":{"prep":{"tgn":"DIV","as":"scrollbar","attr":{"as":"scrollbar"},"ch":[{"tgn":"DIV","attr":{"ref":"scroller","style":"cursor:pointer;position:relative;\n          width:100%; height:100px;\n          min-height:20px;top:0px;\n          border:2px solid black;\n          background-color:#999999;margin-top:0px;"},"ch":[]}],"script":function anonymous(appContext,factory,document
/**/) {


          var app = {}, data = {};
          var hh = 0;

          this.onSetData=function(input){
            data = input.data;
            app = input.app;
            var h=data.len/data.list.length*this.offsetHeight;
            this.ref.scroller.style.height=(h)+'px';
            hh=this.ref.scroller.offsetHeight-h;
            this.ref.scroller.style.top=(data.offset/data.list.length*(this.offsetHeight-hh))+'px';
          };
          var downAt = 0;
          var offsetAt = 0;

          var scrolling = this.ref.scroller.onmousedown=function (e){
            downAt = e.clientY;
            offsetAt = data.offset;
            document.body.addEventListener('mousemove', onmousemove);
            document.body.addEventListener('mouseup', onmouseup);
          };

          var onmouseup=function(e){
            document.body.removeEventListener('mousemove', onmousemove);
            document.body.removeEventListener('mouseup', onmouseup);
          };

          var onmousemove=function(e){
            e.preventDefault();
            var eY=e.clientY;
            if(downAt<0) {eY=e.offsetY;}
            var dy = Math.round((eY-downAt)/(this.offsetHeight-hh)*data.list.length);
            
            var offset = offsetAt+dy;
            app.setData({list:data.list, offset:offset});
            return false;
          }.bind(this);

          this.onmousedown = function(e){
            if(e.target !== this) return;
            offsetAt=0;
            downAt=-1;
            onmousemove(e);
          };

        
//# sourceURL=W3View:///scrollbar
}}},
"APP":{"prep":{"tgn":"DIV","as":"app","attr":{"as":"app"},"ch":[{"tgn":"TBL","attr":{"ref":"table"},"ch":[]}],"script":function anonymous(appContext,factory,document
/**/) {


          var data=[];
          for(var i =0; i<1000; i++){
            data.push([i, '10'+i,  '20'+i, '30'+i, '40'+i, i, '10'+i,  '20'+i, '30'+i, '40'+i]);
          }
          this.onresize = function(){
            this.ref.table.onresize();
          }
          this.onMount=function(){
            this.ref.table.setData({list:data, offset:0});
            this.parentElement.onresize=this.onresize.bind(this);
          };
        
//# sourceURL=W3View:///app
}}}});
})(appContext),(function(appContext){
return new W3View(appContext)
.setRegistry({"SLIDER":{"prep":{"tgn":"DIV","as":"slider","attr":{"as":"slider","min":"0","max":"1","value":"0"},"ch":[{"tgn":"DIV","attr":{"style":"padding:20px;border:1px solid black;"},"ch":[{"tgn":"DIV","attr":{"ref":"bar","style":"height:10px;border:1px solid black;"},"ch":[{"tgn":"DIV","attr":{"style":"position:relative;height:0px;width:0px","ref":"mover"},"ch":[{"tgn":"DIV","attr":{"style":"position:absolute;margin:-10px 0 0 -10px;width:20px; height:30px;border:1px solid black;background-color:gray;"},"ch":[]}]}]}]}],"script":function anonymous(appContext,factory,document
/**/) {


          var value;
          var max, min, defValue;
          this.onSetData=function(data){
            min = parseInt(this.getAttribute('min') || "0", 10);
            max = parseInt(this.getAttribute('max') || "1", 10);
            defValue = parseInt(this.getAttribute('value') || "0",10);
            
            value = parseInt(data,10); if (isNaN(value)) value=defValue;

            value = (value<min)?min:value;
            value = (value>max)?max:value;

            this.ref.mover.style.left = (100*(value - min) / (max - min)) + "%";

            this.onchange(value);
          };
          this.ref.bar.onclick=function(e){
            e.stopPropagation();
            if(e.target===this.ref.bar)
              this.setData((max-min)/this.ref.bar.offsetWidth*e.offsetX);
          }.bind(this);
          var downAt, valueAt;
          var moverOnmousemove = function(e){
            e.preventDefault(); e.stopPropagation();
            var shift = e.clientX-downAt;
            var v = valueAt + shift*(max-min)/this.ref.bar.offsetWidth;
            this.setData(v);
            return false;
          }.bind(this);
          var moverOnmouseup = function(e){
            window.removeEventListener('mousemove', moverOnmousemove);
            window.removeEventListener('mouseup', moverOnmouseup);
          };
          this.ref.mover.onmousedown = function(e){
            downAt = e.clientX;
            valueAt = value;
            window.addEventListener('mousemove', moverOnmousemove);
            window.addEventListener('mouseup', moverOnmouseup);
          };
          this.onchange=function(value){};
          this.getValue=function(){
            return value;
          };
          this.setData();
        
//# sourceURL=W3View:///slider
}}},
"COLOR-CHOOSER":{"prep":{"tgn":"DIV","as":"color-chooser","attr":{"as":"color-chooser","style":"box-sizing:border-box;"},"ch":[{"tgn":"H1","attr":{"ref":"content","col":"2"},"ch":[]},{"tgn":"SLIDER","attr":{"ref":"slider","min":"0","max":"255","value":"128","style":"background-color:white;","col":"8"},"ch":[]},{"tgn":"INPUT","attr":{"type":"text","ref":"value","col":"2","style":"text-align:right;height:50px;\n          font-size:40px;overflow:visible;border:0;\n          border-bottom:5px solid green;min-width:100px;padding:0px 10px;"},"ch":[]},{"tgn":"CLEAR","attr":{},"ch":[]}],"script":function anonymous(appContext,factory,document
/**/) {


          this.ref.slider.onchange = function(value){this.ref.value.value = value; this.onchange(value);}.bind(this);
          
          this.ref.value.onchange = function(e){
            e.stopPropagation();
            this.ref.slider.setData(this.ref.value.value);
          }.bind(this);

          this.ref.value.onkeydown = function(e){
            var sh={38:+1, 40:-1,37000:-1,39000:+1}[e.keyCode];
            if(sh !== undefined){
              if(!e.ctrlKey && !e.altKey && !e.shiftKey) e.preventDefault(); else return;
              this.setData(this.ref.value.value*1+sh);
            }
          }.bind(this);

          this.onSetData = function(value){
            this.ref.slider.setData(value);
          };
          
          this.getValue = function(){return this.ref.slider.getValue();};

          this.onchange=function(value){};

          this.setData(this.getValue());
        
//# sourceURL=W3View:///color-chooser
}}},
"RGB-CHOOSER":{"prep":{"tgn":"DIV","as":"rgb-chooser","attr":{"as":"rgb-chooser","style":"border:1px solid black; padding:20px;"},"ch":[{"tgn":"COLOR-CHOOSER","attr":{"ref":"red"},"ch":["Red"]},{"tgn":"COLOR-CHOOSER","attr":{"ref":"green"},"ch":["Green"]},{"tgn":"COLOR-CHOOSER","attr":{"ref":"blue"},"ch":["Blue"]},{"tgn":"CLEAR","attr":{},"ch":[]}],"script":function anonymous(appContext,factory,document
/**/) {



          this.getValue=function(){
            return "rgb("+this.ref.red.getValue()+
                    ","+this.ref.green.getValue()+
                    ","+this.ref.blue.getValue()+
            ")";
          };
          
          this.ref.red.onchange = function(value){this.onchange(this.getValue());}.bind(this);
          this.ref.green.onchange = function(value){this.onchange(this.getValue());}.bind(this);
          this.ref.blue.onchange = function(value){this.onchange(this.getValue());}.bind(this);

          this.onchange=function(value){};

        
//# sourceURL=W3View:///rgb-chooser
}}},
"APP":{"prep":{"tgn":"DIV","as":"app","attr":{"as":"app"},"ch":[{"tgn":"DIV","attr":{"style":"height:100px;padding:20px 0px;font-size:20px;\n          text-align:center;border:1px solid black;border-bottom:0px;","id":"disp"},"ch":[{"tgn":"SPAN","attr":{"ref":"va","style":"background-color:white; padding:10px;border-radius: 20px;"},"ch":[]}]},{"tgn":"RGB-CHOOSER","attr":{"ref":"control"},"ch":[]}],"script":function anonymous(appContext,factory,document
/**/) {


          this.ref.control.onchange = function(value){
            disp.style.backgroundColor = value;
            val.innerText = value;
          };
          this.ref.control.setData();
        
//# sourceURL=W3View:///app
}}}});
})(appContext),(function(appContext){
return new W3View(appContext)
.setRegistry({"HELLO-WORLD":{"prep":{"tgn":"DIV","as":"hello-world","attr":{"as":"hello-world"},"ch":[{"tgn":"H1","attr":{"ref":"content"},"ch":[]},{"tgn":"INPUT","attr":{"ref":"input","placeholder":"type your name here"},"ch":[]},{"tgn":"H2","attr":{},"ch":["Hello ",{"tgn":"SPAN","attr":{"ref":"name"},"ch":["Anonimous"]},"!"]}],"script":function anonymous(appContext,factory,document
/**/) {


					//CONSTRUCTOR tag should be used inside SCRIPT tag
					this.ref.input.onkeyup = function(e){
						this.setData(this.ref.input.value);
					}.bind(this);
					this.onSetData = function(data){
						this.ref.name.innerText = data || 'Anonimous';
					};
				
//# sourceURL=W3View:///hello-world
}}},
"DOUBLE-HELLO-WORLD":{"prep":{"tgn":"DIV","as":"double-hello-world","attr":{"as":"double-hello-world"},"ch":[{"tgn":"HELLO-WORLD","attr":{},"ch":["Hello first"]},{"tgn":"HR","attr":{},"ch":[]},{"tgn":"HELLO-WORLD","attr":{},"ch":["Hello second"]}]}}});
})(appContext)];
factory[0].putModule('grid',factory[1]);
factory[0].putModule('slider',factory[2]);
factory[0].putModule('hello',factory[3]);
factory[1].putModule('window',factory[0]);
return factory[0];};
//# sourceURL=W3View:///examples/modules/window.w3v.html
