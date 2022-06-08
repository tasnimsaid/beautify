function is_form_ok(url)
{
	valid = true;
	
	if(url == "")
	{
		$("p.info").html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;Please enter a url with http:// or https://');
		$("#url").focus().parents("div.form-group").addClass("has-error");
		valid = false;
		return false;
	}
	
	if((url.substring(0, 7) != "http://") && (url.substring(0, 8) != "https://"))
	{
		$("p.info").html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;Url should begin with http:// or https://');
		$("#url").focus().parents("div.form-group").addClass("has-error");
		valid = false;
		return false;
	}
	
	return valid;
}

$(document).ready(function(e) {
	$("#clear").click(function(e) {
    	e.preventDefault();
		$("#url").val("");
    });
	
	$("#check_redirect").click(function(e) {
    	e.preventDefault();
		$(".data").hide();
		url = $.trim($("#url").val());
		
		if(!is_form_ok(url))
		{
			return false;
		}else
		{
			$("p.info").html("");
			$("#url").parents("div.form-group").removeClass("has-error");
			$("img[alt='loader']").show();
		}
		
		$.ajax({
			type	: "POST",
			url		: "/rc.php",
			data	: {"url" : encodeURIComponent(url)},
			success : function(data)
			{
				$("img[alt='loader']").hide();
				if(data != "")
				{
					$(".data").html(data).show();
				}
			},
			error 	: function()
			{
				$("img[alt='loader']").hide();
				$(".info").html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;We have an error! The network connection may be lost.');
			}
		});
	});
});