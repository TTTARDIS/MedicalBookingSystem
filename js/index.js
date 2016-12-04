$(document).ready(function(){
	//添加或清空bookHospital、bookOffice、bookTime本地存储
	localStorage.setItem('bookHospital','');
	localStorage.setItem('bookOffice','');
	localStorage.setItem('userName','');
	
	//面板切换
	$(function() {
        $('#loginTab a:first').tab('show');//初始化显示哪个tab
        $('#loginTab a').click(function(e) {
            e.preventDefault();//阻止a链接的跳转行为
            $(this).tab('show');//显示当前选中的链接及关联的content
			$('#pswWrong').css('display','none');
        });
    });	
	
	//加载科室
	$.getJSON("data/dis_off.json",function(data){
        $("#oAd").empty();
        var strHtml = ''; 
		for(i = 0; i < 6; i++){  
            strHtml = '<div class="col-md-2 hidden-xs hidden-sm">'
					     + '<div class="keshi">'
						     + '<div class="keshi_header">' + data[i].name + '</div>'
						     + '<div class="keshi_content">';
			for(j = 0; j < 12; j++){ 
				strHtml +=       '<a href="adisease.html?officeID=' + data[i].ID + '&diseaseID=' + data[i].diseases[j].Did + '">'
						            + data[i].diseases[j].Dname
						       + '</a>';
			}
			$("#oAd").append(strHtml);	
		}
	});
	
	//加载医院
	$.getJSON("data/hospitals.json",function(data){
        $("#sHspt").empty();
		$("#sHspt2").empty();
        var strHtml = ''; 
        for(i = 1; i < 11; i++){
			strHtml = '<a href="hospital.html?ID=' + data[i].ID + '"><span class="glyphicon glyphicon-play" aria-hidden="true"></span>&nbsp;&nbsp;' + data[i].name +'</a><br/>';
			$("#sHspt").append(strHtml);
		}
		for(i = 11; i < data.length; i++){
			strHtml = '<a href="hospital.html?ID=' + data[i].ID + '"><span class="glyphicon glyphicon-play" aria-hidden="true"></span>&nbsp;&nbsp;' + data[i].name +'</a><br/>';
			$("#sHspt2").append(strHtml);
		}
    });
	
	//加载公告
	$.getJSON("data/announcement.json",function(data){
        $("#announce").empty();
        var strHtml = ''; 
        for(i = 1; i < 10; i++){ 
            strHtml = '<a href="announcement.html?ID=' + data[i].ID + '"><span class="glyphicon glyphicon-play" aria-hidden="true"></span>&nbsp;&nbsp;' + data[i].title +'</a><br/>';
			$("#announce").append(strHtml);
        }
    });
	
});




