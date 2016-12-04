$(document).ready(function(){
	//切换面板
	$(function(){
        $('#addTab a:first').tab('show');//初始化显示哪个tab
        $('#addTab a').click(function(e) {
            e.preventDefault();//阻止a链接的跳转行为
            $(this).tab('show');//显示当前选中的链接及关联的content
        });
    });
	
	//删除医院
	$.getJSON("data/hospitals.json",function(data){
        $('#deleteHsptsTb').empty();
        var strHtml = ''; 
		for(i = 1; i < 4; i++){
            strHtml = '<tr>'
						+ '<td>' + data[i].ID + '</td>'
					    + '<td>' + data[i].name + '</td>'
						+ '<td><button class="btn btn-link">删除</button></td>'
					+ '</tr>';
			$("#deleteHsptsTb").append(strHtml);	
		}
	});
	
	//审核医院
	$.getJSON("data/hospital.json",function(data){
        $('#inputCName').val(data.name);
		$('#inputCAddress').val(data.address);
		$('#inputCPhone').val(data.phone);
		$('#inputCRank').val(data.rank);
		$('#inputCBtime').val(data.btime);
		$('#inputCRtime').val(data.rtime);
		$('#inputCPeriod').val(data.period);
		$('#inputCNum').val(data.num);
		$('#inputCIntro').val(data.intro);
		$('#inputCRule').val(data.rule);
		$('#InputImg').attr('src',data.pic);
	});	
	
});





