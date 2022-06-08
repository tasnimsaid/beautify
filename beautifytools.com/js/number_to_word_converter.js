$(document).ready(function(e) {
	$("#clear").click(function(e) {
    	e.preventDefault();
		$("#data,#language").val("");
		$("#data,#language").parents("div.form-group").removeClass("has-error");
    });
	
	$("#out").focus(function(e) {
    	$(this).select();
    });
	
	$("#convert").click(function(e) {
    	e.preventDefault();
		
		data = $.trim($("#data").val());
		language = $.trim($("#language").val());
		
		if(data == "")
		{
			$("#data").focus().parents("div.form-group").addClass("has-error");
			return false;
		}else
		{
			$("#data").parents("div.form-group").removeClass("has-error");
		}
		
		if(isNaN(data))
		{
			$("#data").focus().parents("div.form-group").addClass("has-error");
			$("p.info").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>&nbsp;Please enter a number!');
			return false;
		}else
		{
			$("#data").parents("div.form-group").removeClass("has-error");
			$("p.info").html('');
		}
		
		if(language == "")
		{
			$("#language").focus().parents("div.form-group").addClass("has-error");
			return false;
		}else
		{
			$("#language").parents("div.form-group").removeClass("has-error");
		}
		
		$("img[alt='loader']").show();
		
		$.ajax({
			type	: "POST",
			url		: "/num-to-word.php",
			data	: {"data" : data, "language" : language},
			success : function(data)
			{
				$("img[alt='loader']").hide();
				$("#out").val(data);
				$(".out_div").show();
			},
			error 	: function()
			{
				$("img[alt='loader']").hide();
			}
		});
    });
});