$(document).ready(function(e) {
	$("#clear").click(function(e) {
    	e.preventDefault();
		$("#host,#ports").val("");
		$("#host,#ports").parents("div.form-group").removeClass("has-error");
    });
	
	$("#check").click(function(e) {
    	e.preventDefault();
		
		host = $.trim($("#host").val());
		ports = $.trim($("#ports").val());
		
		if(host == "")
		{
			$("#host").focus().parents("div.form-group").addClass("has-error");
			return false;
		}else
		{
			$("#host").parents("div.form-group").removeClass("has-error");
		}
		
		if(ports == "")
		{
			$("#ports").focus().parents("div.form-group").addClass("has-error");
			return false;
		}else
		{
			$("#ports").parents("div.form-group").removeClass("has-error");
		}
		
		$("img[alt='loader']").show();
		
		$.ajax({
			type	: "POST",
			url		: "/opc.php",
			data	: {"host" : host, "ports" : ports},
			success : function(data)
			{
				$("img[alt='loader']").hide();
				tb_data = "";
				if(data != "")
				{
					data = $.parseJSON(data);
					$.each(data, function(key, value)
					{
						status = ((value.status == "up") ? '&nbsp;<span class="glyphicon glyphicon-ok text-success" aria-hidden="true"></span>&nbsp;' : '&nbsp;<span class="glyphicon glyphicon-remove text-danger" aria-hidden="true"></span>&nbsp;');
						tb_data += "<tr><td>" + value.host + "</td><td>" + value.port + "</td><td>" + status + "</td></tr>";
					});
				}else
				{
					tb_data += "<tr><td colspan=\"3\" class=\"text-danger text-center\">No data found!</td></tr>";
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