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
    var common_words = ["is","are","an","were","totally","im","ive","was","com","www","the","be","http","https","and","of","a","in","to","have","to","it","i","that","for","you","he","with","on","do","say","this","they","at","but","we","his","from","that","not","n't","n't","by","she","or","as","what","go","their","can","who","get","if","would","her","all","my","about","know","will","as","up","one","time","there","so","think","when","which","them","some","me","people","take","out","into","just","see","him","your","come","could","now","than","like","other","how","then","its","our","two","more","these","want","way","look","first","also","new","because","day","more","use","no","man","find","here","thing","give","many","well","only","those","tell","one","very","her","even","back","any","good","through","us","there","down","may","after","should","call","over","still","try","in","as","last","ask","need","too","feel","three","when","never","become","between","high","really","something","most","another","much","own","out","leave","put","while","mean","on","keep","why","let","great","same","watch","big","seem","where","every","might","about","place","over","such","again","few"]
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
    $('.mbs._5pbx.userContent.').each(function() {
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
var categorized_stories = {};
var containers;
function main() {
	loadMore(10, function() {
		var messages = $(".mbs._5pbx.userContent");
        containers = messages.parents("._5jmm._5pat._5uch");
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
        for (var j in words) {
            categorized_stories[words[j][0]] = $('#THISSELECTORISEMPTY');
        }
        console.log(words);
        for (var i=0; i<containers.length; ++i) {
            var a = plain_messages[i].split(/\s+/g);
            for (var j in words) {
                if (a.indexOf(words[j][0]) != -1) {
                    console.log(words[j][0]);
                    console.log(categorized_stories[words[j][0]]);
                    console.log(a);
                    categorized_stories[words[j][0]] = categorized_stories[words[j][0]].add(containers[i]);  
                }
            }
            //console.log(categorized_stories);
            //console.log(containers);
        }
        console.log(categorized_stories);
        for (key in categorized_stories) {
            $('ul.uiSideNav').first().append("<li class='sideNavItem stat_elem shibboleth'>"+key+"</li>");
        }
        $('.shibboleth').click(function(){
            console.log("this:", this.innerHTML);
            show_category(this.innerHTML);
        });
    });
}

$(function() {
	main();
});
