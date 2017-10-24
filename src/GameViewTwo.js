/**
 * 游戏的ui继承类
 */

var GameViewTwo = (function (_super) {

    function GameViewTwo() {
        GameViewTwo.super(this);
    }


    Laya.class(GameViewTwo, "GameViewTwo", _super);

    GameViewTwo.prototype.init = function () {

        console.log('第二')
        this.nextStep.on(Laya.Event.CLICK, this, this.nextStepClick);

    };

    GameViewTwo.prototype.nextStepClick = function () {

        this.visible = false
        this.GameViewThree = new GameViewThree();

        this.GameViewThree.init();

        Laya.stage.addChild(this.GameViewThree);

    }

    return GameViewTwo;

})(ui.screen2UI);