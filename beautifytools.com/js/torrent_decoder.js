$(document).ready(function(e) {
	$("#decode").click(function(e) {
    	e.preventDefault();
		
		file = $.trim($("#torrent").val());
		
		if(file == "")
		{
			$(".info").html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;Please select a torrent file.');
			return false;
		}
		
		if(file.substr((file.lastIndexOf(".") + 1)) != "torrent")
		{
			$(".info").html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;Please select a torrent file.');
			return false;
		}
		
		$(".torrent_decoder_form").submit();
    });
});