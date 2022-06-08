function nextNearest(value, number) {
	remainder = value % number;
	if (remainder > 0) {
		value = (value - remainder) + number;
	}
	return value;
}

$(document).ready(function(e) {
	$("#clear").click(function(e) {
    	e.preventDefault();
		$("#avg_page_size,#avg_daily_visitor,#avg_pages_per_visit").val("");
		$("#avg_page_size,#avg_daily_visitor,#avg_pages_per_visit").parents("div.form-group").removeClass("has-error");
    });
	
	$("#calculate").click(function(e) {
    	e.preventDefault();
		
		avg_page_size = $.trim($("#avg_page_size").val());
		avg_daily_visitor = $.trim($("#avg_daily_visitor").val());
		avg_pages_per_visit = $.trim($("#avg_pages_per_visit").val());
		
		if(avg_page_size == "" || isNaN(avg_page_size) || avg_page_size < 0)
		{
			$("#avg_page_size").focus().parents("div.form-group").addClass("has-error");
			return false;
		}else
		{
			$("#avg_page_size").parents("div.form-group").removeClass("has-error");
		}
		
		if(avg_daily_visitor == "" || isNaN(avg_daily_visitor) || avg_daily_visitor < 0)
		{
			$("#avg_daily_visitor").focus().parents("div.form-group").addClass("has-error");
			return false;
		}else
		{
			$("#avg_daily_visitor").parents("div.form-group").removeClass("has-error");
		}
		
		if(avg_pages_per_visit == "" || isNaN(avg_pages_per_visit) || avg_pages_per_visit < 0)
		{
			$("#avg_pages_per_visit").focus().parents("div.form-group").addClass("has-error");
			return false;
		}else
		{
			$("#avg_pages_per_visit").parents("div.form-group").removeClass("has-error");
		}
		
		daily_quota = avg_page_size * avg_daily_visitor * avg_pages_per_visit;
		monthly_quota = daily_quota * 30;
		
		if (monthly_quota >= 1000000)
		{
			suggest_monthly_quota = nextNearest((monthly_quota / 1000000), .5) + ' TB';
			est_monthly_quota = (monthly_quota / 1000000).toFixed(2) + ' TB';
		}
		else if (monthly_quota >= 1000)
		{
			suggest_monthly_quota = Math.ceil((monthly_quota / 1000)) + ' GB';
			est_monthly_quota = (monthly_quota / 1000).toFixed(2) + ' GB';
		}
		else if ((monthly_quota < 1000) && (monthly_quota > 500))
		{
			suggest_monthly_quota = '1 GB';
			est_monthly_quota = monthly_quota + ' MB';
		}
		else if ((monthly_quota < 500) && (monthly_quota != 0))
		{
			suggest_monthly_quota = '500 MB';
			est_monthly_quota = monthly_quota + ' MB';
		}
		else if ((monthly_quota == 0))
		{
			suggest_monthly_quota = '0 MB';
			est_monthly_quota = monthly_quota + ' MB';
		}
		$("p.data_out").html("Your estimated monthly bandwidth quota is <strong>" + est_monthly_quota + "</strong>. <br/>You can start using <strong>" + suggest_monthly_quota + "</strong> bandwidth plan first.");
		$("div.out").show();
    });
});