$(document).ready(function(e) {
	ace.require("ace/ext/language_tools");
	var editorAce = ace.edit("code1");
	editorAce.focus();
	editorAce.setOptions({
		enableBasicAutocompletion: true,
		enableSnippets: true,
		enableLiveAutocompletion: true
	});
    editorAce.setTheme("ace/theme/chrome");
    editorAce.getSession().setMode("ace/mode/plain_text");
	
	$("#code1").resizable({
		handles: 's',
    	resize: function(event, ui) {
    		editorAce.resize();
    	}
	});
	
	$(window).resize(function(e) {
        $("#code1").css({"width" : "100%"});
    });
	
	$("#copy").click(function (e) {
        e.preventDefault();
        editorAce.selectAll();
        editorAce.focus();
        document.execCommand("copy");
    });

	$("#sample").change(function(e) {
        e.preventDefault();
		data = $.trim($(this).val());
		editorAce.setValue("Please wait ...");
		$.ajax({
			type	: "POST",
			url		: "/get-sample.php",
			data	: {"data" : data},
			success : function(data)
			{
				editorAce.setValue(data);
			},
			error 	: function()
			{
				editorAce.setValue("Connection lost. Try again!");
			}
		});
    });
	
	$("#sample").val("javascript").change();
});