// A point class used to draw points on the canvas.
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 6, 0, 2 * Math.PI, true);
    ctx.fill();
  }
}

//The line defined as a function.
class Line {
  //what are the things we are looking for.
  // 500 + (x * 5) = y
  // y = mx + b;

  constructor(m, b) {
    this.m = m;
    this.b = b;
  }

  getY(x) {
    return (this.m * x) + this.b;
  }

  getX(y) {
    return (y -this.b) / this.m;
  }

  //get the crossing point if available.
  getCrossOver() {

  }

}

function getLine(p1, p2) {
  // The m is the change per step.
  // Divide the differences.
  var difX = p1.x - p2.x;
  var difY = p1.y - p2.y;
  var m = difY / difX;

  var tempLine = new Line(m, 0);
  var b = p1.y - tempLine.getY(p1.x);

  return new Line(m, b);
}


// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var canvas_width = 960;
var canvas_height = 640;

canvas.width = canvas_width;
canvas.height = canvas_height;
document.body.appendChild(canvas);

var points = [new Point(150, 150), new Point(300, 450)];

for (var point in points) {
  points[point].draw(ctx);
}

//draw the line.
// ctx.beginPath();
// ctx.moveTo(points[0].x, points[0].y);
// ctx.strokeStyle = 'blue';
// ctx.lineWidth = 3;
// ctx.lineTo(points[1].x, points[1].y);
// ctx.stroke();

//TODO work on a way to find the middle of this base line.

//to draw a line perpendicular to previous one we need a bit of algebra.
//How do I define this line in a function.
//It is always someting like this. sx + z = y;
var currentLine = getLine(points[0], points[1]);

ctx.beginPath();
ctx.moveTo(0, currentLine.getY(0));
ctx.strokeStyle = 'red';
ctx.lineWidth = 3;
ctx.lineTo(600, currentLine.getY(600));
ctx.stroke();

//draw a line perpendicular to the previous line. In the middle of the previous one.
//Calculate that.
var halfwayPoint = new Point(((points[1].x - points[0].x) / 2) + points[0].x , ((points[1].y - points[0].y) / 2) + points[0].y);
halfwayPoint.draw(ctx);


//The ratio is filped. Instead of moving y per 1x. Make it x per 1y.
var nextLine = new Line(currentLine.m * -1 , currentLine.b * -1);

ctx.beginPath();
ctx.moveTo(0, nextLine.getY(0));
ctx.strokeStyle = 'blue';
ctx.lineWidth = 3;
ctx.lineTo(600, nextLine.getY(600));
ctx.stroke();
