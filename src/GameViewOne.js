/**
 * 游戏的ui继承类
 */

var GameViewOne = (function (_super) {

    function GameViewOne() {
        GameViewOne.super(this);
    }


    Laya.class(GameViewOne, "GameViewOne", _super);


    GameViewOne.prototype.init = function () {


        this.loading()

        // //游戏开始按钮
        this.startButton.on(Laya.Event.CLICK, this, this.startButtonClick);

    };

    GameViewOne.prototype.loading = function () {


        //进度条加载
        Laya.Tween.to(this.load, {

            width: 890

        }, 3000, null, this.isShowStart(), false, true);

        //钻石移动
        Laya.Tween.to(this.loadD, {

            x: 890

        }, 3000, null, false, true);


    };
    GameViewOne.prototype.isShowStart = function () {


        var $this = this
        setTimeout(function () {
            $this.loadBox.visible = false
            $this.startButton.visible = true
        }, 3500)

    }
    GameViewOne.prototype.startButtonClick = function () {


        this.visible = false;
        this.GameViewTwo = new GameViewTwo();

        this.GameViewTwo.init();

        Laya.stage.addChild(this.GameViewTwo);


    }


    return GameViewOne;

})(ui.screen1UI);