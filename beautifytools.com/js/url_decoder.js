$(document).ready(function(e) {
	$("#clear").click(function(e) {
    	e.preventDefault();
		$("#encoded_url").val("");
    });
	
	$("#decoded_url").focus(function(e) {
    	$(this).select();
    });
	
	$("#decode").click(function(e) {
    	e.preventDefault();
		if($.trim($("#encoded_url").val()) == "")
		{
			$("#encoded_url").focus().parents("div.form-group").addClass("has-error");
		}else
		{
			$(".url_decoder_form").submit();
		}
    });
});