NodeList.prototype.array = function() {
	return Array.prototype.slice.call(this);
};

function find(qs) {
	return document.querySelectorAll(qs).array();
}

$(document).ready(function(){

	// canvas

	// curve on click
	$('#showCurve').click(function(){

		// get vars
		var p1x = $('#p1x').val(),
			p1y = $('#p1y').val(),
			p2x = $('#p2x').val(),
			p2y = $('#p2y').val(),
			x = $('#x').val();
			
		// create curve
		var curve = new Bezier(0,0,p1x,p1y,p2x,p2y,1,1);
		
		// setup new canvas
		var canvas = document.createElement('canvas');
		canvas.width = 300;
		canvas.height = 300;
		var ctx = canvas.getContext('2d');

		// flip the canvas to get x=0,y=0 to bottom left
		ctx.translate(0, canvas.height);
		ctx.scale(1, -1);

		// draw the curve
		var p = curve.points;
		ctx.beginPath();
		ctx.moveTo(p[0].x, p[0].y);
		ctx.bezierCurveTo(
			p[1].x * canvas.width, p[1].y * canvas.height,
			p[2].x * canvas.width, p[2].y * canvas.height,
			p[3].x * canvas.width, p[3].y * canvas.height
		);
		ctx.stroke();
		ctx.closePath();

		// plot point
		var startTime = new Date().getTime();
		var xp = curve.get(x);
		var endTime = new Date().getTime();
		console.log('"get()" took ' + (endTime - startTime) + ' milliseconds');
		ctx.beginPath();
		ctx.arc(xp.x * canvas.width, xp.y * canvas.height, 5, 0, 2*Math.PI);
		ctx.stroke();
		ctx.closePath();

		// remove old canvas, add new
		$('#curve').html('');
		$('#curve').append($(canvas));

	});

});

