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


// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var canvas_width = 960;
var canvas_height = 640;

canvas.width = canvas_width;
canvas.height = canvas_height;
document.body.appendChild(canvas);

// How to draw a line.
// ctx.beginPath();
// ctx.moveTo(0, 0);
// ctx.lineTo(300, 200);
// ctx.stroke();

var points = generate_points();

for (var point in points) {
  points[point].draw(ctx);
}


function generate_points () {
  //Create an arry of random points on the plane.
  var points = []

  for (i = 0; i < 5; i++) {
    //make the screen size a variable
    points.push(new Point(Math.floor(Math.random() * canvas_width + 1), Math.floor(Math.random() * canvas_height + 1)))
  }

  return points;
}
