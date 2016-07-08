/*!
/*!
 * Base On jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 * Libs:Jay imageScroll
 * Copyright 2012, QinLiang
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Date: 2013.2.21
 */

(function($) {
	var imageScroll = {
		defaults: {
			showPic: 4, //默认可见图片数
			step: 1,
			btnActive: true, //按钮是否一直处于激活状态
			auto: false,
			showNum: false, //是否显示数字标签
			numClass: "newerNum", //数字列表
			prevClass: "prev",
			nextClass: "next",
			imgWrapId: "imgList",
			isShowControl:true,
			speed:500,
			prevCallback:function(){},
			nextCallback:function(){}

		}
	};

	function ImageScroll(root, defaults) {
		var self = this,
			boxObj = root,
			imgWrap = $("#" + defaults.imgWrapId),
			prevBtn = boxObj.find("." + defaults.prevClass),
			nextBtn = boxObj.find("." + defaults.nextClass),
			numList = boxObj.find("." + defaults.numClass).children(),
			num = defaults.showPic,
			speed=defaults.speed,
			animate = false,
			timer, index;

		$.extend(this, {
			getScroll: function() {
				var imgList = imgWrap.children(); //图片数组对象
				var el = imgList.eq(0); //选定一个图片
				var scrollW = el.outerWidth() + parseInt(el.css("margin-left")) + parseInt(el.css("margin-right")); //一次滚动的宽度
				var scrollStep = scrollW * defaults.step; //每次要滚动的宽度
				var imgListL = imgList.length; //图片的个数
				var imageAllW = parseInt(scrollW) * imgListL; //总的宽度
				var wrapMar = Math.abs(parseInt(imgWrap.css("margin-left"))); //已滚动的数值
				var lastNum=Math.floor(imgListL%(defaults.step));//最后一组的个数
				if(lastNum!=0){
					num=lastNum;
				}
				var lastW = imageAllW - scrollW * num; //剩余最后一组时的滚动数值
				index = wrapMar / scrollStep;
				var options = {
					prevScrollRange: scrollStep,
					nextScrollRange: scrollStep,
					numRange: scrollStep,
					index: index
				};
				if (imgListL <= num) {
					options.prevRun = false;
					options.nextRun = false;
					return options;
				}

				if (wrapMar == 0) {
					options.prevRun = false;
					options.nextRun = true;
					if (defaults.btnActive) {
						options.prevRun = true;
						options.prevScrollRange = -lastW;
					}
				} else if (wrapMar == lastW) {
					options.prevRun = true;
					options.nextRun = false;
					if (defaults.btnActive) {
						options.nextRun = true;
						options.nextScrollRange = -lastW;
					}
				
				} else {
					options.prevRun = true;
					options.nextRun = true;			
				}
				return options;
			},
			scrollAnimate: function(btn, range) {
/*				if(defaults.isNormalEffect){
					var index = self.getScroll().index;
					imgWrap.children().eq(index).show().siblings().hide();
					return;
				}*/
				if (animate) return;
				animate = true;
				var scrollType = "";
				btn == "prev" ? scrollType = "+=" : scrollType = "-=";
				range += "px";

				if (defaults.showNum) {
					var l = numList.length;

					if (btn == "prev") {
						index = self.getScroll().index;
						if (index == 0) {
							index = l - 1;
						} else {
							index--;
						}

					} else if (btn == "next") {
						index = self.getScroll().index;
						if (index == l - 1) {
							index = 0;
						} else {
							index++;
						}

					} else {
						scrollType = "-";
					}
					self.scrollNum(index);

				}
				setTimeout(function() {
					imgWrap.animate({
						"margin-left": scrollType + range
					}, speed,"easeOutExpo", function() {
						animate = false;
						var index = self.getScroll().index,
						l=imgWrap.children().length;
						if (!defaults.isShowControl) {

							if (index == 0) {
								prevBtn.hide();
								nextBtn.show();
							}else if (index == l-num) {
								prevBtn.show();
								nextBtn.hide();
							} else {
								prevBtn.show();
								nextBtn.show();
							}
						}						

					});
				}, 100);
			},
			scrollNum: function(index) {
				numList.eq(index).addClass("active").siblings().removeClass("active");
			},
			scrollRun: function() {
				prevBtn.click(function() {
					var options = self.getScroll();
					if (options.prevRun) {
						self.scrollAnimate("prev", options.prevScrollRange);
					}
					defaults.prevCallback();
					return false;
				})
				nextBtn.click(function() {
					var options = self.getScroll();
					if (options.nextRun) {
						self.scrollAnimate("next", options.nextScrollRange);
					}
					defaults.nextCallback();
					return false;
				})
				if (defaults.showNum) {
					numList.click(function() {
						var options = self.getScroll();
						index = numList.index($(this));
						var range = options.numRange * index;
						self.scrollAnimate("num", range);
						return false;
					})
				}
			},
			auto: function() {
				timer = setInterval(function() {
					var options = self.getScroll();
					self.scrollAnimate("next", options.nextScrollRange)
				}, 3000);
			},
			stopAuto: function() {
				clearInterval(timer);
			},
			init: function() {
				if (defaults.auto) {
					self.auto()
					prevBtn.hover(function() {
						self.stopAuto();
					},

					function() {
						self.auto();
					})
					nextBtn.hover(function() {
						self.stopAuto();
					},

					function() {
						self.auto();
					})
					imgWrap.hover(function() {
						self.stopAuto();
					},

					function() {
						self.auto();
					})
					numList.hover(function() {
						self.stopAuto();
					},

					function() {
						self.auto();
					})

				}
				this.scrollRun();
			}
		})
		self.init();

	}

	$.fn.imageScroll = function(defaults) {
		defaults = $.extend({},
		imageScroll.defaults, defaults);
		return this.each(function() {
			el = new ImageScroll($(this), defaults);
		})

	}
	$.sc2 = $.sc2 || {};
	$.sc2.imageScroll = function(defaults) {
		defaults = $.extend({},
		imageScroll.defaults, defaults);
		new ImageScroll(defaults);
	}


})(jQuery);