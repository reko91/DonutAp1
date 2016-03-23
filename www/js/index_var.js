



var windowDim = //dimensions for window
{
	width : $(window).width(),
	height : $(window).height()
};

window.requestAnimFrame = function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function( /* function */ callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
}();


var paused = false;
var screenDims = $(document);

var canvasWidth,
canvasHeight;

  var canvas = document.getElementById("myCanvas");
// if (screenDims.width() < screenDims.height()) {
	// canvasWidth = screenDims.width()// / 1.5
		// canvasHeight = screenDims.width()// / 1.5
// } else {
	// canvasWidth = screenDims.height()// / 1.5
		// canvasHeight = screenDims.height()// / 1.5
// }

var thisCount = 0;
var entryDiff = Math.PI / 6;

//set dimensions

$('body').width(windowDim.width).height(windowDim.height);

var headerContainer = document.getElementById('headerContainer');
headerContainer.style.width = '100%';
headerContainer.style.height = windowDim.height/6+'px';

var footerContainer = document.getElementById('footerContainer');
footerContainer.style.width = '100%';
footerContainer.style.height = windowDim.height/6+'px';

var mainMenu = document.getElementById('mainMenu');
//mainMenu.style.width = '100%';
//mainMenu.style.height = mainMenu.clientWidth +'px';

//console.log(mainMenu.style.width)

var thisTop =  document.getElementById('headerContainer').getBoundingClientRect().bottom;
var thisBottom = document.getElementById('footerContainer').getBoundingClientRect().top;
var canvasHeightCalc = thisBottom-thisTop;

var canvasDims = document.getElementById('gameContainer');
canvasDims.style.height = canvasHeightCalc + 'px';

canvasWidth = canvasDims.clientWidth;//screenDims.width()

//console.log(thisTop)
//console.log(thisBottom)
canvasHeight = canvasHeightCalc//canvasDims.clientWidth;//screenDims.height()

//console.log(canvasHeight)
canvas.setAttribute('height', canvasHeight);
canvas.setAttribute('width', canvasWidth);

//canvas.setAttribute('height', canvasWidth);
//canvas.setAttribute('width', canvasHeight);

var WIDTH = windowDim.width.//*0.9,
	HEIGHT = windowDim.height.//*0.9,
	canvas,
ctx = canvas.getContext("2d");

var mainArcContainerRadius = canvasHeight / 3;
var arcWidth = Math.PI / 10;
var arcStart = 0;
var arcEnd = arcStart + arcWidth;
var arcSpeed = Math.PI / 100;
var arcDirection = -1;
var goalWidth = Math.PI / 5;
var selectedIndex = 0;
var healthLoss = false;
var startGameBool = false;

var  mainMenu = document.getElementById('mainMenu');
var  wholeGame = document.getElementById('wholeGame');
var  restartMenu = document.getElementById('restartMenu');

//var thisGoalStart = getRandom();
//var thisGoalEnd = thisGoalStart + goalWidth;
var outerRadius;// = canvasHeight / 3;
if(canvasWidth > canvasHeight){
	outerRadius = canvasHeight/3;
} else {
	outerRadius = canvasWidth/3;
}
var speedDivide = 100; //bigger it is the slower
var tickWidthVar = Math.PI / 25;

var origDonutAttr = {
	tickStart : 0,
	tickWidth : tickWidthVar,
	tickEnd : 0+tickWidthVar,
	tickSpeed : Math.PI / speedDivide,
	goalStart : getRandom(0, Math.PI/10),
	goalWidth : Math.PI / 5,
	tickDirection : 1,
	outerRadius : outerRadius,
	innerRadius : outerRadius/ 1.5,
	centerX : canvasWidth / 2,
	centerY : canvasHeight / 2
	
}
var donutAttr = {
	tickStart : 0,
	tickWidth : tickWidthVar,
	tickEnd : 0+tickWidthVar,
	tickSpeed : Math.PI / speedDivide,
	goalStart : getRandom(0, Math.PI/10),
	goalWidth : Math.PI / 5,
	tickDirection : 1,
	outerRadius : outerRadius,
	innerRadius : outerRadius/ 1.5,
	centerX : canvasWidth / 2,
	centerY : canvasHeight / 2
	
}
var insideGoal = false;
var donutArray = [];

var gameVar = {
	scoreVar : {
		score : 0,
		scorePosX : 0,
		scorePosY : 0,
		highscorePosX : 0,
		highscorePosY : 0
	},
	health : 2,
	update : function () {
		$('#scoreDiv').text(this.scoreVar.score)
		$('#healthDiv').text('Lives : ' + this.health)
		
	},
	draw : function () {
		ctx.font = "30px Arial";
		ctx.fillStyle = "white";
		ctx.fillText("Score : " + this.scoreVar.score, this.scoreVar.scorePosX, this.scoreVar.scorePosY);
		ctx.fillText("Highscore : " + this.scoreVar.highscore, his.scoreVar.highscorePosX, this.scoreVar.highscorePosY);
	}

};


function getRandom(tickStart, tickEnd) {
	//////console.log(thisCount)
	//thisCount++;
   var thisTickStart = tickStart;
    var thisTickEnd = tickEnd;
	
	var thisNumber = Math.random() * (Math.PI * 2 - this.goalWidth);
	var thisHighest = thisTickEnd + entryDiff;//arcEnd + entryDiff;
	var thisLowest = thisTickStart - entryDiff;//arcStart - entryDiff;

	if (arcStart - entryDiff < 0) {
		thisLowest = Math.PI * 2 + (arcStart - entryDiff);
	}
	if (arcEnd + entryDiff > Math.PI * 2) {
		thisHighest = (arcEnd + entryDiff) - Math.PI * 2;
	}

	if (thisHighest < thisLowest) {
		if (thisNumber > thisLowest || thisNumber < thisHighest) {
			return getRandom(thisTickStart,thisTickEnd);
		} else {
			return thisNumber;
		}
	} else if (thisNumber > thisLowest && thisNumber < thisHighest) {
		return getRandom(thisTickStart,thisTickEnd);
	} else {
		return thisNumber;
	}
}

