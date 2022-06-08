$(document).ready(function(e) {
	function setLangauge() {
		language = $.trim($("#language").val());
		
		editorAce.getSession().setMode("ace/mode/" + language);
		editorAce.setOptions({
			enableBasicAutocompletion : true,
			enableSnippets : true,
			enableLiveAutocompletion : true
		});
	}
	
	function setTheme() {
		theme = $.trim($("#themes").val());
		font_size = $.trim($("#font_size").val());
		
		editorAce.setTheme("ace/theme/" + theme);
		$("#code1").css({"font-size" : (font_size + "px")});
		editorAce.setOptions({
			enableBasicAutocompletion : true,
			enableSnippets : true,
			enableLiveAutocompletion : true
		});
	}
	
	function show_msg(msg, type)
	{
		if(type == "info")
		{
			$("#msg").html('<span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>&nbsp;' + msg).removeClass("text-danger")
			.addClass("text-info");
			$("#msg_modal").modal({backdrop : false});
		}else if(type == "error")
		{
			$("#msg").html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;' + msg).removeClass("text-info")
			.addClass("text-danger");
			$("#msg_modal").modal({backdrop : false});
		}
	}
	
	ace.require("ace/ext/language_tools");
	var editorAce = ace.edit("code1");
	editorAce.focus();
	editorAce.setOptions({
		enableBasicAutocompletion: true,
		enableSnippets: true,
		enableLiveAutocompletion: true
	});
    editorAce.setTheme("ace/theme/chrome");
    editorAce.getSession().setMode("ace/mode/javascript");
	
	$("#code1").resizable({
		handles: 's',
    	resize: function(event, ui) {
    		editorAce.resize();
    	}
	});
	
	$(window).resize(function(e) {
        $("#code1").css({"width" : "100%"});
    });
	
	$("#clear").click(function(e) {
        e.preventDefault();
		editorAce.setValue("");
    });
	
	$("#set").click(function(e) {
        e.preventDefault();
		setLangauge();
		editorAce.focus();
    });
	
	$("#download").click(function(e) {
        e.preventDefault();
		data = $.trim(editorAce.getValue());
		if(data == "")
		{
			show_msg("The editor is empty!", "error");
			return false;
		}
		blob = new Blob(["" + data + ""], {
			type : "text/plain;charset=utf-8"
		});
		saveAs(blob, "data.txt");
    });
	
	$("#set_language").click(function(e) {
        e.preventDefault();
		$("#set_language_modal").modal({backdrop : false});
    });
	
	$("#load_url").click(function(e) {
        e.preventDefault();
		$("#url_modal").modal({backdrop : false});
    });
	
	$("#load").click(function(e) {
        e.preventDefault();
		url = $.trim($("#url").val());
		if(url != "")
		{
			editorAce.getSession().setUseWorker(false);
			editorAce.setValue("Please wait while loading file from url.");
			$.ajax({
				type	: "POST",
				url		: "/get_data.php",
				dataType: "text",
				data	: {"url" : url},
				success : function(data)
				{
					if(data == "file_not_found")
					{
						editorAce.setValue("Unable to load file from url!");
					}else
					{
						editorAce.getSession().setUseWorker(true);
						editorAce.setValue(data);
					}
				},
				error 	: function()
				{
					editorAce.setValue("Unable to load file from url!");
				}
			});
		}
    });
	
	$("#browse").click(function(e) {
        e.preventDefault();
		$("#file").click();
    });
	
	function read_file(e)
	{
		f = e.target.files[0];
		if(f)
		{
			r = new FileReader();
			r.onload = function(e)
			{
				var contents = e.target.result;
				var file_name = f.name;
				editorAce.getSession().setUseWorker(true);
				editorAce.setValue(contents);
			}
			r.readAsText(f);
		}
		else
		{
			editorAce.getSession().setUseWorker(false);
			editorAce.setValue("Unable to load file!");
		}
	}
	
	$("#file").change(function(e) {
        e.preventDefault();
		read_file(e);
    });
	
	themelist = ace.require("ace/ext/themelist");
	theme = "";
	$(themelist.themes).each(function(key, value) {
		theme += '<option value="' + value.name + '">' + value.caption + '</option>';
    });
	$("#themes").append(theme);
	
	modelist = ace.require("ace/ext/modelist");
	language = "";
	$(modelist.modes).each(function(key, value) {
		language += '<option value="' + value.name + '">' + value.caption + '</option>';
    });
	$("#language").append(language);
	
	$("#language").val("javascript");
	$("#themes").val("chrome");
	$("#font_size").val("14");
	
	$("#themes,#font_size").change(function(e) {
        setTheme();
		editorAce.focus();
    });
});