$(document).ready(function(){
	//setLocalStorage('test','test');
	//getLocalStorage('test');
	//bookHospital、bookOffice、bookTime、userName
	//读取用户
	//localStorage.setItem('userName','');
    if(localStorage.getItem("userName")){
		$('#login').html(localStorage.getItem("userName"));
		$('#phoneBook').html('<a href="user.html">个人主页</a>');
		$('#welcome').html('&nbsp;&nbsp;&nbsp;&nbsp;电话预约&nbsp;&nbsp;<span class="glyphicon glyphicon-earphone" aria-hidden="true"></span>&nbsp;&nbsp;010-12345678&nbsp;&nbsp;&nbsp;&nbsp;');
	}
	
	//面板切换
    $('#loginTab a:first').tab('show');//初始化显示哪个tab
    $('#loginTab a').click(function(e) {
        e.preventDefault();//阻止a链接的跳转行为
        $(this).tab('show');//显示当前选中的链接及关联的content
		$('#pswWrong').css('display','none');
    });
	
	//注册
	$('#rgst').click(function(){
		location = "register.html";
	});
	
	//快速登录
	$('#loginBtn1').click(function(){
		var userName = $("#loginName1").val();
        var userID = $("#loginID1").val();
        var userPsd = $("#loginPassword1").val();
        var jsonUser = {userName:userName, userID:userID, userPsd:userPsd};     
        var strUser = JSON.stringify(jsonUser);  
		//此处需要修改地址////////////////////////////////////////////////////////////////////////////////////////////
        //$.post("user/login.action", {json: strUser}, callback, "json");
		if(userName=="大连医科大学第二附属医院" && userID=="!" && userPsd=="yidaeryuan"){
			$('#pswWrong').css('display','none');
			localStorage.setItem("userName", userName);
			$('#loginDiv').modal('hide');
			$('#login').html(localStorage.getItem("userName"));
			window.location.href = "hadmin.html";
		}else if(userName=="张三" && userID=="111222333344556666" && userPsd=="zhangsan"){
			$('#pswWrong').css('display','none');
			localStorage.setItem("userName", userName);
			$('#loginDiv').modal('hide');
			$('#login').html(localStorage.getItem("userName"));
			$('#phoneBook').html('<a href="user.html">个人主页</a>');
			$('#welcome').html('&nbsp;&nbsp;&nbsp;&nbsp;电话预约&nbsp;&nbsp;<span class="glyphicon glyphicon-earphone" aria-hidden="true"></span>&nbsp;&nbsp;010-12345678&nbsp;&nbsp;&nbsp;&nbsp;');
		}else if(userName=="李四" && userID=="111222333344556666" && userPsd=="lisi"){
			$('#pswWrong').css('display','none');
			localStorage.setItem("userName", userName);
			$('#loginDiv').modal('hide');
			$('#login').html(localStorage.getItem("userName"));$('#phoneBook').html('<a href="user.html">个人主页</a>');
			$('#welcome').html('&nbsp;&nbsp;&nbsp;&nbsp;电话预约&nbsp;&nbsp;<span class="glyphicon glyphicon-earphone" aria-hidden="true"></span>&nbsp;&nbsp;010-12345678&nbsp;&nbsp;&nbsp;&nbsp;');
		}else if(userName=="admin" && userID=="!" && userPsd=="admin"){
			$('#pswWrong').css('display','none');
			localStorage.setItem("userName", userName);
			$('#loginDiv').modal('hide');
			$('#login').html(localStorage.getItem("userName"));
			window.location.href = "admin.html";
		}else{
			$('#pswWrong').css('display','block');
		}
    });
	//验证登录
	$('#loginBtn2').click(function(){
        var userName = $("#loginName2").val();
        var userID = $("#loginID2").val();
		var userPhone = $('#loginPhone').val();
        var userCode = $("#loginCheckCode").val();
        var jsonUser = {userName:userName, userID:userID, userPsd:userPsd};     
        var strUser = JSON.stringify(jsonUser);  
		//此处需要修改地址////////////////////////////////////////////////////////////////////////////////////////////
        $.post("user/login.action", {json: strUser}, callback, "json");
    });
});

function callback(json){
    alert(json.msg);    //显示反馈信息
    if(json.suc == 1){    //如果返回"登录成功"
        $('#myModal').modal('hide');
		localStorage.setItem("userName", userName);
		$('#login').html(localStorage.getItem("userName"));
    }else{
		$('#pswWrong').css('display','block');
	}
}

//添加过期策略的本地存储
function setLocalStorage(key,value){
	alert(key);
	var curtime = new Date().getTime();//获取当前时间
	alert(value);
	var jsonStr = JSON.stringify({val:value,time:curtime});
	alert(typeof(jsonStr));
	localStorage.setItem(test, jsonStr);//转换成json字符串序列
	alert('bbb');
}
function getLocalStorage(key){
	alert('a');
	var val = localStorage.getItem(key);//获取存储的元素
	alert('aa');
    var jsonVal = JSON.parse(val);//解析出json对象
	if(new Date().getTime() - dataobj.time > 1800000)//过期时间设为30分钟
	{
	  localStorage.setItem(key,'');//清空该元素
	  alert('a');
	  return '';
	}
	else{
		alert(jsonVal.val);
	  return jsonVal.val;
	}
}

