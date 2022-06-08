$(document).ready(function(e) {
	$("#clear").click(function(e) {
    	e.preventDefault();
		$("#src").val("");
		$("#ascii_encoding option:eq(3)").prop('selected', true);
		$("#fast-decode").prop('checked', true);
		$("#special-char").prop('checked', false);
		$("#src,#ascii_encoding").parents("div.form-group").removeClass("has-error");
    });
	
	$("#decode").click(function(e) {
        e.preventDefault();
		var packed = document.getElementById('out');
  eval("packed.value=String" + packed.value.slice(4));
    });
	
	$("#out").focus(function(e) {
    	$(this).select();
    });
	
	$("#obfuscate").click(function(e) {
    	e.preventDefault();
		
		src = $.trim($("#src").val());
		ascii_encoding = $.trim($("#ascii_encoding option:selected").val());
		
		if(src == "")
		{
			$("#src").focus().parents("div.form-group").addClass("has-error");
			return false;
		}else
		{
			$("#src").parents("div.form-group").removeClass("has-error");
		}
		
		if(ascii_encoding == "")
		{
			$("#ascii_encoding").focus().parents("div.form-group").addClass("has-error");
			return false;
		}else
		{
			$("#ascii_encoding").parents("div.form-group").removeClass("has-error");
		}
		
		$("#obfuscator_form").submit();
    });
});