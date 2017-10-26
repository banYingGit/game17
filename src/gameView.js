/**
 * 游戏的ui继承类
 */

var GameView = (function (_super) {

    function GameView() {
        GameView.super(this);
    }


    Laya.class(GameView, "GameView", _super);

    GameView.prototype.init = function () {

        //当前等级
        this.level = 1;
        //当前倒计时时间 120秒/1000
        this.time = 120;
        this.scoreSum = 0;

        /***this.changeVal()
         *  改变值  cloudNum，affectNUm，speed
         * */
        //云朵数量
        this.cloudNum = '';
        //混淆数量
        this.affectNUm = '';
        //钻石显示时间
        this.speed = '';
        this.changeVal();

        //当前点击正确次数
        this.clickNum = 0;
        //钻石皮肤
        this.skinD = 'diamondsB';
        //当前得分
        this.score = 0;

        this.loading();
        //游戏开始按钮
        this.startButton.on(Laya.Event.CLICK, this, this.startButtonClick);
        //下一步
        this.nextStep.on(Laya.Event.CLICK, this, this.nextStepClick);
        //点击钻石
        Laya.stage.on(Laya.Event.CLICK, this, this.diamondsClick);
        //本次训练结束退出（实际是下一等级）

        //暂停
        this.stopBtn.on(Laya.Event.CLICK, this, this.stopClick);
        //暂停界面 -> 继续
        this.continue.on(Laya.Event.CLICK, this, this.continueClick);

        //重新开始使用等级
        this.restartLevel = this.level
        //暂停界面 -> 重新开始
        this.restart.on(Laya.Event.CLICK, this, this.restartClick);

        //结算界面游戏退出
        this.levelOut.on(Laya.Event.CLICK, this, this.outClick);
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

        var $this = this

        Laya.Tween.to(this.mountainAn1, {

            y: 100,

            alpha: 1

        }, 5000, null, false, true);


        Laya.Tween.to(this.screen1, {

            alpha: 0

        }, 500, null, false, true);

        Laya.Tween.to(this.screen2, {

            alpha: 1

        }, 500, null, false, true);

        $this.screen2.visible = true
        setTimeout(function () {

            $this.screen1.visible = false

        }, 500)

    };
    GameView.prototype.nextStepClick = function () {

        var $this = this


        Laya.Tween.to(this.mountainAn2, {

            y: 650,
            alpha: 1

        }, 5000, null, false, true);


        Laya.Tween.to(this.screen2, {

            alpha: 0

        }, 500, null, false, true);

        Laya.Tween.to(this.screen3, {

            alpha: 1

        }, 500, null, false, true);

        this.screen3.visible = true;

        this.setDiamonds()

        setTimeout(function () {

            $this.screen2.visible = false;
            $this.countDown($this.time, function () {
                console.log('倒计时结束')
                $this.countDownFn()

            })

            Laya.Tween.to($this.cloudAn1, {

                alpha: 1

            }, 3000, null, false, true);
            Laya.Tween.to($this.cloudAn2, {

                alpha: 1

            }, 3000, null, false, true);

        }, 1000)
    }

    GameView.prototype.setDiamonds = function () {

        console.log('等级', this.level, '____云朵数量', this.cloudNum, '__混淆数量', this.affectNUm, '___速度', this.speed)

        this.clickNum = 0

        var arrTwelve = [], $cloudArr = [], $affectNUm = [], $this = this;

        for (var i = 0; i < 12; i++) {
            arrTwelve.push(i)
        }

        $cloudArr = this.getArrayItems(arrTwelve, this.cloudNum)

        $affectNUm = this.getArrayItems($cloudArr, this.affectNUm)

        this.animateDiamondsfn($cloudArr, $affectNUm)


    };

    var animateDiamonds, animateDiamondsI = 0;

    GameView.prototype.animateDiamondsfn = function ($cloudArr, $affectNUm) {

        var $this = this, $diamonds, $el = this.screen3, animateDiamondsShow, n = 0;

        animateDiamonds = function () {

            $diamonds = $el.getChildByName("diamonds" + $cloudArr[animateDiamondsI]);

            animateDiamondsI = animateDiamondsI < (this.cloudNum - 1) ? (animateDiamondsI + 1) : 0

            console.log('animateDiamondsI', animateDiamondsI)
            console.log('$cloudArr', $cloudArr)
            console.log('$affectNUm', $affectNUm)

            if ($affectNUm.indexOf($cloudArr[animateDiamondsI - 1]) != -1) {
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

            var $Dia;

            for (var j = 0; j < 12; j++) {
                $Dia = this.screen3.getChildByName("diamonds" + j);
                $Dia.skin = '../laya/assets/pageImg/diamondsB0.png'
            }
            $el.mouseEnabled = false


            Laya.timer.loop(this.speed, this, animateDiamonds)


            this.getResult($el)


        }
    };

    GameView.prototype.getResult = function (el) {

        var $this = this

        if (el.value) {

            this.clickNum = this.clickNum + 1;

            this.score = this.score + 100 * this.level

            this.scoreBox.text = this.score

            console.log('点击正确数', this.clickNum)

            this.correctImg.visible = true;
            var imgIndex = 0,

                correctFn = function () {
                    imgIndex = imgIndex + 1 < 18 ? imgIndex + 1 : 0
                    $this.correctImg.skin = '../laya/assets/pageImg/correct' + imgIndex + '.png'
                }
            Laya.timer.loop(50, this, correctFn)
            setTimeout(function () {
                $this.correctImg.visible = false;
                Laya.timer.clear($this, correctFn)
            }, 950)

            //4改为29 ==30
            if (this.clickNum > 4) {
                Laya.timer.clear(this, animateDiamonds)

                //当前等级
                if (this.level < 9) {

                    this.level = this.level + 1;
                    this.changeVal();
                    this.setDiamonds()

                } else {
                    clearInterval(autoTime)
                    setTimeout(function () {

                        Laya.Tween.to($this.screen3, {

                            alpha: 0

                        }, 500, null, false, true);

                        Laya.Tween.to($this.screen4, {

                            alpha: 1

                        }, 500, null, false, true);


                        $this.screen4.visible = true
                        $this.setScreen4()
                        setTimeout(function () {
                            $this.screen3.visible = false
                        }, 500)


                    }, 1000)

                }


            }

        } else {
            console.log('点击错误')

            this.errorImg.visible = true

            var imgIndex = 0,
                errorFn = function () {
                    imgIndex = imgIndex + 1 < 18 ? imgIndex + 1 : 0
                    $this.errorImg.skin = '../laya/assets/pageImg/error' + imgIndex + '.png'
                }

            Laya.timer.loop(50, this, errorFn)
            setTimeout(function () {
                $this.errorImg.visible = false;
                Laya.timer.clear($this, errorFn)
            }, 950)
        }
    };

    GameView.prototype.setScreen4 = function () {

        //钻石移动
        Laya.Tween.to(this.levelLoadD, {

            x: this.level * 100

        }, 1000, null, false, true);

        Laya.Tween.to(this.levelLoad, {

            width: this.level * 100

        }, 1000, null, false, true);

        this.levelScoreBox.text = '得分：' + this.score
        if (this.level >= 9) {
            this.maxLevel.visible = true

        }

    }

    //游戏暂停
    GameView.prototype.stopClick = function () {
        var $this = this

        Laya.Tween.to(this.screen3, {

            alpha: 0

        }, 300, null, false, true);
        Laya.Tween.to(this.screenStop, {

            alpha: 1

        }, 300, null, false, true);


        this.screenStop.visible = true;
        clearInterval(autoTime);
        Laya.timer.clear(this, animateDiamonds);
        setTimeout(function () {
            $this.screen3.visible = false
        }, 300)
    };

    //游戏暂停界面->继续
    GameView.prototype.continueClick = function () {

        // this.setDiamonds()
        var $this = this, $time = this.timeBox.text;


        this.screen3.visible = true

        Laya.timer.loop(this.speed, $this, animateDiamonds)

        this.countDown($time, function () {
            console.log('倒计时结束')
            $this.countDownFn()

        })


        Laya.Tween.to(this.screen3, {

            alpha: 1

        }, 500, null, false, true);
        Laya.Tween.to(this.screenStop, {

            alpha: 0

        }, 500, null, false, true);

        setTimeout(function () {
            $this.screenStop.visible = false
        }, 500)
    }

    //游戏暂停界面->重新开始
    GameView.prototype.restartClick = function () {

        var $this = this

        this.level = this.restartLevel

        this.changeVal()

        this.screen3.visible = true

        animateDiamondsI = 0
        this.setDiamonds()

        this.countDown(120, function () {
            console.log('倒计时结束')
            $this.countDownFn()

        })

        Laya.Tween.to(this.screen3, {

            alpha: 1

        }, 500, null, false, true);
        Laya.Tween.to(this.screenStop, {

            alpha: 0

        }, 500, null, false, true);

        setTimeout(function () {
            $this.screenStop.visible = false
        }, 500)

    }
    //游戏退出
    GameView.prototype.outClick = function () {


    }

    //倒计时  
    var autoTime

    GameView.prototype.countDown = function (i, fn) {

        var $this = this;

        this.timeBox.text = i

        var timeFn = function () {

            i = i - 1

            $this.timeBox.text = i

            if (i == 0) {

                clearInterval(autoTime)

                fn && fn.call(this)

            }

        }

        autoTime = setInterval(timeFn, 1000);
    }

    //到时间后回调
    GameView.prototype.countDownFn = function () {

        Laya.timer.clearAll(this)

        var $this = this;

        this.scoreBox.text = this.score + this.scoreSum

        if (this.clickNum > 27) {

            this.level = this.level < 9 ? this.level + 1 : 9

        } else if (this.clickNum < 10 && (this.level == 1)) {

            this.level = 1

        } else if (this.clickNum < 25 && (this.level >= 2)) {

            this.level = this.level + 1
        }


        $this.screen3.visible = false
        $this.screen4.visible = true
        $this.setScreen4()


    };

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
            this.speed = 1000
        }
        else if (this.level <= 9 && this.level > 6) {
            this.speed = 800
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