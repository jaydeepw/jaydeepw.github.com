function BotTanksAI(BotTankN)
 {
	BotTankN.RandomizeInterval=BotTankN.RandomizeInterval+1;
	if(BotTankN.RandomizeInterval==100)				// Randomizing the Tank move after every second.
	{
		BotTankN.RandomizeMove=Math.round(Math.random()*4);	
		BotTankN.RandomizeInterval=0;
		}
	
	if(BotTankN.RandomizeMove==1 && BotTankN.x_coord<(CANVAS_WIDTH-RIGHT_CLEARANCE))		//making Right move and checking right boundry
	{	
		BotTankN.isMoving="Right";
		BotTankN.src='../images/RightTank.jpg';
		BotTankN.x_coord=BotTankN.x_coord+1;
		ctx.drawImage(BotTankN,BotTankN.x_coord,BotTankN.y_coord);
	}
	
	else
	if(BotTankN.RandomizeMove==2 && BotTankN.x_coord>LEFT_CLEARANCE)						//making Left move and checking left boundry
	{
		BotTankN.isMoving="Left";
		BotTankN.src='../images/LeftTank.jpg';
		BotTankN.x_coord=BotTankN.x_coord-1;
		ctx.drawImage(BotTankN,BotTankN.x_coord,BotTankN.y_coord);
	}
	
	else
	if(BotTankN.RandomizeMove==3 && BotTankN.y_coord>UPPER_CLEARANCE)					//making Upward move and checking upper boundry
	{	
		BotTankN.isMoving="Up";
		BotTankN.src='../images/UpTank.jpg';
		BotTankN.y_coord=BotTankN.y_coord-1;
		ctx.drawImage(BotTankN,BotTankN.x_coord,BotTankN.y_coord);
	}
	
	else
	if(BotTankN.RandomizeMove==4 && BotTankN.y_coord<LOWER_CLEARANCE)					//making Downward move and checking down boundry
	{				
		BotTankN.isMoving="Down";
		BotTankN.src='../images/DownTank.jpg';
		BotTankN.y_coord=BotTankN.y_coord+1;
		ctx.drawImage(BotTankN,BotTankN.x_coord,BotTankN.y_coord);
	}		
	
	else
	{
		ctx.drawImage(BotTankN,BotTankN.x_coord,BotTankN.y_coord);						//stay IDLE and make no move
	}
 }