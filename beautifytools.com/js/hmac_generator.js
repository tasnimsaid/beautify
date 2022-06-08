$(document).ready(function(e) {
	$("#clear").click(function(e) {
    	e.preventDefault();
		$("#data,#key,#format").val("");
		$("#data,#key,#format").parents("div.form-group").removeClass("has-error");
    });
	
	$("#out").focus(function(e) {
    	$(this).select();
    });
	
	$("#calculate_hmac").click(function(e) {
    	e.preventDefault();
		
		data = $.trim($("#data").val());
		key = $.trim($("#key").val());
		format = $.trim($("#format").val());
		
		if(data == "")
		{
			$("#data").focus().parents("div.form-group").addClass("has-error");
			return false;
		}else
		{
			$("#data").parents("div.form-group").removeClass("has-error");
		}
		
		if(key == "")
		{
			$("#key").focus().parents("div.form-group").addClass("has-error");
			return false;
		}else
		{
			$("#key").parents("div.form-group").removeClass("has-error");
		}
		
		if(format == "")
		{
			$("#format").focus().parents("div.form-group").addClass("has-error");
			return false;
		}else
		{
			$("#format").parents("div.form-group").removeClass("has-error");
		}
		
		$("img[alt='loader']").show();
		
		$.ajax({
			type	: "POST",
			url		: "/hmac.php",
			data	: {"data" : data, "format" : format, "key" : key},
			success : function(data)
			{
				$("img[alt='loader']").hide();
				$("#out").val(data);
				$(".out_div").show();
			},
			error 	: function()
			{
				$("img[alt='loader']").hide();
			}
		});
    });
});