/**
 * 游戏对象
 */
var Game = (function () {
    var WebGL = Laya.WebGL;

    function Game() {
        Laya.init(1920, 1200, WebGL);
        Laya.stage.scaleMode = "noborder";
        Laya.stage.screenMode = "horizontal";
        Laya.stage.bgColor = "#2b4651";
        Laya.loader.load("../bin/res/atlas/pageImg.json", Laya.Handler.create(this, this.init), null, Laya.Loader.ATLAS);

    }

    Game.prototype.init = function () {

        this.GameView = new GameView();

        this.GameView.init();

        Laya.stage.addChild(this.GameView);
    };

    return Game;

}());

new Game();