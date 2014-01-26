function loadMore(itr, onComplete) {
	if(itr === 0) {
        onComplete();
        return;
    }

    console.log("loading more");
	moreBtn = $("a._5pc7")[0];
	if(moreBtn == undefined) {
        console.log("button lost, analysing");
		onComplete();
		return;
	}

	moreBtn.click();

	setTimeout(function() {
		loadMore(--itr, onComplete);
	}, 1000);
}
function strip_html(html) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}
function strip_punctuation(text) {
    text = text.replace(/['-\-]/g, "");
    return text.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~\?()]/g," "); 
}
function generate_wordlist(statuses) {
    var common_words = ["am", "aint","part", "are", "arent", "is", "isnt", "was", "wasnt", "were", "werent", "be", "been", "do", "dont", "does", "doesnt", "did", "didnt", "done", "have", "havent", "has", "hasnt", "had", "will", "wont", "would", "wouldnt", "shall", "should", "shouldnt", "can", "cant", "could", "couldnt", "must", "mustnt","may","might",    "i", "im", "ive", "my", "me", "mine", "myself", "you", "youre", "youve", "your", "yours", "yourself", "he", "hes", "his", "him", "himself",  "she", "shes", "her", "hers", "herself", "it", "its", "itself", "we", "weve", "us", "ours", "ourself", "they", "theyre", "theyve", "their", "them", "themself",    "this", "that", "thats", "these", "those","which","whose","whom","why","how","who","there","when","where","here",    "totally","all","now","then","other","another","many","much","more","most","any","none","never","something","somethings","anything","anythings","nothing","nothings","while","same",    "com","www","http","https",    "the","a","an",    "and","but","though","or","as","if","so","also","because","thus","since","no","not","too",    "of","in","to","for","with","on","during","at","from","by","about","up","down","out","inside","outside","into","back","through","after","before","over","between",    "say","says","said","says",    "go","went","gone","goes",    "get","got","gets",    "know","knew","known","knows",    "think","thought","thinks",    "see","saw","seen","sees","seem",    "take","took","taken","takes",    "come","came","comes",    "like","liked","likes",    "want","wanted","wants", "look","looked","looks", "use","used","uses",    "find","found","finds",    "give","gave","given","gives",    "tell","told","tells",    "call","called","calls",    "try","tries","tried",    "ask","asks","asked",    "need","needs","needed",    "feel","feels","felt",    "become","becomes","became",    "leave","leaves","left",    "mean","means",    "put","puts",    "let","lets",    "person","people",    "just",    "way",    "new",    "thing","things",    "well","very","even","back","good",    "still",    "last",    "next",    "really",    "great",    "again"];
    var words = {};
    var words_a = [];
    for (var msg in statuses) {
        var a = statuses[msg].split(/\s+/g);
        for (var word in a) {
            if (common_words.indexOf(a[word]) == -1 && a[word].length > 1
                    && a.indexOf(a[word]) == word ) {
                if (words[a[word]]) {
                    words[a[word]]+=1;
                }
                else {
                    words[a[word]]=1;
                }
            }
        }
    }
    console.log(words);
    for (var word in words) {
        if (words[word] > 1) {
            words_a.push([word, words[word]]);
        }
    }
    words_a.sort(function(a, b) {return b[1]-a[1]});
    return words_a;
}
function show_category(category) {
    $('._5jmm._5pat._5uch').hide();
    $('.mbs._5pbx.userContent').each(function() {
        text = $(this).html();
        text = strip_html(text);
        text = strip_punctuation(text);
        text = text.toLowerCase();
        text = text.split(/\s+/g);
        if (text.indexOf(category) != -1) {
            $(this).parents('._5jmm._5pat._5uch').show();
        }
    });
}
function main() {
	loadMore(10, function() {
		var messages = $(".mbs._5pbx.userContent");
        var containers = messages.parents("._5jmm._5pat._5uch");
        var plain_messages = []
        messages.each(function() {
            var text = $(this).html();
            text = strip_html(text);
            text = strip_punctuation(text);
            text = text.toLowerCase();
            plain_messages.push(text);
        });
		console.log(messages.length);
        words = generate_wordlist(plain_messages);
        console.log(words);
        $('.mbm.pbs').first().before("<div class='uiHeader uiHeaderTopBorder mbm pbs uiSideHeader'>"+
            "<div class='clearfix uiHeaderTop localhead'>"+
            "<div><h6 class='uiHeaderTitle'>Trending Locally</h6></div></div>");
        $('.mbm.pbs').first().after("<div class='_5my7'><ul class='_5my7'></ul></div>");
        for (var i in words) {
            $('ul._5my7').first().append("<li class='_5uhn _5my2 shibboleth' data-word='"+words[i][0]+"'><a class='_5cl5 _5v0t' href='#'></a><div class='clearfix _5v0u'>"+
                "<img class='_5r-z _8o lfloat img' alt='' src='https://fbstatic-a.akamaihd.net/rsrc.php/v2/y4/r/-PAXP-deijE.gif'>"+
                "<div class='_42ef'><div class='_5r--'>"+
                "<span class='_5v0s'>"+words[i][0]+"</span>"+
                "</div></div></div></li>");
        }
        $('.shibboleth').css('margin-left', 0);
        $('.shibboleth').mouseenter(function() {
            $('.shibboleth').addClass('selected');
        });
        $('.shibboleth').mouseleave(function() {
            $('.shibboleth').removeClass('selected');
        });
        $('.shibboleth').click(function(){
            console.log("this:", $(this).attr('data-word'));
            show_category($(this).attr('data-word'));
        });
    });
}

$(function() {
	main();
});
