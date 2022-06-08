$(document).ready(function(e) {
	$("#clear").click(function(e) {
    	e.preventDefault();
		$("#txt").val("").focus();
    });
	
	$("#count").click(function(e) {
        e.preventDefault();
		txt = $("#txt").val();
		
		$("img[alt='loader']").show();
		
		$.ajax({
			type	: "POST",
			url		: "/wc.php",
			data	: {"txt" : txt},
			success : function(data)
			{
				$("img[alt='loader']").hide();
				data = $.parseJSON(data);
				$("span.words").text(data.words);
				$("span.characters").text(data.characters);
				$("span.lines").text(data.lines);
				$("span.spaces").text(data.spaces);
				$("span.characters_without_spaces").text(data.characters_without_spaces);
				$("div.data").show();
				$("#txt").focus();
			},
			error 	: function()
			{
				$("img[alt='loader']").hide();
			}
		});
    });
});