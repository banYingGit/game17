/**
 * 游戏的ui继承类
 */

var GameView = (function (_super) {

    function GameView() {
        GameView.super(this);
    }


    Laya.class(GameView, "GameView", _super);

    var animateDiamonds, animateDiamondsShow;
    GameView.prototype.init = function () {

        this.loading();
        //游戏开始按钮
        this.startButton.on(Laya.Event.CLICK, this, this.startButtonClick);
        this.nextStep.on(Laya.Event.CLICK, this, this.nextStepClick);
        Laya.stage.on(Laya.Event.CLICK, this, this.diamondsClick);
    };

    GameView.prototype.loading = function () {


        //进度条加载
        Laya.Tween.to(this.load, {

            width: 890

        }, 3000, null, this.isShowStart(), false, true);

        //钻石移动
        Laya.Tween.to(this.loadD, {

            x: 890

        }, 3000, null, false, true);


    };
    GameView.prototype.isShowStart = function () {

        var $this = this
        setTimeout(function () {
            $this.loadBox.visible = false
            $this.startButton.visible = true
        }, 3500)

    }
    GameView.prototype.startButtonClick = function () {

        this.screen1.visible = false;
        this.screen2.visible = true;

    };
    GameView.prototype.nextStepClick = function () {

        this.screen2.visible = false;
        this.screen3.visible = true;
        this.setDiamonds()
    }

    GameView.prototype.setDiamonds = function () {
        var arrTwelve = [], arrThree = [], $this = this
        for (var i = 0; i < 12; i++) {
            arrTwelve.push(i)
        }
        for (var i = 0; i < 3; i++) {
            arrThree.push(i)
        }

        var $arr = this.getArrayItems(arrTwelve, 3),

            $el = this.screen3

        var n = 0, i = 0, $diamonds

        animateDiamonds = function () {

            console.log('------------------')
            Laya.timer.clear($this, animateDiamondsShow)

            i = ( i + 1 ) <= 3 ? (i + 1 ) : 1

            $diamonds = $el.getChildByName("diamonds" + $arr[i - 1]);

            $diamonds.visible = true;
            $diamonds.alpha = 1;
            n = 0
            Laya.timer.loop(49, $this, animateDiamondsShow)


        };

        animateDiamondsShow = function () {

            if (n < 40) {
                n = n + 1
            } else {
                n = 0
                Laya.timer.clear($this, animateDiamondsShow)
            }
            console.log('nnnnnnnnnnn', n)
            $diamonds.skin = '../laya/assets/pageImg/diamondsB' + n + '.png'
        };

        animateDiamonds()
        Laya.timer.loop(2000, this, animateDiamonds)


    };

    GameView.prototype.diamondsClick = function (e) {

        var elm = e.target.name, $this = this;

        if (elm.indexOf("diamonds") != -1) {

            var $el = e.target

            Laya.timer.clear(this, animateDiamondsShow)

            Laya.timer.clear(this, animateDiamonds)

            Laya.Tween.to($el, {

                alpha: 0

            }, 500, null, Laya.Handler.create(this, function () {

                $el.skin = '../laya/assets/pageImg/diamondsB0.png'

                setTimeout(function () {

                    Laya.timer.loop(2000, $this, animateDiamonds)

                }, 0)

            }), false, true);

        }
    };


    GameView.prototype.getArrayItems = function (arr, num) {

        var array = [];

        for (var index in arr) {

            array.push(arr[index]);
        }

        var return_array = [];

        for (var i = 0; i < num; i++) {

            if (array.length > 0) {

                var arrIndex = Math.floor(Math.random() * array.length);

                return_array[i] = array[arrIndex];

                array.splice(arrIndex, 1);

            } else {
                break;
            }
        }
        return return_array;
    }


    return GameView;

})(ui.gamePageUI);