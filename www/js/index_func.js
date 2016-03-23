////console.log('func');

 

var sizeCount = 5;

function changeSize() {
	//sizeCount++;
	//goalWidth = Math.PI / sizeCount;
	// ////console.log(goalWidth)
	thisGoalStart = getRandom();
	thisGoalEnd = thisGoalStart + goalWidth;
}
function changeBorder(id, howLong, colour){
	//console.log('changeBorder')
	//console.log(id)
	var thisOpacity = 0.25;
	var thisContainer = $('#'+id);
	console.log(thisContainer.css("border" ))
	thisContainer.css("background-color",colour);
	thisContainer.css("opacity",thisOpacity); 
	thisContainer.fadeTo(howLong, thisOpacity);
	thisContainer.fadeOut(howLong);
 
	//thisContainer.fadeOut(howLong);
}
function checkGoal() {
	////console.log('checkgoal')
	
		var thisDonut = donutArray[selectedIndex];
		//console.log(thisDonut)
		////console.log(thisDonut);
		if (thisDonut.tickStart > thisDonut.goalStart  && thisDonut.tickEnd < thisDonut.goalEnd) {
			arcDirection *= -1;
			makeNewDonut(thisDonut);
			gameVar.scoreVar.score++;
			gameVar.update();
			changeBorder('clickDivColour',50,'green')
			////console.log('inside1')
		} else {
				gameVar.health--;
				gameVar.update(); 
				changeBorder('clickDivColour',50,'red')
				if(gameVar.health<=0){
					gameVar.health = 0;
					//console.log('gameOver') 
					paused = true;
					gameOver();
				}
			
		}
	
	
	
}

function gameOver(){
	showHidePages(restartMenu,wholeGame, 500)
	//wholeGame.style.visibility = 'hidden';	 
	//restartMenu.style.display = 'initial';	
}

function goHome(){
	showHidePages(mainMenu,restartMenu,500)
	//wholeGame.style.visibility = 'hidden';	 
	//restartMenu.style.display = 'initial';	
}

function showHidePages(shownArray,hideArray, duration){
	// if(type === 'jquery'){
		// for(i=0;i<shownArray.length;i++){
			// shownArray[i].style.display = 'initial';	
			// //shownArray[i].style.visibility = 'visible';	
			// $('#'+shownArray[i].id).css('visibility','visible').hide().fadeIn(1000);
			
		// }
		
		// for(i=0;i<hideArray.length;i++){
			// //hideArray[i].style.display = 'none;';	
			// //hideArray[i].style.visibility = 'hidden';	
			// //console.log(hideArray[i].id)
			// $('#'+hideArray[i].id).css('visibility','visible').show().fadeOut(1000);
		// }
	// }
	$('#'+shownArray.id).css('visibility','visible').hide().fadeIn(duration);
	$('#'+hideArray.id).css('visibility','visible').show().fadeOut(duration);
	
}


 //var menu = document.getElementById('mainMenu');
	//menu.style.display = 'none';
	//$('#mainMenu').css('visibility','visible').show().fadeOut(1000);
	//var wholeGame = document.getElementById('wholeGame');
	//wholeGame.style.display = 'initial';
	//$('#wholeGame').css('visibility','visible').hide().fadeIn(1000);



var backgroundColour = 'white';

function donut(x,y,innerRadius, outerRadius,tickStart, tickWidth, tickSpeed, goalStart, goalWidth, colour, goalColour){
	
	this.x = x;
	this.y = y;
	this.innerRadius = innerRadius;
	this.outerRadius= outerRadius;
	this.tickStart = tickStart;
	this.tickWidth = tickWidth;
	this.tickEnd = tickStart + tickWidth;
	this.tickSpeed = tickSpeed;
	this.goalStart = goalStart;
	this.goalWidth = goalWidth;
	this.goalEnd = goalStart + goalWidth; 
	this.goalCenter = goalStart + goalWidth/2;
	this.mainColour = colour;
	this.goalColour = goalColour;
	this.centerOfGoal = goalStart+goalWidth/2 ;//((goalStart+goalWidth/2 * 180) /Math.PI) 
	
	this.draw = function(){
		//////console.log('draw')
			//container donut
			ctx.beginPath();
			ctx.fillStyle = this.mainColour;
			ctx.arc(this.x, this.y, outerRadius, 0, Math.PI * 2, false);
			ctx.fill();
			ctx.closePath();

			//goal
			ctx.beginPath();
			ctx.fillStyle = goalColour;
			ctx.moveTo(this.x, this.y);
			ctx.arc(this.x, this.y, outerRadius, this.goalStart, this.goalEnd, false);
			ctx.lineTo(this.x, this.y);
			ctx.fill();
			ctx.closePath();

			ctx.beginPath();

			//moving notch
			ctx.fillStyle = 'red';
			ctx.beginPath();
			ctx.moveTo(this.x, this.y);
			ctx.arc(this.x, this.y, outerRadius, this.tickStart, this.tickEnd, false);
			ctx.lineTo(this.x, this.y);
			ctx.fill();
			ctx.closePath();

			//middle
			ctx.beginPath();
			ctx.fillStyle = backgroundColour;
			ctx.arc(this.x, this.y, innerRadius, 0, Math.PI * 2, true);
			ctx.fill();
			ctx.closePath();
	}
	
	this.update = function(){
		this.x = this.x;
		  if (this.tickStart > Math.PI * 2) {
			this.tickStart = 0;
		  } else if (this.tickStart < 0) {
			this.tickStart = Math.PI * 2
		  }
		this.tickStart += (this.tickSpeed * donutAttr.tickDirection);
		this.tickEnd = this.tickStart + this.tickWidth;
		
		
	}
	
	
	
	
}




function makeNewDonut(thisDonut){
	insideGoal=false;
	speedDivide-=10;
	if(speedDivide<80){
		speedDivide = 80;
	}
	
	////console.log('MAKE NEW DONUT') ;
	var thisX = thisDonut.x + thisDonut.outerRadius*2 * Math.cos(thisDonut.centerOfGoal),
	thisY = thisDonut.y + thisDonut.outerRadius*2 * Math.sin(thisDonut.centerOfGoal),
	thisTickStart,
	thisMainColour, thisGoalColour;
	
	thisTickStart = donutArray[selectedIndex].tickStart+Math.PI;
	if(thisTickStart > Math.PI*2){
		thisTickStart = thisTickStart-Math.PI*2;
	} 
	thisTickEnd = thisTickStart + donutAttr.tickWidth;
	thisGoalStart = getRandom(thisTickStart, thisTickEnd)
	thisTickSpeed = donutAttr.tickSpeed;// Math.PI/speedDivide;
	
	if(thisDonut.mainColour == '#E0F7FF'){ thisMainColour = '#005470';} else { thisMainColour = '#E0F7FF'}
	if(thisDonut.goalColour == '#E0F7FF'){ thisGoalColour = '#005470';} else { thisGoalColour = '#E0F7FF'}
	
	donutAttr.tickDirection *= -1;
	var newDonut = new donut(thisX, thisY,  donutAttr.innerRadius ,  donutAttr.outerRadius, thisTickStart, donutAttr.tickWidth, thisTickSpeed,  thisGoalStart, donutAttr.goalWidth, thisMainColour, thisGoalColour)
	donutArray.push(newDonut);
    ////console.log(donutArray)
   // moveToNewDonut(donutArray.length-1);
    selectedIndex++;
    movement[0] = donutAttr.centerX-thisX;
    movement[1] = donutAttr.centerY-thisY;
    moveContainer = true;
}

var movementSpeed = 500;

 
 
 


function togglePause(){
	paused = !paused; 
	if(paused == false){
		startAnim();
	}
}


function logDonuts(){
	////console.log(donutArray);
	donutAttr.centerX += 200;
	donutAttr.centerY += 200;
	////console.log(donutAttr)
}


function startGame(){
	showHidePages(wholeGame,mainMenu,1000)
	healthLoss = false
	gameVar.scoreVar.score = 0;
	gameVar.health = 2;
	gameVar.update();
	
	
	 startGameBool=false;
	 
	//console.log(startGameBool)
    //var menu = document.getElementById('mainMenu');
	//menu.style.display = 'none';
	//$('#mainMenu').css('visibility','visible').show().fadeOut(1000);
	//var wholeGame = document.getElementById('wholeGame');
	//wholeGame.style.display = 'initial';
	//$('#wholeGame').css('visibility','visible').hide().fadeIn(1000);
	if(!startGameBool){
		//console.log(paused)
		ctx.clearRect(0, 0, canvas.width, canvas.height); 
		donutArray = [];
		selectedIndex = 0;
		donutAttr = origDonutAttr;
		screen();
		
	}	else {
		 //togglePause();
	}
	
	 
	
	
}

var space = false;

function clickScreen(){
	console.log('clicked')
	//console.log(paused)
		if(startGameBool){
			if(healthLoss){
				healthLoss = false;
				togglePause();
			} else {
				space = true;
				//console.log('space')
				checkGoal();
				if(paused==true){
					togglePause();
				}
			}
		} else {
			//console.log('game started')
			togglePause();
			startGameBool=true;
		}
}

$(function() {
  $(document).keyup(function(evt) {
    if (evt.keyCode == 32) {
      space = false;
    }
  }).keydown(function(evt) {
    if (evt.keyCode == 32) {
		
      clickScreen();
    }
  });
});