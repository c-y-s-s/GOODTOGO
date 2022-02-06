function doFirst() {
  let canvas = document.getElementById("wave");
  let ctx = canvas.getContext("2d");

  //Grid start
  for (let i = 0; i < 1000; i++) {
    //horizontal
    let interval = i * 50;
    ctx.moveTo(0, interval);
    ctx.lineTo(canvas.width, interval);
    ctx.fillText(interval, 0, interval);

    //vertical
    ctx.moveTo(interval, 0);
    ctx.lineTo(interval, canvas.height);
    ctx.fillText(interval, interval, 10);
  }

  ctx.strokeStyle = "rgba(0,0,0,.2)";
  ctx.stroke();
  //Grid ends

  //wave1 starts
}
window.addEventListener("load", doFirst);
