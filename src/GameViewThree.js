/**
 * 游戏的ui继承类
 */

var GameViewThree = (function (_super) {

    function GameViewThree() {
        GameViewThree.super(this);
    }


    Laya.class(GameViewThree, "GameViewThree", _super);

    var animateDiamonds, animateDiamondsShow

    GameViewThree.prototype.init = function () {

        console.log('第三')
        this.setDiamonds()
        Laya.stage.on(Laya.Event.CLICK, this, this.diamondsClick);
        Laya.stage.on(Laya.Event.CLICK, this, this.stateClick);
    };

    GameViewThree.prototype.setDiamonds = function () {
        var arrTwelve = [], arrThree = [], $this = this
        for (var i = 0; i < 12; i++) {
            arrTwelve.push(i)
        }
        for (var i = 0; i < 3; i++) {
            arrThree.push(i)
        }

        var $arr = this.getArrayItems(arrTwelve, 3)

        var n = 0, $diamonds

        animateDiamonds = function () {

            Laya.timer.clear($this, animateDiamondsShow)

            var $index = $this.getArrayItems(arrThree, 1)
            console.log('$index', $index)
            $diamonds = $this.getChildByName("diamonds" + $arr[$index[0]]);

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

    GameViewThree.prototype.getArrayItems = function (arr, num) {

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
    GameViewThree.prototype.stateClick = function (e) {

        var elm = e.target.name;

        console.log('elm', elm, e)

        if (elm.indexOf("investBtn") != -1) {
            // 投注按钮 -->投注金豆事件
            // this.investClick(e)

        }
    }


    return GameViewThree;

})(ui.screen3UI);