$(document).ready(function(e) {
	$("#clear").click(function(e) {
    	e.preventDefault();
		$("#time,#format").val("");
		$("#zone").val($("#zone option:eq(0)").val());
    });
	
	$("#convert").click(function(e) {
    	e.preventDefault();
		
		time = $.trim($("#time").val());
		format = $.trim($("#format").val());
		zone = $.trim($("#zone").val());
		
		if(time == "")
		{
			$("#time").focus().parents("div.form-group").addClass("has-error");
			return false;
		}else
		{
			$("#time").parents("div.form-group").removeClass("has-error");
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
			url		: "/utc.php",
			data	: {"time" : time, "format" : format, "zone" : zone},
			success : function(data)
			{
				$("img[alt='loader']").hide();
				$(".out_div").html(data);
				$(".out_div").show();
			},
			error 	: function()
			{
				$("img[alt='loader']").hide();
			}
		});
    });
});