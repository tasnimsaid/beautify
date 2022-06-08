$(document).ready(function(e) {
	function setTheme() {
		theme = $.trim($("#themes").val());
		font_size = $.trim($("#font_size").val());
		
		editorAce1.setTheme("ace/theme/" + theme);
		$("#code1").css({"font-size" : (font_size + "px")});
		editorAce1.setOptions({
			enableBasicAutocompletion : true,
			enableSnippets : true,
			enableLiveAutocompletion : true
		});
		
		editorAce2.setTheme("ace/theme/" + theme);
		$("#code2").css({"font-size" : (font_size + "px")});
		editorAce2.setOptions({
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
	var editorAce1 = ace.edit("code1");
	editorAce1.focus();
	editorAce1.setOptions({
		enableBasicAutocompletion: true,
		enableSnippets: true,
		enableLiveAutocompletion: true
	});
    editorAce1.setTheme("ace/theme/chrome");
    editorAce1.getSession().setMode("ace/mode/html");
	
	var editorAce2 = ace.edit("code2");
	editorAce2.setOptions({
		enableBasicAutocompletion: true,
		enableSnippets: true,
		enableLiveAutocompletion: true
	});
    editorAce2.setTheme("ace/theme/chrome");
    editorAce2.getSession().setMode("ace/mode/plain_text");
	
	$("#clear").click(function(e) {
    	e.preventDefault();
		editorAce1.setValue("");
		editorAce2.setValue("");
    });
	
	$("#clear_code1,#clear_code2").click(function(e) {
        e.preventDefault();
		if($(this).is("#clear_code1"))
		{
			editorAce1.setValue("");
		}else
		{
			editorAce2.setValue("");
		}
    });
	
	$("#copy_data1").click(function (e) {
        e.preventDefault();
        editorAce1.selectAll();
        editorAce1.focus();
        document.execCommand("copy");
    });
	
	$("#copy_data2").click(function (e) {
        e.preventDefault();
        editorAce2.selectAll();
        editorAce2.focus();
        document.execCommand("copy");
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
			editorAce1.getSession().setUseWorker(false);
			editorAce1.setValue("Please wait while loading file from url.");
			$.ajax({
				type	: "POST",
				url		: "/get_data.php",
				dataType: "text",
				data	: {"url" : url},
				success : function(data)
				{
					if(data == "file_not_found")
					{
						editorAce1.setValue("Unable to load file from url!");
					}else
					{
						editorAce1.getSession().setUseWorker(true);
						editorAce1.setValue(data);
					}
				},
				error 	: function()
				{
					editorAce1.setValue("Unable to load file from url!");
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
				editorAce1.getSession().setUseWorker(true);
				editorAce1.setValue(contents);
			}
			r.readAsText(f);
		}
		else
		{
			editorAce1.getSession().setUseWorker(false);
			editorAce1.setValue("Unable to load file!");
		}
	}
	
	$("#file").change(function(e) {
        e.preventDefault();
		read_file(e);
    });
	
	$("#download").click(function(e) {
        e.preventDefault();
		data = $.trim(editorAce2.getValue());
		if(data == "")
		{
			show_msg("The result is empty!", "error");
			return false;
		}
		blob = new Blob(["" + data + ""], {
			type : "text/plain;charset=utf-8"
		});
		saveAs(blob, "data.txt");
    });
	
	$("#max_code1").click(function(e) {
        e.preventDefault();
		if(!$(this).is(".maximized"))
		{
			$(this).addClass("maximized");
			$("div.buttons_div,div.div_code2").hide();
			$("#code1").css({"width" : "100%"});
			$("div.div_code1").removeClass("col-md-6").addClass("col-md-12");
			$(this).find("span").removeClass("glyphicon-resize-full").addClass("glyphicon-resize-small");
			$("#zclip-ZeroClipboardMovie_1").css({"left" : ($("#copy_data1").position().left - 5) + "px", "top" : $("#copy_data1").position().top + "px"});
			$(this).attr("title", "minimize");
			editorAce1.resize();
			editorAce2.resize();
		}else
		{
			$(this).removeClass("maximized");
			$("div.div_code1").removeClass("col-md-12").addClass("col-md-6");
			$("#code1").css({"width" : "100%"});
			$("div.buttons_div,div.div_code1,div.div_code2").show();
			$(this).find("span").removeClass("glyphicon-resize-small").addClass("glyphicon-resize-full");
			$("#zclip-ZeroClipboardMovie_1").css({"left" : ($("#copy_data1").position().left - 5) + "px", "top" : $("#copy_data1").position().top + "px"});
			$(this).attr("title", "maximize");
			editorAce1.resize();
			editorAce2.resize();
		}
    });
	
	$("#max_code2").click(function(e) {
        e.preventDefault();
		if(!$(this).is(".maximized"))
		{
			$(this).addClass("maximized");
			$("div.buttons_div,div.div_code1").hide();
			$("#code2").css({"width" : "100%"});
			$("div.div_code2").removeClass("col-md-6").addClass("col-md-12");
			$(this).find("span").removeClass("glyphicon-resize-full").addClass("glyphicon-resize-small");
			$("#zclip-ZeroClipboardMovie_2").css({"left" : ($("#copy_data2").position().left - 5) + "px", "top" : $("#copy_data2").position().top + "px"});
			$(this).attr("title", "minimize");
			editorAce1.resize();
			editorAce2.resize();
		}else
		{
			$(this).removeClass("maximized");
			$("div.div_code2").removeClass("col-md-12").addClass("col-md-6");
			$("#code2").css({"width" : "100%"});
			$("div.buttons_div,div.div_code1,div.div_code2").show();
			$(this).find("span").removeClass("glyphicon-resize-small").addClass("glyphicon-resize-full");
			$("#zclip-ZeroClipboardMovie_2").css({"left" : ($("#copy_data2").position().left - 5) + "px", "top" : $("#copy_data2").position().top + "px"});
			$(this).attr("title", "maximize");
			editorAce1.resize();
			editorAce2.resize();
		}
    });
	
	$("#code1").resizable({
		handles: 's',
		alsoResize: "#code2",
    	resize: function(event, ui) {
    		editorAce1.resize();
			editorAce2.resize();
    	}
	});
	
	$("#code2").resizable({
		handles: 's',
		alsoResize: "#code1",
    	resize: function(event, ui) {
    		editorAce1.resize();
			editorAce2.resize();
    	}
	});
	
	$(window).resize(function(e) {
        $("#code1,#code2").css({"width" : "100%"});
    });
	
	$("#sample").click(function(e) {
        e.preventDefault();
		data = "html";
		editorAce1.getSession().setUseWorker(false);
		editorAce1.setValue("Please wait ...");
		$.ajax({
			type	: "POST",
			url		: "/get-sample.php",
			data	: {"data" : data},
			success : function(data)
			{
				editorAce1.getSession().setUseWorker(true);
				editorAce1.setValue(data);
				$("#convert").click();
			},
			error 	: function()
			{
				editorAce1.getSession().setUseWorker(true);
				editorAce1.setValue("Connection lost. Try again!");
			}
		});
    });
	
	var opts = {};
	opts.indent_size = 4;
	opts.indent_char = " ";
	opts.eol = "\n";
	opts.indent_level = 0;
	opts.indent_with_tabs = false;
	opts.preserve_newlines = true;
	opts.max_preserve_newlines = 5;
	opts.jslint_happy = false;
	opts.space_after_anon_function = false;
	opts.brace_style = "collapse";
	opts.keep_array_indentation = false;
	opts.keep_function_indentation = false;
	opts.space_before_conditional = true;
	opts.break_chained_methods = false;
	opts.eval_code = false;
	opts.unescape_strings = false;
	opts.wrap_line_length = 0;
	opts.wrap_attributes = "auto";
	opts.wrap_attributes_indent_size = 4;
	opts.end_with_newline = false;
	
	$("#beautify_html").click(function(e) {
        e.preventDefault();
		data = $.trim(editorAce1.getValue());
		if(data != "")
		{
			editorAce1.setValue(html_beautify(data, opts));
		}
    });
	
	$("#convert").click(function(e) {
        e.preventDefault();
		data = $.trim(editorAce1.getValue());
		if(data != "")
		{
			try{
				html = $.parseHTML("<div>" + data + "</div>");
				cols = [];
				content = "";
				if($(html).find('table').length == 0)
				{
					editorAce2.getSession().setUseWorker(false);
					editorAce2.setValue("No table found in the html!");
					return false;
				}
				editorAce2.getSession().setUseWorker(true);
				$(html).find('table').each(function(index, element) {
                    $(this).find("th").each(function(index, element) {
                        cols.push($(this).text().toLowerCase());
                    });
                });
				
				$(html).find('table').each(function(index, element) {
                    $(this).find("tr").each(function(index, element) {
                        result = [];
						$(this).find('td').each(function(index) {
							result.push($(this).text());
						});
						content += result.join() + "\n";
                    });
                });
				
				csv_data = $.trim(cols.join() + content);
				
				multiLine = "";
				rows = csv_data.split("\n");
				for (i = 1; i < rows.length; i++)
				{
					cols = rows[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
					for (j = 0; j < cols.length; j++)
					{
						multiLine += cols[j].replace(/^"(.+)"$/, '$1') + "\n";
					}
					multiLine += "----";
					multiLine += "\n";
				}
				
				editorAce2.setValue(multiLine);
			}catch(e)
			{
				editorAce2.setValue("Error converting to Multi Line Data!");
			}
		}
    });
	
	themelist = ace.require("ace/ext/themelist");
	theme = "";
	$(themelist.themes).each(function(key, value) {
		theme += '<option value="' + value.name + '">' + value.caption + '</option>';
    });
	$("#themes").append(theme);
	
	$("#themes").val("chrome");
	$("#font_size").val("14");
	
	$("#themes,#font_size").change(function(e) {
        setTheme();
		editorAce1.focus();
    });
});