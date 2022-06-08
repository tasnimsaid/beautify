function formatNumber(num) {
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function timeDiff(start, end) {
	var diff = end - start;
	var units = [
	1000 * 60 * 60 *24,
	1000 * 60 * 60,
	1000 * 60,
	1000
	];

	var rv = [];
	for (var i = 0; i < units.length; ++i) {
		rv.push(Math.floor(diff / units[i]));
		diff = diff % units[i];
	}

	var thisFullYear = end.getFullYear();
	var daysInLastMonth = new Date(thisFullYear, end.getMonth(), 0).getDate();
	var thisMonth = end.getMonth(); 
	thisFullYear = thisFullYear - start.getFullYear();
	thisMonth = thisMonth - start.getMonth();
	subAddDays = daysInLastMonth - start.getDate();
	thisDay = end.getDate();
	thisMonth = thisMonth - 1;
	if(thisMonth < 0){
		thisFullYear = thisFullYear - 1;
		thisMonth = 12 + thisMonth;
	}
	subAddDays = daysInLastMonth - start.getDate();
	subAddDays = thisDay + subAddDays;

	if(subAddDays >= daysInLastMonth){
		subAddDays = subAddDays - daysInLastMonth;
		thisMonth++;
		if (thisMonth > 11){
			thisFullYear++;
			thisMonth = 0;
		}
	}
	return {
		years: thisFullYear,
		months: thisMonth,
		days: subAddDays,
		hours: rv[1],
		minutes: rv[2],
		seconds: rv[3]
	};
}

$(document).ready(function(e) {
	$("#clear").click(function(e) {
    	e.preventDefault();
		$("#sday,#smonth,#syear,#eday,#emonth,#eyear").val("");
		$("#sday,#smonth,#syear,#eday,#emonth,#eyear").parents("div.col-md-3").removeClass("has-error");
    });
	
	$("#calculate").click(function(e) {
    	e.preventDefault();
		
		sday = $.trim($("#sday").val());
		smonth = $.trim($("#smonth").val());
		syear = $.trim($("#syear").val());
		
		eday = $.trim($("#eday").val());
		emonth = $.trim($("#emonth").val());
		eyear = $.trim($("#eyear").val());
		
		regex = new RegExp('^[0-9]+$');
		
		isvalid = true;
		
		$("#sday,#smonth,#syear,#eday,#emonth,#eyear").each(function(index, element) {
            if(!regex.test($.trim($(this).val())))
			{
				$(this).focus().parents("div.col-md-3").addClass("has-error");
				isvalid = false;
				return false;
			}else
			{
				if($(this).is("#sday") || $(this).is("#eday"))
				{
					if($.trim($(this).val()) > 31 || $.trim($(this).val()) < 0)
					{
						$(this).focus().parents("div.col-md-3").addClass("has-error");
						isvalid = false;
						return false;
					}else
					{
						$(this).parents("div.col-md-3").removeClass("has-error");
					}
				}else if($(this).is("#smonth") || $(this).is("#emonth"))
				{
					if($.trim($(this).val()) > 12 || $.trim($(this).val()) < 0)
					{
						$(this).focus().parents("div.col-md-3").addClass("has-error");
						isvalid = false;
						return false;
					}else
					{
						$(this).parents("div.col-md-3").removeClass("has-error");
					}
				}else if($(this).is("#syear") || $(this).is("#eyear"))
				{
					if($.trim($(this).val()) > 99999 || $.trim($(this).val()) < 1000)
					{
						$(this).focus().parents("div.col-md-3").addClass("has-error");
						isvalid = false;
						return false;
					}else
					{
						$(this).parents("div.col-md-3").removeClass("has-error");
					}
				}
			}
        });
		if(!isvalid)
		{
			return false;
		}
		$("div.data_out").show();
		start = new Date(syear + "/" + smonth + "/" + sday);
		end = new Date(eyear + "/" + emonth + "/" + eday);
		if(start.getTime() > end.getTime())
		{
			tstart = start;
			tend = end;
			start = tend;
			end = tstart;
			$("p.date_war").show();
		}else
		{
			$("p.date_war").hide();
		}
		d = timeDiff(start, end);
		tdays = Math.round(Math.abs((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
		tweeks = Math.floor(tdays / 7);
		tmonths = Math.floor(tdays / 30);
		tyears = Math.floor(tdays / 365);
		
		tseconds = tdays * 86400;
		tminutes = tdays * 1440;
		thours = tdays * 24;
		date_str = ((d.years > 0) ? ((d.years > 1) ? d.years + " years" : d.years + " year") : "") + 
		((d.months > 0) ? ((d.months > 1) ? " " + d.months + " months" : " " + d.months + " month") : "") + 
		((d.days > 0) ? ((d.days > 1) ? ((d.years > 0 || d.months > 0) ? " and " + d.days + " days" : " " + d.days + " days") : ((d.years > 0 || d.months > 0) ? " and " + d.days + " day" : " " + d.days + " day")) : "");
		date_str = (($.trim(date_str) == "") ? "Both dates are same." : date_str);
		fdate = start.toDateString();
		tdate = end.toDateString();
		$("p.date_str").text(date_str);
		$("span.fdate").text(fdate);
		$("span.tdate").text(tdate);
		
		$("span.tyears").text(formatNumber(tyears));
		$("span.tmonths").text(formatNumber(tmonths));
		$("span.tdays").text(formatNumber(tdays));
		$("span.tweeks").text(formatNumber(tweeks));
		$("span.thours").text(formatNumber(thours));
		$("span.tminutes").text(formatNumber(tminutes));
		$("span.tseconds").text(formatNumber(tseconds));
    });
});