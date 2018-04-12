// A point class used to draw points on the canvas.
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx, color) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 6, 0, 2 * Math.PI, true);
    ctx.fillStyle = color;
    ctx.fill();
  }
}

// Line drawable.
class Line {
  constructor(start_point, end_point) {
    this.start_point = start_point;
    this.end_point = end_point;
  }

  draw(ctx, color) {
    ctx.beginPath();
    ctx.moveTo(this.start_point.x, this.start_point.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineTo(this.end_point.x, this.end_point.y);
    ctx.stroke();
  }
}

//The line defined as a function.
class LineFormula {
  //what are the things we are looking for.
  // 500 + (x * 5) = y
  // y = mx + b;
  constructor(ratio, offset, horizontal, vertical) {
    this.ratio = ratio;
    this.offset = offset;
    this.horizontal = horizontal;
    this.vertical = vertical;
  }

  getX(y) {
    return (y - this.offset) / this.ratio;
  }

  getY(x) {
    return (this.ratio * x) + this.offset;
  }
}

//Function to create line formula's. Maybe merge this with the line as well as the drawable Line.
function getLineFormula(p1, p2) {
  // The m is the change per step.
  // Divide the differences.
  var difX = p1.x - p2.x;
  var difY = p1.y - p2.y;

  console.log("difx = " + difX);
  console.log("dify = " + difY);

  var ratio = difY / difX;

  if (difX == 0) {
    ratio = 0;
    //Vertical = true;
  }

  if (difY == 0) {
    ratio = 0;
    //Horizontal = true;
  }

  console.log("ratio = " + ratio);

  var tempLine = new LineFormula(ratio, 0);
  var offset = p1.y - tempLine.getY(p1.x);

  console.log("offset = "+ offset);

  return new LineFormula(ratio, offset);
}

function flipLine(LineForumla, point) {
  // M is the amount of y differences on 1 x.
  // 1 | new M   3  9
  // M | 1       4  12

  var flipRatio = 0;

  if (LineFormula.ratio == 0) {
    //(ratio * x) + offset = y
    //results in a formula that only returns a variable if an Y is provided.
    //x = (y - offset) / ratio.
  } else {
    var flipRatio = 1 / LineForumla.ratio;
    flipRatio = flipRatio * -1;

  }

  console.log("flipRatio = " + flipRatio);


  //now to Calculate the required b
  // y = mm * x + bb;
  // bb = y - (mm * x)
  var flipOffset = 0;
  flipOffset = point.y - (flipRatio * point.x);
  console.log("flipOffset = " + flipOffset);

  return new LineFormula(flipRatio, flipOffset);
}


// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var canvas_width = 960;
var canvas_height = 640;

canvas.width = canvas_width;
canvas.height = canvas_height;
document.body.appendChild(canvas);

var points = [new Point(250, 300), new Point(450, 300)];

for (var point in points) {
  points[point].draw(ctx, "black");
}

//to draw a line perpendicular to previous one we need a bit of algebra.
//How do I define this line in a function.
//It is always someting like this. sx + z = y;
var firstFormulaLine = getLineFormula(points[0], points[1]);
// var firstDrawLine = new Line(points[0], points[1]);
var firstDrawLine = new Line(new Point(points[0].x, firstFormulaLine.getY(points[0].x)), new Point(points[1].x, firstFormulaLine.getY(points[1].x)));
firstDrawLine.draw(ctx, "grey");

//draw a line perpendicular to the previous line. In the middle of the previous one.
//Calculate that.
var halfwayPoint = new Point(((points[1].x - points[0].x) / 2) + points[0].x , ((points[1].y - points[0].y) / 2) + points[0].y);
halfwayPoint.draw(ctx, "blue");

//This is now the border.:)
var nextLine = flipLine(firstFormulaLine, halfwayPoint);
console.log(nextLine);
var nextDrawLine = new Line(new Point(0, nextLine.getY(0)), new Point(canvas_width, nextLine.getY(canvas_width)));



nextDrawLine.draw(ctx, "red");