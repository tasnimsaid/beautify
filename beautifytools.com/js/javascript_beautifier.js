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
    editorAce1.getSession().setMode("ace/mode/javascript");
	
	var editorAce2 = ace.edit("code2");
	editorAce2.setOptions({
		enableBasicAutocompletion: true,
		enableSnippets: true,
		enableLiveAutocompletion: true
	});
    editorAce2.setTheme("ace/theme/chrome");
    editorAce2.getSession().setMode("ace/mode/javascript");
	editorAce2.getSession().setUseWorker(false);
	
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
		data = "javascript";
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
				$("#beautify_js").click();
			},
			error 	: function()
			{
				editorAce1.getSession().setUseWorker(true);
				editorAce1.setValue("Connection lost. Try again!");
			}
		});
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
	
	function unpacker_filter(source) {
		var trailing_comments = '',
			comment = '',
			unpacked = '',
			found = false;
	
		// cut trailing comments
		do {
			found = false;
			if (/^\s*\/\*/.test(source)) {
				found = true;
				comment = source.substr(0, source.indexOf('*/') + 2);
				source = source.substr(comment.length).replace(/^\s+/, '');
				trailing_comments += comment + "\n";
			} else if (/^\s*\/\//.test(source)) {
				found = true;
				comment = source.match(/^\s*\/\/.*/)[0];
				source = source.substr(comment.length).replace(/^\s+/, '');
				trailing_comments += comment + "\n";
			}
		} while (found);
	
		var unpackers = [P_A_C_K_E_R, Urlencoded, /*JavascriptObfuscator,*/ MyObfuscate];
		for (var i = 0; i < unpackers.length; i++) {
			if (unpackers[i].detect(source)) {
				unpacked = unpackers[i].unpack(source);
				if (unpacked != source) {
					source = unpacker_filter(unpacked);
				}
			}
		}
	
		return trailing_comments + source;
	}
	
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
	
	var opts = {};
	
	opts.indent_size = $('#tabsize').val();
	opts.indent_char = opts.indent_size == 1 ? '\t' : ' ';
	opts.max_preserve_newlines = $('#max-preserve-newlines').val();
	opts.preserve_newlines = opts.max_preserve_newlines !== "-1";
	opts.keep_array_indentation = $('#keep-array-indentation').prop('checked');
	opts.break_chained_methods = $('#break-chained-methods').prop('checked');
	opts.indent_scripts = $('#indent-scripts').val();
	opts.brace_style = $('#brace-style').val();
	opts.space_before_conditional = $('#space-before-conditional').prop('checked');
	opts.unescape_strings = $('#unescape-strings').prop('checked');
	opts.jslint_happy = $('#jslint-happy').prop('checked');
	opts.end_with_newline = $('#end-with-newline').prop('checked');
	opts.wrap_line_length = $('#wrap-line-length').val();
	opts.indent_inner_html = $('#indent-inner-html').prop('checked');
	opts.comma_first = $('#comma-first').prop('checked');
	//opts.e4x = $('#e4x').prop('checked');
	
	$("#tabsize").val("4");
	$("#max-preserve-newlines").val("5");
	$("#wrap-line-length").val("0");
	$("#brace-style").val("collapse");
	$("#indent-scripts").val("normal");
	$('#space-before-conditional').prop('checked', true);
	$('#detect-packers').prop('checked', true);
	
	$("#beautify_js").click(function(e) {
        e.preventDefault();
		data = $.trim(editorAce1.getValue());
		if(data != "")
		{
			data = unpacker_filter(data);
			editorAce2.setValue(js_beautify(data, opts));
		}
    });
	
	$("#options").click(function(e) {
        e.preventDefault();
		$("#options_modal").modal({backdrop : false});
    });
	
	$("#set").click(function(e) {
        e.preventDefault();
		opts.indent_size = $('#tabsize').val();
		opts.indent_char = opts.indent_size == 1 ? '\t' : ' ';
		opts.max_preserve_newlines = $('#max-preserve-newlines').val();
		opts.preserve_newlines = opts.max_preserve_newlines !== "-1";
		opts.keep_array_indentation = $('#keep-array-indentation').prop('checked');
		opts.break_chained_methods = $('#break-chained-methods').prop('checked');
		opts.indent_scripts = $('#indent-scripts').val();
		opts.brace_style = $('#brace-style').val();
		opts.space_before_conditional = $('#space-before-conditional').prop('checked');
		opts.unescape_strings = $('#unescape-strings').prop('checked');
		opts.jslint_happy = $('#jslint-happy').prop('checked');
		opts.end_with_newline = $('#end-with-newline').prop('checked');
		opts.wrap_line_length = $('#wrap-line-length').val();
		opts.indent_inner_html = $('#indent-inner-html').prop('checked');
		opts.comma_first = $('#comma-first').prop('checked');
		//opts.e4x = $('#e4x').prop('checked');
		data = $.trim(editorAce1.getValue());
		if(data != "")
		{
			data = unpacker_filter(data);
			editorAce2.setValue(js_beautify(data, opts));
		}
    });
	
	$("#minify_js").click(function(e) {
        e.preventDefault();
		data = $.trim(editorAce1.getValue());
		if(data != "")
		{
			try{
				toplevel_ast = parse(data);
				toplevel_ast.figure_out_scope();
				compressor = new Compressor();
				compressed_ast = toplevel_ast.transform(compressor);
				compressed_ast.figure_out_scope();
				compressed_ast.compute_char_frequency();
				compressed_ast.mangle_names();
				js = compressed_ast.print_to_string();
				editorAce2.setValue(js);
			}catch(e)
			{
				editorAce2.setValue("Javascript parsing error!");
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