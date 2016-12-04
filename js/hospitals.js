var numOfHspt; //医院总数
var numOfThese; //本次加载的医院数(设置不超过20家医院即不超过4页)
var numOfPage; //总分页数
var numOfLoadedPage; //本次加载的医院分页数
var contentArray; //创建医院节点数组
var nowPage = 0; // 当前页码

$(document).ready(function(){
	//hospitals.json的第一个对象中"allH"的值代表数据库中所有hospital的记录数，"theseH"的值代表这个json文件中的记录数
	$.getJSON("data/hospitals.json",function(data){
        numOfHspt = data[0].allH; 
		numOfThese = data[0].theseH; 
		numOfPage = Math.ceil(numOfHspt/5); 
		numOfLoadedPage = Math.ceil(numOfThese/5); 
		contentArray = createContent(data, numOfThese); 
		createPage(numOfHspt, numOfLoadedPage, numOfPage); //创建分页
		
		$('#hospitals').empty();
		nowPage = 1;
		for(var i = 0; i < 5; i++){  
            $('#hospitals').append(contentArray[i]);
        }
	});
	
	$('#page a').click(function(e) {
        e.preventDefault(); //阻止a链接的跳转行为
    });
	
});
//创建分页 pageClick(i), pageUp(), pageDown()
function createPage(numOfHspt, numOfLoadedPage, numOfPage){
	//if(numOfHspt < 20){//不超过4页
		for(var i = 1; i <= numOfLoadedPage; i++){
			$('#page').append('<li><a onclick="pageClick(' + i + ')">' + i + '</a></li>');
		}
		$('#page').append('<li><a onclick="pageDown()" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>');
	//}else{
	//	$('#page').append('<li><a href="#">2</a></li>');
	//	$('#page').append('<li><a href="#">...</a></li>');
	//	$('#page').append('<li><a href="#">' + (numOfPage-1) + '</a></li>');
	//	$('#page').append('<li><a href="#">' + numOfPage + '</a></li>');
	//	$('#page').append('<li><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>');
	//}
}

//创建医院节点数组
function createContent(data, numOfThese){
	var contentArray = new Array();
	for(var i = 1; i <= numOfThese; i++){
		var content = '';
		content += '<div class="row hospital">'
					 + '<div class="col-md-3 col-md-offset-1"><img src="' + data[i].pic + '" /></div>'
						+ '<div class="col-md-5">'
							+ '<a href="hospital.html?ID=' + data[i].ID + '">'
								+ '<h4>' + data[i].name + '<small class="text-warning">&nbsp;&nbsp;&nbsp;' + data[i].rank + '</small></h4>'
							+ '</a>'
							+ '<p class="text-muted"><span class="glyphicon glyphicon-time" aria-hidden="true"></span>&nbsp;&nbsp;&nbsp;' + data[i].btime + '</p>'
							+ '<p class="text-muted"><span class="glyphicon glyphicon-earphone" aria-hidden="true"></span>&nbsp;&nbsp;&nbsp;' + data[i].phone + '</p>'
							+ '<p class="text-muted"><span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>&nbsp;&nbsp;&nbsp;' + data[i].address + '</p>'
						+ '</div>'
					+ '<div class="col-md-2">'
						+ '<button type="button" class="btn btn-warning navbar-btn" id="book' + data[i].ID + '" onclick="bookClick(\'' + data[i].name + '\',' + data[i].ID + ')"><span class="glyphicon glyphicon-plus"></span>&nbsp;&nbsp;立刻预约</button>'
					+ '</div>'//////////////////////////////////////////////////////////////////////////////////////////////////////注意此处转义字符
				+ '</div>';
		contentArray.push(content);
	}
	return contentArray;
}

//点击医院"立即预约"按钮
function bookClick(name, id){
	localStorage.setItem('bookHospital',name);
	if(localStorage.getItem('bookOffice')){//如果医院和科室都选择了就跳转到最后的预约界面
		var str = '您已选择' + name + '·' + localStorage.getItem('bookOffice') + '，进行最后时间确认？';
		if(confirm(str)){
			location = 'book.html';
		}
	}else{//否则跳转到选择的科室的界面，继续选择科室
		var str = '您已选择' + name + ',转向选择科室？';
		if(confirm(str)){
			location = 'hospital.html?hospitalID=' + id + '&hospitalName=' + name;
		}
	}
}

//点击向上翻页
function pageUp(){
	if(nowPage==1){
		alert('没有更多页！');
	}else{
		nowPage--;
		pageClick(nowPage);
	}
}
//点击向下翻页
function pageDown(){
	if(nowPage==numOfLoadedPage){
		alert('没有更多页！');
	}else{
		nowPage++;
		pageClick(nowPage);
	}
}
//点击页码翻页
function pageClick(i){
	nowPage = i;
	var startElement = (i - 1) * 5;
	var endElement = startElement + 5;
	$('#hospitals').empty();
	for(var n = startElement; n < endElement; n++){
        $('#hospitals').append(contentArray[n]);
	}
}








