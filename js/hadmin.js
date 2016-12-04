$(document).ready(function(){
	//切换面板
	$(function() {
        $('#infoTab1 bookInfo').tab('show');//初始化显示哪个tab
        $('#infoTab1 a').click(function(e) {
            e.preventDefault();//阻止a链接的跳转行为
            $(this).tab('show');//显示当前选中的链接及关联的content
        });
        $('#infoTab2 a').click(function(e) {
            e.preventDefault();
            $(this).tab('show');
        });
        $('#myInfoTab a').click(function(e) {
            e.preventDefault();
            $(this).tab('show');
        });
		$('#recordsInfo a').click(function(e) {
            e.preventDefault();
            $(this).tab('show');
        });
    });
	
	//读取医院基本信息
	$.getJSON("data/hospital.json",function(data){
        $('#inputHName').val(data.name);
		$('#inputAddress').val(data.address);
		$('#inputPhone').val(data.phone);
		$('#inputRank').val(data.rank);
		$('#inputBtime').val(data.btime);
		$('#inputRtime').val(data.rtime);
		$('#inputPeriod').val(data.period);
		$('#inputNum').val(data.num);
		$('#inputIntro').val(data.intro);
		$('#inputRule').val(data.rule);
	});	
	
	//删除科室
	$.getJSON("data/office.json",function(data){
        $('#deleteofficeTb').empty();
        var strHtml = ''; 
		for(i = 0; i < data.length; i++){
            strHtml = '<tr>'
						+ '<td>' + data[i].ID + '</td>'
					    + '<td>' + data[i].name + '</td>'
						+ '<td><button class="btn btn-link">删除</button></td>'
					+ '</tr>';
			$("#deleteofficeTb").append(strHtml);	
		}
	});
	
	//删除疾病
	$.getJSON("data/disease.json",function(data){
        $('#deleteDssTb').empty();
        var strHtml = ''; 
		for(i = 0; i < data.length; i++){
            strHtml = '<tr>'
						+ '<td>' + data[i].ID + '</td>'
					    + '<td>' + data[i].office + '</td>'
					    + '<td>' + data[i].name + '</td>'
						+ '<td><button class="btn btn-link">删除</button></td>'
					+ '</tr>';
			$("#deleteDssTb").append(strHtml);	
		}
	});
	
	//删除疾病
	$.getJSON("data/doctor.json",function(data){
        $('#deleteDctTb').empty();
        var strHtml = ''; 
		for(i = 0; i < data.length; i++){
            strHtml = '<tr>'
						+ '<td>' + data[i].ID + '</td>'
					    + '<td>' + data[i].office + '</td>'
					    + '<td>' + data[i].name + '</td>'
						+ '<td><button class="btn btn-link">删除</button></td>'
					+ '</tr>';
			$("#deleteDctTb").append(strHtml);	
		}
	});
	
	
	
});





