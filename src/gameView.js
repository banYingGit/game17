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


        //当前点击正确次数
        this.clickNum = 0;
        //当前等级
        this.level = 1;
        //当前倒计时时间
        this.time = 300;
        //云朵数量
        this.cloudNum = this.level + 2
        //混淆数量
        this.affectNUm = 0
        //当前得分
        this.score = 0
        //钻石显示时间
        this.speed = 1500


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
        var $this = this;
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
        var arrTwelve = [], $arr = [], $affectNUm = [], $this = this, $el = this.screen3
        for (var i = 0; i < 12; i++) {
            arrTwelve.push(i)
        }


        $arr = this.getArrayItems(arrTwelve, this.cloudNum)

        $affectNUm = $this.getArrayItems($arr, $this.affectNUm)


        console.log('$arr', $arr)
        console.log('$affectNUm', $affectNUm)
        var n = 0, i = 0, $diamonds, $skin = 'diamondsB'

        animateDiamonds = function () {

            Laya.timer.clear($this, animateDiamondsShow)

            if (this.clickNum > 4) return

            i = ( i + 1 ) <= this.cloudNum ? (i + 1 ) : 1

            $diamonds = $el.getChildByName("diamonds" + $arr[i - 1]);

            if ($affectNUm.indexOf($arr[i - 1]) != -1) {
                $skin = 'diamondsG'
                $diamonds.value = false
            } else {
                $skin = 'diamondsB'
                $diamonds.value = true
            }
            // console.log('$skin', $skin)
            $diamonds.visible = true;
            $diamonds.alpha = 1;
            $diamonds.mouseEnabled = true
            n = 0;
            Laya.timer.loop(Math.floor($this.speed / 41), $this, animateDiamondsShow)


        };

        animateDiamondsShow = function () {

            if (n < 40) {
                n = n + 1
            } else {
                n = 0
                Laya.timer.clear($this, animateDiamondsShow)
            }
            $diamonds.skin = '../laya/assets/pageImg/' + $skin + n + '.png'
        };

        animateDiamonds()
        Laya.timer.loop(this.speed, this, animateDiamonds)


    };

    GameView.prototype.diamondsClick = function (e) {

        var elm = e.target.name, $this = this;

        if (elm.indexOf("diamonds") != -1) {

            var $el = e.target

            Laya.timer.clear(this, animateDiamondsShow)

            Laya.timer.clear(this, animateDiamonds)

            $el.mouseEnabled = false
            Laya.Tween.to($el, {

                alpha: 0

            }, 200, null, Laya.Handler.create(this, function () {

                $el.skin = '../laya/assets/pageImg/diamondsB0.png'
                $this.getResult($el)

                Laya.timer.loop(this.speed, $this, animateDiamonds)


            }), false, true);

        }
    };

    GameView.prototype.getResult = function (el) {

        var $this = this

        if (el.value) {

            this.clickNum = this.clickNum + 1;

            this.score = this.score + 100 * this.level

            this.scoreBox.text = this.score

            console.log('点击正确数', this.clickNum)

            if (this.clickNum > 4) {

                Laya.timer.clear(this, animateDiamondsShow)

                Laya.timer.clear(this, animateDiamonds)

                //当前等级
                this.level = this.level + 1;

                //云朵数量
                this.cloudNum = this.level + 2

                this.changeVal()
                console.log('等级：', this.level, '云朵数量：', this.cloudNum, '混淆数量：', this.affectNUm, '速度：', this.speed)
                setTimeout(function () {

                    $this.screen3.visible = false
                    $this.screen4.visible = true
                    $this.setScreen4()

                }, 1000)

            }

        } else {
            console.log('点击错误')
        }
    }
    GameView.prototype.setScreen4 = function () {

        //钻石移动
        Laya.Tween.to(this.levelLoadD, {

            x: this.level * 90

        }, 1000, null, false, true);

        Laya.Tween.to(this.levelLoad, {

            width: this.level * 90

        }, 1000, null, false, true);

        this.levelScoreBox.text = '得分：' + this.score

    }
    //改变等级变量值
    GameView.prototype.changeVal = function () {

        if (this.level <= 2) {
            this.affectNUm = 0
        } else if (this.level <= 4 && this.level > 2) {
            this.affectNUm = 2
        } else if (this.level <= 6 && this.level > 4) {
            this.affectNUm = 3
        } else if (this.level <= 8 && this.level > 6) {
            this.affectNUm = 4
        } else if (this.level <= 10 && this.level > 8) {
            this.affectNUm = 5
        }
        if (this.level <= 4) {
            this.speed = 1500
        } else if (this.level <= 7 && this.level > 4) {
            this.affectNUm = 1000
        }
        else if (this.level <= 10 && this.level > 7) {
            this.affectNUm = 800
        }

    }

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