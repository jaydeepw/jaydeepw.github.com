
function playShellFireSound()
{
	var shellFired = document.getElementById('ShellFire');
	
	if(isFireReleased==true)
	{
		shellFired.play();
		isFireReleased=false;
	}
}

function playShellNObjectCollisionSound()
{
	var collision = document.getElementById('ShellNObjectCollision');
	collision.play();
}

//called from tanks.html
function playGameBGMusicLoop()
{
	var bgmusic = document.getElementById('BackgroundMusicLoop');
	bgmusic.play();
}


//called from Main.html
	function playGameIntroMusicLoop()
{
	var IntroMusic = document.getElementById('IntroMusicLoop');
	IntroMusic.play();
}