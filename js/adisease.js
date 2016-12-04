$(document).ready(function(){
var a;

	$.getJSON("data/adisease.json",function(data){
        $('#disName').html(data.name);
		$('#dis_img').attr('src', data.pic);
		$('#intro').empty();
		for(i = 0; i < data.intro.length; i++){
			$('#intro').append('<p>' + data.intro[i] + '</p>');
		}
		$('#medicare').empty();
		for(i = 0; i < data.intro.length; i++){
			$('#medicare').append('<p>' + data.medicare[i] + '</p>');
		}

		$('#book').bind('click', function(){
			localStorage.setItem("bookOffice",data.Office);
			if(localStorage.getItem("bookHospital")){//如果医院和科室都选择了就跳转到最后的预约界面
				var str = '您已选择' + localStorage.getItem("bookHospital") + '·' + data.Office + '·' + data.name + '，进行最后时间确认？';
				if(confirm(str)){
					location = 'book.html';
				}
			}else{//否则跳转到选择的医院的界面，继续选择医院
				var str = '您已选择' + data.Office + '·' + data.name + '，转向选择医院？';
				if(confirm(str)){
					location = 'hospitals.html';
				}
			}
		});

	});

		
	
});
