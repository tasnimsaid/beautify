$(document).ready(function(e) {
	$("#clear").click(function(e) {
    	e.preventDefault();
		$("#url").val("").focus();
		$("#url").parents("div.form-group").removeClass("has-error");
    });
	
	$("#check").click(function(e) {
    	e.preventDefault();
		
		url = $.trim($("#url").val());
		
		if(url == "")
		{
			$("#url").focus().parents("div.form-group").addClass("has-error");
			return false;
		}else
		{
			$("#url").parents("div.form-group").removeClass("has-error");
		}
		
		$("img[alt='loader']").show();
		
		$.ajax({
			type	: "POST",
			url		: "/site-speed.php",
			data	: {"url" : url},
			success : function(data)
			{
				$("img[alt='loader']").hide();
				tb_data = "";
				if(data != "")
				{
					data = $.parseJSON(data);
					$.each(data, function(key, value)
					{
						tb_data += "<tr><td>" + value.url + "</td><td>" + value.file_size + "</td><td>" + value.load_time + "</td><td>" + value.speed + "</td></tr>";
					});
				}else
				{
					tb_data += "<tr><td colspan=\"4\" class=\"text-danger text-center\">No data found!</td></tr>";
				}
				$(".data_tb").find("tbody").html(tb_data);
				$(".data_tb").show();
			},
			error 	: function()
			{
				$("img[alt='loader']").hide();
			}
		});
    });
});