//generates accordion on page load
$(document).ready(function() {
	//adds accordion effect to resume page
	$("#accordion").accordion({
		//allows for collapsible headers and window size is matched to contained content
		collapsible: true, 
		heightStyle: "content"
	});
	
});//end ready
