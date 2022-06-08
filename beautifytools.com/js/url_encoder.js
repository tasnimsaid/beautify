$(document).ready(function(e) {
	$("#clear").click(function(e) {
    	e.preventDefault();
		$("#url").val("");
    });
	
	$("#encoded_url").focus(function(e) {
    	$(this).select();
    });
	
	$("#encode").click(function(e) {
    	e.preventDefault();
		if($.trim($("#url").val()) == "")
		{
			$("#url").focus().parents("div.form-group").addClass("has-error");
		}else
		{
			$(".url_encoder_form").submit();
		}
    });
});