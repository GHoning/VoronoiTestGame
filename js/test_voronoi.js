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

  draw(ctx, from_x, to_x, color) {
    ctx.beginPath();
    ctx.moveTo(from_x, this.getY(from_x));
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineTo(to_x, this.getY(to_x));
    ctx.stroke();
  }
}

function flipLine(line, point) {
  // M is the amount of y differences on 1 x.
  // 1 | new M   3  9
  // M | 1       4  12
  var mm = 1 / line.m;
  mm = mm * -1;

  //now to Calculate the required b
  // y = mm * x + bb;
  // bb = y - (mm * x)
  var bb = 0;
  bb = point.y - (mm * point.x);

  return new Line(mm, bb);
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

//to draw a line perpendicular to previous one we need a bit of algebra.
//How do I define this line in a function.
//It is always someting like this. sx + z = y;
var currentLine = getLine(points[0], points[1]);
currentLine.draw(ctx, points[0].x, points[1].x, "grey");

//draw a line perpendicular to the previous line. In the middle of the previous one.
//Calculate that.
var halfwayPoint = new Point(((points[1].x - points[0].x) / 2) + points[0].x , ((points[1].y - points[0].y) / 2) + points[0].y);
// halfwayPoint.draw(ctx);

//This is now the border.:)
var nextLine = flipLine(currentLine, halfwayPoint);
nextLine.draw(ctx, 0, canvas_width, "red");

//This all does some weird stuff when either of the differences between the points is zero. :P
