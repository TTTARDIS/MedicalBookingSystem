$(document).ready(function(){

	$.getJSON("data/announce.json",function(data){
        $('#title1').html('首页 &raquo; 最新公告 &raquo; ' + data.title);
		$('#title2').html(data.title);
		$('#time').html(data.time + '&nbsp;&nbsp;&nbsp;');
		$('#author').html('&nbsp;&nbsp;&nbsp;' + data.time);
		$('#content').html(data.content);
	});
	
});
