/**
 * 游戏的ui继承类
 */

var GameView = (function (_super) {

    function GameView() {
        GameView.super(this);
    }


    Laya.class(GameView, "GameView", _super);

    GameView.prototype.init = function () {


        //当前点击正确次数
        this.clickNum = 0;
        //当前等级
        this.level = 1;
        //当前倒计时时间
        this.time = 300;
        //云朵数量
        this.cloudNum = 3;
        //混淆数量
        this.affectNUm = 0
        //当前得分
        this.score = 0
        //钻石显示时间
        this.speed = 1500
        this.skinD = 'diamondsB'


        this.loading();
        //游戏开始按钮
        this.startButton.on(Laya.Event.CLICK, this, this.startButtonClick);
        //下一步
        this.nextStep.on(Laya.Event.CLICK, this, this.nextStepClick);
        //点击钻石
        Laya.stage.on(Laya.Event.CLICK, this, this.diamondsClick);
        //本次训练结束退出（实际是下一等级）

        this.goStep.on(Laya.Event.CLICK, this, this.goStepClick);
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

        console.log('等级：', this.level, '云朵数量：', this.cloudNum, '混淆数量：', this.affectNUm, '速度：', this.speed)

        this.scoreBox.text = 0

        var arrTwelve = [], $cloudArr = [], $affectNUm = [];

        for (var i = 0; i < 12; i++) {
            arrTwelve.push(i)
        }

        $cloudArr = this.getArrayItems(arrTwelve, this.cloudNum)

        $affectNUm = this.getArrayItems($cloudArr, this.affectNUm)

        this.animateDiamondsfn($cloudArr, $affectNUm)


    };
    var animateDiamonds;

    GameView.prototype.animateDiamondsfn = function ($cloudArr, $affectNUm) {

        var $this = this, $diamonds, i = 0, $el = this.screen3, animateDiamondsShow, n = 0;

        animateDiamonds = function () {

            i = ( i + 1 ) < this.cloudNum ? (i + 1 ) : 1

            $diamonds = $el.getChildByName("diamonds" + $cloudArr[i - 1]);

            console.log('$cloudArr', $cloudArr)
            console.log('$affectNUm', $affectNUm)

            if ($affectNUm.indexOf($cloudArr[i - 1]) != -1) {
                this.skinD = 'diamondsG'
                $diamonds.value = false
            } else {
                this.skinD = 'diamondsB'
                $diamonds.value = true
            }
            // console.log('$skin', $skin)
            $diamonds.visible = true;
            $diamonds.alpha = 1;
            $diamonds.mouseEnabled = true
            n = 0;

            Laya.timer.loop(Math.floor($this.speed / 41), $this, animateDiamondsShow)
        }
        animateDiamondsShow = function () {

            if (n < 40) {
                n = n + 1
            } else {
                n = 0
                Laya.timer.clear($this, animateDiamondsShow)
            }
            $diamonds.skin = '../laya/assets/pageImg/' + this.skinD + n + '.png'
        };


        Laya.timer.loop(this.speed, this, animateDiamonds)
    }

    GameView.prototype.diamondsClick = function (e) {

        var elm = e.target.name, $this = this;

        if (elm.indexOf("diamonds") != -1) {

            var $el = e.target

            Laya.timer.clearAll(this)

            $el.mouseEnabled = false
            Laya.Tween.to($el, {

                alpha: 0

            }, 200, null, Laya.Handler.create(this, function () {

                $el.skin = '../laya/assets/pageImg/diamondsB0.png'

                Laya.timer.loop(this.speed, $this, animateDiamonds)

                $this.getResult($el)

            }), false, true);

        }
    };

    GameView.prototype.goStepClick = function () {

        this.clickNum = 0;
        this.score = 0;

        this.screen4.visible = false;
        this.screen3.visible = true;

        this.setDiamonds()

    }


    GameView.prototype.getResult = function (el) {

        var $this = this

        if (el.value) {

            this.clickNum = this.clickNum + 1;

            this.score = this.score + 100 * this.level

            this.scoreBox.text = this.score

            console.log('点击正确数', this.clickNum)

            if (this.clickNum > 4) {

                Laya.timer.clearAll(this)

                //当前等级
                this.level = this.level + 1;


                this.changeVal()

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
        } else if (this.level == 3) {
            this.affectNUm = 2
        } else if (this.level <= 5 && this.level > 3) {
            this.affectNUm = 3
        } else if (this.level <= 7 && this.level > 5) {
            this.affectNUm = 4
        } else if (this.level <= 9 && this.level > 7) {
            this.affectNUm = 5
        }
        if (this.level <= 3) {
            this.speed = 1500
        } else if (this.level <= 6 && this.level > 3) {
            this.affectNUm = 1000
        }
        else if (this.level <= 9 && this.level > 6) {
            this.affectNUm = 800
        }

        //this.level=3时 是6个云
        if (this.level == 1) {
            this.cloudNum = 3

        } else if (this.level == 2) {

            this.cloudNum = 4
        }
        else if (this.level > 2 && this.level <= 9) {
            this.cloudNum = this.level + 3
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