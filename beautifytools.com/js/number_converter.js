function pad(s,z){s=""+s;return s.length<z?pad("0"+s,z):s}

function is_form_ok(from, format)
{
	valid = true;
	
	isbinary = /^[0-1\ ]+$/;
	isdecimal = /^\d+$/;
	ishex = /^[0-9A-Fa-f]+$/;
	
	if(from == "")
	{
		$("div.info").html('<p><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;Please enter some data to convert.</p>');
		$("#from").focus();
		valid = false;
		return false;
	}
	
	if(format == "bin2dec" || format == "bin2asc")
	{
		if(!isbinary.test(from))
		{
			$("div.info").html('<p><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;Please enter some binary data. (e.g. 01110100)</p>');
			$("#from").focus();
			valid = false;
			return false;
		}
	}
	
	if(format == "dec2hex" || format == "dec2bin")
	{
		if(!isdecimal.test(from))
		{
			$("div.info").html('<p><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;Please enter some decimal number. (e.g. 012345)</p>');
			$("#from").focus();
			valid = false;
			return false;
		}
	}
	
	if(format == "hex2bin")
	{
		if(!ishex.test(from))
		{
			$("div.info").html('<p><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;Please enter some hexadecimal data. (e.g. 30F3)</p>');
			$("#from").focus();
			valid = false;
			return false;
		}
	}
	
	return valid;
}

$(document).ready(function(e) {
	
	$("#convert").click(function(e) {
        e.preventDefault();
		from = $.trim($("#from").val());
		format = $.trim($("#format").val());
		if(!is_form_ok(from, format))
		{
			return false;
		}else
		{
			$("div.info p").hide();
		}
		
		out = "";
		
		switch(format)
		{
			case "bin2dec":
				out = from.replace(/\s*[01]+\s*/g, function(bin) {
					return parseInt(bin, 2) + " ";
    			});
				break;
			case "dec2hex":
				out = parseInt(from, 10).toString(16).toUpperCase();
				break;
			case "hex2bin":
				arr = from.split("");
				for(i in arr)
				{
					out += pad(parseInt(arr[i], 16).toString(2), 4) + " ";
				}
				break;
			case "dec2bin":
				out = parseInt(from, 10).toString(2);
				break;
			case "asc2bin":
				arr = from.split("");
				for(i in arr)
				{
					out += pad(arr[i].charCodeAt(0).toString(2), 8) + " ";
				}
				break;
			case "bin2asc":
				out = from.replace(/\s*[01]{8}\s*/g, function(bin) {
					return String.fromCharCode(parseInt(bin, 2));
    			});
				break;
		}
		$("#to").val(out);
    });
	
	$("#clear").click(function(e) {
    	e.preventDefault();
		$("#from").val("");
    });
});