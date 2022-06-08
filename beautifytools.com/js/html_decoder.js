$(document).ready(function(e) {
	$("#clear").click(function(e) {
    	e.preventDefault();
		$("#encoded_html").val("");
    });
	
	$("#decoded_html").focus(function(e) {
    	$(this).select();
    });
	
	$("#decode").click(function(e) {
    	e.preventDefault();
		if($.trim($("#encoded_html").val()) == "")
		{
			$("#encoded_html").focus().parents("div.form-group").addClass("has-error");
		}else
		{
			$(".html_decoder_form").submit();
		}
    });
});