var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var gamePageUI=(function(_super){
		function gamePageUI(){
			
		    this.load=null;
		    this.loadD=null;

			gamePageUI.__super.call(this);
		}

		CLASS$(gamePageUI,'ui.gamePageUI',_super);
		var __proto__=gamePageUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(gamePageUI.uiView);
		}
		gamePageUI.uiView={"type":"View","props":{"width":1920,"height":1200},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1920,"skin":"pageImg/bg.png","name":"background","height":1200}},{"type":"Box","props":{"y":0,"x":0},"child":[{"type":"Image","props":{"y":0,"x":2,"skin":"pageImg/bg2.png","name":"bg"}},{"type":"Image","props":{"y":159,"x":734,"skin":"pageImg/logo.png","name":"logo"}},{"type":"Image","props":{"y":100,"x":1750,"skin":"pageImg/button1.png"}},{"type":"Image","props":{"y":300,"x":1750,"skin":"pageImg/button2.png"}},{"type":"Image","props":{"y":1030,"x":550,"width":900,"skin":"pageImg/loading1.png","name":"loadingBg","height":35}},{"type":"Image","props":{"y":1035,"x":555,"width":0,"var":"load","skin":"pageImg/loading2.png","name":"load","height":25,"sizeGrid":"5,20,5,20"}},{"type":"Image","props":{"y":1000,"x":500,"var":"loadD","skin":"pageImg/diamonds_b.png"}},{"type":"Image","props":{"y":777,"x":1112,"skin":"pageImg/cloudRb/cloud1.png"}}]}]};
		return gamePageUI;
	})(View);