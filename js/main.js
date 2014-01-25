function loadPredictionAPI(onComplete) {
	gapi.client.setApiKey("AIzaSyAkCIbrL4raFaeRARBL2tzyTMdJEd2NcAA");
	gapi.client.load('prediction', 'v1.6', onComplete);
}

function main() {

}

loadPredictionAPI(main);