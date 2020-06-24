

	function showHideLeftPane()
	{
		if(isGameControlsHidden==true)
		{
			$("div").hide();
			isGameControlsHidden=false;
		}
		
		else
		{
			$("div").show();
			isGameControlsHidden=true;
		}
	}