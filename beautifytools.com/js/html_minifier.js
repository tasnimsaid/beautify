function byId(id) {
	return document.getElementById(id);
}

function getOptions() {
    return {
      removeIgnored:                  byId('remove-ignored').checked,
      removeComments:                 byId('remove-comments').checked,
      removeCommentsFromCDATA:        byId('remove-comments-from-cdata').checked,
      removeCDATASectionsFromCDATA:   byId('remove-cdata-sections-from-cdata').checked,
      collapseWhitespace:             byId('collapse-whitespace').checked,
      conservativeCollapse:           byId('conservative-collapse').checked,
      collapseBooleanAttributes:      byId('collapse-boolean-attributes').checked,
      removeAttributeQuotes:          byId('remove-attribute-quotes').checked,
      removeRedundantAttributes:      byId('remove-redundant-attributes').checked,
      useShortDoctype:                byId('use-short-doctype').checked,
      removeEmptyAttributes:          byId('remove-empty-attributes').checked,
      removeEmptyElements:            byId('remove-empty-elements').checked,
      removeOptionalTags:             byId('remove-optional-tags').checked,
      removeScriptTypeAttributes:     byId('remove-script-type-attributes').checked,
      removeStyleLinkTypeAttributes:  byId('remove-style-link-type-attributes').checked,
      caseSensitive:                  byId('case-sensitive').checked,
      keepClosingSlash:               byId('keep-closing-slash').checked,
      minifyJS:                       byId('minify-js').checked,
      minifyCSS:                      byId('minify-css').checked,
      minifyURLs:                     byId('minify-urls').checked ? { site:byId('minify-urls-siteurl').value } : false,
    };
}

$(document).ready(function(e) {
	$("#clear").click(function(e) {
    	e.preventDefault();
		$("#html").val("");
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
	
	$("#out").focus(function(e) {
    	$(this).select();
    });
	
	$("#minify").click(function(e) {
    	e.preventDefault();
		data = $.trim($("#html").val());
		if(data == "")
		{
			$("#html").focus().parents("div.form-group").addClass("has-error");
			return false;
		}else
		{
			$("#html").parents("div.form-group").removeClass("has-error");
		}
		$("div.data_out").show();
		out = minify(data, getOptions());
		
		byId('out').value = out;
		$("html, body").animate({
			scrollTop: $("div.data_out").offset().top
		}, 500);
    });
});