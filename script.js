const SMALL_RADIUS = 50;

$(document).ready(function(){
	$("#statesCanvas").hide();
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
	$("#statesCanvas").show();


	var div = 360 / numStates;
    var radius = numStates * 35;
    var offsetToParentCenter = numStates * 80 / 2;
    var offsetToChildCenter = 20;
    var totalOffset = offsetToParentCenter - offsetToChildCenter;

    for (var i = 1; i <= numStates; ++i){
        $("#statesCanvas").append('<div ' + 'id="state' + i +'" class="circle">' + i +'</div>');
        var y = Math.sin((div * i) * (Math.PI / 180)) * radius;
        var x = Math.cos((div * i) * (Math.PI / 180)) * radius;
        $("#state" + i).css("top", (y + totalOffset) + "px");
        $("#state" + i).css("left", (x + totalOffset) + "px");
    }

	for (var j = 1; j <= numStates; j++){
		for(var i = 1; i <= numStates; i++){
			if(i != j)drawArrow(i, j);
		} 	
	}
}

function drawArrow(from, to){
	var fromx = parseFloat($("#state" + from).css("left")) + SMALL_RADIUS;
	var fromy = parseFloat($("#state" + from).css("top")) + SMALL_RADIUS;
	var tox = parseFloat($("#state" + to).css("left")) + SMALL_RADIUS;
	var toy = parseFloat($("#state" + to).css("top")) + SMALL_RADIUS;

	var length = Math.sqrt(Math.pow(tox -  fromx, 2) + Math.pow(toy -  fromy, 2));
	var angle = Math.atan2(toy - fromy, tox - fromx);
	/*
	console.log("cos: " + (fromx - tox)/length)
	console.log("length: " + length)
	console.log("fromx: " + fromx);
	console.log("fromy: " + fromy);
	console.log("tox: " + tox);
	console.log("toy: " + toy);

	console.log("x: " + (fromx + tox)/2);
	console.log("y: " + (fromy + toy)/2);
	*/


	//console.log(angle);

	var alpha = 1 - SMALL_RADIUS/length;

	$("#statesCanvas").append('<div ' + 'id="line' + from + "to" + to + '" class="line"></div>');
	

	$("#line" + from + "to" + to).css({"width": length + "px", "left":fromx,
										"top":fromy, "transform":"rotate(" + angle + "rad)"});
	$("#statesCanvas").append('<div ' + 'id="arrow' + from + "to" + to + '" class="arrow"></div>')
	$("#arrow" + from + "to" + to).css({"left":((1-alpha) * fromx + alpha * tox) + "px", "top":((1-alpha) * fromy+ alpha * toy) - 25 + "px", "transform":"rotate(" + (- 3 * Math.PI/4 + angle) + "rad)"})




	if(fromx < tox){
		
	}
	else{
		//$("#line" + from + "to" + to).css({"width": length + "px", "left":tox,
		//								"top":toy, "transform":"rotate(" + angle + "rad)"});
	}


	//window.location.reload(true);
	

}