

	var	debugCtx;
	var HIT="NO FIRE";

function drawDebugCanvas()
{	
	var debuggingCanvas = document.getElementById('debuggingCanvas');
		debugCtx = debuggingCanvas.getContext('2d');

		debugCtx.fillStyle="black";
		debugCtx.fillRect(0,0,300,500);
}

function detectHostileShellCollision(ObjectN,BotTankN)			//checks the collision of Object2 with the BotTankN-Shell
{	
	if(ObjectN.isAlive && BotTankN.isShellAlive)
	{
		if((BotTankN.Shell_x_coord < (ObjectN.x_coord+ObjectN.width+2)) && BotTankN.Shell_x_coord > (ObjectN.x_coord-4))//hard-coded values define clearance of AreaOfInfluence of BotTanks
		{
			if( (BotTankN.Shell_y_coord < (ObjectN.y_coord+ObjectN.height+2)) && BotTankN.Shell_y_coord>(ObjectN.y_coord-4))		//Collision occured GameOver
			{	
				//triggering the Explosion effect display
				Explosion.x_coord=ObjectN.x_coord;			//getting the co-ordinates of the exploding Object
				Explosion.y_coord=ObjectN.y_coord;
				Explosion.PersistanceTime=EXPLOSION_TIMEOUT;				//setting Explosion effect timeout
							
				playShellNObjectCollisionSound();
				ObjectN.isAlive=false;
				BotTankN.isShellAlive=false;				
				
				if(ObjectN.id=="PlayerTank")				//if Shell hits Player, its GAME-OVER
				{
					alert("GAME OVER. Press OK to restart the Game");
					window.location="tanks.html";
				}
			}
		}
	}
	
	//displaying Explosion untill it times-out
	if(Explosion.PersistanceTime!=0)
	{
		ctx.drawImage(Explosion,Explosion.x_coord,Explosion.y_coord);
		Explosion.PersistanceTime=Explosion.PersistanceTime-1;
	}
}



function detectCollision(Object2)			//checks the collision of Object2 with the Player-Tank-Shell
{		
	if(PlayerTankShell.isAlive && Object2.isAlive)
	{
		if((ShellTravelX_coord < (Object2.x_coord+Object2.width+2)) && ShellTravelX_coord > (Object2.x_coord-5))//hard-coded values define clearance of AreaOfInfluence of BotTanks
		{
			if( ShellTravelY_coord<(Object2.y_coord+Object2.height+2) && ShellTravelY_coord>(Object2.y_coord-5))		//Collision occured
			{
				
				//triggering the Explosion effect display
				Explosion.x_coord=Object2.x_coord;			//getting the co-ordinates of the exploding Object
				Explosion.y_coord=Object2.y_coord;
				Explosion.PersistanceTime=EXPLOSION_TIMEOUT;				//setting Explosion effect timeout			
								
				playShellNObjectCollisionSound();
				Object2.isAlive=false;
				PlayerTankShell.isAlive=false;
				ShellLock=null;
			}
		}
	}
	
	//displaying Explosion untill it times-out
	if(Explosion.PersistanceTime!=0)
	{
		ctx.drawImage(Explosion,Explosion.x_coord,Explosion.y_coord);
		Explosion.PersistanceTime=Explosion.PersistanceTime-1;
	}		
}