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
    if (vertical) {
      return this.offset;
    } else {
      return (y - this.offset) / this.ratio;
    }
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

  // console.log("difx = " + difX);
  // console.log("dify = " + difY);

  var ratio = difY / difX;

  var horizontal = false;
  var vertical = false;

  if (difX == 0) {
    ratio = 0;
    vertical = true;
  }

  if (difY == 0) {
    ratio = 0;
    horizontal = true;
  }

  // console.log("ratio = " + ratio);

  var tempLine = new LineFormula(ratio, 0);
  var offset = p1.y - tempLine.getY(p1.x);

  // console.log("offset = "+ offset);

  return new LineFormula(ratio, offset, horizontal, vertical);
}

function flipLine(lineFormula, point) {
  // M is the amount of y differences on 1 x.
  // 1 | new M   3  9
  // M | 1       4  12

  horizontal = false;
  vertical = false;

  if(lineFormula.horizontal) {
    vertical = true;
    flipOffset = point.x;
    return new LineFormula(0, flipOffset, horizontal, vertical);
  } else if (lineFormula.vertical) {
    horizontal = true;
  }

  var flipRatio = 0;

  if (lineFormula.ratio == 0) {
    //(ratio * x) + offset = y
    //results in a formula that only returns a variable if an Y is provided.
    //x = (y - offset) / ratio.
  } else {
    var flipRatio = 1 / lineFormula.ratio;
    flipRatio = flipRatio * -1;
  }

  // console.log("flipRatio = " + flipRatio);

  //now to Calculate the required b
  // y = mm * x + bb;
  // bb = y - (mm * x)

  var flipOffset = 0;
  flipOffset = point.y - (flipRatio * point.x);

  // console.log("flipOffset = " + flipOffset);

  return new LineFormula(flipRatio, flipOffset, horizontal, vertical);
}

function generate_points () {
  //Create an arry of random points on the plane.
  var points = []

  for (i = 0; i < 4; i++) {
    //make the screen size a variable
    points.push(new Point(Math.floor(Math.random() * canvas_width + 1), Math.floor(Math.random() * canvas_height + 1)))
  }

  return points;
}

//sort the array of points based on their X co-ordinate.
function compare(a, b) {
  if (a.x < b.x) {
    return -1;
  }

  if (a.x > b.x) {
    return 1;
  }

  return 0;
}

function getCrossPoint(l1, l2) {
  // A situation that both lineFormula
  // x1 = x2
  // y1 = y2
  // 4x + 200 = 3x + 600
  // 4x = 3x + 400
  // (4x -3x) x = 400
  // 12x - 1200 = -6x +400
  // 12x = -6x  + 1600
  // 18x = 1600
  // x = 1600 / 18;
  // l1.ratio * x + l1.offset = l2.ratio * x + l2.offset.
  // l1.ratio * x = l2.ratio * x + l2.offset - l1.offset.
  // x = (l2.ratio - l1.ratio) + (l2.offset - l1.offset)
  //This just isn't accurate enough.
  //So either keep going. I will have to do a ton of other checks. Which might not be as nice as some of the algorithms I found.
  //

  console.log("l1 = ", l1);
  console.log("l2 = ", l2);

  r = l2.ratio * -1;
  ratio =  l1.ratio + r;
  offset = (l2.offset - l1.offset) / ratio;

  console.log("ratio = " + ratio);
  console.log("offset = " + offset);

  x = ratio + offset;
  y = l1.getY(x);

  console.log(x);
  console.log(y);

  return new Point(x, y);
}

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var canvas_width = 960;
var canvas_height = 640;

canvas.width = canvas_width;
canvas.height = canvas_height;
document.body.appendChild(canvas);

//Now form here see if I can't generate the points.

var points = generate_points();

var borders = [];

for (p in points) {
  points[p].draw(ctx, "black");
}

console.log(points);

//Sort the points based on their X.
points.sort(compare);

for (p = 0; p < 4; p++) {
  console.log(points[p+1]);
  if (points[p+1] != null) {
    var firstFormulaLine = getLineFormula(points[p], points[p+1]);
    // console.log(firstFormulaLine);
    // var firstDrawLine = new Line(points[0], points[1]);

    if(firstFormulaLine.vertical) {
      var firstDrawLine = new Line(points[p], points[p+1]);
    } else {
      var firstDrawLine = new Line(new Point(points[p].x, firstFormulaLine.getY(points[p].x)), new Point(points[p+1].x, firstFormulaLine.getY(points[p+1].x)));
    }

    //console.log(firstDrawLine);
    firstDrawLine.draw(ctx, "grey");

    //draw a line perpendicular to the previous line. In the middle of the previous one.
    //Calculate that.
    var halfwayPoint = new Point(((points[p+1].x - points[p].x) / 2) + points[p].x , ((points[p+1].y - points[p].y) / 2) + points[p].y);
    //console.log(halfwayPoint);
    halfwayPoint.draw(ctx, "blue");

    //This is now the border.:)
    var nextLine = flipLine(firstFormulaLine, halfwayPoint);
    //console.log(nextLine);

    if(nextLine.vertical) {
      var nextDrawLine = new Line(new Point(nextLine.getX(0), 0), new Point(nextLine.getX(canvas_height), canvas_height));
    } else {
      var nextDrawLine = new Line(new Point(0, nextLine.getY(0)), new Point(canvas_width, nextLine.getY(canvas_width)));
    }
    //console.log(nextDrawLine);
    nextDrawLine.draw(ctx, "red");


    if(borders.length > 1) {
      console.log("start borders")
      for (b = 0; b < borders.length-1; b++) {
        console.log(b);
        if (borders[b + 1]) {
          point = getCrossPoint(borders[b], nextLine)
          point.draw(ctx, "red")
        }
      }
    }

    //check if the nextDrawLine has a cutting point with another line.
    borders.push(nextLine);
  }
}

console.log(borders);
