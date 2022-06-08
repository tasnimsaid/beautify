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
			url		: "/social-popularity.php",
			data	: {"url" : url},
			success : function(data)
			{
				$("img[alt='loader']").hide();
				tb_data = "";
				if(data != "")
				{
					data = $.parseJSON(data);
					tb_data = '<tr><td style="width:35px"><img src="/img/social/googleplus.png" alt="Google plus shares"></td><td>Google plus shares</td><td>' + data.google + '</td></tr><tr><td style="width:35px"><img src="/img/social/facebook.png" alt="Facebook shares"></td><td>Facebook shares</td><td>' + data.f_shares + '</td></tr><tr><td style="width:35px"><img src="/img/social/facebook.png" alt="Facebook likes"></td><td>Facebook likes</td><td>' + data.f_likes + '</td></tr><tr><td style="width:35px"><img src="/img/social/facebook.png" alt="Facebook comments"></td><td>Facebook comments</td><td>' + data.f_comments + '</td></tr><tr><td style="width:35px"><img src="/img/social/facebook.png" alt="Facebook total likes, shares or comments"></td><td>Facebook total likes, shares or comments</td><td>' + data.f_l_s_c + '</td></tr><tr><td style="width:35px"><img src="/img/social/vk.png" alt="Vkontakte shares"></td><td>Vkontakte shares</td><td>' + data.vKontakte + '</td></tr><tr><td style="width:35px"><img src="/img/social/pinterest.png" alt="Pinterest shares"></td><td>Pinterest shares</td><td>' + data.pinterest + '</td></tr><tr><td style="width:35px"><img src="/img/social/linkedin.png" alt="Linkedin shares"></td><td>Linkedin shares</td><td>' + data.linkedin + '</td></tr><tr><td style="width:35px"><img src="/img/social/xing.png" alt="Xing shares"></td><td>Xing shares</td><td>' + data.x_shares + '</td></tr><tr><td style="width:35px"><img src="/img/social/xing.png" alt="Xing comments"></td><td>Xing comments</td><td>' + data.x_comments + '</td></tr><tr><td style="width:35px"><img src="/img/social/xing.png" alt="Xing share clicks"></td><td>Xing share clicks</td><td>' + data.x_s_clicks + '</td></tr><tr><td style="width:35px"><img src="/img/social/xing.png" alt="Xing share reach"></td><td>Xing share reach</td><td>' + data.x_s_r + '</td></tr><tr><td style="width:35px"><img src="/img/social/stumbleupon.png" alt="Stumbleupon shares"></td><td>Stumbleupon shares</td><td>' + data.stumpleupon + '</td></tr>';
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