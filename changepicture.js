// JavaScript Document
$(document).ready(function () {
            (new CenterImgPlay()).Start();
        });
        function CenterImgPlay() {
            this.list = $(".imgbox").children(":first").children();
            this.indexs = [];
            this.length = this.list.length;
            //图片显示时间
            this.timer = 3000;
            this.showTitle = $(".title");

            var index = 0, self = this, pre = 0, handid, isPlay = false, isPagerClick = false;

            this.Start = function () {
                this.Init();
                //计时器，用于定时轮播图片
                handid = setInterval(self.Play, this.timer);
            };
            //初始化
            this.Init = function () {
                var o = $(".pager ul li"), _i;

                for (var i = o.length - 1, n = 0; i >= 0; i--, n++) {
                    this.indexs[n] = o.eq(i).click(self.PagerClick);
                }
            };
            this.Play = function () {
                isPlay = true;
                index++;
                if (index == self.length) {
                    index = 0;
                }
                //先淡出，在回调函数中执行下一张淡入
                self.list.eq(pre).fadeOut(300, "linear", function () {
                    var info = self.list.eq(index).fadeIn(500, "linear", function () {
                        isPlay = false;
                        if (isPagerClick) { handid = setInterval(self.Play, self.timer); isPagerClick = false; }
                    }).attr("title");
                    //显示标题
                    self.showTitle.text(info);
                    //图片序号背景更换
                    self.indexs[index].css("background-color", "#FF70Ad");
                    self.indexs[pre].css("background-color", "#6f4f67");

                    pre = index;
                });
            };
            //图片序号点击
            this.PagerClick = function () {
                if (isPlay) { return; }
                isPagerClick = true;

                clearInterval(handid);

                var oPager = $(this), i = parseInt(oPager.text()) - 1;

                if (i != pre) {
                    index = i - 1;
                    self.Play();
                }
            };
        };