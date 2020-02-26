
$(window).resize(function() {
	fullScreen();
});
fullScreen();

// Fullscreen Banner
function fullScreen() {
	var header = $("#header");
	var banner = $('.banner');
	var windowWidth = $(window).outerWidth();

	if(banner.hasClass('fullscreen')) {
		banner.height($(window).height());
		header.css('position','absolute');
		if((banner.hasClass('fullscreen-height-auto')) && (windowWidth < 768 )) {
			banner.css({
				'height': 'auto'
			});
		}
	}
}

$(function () {
	'use strict';

	focusInputAddons();
	scrollUpPage();
	stickyNavbar();
	lightbox();

	function focusInputAddons() {
		// This will help to style input-group-prepend / append when an input it's focused
		$( ".focus-effect .form-control" ).focus(function() {
			$(this).parent('.focus-effect').addClass('focused');
		});
		$( ".focus-effect .form-control" ).focusout(function() {
			$(this).parent('.focus-effect ').removeClass('focused');
		});
	}

	function scrollUpPage() {
		$(window).scroll(function() {
			if ($(this).scrollTop() > 500) {
				$('#scrollUp:hidden').stop(true, true).fadeIn();
			} else {
				$('#scrollUp').stop(true, false).fadeOut();
			}
		});

		$("#scrollUp a").on("click", function() { //  a[href='#top']
			$("html, body").animate({ scrollTop: 0 }, 600);
			return false;
		});

	}

	function stickyNavbar() {
		var navbarWrapper = $(".g-navbar-wrapper");
		var navbar = $(".navbar");
		var navbarWrapperPos = navbarWrapper.offset().top + 1;

		$(window).scroll(function() {
			var windowpos = $(window).scrollTop();

			if (navbarWrapper.hasClass('scrollspy-v1') && (windowpos >= navbarWrapperPos)) {
				navbarWrapper.addClass("sticky-navbar");

			} else if (navbarWrapper.hasClass('scrollspy-v2') && (windowpos >= navbarWrapperPos)) {
				navbarWrapper.addClass('sticky-navbar-v2');
			} else if (windowpos < navbarWrapperPos) {
				navbarWrapper.removeClass('sticky-navbar sticky-navbar-v2');
			}

		});
	}

	function lightbox() {
		$(document).on('click', '[data-toggle="lightbox"]', function(event) {
			event.preventDefault();
			$(this).ekkoLightbox({
				onShown: function() {
					if (window.console) {
						return console.log('Checking our the events huh?');
					}
				},
				onNavigate: function(direction, itemIndex) {
					if (window.console) {
						return console.log('Navigating '+direction+'. Current item: '+itemIndex);
					}
				}
			});
		});
	}

})