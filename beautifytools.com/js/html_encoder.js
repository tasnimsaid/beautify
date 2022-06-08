$(document).ready(function(e) {
	$("#clear").click(function(e) {
    	e.preventDefault();
		$("#encode_html").val("");
    });
	
	$("#encoded_html").focus(function(e) {
    	$(this).select();
    });
	
	$("#encode").click(function(e) {
    	e.preventDefault();
		if($.trim($("#encode_html").val()) == "")
		{
			$("#encode_html").focus().parents("div.form-group").addClass("has-error");
		}else
		{
			$(".html_encoder_form").submit();
		}
    });
});