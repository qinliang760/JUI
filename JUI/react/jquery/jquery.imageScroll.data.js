/*
 * popSlider
 * require jquery.lightBox.js juicer.js
 * Copyright (c) 2015 jay
 * Licensed under the MIT license.
 */
$.ns("JV");
(function($) {
    /**
     * 
     * @class popSlider
     * @constructor
     * @data data: [{
                "pic": "http://heroes.nos.netease.com/1/images/minisite/mcd/01_S.jpg",
                "title": "标题1",
                "thumb": "描述1"
            }, {
                "pic": "http://heroes.nos.netease.com/1/images/minisite/mcd/02_S.jpg",
                "title": "标题1",
                "thumb": "描述1"
            }, {
                "pic": "http://heroes.nos.netease.com/1/images/minisite/mcd/03_S.jpg",
                "title": "标题1",
                "thumb": "描述1"
            }]
     */
    JV.popSlider = function(Jnode, cfg) {
        var defaults = {
            isShowNum: true,
            showPic: 4, //默认可见图片数
            step: 1,
            speed: 500,
            index: 0,
            loading: "http://wow.nos.netease.com/1/images/wow/10-year/passport/loading.gif",
            data: [], //图片或者视频数组
            prevCallback: function() {},
            nextCallback: function() {}
        };
        this.items = $(Jnode); //html or $
        this.cfg = $.extend({}, defaults, cfg); //合并defaults和cfg，不修改defaults
        this.prevCallback = this.cfg.prevCallback;
        this.nextCallback = this.cfg.nextCallback;
        this.data = this.cfg.data;
        this.isShowNum = this.cfg.isShowNum;
        this.showPic = this.cfg.showPic;
        this.index = this.cfg.index;
        this.step = this.cfg.step;
        this.loading = this.cfg.loading;
        this.speed = this.cfg.speed;
        this.animate = false;
        this.init();

    };

    JV.popSlider.prototype = {
        /**
         * 初始化
         * @param  {dom} Jnode
         * @param  {obj} cfg
         */
        stepIndex: 0, //需要滚动的次数
        setPopHtml: function(index) {
            var self = this,
                data = {},
                data_init = [],
                style = "";

            data_init[index] = self.data[index]; //初始化数据
            data.slide_data_init = data_init;
            data.slide_data = self.data;
            if (!self.data.length) {
                return;
            }

            //if (!self.isShowNum || self.data.length==1) {
            if (!self.isShowNum) {
                style = ' style="display:none"';
            } else {
                style = ' style="display:block"';
            }

            var data_html = [
                '{@each slide_data_init as item,index}',
                //'{@if index==' + index + '}',
                '<div class="w-light-box">',
                '<div class="head">',
                '{@if item.title}',
                '<div class="title">${item.title}</div>',
                '{@/if}',
                '<div class="num"' + style + '>' + (index + 1) + '/' + self.data.length + '</div>',
                '</div>',
                '<div class="content">',
                '{@if item.pic}',
                '<img class="pic" src="${item.pic}" alt=""><img class="loading" src="' + self.loading + '" alt="" />',
                '{@else if item.video}',
                '${item.video|setVideo,item.flv,item.width,item.height}',
                '{@/if}',
                '</div>',
                '{@if item.info}',
                '<div class="info">${item.info}</div>',
                '{@/if}',
                '<div class="w-slider">',
                '<ul>',
                '{@each slide_data as item,index}',
                '{@if item.thumb}',
                '<li rel="${index}" class="{@if index==' + index + '}active{@/if}"><a href="#"><img src="${item.thumb}" alt=""></a></li>',
                '{@/if}',
                '{@/each}',
                '</ul>',
                '</div>',
                '<div class="control"' + style + '>',
                '<a class="prev" href="javascript:void(0);"></a><a class="next" href="javascript:void(0);"></a>',
                '</div>',
                '</div>',
                //'{@/if}',
                '{@/each}'

            ].join('');

            juicer.register('setVideo', self.setVideo);
            var result_html = juicer(data_html, data);

            return result_html;

        },
        setVideo: function(video, flv, width, height) {

            if (document.createElement('video').canPlayType) {
                var html = ['<video width="' + width + '" height="' + height + '" controls="controls" autoplay="false" preload="auto">',
                    //'<source src="' + video + '" type="video/webm">',
                    '<source src="' + video + '" type="video/mp4">',
                    '您的浏览器暂时无法播放此视频.</video>'
                ];
            } else {
                var flash_swf = "http://v.163.com/swf/video/NetEaseFlvPlayerV3.swf";
                var html = [
                    '<object width="' + width + '" height="' + height + '" id="FPlayer" data="' + flash_swf + '" type="application/x-shockwave-flash">',
                    '<param value="transparent" name="wmode" />',
                    '<param value="true" name="allowFullScreen" />',
                    '<param value="always" name="allowscriptaccess" />',
                    '<param value="' + flash_swf + '" allownetworking="all" name="movie" />',
                    '<param value="' + flv + '" name="flashvars" />',
                    '</object>'
                ];


            }
            return html;
        },
        setSlider: function() {
            var self = this;

            //self.items.click(function() {
            //var t = $(this);
            //index = self.items.index(t);
            self.setSliderHtml(self.index);
            //self.index = index;
            //})

        },
        setControl: function() {
            var self = this;
            var slider = $(".w-light-box:visible"),
                btn_next = $(".next", slider),
                btn_prev = $(".prev", slider),
                pic = $(".pic", slider),
                loading = $(".loading", slider),
                length = self.data.length;

            pic.imgpreload(function() {
                loading.hide();
                pic.show();
            })
            if(self.index == length - 1){
                self.stepIndex = length - self.showPic;
            }
            btn_next.click(function() {
                if (self.index >= length - 1) return;
                if (self.index == length - 1) {
                    self.index = 0;                    
                } else {
                    self.index++;
                }

                self.stepIndex++;
                if (self.stepIndex <= length - self.showPic) {
                    self.setSliderAnimate(self.index, "next");
                } else {
                    self.stepIndex = length - self.showPic;
                }

                self.setHandleCallback(self.index, "next");
                self.nextCallback();
            })
            btn_prev.click(function() {

                if (self.index == 0) return;
                if (self.index == 0) {
                    self.index = length - 1;
                } else {
                    self.index--;
                }

                self.stepIndex--;
                //console.log(self.stepIndex);
                if (self.stepIndex >= 0) {
                    self.setSliderAnimate(self.index, "prev");
                } else {
                    self.stepIndex = 0;
                }
                self.setHandleCallback(self.index, "prev");
                self.prevCallback();
            })

            $(".w-slider li").click(function() {
                var index = $(this).attr("rel");
                self.index = index;
                self.setHandleCallback(index);
            })
        },
        setHandleCallback: function(index, controlType) {
            var self = this;
            var slider = $(".w-light-box:visible"),
                pic = $(".pic", slider),
                loading = $(".loading", slider),
                num = $(".num", slider),
                content = $(".content", slider),
                info = $(".info", slider),
                list = $(".w-slider ul", slider),
                title = $(".title", slider),
                length = self.data.length;

            var current_index = self.data[index];
            if (self.data[0].video == null) {
                pic.attr("src", current_index.pic);
                pic.imgpreload(function() {
                    loading.hide();
                    pic.show();
                })
            } else {
                var video_html = self.setVideo(current_index.video, current_index.flv, current_index.width, current_index.height);
                content.html(video_html.join(""));

            }
            if (self.data[0].info != null) {
                info.html(current_index.info);
            }
            if (self.data[0].title != null) {
                title.html(current_index.title);
            }
            num.html((parseInt(index) + 1) + "/" + length);
            list.children().eq(index).addClass("active").siblings().removeClass("active");



        },
        setSliderAnimate: function(index, controlType) {

            var self = this;
            var list = $(".w-slider ul", $(".w-light-box:visible"));
            var imgList = list.children(); //图片数组对象
            var el = imgList.eq(0); //选定一个图片
            var scrollW = el.outerWidth() + parseInt(el.css("margin-left")) + parseInt(el.css("margin-right")); //一次滚动的宽度
            var scrollStep = scrollW * self.step; //每次要滚动的宽度

            var scrollType = "";
            controlType == "prev" ? scrollType = "+=" : scrollType = "-=";
            console.log(index);
            setTimeout(function() {
                list.animate({
                    "margin-left": scrollType + scrollStep
                }, self.speed, "easeOutExpo", function() {
                    self.animate = false;
                });
            }, 100);

        },
        setSliderHtml: function(index) {
            var self = this;
            var html = self.setPopHtml(index);
            $.sc2.lightBox(html, {
                model: true,
                hasClose: true,
                callback: function() {
                    self.setControl();
                    var list = $(".w-slider ul", $(".w-light-box:visible"));
                        var imgList = list.children(); //图片数组对象
                        var el = imgList.eq(0); //选定一个图片
                        var scrollW = el.outerWidth() + parseInt(el.css("margin-left")) + parseInt(el.css("margin-right")); //一次滚动的宽度
                        console.log(imgList.length - index > self.showPic);
                    if (imgList.length - index > self.showPic) {
                        list.css("margin-left", -scrollW * index);
                    }else{
                        list.css("margin-left", -scrollW * parseInt(index/self.showPic));
                    }


                }
            });

        },
        init: function() {
            this.setSlider();
        }

    };


})(jQuery);