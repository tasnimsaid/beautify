function scroll_to_el()
{
	$("html, body").animate({
		scrollTop: ($("#data").offset().top - 10)
	}, 300);
}

$(document).ready(function(e) {
	$("#clear").click(function(e) {
    	e.preventDefault();
		$("#data").val("");
		$("#data").parents("div.form-group").removeClass("has-error");
		$("#radios-0").prop({"checked" : true});
    });
	
	$("#go").click(function(e) {
        e.preventDefault();
		data = $.trim($("#data").val());
		action = $.trim($("input[type='radio']:checked").val());
		if(data == "")
		{
			$("#data").focus().parents("div.form-group").addClass("has-error");
			return false;
		}else
		{
			$("#data").parents("div.form-group").removeClass("has-error");
		}
		out = "";
		switch(action)
		{
			case "camelize":
				out = S(data).camelize().s;
				$("#data").val(out);
				scroll_to_el();
				break;
			case "capitalize":
				arr = data.split(".");
				$.each(arr, function(key, val) {
					if($.trim(val) != "")
					{
						out += S($.trim(val)).capitalize().s + ". ";
					}
				});
				$("#data").val($.trim(out));
				scroll_to_el();
				break;
			case "collapseWhitespace":
				out = S(data).collapseWhitespace().s;
				$("#data").val(out);
				scroll_to_el();
				break;
			case "dasherize":
				out = S(data).dasherize().s;
				$("#data").val(out);
				scroll_to_el();
				break;
			case "decodeHTMLEntities":
				out = S(data).decodeHTMLEntities().s;
				$("#data").val(out);
				scroll_to_el();
				break;
			case "escapeHTML":
				out = S(data).escapeHTML().s;
				$("#data").val(out);
				scroll_to_el();
				break;
			case "latinise":
				out = S(data).latinise().s;
				$("#data").val(out);
				scroll_to_el();
				break;
			case "length":
				data = $.trim(data);
				$("#msg").text("The length of the string is: " + data.length);
				$("#msg_modal").modal({backdrop : false});
				break;
			case "lines":
				data = S(data).lines().length;
				$("#msg").text("The number of newlines is: " + data);
				$("#msg_modal").modal({backdrop : false});
				break;
			case "slugify":
				out = S(data).slugify().s;
				$("#data").val(out);
				scroll_to_el();
				break;
			case "titleCase":
				out = S(data).titleCase().s;
				$("#data").val(out);
				scroll_to_el();
				break;
			case "underscore":
				out = S(data).underscore().s;
				$("#data").val(out);
				scroll_to_el();
				break;
			case "unescapeHTML":
				out = S(data).unescapeHTML().s;
				$("#data").val(out);
				scroll_to_el();
				break;
			case "mlowercase":
				$("#data").val(data.toLowerCase());
				scroll_to_el();
				break;
			case "muppercase":
				$("#data").val(data.toUpperCase());
				scroll_to_el();
				break;
			case "reverse":
				$("#data").val(data.split("").reverse().join(""));
				scroll_to_el();
				break;
			case "csentence":
				arr = data.split(".");
				i = 0;
				$.each(arr, function(key, val) {
					if($.trim(val) != "")
					{
						i++;
					}
				});
				$("#msg").text("The total number of sentences in the string is: " + i);
				$("#msg_modal").modal({backdrop : false});
				break;
			case "cword":
				data = Math.ceil(data.split(/\b/g).length / 2);
				$("#msg").text("The total number of words in the string is: " + data);
				$("#msg_modal").modal({backdrop : false});
				break;
		}
	});
});