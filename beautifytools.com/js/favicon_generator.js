$(document).ready(function(e) {
	$("#create").click(function(e) {
    	e.preventDefault();
		if($.trim($("#icon").val()) == "")
		{
			$("p.info").html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;Please select an image file!');
		}else
		{
			$(".favicon_form").submit();
		}
    });
});