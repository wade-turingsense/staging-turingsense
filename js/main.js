/* 
	
	Search with ctr(cmd)+f
	 
	1) Include elenents
	 
	2) Translate elements

	3) Fixed footer
	
	4) Typed text
	
	5) Tabs
	
	6) Anchor
	
	7) Parallax
	
	8) Navigation 
	
	9) Dropdown 
	
	10) Close dropdowns
	
	11) Accordion
	
	12) Toggle Section
	
	13) Baners
	
	14) Form Elements
	
	15) Modal - forms 
	
	16) Modal - work
	
	17) Modal - video
	
	18) Modal - search
	
	19) Form send
	
	20) Animated
	
	21) Countdown
	
	22) Masonry
	
	23) Slider
	
	24) Progress
	
	25) Swipe 
	
	26) Sticky
	
	27) Video bg
	
	28) Instagram
	
	29) Loader -- spiner
	
	30) Google Map
	
	31) MixItUp
	
	32) Load functions
	
 
*/

// 0) extending global functions to support inheritance

Function.prototype.inheritFrom = function(parent)
{
	if (!parent || !parent instanceof Function)
		return;
	var child = this;
	for (var i in parent.prototype)
		if (i != null && !child.hasOwnProperty(i) && child.prototype[i] == null)
			child.prototype[i] = parent.prototype[i];
};

Function.prototype.callBaseMethod = function(ctx, method, params)
{
	var f = this.prototype[method];
	if (f instanceof Function)
		return f.apply(ctx, params);

	return undefined;
};

$(document).on('click', 'a[href="#"]', function (e) {
	e.preventDefault();
});

jQuery(document).on("mobileinit", function() {
    jQuery.mobile.autoInitializePage = false;
});

// 1) Include elenents
// -----------------------------------------------------------------------

function include() {
	"use strict";
	$('body').find('[data-include]').each(function(){ 
		var This = $(this)
		var file = This.attr('data-include');
		if(This.is('span')) { return false; }
		$.get("include/"+file+".html", function(data) {
			This.replaceWith('<span data-include="'+file+'" class="hide include__before"></span>'+data+'<span class="hide include__after"></span>');
		});
	});
	
	$('body').find('.include__before').each(function(){ 
		var This = $(this);
		var file = This.attr('data-include');
		if(This.next().is('.include__after')) { 
			$.get("include/"+file+".html", function(data) {
				This.after(data)
			});
		}
	});
};	



// 2) Translate elements
// -----------------------------------------------------------------------
function translate() {
	"use strict";
	$(document).find('[data-translate]').each(function(){
		var translate = $(this).data('translate')
		$(this).css('transform','translate('+translate+')')
	})
}

// 3) Fixed footer
// -----------------------------------------------------------------------
function addFixedFooter() {
	"use strict";
	if($(document).find('.footer--hidden').length > 0) {
		$(document).imagesLoaded(function(){
			var This = $('.footer--hidden');
			var height = This.outerHeight();
			if (This.is('[class*=bg-color--white]')) {
				var shadow = 'rgba(0, 0, 0, .7) 0px 56px 171px 0px'
			} else {
				var shadow = 'rgba(0, 0, 0, .8) 0px 88px 113px 0px'
			}
			if (This.prev().is('.banner[data-waypoint]')) {
				This.prev().prev().addClass('FixedFooter').css('margin-bottom', height).css('box-shadow', shadow)
			} else {
				This.prev().addClass('FixedFooter').css('margin-bottom', height).css('box-shadow', shadow)
			}
		});
	};
}

function DestroyFixedFooter() {
	"use strict";
	$('.FixedFooter').removeAttr('style').removeClass('FixedFooter')
}

// 4) Typed text 
// -----------------------------------------------------------------------
// https://github.com/mattboldt/typed.js/

function addTyped() {
	"use strict";
	$(document).find('.typed').each(function(){
	var This = $(this)
	var text = This.text()
	var re = /\s*,\s*/
	var tagList = text.split(re);
	var speed = parseInt(This.attr('data-speed'), 10);
	var repeat = This.attr('data-repeat');
	
	This.attr('data-text', This.text()); // for destroy function

	    Typed.new('.typed', {
		    strings: tagList,
		    typeSpeed: speed,
		    loop: repeat,
	    });
	 });
	
}

function addTypedDestroy() {
	"use strict";
	$(document).find('.typed').each(function(){
		var parent = $(this).parent()
		var This = $(this)
		var text = This.attr('data-text')
		var el = This.clone().html(text)
		var text = This.html(text);
		
		This.next('.typed-cursor').remove() 
		This.remove()
		parent.append(el)
		
	}); 
}

// 5) Tabs
// -----------------------------------------------------------------------

function addTabs() {
	"use strict";
	$('.tabs').on('click', '.tabs__links li:not(.active)', function(){
		var tabs = $(this).parents('.tabs');
		var tabscontent = $(this).attr('data-tab-link');
		var links = $(this).parent('.tabs__links');

		links.find('li').removeClass('active');
		$(this).toggleClass('active');

		tabs.find('.tabs__content.active').hide().removeClass('active');
		tabs.find('.tabs__content[data-tab-content="'+tabscontent+'"]').show().addClass('active');
		if (tabs.find('.grid').length) {
			masonryGrid();
		}
	});
}

// 6) Anchor         
// -----------------------------------------------------------------------

function anchor() {
	"use strict";
	$('a[href^="#"]').on('click.smoothscroll',function (e) {

		var target = this.hash;
		if ((target || '') == '')
			return;

		var offset = $(target).offset();
		if (!offset) {
			return;
		}

		e.preventDefault();
		$('html, body').stop()
			.animate({'scrollTop': offset.top}, 900, 'swing', function() { window.location.hash = target; });
	});
}

// 7) Parallax
// -----------------------------------------------------------------------

function fixTranslate() {
	"use strict";
	$('.parallax').css({'transform': 'translateY(0px)'});
}

function floatingtext(update) {
	"use strict";
	var positionCb = function() {
		var st = $(document).scrollTop();

		floatingtext.__list.each(function() {
			var el = $(this);
			var range = el.attr('data-range');
			var offset = el.next().offset().top;

			el.css({ 'transform': 'translateY(' + ((st) - offset) * range +'px)' });
		});
	};

	floatingtext.__list = $('.parallax');
	if (update || false)
	{
		positionCb();
		return;
	}

	$(document).on('ready', positionCb);
	$(document).on('scroll', positionCb);
	$('.w-page').on('scroll', positionCb);
}

// 8) Navigation 
// -----------------------------------------------------------------------


// resize Nav row
$('.row--nav').each(function(){
	"use strict";
	var logoheight = $(this).find('.logo img').height()
	if($(this).is('.row--nav--bottom')) {
		var height = logoheight+35+'px'
	} else {
		var height = logoheight+50+'px'
	}
	$(this).css('line-height', height)
})

// toggle side-bar & menu
function addNavigation() {	
	"use strict";
	$(document).on('click', '.nav-toggle:not(.active)', function(){
		var section = $(this).parents('nav');
		$(this).addClass('active').find('i').html('&#xE14C;');
		
		if($(this).is('.nav-toggle--side-bar')) {
			section.find('.side-bar').toggleClass('side-bar--active');
		} else {
			section.find('.nav').toggleClass('hidden-xs hidden-sm');
		}
		
	});
	
	$(document).on('click', '.nav-toggle.active', function(){
		var section = $(this).parents('nav');
		$(this).removeClass('active').find('i').html('&#xE5D2;');
		
		if($(this).is('.nav-toggle--side-bar')) {
			section.find('.side-bar').toggleClass('side-bar--active');
		} else {
			section.find('.nav').toggleClass('hidden-xs hidden-sm');
		}
		
	});

}

// close side-bar
$(document).on('click', '.side-bar__close', function(){
	"use strict";
	var This = $(this);
	This.parents('.side-bar').removeClass('side-bar--active')
	var section = This.parents('nav');
	section.find('.nav-toggle').removeClass('active').find('i').html('&#xE5D2;');
});

//  toggle on click mobile
function addNavMobileClickToggle() {
	"use strict";
	$(document).on('click', '.menu:not(.menu--toggle-on-click) li > a', function(){
		var This = $(this)
		if (!This.siblings('.menu__dropdown').length <= 0) {
			This.parent('li').toggleClass('active');
		}
	});
}

//  toggle on click all
function addNavClickToggle() {
	"use strict";
	$(document).on('click', '.menu--toggle-on-click li:not(.active) > a', function(){
		var This = $(this);
		if (!This.siblings('.menu__dropdown').length <= 0) {
			if (This.parents('.menu__dropdown').length <= 0) {
				This.parents('.nav').find('.menu > li.active').removeClass('active');
			}
			$(this).parent('li').toggleClass('active');
		}
	});
	$(document).on('click', '.menu--toggle-on-click li.active > a', function(){
		$(this).parent('li.active').removeClass('active');
	});
}

// toggle search
$(document).on('click', '.search', function(){
	"use strict";
	var This = $(this);
	This.parents('.row--nav').find('.search__content').addClass('search__content--active')
	This.parents('.row--nav').find('.search__content').find('input').focus();
})

$(document).on('click', '.search__content__close', function(){
	"use strict";
	$('.search__content').removeClass('search__content--active')
})


// 9) Dropdown 
// -----------------------------------------------------------------------


$(document).on('click', '.dropdown--toggle-on-click:not(.active) .dropdown__toggle', function(){
	"use strict";
	$('.dropdown').removeClass('active');
	$(this).parent('.dropdown').toggleClass('active')
});

$(document).on('click', '.dropdown--toggle-on-click.active .dropdown__toggle', function(){
	"use strict";
	$('.dropdown').removeClass('active');
});


$(document).on('click', '.dropdown__content__close', function(){
	"use strict";
	$('.dropdown--toggle-on-click.active').removeClass('active');
});


// 10) Close dropdowns
// -----------------------------------------------------------------------
$(document).on('click', function(event){
	"use strict";
    if( !$(event.target).closest(".menu > li.active").length) {
    	$(".menu > li.active").removeClass('active');
    }
    
    if( !$(event.target).closest(".dropdown.active").length ) {
    	$('.dropdown').removeClass('active');
    }
    
    event.stopPropagation();
});


// 11) Accordion 
// -----------------------------------------------------------------------

$('.accordion').on('click', 'li', function(){
	"use strict";
	var This = $(this);
	if(This.parent('.accordion--сollapse').length) {
		This.siblings('li.active').removeClass('active')
	}
	This.toggleClass('active')
});

// Toggle List      

$(document).on('click', '.ul--toggle__title', function(){
	"use strict";
	$(this).toggleClass('ul--toggle__title--active')
})

// 12) Toggle Section 
// -----------------------------------------------------------------------

$(document).on('click', '.section-toggle .section-toggle__show', function(){
	"use strict";
	$(this).parents('section').toggleClass('section-toggle--show');
});
$(document).on('click', '.section-toggle__hide', function(){
	"use strict";
	$(this).parents('section').prev().toggleClass('section-toggle--show');
});


// 13) Baners 
// -----------------------------------------------------------------------
	$(document).find('.banner[data-showonce]').each(function(){
		"use strict";
		var This = $(this);
		if(This.attr('id') == localStorage.getItem('banner--enable')) { return false;  }
		This.show();
	})
	
	$(document).on('click', '.banner__close', function(){
		"use strict";
		var el = $(this).parents('.banner')
		el.toggle();
		if($(this).parents('.banner[data-showonce]').length) {
			var id = el.attr('id')
			localStorage.setItem('banner--enable', id);
		}
	})
	
	
	function BannerWaypoint(el){
		"use strict";
		if($(document).find('.banner[data-waypoint]').length > 0) {
			el.waypoint(function(dir) {
				if (dir === "down") {
					var id = $(this).attr("data-waypoint-id")
					$('.banner[id="'+id+'"]').attr("data-waypoint", "active")
				}
			}, {
				offset: "100%"
			}).waypoint(function(dir) {
				if (dir === "up") {
					var id = $(this).attr("data-waypoint-id")
					$('.banner[id="'+id+'"]').attr("data-waypoint", "")
				};
			}, {
				offset: "100%"
			});
		};
	}
	
	function initBannerWaypoint(){
		"use strict";
		BannerWaypoint($('[data-waypoint-id]'))
	}
	
	function initBanner() {
		"use strict";
		$('.banner[data-waypoint]').attr("data-waypoint", "active")
		$('.banner[data-showonce]').show()
	}
	
// 14) Form Elements 
// -----------------------------------------------------------------------

$(document).on('click', '.input [class*="input-counter__"]', function(){
	"use strict";
	var summary = $(this).parents('.input-summary').children('input');
	var summaryval = parseInt($(this).parents('.input-summary').children('input').val(), 10);
	var input = $(this).siblings('input');
	var val = parseInt(input.val(), 10);
	if($(this).is('.input-counter__minus')) {
		if(val == 0) { return; }
			input.val(val-1)
				if(summary.length) { summary.val(summaryval-1) }
	} else {
		input.val(val+1)
			if(summary.length) { summary.val(summaryval+1) }
	}
	
});


var rangeSlider = function(){
	"use strict";
  var slider = $('.range-slider'),
      range = $('.range-slider__range'),
      value = $('.range-slider__value');
    
  slider.each(function(){

    value.each(function(){
      var value = $(this).siblings().attr('value');
      $(this).html(value);
    });

    range.on('input', function(e){
	  var This = $(this);
      This.siblings('.range-slider__value').html(this.value);
      if(this.value == 0) {
	      This.addClass('range-slider__range--lower')
	      This.siblings('.range-slider__value').addClass('range-slider__value--lower')
      } else {
	      This.removeClass('range-slider__range--lower')
	      This.siblings('.range-slider__value').removeClass('range-slider__value--lower')
      }
    });
  });
  
  $('input[type=range]').on('input', function(e){
	  var min = e.target.min,
	      max = e.target.max,
	      val = e.target.value;
	  
	  $(e.target).css({
	    'backgroundSize': (val - min) * 100 / (max - min) + '% 100%'
	  });
	}).trigger('input');
};

rangeSlider();


if( $(body).find(".input-date").length ) {
	$(".input-date").pickadate()
}


// 15) Modal - forms 
// -----------------------------------------------------------------------

function addModalForms() {
	"use strict";
	$('.modal[data-mouseleave]').each(function(){
		var el = $(this).attr('data-mouseleave')
		$('#'+el).on('mouseleave', function(){
			var jModal = $('.modal[data-mouseleave='+el+']');
			CMain.makeArcticModal(jModal, .8)
		})
	})
	
	$(document).on('click', '.formmodal', function () {
		if (localStorage.getItem('modal--enable')) {
			if($(this).attr('data-modal') == localStorage.getItem('modal--enable')) { return false;  }
		}
		var jThis = $(this);
		var id = jThis.attr('href').slice(1);
		var jModal = $('.modal[data-modal='+id+']')

		CMain.makeArcticModal(jModal, .8);
	});
	
	$(document).on('ready', function(){
		var jModal = $('.modal[data-auto]');
		if (localStorage.getItem('modal--enable')) {
			if(jModal.attr('data-modal') == localStorage.getItem('modal--enable')) { return false;  }
		}
		var delay = jModal.attr('data-auto');
		
		setTimeout(function(){
		    CMain.makeArcticModal(jModal, .8)
		}, delay);

	});
}

// 16) Modal - work
// -----------------------------------------------------------------------

function addModalWork() {
	var Modal = ''
	+'<section style="display: none;">'
	+'	<div class="modal" data-modal="image">'
	+'		<div class="container">'
	+'			<div class="row">'
	+'				<div class="modal__top">'
	+'					<div class="arcticmodal-close">'
	+'						<i class="material-icons color--white modal__top__close">clear</i>'
	+'					</div>'
	+'				</div>	'
	+'				<div class="modal__img text-center"><img src="" alt=""></div>	'
	+'				<div class="modal__content">'
	+'				</div>'
	+'			</div>'
	+'		</div>'
	+'	</div>'
	+'</section>'
	
	if ($('body').find('a[href="#image"]').length) {
		if (!$('.modal[data-modal="image"]').length) {
			$('body').append(Modal);
		}
	}
	
	$(document).on('click', 'a[href="#image"]', function () {
		var jModal = $('.modal[data-modal="image"]')
		var hi = $(this).find('[data-src]')
		if(!hi.length) {
			if ($(this).find('img').length) {
				var img = $(this).find('img').attr('src');
			} else {
				var img = $(this).find('.bg').css('background-image');
				img = img.replace('url(','').replace(')','');
			}
		} else {
			var img = hi.attr('data-src');
		}
		
		CMain.makeArcticModal($(jModal), 1);
		startSpin()
		$('.modal__img').empty().html('<img src='+img+'>').imagesLoaded(function(){
        	endSpin()
    	});
    	
		/* Gallery */
		if ($(this).parents('.gallery').length){
			$('.gallery').removeClass('gallery--select')
			$(this).parents('.gallery').addClass('gallery--select')
			var container = $(this).parents('.gallery--select')	

			$('.modal[data-modal="image"] .modal__content').after(''
			+'<div class="modal__controls">'
			+'	<i class="material-icons color--white prev modal__controls__arrow">arrow_back</i>'
			+'	<i class="material-icons color--white next right modal__controls__arrow">arrow_forward</i>'
			+'</div>'
			);
			
			/* Numbering */
			container.find('a[href="#image"]').map(function(i, o) { $(o).attr("data-gallery", (i + 1)); });
			var length = container.find('a[href="#image"]').length
						
			/* Сurrent */
			var current = parseInt($(this).attr('data-gallery'), 10);
			$('.modal__img img').attr('data-gallery', current);
			
			/* Controllers toggle */
			GalleryShowControls = function(i){
				if(i == 1) { 
					$('.modal__controls .prev').hide()
				} else {
					$('.modal__controls .prev').show()
				}
				
				if(i == length) { 
					$('.modal__controls .next').hide()
				} else {
					$('.modal__controls .next').show()
				}
			}
			GalleryShowControls(current)
			
			GalleryShowCounts = function(current, length){
				$('.modal__content').html('<i class="color--white modal__content__counter">'+current+'/'+length+'</i>')
			}
			GalleryShowCounts(current, length)

		} else {
			$('.modal[data-modal="image"] .modal__controls').remove()
			$('.modal[data-modal="image"] .modal__content__counter').remove()
		}
		
		/* Close modal */
		$('body').on('click', '.modal[data-modal=image]', function(){
			//jModal.arcticmodal('close');
		})
		
	});
	
	
	/* Gallery Toggle */
	
	GalleryToggleImg = function(side) {
		var This = $('.gallery--select').find('[data-gallery="'+side+'"]');
		var length = $('.gallery--select').find('a[href="#image"]').length
		
		var hi = This.find('[data-src]')
		if(!hi.length) {
			if (This.find('img').length) {
				var img = This.find('img').attr('src');
			} else {
				var img = This.find('.bg').css('background-image');
				img = img.replace('url(','').replace(')','');
			}
		} else {
			var img = hi.attr('data-src');
		}
		
		startSpin()
		$('.modal__img').empty().html('<img data-gallery="'+side+'" src='+img+'>').imagesLoaded(function(){
        	endSpin()
    	});
				
		GalleryShowControls(side)
		GalleryShowCounts(side, length)
	}
	
	
	$(document).on('click', '.modal__controls i', function () {
		var open = parseInt($('.modal__img').find('img').attr('data-gallery'), 10)
		if($(this).is('.prev')){
			var side = open-1;
		} else {
			var side = open+1;
		}
		
		GalleryToggleImg(side)
	}) 
	
	$(function(){
	$('[data-modal="image"]').on('swipeleft', swipeNext)
	
	function swipeNext( event ){
		var open = parseInt($('.modal__img').find('img').attr('data-gallery'), 10)
		var side = open+1;
		GalleryToggleImg(side)
	};
	});
	
	$(function(){
	$('[data-modal="image"]').on('swiperight', swipePrev)
	
	function swipePrev( event ){
	    var open = parseInt($('.modal__img').find('img').attr('data-gallery'), 10)
		var side = open-1;
		GalleryToggleImg(side)
	}
	});
	
	
}

// 17) Modal - video	
// -----------------------------------------------------------------------

function addVideo() {
	"use strict";
	var Modal = ''
	+'<section style="display: none;">'
	+'	<div class="modal flex-center" data-modal="video">'
	+'		<div class="container">'
	+'			<div class=" pos-absolute pos-top pos-right arcticmodal-close">'
	+'				<i class="material-icons color--white modal__top__close">clear</i>'
	+'			</div>'
	+'			<div class="row row--video">'
	+'			</div>'
	+'		</div>'
	+'	</div>'
	+'</section>'
	
	if ($('body').find('a[href="#video"]').length) {
		if (!$('.modal[data-modal="video"]').length) {
			$('body').append(Modal);
		}
	}
	
	$(document).on('click', 'a[href="#video"]', function () {
		var video = $(this).attr('data-video');
		CMain.makeArcticModal($('.modal[data-modal="video"]'), 1);

		$('.modal[data-modal="video"] .row--video').html('<div class="col-md-8 col-md-offset-2"><iframe width="100%" src="https://www.youtube.com/embed/' + video + '?rel=0&amp;controls=1&amp;showinfo=1&amp;autoplay=1" frameborder="0" allowfullscreen></iframe></div>')
	});
	
	
	$(document).on('click', 'a[href="#videoreplace"]', function () {
		var video = $(this).attr('data-video');
		$(this).parents('[class*=col-]').html('<iframe width="100%" class="h-4" src="https://www.youtube.com/embed/' + video + '?rel=0&amp;controls=1&amp;showinfo=1&amp;autoplay=1" frameborder="0" allowfullscreen></iframe>')
	});
}

// 18) Modal - search
// -----------------------------------------------------------------------

function addSearch() {
	"use strict";
	var Modal = ''
	+'<section style="display: none;">'
	+'	<div class="modal" data-modal="search">'
	+'		<div class="container">'
	+'			<div class="row color--white">'
	+'			</div>'
	+'		</div>'
	+'	</div>'
	+'</section>'
	
	if ($('body').find('a[href="#search"]').length) {
		if (!$('.modal[data-modal="search"]').length) {
			$('body').append(Modal);
		}
	}
	
	$(document).on('click', 'a[href="#search"]', function () {
		CMain.makeArcticModal($('.modal[data-modal="search"]'), .9);

		$('.modal[data-modal="search"] .row').html('<div class="col-md-7 col-md-offset-2 col-xs-9 material"><input type="text" placeholder="Search" name="phone"></div><div class="col-md-1 col-xs-3 inline-md"><a href="#" class="material-icons ico--radial">search</a></div>')
	});
}

// 19) Form send
// -----------------------------------------------------------------------			

function addFormValidation() {
	"use strict";
	$('body').on('submit', 'form', function (event) {
		if(!$(this).find('input[data-mailto]').length) { return; }
		var isValid = true;
		var form = $(this);

		form.find('input.valid').each(function () {
			var jt = $(this);
			if (jt.val() != '')
				return;

			isValid = false;

			var alert = jt.attr('data-alert');
			jt.next('.error-alert').remove();
			var name = jt.attr('name');
			jt.addClass("input-error");
			if (form.find('.' + name).length <= 0)
				$('.notification').remove();
				$('body').append('<div class="notification boxed--shadow error-alert pointer ' + name + '"><span class="p-xs p-xs--compact marg-null">' + alert + '</span><span class="offset-l-15"><i class="material-icons notification__remove">clear</i></span></div>')
					$(document).on('click', '.error-alert span:first-child', function(){
						jt.focus()
					})
		});
		

		if (!isValid)
			return false;

		var mailto = form.find('input[type=submit]').attr('data-mailto');
		var id = form.attr('id');
		form.append('<input class="hide" name="mailto" type="text" value="' + mailto + '"><input class="hide" name="id" type="text" value="' + id + '">');

		var sendmessage = $(this).attr('data-message');
		
		$.ajax({
			type: "POST",
			url: "send-form.php",
			data: form.serialize(),
			success: function (data) {
				form.find('input[type=submit]').prop('disabled', true);
				if (sendmessage.length > 0) {
				$('.notification').remove();
				$('body').append('<div class="notification boxed--shadow success-alert pointer"><p class="p-xs p-xs--compact marg-null">' + sendmessage + ' <i class="material-icons notification__remove">clear</i></p></div>');
				setTimeout("$('.notification').remove();", 2000);
				}
			}
		});
		
		return false;
	});

	$('form').on('change', '.input-error, .input-valid', function () {
		if ($(this).val().length >= 1) {
			var name = $(this).attr('name');
			$('.' + name + '.error-alert').remove();
			$(this).removeClass('input-error')
				.addClass('input-valid')
		}
	});
	
	$(document).on('click', '.notification__remove', function(){
		$('.notification').remove();
	})
	
	// MailChimp 
	$('body').on('submit', 'form[data-mailchimp]', function (event) {
		var isValid = true;
		var form = $(this);
		
		form.find('input.valid').each(function () {
			var jt = $(this);
			if (jt.val() != '')
				return;

			isValid = false;

			var alert = jt.attr('data-alert');
			jt.next('.error-alert').remove();
			var name = jt.attr('name');
			jt.addClass("input-error");
			if (form.find('.' + name).length <= 0)
				$('.notification').remove();
				$('body').append('<div class="notification boxed--shadow error-alert pointer ' + name + '"><p class="p-xs p-xs--compact marg-null">' + alert + ' <i class="material-icons notification__remove">clear</i></p></div>')
					$(document).on('click', '.error-alert', function(){
						jt.focus()
					})
		});
		
		if (!isValid)
			return false;
		
	});
}


// 20) Animated
// -----------------------------------------------------------------------

function animateCss() {
	"use strict";
	if($(document).find('[class*=animate-]').length > 0) {
		// slide
		$(".animate-slideleft").animated("slideInLeft", "slideOutLeft");
		$(".animate-slideright").animated("slideInRight", "slideOutRight");
		$(".animate-slide").animated("slideInUp", "slideOutDown");
		
		// fade
		$(".animate-fade").animated("fadeIn", "fadeOut");
		
		// zoom
		$(".animate-zoom").animated("zoomIn", "zoomOut");
		$(".animate-image-zoom").animated("animateImageZoomIn", "animateImageZoomOut");
	};

}



// 21) Countdown	
// -----------------------------------------------------------------------

function countdown() {
	"use strict";
	if($(document).find('.countdown').length > 0) {
	    $('.countdown').countdown({
	        date: $(this).attr('data-date'),
	          render: function(data) {
	            $(this.el).html("<div>" 
	            //+ this.leadingZeros(data.years, 4) + " <span class='countdown__text'>years</span></div><div>" 
	            + this.leadingZeros(data.days, 2) + " <span class='countdown__text'>days</span></div><div>" 
	            + this.leadingZeros(data.hours, 2) + ":</div><div>" 
	            + this.leadingZeros(data.min, 2) + ":</div><div>" 
	            + this.leadingZeros(data.sec, 2) + "</div>");
	          }
	    });
	}
}
function countdownUpdate() {
	$('.countdown').each(function(){
		var date = $(this).attr('data-date')
		$(this).removeClass('ended').data('countdown').update(date).start();	
	})
}


// 22) Masonry
// -----------------------------------------------------------------------

function masonryGrid() {
	"use strict";
	if($(document).find('.grid').length > 0) {
		var $grid = $('.grid').imagesLoaded( function() {
			$grid.masonry({
			  itemSelector: '.grid-item',
			  columnWidth: '.grid-sizer',
			  percentPosition: true
			});
		});
	};
}

function masonryGridDestroy() {
	$('.grid').masonry('destroy');
}

// 23) Slider
// -----------------------------------------------------------------------

function initSlider() {
	"use strict";
	$('.flexslider').each(function(){
		var fAnimation = $(this).attr('data-animation');
		var hover = $(this).attr('data-pause');
		
		if($(this).find('.flex-control').length > 0) { 
			var controls = true 
			} else {
			var controls = false 	
			}

		$(this).flexslider({
			animation: fAnimation,
			directionNav: false,
			pauseOnHover: hover,
			controlNav: controls,
			controlsContainer: $(this).find(".flex-control")
		});
	});
	
	var customControls = $('.custom-controls-container');
	customControls.on('click', '.prev', function(){
	    $(this).parents('section, header').find('.flexslider').flexslider('prev');
	    return false;
	})
	
	customControls.on('click', '.next', function(){
	    $(this).parents('section, header').find('.flexslider').flexslider('next');
	    return false;
	})
}


	// Builder events
function initSliderDestroy() {
	$('body').find('.flexslider').flexslider('destroy');
}
function sliderNext() {
	$('.flexslider--edited').flexslider('next');
}
function sliderPrev() {
	$('.flexslider--edited').flexslider('prev');
}

// 24) Progress
// -----------------------------------------------------------------------

function Progress(el){
	"use strict";
	var val = el.attr('data-percent');
		
	el.find('.progress__bar__progress').css({width: val+'%'})
	el.find('.progress__bar__val').css({left: val+'%'}).html(val+'%')
}

function allProgress(){
	"use strict";
	$('.progress').each(function(dir) {
		Progress($(this));
	});
}

function initProgress(){
	"use strict";
	if($(document).find('.progress').length > 0) {
		$('.progress').waypoint(function(dir) {
			if (dir === "down") {
				Progress($(this));
			}
		}, {
			offset: "95%"
		});
	};
}

// 25) Swipe 
// -----------------------------------------------------------------------

function SwipeAnimationWaypoint(el){
	"use strict";
	el.waypoint(function(dir) {
		if (dir === "down") {
			$(this).find('.row > [class*=col-]:first-child').css('margin-left', '0')
		}
	}, {
		offset: "100%"
	});
}

function SwipeAnimation(el){
	"use strict";
	el.find('.row > [class*=col-]:first-child').css('margin-left', '0')
}

function initSwipeAnimation(){
	"use strict";
	if($(document).find('.container--swipe--animate').length > 0) {
		SwipeAnimationWaypoint($('.container--swipe--animate'));
	};
}

function initSwipeControllers() {
	"use strict";
	$(document).find('.container--swipe').each(function(){
		var container = $(this).parents('section');
		var row = $(this).find('.row:first');
		var rowWidth = row.width();
		var rowInnerWidth=0;
		row.children('[class*=col-]').each(function(){
			rowInnerWidth = rowInnerWidth + $(this).width();	

		})
		if(rowInnerWidth > rowWidth) {} else {
			$(container.find('.swiperight, .swipeleft').hide())
		}
	})
	
	$('.swiperight, .swipeleft').on('click',function () {
		
		var row = $(this).parents('section').find('.container--swipe > .row');
		var col = row.find('[class*=col-]:first')
		var rowWidth = row.width();
		if(row.is('.row--fluid')) {
			var colWidth = col.width();
		} else {
			var colWidth = col.width()+30;	
		}
		function roundToCol(num) {
			return Math.round(num/colWidth)*colWidth;
		}
		
		function roundToRow(num) {
			return Math.round(num/rowWidth)*rowWidth;
		}
		var next = roundToCol(row.scrollLeft())+colWidth;
		var prev = roundToCol(row.scrollLeft())-colWidth;
		
		if($(this).parents('section').find('.container--swipe').is('.container--swipe--visiblearea')) {
			if($(this).is('.swiperight')) { 
				row.animate({'scrollLeft': roundToCol(row.scrollLeft())+rowWidth }, 800);
			} else { 
				row.animate({'scrollLeft': roundToCol(row.scrollLeft())-rowWidth }, 800);	
			}
			
		} else {
			if($(this).is('.swiperight')) { 
				row.animate({'scrollLeft': next}, 800);
			} else { 
				row.animate({'scrollLeft': prev}, 800);	
			}
		}
	});
}

// 26) Sticky
// -----------------------------------------------------------------------
// http://imakewebthings.com/waypoints/shortcuts/sticky-elements/

function initsticky(){
	"use strict";
	if($(document).find('.nav--sticky').length > 0) {
	$('.nav--sticky').waypoint(function(dir) {
		if (dir === "down") {
			$(this).addClass('nav--sticky-waypoint')
			$('body').css('margin-top', $(this).height())
		}
	}, {
		offset: "-10%"
	}).waypoint(function(dir) {
		if (dir === "up") {
			$(this).removeClass('nav--sticky-waypoint')
			$('body').css('margin-top', '0')
		};
	}, {
		offset: "-10%"
	});
	};
}

// 27) Video bg
// -----------------------------------------------------------------------

function initBgVideo() {
	"use strict";
	$(".bg-video").each(function(){	 
	var This = $(this);
	var url = This.attr('data-video-url');
	var videostart = This.attr('data-video-start-at');
	var container = This.attr('data-video-container');
	var autoplay = This.attr('data-video-autoplay');
	var videomute = This.attr('data-video-mute');
	var src = This.attr('data-video-image');
	var videoquality = This.attr('data-video-quality');
	    This.mb_YTPlayer({
		    videoURL:url,
		    containment:container,
		    autoPlay:autoplay, 
		    mute:videomute, 
		    opacity:1, 
		    showControls:false,
		    optimizeDisplay: true,
		    mobileFallbackImage: src,
		    quality: videoquality
		});
	});
}
function bgVideoDestroy() {
	$(".bg-video").YTPPlayerDestroy()
}

// 28) Instagram
// -----------------------------------------------------------------------

function initInstagram() {
	"use strict";
	if($(document).find('.instagram').length){
		$(document).find('.instagram').each(function(){
			$(this).empty()
			var id = $(this).attr('id');
			var md = $(this).attr('data-col-md');
			var sm = $(this).attr('data-col-sm');
			var xs = $(this).attr('data-col-xs');
			var amount = $(this).attr('data-amount');
			
			if ($(this).is('[data-user-id]')) {
				var user = $(this).attr('data-user-id');
			} else {
				var user = '5321149914'
			}
			
			if ($(this).is('[data-access-token]')) {
				var token = $(this).attr('data-access-token');
			} else {
				var token = '5321149914.1677ed0.97df05acecc847f99e2a0aa0407fd799'
			}
			
			var userFeed = new Instafeed({
				target: id,
		        get: 'user',
		        userId: user,
		        accessToken: token,
		        template: '<div class="col-md-'+md+' col-sm-'+sm+' col-xs-'+xs+'"><a href="{{link}}" target="_blanc"><img class="width-full" src="{{image}}" /></a></div>',
		        resolution: 'standard_resolution',
		        limit : amount,
		        after: function(){
			        if($(document).find('footer.footer--hidden').length) { 
					    if ($(document).width() > 767) {
					    	addFixedFooter()
					    	//alert()
					    }
				    }
		        }
		    });
		    userFeed.run();
	    });
    }
}

// 29) Loader -- spiner
// -----------------------------------------------------------------------
function startSpin() {
	$('body').css('overflow', 'hidden').append('<div class="spinner flex flex-align-center flex-justify-center"><div class="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active is-upgraded" data-upgraded=",MaterialSpinner"><div class="mdl-spinner__layer mdl-spinner__layer-1"><div class="mdl-spinner__circle-clipper mdl-spinner__left"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__gap-patch"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__circle-clipper mdl-spinner__right"><div class="mdl-spinner__circle"></div></div></div><div class="mdl-spinner__layer mdl-spinner__layer-2"><div class="mdl-spinner__circle-clipper mdl-spinner__left"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__gap-patch"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__circle-clipper mdl-spinner__right"><div class="mdl-spinner__circle"></div></div></div><div class="mdl-spinner__layer mdl-spinner__layer-3"><div class="mdl-spinner__circle-clipper mdl-spinner__left"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__gap-patch"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__circle-clipper mdl-spinner__right"><div class="mdl-spinner__circle"></div></div></div><div class="mdl-spinner__layer mdl-spinner__layer-4"><div class="mdl-spinner__circle-clipper mdl-spinner__left"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__gap-patch"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__circle-clipper mdl-spinner__right"><div class="mdl-spinner__circle"></div></div></div></div>')
}

function endSpin() { 
	$('body').removeAttr('style')
	$('.spinner').remove()  
}

// 30) Google Map
// -----------------------------------------------------------------------	
function initMap() {
	"use strict";
    $(document).find('.googlemap-api').each(function(){
	    var id = $(this).attr('id')
	    var mapzoom = parseInt($(this).data('map-zoom'), 10)
  		var mapcoordslat = parseFloat($(this).data('map-coords-lat'), 10)
  		var mapcoordslng = parseFloat($(this).data('map-coords-lng'), 10)
  		var mapstyles = JSON.parse($(this).attr('data-map-styles'))
        var uluru = {lat: mapcoordslat, lng: mapcoordslng};
        var map = new google.maps.Map(document.getElementById(id), {
          zoom: mapzoom,
          center: uluru,
          styles: mapstyles,
          scrollwheel: false
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
    });
}
      
// 31) MixItUp
// -----------------------------------------------------------------------	    
function MixItUp() {
	"use strict";
	if($(document).find('.mix').length)	{
		
		$.getScript("js/mixitup.js").done(function() {
			$(document).find('.mixit').each(function(){
				var container = $(this)
				var mixer = mixitup(container);
			});
		})
		.fail(function() { });
	}
}      
   

// 32) Load functions	
// -----------------------------------------------------------------------  

$(window).on('load', function(){
	include();
	endSpin();
	
});

CMain = function() {

};

CMain.isNarrowScreen = function() {
	return $(document).width() <= 767;
};

CMain.isTabletScreen = function() {
	return $(document).width() <= 991;
};


CMain._initOnReady = function() {
	MixItUp();
	initInstagram();
    initSlider();
    masonryGrid();
	initSwipeControllers();
	initBgVideo();
	translate();
};



CMain.init = function(forceAll) {
	forceAll = forceAll || false;
	
	CMain._initOnReady()
	
	anchor();
	
	if (forceAll || !CMain.isNarrowScreen()) {
		// > 767
		addFixedFooter();
		floatingtext();	
		
	} else {
		$('.side-bar').removeClass('side-bar--active')
	}
	
	if (forceAll || CMain.isTabletScreen()) {
		// <= 991
		addNavMobileClickToggle();
		initSwipeAnimation()
	}
	
};


CMain.fullInit = function() {
	addTabs();
	fixTranslate();
	addNavigation();
	addNavClickToggle();
	addModalForms();
	addModalWork();
	addVideo();
	addSearch();
	addFormValidation();
	animateCss();
	masonryGrid();
	initProgress();
	initsticky();
	countdown();
	initSwipeControllers();
	initBgVideo();
	initBannerWaypoint();
	addTyped();
	translate();

	CMain.init();

};

CMain.ajaxLoadHtml = function(url, data, onSuccess) {
	var param = {
				type: 'POST',
				data: data,
				dataType: 'html',
				url: url,
				success: onSuccess
			};
			
	return $.ajax(param);
};

CMain.makeArcticModal = function(root, opacity) {
	if (!root)
		return root;
	
	if (opacity == null)
		opacity = 0.9;
	
	return $(root).arcticmodal({
    	closeOnEsc: true,
    	closeOnOverlayClick: true,
    	overlay: {
		    css: {
		    	opacity: opacity
		    }
	    },
	    afterClose: function(data, el) {
		  $('.modal[data-modal="video"] .row').html('');
		  if(el.is('.modal[data-showonce]')) {
			  var modal = el.attr('data-modal')
			  localStorage.setItem('modal--enable', modal);
		  }
	    }
	    
    });
};

CMain.radioSelector = function(domainSelector, elem, className) {
	$(domainSelector).removeClass(className);
	$(elem).addClass(className);
};

CMain.fullInit();

