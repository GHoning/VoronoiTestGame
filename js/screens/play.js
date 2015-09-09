game.PlayScreen = me.ScreenObject.extend({


	onResetEvent : function () {
		//console.log("(re)Started PlayScreen");
		//this.Voronoi = new game.Voronoi_Enity(1,1);
		//me.game.world.addChild(this.Voronoi);
		//console.log(this.Voronoi);

		//console.log(game.Formula);

		//console.log (new game.Formula(0, 0));

		me.game.world.addChild(new me.ColorLayer("background", "#000000", 0));

		//var Voronoi = new game.Voronoi_Enity(0 , 0);
		
		
		//var line2 = new game.Line(10, 50, 50, 20, "#ff0");

		//var line4 = new game.Line(0, 30, 50, 30, "#fff");

		this.FormulaArray = [];


		var Vector1 = new me.Vector2d(10, 20);
		var Vector2 = new me.Vector2d(20, 80);
		var Vector3 = new me.Vector2d(70, 60);

		var VectorArray = [Vector1, Vector2, Vector3];
		//var Vector4 = new me.Vector2d(80, 40);

		this.DrawLineAndFormula(Vector1, Vector2);
		this.DrawLineAndFormula(Vector2, Vector3);
		this.DrawLineAndFormula(Vector3, Vector1);

		var sortX = [];
		var sortY = [];

		for (var i = 0; i < VectorArray.length; i++) {
			sortX[i] = VectorArray[i].x;
			sortY[i] = VectorArray[i].y;
		};

		sortX.sort();
		sortY.sort();

		console.log(sortX);
		console.log(sortY);

		// Now I need to figure out which point belongs to which and assign the correct screen limits to them.

		//this.DrawLineAndFormula(Vector3, Vector1);
		//this.DrawLineAndFormula(Vector4, Vector1);

		//var resultLine = new game.Line(35.625, 46.5625, 100, 46.5625, "#fff");

		//me.game.world.addChild(resultLine);

		/*this.NewShape = new me.Polygon(12, 12, [new me.Vector2d(20, 20), new me.Vector2d(20, 10), new me.Vector2d(10, 20), new me.Vector2d(10, 10)]);
		console.log(this.NewShape);
*/
		//console.log(me.CanvasRenderer);
		//me.CanvasRenderer.drawShape(this.NewShape);

		/*console.log(this.FormulaArray);
		console.log(this.FormulaArray[1].getY(35.625));

		console.log(0 , this.FormulaArray[0].getY(0));
		console.log(this.FormulaArray[1].getX(100), 100);
		console.log(this.FormulaArray[2].getX(0), 0);*/

		var MiddlePoint = this.FormulaArray[1].crossPoint(this.FormulaArray[2].ratio,this.FormulaArray[2].offset);

		var Shape1 = new game.Voronoi_Enity(0, 0 ,"#aff", [MiddlePoint[0], new me.Vector2d(this.FormulaArray[2].getX(0), 0), new me.Vector2d(100,0),new me.Vector2d(100,100), new me.Vector2d(this.FormulaArray[1].getX(100), 100)]);
		var Shape2 = new game.Voronoi_Enity(0, 0 ,"#ffa", [MiddlePoint[0], new me.Vector2d(this.FormulaArray[2].getX(0), 0), new me.Vector2d(0,0), new me.Vector2d(0, this.FormulaArray[0].getY(0))]);
		var Shape3 = new game.Voronoi_Enity(0, 0 ,"#faf", [MiddlePoint[0], new me.Vector2d(this.FormulaArray[1].getX(100), 100), new me.Vector2d(0, 100), new me.Vector2d(0, this.FormulaArray[0].getY(0))]);

		me.game.world.addChild(Shape1);
		me.game.world.addChild(Shape2);
		me.game.world.addChild(Shape3);

		//console.log(Shape1);
	},

	onDestroyEvent : function () {
		console.log("Destoryed PlayScreen");
	},

	DrawLineAndFormula : function ( Vector1, Vector2) {

		if ( Vector1.y == Vector2.y) {
			var line1 = new game.Line(Vector1.x, Vector1.y, Vector2.x, Vector2.y, "#fff");
			var XDif = Vector2.x - Vector1.x;
			var YDif = Vector2.y - Vector1.y;
			//console.log (XDif, YDif);
			var StartX = Vector1.x + (XDif / 2);
			var StartY = 0;
			var EndX = Vector1.x + (XDif / 2);
			var EndY = 100;
			var line2 = new game.Line(StartX, StartY, EndX, EndY, "#f00");

			me.game.world.addChild(line1);
			me.game.world.addChild(line2);

		} else {

			var line1 = new game.Line(Vector1.x, Vector1.y, Vector2.x, Vector2.y, "#fff");

			var XDif = Vector2.x - Vector1.x;
			var YDif = Vector2.y - Vector1.y;

			var Ratio = (XDif / YDif) * - 1;

			var XDifHalf = XDif / 2;
			var YDifHalf = YDif / 2;

			var MiddlePointX = Vector1.x + XDifHalf;
			var MiddlePointY = Vector1.y + YDifHalf;

			var A = (Ratio * MiddlePointX) - MiddlePointY;

			A = A * -1;

			var StartX = 0;
			var StartY = (Ratio * StartX) + A;

			var EndX = 100;
			var EndY = (Ratio * EndX) + A;

			//var MiddlePoint = me.Vector2d(MiddlePointX, MiddlePointY);

			//console.log (XDif, YDif);
			//console.log (MiddlePointX, MiddlePointY);
			//console.log (Ratio);
			//console.log(A);

			var line3 = new game.Line(StartX, StartY, EndX, EndY, "#f00");


			me.game.world.addChild(line1);
			me.game.world.addChild(line3);

			game.play.FormulaArray.push(new game.Formula(Ratio, A));
		}
	},
});