$(document).ready(function(e) {
	$("#clear").click(function(e) {
    	e.preventDefault();
		$("#url").val("").focus();
		$("#url").parents("div.form-group").removeClass("has-error");
    });
	
	$("#lookup").click(function(e) {
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
			url		: "/mx.php",
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
						tb_data += "<tr><td>" + value.pref + "</td><td>" + value.host + "</td><td>" + value.ip + "</td><td>" + value.ttl + "</td></tr>";
					});
				}else
				{
					tb_data += "<tr><td colspan=\"4\"><span class=\"text-danger\">No data found!</span></td></tr>";
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