function loadPredictionAPI(onComplete) {
	gapi.client.setApiKey("AIzaSyAkCIbrL4raFaeRARBL2tzyTMdJEd2NcAA");
	gapi.client.load('prediction', 'v1.6');
}

function loadMore(itr, onComplete) {
	if(itr === 0) onComplete();

	moreBtn = $("a._5pc7")[0];
	if(moreBtn == undefined) {
		onComplete();
		return;
	}

	moreBtn.click();

	setTimeout(function() {
		loadMore(--itr, onComplete);
	}, 2000);
}

function main() {
	loadMore(10, function() {
		var messages = $(".mbs._5pbx.userContent");
		var containers = messages.parents("._5jmm._5pat._5uch");

		console.log(messages.length);
	});
}

// loadPredictionAPI(main);
$(function() {
	main();
});