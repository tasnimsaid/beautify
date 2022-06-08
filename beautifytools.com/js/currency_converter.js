$(document).ready(function(e) {
	$("#clear").click(function(e) {
    	e.preventDefault();
		$("#from,#to").val("USD");
		$("#amount").val("");
		$("#amount").parents("div.form-group").removeClass("has-error");
    });
	
	if($("#from").attr("data_code") != "")
	{
		$("#from").val($("#from").attr("data_code"));
	}
	
	$("#convert").click(function(e) {
    	e.preventDefault();
		from = $.trim($("#from").val());
		to = $.trim($("#to").val());
		amount = $.trim($("#amount").val());
		if(!$.isNumeric(amount))
		{
			$("#amount").focus().parents("div.form-group").addClass("has-error");
			return false;
		}else
		{
			$("#amount").parents("div.form-group").removeClass("has-error");
			$("img[alt='loader']").show();
			$.getJSON("https://free.currconv.com/api/v7/convert?q=" + from + "_" + to + "&compact=ultra&apiKey=f205d556eacd679631ee", function(out) {
				$("img[alt='loader']").hide();
				$("div.out_div").show();
				from_c = amount;
				to_c = Number(amount * out[from + "_" + to]).toFixed(3);
				from_c_code = from;
				to_c_code = to;
				from_con_c = "1.00";
				currency1 = from_c;
				currency2 = to_c;
				to_con_c = (currency2/currency1);
				to_con_c = Number(to_con_c).toFixed(3);
				from_con_c_code = from;
				to_con_c_code = to;
				$("span.from_c").text(from_c);
				$("span.to_c").text(to_c);
				$("span.from_c_code").text(from_c_code);
				$("span.to_c_code").text(to_c_code);
				$("span.from_con_c").text(from_con_c);
				$("span.to_con_c").text(to_con_c);
				$("span.from_con_c_code").text(from_con_c_code);
				$("span.to_con_c_code").text(to_con_c_code);
			});
		}
    });
});