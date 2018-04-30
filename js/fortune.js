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

//Fortunate classes:
class Sweepline extends Line {
  moveDown(y) {
    this.start_point.y = y;
    this.end_point.y = y;
  }
}

class Intersection {
  //this can just be a point.
}

class Arc {
  //this will need something to draw the line for debug purposes.

}

class SiteEvent {
  //The sweep line passes a new site.
  //Add a new Prabola(arc) to the beach line.
  //the beachline can be expressed as Pi, Xi, Pi+1, Xi+1, Pi+2.
  //This is sorted on the x-axis.
  // In this exmample Pi+1 was added and Pi, Pi+2 where the previous ones.
}

class CircleEvent {
  //A parabola(arc) disapears, two neighbouring arcs squeeze it.
  //An edge between two neighbours is started. Thus a sequence Xi-1, Pi, Xi is replaced by a new edge Xi.
  //A place at which an arc disapears and a new edge begins is in the same distance to all three foci.
  //(It's focus and it's neighbours) Thus it is the circumcenter of the circumcircle, definded by these 3 foci(sites).
  //Which means the distance between that point is equal.
}



//Functions
//Create an arry of random points on the plane.
function generate_points() {
  var points = []
  for (i = 0; i < 4; i++) {
    points.push(new Point(Math.floor(Math.random() * canvas_width + 1), Math.floor(Math.random() * canvas_height + 1)))
  }

  return points;
}

function draw(ctx) {
  //clear the screen
  ctx.clearRect(0, 0, canvas_width, canvas_height);

  //draw the points
  for (p in points) {
    points[p].draw(ctx, "black");
  }

  //draw the sweepline.
  sweepline.draw(ctx, "grey");
}

function compare_x(a, b) {
  if (a.x < b.x)
    return -1;
  if (a.x > b.x)
    return 1;
  return 0;
}

function compare_y(a, b) {
  if (a.y < b.y)
    return -1;
  if (a.y > b.y)
    return 1;
  return 0;
}

//Main or start
// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var canvas_width = 960;
var canvas_height = 640;

canvas.width = canvas_width;
canvas.height = canvas_height;
document.body.appendChild(canvas);

var points = generate_points();


//form here implement the fortune stuff.
var sweepline = new Sweepline(new Point(0 ,0), new Point(canvas_width ,0));
draw(ctx);

// setTimeout(function(){
//     //do what you need here
//     sweepline.moveDown(200);
//     draw(ctx);
// }, 2000);

console.log(points);

//sort the array of points on the x and y axis.
// points.sort(compare_x);
// points.sort(compare_y);

//This is a collection of arc's and intersections.
var beachline = [];