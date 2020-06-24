document.onkeyup = getKeyStrokes;

function getKeyStrokes()
{
   var KeyID = event.keyCode;
   
	if(KeyID==17)		// checking for Ctrl keypress
	{
		isFireReleased=true;
		

		if(PlayerTankShell.isAlive==false)			// a Shell is launched only when earlier Shell has been distructed
		PlayerTankShell.isAlive=true;
	   }
		   
   
   switch(KeyID)
   {
	   
      case 16:
				PlayerTankMoving="Shift";
	     		  break; 

      case 38:
				PlayerTankMoving="Up";
		    	  break;

      case 37:
				PlayerTankMoving="Left";
		    	  break;

      case 39:
				PlayerTankMoving="Right";
		    	  break;
	  
      case 40:
				PlayerTankMoving="Down";
		    	  break;		     				  
   }
}