$(document).ready(function(){
	var userName;
    var userGender;
    var userID;
    var userBirthday;
    var userPsd;
    var checkPassword;
    var userPhone;
	
    // 在键盘按下并释放及提交后验证提交表单
  	$("#inputDiv").validate({
    	rules: {
	      inputName: "required",
	      gender: "required",
	      inputID: {
	      	required: true,
	      	isIdCardNo: true
	      },
	      inputBirthday: "required",
	      inputPassword: {
	        required: true,
	        minlength: 5
	      },
	      checkPassword: {
	        required: true,
	        minlength: 5,
	        equalTo: "#inputPassword"
	      },
	      inputPhone: {
	        required: true,
	        isMobile: true
	      },
	      contract: {
	      	atCheck: true
	      }
	    },
	    messages: {
	      inputName: "请输入姓名",
	      inputName: "请选择性别",
	      inputPassword: {
	        required: "请输入密码",
	        minlength: "密码长度不能小于5位"
	      },
	       checkPassword: {
	        required: "请输入密码",
	        minlength: "密码长度不能小于5位",
	        equalTo: "两次密码不一致!"
	      }
	    }
	});

	//日期选择
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
	
	//注册
	$('#registerBtn').click(function(e){
		e.preventDefault();
		userName = $("#inputName").val();
		userGender = $("#gender").val();
		userID = $("#inputID").val();
		userBirthday = $("#inputBirthday").val();
		userPsd = $("#inputPassword").val();
		checkPassword = $("#checkPassword").val();
		userPhone = $("#inputPhone").val();
        
		//此处需要修改地址/////////////////////////////////////////////////////////////
        if(userPsd != checkPassword){
			alert("两次输入密码不一致请重试！");
		}else if($("#contract").attr('checked')==false){
			alert("未同意《预约协议》不能注册！");///////////////////////有问题！！！
		}else{
			$('#cfmName').html(userName);
			$('#cfmSex').html(userGender);
			$('#cfmID').html(userID);
			$('#cfmBirth').html(userBirthday);
			$('#cfmPhone').html(userPhone);
			$('#process').attr('class','process2');
			$('#confirmInfo').attr('class','label1 text-center active');
			$('#inputDiv').css('display','none');
			$('#confirmDiv').css('display','block');
		}
    });
	
	//返回修改
	$('#cfmBack').click(function(e){
		e.preventDefault();
		$('#process').attr('class','process1');
		$('#confirmInfo').attr('class','label1 text-center');
		$('#inputDiv').css('display','block');
		$('#confirmDiv').css('display','none');
	});
	
	//确认注册信息
	$('#cfmBtn').click(function(e){
		e.preventDefault();
		$('#process').attr('class','process3');
		$('#regsiterOK').attr('class','label1 text-right active');
		$('#inputDiv').css('display','none');
		$('#confirmDiv').css('display','none');
		$('#okDiv').css('display','block');
		var jsonUser = {userName:userName, userGender:userGender, userID:userID, userBirthday:userBirthday, userPsd:userPsd, userPhone:userPhone};  
		var strUser = JSON.stringify(jsonUser); 
		//此处需要修改地址/////////////////////////////////////////////////////////
		$.post("user/register.action", {json: strUser}, callback, "json");
	});


	// 手机号码验证
	jQuery.validator.addMethod("isMobile", function(value, element) {    
      var length = value.length;    
      return this.optional(element) || (length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value));    
    }, "手机号码格式错误");
	 // 身份证号码验证
    jQuery.validator.addMethod("isIdCardNo", function(value, element) { 
      return this.optional(element) || isIdCardNo(value);    
    }, "身份证号码格式错误"); 
    //复选框验证
    jQuery.validator.addMethod("atCheck", function(value, element) { 
      return this.optional(element) || $(this).attr('checked');    
    }, "请先阅读并选中"); 

	

});

function refer(){  
	location = "index.html"; 
}

function callback(json){
    alert(json.msg);    //显示反馈信息
    if(json.suc == 1){    //如果返回"登录成功"
        window.location.href = "admin/index.action";
		setInterval("refer()",5000);
    }else{
		alert("登录失败！");
	}
}
//身份证号码的验证规则
function isIdCardNo(num){ 
    var len = num.length, re; 
    if (len == 15) 
    re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{2})(\w)$/); 
    else if (len == 18) 
   	re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/); 
    else {
         return false;
    } 
    var a = num.match(re); 
    if (a != null) 
    { 
	    if (len==15) 
	    { 
	    var D = new Date("19"+a[3]+"/"+a[4]+"/"+a[5]); 
	    var B = D.getYear()==a[3]&&(D.getMonth()+1)==a[4]&&D.getDate()==a[5]; 
	    }else{ 
	    var D = new Date(a[3]+"/"+a[4]+"/"+a[5]); 
	    var B = D.getFullYear()==a[3]&&(D.getMonth()+1)==a[4]&&D.getDate()==a[5]; 
	    } 
	    if (!B) {
	        return false;
	    } 
    } 
    if(!re.test(num)){
        return false;
    }
    return true; 
}