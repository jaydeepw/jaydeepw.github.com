function fireBotShell(BotTankN)
{
		if(BotTankN.isMoving=="Right" && BotTankN.ShellLock==null)
		{
			BotTankN.ShellLock="Right";
			BotTankN.isShellAlive=true;	
			BotTankN.Shell_x_coord=	BotTankN.x_coord;
			BotTankN.Shell_y_coord=	BotTankN.y_coord;
		}
		
		if(BotTankN.isMoving=="Left" && BotTankN.ShellLock==null)
		{
			BotTankN.ShellLock="Left";
			BotTankN.isShellAlive=true;
			BotTankN.Shell_x_coord=	BotTankN.x_coord;
			BotTankN.Shell_y_coord=	BotTankN.y_coord;
		}
		
		if(BotTankN.isMoving=="Up" && BotTankN.ShellLock==null)
		{
			BotTankN.ShellLock="Up";
			BotTankN.isShellAlive=true;			
			BotTankN.Shell_x_coord=	BotTankN.x_coord;
			BotTankN.Shell_y_coord=	BotTankN.y_coord;
		}	
		
		if(BotTankN.isMoving=="Down" && BotTankN.ShellLock==null)
		{
			BotTankN.ShellLock="Down";
			BotTankN.isShellAlive=true;			
			BotTankN.Shell_x_coord=	BotTankN.x_coord;
			BotTankN.Shell_y_coord=	BotTankN.y_coord;
		}

	switch(BotTankN.ShellLock)
	{
		case "Right" :
						BotTankN.Shell_x_coord = BotTankN.Shell_x_coord + 2;			//increment Shell co-ordinates by 2 in each refresh
						
						if(BotTankN.isShellAlive==true)					//advance Shell only if it is alive
						ctx.drawImage(PlayerTankShell,BotTankN.Shell_x_coord+BotTankN.width,BotTankN.Shell_y_coord+(BotTankN.height/2));
						
						if(BotTankN.Shell_x_coord>(CANVAS_WIDTH-RIGHT_CLEARANCE) && BotTankN.isAlive)
						{
							BotTankN.Shell_x_coord = BotTankN.x_coord;
							BotTankN.ShellLock=null;
							BotTankN.isShellAlive=false;
						}
						
						break;
						
		case "Left" :	
						BotTankN.Shell_x_coord = BotTankN.Shell_x_coord - 2;			//increment Shell co-ordinates by 2 in each refresh
						
						if(BotTankN.isShellAlive==true)					//advance Shell only if it is alive
						ctx.drawImage(PlayerTankShell,BotTankN.Shell_x_coord,BotTankN.Shell_y_coord+(BotTankN.height/2));
						
						if(BotTankN.Shell_x_coord<LEFT_CLEARANCE)
						{
							BotTankN.Shell_x_coord = BotTankN.x_coord;
							BotTankN.ShellLock=null;
							BotTankN.isShellAlive=false;
						}
						
						break;
						
		case "Up" :
						BotTankN.Shell_y_coord = BotTankN.Shell_y_coord - 2;			//increment Shell co-ordinates by 2 in each refresh

						if(BotTankN.isShellAlive==true)					//advance Shell only if it is alive
						ctx.drawImage(PlayerTankShell,BotTankN.Shell_x_coord+(BotTankN.width/2),BotTankN.Shell_y_coord);
						
						if(BotTankN.Shell_y_coord<UPPER_CLEARANCE)
						{
							BotTankN.Shell_y_coord = BotTankN.y_coord;
							BotTankN.ShellLock=null;
							BotTankN.isShellAlive=false;
						}
												
						break;
						
		case "Down" :
						BotTankN.Shell_y_coord = BotTankN.Shell_y_coord + 2;			//increment Shell co-ordinates by 2 in each refresh
						
						if(BotTankN.isShellAlive==true)					//advance Shell only if it is alive
						ctx.drawImage(PlayerTankShell,BotTankN.Shell_x_coord+(BotTankN.width/2),BotTankN.Shell_y_coord+(BotTankN.height));
						
						if(BotTankN.Shell_y_coord>LOWER_CLEARANCE)
						{
							BotTankN.Shell_y_coord = BotTankN.y_coord;
							BotTankN.ShellLock=null;
							BotTankN.isShellAlive=false;
						}
													
						break;
		}
}