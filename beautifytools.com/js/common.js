$(document).ready(function(e) {
	$(window).resize(function() {
		if($(".collapse_btn_nav").is(":hidden")) {
			$("div.header_nav:not(.collapse_btn_nav)").show();
			$(".ham_icon").hide();
			$(".remove_icon").fadeIn(200);
		} else {
			$("div.header_nav:not(.collapse_btn_nav)").hide();
			$(".remove_icon").hide();
			$(".ham_icon").fadeIn(200);
		}
	});
	
	$(".collapse_btn").bind("click", function(e) {
		e.preventDefault();
		if($("div.header_nav:not(.collapse_btn_nav)").is(":visible")) {
			$("div.header_nav:not(.collapse_btn_nav)").slideUp(200);
			$(".remove_icon").hide();
			$(".ham_icon").fadeIn(200);
		} else {
			$("div.header_nav:not(.collapse_btn_nav)").slideDown(200);
			$(".ham_icon").hide();
			$(".remove_icon").fadeIn(200);
		}
	});
	
	$("a[href='#all_tools']").bind("click", function(e) {
		e.preventDefault();
		ele = $("div.header_nav:not(.collapse_btn_nav)").is(":visible") ? $("#allToolsScrollToMobile") : $("#all_tools");
		$("html, body").animate({
			scrollTop: ele.offset().top
		}, 500);
	});
});