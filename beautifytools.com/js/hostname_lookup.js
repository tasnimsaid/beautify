$(document).ready(function(e) {
	$("#clear").click(function(e) {
    	e.preventDefault();
		$("#ip").val("").focus();
		$("#ip").parents("div.form-group").removeClass("has-error");
    });
	
	$("#lookup").click(function(e) {
    	e.preventDefault();
		
		ip = $.trim($("#ip").val());
		
		if(ip == "")
		{
			$("#ip").focus().parents("div.form-group").addClass("has-error");
			return false;
		}else
		{
			$("#ip").parents("div.form-group").removeClass("has-error");
		}
		
		$("img[alt='loader']").show();
		
		$.ajax({
			type	: "POST",
			url		: "/hostname.php",
			data	: {"ip" : ip},
			success : function(data)
			{
				$("img[alt='loader']").hide();
				tb_data = "";
				if(data != "")
				{
					data = $.parseJSON(data);
					$.each(data, function(key, value)
					{
						tb_data += "<tr><td>" + value.ip + "</td><td>" + value.host + "</td></tr>";
					});
				}else
				{
					tb_data += "<tr><td colspan=\"2\"><span class=\"text-danger\">No data found!</span></td></tr>";
				}
				$(".data_tb").find("tbody").prepend(tb_data);
				$(".data_tb").show();
			},
			error 	: function()
			{
				$("img[alt='loader']").hide();
			}
		});
    });
});