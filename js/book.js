$(document).ready(function(){
	//获取本地存储的医院和科室//bookHospital、bookOffice、bookTime、userName
	if(localStorage.getItem('bookHospital') && localStorage.getItem('bookOffice')){
		$('#bookHsptName').html(localStorage.getItem('bookHospital'));
		$('#bookOffcName').html(localStorage.getItem('bookOffice'));
	}
	

	$.getJSON("data/book.json",function(data){
		$('#Hpic').attr('src', data.pic);
		$('#Hlink').attr('href', 'hospital.html?Hid=' + data.hosID);
        $('#Hname').html(data.hosName);
        $('#rank').html(data.rank);
		$('#btime').append('&nbsp;&nbsp;&nbsp;放号时间：' + data.btime);
		$('#phone').append('&nbsp;&nbsp;&nbsp;' + data.phone);
		$('#address').append('&nbsp;&nbsp;&nbsp;地址：' + data.address);
		for(var i = 0; i < data.period.length; i++){
			numOfBook(data.period[i].name, data.period[i].num);
		}
		for(var i = 0; i < data.rule.length; i++){
			$('#rules').append('<p>' + data.rule[i] + '</p>');
		}
	});
	
	$.getJSON("data/ad.json",function(data){
		for(i = 0; i < 4; i++){
			$('#ads').append('<p><a href="hospital.html?Hid=' + data[i].hosID + '">' + data[i].hosName + '</a></p>');
		}
	});
});

function numOfBook(id, num){
	var strNode = '#' + id;
	if(num == 0){
		$(strNode).attr('class', 'full');
        $(strNode).html('约满');
	}else{
		$(strNode).html('<button type="button" class="btn btn-link" id="btn' + id 
			+ '" onclick="bookTimeClick(\'' + id + '\',' + num +')">预约<br/>剩余：' + num + '</button>');
	}
}

function bookTimeClick(id, num){
	var str = '您确定预约' + localStorage.getItem("bookHospital") + '·' + localStorage.getItem("bookOffice")
			+ '·' + cutDay(id) + '吗？';
	if(localStorage.getItem("userName")){
		if(confirm(str)){
			alert('恭喜您预约成功，请按时就医!');
			$('#'+id).html('<button type="button" class="btn btn-link" id="btn' + id + '">预约<br/>剩余：' + (num-1) + '</button>');
		}
	}else{
		alert("请先登录！");
		location = "register.html";
	}
}

function cutDay(str){
	var dayStr = str.substring(0,3);
	var halfdayStr = str.substring(3,4);
	var returnStr = '';
	if(dayStr=='Mon'){
		returnStr = '星期一';
	}
	if(dayStr=='Tue'){
		returnStr = '星期二';
	}
	if(dayStr=='Wsd'){
		returnStr = '星期三';
	}
	if(dayStr=='Thr'){
		returnStr = '星期四';
	}
	if(dayStr=='Fri'){
		returnStr = '星期五';
	}
	if(dayStr=='Sat'){
		returnStr = '星期六';
	}
	if(dayStr=='Sun'){
		returnStr = '星期日';
	}
	if(halfdayStr=='1'){
		returnStr += '上午';
	}
	if(halfdayStr=='2'){
		returnStr += '下午';
	}
	return returnStr;
}



