$(document).ready(function(){
	//切换面板
	$(function() {
        $('#infoTab1 bookInfo').tab('show');//初始化显示哪个tab
        $('#infoTab1 a').click(function(e) {
            e.preventDefault();//阻止a链接的跳转行为
            $(this).tab('show');//显示当前选中的链接及关联的content
        })
        $('#infoTab2 a').click(function(e) {
            e.preventDefault();
            $(this).tab('show');
        })
        $('#myInfoTab a').click(function(e) {
            e.preventDefault();
            $(this).tab('show');
        })
		$('#recordsInfo a').click(function(e) {
            e.preventDefault();
            $(this).tab('show');
        })
    });
	//选取日期
	$('.form_date').datetimepicker({
        language:  'fr',
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0
    });
	
	//生成所有select
	$.getJSON("data/hospitals.json",function(data){
        $('#inputHospital').empty();
        var strHtml = ''; 
		for(i = 1; i < data.length; i++){
            strHtml = '<option>' + data[i].name + '</option>';
			$("#inputHospital").append(strHtml);	
		}
	});
	$.getJSON("data/office.json",function(data){
        $('#inputOffice').empty();
        var strHtml = ''; 
		for(i = 0; i < data.length; i++){
            strHtml = '<option>' + data[i].name + '</option>';
			$("#inputOffice").append(strHtml);	
		}
	});
	
	
	//预约记录
	$.getJSON("data/bookInfo.json",function(data){
        $('#bookInformation').empty();
        var strHtml = ''; 
		for(i = 0; i < data.length; i++){
            strHtml = '<tr>'
						+ '<td>' + data[i].bookTime + '</td>'
					    + '<td>' + data[i].hsptTime + '</td>'
						+ '<td>' + data[i].hsptName + '</td>'
						+ '<td>' + data[i].officeName + '</td>'
						+ '<td>' + data[i].doctor + '</td>'
						+ '<td>' + data[i].bookState + '</td>'
						+ getBookOperate(data[i].ID, data[i].operate)
					+ '</tr>';
			$("#bookInformation").append(strHtml);	
		}
	});
	//用户信息
	$.getJSON("data/user.json",function(data){
        $('#userName').html(data.name);
        $('#userSex').html(data.sex);
        $('#userAge').html(data.age);
        $('#userIDNum').html(data.IDNum);
        $('#userPhone').html(data.phone);
	});
	//修改信息
	$('#cfmBtn').click(function(e){
		e.preventDefault();
		var userPsd = $('#inputPassword').val();
		var checkPassword = $('#checkPassword').val();
		var userPhone = $('#inputPhone').val();
		var jsonUser = {userPsd:userPsd, userPhone:userPhone};  
		var strUser = JSON.stringify(jsonUser); 
		//此处需要修改地址/////////////////////////////////////////////////////////
		if(userPsd != checkPassword){
			alert("两次输入密码不一致请重试！");
		}else{
			$.post("user/change.action", {json: strUser}, callback, "json");
		}
	});
	//就诊记录
	$.getJSON("data/records.json",function(data){
        $('#careRecords').empty();
        var strHtml = ''; 
		for(i = 0; i < data.length; i++){
            strHtml = '<tr>'
						+ '<td>' + data[i].careTime + '</td>'
						+ '<td>' + data[i].hsptName + '</td>'
						+ '<td>' + data[i].officeName + '</td>'
						+ '<td>' + data[i].result + '</td>'
					+ '</tr>';
			$("#careRecords").append(strHtml);	
		}
	});
	
	
});
function getBookOperate(n, data){
	var str = '';
	if(data=="0"){//1:待看诊；0：已看诊
		str = '<td><button class="btn btn-link disabled" id="info' + n + '">已过期</button></td>';
	}
	if(data=="1"){
		str = '<td><button class="btn btn-link" id="info' + n + '">取消</button></td>';
	}
	return str;
}
function callback(json){
    alert(json.msg);    //显示反馈信息
    if(json.suc == 1){    //如果返回"修改成功"
        window.location.href = "admin/index.action";
		$.getJSON("data/user.json",function(data){
			$('#userName').html(data.name);
			$('#userSex').html(data.sex);
			$('#userAge').html(data.age);
			$('#userIDNum').html(data.IDNum);
			$('#userPhone').html(data.phone);
		});
    }else{
		alert("修改失败！");
	}
}






