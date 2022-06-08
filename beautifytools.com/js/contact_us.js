function is_email_valid(email)
{
	regx =/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;
	valid_mail = regx.test(email);
	if(valid_mail)
	{
		return true;
	}else{
		return false;
	}
}

function is_form_ok(name, email, message, recaptcha)
{
	valid = true;
	
	if(name == "")
	{
		$("p.info_out").html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;Please enter your name.').addClass("text-danger");
		$("#name").focus().parents("div.form-group").addClass("has-error");
		valid = false;
		return false;
	}else
	{
		$("p.info_out").html("").removeClass("text-danger");
		$("#name").parents("div.form-group").removeClass("has-error");
	}
	
	if(!is_email_valid(email))
	{
		$("p.info_out").html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;Please enter a valid email address.').addClass("text-danger");
		$("#email").focus().parents("div.form-group").addClass("has-error");
		valid = false;
		return false;
	}else
	{
		$("p.info_out").html("").removeClass("text-danger");
		$("#email").parents("div.form-group").removeClass("has-error");
	}
	
	if(message == "")
	{
		$("p.info_out").html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;Please enter your message.').addClass("text-danger");
		$("#message").focus().parents("div.form-group").addClass("has-error");
		valid = false;
		return false;
	}else
	{
		$("p.info_out").html("").removeClass("text-danger");
		$("#message").parents("div.form-group").removeClass("has-error");
	}
	
	if(recaptcha == "")
	{
		$("p.info_out").html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;Please check the recaptcha.').addClass("text-danger");
		$("html, body").animate({
			scrollTop: $("p.info_out").offset().top - 10
		}, 500);
		valid = false;
		return false;
	}else
	{
		$("p.info_out").html("").removeClass("text-danger");
	}
	
	return valid;
}

$(document).ready(function(e) {
	$("#clear").click(function(e) {
    	e.preventDefault();
		$("#name,#email,#message").val("");
		$("p.info_out").html("");
		$("#name,#email,#message").parents("div.form-group").removeClass("has-error");
    });
	
	$("#send").click(function(e) {
    	e.preventDefault();
		
		name = $.trim($("#name").val());
		email = $.trim($("#email").val());
		message = $.trim($("#message").val());
		recaptcha = $.trim(grecaptcha.getResponse());
		
		if(!is_form_ok(name, email, message, recaptcha))
		{
			return false;
		}
		$("p.info_out").html('<span class="glyphicon glyphicon-hourglass" aria-hidden="true"></span>&nbsp;Please wait while sending your message.').addClass("text-info");
		$("html, body").animate({
			scrollTop: $("p.info_out").offset().top - 10
		}, 500);
		$.ajax({
			type	: "POST",
			url		: "/contact.php",
			data	: {"name" : name, "email" : email, "message" : message, "g-recaptcha-response" : recaptcha},
			success : function(data)
			{
				if(data == "")
				{
					$("p.info_out").html('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>&nbsp;Your message has been sent.').addClass("text-success");
					grecaptcha.reset();
					$("html, body").animate({
						scrollTop: $("p.info_out").offset().top - 10
					}, 500);
				}else
				{
					$("p.info_out").html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;' + data).addClass("text-danger");
					grecaptcha.reset();
					$("html, body").animate({
						scrollTop: $("p.info_out").offset().top - 10
					}, 500);
				}
			},
			error 	: function()
			{
				$("p.info_out").html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;Connection lost! Please try again.').addClass("text-danger");
				grecaptcha.reset();
				$("html, body").animate({
					scrollTop: $("p.info_out").offset().top - 10
				}, 500);
			}
		});
    });
});