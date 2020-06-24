function fireShell()
{
		if(PlayerTankMoving=="Right" && ShellLock==null)
		{
			ShellLock="Right";
			ShellTravelX_coord=PlayerTank.x_coord;
			ShellTravelY_coord=PlayerTank.y_coord;
		}
		
		if(PlayerTankMoving=="Left" && ShellLock==null)
		{
			ShellLock="Left";
			ShellTravelX_coord=PlayerTank.x_coord;
			ShellTravelY_coord=PlayerTank.y_coord;
		}
		
		if(PlayerTankMoving=="Up" && ShellLock==null)
		{
			ShellLock="Up";
			ShellTravelX_coord=PlayerTank.x_coord;
			ShellTravelY_coord=PlayerTank.y_coord;
		}
		
		
		if(PlayerTankMoving=="Down" && ShellLock==null)
		{
			ShellLock="Down";
			ShellTravelX_coord=PlayerTank.x_coord;
			ShellTravelY_coord=PlayerTank.y_coord;
		}
		
	switch(ShellLock)
	{
		case "Right" :
						ShellTravelX_coord = ShellTravelX_coord + 2;			//increment Shell co-ordinates by 2 in each refresh
												
						ctx.drawImage(PlayerTankShell,ShellTravelX_coord+PlayerTank.width,ShellTravelY_coord+(PlayerTank.height/2));
						if(ShellTravelX_coord>(CANVAS_WIDTH-RIGHT_CLEARANCE) && PlayerTankShell.isAlive)
						{
							ShellTravelX_coord = PlayerTank.x_coord;
							ShellLock=null;
							PlayerTankShell.isAlive=false;								
						}
						
						break;
						
		case "Left" :
						ShellTravelX_coord = ShellTravelX_coord - 2;			//increment Shell co-ordinates by 2 in each refresh

						ctx.drawImage(PlayerTankShell,ShellTravelX_coord,ShellTravelY_coord+(PlayerTank.height/2));
						if(ShellTravelX_coord<LEFT_CLEARANCE)
						{
							ShellTravelX_coord = PlayerTank.x_coord;
							ShellLock=null;
							PlayerTankShell.isAlive=false;
						}
						
						break;
						
		case "Up" :
						ShellTravelY_coord = ShellTravelY_coord - 2;			//increment Shell co-ordinates by 2 in each refresh
						
						ctx.drawImage(PlayerTankShell,ShellTravelX_coord+(PlayerTank.width/2),ShellTravelY_coord);
						if(ShellTravelY_coord<UPPER_CLEARANCE)
						{
							ShellTravelY_coord = PlayerTank.y_coord;
							ShellLock=null;
							PlayerTankShell.isAlive=false;
						}
							
						break;
						
		case "Down" :
						ShellTravelY_coord = ShellTravelY_coord + 2;			//increment Shell co-ordinates by 2 in each refresh
						
						ctx.drawImage(PlayerTankShell,ShellTravelX_coord+(PlayerTank.width/2),ShellTravelY_coord+(PlayerTank.height));
						if(ShellTravelY_coord>LOWER_CLEARANCE)
						{
							ShellTravelY_coord = PlayerTank.y_coord;
							ShellLock=null;
							PlayerTankShell.isAlive=false;
						}
							
						break;
		}
}