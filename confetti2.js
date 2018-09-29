// some sounds
tickSound = new Audio("tick.wav");
dingSound = new Audio("ding.wav");

// Initialize variables to store the dimensions of our border.
var windowSize = {
	x: 0,
	y: 0
}

var points = 0;
var confettis = 0;

function generateHexColor() {
	return "#" + (Math.random() * 0xFFFFFF << 0).toString(16);
}

function getMouse(event){
	return(event.clientX,event.clientY);
}

function newConfetti(posx,posy){
	// When the html body is clicked, it sends this function "clicked" and event information, instead of posx and posy.
	// See if it was a click, and if so, parse it into posx and posy.
	if(posx == "clicked"){
		posx = posy.clientX - 20;
		posy = posy.clientY - 20;
	}
	// Make the new confetti element, and keep track of it. 
	var newestConfetti = document.createElement("div");
	confettis++;
	var newestConfettiId = "confettiPiece"+confettis;
	// Append it to the body.
	document.body.appendChild(newestConfetti).id = newestConfettiId;
	// Set it up to use.
	newestConfetti = document.getElementById(newestConfettiId);
	newestConfetti.style = "left:"+ posx +"px;top:"+ posy +"px";
	newestConfetti.addEventListener("mouseover", function(){ animateConfetti(this); });  
}

function getAreaSize() {
	windowSize.x = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	windowSize.y = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	//document.getElementById("score").innerHTML = points;
	score.innerHTML = points;
}

function randomInt(min,max){
	return(Math.round(Math.random()*(max-min)+min));
}

function turnScoreBlue(){
	score.style.transition = "1.5s";
	score.style.color = "#4088BB";
}

function animateConfetti(pieceID){
	// Retrieve/parse the location of the left side of the confetti piece
	var pieceLeft = parseInt(pieceID.style.left);

	// Determine how where to move the piece in context of the horizontal axis. This should be changed, to more properly compensate for the diagonal of the confetti.
	var pieceMoveX = randomInt(-120,120);
	if (pieceMoveX + pieceLeft + 57 > windowSize.x || pieceMoveX + pieceLeft < 0) {
		pieceMoveX *= -1;
	}

    // play the tick sound
    tickSound.currentTime = 0;
    tickSound.play();
	
	// Apply the change.
	pieceID.style.left = pieceMoveX+pieceLeft + "px";

	// Same stuff again for the top side.
	var pieceTop = parseInt(pieceID.style.top);
	var pieceMoveY = randomInt(-120,120);
        if (pieceMoveY + pieceTop + 57 > windowSize.y || pieceMoveY + pieceTop < 0) {
                pieceMoveY *= -1;
        }
	pieceID.style.top = pieceMoveY+pieceTop + "px";

	// Change the confetti's color.
	pieceID.style.background = generateHexColor();
	// Rotate it.
	pieceID.style.transform = "rotate("+ randomInt(-180,180) +"deg)";
	// Change its shape.
	pieceID.style.borderRadius = randomInt(0,25)+"px";

	// Also, handle the score, even though this function is about animating. It's just the most convenient function to work in.
	points++;
	score.innerHTML = points;

	if(points % 100 == 0){
		score.style.transitionDuration = "0s";
		score.style.color = "white";
		//setTimeout(turnScoreBlue, 60)
		setTimeout(function(){
			score.style.transition = "2s";
			score.style.color = "#4088BB";
		}, 60)
		dingSound.currentTime = 0;
    		dingSound.play();
	}
}

window.onload = getAreaSize;
window.onresize = getAreaSize;
