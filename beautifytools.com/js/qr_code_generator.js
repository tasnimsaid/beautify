function convert_date(data)
{
	date = Date.parse(data);
	date.setTimezone("GMT");
	date = new Date(date).toString("yyyyMMddTHHmmssZ");
	return date;
}

function is_form_ok()
{
	valid = true;
	qr_type = $.trim($("#qr-code-type").val());
	
	switch(qr_type)
	{
		case "address-book":
			$("#name").each(function(index, element) {
                if($.trim($(this).val()) == "")
				{
					valid = false;
					$(this).focus().parents("div.form-group").addClass("has-error");
					return false;
				}else
				{
					$(this).parents("div.form-group").removeClass("has-error");
				}
            });
			break;
		case "email":
			$("#email_email").each(function(index, element) {
                if($.trim($(this).val()) == "")
				{
					valid = false;
					$(this).focus().parents("div.form-group").addClass("has-error");
					return false;
				}else
				{
					$(this).parents("div.form-group").removeClass("has-error");
				}
            });
			break;
		case "event":
			$("#title,#location,#start-date,#end-date").each(function(index, element) {
                if($.trim($(this).val()) == "")
				{
					valid = false;
					$(this).focus().parents("div.form-group").addClass("has-error");
					return false;
				}else
				{
					$(this).parents("div.form-group").removeClass("has-error");
				}
            });
			break;
		case "geo":
			$("#latitude,#longitude").each(function(index, element) {
                if($.trim($(this).val()) == "")
				{
					valid = false;
					$(this).focus().parents("div.form-group").addClass("has-error");
					return false;
				}else
				{
					$(this).parents("div.form-group").removeClass("has-error");
				}
            });
			break;
		case "text":
			$("#text").each(function(index, element) {
                if($.trim($(this).val()) == "")
				{
					valid = false;
					$(this).focus().parents("div.form-group").addClass("has-error");
					return false;
				}else
				{
					$(this).parents("div.form-group").removeClass("has-error");
				}
            });
			break;
		case "sms":
			$("#telephone_sms,#message").each(function(index, element) {
                if($.trim($(this).val()) == "")
				{
					valid = false;
					$(this).focus().parents("div.form-group").addClass("has-error");
					return false;
				}else
				{
					$(this).parents("div.form-group").removeClass("has-error");
				}
            });
			break;
		case "tel":
			$("#telephone_tel").each(function(index, element) {
                if($.trim($(this).val()) == "")
				{
					valid = false;
					$(this).focus().parents("div.form-group").addClass("has-error");
					return false;
				}else
				{
					$(this).parents("div.form-group").removeClass("has-error");
				}
            });
			break;
		case "url":
			$("#url").each(function(index, element) {
                if($.trim($(this).val()) == "")
				{
					valid = false;
					$(this).focus().parents("div.form-group").addClass("has-error");
					return false;
				}else
				{
					$(this).parents("div.form-group").removeClass("has-error");
				}
            });
			break;
		case "wifi":
			$("#ssid").each(function(index, element) {
                if($.trim($(this).val()) == "")
				{
					valid = false;
					$(this).focus().parents("div.form-group").addClass("has-error");
					return false;
				}else
				{
					$(this).parents("div.form-group").removeClass("has-error");
				}
            });
			break;
	}
	return valid;
}

function get_data()
{
	str = "";
	qr_type = $.trim($("#qr-code-type").val());
	
	switch(qr_type)
	{
		case "address-book":
			str = 'BEGIN:VCARD\nVERSION:3.0\n';
			
			val = $.trim($("#name").val());
			if(val != ""){str += 'N:' + val + '\n';}
			
			val = $.trim($("#company").val());
			if(val != ""){str += 'ORG:' + val + '\n';}
			
			val = $.trim($("#occupation").val());
			if(val != ""){str += 'TITLE:' + val + '\n';}
			
			val = $.trim($("#telephone_add").val());
			if(val != ""){str += 'TEL:' + val + '\n';}
			
			val = $.trim($("#email_add").val());
			if(val != ""){str += 'EMAIL:' + val + '\n';}
			
			val = $.trim($("#address").val());
			if(val != ""){str += 'ADR:' + val + '\n';}
			
			val = $.trim($("#website-url").val());
			if(val != ""){str += 'URL:' + val + '\n';}
			
			val = $.trim($("#note").val());
			if(val != ""){str += 'NOTE:' + val + '\n';}
			str += 'END:VCARD';
			break;
		case "email":
			str = 'mailto:';
			
			val = $.trim($("#email_email").val());
			if(val != ""){str += val;}
			break;
		case "event":
			str = 'BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\n';
			
			val = $.trim($("#title").val());
			if(val != ""){str += 'SUMMARY:' + val + '\n';}
			
			val = $.trim($("#description").val());
			if(val != ""){str += 'DESCRIPTION:' + val + '\n';}
			
			val = $.trim($("#location").val());
			if(val != ""){str += 'LOCATION:' + val + '\n';}
			
			val = $.trim($("#start-date").val());
			if(val != ""){str += 'DTSTART:' + convert_date(val) + '\n';}
			
			val = $.trim($("#end-date").val());
			if(val != ""){str += 'DTEND:' + convert_date(val) + '\n';}
			str += 'END:VEVENT\nEND:VCALENDAR';
			break;
		case "geo":
			str = 'geo:';
			
			val = $.trim($("#latitude").val());
			if(val != ""){str += val;}
			
			val = $.trim($("#longitude").val());
			if(val != ""){str += ',' + val;}
			
			val = $.trim($("#queryString").val());
			if(val != ""){str += "?q=" + val;}
			break;
		case "text":
			str = '';
			
			val = $.trim($("#text").val());
			if(val != ""){str += val;}
			break;
		case "sms":
			str = 'smsto:';
			
			val = $.trim($("#telephone_sms").val());
			if(val != ""){str += val;}
			
			val = $.trim($("#message").val());
			if(val != ""){str += ':' + val;}
			break;
		case "tel":
			str = 'tel:';
			
			val = $.trim($("#telephone_tel").val());
			if(val != ""){str += val;}
			break;
		case "url":
			str = '';
			
			val = $.trim($("#url").val());
			if(val != ""){patt = /^http(s)?:\/\/.+$/;if(!patt.test(val)) {val = 'http://' + val;}str += val;}
			break;
		case "wifi":
			str = 'WIFI:';
			
			val = $.trim($("#ssid").val());
			if(val != ""){str += 'S:' + val + ';';}
			
			val = $.trim($("#password").val());
			if(val != ""){str += 'P:' + val + ';';}
			
			val = $.trim($("#networkType").val());
			if(val != ""){str += 'T:' + val + ';';}
			break;
	}
	return str;
}

$(document).ready(function(e) {
	$("#qr-code-type").val("address-book").change();
	$("#qr-code-type").change(function(e) {
        e.preventDefault();
		$("div[type_id]").hide();
		$("div[type_id='" + $.trim($(this).val()) + "']").show();
    });
	
	$("#start-date,#end-date").AnyTime_picker({
		format: "%Y-%m-%d %H:%i:%s %#",
		formatUtcOffset: "%: (%@)",
		hideInput: false,
		placement: "popup"
	});
	
	$("#generate").click(function(e) {
        e.preventDefault();
		if(is_form_ok())
		{
			error = $.trim($("#error").val());
			pixel_size = $.trim($("#pixel_size").val());
			frame_size = $.trim($("#frame_size").val());
			data = $.trim(get_data());
			
			$.ajax({
				type	: "POST",
				url		: "/qr-code.php",
				data	: {"data" : data, "error" : error, "pixel_size" : pixel_size, "frame_size" : frame_size},
				success : function(data)
				{
					data = "/files/qr-images/" + data;
					$("#qr-image").attr("src", data);
					$("#download").attr("href", data);
					$("html, body").animate({
						scrollTop: $("#qr-image").offset().top - 10
					}, 500);
				},
				error 	: function()
				{
					
				}
			});
		}
    });
});