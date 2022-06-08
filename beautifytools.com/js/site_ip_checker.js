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
			url		: "/siteip.php",
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
						tb_data += "<tr><td><a href=\"http://" + value.domain + "\" target=\"_blank\">" + value.domain + "</a></td><td>" + value.ip + "</td></tr>";
					});
				}else
				{
					tb_data += "<tr><td colspan=\"2\"><span class=\"text-danger\">No data found!</span></td></tr>";
				}
				$(".ip_tb").find("tbody").prepend(tb_data);
				$(".ip_tb").show();
			},
			error 	: function()
			{
				$("img[alt='loader']").hide();
			}
		});
    });
});