function count_lines()
{
	txt = $("#txt").val();
	lines = 0;
	
	try {
	   lines = ((txt.match(/[^\n]*\n[^\n]*/gi).length));
	} catch(e) {
        lines = 0;
	}
	
	lines++;
	
	$("span.results").text(lines);
	return false;
}

$(document).ready(function(e) {
	$("#clear").click(function(e) {
    	e.preventDefault();
		$("#txt").val("").focus();
		count_lines();
    });
	
	$("#count").click(function(e) {
        e.preventDefault();
		count_lines();
    });
	
	$("#txt").bind("keyup focus", function(e){
		count_lines();
	});
});