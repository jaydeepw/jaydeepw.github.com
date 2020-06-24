	
	
/*************Game CONSTANTS*************/	
	var ctx;											// Canvas Context.
	var CANVAS_WIDTH=700, CANVAS_HEIGHT=500;				//Globla values of the Canvas Battle Field. Warning: DO NOT change / be cautious while changing.
	var RIGHT_CLEARANCE=42;								//this value comes from the size of the Tank image and red-line margin
	var LOWER_CLEARANCE=CANVAS_HEIGHT-42;					//this value comes from the size of the Tank image and red-line margin	
	var LEFT_CLEARANCE=10 , UPPER_CLEARANCE=10;
		
	var GAME_SPEED=9;									//GameSpeed set to as fast as 9 milliseconds.
	
	var EXPLOSION_TIMEOUT=300;							//time upto which the explosion effect persists on the screen


/*************PLAYER related Data*************/
	var PlayerTank= new Image();
	PlayerTank.id="PlayerTank";	
	PlayerTank.isAlive=true;
	PlayerTank.x_coord=350,PlayerTank.y_coord=250;
	
	var PlayerTankShell= new Image();
	PlayerTankShell.src="../images/Shell.jpg";
	PlayerTank.src='../images/PlayerTankRight.jpg';
	var ShellTravelX_coord , ShellTravelY_coord;
	var ShellLock=null;
	PlayerTankShell.isAlive=false;
	

	var PlayerTankMoving = "No Button Pressed";
	var PlayerTankMotionStopped;
	var isFireReleased = true;
	
	
/*************BOT related Data*************/
	var BotShell= new Image();
	BotShell.src="../images/Shell.jpg";
	BotShell.x_coord;
	BotShell.y_coord;
	BotShell.ShellLock=null;
	
	
	var BotTank1=new Image();
	BotTank1.RandomizeMove=0;		BotTank1.RandomizeInterval=0;
	BotTank1.id="tank1";			BotTank1.ShellLock=null;
	BotTank1.isAlive=true;			BotTank1.isMoving;
	BotTank1.x_coord=40;			BotTank1.Shell_x_coord;			BotTank1.isShellAlive=true;
	BotTank1.y_coord=40;			BotTank1.Shell_y_coord;
	
		
	var BotTank2=new Image();
	BotTank2.RandomizeMove=0;		BotTank2.RandomizeInterval=0;
	BotTank2.id="tank2";			BotTank2.ShellLock=null;
	BotTank2.isAlive=true;			BotTank2.isMoving;
	BotTank2.x_coord=40;			BotTank2.Shell_x_coord;			BotTank2.isShellAlive=true;
	BotTank2.y_coord=430;			BotTank2.Shell_y_coord;

	
	var BotTank3=new Image();
	BotTank3.RandomizeMove=0;		BotTank3.RandomizeInterval=0;
	BotTank3.id="tank3";			BotTank3.ShellLock=null;
	BotTank3.isAlive=true;			BotTank3.isMoving;
	BotTank3.x_coord=660;			BotTank3.Shell_x_coord;			BotTank3.isShellAlive=true;
	BotTank3.y_coord=430;			BotTank3.Shell_y_coord;

	
	var BotTank4=new Image();
	BotTank4.RandomizeMove=0;		BotTank4.RandomizeInterval=0;
	BotTank4.id="tank4";			BotTank4.ShellLock=null;
	BotTank4.isAlive=true;			BotTank4.isMoving;
	BotTank4.x_coord=660;			BotTank4.Shell_x_coord;			BotTank4.isShellAlive=true;
	BotTank4.y_coord=40;			BotTank4.Shell_y_coord;
	
	var BotTank5=new Image();
	BotTank5.RandomizeMove=0;		BotTank5.RandomizeInterval=0;
	BotTank5.id="tank5";			BotTank5.ShellLock=null;
	BotTank5.isAlive=true;			BotTank5.isMoving;
	BotTank5.x_coord=660;			BotTank5.Shell_x_coord;			BotTank5.isShellAlive=true;
	BotTank5.y_coord=430;			BotTank5.Shell_y_coord;		
	
	

/*************BattleField related Data*************/	
	var Box1= new Image();
	Box1.id="Box1";
	Box1.isAlive=true;
	Box1.x_coord=300;
	Box1.y_coord=250;
	
	var Box2= new Image();
	Box2.id="Box2";	
	Box2.isAlive=true;
	Box2.x_coord=125;
	Box2.y_coord=210;
	
	var Box3= new Image();
	Box3.id="Box3";	
	Box3.isAlive=true;
	Box3.x_coord=480;
	Box3.y_coord=458;
		
	var Box4= new Image();
	Box4.id="Box4";	
	Box4.isAlive=true;
	Box4.x_coord=512;
	Box4.y_coord=458;
		
	var Box5= new Image();
	Box5.id="Box5";	
	Box5.isAlive=true;
	Box5.x_coord=544;
	Box5.y_coord=458;
	
	var Box6= new Image();
	Box6.id="Box6";	
	Box6.isAlive=true;
	Box6.x_coord=125;
	Box6.y_coord=210;
	
/*************UNCLASSIFIED Data*************/

	var Explosion = new Image();
	Explosion.src="../images/Explosion.jpg";
	Explosion.PersistanceTime=0;		//Explosion effect timeout is initially set to 0
	Explosion.x_coord;
	Explosion.y_coord;
	

function initGame()
{	

/*	BotTank1.isAlive=false;
	BotTank2.isAlive=false;
	BotTank3.isAlive=false;
	BotTank4.isAlive=false;
	BotTank5.isAlive=false;*/
	
	var canvas=document.getElementById('myCanvas');

	if (canvas.getContext)
	{
	  	ctx = canvas.getContext('2d');
		ctx.fillStyle = "dimgray";
        ctx.fillRect (0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	} 
	else {
  		document.write('Canvas NOT supported');
	}
	
	/*Code to draw the Boundry of the BattleField*/
	ctx.save();
	ctx.strokeStyle = "#662222";
	ctx.strokeRect(10,10,CANVAS_WIDTH-20, CANVAS_HEIGHT-20);
	ctx.restore();
	
	Box1.src='../images/Box.jpg';
	if(Box1.isAlive==true)
	{
		ctx.drawImage(Box1,Box1.x_coord,Box1.y_coord);
	}
	
	Box2.src='../images/Box.jpg';
	if(Box2.isAlive==true)
	{
		ctx.drawImage(Box2,Box2.x_coord,Box2.y_coord);
	}
	
	Box3.src='../images/Box.jpg'; 								//drawing
	if(Box3.isAlive==true)			    						//a Box
	ctx.drawImage(Box3,Box3.x_coord,Box3.y_coord); 				//collection
	
	Box4.src='../images/Box.jpg';
	if(Box4.isAlive==true)	
	ctx.drawImage(Box4,Box4.x_coord,Box4.y_coord);
	
	Box5.src='../images/Box.jpg';
	if(Box5.isAlive==true)
	ctx.drawImage(Box5,Box5.x_coord,Box5.y_coord);
	

	if(PlayerTank.isAlive==true)
	startPlayerGame();	//Transfers control
	
	
	startBotGame();							//start the BOTGAME
}

function startPlayerGame()
{
//	document.getElementById('txt').value=ShellLock;
	ctx.drawImage(PlayerTank,PlayerTank.x_coord,PlayerTank.y_coord);

	if(PlayerTankMoving=="Right" && PlayerTank.x_coord<(CANVAS_WIDTH-RIGHT_CLEARANCE))		//movement in RIGHT direction
	{
		PlayerTank.src='../images/PlayerTankRight.jpg';
		PlayerTank.x_coord=PlayerTank.x_coord+1;
		ctx.drawImage(PlayerTank,PlayerTank.x_coord,PlayerTank.y_coord);
	}
	
	else
	if(PlayerTankMoving=="Left" && PlayerTank.x_coord>LEFT_CLEARANCE)						//movement in LEFT direction
	{
		PlayerTank.src='../images/PlayerTankLeft.jpg';
		PlayerTank.x_coord=PlayerTank.x_coord-1;
		ctx.drawImage(PlayerTank,PlayerTank.x_coord,PlayerTank.y_coord);
	}
	
	else
	if(PlayerTankMoving=="Up" && PlayerTank.y_coord>UPPER_CLEARANCE)						//movement in UPPER direction
	{
		PlayerTank.src='../images/PlayerTankUp.jpg';
		PlayerTank.y_coord=PlayerTank.y_coord-1;
		ctx.drawImage(PlayerTank,PlayerTank.x_coord,PlayerTank.y_coord);
	}
	
	else
	if(PlayerTankMoving=="Down" && PlayerTank.y_coord<LOWER_CLEARANCE)						//movement in DOWNWARD direction
	{
		PlayerTank.src='../images/PlayerTankDown.jpg';
		PlayerTank.y_coord=PlayerTank.y_coord+1;
		ctx.drawImage(PlayerTank,PlayerTank.x_coord,PlayerTank.y_coord);
	}
	
	else
	if(PlayerTankMoving=="Shift")															//halt the Tank on Shift press.
	{
		ctx.drawImage(PlayerTank,PlayerTank.x_coord,PlayerTank.y_coord);
		}
		
	if(PlayerTankShell.isAlive==true)					// making firing activity only to depend on Ctrl Button.
	{	
		fireShell();	
		playShellFireSound();
	}
}

function startBotGame()
{		
		detectCollision(BotTank1);
		detectCollision(BotTank2);
		detectCollision(BotTank3);
		detectCollision(BotTank4);
		detectCollision(BotTank5);	
			
		detectCollision(Box1);
		detectCollision(Box2);
		detectCollision(Box3);
		detectCollision(Box4);
		detectCollision(Box5);
		

		//debug code for Area of influence
/*		ctx.strokeRect(BotTank1.x_coord-2,BotTank1.y_coord-2,BotTank1.width+4,BotTank1.height+4);
		ctx.strokeRect(BotTank2.x_coord-2,BotTank2.y_coord-2,BotTank2.width+4,BotTank2.height+4);
		ctx.strokeRect(BotTank3.x_coord-2,BotTank3.y_coord-2,BotTank3.width+4,BotTank3.height+4);
		ctx.strokeRect(BotTank4.x_coord-2,BotTank4.y_coord-2,BotTank4.width+4,BotTank4.height+4);
		
		ctx.strokeRect(Box1.x_coord-2,Box1.y_coord-2,Box1.width+4,Box1.height+4);
		ctx.strokeRect(Box2.x_coord-2,Box2.y_coord-2,Box2.width+4,Box2.height+4);
		ctx.strokeRect(Box3.x_coord-2,Box3.y_coord-2,Box3.width+4,Box3.height+4);
		ctx.strokeRect(Box4.x_coord-2,Box4.y_coord-2,Box4.width+4,Box4.height+4);
		ctx.strokeRect(Box5.x_coord-2,Box5.y_coord-2,Box5.width+4,Box5.height+4);*/
	
		if(BotTank1.isAlive==true)
		{
			BotTanksAI(BotTank1);												//Transfers control
			fireBotShell(BotTank1);										//BotTank random fire logic
			
			detectHostileShellCollision(PlayerTank,BotTank1);
			detectHostileShellCollision(Box1,BotTank1);
			detectHostileShellCollision(Box2,BotTank1);
			detectHostileShellCollision(Box3,BotTank1);
			detectHostileShellCollision(Box4,BotTank1);
			detectHostileShellCollision(Box5,BotTank1);	
		}
		
	if(BotTank2.isAlive==true)
		{
			BotTanksAI(BotTank2);											//Transfers control
			fireBotShell(BotTank2);										//BotTank random fire logic
			
			detectHostileShellCollision(PlayerTank,BotTank2);			
			detectHostileShellCollision(Box1,BotTank2);
			detectHostileShellCollision(Box2,BotTank2);
			detectHostileShellCollision(Box3,BotTank2);
			detectHostileShellCollision(Box4,BotTank2);
			detectHostileShellCollision(Box5,BotTank2);
		}
		
			if(BotTank3.isAlive==true)
		{
			BotTanksAI(BotTank3);											//Transfers control
			fireBotShell(BotTank3);										//BotTank random fire logic
			
			detectHostileShellCollision(PlayerTank,BotTank3);
			detectHostileShellCollision(Box1,BotTank3);
			detectHostileShellCollision(Box2,BotTank3);
			detectHostileShellCollision(Box3,BotTank3);
			detectHostileShellCollision(Box4,BotTank3);
			detectHostileShellCollision(Box5,BotTank3);		
		}
		
		if(BotTank4.isAlive==true)
		{
			BotTanksAI(BotTank4);												//Transfers control
			fireBotShell(BotTank4);										//BotTank random fire logic
			
			detectHostileShellCollision(PlayerTank,BotTank4);
			detectHostileShellCollision(Box1,BotTank4);
			detectHostileShellCollision(Box2,BotTank4);
			detectHostileShellCollision(Box3,BotTank4);
			detectHostileShellCollision(Box4,BotTank4);
			detectHostileShellCollision(Box5,BotTank4);		
		}
		
		if(BotTank5.isAlive==true)
		{
			BotTanksAI(BotTank5);												//Transfers control
			fireBotShell(BotTank5);										//BotTank random fire logic

			detectHostileShellCollision(PlayerTank,BotTank5);
			detectHostileShellCollision(Box1,BotTank5);
			detectHostileShellCollision(Box2,BotTank5);
			detectHostileShellCollision(Box3,BotTank5);
			detectHostileShellCollision(Box4,BotTank5);
			detectHostileShellCollision(Box5,BotTank5);
		}
}


function doTimer()
{	
	setInterval(initGame,GAME_SPEED);		//calling initGame() after every GameSpeed milliseconds of Interval
	//intiGame();
}
