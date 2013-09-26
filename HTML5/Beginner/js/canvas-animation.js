
                var canvas;
                var ctx;
                var ballX=100, ballY=200;
                var radius=20;
                var xInc=10;
                var yInc=10;
                
                function startGame(){
                  canvas = document.getElementById("canvas");
                  ctx = canvas.getContext("2d");
                ctx.fillStyle = "#000000";
                setInterval(gameLoop,10);
                }
            
                function gameLoop(){
                  advanceBall();
                  clearCanvas();
                  drawBall();   
                }
               
                function advanceBall(){
                  window.document.title = ballX;
                   ballX+=xInc;
                   ballY+=yInc;
                   if((ballX+radius)>canvas.width){
                     xInc = (-1)*xInc;
                   }
                   if((ballX-radius)<0){
                     xInc = (-1)*xInc;
                   }
                   if((ballY+radius)>canvas.height){
                     yInc = (-1)*yInc;
                   }
                   if((ballY-radius)<0){
                     yInc = (-1)*yInc;
                   }
                }
                function clearCanvas(){
                   ctx.clearRect(0,0,canvas.width,canvas.height);
                }
                function drawBall(){
                   ctx.beginPath();
                   ctx.arc(ballX, ballY, radius, 0, Math.PI*2, true);
                   ctx.closePath();
                   ctx.fill();
                }