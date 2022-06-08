$(document).ready(function(e) {
	function looks_like_html(source) {
		trimmed = source.replace(/^[ \t\n\r]+/, '');
		comment_mark = '<' + '!-' + '-';
		return (trimmed && (trimmed.substring(0, 1) === '<' && trimmed.substring(0, 4) !== comment_mark));
	}
	
	function htmlEscape(text){
		var htmlEscapes = {
			"<": "&lt;",
			">": "&gt;",
			"&": "&amp;",
			"\"": "&quot;"
		};
		return text.replace(/[<>"&]/g, function(c){
			return htmlEscapes[c];
		});
	}
	
	function beautify() {
		source = editorAce1.getValue();
		opts = {};
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
		
		if (looks_like_html(source))
		{
			output = html_beautify(source, opts);
		}else
		{
			output = css_beautify(source, opts);
		}
		editorAce1.setValue(output);
	}
	
	function validate()
	{
		code = editorAce1.getValue();
		
		rules = {};
		
		$("input:checked").each(function(index, checkbox){
			rules[checkbox.name] = 1;
		});
		
		results = CSSLint.verify(code, rules);
		
		messages = results.messages;
		
		count = messages.length;
		
		data = "";
		if (count == 0) {
			data = '<tr><td colspan="6">No syntax errors!</td></tr>';
		}else if($.trim(code) == "")
		{
			data = '<tr><td colspan="6">No syntax errors!</td></tr>';
		}else {
			for (i = 0; i < count; i++)
			{
				data += "<tr>";
				if(messages[i].type == 'error'){
					data += "<td><img title='error' alt='error' src='/img/error.png' /></td>";
				} else if(messages[i].type == 'warning'){
					data += "<td><img title='warning' alt='warning' src='/img/warn.png' /></td>";
				}
				data += "<td>" + ((typeof messages[i].line == "number") ? messages[i].line : "(rollup)") + "</td>";
				data += "<td>" + ((typeof messages[i].col == "number") ? messages[i].col : "(rollup)") + "</td>";
				data += "<td>" + htmlEscape(messages[i].rule.name) + "</td>";
				data += "<td>" + htmlEscape(messages[i].message) + (messages[i].evidence ? "<pre>" + messages[i].evidence + "</pre>" : "") + "</td>";
				data += "<td>" + messages[i].rule.browsers + "</td>";
				data += "</tr>";
			}
		}
		if(count > 10)
		{
			$("div.data_well").css({"height":"500px", "overflow-y":"scroll"});
		}else
		{
			$("div.data_well").css({"height":"auto", "overflow-y":"auto"});
		}
		$("table.data tbody").html(data);
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
    editorAce1.getSession().setMode("ace/mode/css");
	editorAce1.getSession().setUseWorker(false);
	
    $('#format_code').click(function(e) {
        e.preventDefault();
        beautify();
		validate();
    });
	$("#options").click(function(e) {
        e.preventDefault();
		if($("div.data_options").is(":hidden"))
		{
			$("div.data_options").slideDown(400);
			$(this).addClass("active");
		}else
		{
			$("div.data_options").slideUp(400);
			$(this).removeClass("active");
		}
    });
    $('#clear').click(function(e) {
        e.preventDefault();
		editorAce1.setValue("");
		validate();
    });
    $("#validate_code").click(function(e) {
        e.preventDefault();
        validate();
    });
	var keep_validating = null;
    editorAce1.on("change", function() {
		if(keep_validating != null)
		{
			clearTimeout(keep_validating);
		}
        keep_validating = setTimeout(validate, 500);
    });
});