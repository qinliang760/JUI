/*
 * timeline
 * require jquery.lightBox.js juicer.js
 * Copyright (c) 2015 jay
 * Licensed under the MIT license.
 */

(function($) {
    /**
     * 
     * @class timeline
     * @constructor
     * @data data: [{
        "images":[
            {
                "thumb":"http://hearthstone.nos.netease.com/1/sls/浙江赛区/杭州/small/822A2236.jpg",
                "title":"现场一",
                "large":"http://hearthstone.nos.netease.com/1/sls/浙江赛区/杭州/small/822A2236.jpg"
            },
            {
                "thumb":"http://hearthstone.nos.netease.com/1/sls/shandong/juesai/small/观众互动.JPG",
                "title":"现场二",
                "large":"http://hearthstone.nos.netease.com/1/sls/shandong/juesai/small/观众互动.JPG"
            }
        ],
        "thumb":"http://hearthstone.nos.netease.com/1/sls/浙江赛区/杭州/small/822A2236.jpg",
        "title":"1",
        "date":"11"
    }]
     */
    JV.timeline = function(Jnode, cfg) {
        var defaults = {
            range:130,//点与点之间距离
            contentWidth:223,//时间轴上内容的宽度
            offset:0,//时间轴上内容的偏移量
            loading: "http://wow.nos.netease.com/1/images/wow/10-year/passport/loading.gif",
            data: [], //图片或者视频数组    
            prevCallback: function() {},
            nextCallback: function() {}
        };
        this.items = $(Jnode); //id or class 
        this.cfg = $.extend({}, defaults, cfg); //合并defaults和cfg，不修改defaults
        this.prevCallback = this.cfg.prevCallback;
        this.nextCallback = this.cfg.nextCallback;
        this.data = this.cfg.data;
        this.loading = this.cfg.loading;
        this.contentWidth = this.cfg.contentWidth;
        this.range = this.cfg.range;
        this.offset = this.cfg.offset;
        this.init();

    };
 
    JV.timeline.prototype = {
        /**
         * 初始化
         * @param  {dom} Jnode
         * @param  {obj} cfg
         * set{string}Html、setHandle、init
         */
        setTimelineHtml: function() {
            var self = this,
                data = {};
   
            data.timelineData = self.data;

            var data_html = [
                    '<div class="w-timeline">',
                    '<div class="timeLineWrap">',
                    '<div class="timeLine" style="width:'+(self.range*data.timelineData.length+self.contentWidth+self.offset)+'px">',            
                        '{@each timelineData as item,index}',
                            '<div style="${index|setLineSpace,'+self.range+'}" class=${index|setClass}><span class="date">${item.date}</span></div>',
                            '<div class="box box_${index|setClass}" rel=${index} style="${index|setBoxSpace,'+self.range+','+self.contentWidth+','+self.offset+'}">',
                            '<span class="title">${item.title}</span>',
                            '<span class="mirror"></span>',
                            '<img src=${item.thumb}>',
                            '</div>',            
                        '{@/each}',
                    '</div>',
                    '</div>',                    
                    '</div>',
                    '<div class="control">',
                        '<a href="javascript:void(0);" class="prev"></a>',
                        '<a href="javascript:void(0);" class="next"></a>',
                    '</div>'                    
            ].join('');

            juicer.register('setLineSpace', self.setLineSpace);
            juicer.register('setBoxSpace', self.setBoxSpace);
            juicer.register('setClass', self.setClass);
            var result_html = juicer(data_html, data);

            return result_html;

        },
        setScrollHandle:function(){
            var self=this;
            var control=$(".control a",this.items);
            var scrollPx=0;
            control.click(function(){
                var cls=$(this).attr("class");
                var left_v=Math.abs(parseInt($(".mCSB_container").css("left")));
                if(cls=="prev"){
                    if(left_v==0){
                        scrollPx=self.range*2;
                        return;
                    }
                    scrollPx=left_v-self.range*2;
                }else{
                    scrollPx=left_v+self.range*2;
                }

                $(".w-timeline").mCustomScrollbar("scrollTo",scrollPx);
            })
        },
        setLineSpace:function(index,r){
            var left_v=parseInt(index)*r+r;
            return "left:"+left_v+"px"
        },
        setBoxSpace:function(index,r,cw,offset){
            var left_v=parseInt(index)*r-cw/2+r+offset;
            return "left:"+left_v+"px"
        },
        setClass:function(index){
            var rowClass;
            index%2==0?rowClass="even":rowClass="odd";
            return rowClass;
        },
        init: function() {
            this.items.html(this.setTimelineHtml());
            this.setScrollHandle();
        }

    };


})(jQuery);