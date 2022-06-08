$(document).ready(function(e) {
	$("#generate").click(function(e) {
    	e.preventDefault();
		uname = $.trim($("#uname").val());
		pass = $.trim($("#pass").val());
		path = $.trim($("#path").val());
		files = $.trim($("#files").val());
		
		valid = true;
		
		$("#uname,#pass,#path,#files").each(function(index, element) {
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
  			url		: "/sefiles.php",
  			data	: {"pass" : pass, "files" : files},
  			success : function(data)
			{
				$(".l_img").hide();
				data = $.parseJSON(data);
				$("#crypt_pass").text(data.pass);
				$("#uname_code").text(uname);
				$("#files_code").text(data.files);
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
    	$("#uname,#pass,#path,#files").val("");
    });
});