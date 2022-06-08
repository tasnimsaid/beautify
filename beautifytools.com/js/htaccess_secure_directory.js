$(document).ready(function(e) {
	$("#generate").click(function(e) {
    	e.preventDefault();
		uname = $.trim($("#uname").val());
		pass = $.trim($("#pass").val());
		path = $.trim($("#path").val());
		
		valid = true;
		
		$("#uname,#pass,#path").each(function(index, element) {
            if($.trim($(this).val()) == "")
			{
				$(this).focus().parents("div.form-group").addClass("has-error");
				valid = false;
				return false;
			}else
			{
				$(this).parents("div.form-group").removeClass("has-error");
			}
        });
		
		if(!valid)
		{
			return false;
		}
		$(".l_img").fadeIn(300);
		
		$.ajax({
			type	: "POST",
  			url		: "/prgen.php",
  			data	: {"pass" : pass},
  			success : function(data)
			{
				$(".l_img").hide();
				$("#crypt_pass").text(data);
				$("#uname_code").text(uname);
				$("#path_to_pass").text(path);
				$(".results").show();
			},
			error 	: function()
			{
				$(".l_img").hide();
			}
		});
	});
	$("#clear").click(function(e) {
		e.preventDefault();
    	$("#uname,#pass,#path").val("");
    });
});