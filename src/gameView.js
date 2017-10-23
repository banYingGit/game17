/**
 * 游戏的ui继承类
 */

var GameView = (function (_super) {

    function GameView() {
        GameView.super(this);
    }


    Laya.class(GameView, "GameView", _super);

    GameView.prototype.init = function (userBeans, arr, record, state, userInvest) {


        var $this = this.boxBtn;
        // 金豆类型
        this.btnNumType = arr[0]; //100,200,500,1000
        this.btnTypelen = arr.length;

        // 用户金豆数
        this.userGoldBean = userBeans;

        // 投资项目总数
        this.btnNum = 27;

        // 投注总数
        this.betSum = this.userGoldBean;
        this.investBtnS = [];

        // 初始化 -->用户金豆数
        this.beanNum.text = this.formatMoney(userBeans);
        this.investBtnS = [];

        //开奖状态
        this.state = false;

        // 初始化 -->底部可点击的金豆额度一共4种类型，初始4个
        for (var i = 0; i < 4; i++) {
            this.btnBean = $this.getChildByName("btnBean" + i);
            this.btnType = this.btnBean.getChildByName("btnType");
            this.btnType.text = this.formatMoney(arr[i]);
            this.btnBean.btnType = arr[i];
            this.btnBean.selectIndex = i;
        }

        // 初始化 -->投资项目点击次数
        this.clickSum = 0;
        for (var i = 0; i < this.btnNum; i++) {
            this.investBtn = $this.getChildByName("investBtn" + i);
            this.investBtn.disabled = false;
            this.investBtn.value = i;
            // 点击次数
            this.investBtn.clickNum = 0;
            this.investBtnS.push(this.investBtn);
        }

        /**
         * 点击的事件注册管理
         */

        Laya.stage.on(Laya.Event.CLICK, this, this.stateClick);

        // 底部按钮 -->投注金豆事件
        this.btnBean0.on(Laya.Event.CLICK, this, this.btnBeanClick);
        this.btnBean1.on(Laya.Event.CLICK, this, this.btnBeanClick);
        this.btnBean2.on(Laya.Event.CLICK, this, this.btnBeanClick);
        this.btnBean3.on(Laya.Event.CLICK, this, this.btnBeanClick);

        // 底部按钮 -->撤销事件
        this.revoke.on(Laya.Event.CLICK, this, this.revokeClick);
        // 底部按钮 -->押注事件
        this.stake.on(Laya.Event.CLICK, this, this.stakeClick);
        // 底部按钮 -->揭晓事件
        this.announced.on(Laya.Event.CLICK, this, this.announcedClick);

        //顶部玩法说明
        this.ruleBtn.on(Laya.Event.CLICK, this, function () {

            this.ruleBox.visible = true;

        });
        this.continue.on(Laya.Event.CLICK, this, function () {

            this.ruleBox.visible = false;

        });

        //顶部menu菜单
        this.menuBtn.on(Laya.Event.CLICK, this, function (evt) {

            var e = evt || window.event;

            e.stopPropagation();

            this.menuBox.visible = true;


        });
        this.boxBtn.on(Laya.Event.CLICK, this, function () {

            this.menuBox.visible = false;

        });
        //顶部金豆充值
        this.addBean.on(Laya.Event.CLICK, this, function () {

            //TODO 金豆充值


        });

        //游戏结束继续游戏
        this.successClose.on(Laya.Event.CLICK, this, this.continueClick);

        //往期记录
        this.recordData(record);

        //初始投注画布
        if (!state) this.canvas(userInvest);

        //请求新闻接口
        this.noticeAntiate();



    };

    GameView.prototype.stateClick = function (e) {

        var elm = e.target.name;

        // console.log('elm', e.target)

        if (elm.indexOf("investBtn") != -1) {
            // 投注按钮 -->投注金豆事件
            this.investClick(e)

        }
        // else if (elm.indexOf("btnBean") != -1) {
        //     console.log('btnBean', e.target)
        //
        //     this.btnBeanClick(e)
        //
        // }
    };

    GameView.prototype.btnBeanClick = function (evt) {
        var e = evt || window.event,
            target = e.target,
            index = target.selectIndex,
            $this = this.boxBtn;
        for (var i = 0; i < this.btnTypelen; i++) {
            if (i === index) {
                $this.getChildByName("btnBean" + i).selected = true;

            } else {
                $this.getChildByName("btnBean" + i).selected = false;
            }
        }
        this.btnNumType = target.btnType;

        console.log('选择投注----btnNumType', this.btnNumType)

    };
    GameView.prototype.investClick = function (evt) {

        // console.log("可投注金豆数量", this.betSum, this.btnNumType)

        if (this.betSum < this.btnNumType) {

            //TODO 豆不够用了 充值去
            return false

        }

        var e = evt || window.event;
        this.getPosition(e);

    };
    // 金豆显示动画
    GameView.prototype.getPosition = function (e) {
        var $this = this.boxBtn;
        var target = e.target; // 发生事件的本身
        target.clickNum++;  // 发生事件点击次数
        this.clickSum++;
        //console.log('你点target-->次', target.clickNum)
        //console.log('你总共点-->次', this.clickSum)
        // console.log('target.value', target.value)
        var x = target.x + target.width / 2;
        var y = target.y + target.height / 2;
        var goodBean = new Laya.Sprite();
        goodBean.loadImage("bin/dice/goodBean.png");
        goodBean.pos(700, 2000);
        $this.addChild(goodBean);
        Laya.Tween.to(goodBean, {
            x: x,
            y: y,
            scaleY: 1.5,
            scaleX: 1.5
        }, 500, null, Laya.Handler.create(this, this.beansRemove(target, goodBean)), false, true);
    };

    // 金豆动画结束的回调函数
    GameView.prototype.beansRemove = function (e, bean) {

        this.betSum = this.betSum - this.btnNumType;
        this.beanNum.text = this.formatMoney(this.betSum);
        var $this = this;
        setTimeout(function () {
            bean.visible = false;
            $this.showBetImg(e.value, e.clickNum);
        }, 500)

    };
    // 显示投注金额
    GameView.prototype.showBetImg = function (value, clickNum) {
        var $this = this.boxBtn;
        this.btnImg = $this.getChildByName("btnImg" + value); // 获取投注显示图片
        this.beansText = this.btnImg.getChildByName("beansNum");  // 获取投注文字
        this.beansText.text = this.formatMoney(+(this.beansText.text) + this.btnNumType);
        this.btnImg.visible = true;


    };
    //撤销
    GameView.prototype.revokeClick = function (evt) {

        var $this = this.boxBtn;

        for (var i = 0; i < this.btnNum; i++) {

            this.btnImg = $this.getChildByName("btnImg" + i); // 获取投注显示图片
            this.beansText = this.btnImg.getChildByName("beansNum");  // 获取投注文字
            this.beansText.text = 0;  // 获取投注文字
            this.btnImg.visible = false;
        }
        this.beanNum.text = this.formatMoney(this.userGoldBean);
        this.betSum = this.userGoldBean

    };
    //押注
    GameView.prototype.stakeClick = function () {

        // console.log('>>>>>>>>/', this.userGoldBean, this.betSum)

        if (this.userGoldBean == this.betSum) {

            this.gameAlert("请先投注")

            return false

        }

        this.stake.visible = false;
        this.announced.visible = true;

        var $this = this.boxBtn,
            val = 0,
            sendData = {};
        for (var i = 0; i < this.btnNum; i++) {
            val = parseInt($this.getChildByName("btnImg" + i).getChildByName("beansNum").text);
            sendData[i] = val;

        }
        //向后台发送数据--未开奖
        var http = new Laya.HttpRequest(),
            pram = {
                state: this.state,
                userBean: this.betSum,
                userInvest: JSON.stringify(sendData)
            };

        //TODO 向后台发送数据pram
        //这里init 作为保存路径
        http.send("bin/data/init.json", pram, "get", "json");
        console.log("向后台发送数据pram", pram);

        http.once(Laya.Event.COMPLETE, this, function (data) {

            //揭晓按钮事件
            this.startBtn.on(Laya.Event.CLICK, this, this.announcedClick);
            //舞台禁止在进行押注
            for (var i = 0; i < this.btnNum; i++) {
                this.investBtn = $this.getChildByName("investBtn" + i);
                this.investBtn.mouseEnabled = false;
            }
            this.revoke.mouseEnabled = false;


        })
    };
    //揭晓
    GameView.prototype.announcedClick = function () {

        //禁止舞台操作
        this.boxBtn.mouseEnabled = false;

        this.boxBtn.vScrollBar.value = 0;

        var a = 0, b = 7, c = 3;

        Laya.timer.frameLoop(5, this, function () {

            this.dice1.rotation += 60;
            this.dice2.rotation += 60;
            this.dice3.rotation += 60;
            a = a < 6 ? (a + 1) : 1;
            b = b < 2 ? 6 : (b - 1);
            c = c < 6 ? (c + 1) : 1;
            this.dice1.loadImage("bin/dice/s" + a + ".png");
            this.dice2.loadImage("bin/dice/s" + b + ".png");
            this.dice3.loadImage("bin/dice/s" + c + ".png");

        });
        Laya.timer.once(2000, this, this.requestData);


    };
    //请求后台结果
    GameView.prototype.requestData = function () {

        this.state = true;
        // console.log('this.state', this.state)
        var http = new Laya.HttpRequest(),
            pram = {
                state: this.state
            };

        http.send("bin/data/result.json", pram, "get", "json");

        http.once(Laya.Event.COMPLETE, this, function (data) {

            Laya.timer.clearAll(this);

            this.dice1.rotation = 0;
            this.dice2.rotation = 0;
            this.dice3.rotation = 0;
            this.dice1.loadImage("bin/dice/s" + data.dice1 + ".png");
            this.dice2.loadImage("bin/dice/s" + data.dice2 + ".png");
            this.dice3.loadImage("bin/dice/s" + data.dice3 + ".png");

            var bean = "恭喜您获得" + data.bean + "金豆",
                sum = +(data.dice1) + (+(data.dice2)) + (+(data.dice3)),
                EO = sum % 2 == 1 ? "奇" : "偶",
                skin1 = "bin/dice/r" + data.dice1 + ".png",
                skin2 = "bin/dice/r" + data.dice2 + ".png",
                skin3 = "bin/dice/r" + data.dice3 + ".png";


            Laya.timer.once(800, this, function () {

                if (data.result) {

                    this.success.visible = true;
                    this.successText.text = bean;
                    this.successSum.text = "和值" + sum + "," + EO;
                    this.successImg1.skin = skin1;
                    this.successImg2.skin = skin2;
                    this.successImg3.skin = skin3;

                } else {

                    this.fail.visible = true;
                    this.failImg1.skin = skin1;
                    this.failImg2.skin = skin2;
                    this.failImg3.skin = skin3;

                }

            });

        });

        http.once(Laya.Event.ERROR, this, function () {
            console.log("请求错误")
        });


    };

    GameView.prototype.gameAlert = function (mes) {

        this.alertBox.visible = true;

        this.alertText.text = mes;

        //禁止舞台操作
        this.boxBtn.mouseEnabled = false;

        var $this = this;

        this.alertClose.on(Laya.Event.CLICK, this, function () {

            $this.alertBox.visible = false;

            $this.boxBtn.mouseEnabled = true;

        });


    };
    GameView.prototype.formatMoney = function (data) {

        var $data;

        $data = data <= 9999 ? data : (data / 10000 + "W");

        return $data

    };

    //文字滚动
    GameView.prototype.noticeAntiate = function () {


        var http = new Laya.HttpRequest(),
            pram = {},
            arr = [];

        http.send("bin/data/notice.json", pram, "get", "json");

        http.once(Laya.Event.COMPLETE, this, function (data) {

            arr = data.notice;

            this.noticeList.array = arr;

            this.noticeList.renderHandler = new Laya.Handler(this, onRender);

            var i = 0, $y = '', time = 500;

            Laya.timer.loop(3000, this, function () {


                if (i < (arr.length - 1)) {

                    i = i + 1;

                    $y = -30 * i;

                    time = 500


                } else {

                    i = 0;

                    $y = 30;

                    time = 0

                }


                Laya.Tween.to(this.noticeList, {


                    y: $y

                }, time, null, Laya.Handler.create(this, function () {

                    if (i != 0)return false;

                    Laya.Tween.to(this.noticeList, {

                        y: 0

                    }, 500, null, Laya.Handler.create(this));


                }), false, true);


            });


        });


        function onRender(cell, index) {


            if (index == arr.length)return;

            var $data = arr[index];


            var noticeData = cell.getChildByName("noticeData");

            noticeData.text = $data;


        }


    };

    //布置画布
    GameView.prototype.canvas = function (data) {

        // console.log("data>>>.....this.btnNum=27", data)

        var $this = this.boxBtn,
            arrData = [];

        for (var i in data) {

            arrData.push(data[i])

        }


        for (var i = 0; i < this.btnNum; i++) {

            this.btnImg = $this.getChildByName("btnImg" + i); // 获取投注显示图片


            this.beansText = this.btnImg.getChildByName("beansNum");  // 获取投注文字

            if (+(arrData[i]) > 0) {

                this.beansText.text = this.formatMoney(+(arrData[i]));

                this.btnImg.visible = true;

                //押注按钮
                this.stake.visible = false;
                //揭晓按钮
                this.announced.visible = true;
                //撤销按钮
                this.revoke.mouseEnabled = false;

                //揭晓按钮事件
                this.startBtn.on(Laya.Event.CLICK, this, this.announcedClick);

                //舞台禁止在进行押注
                for (var n = 0; n < this.btnNum; n++) {
                    this.investBtn = $this.getChildByName("investBtn" + n);
                    this.investBtn.mouseEnabled = false;
                }


            } else {

                this.beansText.text = 0;

                this.btnImg.visible = false;

                this.revoke.mouseEnabled = true;

                for (var n = 0; n < this.btnNum; n++) {
                    this.investBtn = $this.getChildByName("investBtn" + n);
                    this.investBtn.mouseEnabled = true;
                }

            }

        }


    };

    //往期记录
    GameView.prototype.recordData = function (data) {

        if (data.length == 0) {

            this.recordNo.visible = true;

            this.record.visible = false;


        } else {

            this.recordNo.visible = false;

            this.record.visible = true;

            var iconArr = [], sumArr = [], recordArr1 = [], recordArr2 = [], recordArr3 = [], recordData = [],
                lenArr = data.length;

            for (var i = 0; i < lenArr; i++) {

                var sum = eval(data[i].join("+")),
                    icon = eval(data[i].join("+")) % 2,
                    record1 = data[i][0],
                    record2 = data[i][1],
                    record3 = data[i][2];

                sumArr.push(sum);
                recordArr1.push(record1);
                recordArr2.push(record2);
                recordArr3.push(record3);

                if (icon == 0) {

                    iconArr.push("bin/dice/icon4.png");

                } else {

                    iconArr.push("bin/dice/icon4s.png")

                }

            }

            this.record.array = data;

            this.record.renderHandler = new Laya.Handler(this, onRender);

            function onRender(cell, index) {

                if (index == lenArr)return;

                cell.getChildByName("recordSum").text = sumArr[index];

                cell.getChildByName("record1").text = recordArr1[index];

                cell.getChildByName("record2").text = recordArr2[index];

                cell.getChildByName("record3").text = recordArr3[index];

                cell.getChildByName("recordIcon").skin = iconArr[index];


            }

        }

    };

    //继续游戏
    GameView.prototype.continueClick = function () {


        location.reload()

        // var http = new Laya.HttpRequest(),
        //     pram = {};
        //
        //
        // http.send("bin/data/init.json", pram, "get", "json");
        //
        // http.once(Laya.Event.COMPLETE, this, function (data) {
        //
        //     this.init(data.userBean, data.btnType, data.record);
        //
        // });
        //
        //
        // this.success.visible = false;
        //
        // this.fail.visible = false;
        //
        //
        // this.boxBtn.mouseEnabled = true;


    };

    return GameView;

})(ui.gameViewUI);