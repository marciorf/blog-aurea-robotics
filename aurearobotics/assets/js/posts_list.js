var getRecentPosts = function(amount, callback) {
	var rss = $("link[type='application/rss+xml']").attr("href");
	
	$.get(rss, function(data) {
		var recent = [];
		var parsed = $.parseXML(data);
		var posts  = $(data).find("item");
		
		if (amount) posts = posts.slice(0, amount); // Only display the first number of posts (defined by amount)
		
		for (var i = 0; posts && i < posts.length; i++) {
			var post = posts.eq(i);
			recent.push({
				title: 	 post.find("title").text(),
				content: post.find("description").text(),
				url: 	 post.find("link").text(),
				date: 	 post.find("pubDate").text()
			});
		}
		
		callback(recent); // Done collecting posts, process to callback
	});
};

var crop = function(str, words) {
    var cache = str.split(/\s+/, words);
    return cache.join(" ");
}

// Gets called on document ready
$(function() {
	var num_posts = 10;
	var num_words = 40;
	
	getRecentPosts(num_posts, function(posts) { // Display [x-null] posts!
		var template = "";
		for (var i = 0; i < posts.length; i++) {
			var post = posts[i];
			//var excerpt = crop($("<div/>").html(post.content).text(), num_words); // strip html and crop string!
			
		    template += "<li class='list-group-item'>" + 
                        "<span class='green-link'><a href='" + post.url + "'>" +
                        post.title + "</a></span></li>";
		}
        console.log(template);
		document.getElementById("recent-posts").innerHTML = template;
	});
});