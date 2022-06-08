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
			url		: "/alexa-rank.php",
			data	: {"url" : url},
			success : function(data)
			{
				$("img[alt='loader']").hide();
				tb_data = "";
				if(data != "")
				{
					data = $.parseJSON(data);
					tb_data = "<tr><td>" + data.domain + "</td><td>" + data.global_rank + "</td><td>" + data.country_rank + " in " + data.country_name + " (" + data.country_code + ")</td></tr>";
					$("img.g1").attr("src", decodeURIComponent(data.graph1));
					$("img.g2").attr("src", decodeURIComponent(data.graph2));
					$("img.g3").attr("src", decodeURIComponent(data.graph3));
					$("img.g4").attr("src", decodeURIComponent(data.graph4));
					$("img.g5").attr("src", decodeURIComponent(data.graph5));
					$("img.g6").attr("src", decodeURIComponent(data.graph6));
					$(".data_tb").find("tbody").html(tb_data);
					$(".data_tb,.graph").show();
				}else
				{
					tb_data = "<tr><td colspan=\"3\"><span class=\"text-danger\">This site isn't ranked in Alexa.</span></td></tr>";
					$(".data_tb").find("tbody").html(tb_data);
					$(".data_tb").show();
					$(".graph").hide();
				}
			},
			error 	: function()
			{
				$("img[alt='loader']").hide();
			}
		});
    });
});