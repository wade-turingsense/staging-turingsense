//Animate CSS + WayPoints javaScript Plugin
//Example: $(".element").animated("zoomInUp", "zoomOutDown");
//Author URL: http://webdesign-master.ru
(function($) {
		$.fn.animated = function(inEffect, outEffect) {
				//if ($(this).is('.animate--once')) { return false;}
				if(!$(this).is('.animate-image-zoom')) {
					$(this).css("opacity", "0").addClass("animated")
				}
				$(this).waypoint(function(dir) {
						if (dir === "down") {
								$(this).removeClass(outEffect).addClass(inEffect).css("opacity", "1"); 
						} else {
							if (!$(this).is('.animate--once'))
								$(this).removeClass(inEffect).addClass(outEffect).css("opacity", "1");
						};
				}, {
						offset: "95%"
				}).waypoint(function(dir) {
						if (dir === "down") {
							if (!$(this).is('.animate--once'))
								$(this).removeClass(inEffect).addClass(outEffect).css("opacity", "1");
						} else {
								$(this).removeClass(outEffect).addClass(inEffect).css("opacity", "1");
								
						};
				}, {
						offset: -$(window).height()
				});
		};
})(jQuery);