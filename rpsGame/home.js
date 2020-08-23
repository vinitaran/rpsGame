function ageInDays(){
	var year=prompt("What year where you born?");
	var days=(2020-year)*365;
	var h1= document.createElement('h1');
	var textAns = document.createTextNode('You are ' + days + ' days old');
	h1.setAttribute('id','days');
	h1.appendChild(textAns);
	document.getElementById('result').appendChild(h1);
}

function reset(){
	document.getElementById('days').remove();
}

function deanGen(){
	var image=document.createElement('img');
	var div=document.getElementById('flex-dean-gen');
	image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
	div.appendChild(image);
}

function rpsGame(yourChoice){
	var humanChoice,botChoice;
	humanChoice = yourChoice.id;
	botChoice = numToChoice(randomChoice());
	result = decideWinner(humanChoice,botChoice); 
	message = finalMsg(result);
	rpsFrontEnd(yourChoice.id,botChoice,message);
}

function randomChoice(){
	return Math.floor(Math.random()*3);
}

function numToChoice(number){
	return ['rock','paper','scissor'][number];	
}

function decideWinner(humanChoice,botChoice){
	var rpsDatabase={
		'rock': {'scissor': 1, 'paper' : 0, 'rock' : 0.5},
		'paper': {'scissor': 0, 'paper' : 0.5, 'rock' : 1},
		'scissor' : {'scissor': 0.5, 'paper' : 1, 'rock' : 0}
	}
	var humanScore = rpsDatabase[humanChoice][botChoice];
	var botScore = rpsDatabase[botChoice][humanChoice];
	return [humanScore,botScore];
}

function finalMsg([humanScore,botScore]){
	if(humanScore==0){
		return {'message': "You Lost",'color':'red' };
	}else if(humanScore==0.5){
		return {'message': "It's a tie",'color':'yellow' };
	}else{
		return {'message': "You Win",'color':'green' };
	}
}

function rpsFrontEnd(yourChoice,botChoice,message){
	var imageDatabase={
		'rock':document.getElementById('rock').src,
		'paper':document.getElementById('paper').src,
		'scissor':document.getElementById('scissor').src
	}

	//remove all elements from div
	document.getElementById('rock').remove();
	document.getElementById('paper').remove();
	document.getElementById('scissor').remove();

	//create new elements

	var humanDiv = document.createElement('div');
	var botDiv = document.createElement('div');
	var messageDiv = document.createElement('div');

	//display result
	humanDiv.innerHTML="<img src='" + imageDatabase[yourChoice] + " ' style='box-shadow: 10px 20px 34px rgb(62, 62, 197);'>";
	botDiv.innerHTML="<img src='" + imageDatabase[botChoice] + "' style='box-shadow: 10px 20px 34px rgb(247, 88, 88);'>";
	messageDiv.innerHTML="<h1 style='color:"+ message['color'] +"'>" + message['message'] + "</h1>";
	document.getElementById('flex-box-rps').appendChild(humanDiv);
	document.getElementById('flex-box-rps').appendChild(messageDiv);
	document.getElementById('flex-box-rps').appendChild(botDiv);

}


