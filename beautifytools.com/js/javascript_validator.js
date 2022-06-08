$(document).ready(function(e) {
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
	editorAce1.getSession().setUseWorker(false);
	
	var JSHINT_options = {};
	
	function set_options()
	{
		JSHINT_options = {
			unused: $("#unused").is(":checked"),
			undef: $("#undef").is(":checked"),
			eqnull: $("#eqnull").is(":not(:checked)"),
			debug: $("#debug").is(":not(:checked)"),
			forin: $("#forin").is(":checked"),
			noarg: $("#noarg").is(":checked"),
			boss: $("#boss").is(":not(:checked)"),
			loopfunc: $("#loopfunc").is(":not(:checked)"),
			evil: $("#evil").is(":not(:checked)"),
			laxbreak: $("#laxbreak").is(":not(:checked)"),
			bitwise: $("#bitwise").is(":checked"),
			strict: $("#strict").is(":checked"),
			nonew: $("#nonew").is(":checked"),
			browser: $("#browser").is(":checked"),
			node: $("#node").is(":checked"),
			jquery: $("#jquery").is(":checked"),
			devel: $("#devel").is(":checked"),
			esnext: $("#esnext").is(":checked"),
			moz: $("#moz").is(":checked"),
			es3: $("#es3").is(":checked")
		};
	}
	
	set_options();
	
	function validate()
	{
		code = editorAce1.getValue();
		JSHINT(code, JSHINT_options);
		errors = JSHINT.errors;
		count = errors.length;
		data = "";
		if (count == 0) {
			data = '<tr><td colspan="3">No syntax errors!</td></tr>';
		} else {
			for (i = 0; i < count; i++) {
				if (errors[i] != null) {
					data += "<tr>";
					data += "<td>" + errors[i].line + "</td>";
					data += "<td>" + errors[i].character + "</td>";
					data += "<td>" + errors[i].reason + "</td>";
					data += "</tr>";
				}
			}
		}
		if(count > 10)
		{
			$("div.data_well").css({"height":"479px", "overflow-y":"scroll"});
		}else
		{
			$("div.data_well").css({"height":"auto", "overflow-y":"auto"});
		}
		$("table.data tbody").html(data);
	}
	
	$("#set").click(function(e) {
        e.preventDefault();
		set_options();
		validate();
    });
	
	$("#options").click(function(e) {
        e.preventDefault();
		$("#options_modal").modal({backdrop : false});
    });
	
    $('#format_code').click(function(e) {
        e.preventDefault();
		data = $.trim(editorAce1.getValue());
		if(data != "")
		{
			js = js_beautify(data, {'indent_size': 1, 'indent_char': '\t'});
			editorAce1.setValue(js);
		}
		validate();
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
	editorAce1.on("change", function(){
		if(keep_validating != null)
		{
			clearTimeout(keep_validating);
		}
        keep_validating = setTimeout(validate, 500);
	});
});