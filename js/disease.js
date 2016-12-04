$(document).ready(function(){
	$.getJSON("data/dis_off.json",function(data){
        $("#disease").empty();
		var strHtml = '';
		for(i = 0; i < data.length; i++){  
            strHtml = '<div class="aOffice">'
					     + '<div class="office">' + data[i].name + '</div>'
						     + '<div class="diseases">';
			for(j = 0; j < data[i].diseases.length; j++){ 
				strHtml +=       '<a href="adisease.html?officeID=' + data[i].ID + 'diseaseID=' + data[i].diseases[j].Did + '">'
						            + data[i].diseases[j].Dname
						       + '</a>';
			}
			strHtml +=     '</div>'
			           +'</div>';
			$("#disease").append(strHtml);	
		}
	});
});
