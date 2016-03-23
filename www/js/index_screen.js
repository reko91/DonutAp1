
//to check every function is running
var screenBool = true,
	initBool = true,
	updateBool = true,
	drawBool = true;

function consoleLogOnce(whichFunction){
	
	var boolCheck = whichFunction;
	
	switch(boolCheck) {
    case "screen":
		if (screenBool) {
			////console.log("screenBool");
			screenBool = false;
		}         
        break;
	
    case "init":
		if (initBool) {
			////console.log("initBool");
		initBool = false;
		}        
        break;
	
	case "update":
		if (updateBool) {
			////console.log("updateBool");
		updateBool = false;
		}         
        break;
	
	case "draw":
		if (drawBool) {
			////console.log("drawBool");
		drawBool = false;
		}         
        break;
	
    default:
         ////console.log("RANDOM");
		 break;
}
	
}

function startAnim(){
	var loop = function() {
		update();
		draw();
		if(!paused){
		window.requestAnimationFrame(loop, canvas);
		}
	};
	window.requestAnimationFrame(loop, canvas);
}

function screen() { //make screen
	 
	
	init(); // initiate game objects
    
	// game loop function
	if(!startGameBool){
		startAnim();
		//togglePause();
	}
	paused = true;
	
}

function init() { //initialize
  
  //consoleLogOnce("init");
  arcStart = 0;
  arcEnd = arcStart + arcWidth;
  gameVar.scoreVar.score = 0;
  
  gameVar.update();
  
  donutArray.push(new donut(donutAttr.centerX, donutAttr.centerY,  donutAttr.innerRadius ,  donutAttr.outerRadius, donutAttr.tickStart, donutAttr.tickEnd, donutAttr.tickSpeed,  donutAttr.goalStart, donutAttr.goalWidth, '#E0F7FF', '#005470'));
////console.log(donutArray)
  
}

var movement =[0,0];
var moveContainer = false;

function update() { //update
  //update players, enemies, obstacles
  for(var i=0;i<donutArray.length;i++){
	  donutArray[i].draw();
	   donutArray[i].update();
  }
  //consoleLogOnce("update");
  
  if(donutArray.length > 1){
	 // moveToNewDonut();
  }
  
  if(moveContainer){ 
	  ctx.clearRect(0, 0, canvas.width, canvas.height); 
	  if(donutArray.length > 2){
		  donutArray.splice(0,1)
		  selectedIndex--;
	  }
	  for(i=0;i<donutArray.length;i++){
		  
		  donutArray[i].x += movement[0]
		  donutArray[i].y += movement[1]
		  if(i<donutArray.length-1){
			  donutArray[i].tickSpeed = 0;
		  }
		  
	  }
	  moveContainer = false;
  }
  
  ////console.log(insideGoal)	
  var thisDonut = donutArray[selectedIndex];
  if (thisDonut.tickStart > thisDonut.goalStart  && thisDonut.tickEnd < thisDonut.goalEnd) {
		insideGoal = true;
		
	}
	
	if(insideGoal == true ){
////console.log(thisDonut)	
////console.log(donutArray)		
			if(thisDonut.tickStart > thisDonut.goalEnd  || thisDonut.tickEnd < thisDonut.goalStart){
				////console.log('clockwise')

				paused = true;
				insideGoal=false;
				gameVar.health--;
				gameVar.update();
				healthLoss = true;
				
				if(gameVar.health<=0){
					insideGoal=false;
					gameVar.health = 0;
					//console.log('gameOver');
					//togglePause();
					paused = true;
					gameOver();
				}
				 
		 
			}
			
		}   
	
}

function draw() { //draw
	
	//consoleLogOnce("draw");
	
	//ctx.save();
	
	//ctx.restore();
	}


//screen();
