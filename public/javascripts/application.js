$(function(){
    $("form.radio-nav").submit(function(e) {
        e.preventDefault();
        window.location = $(this).find('input[type="radio"]:checked').val();
    });
});

$(document).ready(function() {
	var stickyNavTop = $('.purchase-details-small').offset().top;
	 
	var stickyNav = function(){
	var scrollTop = $(window).scrollTop();
	      
	if (scrollTop > stickyNavTop) { 
	    $('.purchase-details-small').addClass('sticky');
	} else {
	    $('.purchase-details-small').removeClass('sticky'); 
	}
	};
	 
	stickyNav();
	 
	$(window).scroll(function() {
	    stickyNav();
	});
});