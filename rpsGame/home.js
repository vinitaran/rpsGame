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

//challenge-4

var all_button= document.getElementsByTagName('button');
var copyColor=[];
for( let i=0; i<all_button.length;i++){
	copyColor.push(all_button[i].classList[1]);
}
console.log(all_button);
console.log(copyColor);

function change(color){
	if(color.value=='red'){
		buttonRed();
	}
	else if(color.value=='green'){
		buttonGreen();
	}
	else if(color.value=='reset'){
		buttonReset();
	}
	else if(color.value=='random'){
		random();
	}
}

function buttonRed(){
	for (let i=0;i<all_button.length;i++)
	{
		all_button[i].classList.remove([all_button[i].classList[1]]);
		all_button[i].classList.add('btn-danger');
	}
}
function buttonGreen(){
	for (let i=0;i<all_button.length;i++)
	{
		all_button[i].classList.remove([all_button[i].classList[1]]);
		all_button[i].classList.add('btn-success');
	}
}
function buttonReset(){
	for (let i=0;i<all_button.length;i++)
	{
		all_button[i].classList.remove([all_button[i].classList[1]]);
		all_button[i].classList.add(copyColor[i]);
	}
}

function random(){
	let choice=['btn-danger','btn-success','btn-primary','btn-warning'];
	
	for( let i=0;i<all_button.length;i++){
		var randomNumber = Math.floor(Math.random()*4);
		all_button[i].classList.remove([all_button[i].classList[1]]);
		console.log(choice[randomNumber]);
		all_button[i].classList.add(choice[randomNumber]);
	}
}

//challenge 5

let blackJackGame={
	'you':{'scoreSpan':'#your-score','div':'#your-box','score':0},
	'bot':{'scoreSpan':'#bot-score','div':'#bot-box','score':0},
	'cards':['2','3','4','5','6','7','8','9','10','K','Q','J','A'],
	'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'Q':10,'J':10,'A':[1,11]},
	'wins':0,
	'losses':0,
	'draws':0,
	'isStand':false,
	'turnOver':false
};

const YOU= blackJackGame['you']
const BOT= blackJackGame['bot']
const hitSound= new Audio('sounds/swish.m4a')
const winSound = new Audio('sounds/ka-ching.mp3')
const loseSound= new Audio('sounds/sad-sound.mp3')
const drawSound = new Audio('sounds/aww.mp3')


document.querySelector('#hit').addEventListener('click',blackjackHit);
document.querySelector('#deal').addEventListener('click',blackjackDeal);
document.querySelector('#stand').addEventListener('click',blackjackStand);

function blackjackHit(){
	if(blackJackGame['isStand']===false){
		let card= randomCard();
		showCard(card,YOU);
		updateScore(card,YOU);
		showScore(YOU);
	}
}

function sleep(ms){
	return new Promise(resolve => setTimeout(resolve,ms));
}

async function blackjackStand(){
	blackJackGame['isStand']=true;
	while(BOT['score']<16 && blackJackGame['isStand']===true){
		let card= randomCard();
		showCard(card,BOT);
		updateScore(card,BOT);
		showScore(BOT);	
		await sleep(1000);	
	}
	blackJackGame['turnOver']=true;
	showResult(computeWinner());
	updateTable();
}

function showCard(card,activePlayer){
	if(activePlayer['score']<=21){
		let cardImage= document.createElement('img');
		cardImage.src=`images/${card}.png`;
		cardImage.style.width = '100px';
		cardImage.style.height = '120px';
		cardImage.style.padding = "5px 20px 2px 3px";
		document.querySelector(activePlayer['div']).appendChild(cardImage);
		hitSound.play();
	}
}

function blackjackDeal(){
	if(blackJackGame['turnOver']===true){
		blackJackGame['isStand']=false;
		let yourImage = document.querySelector('#your-box').querySelectorAll('img');
		let botImage = document.querySelector('#bot-box').querySelectorAll('img');
		for(let i=0;i<yourImage.length;i++){
			yourImage[i].remove();
		}
		for(let i=0;i<botImage.length;i++){
			botImage[i].remove();
		}
		YOU['score']=0;
		BOT['score']=0;

		document.querySelector('#your-score').textContent=0;
		document.querySelector('#bot-score').textContent=0;
		document.querySelector('#your-score').style.color='white';
		document.querySelector('#bot-score').style.color='white';
		document.querySelector('#blackjack-result').textContent="Let's Play";
		document.querySelector('#blackjack-result').style.color='black';
		blackJackGame['turnOver']=true;
	}
}


function randomCard(){
	var randomNum=Math.floor(Math.random()*13);
	return (blackJackGame['cards'][randomNum]);
}

function updateScore(card,activePlayer){
	if(card==='A'){
		if(activePlayer['score']+blackJackGame['cardsMap'][card][1]<=21){
			activePlayer['score']+=blackJackGame['cardsMap'][card][1];
		}
		else{
			activePlayer['score']+=blackJackGame['cardsMap'][card][0];
		}
	}	
	else{
		activePlayer['score']+=blackJackGame['cardsMap'][card];
	}
}

function showScore(activePlayer){
	if(activePlayer['score']<=21){
		document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
	}
	else{
		document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
		document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
	}
}

function computeWinner(){
	let winner;

	if(YOU['score']<=21){
		if(YOU['score']>BOT['score'] || BOT['score']>21){
			winner = YOU;
			blackJackGame['wins']++
			console.log(blackJackGame['wins']);
		}
		else if(BOT['score']>YOU['score']){
			winner=BOT;
			console.log("lose");
			blackJackGame['losses']++;
		}
		else if(BOT['score']===YOU['score']){
			console.log("DRAW");
			blackJackGame['draws']++;
		}
	}
	else if (YOU['score']>21 && BOT['score']<=21){
		winner=BOT;
		console.log("lose");
		blackJackGame['losses']++;
		console.log(blackJackGame['losses']);
	}
	else if(YOU['score']>21 && BOT['score']>21){
		blackJackGame['draws']++;
		console.log(blackJackGame['draws']);
	}
	return winner;
}

function showResult(winner){
	let message,messageColor;
	if(winner===YOU){
		message="YOU WON!!";
		messageColor='green';
		winSound.play();
		document.querySelector('#wins').textContent = blackJackGame['wins'];
	} else if(winner===BOT){
		message="YOU LOST";
		messageColor='red';
		loseSound.play();
		document.querySelector('#losses').textContent = blackJackGame['losses'];
	} else{
		message="DRAW";
		messageColor='black';
		drawSound.play();
		document.querySelector('#draws').textContent = blackJackGame['draws'];
	}

	document.querySelector("#blackjack-result").textContent = message;
	document.querySelector("#blackjack-result").style.color = messageColor;
}
