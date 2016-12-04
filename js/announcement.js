var numOfAnnc; //公告总数
var numOfThese; //本次加载的公告数(设置不超过20条公告即不超过4页)
var numOfPage; //总分页数
var numOfLoadedPage; //本次加载的公告分页数
var contentArray; //创建公告节点数组
var nowPage = 0; // 当前页码

$(document).ready(function(){
	//announcement.json的第一个对象中"allA"的值代表数据库中所有hospital的记录数,"theseA"的值代表这个json文件中的记录数
	$.getJSON("data/announcement.json",function(data){
        numOfAnnc = data[0].allA;
		numOfThese = data[0].theseA;
		numOfPage = Math.ceil(numOfAnnc/5);
		numOfLoadedPage = Math.ceil(numOfThese/5);
		contentArray = createContent(data, numOfThese);
		createPage(numOfAnnc, numOfLoadedPage, numOfPage); //创建分页
		
		$('#announces').empty();
		nowPage = 1;
		for(var i = 0; i < 5; i++){  
            $('#announces').append(contentArray[i]);
        }
	});
	
	$('#page a').click(function(e) {
        e.preventDefault(); //阻止a链接的跳转行为
    });
	
});
//创建分页
function createPage(numOfAnnc, numOfLoadedPage, numOfPage){
	//if(numOfAnnc < 20){//不超过4页
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

//创建公告节点数组
function createContent(data, numOfThese){
	var contentArray = new Array();
	for(var i = 1; i <= numOfThese; i++){
		var content = '';
		content += '<div class="col-md-9 col-sm-9 annc"><span class="glyphicon glyphicon-minus"></span>&nbsp;&nbsp;&nbsp;'
					+ '<a href="announce.html?ID=' + data[i].ID + '">' 
						+ data[i].title
					+ '</a>'
				 + '</div>'
				 + '<div class="col-md-3 hidden-sm hidden-xs">'
					+ data[i].time
				 + '</div>';
		contentArray.push(content);
	}
	return contentArray;
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
	$('#announces').empty();
	for(var n = startElement; n < endElement; n++){
        $('#announces').append(contentArray[n]);
	}
}
