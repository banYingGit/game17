/**
 * 游戏对象
 */
var Game = (function () {
    var WebGL = Laya.WebGL;

    function Game() {
        Laya.init(750, 1334, WebGL);
        Laya.stage.scaleMode = "noborder";
        Laya.stage.screenMode = "vertical";
        Laya.stage.bgColor = "#79223a";
        Laya.loader.load("bin/res/atlas/dice.json", Laya.Handler.create(this, this.init), null, Laya.Loader.ATLAS);

    }

    Game.prototype.init = function () {
        // 请求接口
        this.GameView = new GameView();


        var http = new Laya.HttpRequest(),
            pram = {
                userId: "1234"
            };

        http.send("bin/data/init.json", pram, "get", "json");

        http.once(Laya.Event.COMPLETE, this, function (data) {

            this.GameView.init(data.userBean, data.btnType, data.record, data.state, data.userInvest);

        });




        Laya.stage.addChild(this.GameView);
    };

    return Game;

}());

new Game();