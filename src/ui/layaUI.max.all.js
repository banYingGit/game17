var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var gamePageUI=(function(_super){
		function gamePageUI(){
			
		    this.ani4=null;
		    this.cloud1=null;
		    this.cloud2=null;
		    this.screen1=null;
		    this.loadBox=null;
		    this.load=null;
		    this.loadD=null;
		    this.startButton=null;
		    this.screen2=null;
		    this.nextStep=null;
		    this.screen3=null;
		    this.cloud=null;
		    this.header=null;
		    this.stopBtn=null;
		    this.scoreBox=null;
		    this.cloud12=null;
		    this.screen4=null;
		    this.levelScoreBox=null;
		    this.levelOut=null;
		    this.levelLoadBox=null;
		    this.levelLoad=null;
		    this.levelLoadD=null;
		    this.maxLevel=null;
		    this.screenStop=null;
		    this.continue=null;
		    this.restart=null;
		    this.help=null;
		    this.out=null;

			gamePageUI.__super.call(this);
		}

		CLASS$(gamePageUI,'ui.gamePageUI',_super);
		var __proto__=gamePageUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(gamePageUI.uiView);
		}
		gamePageUI.uiView={"type":"View","props":{"width":1920,"height":1200},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1920,"skin":"pageImg/bg.png","name":"background","height":1200}},{"type":"Box","props":{"y":0,"x":0,"var":"screen1"},"child":[{"type":"Image","props":{"y":179,"x":754,"skin":"pageImg/logo.png","name":"logo"}},{"type":"Image","props":{"y":120,"x":1770,"skin":"pageImg/button1.png"},"child":[{"type":"Text","props":{"y":100,"x":-6,"width":112,"text":"退出","height":56,"fontSize":50,"font":"Microsoft YaHei","color":"#ffffff"}}]},{"type":"Image","props":{"y":320,"x":1770,"skin":"pageImg/button2.png"},"child":[{"type":"Text","props":{"y":100,"x":-6,"width":112,"text":"帮助","height":56,"fontSize":50,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]},{"type":"Box","props":{"y":1020,"x":520,"var":"loadBox"},"child":[{"type":"Image","props":{"y":30,"x":50,"width":900,"skin":"pageImg/loading1.png","name":"loadingBg","height":35}},{"type":"Image","props":{"y":35,"x":55,"width":0,"var":"load","skin":"pageImg/loading2.png","name":"load","height":25,"sizeGrid":"5,20,5,20"}},{"type":"Image","props":{"y":0,"x":0,"var":"loadD","skin":"pageImg/diamonds_b.png"}}]},{"type":"Image","props":{"y":961,"x":775,"visible":false,"var":"startButton","skin":"pageImg/btn1.png"},"child":[{"type":"Text","props":{"y":18,"x":0,"width":440,"text":"开 始","height":88,"fontSize":60,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":739,"x":491,"skin":"pageImg/fixedCloud.png"}},{"type":"Image","props":{"y":870,"x":1195,"skin":"pageImg/rbCloud0.png"}},{"type":"Text","props":{"y":90,"x":70,"wordWrap":true,"text":"山海云游","fontSize":70,"color":"#ffffff"}},{"type":"Text","props":{"y":400,"x":87,"wordWrap":true,"width":50,"text":"脑力训练系列","height":313,"fontSize":45,"font":"Microsoft YaHei","color":"#ffffff"}}]},{"type":"Box","props":{"y":0,"x":0,"visible":false,"var":"screen2"},"child":[{"type":"Image","props":{"y":960,"x":775,"var":"nextStep","skin":"pageImg/btn1.png"},"child":[{"type":"Text","props":{"y":18,"x":0,"width":440,"text":"下一步","height":88,"fontSize":60,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":20,"x":20,"width":1910,"skin":"pageImg/mountain1.png","alpha":1}},{"type":"Image","props":{"y":20,"x":20,"width":1642,"skin":"pageImg/mountain2.png","alpha":1}},{"type":"Image","props":{"y":363,"x":505,"skin":"pageImg/screen2Text.png"},"child":[{"type":"Box","props":{"y":70,"x":221},"child":[{"type":"Text","props":{"text":"本训练提升您的","height":80,"fontSize":40,"font":"Microsoft YaHei","color":"#213740","align":"center"}},{"type":"Text","props":{"x":408,"text":"表现","height":80,"fontSize":40,"font":"Microsoft YaHei","color":"#213740","align":"center"}},{"type":"Text","props":{"x":285,"text":"注意力","height":80,"fontSize":40,"font":"Microsoft YaHei","color":"#213740","bold":true,"align":"center"}}]},{"type":"Box","props":{"y":156,"x":221},"child":[{"type":"Text","props":{"y":0,"x":20,"text":"请关注钻石的","height":80,"fontSize":40,"font":"Microsoft YaHei","color":"#213740","align":"center"}},{"type":"Text","props":{"y":0,"x":260,"text":"位置和颜色","height":80,"fontSize":40,"font":"Microsoft YaHei","color":"#213740","bold":true,"align":"center"}}]}]}]},{"type":"Box","props":{"y":0,"x":0,"visible":false,"var":"screen3","mouseEnabled":true},"child":[{"type":"Box","props":{"y":0,"x":0,"visible":false,"var":"cloud"},"child":[{"type":"Image","props":{"y":618,"x":19,"skin":"pageImg/mountain3.png","alpha":1},"compId":56},{"type":"Image","props":{"y":760,"x":987,"skin":"pageImg/mountain4.png","alpha":1},"compId":57},{"type":"Box","props":{"y":0,"x":0,"alpha":1},"compId":65,"child":[{"type":"Image","props":{"y":50,"x":0,"skin":"pageImg/mountain1.png","alpha":1}},{"type":"Image","props":{"y":400,"x":150,"skin":"pageImg/mountain2.png","alpha":1}},{"type":"Image","props":{"y":328,"x":265,"skin":"pageImg/fixedCloud.png"}}]}]},{"type":"Box","props":{"y":0,"x":0,"width":1920,"visible":true,"var":"header","height":1200},"child":[{"type":"Image","props":{"y":25,"x":25,"var":"stopBtn","skin":"pageImg/button3.png"}},{"type":"Image","props":{"y":25,"x":690,"skin":"pageImg/textTime.png"},"child":[{"type":"Text","props":{"y":15,"x":25,"width":150,"text":"剩余","height":75,"fontSize":60,"font":"Microsoft YaHei","color":"#192c36","align":"center"}},{"type":"Text","props":{"y":15,"x":320,"width":75,"text":"秒","height":75,"fontSize":60,"font":"Microsoft YaHei","color":"#192c36","align":"center"}},{"type":"Text","props":{"y":20,"x":140,"width":200,"text":"120","height":75,"fontSize":70,"font":"Arial","color":"#192c36","align":"center"}}]},{"type":"Image","props":{"y":25,"x":1412,"skin":"pageImg/textScore.png"},"child":[{"type":"Text","props":{"y":15,"x":25,"width":150,"text":"得分","height":75,"fontSize":60,"font":"Microsoft YaHei","color":"#192c36","align":"center"}},{"type":"Text","props":{"y":20,"x":178,"width":280,"var":"scoreBox","text":"0","height":75,"fontSize":70,"font":"Arial","color":"#192c36","align":"right"}}]}]},{"type":"Box","props":{"y":0,"x":0,"width":1920,"var":"cloud12","height":1200},"child":[{"type":"Image","props":{"y":395,"x":275,"skin":"pageImg/yun0.png"},"compId":66},{"type":"Image","props":{"y":278,"x":652,"skin":"pageImg/yun0.png"}},{"type":"Image","props":{"y":350,"x":983,"skin":"pageImg/yun0.png"},"compId":164},{"type":"Image","props":{"y":285,"x":1251,"skin":"pageImg/yun0.png"}},{"type":"Image","props":{"y":565,"x":735,"skin":"pageImg/yun0.png"}},{"type":"Image","props":{"y":677,"x":490,"skin":"pageImg/yun0.png"}},{"type":"Image","props":{"y":812,"x":207,"skin":"pageImg/yun0.png"}},{"type":"Image","props":{"y":939,"x":554,"skin":"pageImg/yun0.png"}},{"type":"Image","props":{"y":818,"x":834,"skin":"pageImg/yun0.png"}},{"type":"Image","props":{"y":682,"x":1127,"skin":"pageImg/yun0.png"}},{"type":"Image","props":{"y":687,"x":1404,"skin":"pageImg/yun0.png"}},{"type":"Image","props":{"y":961,"x":1221,"skin":"pageImg/yun0.png"}}]},{"type":"Image","props":{"y":345,"x":353,"visible":false,"skin":"pageImg/diamondsB0.png","name":"diamonds0","mouseEnabled":true}},{"type":"Image","props":{"y":243,"x":755,"visible":false,"skin":"pageImg/diamondsB0.png","name":"diamonds1","mouseEnabled":true}},{"type":"Image","props":{"y":247,"x":1338,"visible":false,"skin":"pageImg/diamondsB0.png","name":"diamonds2","mouseEnabled":true}},{"type":"Image","props":{"y":318,"x":1080,"visible":false,"skin":"pageImg/diamondsB0.png","name":"diamonds3","mouseEnabled":true}},{"type":"Image","props":{"y":526,"x":818,"visible":false,"skin":"pageImg/diamondsB0.png","name":"diamonds4","mouseEnabled":true}},{"type":"Image","props":{"y":641,"x":572,"visible":false,"skin":"pageImg/diamondsB0.png","name":"diamonds5","mouseEnabled":true}},{"type":"Image","props":{"y":790,"x":288,"visible":false,"skin":"pageImg/diamondsB0.png","name":"diamonds6","mouseEnabled":true}},{"type":"Image","props":{"y":661,"x":1204,"visible":false,"skin":"pageImg/diamondsB0.png","name":"diamonds7","mouseEnabled":true}},{"type":"Image","props":{"y":660,"x":1497,"visible":false,"skin":"pageImg/diamondsB0.png","name":"diamonds8","mouseEnabled":true}},{"type":"Image","props":{"y":901,"x":642,"visible":false,"skin":"pageImg/diamondsB0.png","name":"diamonds9","mouseEnabled":true}},{"type":"Image","props":{"y":792,"x":933,"visible":false,"skin":"pageImg/diamondsB0.png","name":"diamonds10","mouseEnabled":true}},{"type":"Image","props":{"y":942,"x":1322,"visible":false,"skin":"pageImg/diamondsB0.png","name":"diamonds11","mouseEnabled":true}}]},{"type":"Box","props":{"y":0,"x":0,"width":1920,"visible":false,"var":"screen4","height":1200},"child":[{"type":"Image","props":{"y":194,"x":272,"skin":"pageImg/screen4Text.png"}},{"type":"Text","props":{"y":290,"x":703,"width":500,"text":"本次训练结束","fontSize":80,"font":"Microsoft YaHei","color":"#2b4651","bold":true,"align":"center"}},{"type":"Text","props":{"y":417,"x":553,"width":800,"var":"levelScoreBox","text":"得分:","fontSize":70,"font":"Microsoft YaHei","color":"#2b4651","align":"center"}},{"type":"Image","props":{"y":738,"x":733,"var":"levelOut","skin":"pageImg/btn1.png"},"child":[{"type":"Text","props":{"y":18,"x":0,"width":440,"text":"退 出","height":78,"fontSize":60,"font":"Microsoft YaHei","color":"#fff","align":"center"}}]},{"type":"Box","props":{"y":582,"x":449.5,"var":"levelLoadBox"},"child":[{"type":"Circle","props":{"y":46,"x":952,"radius":40,"lineWidth":1,"fillColor":"#ffffff"}},{"type":"Image","props":{"y":30,"x":50,"width":900,"skin":"pageImg/loading1.png","height":35}},{"type":"Image","props":{"y":35,"x":55,"width":0,"var":"levelLoad","skin":"pageImg/loading2.png","height":25,"sizeGrid":"5,20,5,20"}},{"type":"Image","props":{"y":0,"x":0,"var":"levelLoadD","skin":"pageImg/diamonds_b.png"}}]},{"type":"Text","props":{"y":529,"x":552.5,"width":800,"visible":false,"var":"maxLevel","text":"恭喜你完成本测验最高难度","fontSize":45,"font":"Microsoft YaHei","color":"#e7630c","bold":true,"align":"center"}}]},{"type":"Box","props":{"y":0,"x":0,"width":1920,"visible":false,"var":"screenStop","height":1200},"child":[{"type":"Image","props":{"y":204,"x":282,"skin":"pageImg/screen4Text.png"}},{"type":"Image","props":{"y":371,"x":394,"var":"continue","skin":"pageImg/btnBg1.png"},"child":[{"type":"Text","props":{"y":20,"x":0,"width":500,"text":"继 续","height":80,"fontSize":60,"font":"Microsoft YaHei","color":"#fff","align":"center"}}]},{"type":"Image","props":{"y":371,"x":1016,"var":"restart","skin":"pageImg/btnBg2.png"},"child":[{"type":"Text","props":{"y":20,"x":0,"width":500,"text":"从新开始","height":80,"fontSize":60,"font":"Microsoft YaHei","color":"#fff","align":"center"}}]},{"type":"Image","props":{"y":611,"x":403,"var":"help","skin":"pageImg/btnBg3.png"},"child":[{"type":"Text","props":{"y":20,"x":0,"width":500,"text":"帮 助","height":80,"fontSize":60,"font":"Microsoft YaHei","color":"#fff","align":"center"}}]},{"type":"Image","props":{"y":610.5,"x":1016,"var":"out","skin":"pageImg/btnBg4.png"},"child":[{"type":"Text","props":{"y":20,"x":0,"width":500,"text":"退 出","height":80,"fontSize":60,"font":"Microsoft YaHei","color":"#fff","align":"center"}}]}]},{"type":"Image","props":{"y":0,"x":0,"width":1920,"skin":"pageImg/bg2.png","name":"kuang","mouseThrough":true,"height":1200}}],"animations":[{"nodes":[],"name":"ani1","id":1,"frameRate":10,"action":2},{"nodes":[],"name":"ani2","id":2,"frameRate":5,"action":2},{"nodes":[],"name":"ani3","id":3,"frameRate":24,"action":2},{"nodes":[{"target":56,"keyframes":{"y":[{"value":1100,"tweenMethod":"linearNone","tween":true,"target":56,"key":"y","index":0},{"value":620,"tweenMethod":"linearNone","tween":true,"target":56,"key":"y","index":75},{"value":1100,"tweenMethod":"linearNone","tween":true,"target":56,"key":"y","index":150}],"x":[{"value":20,"tweenMethod":"linearNone","tween":true,"target":56,"key":"x","index":0}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":56,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":56,"key":"alpha","index":75},{"value":0,"tweenMethod":"linearNone","tween":true,"target":56,"key":"alpha","index":150}]}},{"target":57,"keyframes":{"y":[{"value":1100,"tweenMethod":"linearNone","tween":true,"target":57,"key":"y","index":0},{"value":760,"tweenMethod":"linearNone","tween":true,"target":57,"key":"y","index":75},{"value":1100,"tweenMethod":"linearNone","tween":true,"target":57,"key":"y","index":150}],"x":[{"value":990,"tweenMethod":"linearNone","tween":true,"target":57,"key":"x","index":0}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":57,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":57,"key":"alpha","index":75},{"value":0,"tweenMethod":"linearNone","tween":true,"target":57,"key":"alpha","index":150}]}},{"target":65,"keyframes":{"y":[{"value":270,"tweenMethod":"linearNone","tween":true,"target":65,"key":"y","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":65,"key":"y","index":75},{"value":270,"tweenMethod":"linearNone","tween":true,"target":65,"key":"y","index":150}],"x":[{"value":-600,"tweenMethod":"linearNone","tween":true,"target":65,"key":"x","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":65,"key":"x","index":75},{"value":600,"tweenMethod":"linearNone","tween":true,"target":65,"key":"x","index":150}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":65,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":65,"key":"alpha","index":75},{"value":0,"tweenMethod":"linearNone","tween":true,"target":65,"key":"alpha","index":150}]}}],"name":"ani4","id":4,"frameRate":15,"action":2},{"nodes":[{"target":66,"keyframes":{"y":[{"value":395,"tweenMethod":"linearNone","tween":true,"target":66,"key":"y","index":0}],"x":[{"value":275,"tweenMethod":"linearNone","tween":true,"target":66,"key":"x","index":0}],"skin":[{"value":"pageImg/yun0.png","tweenMethod":"linearNone","tween":false,"target":66,"key":"skin","index":0},{"value":"pageImg/yun2.png","tweenMethod":"linearNone","tween":false,"target":66,"key":"skin","index":5},{"value":"pageImg/yun3.png","tweenMethod":"linearNone","tween":false,"target":66,"key":"skin","index":10},{"value":"pageImg/yun4.png","tweenMethod":"linearNone","tween":false,"target":66,"key":"skin","index":15},{"value":"pageImg/yun5.png","tweenMethod":"linearNone","tween":false,"target":66,"key":"skin","index":20},{"value":"pageImg/yun6.png","tweenMethod":"linearNone","tween":false,"target":66,"key":"skin","index":25},{"value":"pageImg/yun7.png","tweenMethod":"linearNone","tween":false,"target":66,"key":"skin","index":30},{"value":"pageImg/yun8.png","tweenMethod":"linearNone","tween":false,"target":66,"key":"skin","index":35},{"value":"pageImg/yun9.png","tweenMethod":"linearNone","tween":false,"target":66,"key":"skin","index":40},{"value":"pageImg/yun10.png","tweenMethod":"linearNone","tween":false,"target":66,"key":"skin","index":45},{"value":"pageImg/yun11.png","tweenMethod":"linearNone","tween":false,"target":66,"key":"skin","index":50},{"value":"pageImg/yun12.png","tweenMethod":"linearNone","tween":false,"target":66,"key":"skin","index":55},{"value":"pageImg/yun13.png","tweenMethod":"linearNone","tween":false,"target":66,"key":"skin","index":60},{"value":"pageImg/yun14.png","tweenMethod":"linearNone","tween":false,"target":66,"key":"skin","index":65}]}}],"name":"cloud1","id":5,"frameRate":24,"action":2},{"nodes":[{"target":164,"keyframes":{"skin":[{"value":"pageImg/yun14.png","tweenMethod":"linearNone","tween":false,"target":164,"key":"skin","index":0},{"value":"pageImg/yun13.png","tweenMethod":"linearNone","tween":false,"target":164,"key":"skin","index":5},{"value":"pageImg/yun12.png","tweenMethod":"linearNone","tween":false,"target":164,"key":"skin","index":10},{"value":"pageImg/yun11.png","tweenMethod":"linearNone","tween":false,"target":164,"key":"skin","index":15},{"value":"pageImg/yun10.png","tweenMethod":"linearNone","tween":false,"target":164,"key":"skin","index":20},{"value":"pageImg/yun9.png","tweenMethod":"linearNone","tween":false,"target":164,"key":"skin","index":25},{"value":"pageImg/yun8.png","tweenMethod":"linearNone","tween":false,"target":164,"key":"skin","index":30},{"value":"pageImg/yun7.png","tweenMethod":"linearNone","tween":false,"target":164,"key":"skin","index":35},{"value":"pageImg/yun6.png","tweenMethod":"linearNone","tween":false,"target":164,"key":"skin","index":40},{"value":"pageImg/yun5.png","tweenMethod":"linearNone","tween":false,"target":164,"key":"skin","index":45},{"value":"pageImg/yun4.png","tweenMethod":"linearNone","tween":false,"target":164,"key":"skin","index":50},{"value":"pageImg/yun3.png","tweenMethod":"linearNone","tween":false,"target":164,"key":"skin","index":55},{"value":"pageImg/yun2.png","tweenMethod":"linearNone","tween":false,"target":164,"key":"skin","index":60},{"value":"pageImg/yun1.png","tweenMethod":"linearNone","tween":false,"target":164,"key":"skin","index":65},{"value":"pageImg/yun0.png","tweenMethod":"linearNone","tween":false,"target":164,"key":"skin","index":70}]}}],"name":"cloud2","id":5,"frameRate":24,"action":2},{"nodes":[],"name":"cloud3","id":5,"frameRate":24,"action":2},{"nodes":[],"name":"cloud4","id":5,"frameRate":24,"action":2},{"nodes":[],"name":"cloud5","id":5,"frameRate":24,"action":2},{"nodes":[],"name":"cloud6","id":5,"frameRate":24,"action":2},{"nodes":[],"name":"cloud7","id":5,"frameRate":24,"action":2},{"nodes":[],"name":"cloud8","id":5,"frameRate":24,"action":2},{"nodes":[],"name":"cloud9","id":5,"frameRate":24,"action":2},{"nodes":[],"name":"cloud10","id":5,"frameRate":24,"action":2},{"nodes":[],"name":"cloud11","id":5,"frameRate":24,"action":2},{"nodes":[],"name":"cloud12","id":5,"frameRate":24,"action":2}]};
		return gamePageUI;
	})(View);