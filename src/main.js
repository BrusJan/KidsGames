class Circle {
  maxRadius = 150;
  currentRadius = 0;
  changeDelta = 1;
  isDestroyed = false;
  constructor(cvWidth, cvHeight) {
    this.x = Math.random()*cvWidth;
    this.y = Math.random()*cvHeight;
  }

  draw(ctx) {
    var circle = new Path2D();
    circle.arc(this.x, this.y, this.currentRadius, 0, 2 * Math.PI);
    ctx.fill(circle);
  }

  update() {
    if (this.currentRadius > this.maxRadius) this.isDestroyed = true;
    else this.currentRadius = this.currentRadius + this.changeDelta;
  }
}
/*
class CirclesManager {
  circles = new Array();

  updateCircles() {
    circles.forEach(c => {
      c.update();
    });
  }
}*/

(() => {
  var cv = document.getElementById("canvas");
  var ctx = cv.getContext("2d");
  var circles = new Array();
  var currentWidth = window.innerWidth;
  var currentHeight = window.innerHeight;
  ctx.canvas.width = currentWidth;
  ctx.canvas.height = currentHeight;
  window.addEventListener("resize", () => {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    currentWidth = window.innerWidth;
    currentHeight = window.innerHeight;
  });
  cv.addEventListener("mouseup", handleMouseUp)
  var intervalId = window.setInterval(function(){
    circles.push(new Circle(currentWidth, currentHeight));
  }, 900);
  redrawCanvas();
  console.info(ctx);

  function redrawCanvas() {
    ctx.clearRect(0,0,cv.width,cv.height);
    circles.forEach((c) => {
      c.update();
      c.draw(ctx);
    });
    circles = circles.filter(c => !c.isDestroyed);
    requestAnimationFrame(redrawCanvas);
  }

  function handleMouseUp(e) {
    //console.info('click: ' + e.clientX + '-' + e.clientY);
    circles = circles.filter(c => (Math.abs(e.clientX-c.x)*Math.abs(e.clientX-c.x) + Math.abs(e.clientY-c.y)*Math.abs(e.clientY-c.y)
    > c.currentRadius*c.currentRadius))
  }
})();
