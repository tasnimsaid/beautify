$(document).ready(function(e) {
	$("#clear").click(function(e) {
    	e.preventDefault();
		$("#base64_string").val("");
		$("#base64_string").parents("div.form-group").removeClass("has-error");
    });
	
	$("#convert").click(function(e) {
    	e.preventDefault();
		
		base64_string = $.trim($("#base64_string").val());
		
		if(base64_string == "")
		{
			$("#base64_string").focus().parents("div.form-group").addClass("has-error");
			return false;
		}else
		{
			$("#base64_string").parents("div.form-group").removeClass("has-error");
		}
		
		if(base64_string.substring(0, 4) != "data"){
			base64_string = "data:image/png;base64," + base64_string;
		}
		$("#download_img").prop("src", base64_string);
		$("#download").prop("href", base64_string);
		$("div.data_out").show();
    });
});