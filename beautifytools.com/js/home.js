$(document).ready(function (e) {

    const resizeObserver = new ResizeObserver(entries =>
        {
            if($('.ui-autocomplete.ui-widget:visible').length > 0)
                $('#SearchAllTools').autocomplete("search", $('#SearchAllTools').val());
        }
    );

    resizeObserver.observe(document.body);

    var data = [];

    $(".app_cat_ul li a").each(function (index) {

        var mapObj = {
            "&": "and",
            "/": "or",
        };

        let toolItem = new Map();

        toolItem['val'] = $(this).attr("href");
        toolItem['label'] = $(this).text();
        toolItem['alternateText'] = $(this).text().replace(/&|\//gi, function (matched) {
            return mapObj[matched];
        });

        data.push(toolItem);
    });

    var filter_options = function (term, options) {
        var split_term = term.split(' ');
        var matchers = [];
        for (var i = 0; i < split_term.length; i++) {
            if (split_term[i].length > 0) {
                var matcher = [];
                matcher = new RegExp($.ui.autocomplete.escapeRegex(split_term[i]), "i");
                matchers.push(matcher);
            }
        }
        return $.grep(options, function (option) {
            var partial_matches = 0;
            for (var i = 0; i < matchers.length; i++) {
                if ((matchers[i].test(option.label)) || (matchers[i].test(option.alternateText))) {
                    partial_matches++;
                }
            }
            return (!term || matchers.length === partial_matches);
        });
    }

    $('#SearchAllTools').autocomplete({
        source: function (request, response) {
            if($.trim(request.term) == "") return;
            var filtered_results = filter_options(request.term, data);
            response(filtered_results);
        },
        select: function (event, ui) {
            event.preventDefault();
            $(this).val(ui.item.label);
            $(this).blur();
            window.location.href = "//beautifytools.com" + ui.item.val;
        },
        delay: 0,
        maxItems: 3000
    });

    $.ui.autocomplete.prototype._renderItem = function (ul, item) {
        var term = this.term.split(' ');
        while ($.inArray("", term) != -1)
            term.splice($.inArray("", term), 1);
        term = term.join("|");
        var re = new RegExp("(" + term + ")", "gi");
        var arr, indexes = [];
        while ((arr = re.exec(item.alternateText)) != null) {
            indexes.push(item.label.substr(arr.index, (RegExp.$1.length)));
        }
        var reg;
        if (indexes.length != 0) {
            reg = new RegExp('(' + indexes.join('|') + '|' + term + ')', 'gi');
        } else {
            reg = new RegExp('(' + term + ')', 'gi');
        }
        var t = item.label.replace(reg, '<b>$1</b>');
        return $("<li></li>").data("item.autocomplete", item).append("<a>" + t + "</a>").appendTo(ul);
    };
});