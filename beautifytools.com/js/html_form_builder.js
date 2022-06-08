$(document).ready(function (e) {
    var formBuilderOptions = {
        showActionButtons: false,
        scrollToFieldOnAdd: false,
        sortableControls: true
    };

    var formBuilder = $("#build-wrap").formBuilder(formBuilderOptions);

    $("#preview").click(function (e) {
        e.preventDefault();
        if ($("#build-wrap").is(":visible")) {
            $("#build-wrap").hide();
            $("#build-preview").show();
            $(this).text("Edit");

            $("form", $("#build-preview")).formRender({
                formData: formBuilder.formData
            });
        }
        else {
            $("#build-preview").hide();
            $("#build-wrap").show();
            $(this).text("Preview");
        }
    });

    $("#getHTML").click(function (e) {
        e.preventDefault();

        $markup = $("<div/>");
        $markup.formRender({ formData: formBuilder.actions.getData('json') });

        $("#outDiv").show();

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

        $("#out").val(html_beautify($markup.formRender("html"), opts));
    });

    $("#getXML").click(function (e) {
        e.preventDefault();
        $("#outDiv").show();
        $("#out").val(vkbeautify.xml(formBuilder.actions.getData('xml'), 4));
    });

    $("#getJSON").click(function (e) {
        e.preventDefault();
        $("#outDiv").show();
        $("#out").val(vkbeautify.json(formBuilder.actions.getData('json'), 4));
    });

    $("#clear").click(function (e) {
        e.preventDefault();
        $("#build-preview").hide();
        $("#build-wrap").show();
        $("#preview").text("Preview");
        $("#out").val("");
        formBuilder.actions.clearFields();
    });
});