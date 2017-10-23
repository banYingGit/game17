/**
 * 游戏的ui继承类
 */

var GameView = (function (_super) {

    function GameView() {
        GameView.super(this);
    }


    Laya.class(GameView, "GameView", _super);

    GameView.prototype.init = function () {


        this.loading()


    };

    GameView.prototype.loading = function () {

        //进度条加载
        Laya.Tween.to(this.load, {

            width: 890

        }, 3000, null, Laya.Handler.create(this, this.beansRemove()), false, true);

        //钻石移动
        Laya.Tween.to(this.loadD, {

            x: 1400

        }, 3000, null, false, true);

        var i = 0
        // Laya.timer.once(5, this, function () {
        //
        //     i = i < 15 ? (i + 1) : 1;
        //
        //     this.loadCloud.skin("../laya/assets/pageImg/cloud/rb/cloud" + i + ".png");
        //
        //
        // });

    };
    GameView.prototype.beansRemove = function () {

        console.log('进度条结束')

    }


    return GameView;

})(ui.gamePageUI);