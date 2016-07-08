/*
 * lightBox
 *
 * Copyright (c) 2014 jay
 * Licensed under the MIT license.
 */
$.ns("JV");
(function($){
    /**
     * 
     * @class lightBox
     * @constructor
     */
    JV.lightBox = function(Jnode, cfg) {
        var defaults = {
            model: false,
            hasClose: true,
            fixed: false,
            opacity: "0.8",
            callback: function() {}
        };
        this.items = Jnode;//html or $
        this.cfg = $.extend({}, defaults, cfg); //合并defaults和cfg，不修改defaults
        this.callback=this.cfg.callback;
        this.init();

    };
  
  JV.lightBox.prototype = {
        /**
         * 初始化
         * @param  {dom} Jnode
         * @param  {obj} cfg
         */
        setModel: function() {
            var self = this,
                modelHtml = "<div id='boxModel'></div>",
                wW = $(window).width(),
                bH = $(document).height();
            $("body").append(modelHtml);
            var boxModel = $("#boxModel");
            boxModel.width(wW).height(bH).css("opacity", self.cfg.opacity).show();


            boxModel.live("click touchstart", function() {
                self.items.hide();
                boxModel.remove();
            })


        },
        setPosition: function() {
            var self=this;
            if (typeof self.items == "string") {
                if ($("body").find("#popBox").length != 0) {
                    $("#popBox").remove();
                }
                var str = "<div id='popBox'>" + self.items + "</div>";
                $("body").append(str);
                self.items = $("#popBox");
            }
            self.setFresh();
        },
        setFresh:function(){
            var self=this;
            var wW = $(window).width(),
                wH = $(window).height(),
                wScrollTop = $(window).scrollTop(),
                bW = self.items.width(),
                bH = self.items.height(),
                bLeft = (wW - bW) / 2,
                bTop = (wH - bH) / 2 + wScrollTop;


            var fixedTop = (wH - bH) / 2;
            var ie6 = $.browser.msie && $.browser.version == 6;
            if (self.cfg.fixed && !ie6) {
                self.items.css({
                    "position": "fixed"
                });
                bTop = fixedTop;
            }
            self.items.css({
                "left": bLeft + "px",
                "top": bTop + "px"
            }).show("fast", function() {
                self.callback();
            });
        },
        setClose: function() {
            var self=this;
            var closeObj = "<a class='closeBtn' href='javascript:;'>关闭</a>";
            if (!self.items.find(".closeBtn").length) {
                self.items.append(closeObj);
            }
            self.items.find(".closeBtn").live("click", function() {
                self.items.hide();
                if (self.cfg.model) {
                    $("#boxModel").remove();
                }
                return false;
            })
        },
        init: function() {
            var self=this;
            self.setPosition();
            self.cfg.model ? self.setModel() : "";
            self.cfg.hasClose ? self.setClose() : "";
        }

  };


 })(jQuery);