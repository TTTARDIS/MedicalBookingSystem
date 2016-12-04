$(document).ready(function(){
	if(localStorage.getItem('bookHsptName')){
		$('#bookHospital').html('已选择' + localStorage.getItem('bookHsptName') + '，请继续选择科室！');
	}
	//医院简介
	$.getJSON("data/hospital.json",function(data){
        $('#Hname1').html(data.name);
		$('#Hpic').attr('src',data.pic); 
		$('#Hname2').html(data.name);
		$('#rank').html(data.rank);
		$('#btime').append('&nbsp;&nbsp;&nbsp;' + data.btime);
		$('#rtime').append('&nbsp;&nbsp;&nbsp;' + data.rtime);
		$('#phone').append('&nbsp;&nbsp;&nbsp;' + data.phone);
		$('#address').append('&nbsp;&nbsp;&nbsp;' + data.address);
		$('#intro').html(data.intro);
		$('#rule').empty();
		$.each(data.rule,function(n,node){  
            $('#rule').append(node + '<br/>');
        });
		$('#officeIntro').html(data.office);
		
		//点击医院“立即预约”按钮
		$('#bookBtn').bind('click', function(){
			localStorage.setItem("bookHospital",data.name);
			alert('您已选择' + data.name + ',请继续选择科室！');
			$('#collapseOne').collapse('hide');
			$('#collapseTwo').collapse('show');
		});
	});
	
	//科室疾病
	$.getJSON("data/dis_off.json",function(data){
        $("#off_dis").empty();
        var strHtml = ''; 
		for(i = 0; i < data.length; i++){
            strHtml = '<tr>'
						+ '<td class="officeTbl"><p class="text-center">' + data[i].name + '</p>'
							+ '<p><button class="btn btn-warning" onclick="bookOfficeClick(\'' + data[i].name + '\',' + data[i].ID +')">预约</button></p></td>'
					    + '<td>';
			for(j = 0; j < data[i].diseases.length; j++){ 
				strHtml +=    '<a href="adisease.html?officeID=' + data[i].ID + '&diseaseID=' + data[i].diseases[j].Did + '">' + data[i].diseases[j].Dname + '</a>';
			}
			strHtml +=    '</td>'
					  + '</tr>';
			$("#off_dis").append(strHtml);	
		}
	});
	
	//医生
	$.getJSON("data/doctor.json",function(data){
        $("#doctors").empty();
        var strHtml = ''; 
		for(i = 0; i < data.length; i++){
            strHtml = '<div class="row" style="border-bottom:solid 1px #DCDCDC;">'
						+ '<div class="col-md-3 col-sm-4 col-xs-12"><img src="' + data[i].pic + '" /></div>'
						+ '<div class="col-md-9 col-sm-8 col-xs-12">'
							+ '<h4>' + data[i].name + '<small class="text-warning">&nbsp;&nbsp;&nbsp;' + data[i].title + ' ' + data[i].position + '</small></h4>'
							+ '<p>' + data[i].intro + '</p>'
					    + '</div>'
					+ '</div>';
			$("#doctors").append(strHtml);	
		}
	});

});

function bookOfficeClick(name, id){
	localStorage.setItem('bookOffice',name);
	//在这个界面选择科室相当于直接选择了医院,所以无论bookHsptName是不是为空都再设一次免得if-else
	localStorage.setItem('bookHospital',$('#Hname2').html());
	var str = '您已选择' + localStorage.getItem("bookHospital") + '·' + name + '，进行最后时间确认？';
	if(confirm(str)){
		location = 'book.html';
	}
}









