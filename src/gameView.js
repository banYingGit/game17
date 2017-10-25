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
        // // this.diamonds.on(Laya.Event.CLICK, this, this.diamondsClick);
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

        var n = 0, $diamonds

        animateDiamonds = function () {

            Laya.timer.clear($this, animateDiamondsShow)

            var $index = $this.getArrayItems(arrThree, 1)
            console.log('$index', $index)
            $diamonds = $el.getChildByName("diamonds" + $arr[$index[0]]);

            $diamonds.visible = true;

            Laya.timer.loop(49, $this, animateDiamondsShow)

        };

        animateDiamondsShow = function () {
            if (n < 40) {
                n = n + 1
            } else {
                n = 0
                Laya.timer.clear($this, animateDiamondsShow)
            }

            $diamonds.skin = '../laya/assets/pageImg/diamondsB' + n + '.png'
        }
        animateDiamonds()
        Laya.timer.loop(2000, this, animateDiamonds)


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
    GameView.prototype.diamondsClick = function (e) {

        var elm = e.target.name;

        console.log('elm', elm, e)

        if (elm.indexOf("investBtn") != -1) {
            // 投注按钮 -->投注金豆事件
            // this.investClick(e)

        }
    }


    return GameView;

})(ui.gamePageUI);