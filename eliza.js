var keywords = {};
	var quit = ["Goodbye.", 
				"Come see me anytime."];
	var inquiry = ["Tell me more.",
					"Can you elaborate on that?",
					"Oh, I see.",
					"And how does that make you feel?",
					"That sounds interesting.",
					"What does that make you feel?",
					"Why?",
					"What else?",
					"What about it?"
					];
	var feelings = ["Do you enjoy feeling {0}?",
					"What is it like to feel {0}?",
					"Why are you feeling {0}?",
					"What else do you feel?",
					"Tell me more about feeling {0}.",
					"Why are you feeling {0}?"
					];
	var you = ["I'm more interested in you.",
				"Tell me more about yourself instead.",
				"I'm here for you.",
				"I'm not that important here.",
				"Let's talk more about yourself.",
				"Tell me more about yourself."];
	var question = ["What do you think the answer is?",
					"I'll be asking the questions here.",
					"What is the answer?",
					"I can't answer that.",
					"Find the answer yourself.",
					"Think about your question carefully.",
					"Why do you ask that?"];
	var want = ["Why do you want {0}?",
				"What would you do with {0}?",
				"Would having {0} make you happy?"];
	var my = ["Your {0}?",
			"When your {0}, how does that make you feel?"];
	var hello = ["Hello.",
				"What would you like to talk about today?",
				"How are you feeling?",
				"Tell me about yourself."];
populateKeywords();

var http = require('http');
var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

app.post('/eliza/doctor', function(req,res) {
	var msg = req.body;
	console.log(req.body);
	var response = {};
	response.eliza = getResponse(msg.toLowerCase())
	res.send(response);
});
 
http.createServer(app).listen(app.get('port'), function(){
  console.log('Eliza listening on port ' + app.get('port'));
});

// find response
function getResponse(msg){
	var responses = findMatch(msg);
	var random = Math.floor((Math.random() * responses.length));
	return responses[random];
}

function findMatch(msg){
	for (k in keywords){
		if (msg.match(k)){
			return keywords[k];
		}
	}
}

function populateKeywords() {
	keywords["goodbye"] = quit;
	keywords["bye"] = quit;
	keywords["see you (.*)"] = quit;
	keywords["i feel (.*)"] = feelings;
	keywords["i've been feeling (.*)"] = feelings;
	keywords["i felt (.*)"] = feelings;
	keywords["you (.*)"] = you;
	keywords["(.*)\\?"] = question;
	keywords["i want (.*)"] = want;
	keywords["i wanted (.*)"] = want;
	keywords["i wish (.*)"] = want;
	keywords["i wished (.*)"] = want;
	keywords["my (.*)"] = my;
	keywords["^hi"] = hello;
	keywords["^hello"] = hello;
	keywords["(.*)"] = inquiry;
}