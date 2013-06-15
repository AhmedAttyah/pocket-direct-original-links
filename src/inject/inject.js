$(document).ready(function () {
	
	correct_image = chrome.extension.getURL("src/images/correct.png");
	scriptContent = $('script:nth-child(24)').text();
	formCheck = scriptContent.match(/'([0-9a-zA-Z]*)'/i)[1];

	all_links = $('li a.link');
	for (link=0; link<all_links.length; link++) {
		var current_link= all_links[link];
		articleId= current_link.href.match(/\d+/i);
		if(articleId === null) {
			continue;
		}
		getData(articleId[0],current_link);
	};


	function getData(articleID, link){
		this.data =  {itemId: articleID, formCheck: formCheck}
		$.ajax(
		{  
			type		: "POST",
			url			: '/a/x/' + "getArticle" + '.php', 
			data 		: this.data,  
			dataType	: this.dataType,
			async:   true,
			success		: function( response, textStatus, jqXHR ) 		{
			  $(link).attr("href",response.article.resolvedUrl) ;
			  $(link).find(".title").append("<img class='title' height='30px' width='30px' src='"+ correct_image +"' />");}
		});
}});


