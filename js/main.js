var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = window.innerWidth;
var height = window.innerHeight;

// canvas.width = width - 2.01;
// canvas.height = height - 2.01;
// canvas 右邊和下方會超出範圍造成捲軸出現
// 但我完全想不到這個2是怎樣出來的 (而且上方左方沒有--線索不夠阿@@

canvas.width = 0.5 * width ;
canvas.height = 0.5 * height;

// function to generate random number
function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}


// ball
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var ballRed = random(0,255);
var ballGreen = random(0,255);
var ballBlue = random(0,255);

// paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2

// keyboard controls
var rightPressed = false;
var leftPressed = false;

// bricks
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0 };
    }
}
  // array的每個元素裡有array array裡的每個元素是一個{數組} 或者其實算是物件?  雖然看過好多次這種了
  // 但還是似懂非懂 感覺這種2d-array很常見 尤其是讀到machine learning時還常常有n維的矩陣

// functions
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = `rgba(${ballRed},${ballGreen},${ballBlue},0.85)`;
    ctx.fill();
    ctx.closePath();
}


function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD"
	ctx.fill();
	ctx.closePath();
}


function drawBricks() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
			var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
			bricks[c][r].x = brickX;
			bricks[c][r].y = brickY;
			ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
		}

	}
}




function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection();
    if(x + dx > canvas.width-ballRadius || x + dx < 0) {
    	dx = -dx;

		ballRed = random(0,255);
		ballGreen = random(0,255);
		ballBlue = random(0,255);
	}

	if(y + dy > canvas.height-ballRadius || y + dy < 0) {
	    dy = -dy;

		ballRed = random(0,255);
		ballGreen = random(0,255);
		ballBlue = random(0,255);
	}

  // 第5篇教學的內容 會alert好幾次  難道是載入時間太長? 總之先關掉 
//     if(y + dy < ballRadius) {
//         dy = -dy;
//         ballRed = random(0,255);
//         ballGreen = random(0,255);
//         ballBlue = random(0,255);
//     } else if(y + dy > canvas.height-ballRadius) {
//         if(x > paddleX && x < paddleX + paddleWidth) {
//             dy = -dy;
//         } else {
//             // alert("GAME OVER");
//             document.location.reload();
// ​
//             // setInterval(()=>{console.log('GAME OVER')}, 1);
//         }
//     }



    x += dx;
    y += dy;


    if(rightPressed && paddleX < canvas.width-paddleWidth) {
    	paddleX += 7;
	} else if(leftPressed && paddleX > 0) {
    	paddleX -= 7;
	}


}



document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = true;
	} else if(e.keyCode == 37) {
		leftPressed = true;
	}
}

function keyUpHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = false;
	} else if(e.keyCode=37){
		leftPressed = false;
	}
}


function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                dy = -dy;
            }
        }
    }
}



setInterval(draw, 10);


