// import jQuery
import $ from 'jquery';
import 'jquery-touchswipe';
//import 'add-to-homescreen';
import 'bootstrap';

// import then needed Font Awesome functionality
import {library, dom, config} from '@fortawesome/fontawesome-svg-core';
// import the Facebook and Twitter icons
import {
  faChevronLeft,
  faChevronRight,
  faTimes,
  faCircle,
  faPhone,
  faPlay,
  faSms,
  faExternalLinkAlt,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';

config.showMissingIcons = false;

// add the imported icons to the library
library.add(
  faChevronLeft,
  faChevronRight,
  faTimes,
  faCircle,
  faPhone,
  faPlay,
  faSms,
  faExternalLinkAlt,
  faEnvelope
);

// tell FontAwesome to watch the DOM and add the SVGs
// when it detects icon markup
dom.watch();

/* eslint-disable */
// Add to homescreen popup
/*window.onload = function() {
  addToHomescreen({
    displayPace: 0,
    maxDisplayCount: 5
  });
}
*/
/* eslint-enable */


// Next/Prev panel functionality
$('.panel-nav').click(function(e) {
  // Get this panel's ID
  let thisPanel = $(this).closest('.modal').attr('id');
  let openPanel = undefined;

  if ($(this).hasClass('panel-nav-next')) {
    // Get the next panel's ID
    openPanel = $(this).closest('.modal').next().attr('id');

    // If the next panel is the last panel, get the first panel's ID
    if (openPanel == undefined) openPanel = $('.modal').first().attr('id');
  } else if ($(this).hasClass('panel-nav-prev')) {
    // Get the next panel's ID
    openPanel = $(this).closest('.modal').prev().attr('id');

    // If the next panel is the last panel, get the first panel's ID
    if (openPanel == undefined) openPanel = $('.modal').last().attr('id');
  }
  $('#' + thisPanel).modal('hide');
  $('#' + thisPanel).on('hidden.bs.modal', function(e) {
    $('#' + openPanel).modal('show');
    $(e.currentTarget).unbind();
  });

  if (!$(this).hasClass('panel-nav-close')) {
    $(thisPanel).modal('hide');
  }
});

// Set up swipe functionality
$('.modal').on('shown.bs.modal', function(e) {
  $('.modal .modal-body').swipe( {
    allowPageScroll: 'vertical',
    // Generic swipe handler for all directions
    swipe: function(
      event,
      direction,
      distance,
      duration,
      fingerCount,
      fingerData
    ) {
      if (direction == 'left') {
        $(this).closest('.modal').modal('toggle');
      }
    },
  });
});

// Copy link titles to ARIA titles
$('.modal-body a').each(function() {
  $(this).attr('aria-label', $(this).attr('title'));
});

// Force off-site links to open in a new tab
$('a').attr('target', function(e) {
  if (/\#$/.test(this.href) || e.host == location.host) return '_self';
  else return '_blank';
});

// Ready function
$(document).ready(function() {

  // Initialize toasts
  $('.toast').each(function() {
    var seconds = new Date().getTime() / 1000;
    if(seconds <= $(this).data('enddate') && seconds >= $(this).data('startdate')) {
      $(this).toast('show');
    };
  });

  // Stack icons correctly
  $('.fa-stack svg + svg').addClass('fa-stack-1x fa-inverse');

  // Prepend phone icon
  $('a[href^="tel:"]').prepend('<i class="fa fa-phone"></i>');

  // Prepend sms icon
  $('a[href^="sms:"]').prepend('<i class="fas fa-sms"></i>');

  // Prepend play icon
  $('a[class*="video"]').prepend('<i class="fas fa-play"></i>');

  // Prepend external link icon
  $('a[href^="http://"], a[href^="https://"], a[href$=".pdf"]').not(".video").prepend('<i class="fas fa-external-link-alt"></i>');

  // Prepend email icon
  $('a[href^="mailto:"]').prepend('<i class="fas fa-envelope"></i>');

  // Style app badge paragraphs
  $('.app-badge').closest('p').addClass('paragraph-app-badge');
  $('.paragraph-app-badge').each(function(){
    if(!$(this).next().hasClass('paragraph-app-badge')) {
      $(this).addClass('paragraph-app-badge-last');
    }
  });
});

// Toggle panels
$(".modal").on("click", function(e) {
  if ($(this) !== this)
    return;
    $('#' + $(this).attr("id")).modal('hide');
});

// Set tabindex on panel headers
$('.panel h1, .panel h2, .panel h3, .panel h4 .panel h5, .panel h6').attr('tabindex', '-1');

// Set up swipe functionality
$('.modal').on('shown.bs.modal', function (e) {
  $(".modal .modal-body").swipe( {
    allowPageScroll: "vertical",
		//Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
      if(direction == 'left') {
        $(this).closest('.modal').modal('toggle');
      }
    }
  });
})

// create keyboard focus trap while modal/dialogs are showing
$(document).on({

keydown:function(e){

	var KEY_TAB = 9;

	function handleBackwardTab() {
		if ( document.activeElement === firstFocusableEl ) {
			e.preventDefault();
			lastFocusableEl.focus();
		}
	}
	function handleForwardTab() {
		if ( document.activeElement === lastFocusableEl ) {
			e.preventDefault();
			firstFocusableEl.focus();
		}
	}

  switch(e.keyCode) {
    case KEY_TAB:
      if ( focusableEls.length === 1 ) {
        e.preventDefault();
        break;
      }
      if ( e.shiftKey ) {
        handleBackwardTab();
      } else {
        handleForwardTab();
      }
      break;
    default:
      break;
    }
  }
});
