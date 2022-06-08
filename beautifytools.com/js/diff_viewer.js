$(document).ready(function(e) {
	$("#clear").click(function(e) {
    	e.preventDefault();
		$("#base_txt,#new_txt,#size").val("");
		$("#sidebyside").prop("checked", true);
		$("#base_txt,#new_txt,#size").parents("div.form-group").removeClass("has-error");
    });
	
	$("#view").click(function(e) {
    	e.preventDefault();
		base_txt = $.trim($("#base_txt").val());
		new_txt = $.trim($("#new_txt").val());
		size = $.trim($("#size").val());
		viewType = (($.trim($("[name='radios']:checked").val()) == "sidebyside") ? 0 : 1);
		if(base_txt == "")
		{
			$("#base_txt").focus().parents("div.form-group").addClass("has-error");
			return false;
		}else
		{
			$("#base_txt").parents("div.form-group").removeClass("has-error");
		}
		
		if(new_txt == "")
		{
			$("#new_txt").focus().parents("div.form-group").addClass("has-error");
			return false;
		}else
		{
			$("#new_txt").parents("div.form-group").removeClass("has-error");
		}
		
		if(size != "")
		{
			if(!$.isNumeric(size))
			{
				$("#size").focus().parents("div.form-group").addClass("has-error");
				return false;
			}else
			{
				$("#size").parents("div.form-group").removeClass("has-error");
			}
		}
		
		base_txt = difflib.stringAsLines(base_txt);
		new_txt = difflib.stringAsLines(new_txt);
		
		sm = new difflib.SequenceMatcher(base_txt, new_txt),
		opcodes = sm.get_opcodes(),
		diffoutputdiv = document.getElementById("diff"),
		contextSize = ((size == "") ? null : size);

		diffoutputdiv.innerHTML = "";
		contextSize = contextSize || null;
	
		diffoutputdiv.appendChild(diffview.buildView({
			baseTextLines: base_txt,
			newTextLines: new_txt,
			opcodes: opcodes,
			baseTextName: "Base Text",
			newTextName: "New Text",
			contextSize: contextSize,
			viewType: viewType
		}));
    });
});