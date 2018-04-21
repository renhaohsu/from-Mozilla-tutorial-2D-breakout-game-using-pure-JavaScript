var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = window.innerWidth;
var height = window.innerHeight;

canvas.width = width - 2.01;
canvas.height = height - 2.01;
// 完全想不到這個2是怎樣出來的 (而且上方左方沒有--線索不夠阿@@

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}


  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0,0,width,height);

// 練習 用rect在beginPath()到closePath()畫正方形
  ctx.beginPath();  
  ctx.rect(120, 140, 150, 150);  // 定義一個矩形(左距,上距,寬,高)單位px
  ctx.fillStyle = '#FF0000';  // fillStyle屬性所儲存的顏色會被fill()方法用來塗滿
  ctx.fill();
  ctx.closePath();

// 練習 用arc在beginPath()到closePath()畫圓形
ctx.beginPath();
ctx.arc(340, 250, 20, 0, Math.PI*2, false);
  // (圓心x、y,半徑,圓弧開始、結束的角度(從開始到結束的角度, 以弧度表示), 繪製的方向(false代表順時針方向, 預設或true為逆時針方向)並非必要)
ctx.fillStyle = "green";  // 一樣可以用16進位、顏色關鍵字、rgba()函式等方法指定
ctx.fill();
ctx.closePath();

// 藍色邊框的空心矩形 stroke() 專門為外輪廓線上色
ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
ctx.stroke();
ctx.closePath();


function draw() {
  ctx.beginPath();
  ctx.arc(50, 50, i, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();

  i ++
  console.log(i)
}


setInterval(draw, 10);