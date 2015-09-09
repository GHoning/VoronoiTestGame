game.Voronoi_Enity = me.Renderable.extend({

	init : function (x, y,colour, points) {

		this.colour = colour;

		this._super(me.Renderable, "init", [x, y, 1, 1]);
		this.z = 200;

		this.points = points;
	},

	draw : function (renderer) {
		this.Polygon = new me.Polygon(0, 0, this.points);
		//console.log(renderer);
		renderer.setColor(this.colour);
		renderer.drawShape(this.Polygon);
	},

	update : function () {
		return false;
	},

});

game.Line = me.Renderable.extend({

	init : function (startx, starty, endx, endy, collor) {


		this.startx = startx;
		this.starty = starty;
		this.endx = endx;
		this.endy = endy;
		this.collor = collor;

		this._super(me.Renderable, "init", [1, 1, 1, 1]);
		this.z = 100;

		//console.log("init line");

	},

	draw : function (renderer) {
		renderer.setColor(this.collor);
		renderer.strokeLine( this.startx, this.starty, this.endx, this.endy);
		//console.log("draw line");
	},

	update : function () {
		return false;
	},

});

game.Formula = Object.extend ({
	init : function (ratio, offset) {
		this.ratio = ratio;
		this.offset = offset;
	},

	getY : function (x) {
		return (this.ratio * x) + this.offset;
	},

	getX : function (y) {
		return (y + (this.offset * -1)) / this.ratio;
	},

	crossPoint : function (inRatio, inOffset) {
		inRatio = inRatio * -1;
		var difRatio = inRatio + this.ratio
		
		var difOffset = inOffset + (this.offset * -1);

		var x = difOffset/difRatio;


		return [new me.Vector2d(x, this.getY(x)), difRatio, difOffset];

	}
});