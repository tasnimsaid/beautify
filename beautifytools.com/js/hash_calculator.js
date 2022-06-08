$(document).ready(function(e) {
	$("#clear").click(function(e) {
    	e.preventDefault();
		$("#data,#format").val("");
		$("#data,#format").parents("div.form-group").removeClass("has-error");
    });
	
	$("#out").focus(function(e) {
    	$(this).select();
    });
	
	$("#calculate_hash").click(function(e) {
    	e.preventDefault();
		
		data = $.trim($("#data").val());
		format = $.trim($("#format").val());
		
		if(data == "")
		{
			$("#data").focus().parents("div.form-group").addClass("has-error");
			return false;
		}else
		{
			$("#data").parents("div.form-group").removeClass("has-error");
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
			url		: "/hash.php",
			data	: {"data" : data, "format" : format},
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