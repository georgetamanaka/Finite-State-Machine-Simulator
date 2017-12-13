$(document).ready(function(){
	$("#myCanvas").hide();
	$("#descriptionBox").fadeIn(1000);
	$("#nextButton1").click(function(){
		$("#firstScreen").fadeOut(1000);
		$("#firstScreen").hide();
		$("#secondScreen").fadeIn(1000);
	});

	$("#previousButton1").click(function(){
		$("#secondScreen").hide();
		$("#firstScreen").fadeIn(1000);
	});

	$("#previousButton2").click(function(){
		$("#thirdScreen").hide();
		$("#secondScreen").fadeIn(1000);
	});

	$("#nextButton2").click(function(){
		$("#secondScreen").hide();
		$("#thirdScreen").fadeIn(1000);
	});

	$("#submitButton").click(function(){
		$("#descriptionBox").fadeOut(1000, myFunction(parseInt($("#qtdEstados").val())));
	});
});

function myFunction(numStates){
	$("#myCanvas").show();

	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");

	ctx.canvas.width  = window.innerWidth;
 	ctx.canvas.height = window.innerHeight;

 	var biggerRadius =  0.8 * window.innerHeight/2;
	var smallerRadius = 44;
	
	ctx.translate(window.innerWidth/2, window.innerHeight/2);

	for (var i = 0; i < numStates; i++) {
		ctx.beginPath();
		ang = i * 2 * Math.PI / numStates;
        ctx.rotate(ang);
        ctx.translate(0, -biggerRadius*0.85 - smallerRadius);
        ctx.arc(0, 0, smallerRadius, 0 , 2*Math.PI);
    	ctx.fillStyle = "white";
    	ctx.fill();
        ctx.translate(0, biggerRadius*0.85 + smallerRadius);
        ctx.rotate(-ang);
	}
}
