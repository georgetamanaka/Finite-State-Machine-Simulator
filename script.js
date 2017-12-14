const SMALL_RADIUS = 50;
const HIGHLIGHT_COLOR = "#C6FF00";

$(document).ready(function(){
	//myFunction(0, 15, 0);

	$("#statesCanvas").hide();
	$("#botoes").hide();
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

	$("#qtdEstados").on('input', function(){
		$("#sliderValue").text($("#qtdEstados").val());
	});

	$("#previousButton2").click(function(){
		$("#thirdScreen").hide();
		$("#secondScreen").fadeIn(1000);
	});

	$("#nextButton2").click(function(){
		$("#secondScreen").hide();
		$("#thirdScreen").fadeIn(1000);
	});


	var tabela;
	var atual = 0;
	
	var sequenciaEstados = [];
	var sequenciaEntradas = [];
	var sequenciaSaidas = [];
	
	sequenciaEstados.push(atual);

	$("#submitButton").click(function(){		
		var tipoMaquina = parseInt($("input[name='machineType']:checked").val());
		var qtdEstados = parseInt($("#qtdEstados").val());
		tabela = $("textarea[name='truthTable']").val();
		tabela = tabela.replace( /\n/g, " " ).split(" ");
		$("#descriptionBox").fadeOut(1000, myFunction(tipoMaquina,qtdEstados,tabela));
		$("#state0").css("background-color", HIGHLIGHT_COLOR);
	});
	
	$("#btn0").click(function(){
		var find = 0;
		// despinta o atual
		$("#state" + atual).css("background-color", "white");
			for(var i = 0; i < tabela.length; i += 4){
				if(tabela[i] == atual && tabela[i+1] == 0){
					sequenciaSaidas.push(tabela[i+3]);
					alert("Atual: " +atual + " proximo: " +  tabela[i+2] + " saida: " + tabela[i+3]);
					atual = tabela[i+2];
					$("#state" + atual).css("background-color", HIGHLIGHT_COLOR);
					find = 1;
					sequenciaEstados.push(atual);
					sequenciaEntradas.push(0);
					
					// contabiliza entrada e saida'
					break;
				}
			}
		// pinta o novo atual
		if(!find){
			// o comportamento do estado atual não esta definido para a entrada 0
		}
});



	$("#btn1").click(function(){
		var find = 0;
		
		//despinta o estado atual
		$("#state" + atual).css("background-color", "white");
		
		for(var i = 0; i < tabela.length; i += 4){
			if(tabela[i] == atual && tabela[i+1] == 1){
				sequenciaSaidas.push(tabela[i+3]);
				alert("Atual: " +atual + " proximo: " +  tabela[i+2] + " saida: " + tabela[i+3]);
				atual = tabela[i+2];

				console.log("atual: " + atual);
				
				//pinta o próximo estado
				$("#state" + atual).css("background-color", HIGHLIGHT_COLOR);
				
				find = 1;
				sequenciaEstados.push(atual);
				sequenciaEntradas.push(1);
				// contabiliza entrada e saida
				break;
			}
		}
		// pinta o novo atual
		if(!find){
			// o comportamento do estado atual não esta definido para a entrada 0
		}
	});

	$("#relatorio").click(function(){
		alert(sequenciaEstados + "\n   " + sequenciaEntradas + "\n   " + sequenciaSaidas);
	});
		
});

function myFunction(machineType, numStates, table){
	$("#statesCanvas").show();
	$("#botoes").show();

	var div = 360 / numStates;
    var radius = numStates * 35;
    
    var topMargin = 120;
    var leftMargin = 220;

    var offsetToParentCenter = numStates * 80 / 2;
    var offsetToChildCenter = 20;
    var totalOffset = offsetToParentCenter - offsetToChildCenter;

    for (var i = 0; i < numStates; ++i){
        $("#statesCanvas").append('<div ' + 'id="state' + i +'" class="circle">' + i +'</div>');
        var y = Math.sin((div * i) * (Math.PI / 180)) * radius;
        var x = Math.cos((div * i) * (Math.PI / 180)) * radius;
        $("#state" + i).css("top", (topMargin + y + totalOffset) + "px");
        $("#state" + i).css("left", (leftMargin + x + totalOffset) + "px");
    }

    console.log(table.length);

    for(var i = 0; i < numStates; i++){
    	for (var j = 0; j < numStates; j++) {
    		drawArrow(i, j, radius, leftMargin, topMargin);
    	}
    }

    //current sate | input | next state | output
	for (var i = 0; i < table.length; i += 4){
		console.log("from: " + table[i] + "to: " + table[i + 2]);
		if(!(table[i] == table[i - 4] && table[i + 2] == table[i - 2])){
			drawArrow(table[i], table[i + 2], radius, leftMargin, topMargin);
		}
	}
}

function drawArrow(from, to, radius, leftMargin, topMargin){
	var fromx = parseFloat($("#state" + from).css("left")) + SMALL_RADIUS;
	var fromy = parseFloat($("#state" + from).css("top")) + SMALL_RADIUS;
	var tox = parseFloat($("#state" + to).css("left")) + SMALL_RADIUS;
	var toy = parseFloat($("#state" + to).css("top")) + SMALL_RADIUS;

	var length = Math.sqrt(Math.pow(tox -  fromx, 2) + Math.pow(toy -  fromy, 2));
	var angle = Math.atan2(toy - fromy, tox - fromx);
	var alpha = 1 - SMALL_RADIUS/length;

	if(length != 0){
		$("#statesCanvas").append('<div ' + 'id="line' + from + "to" + to + '" class="line"></div>');
		$("#line" + from + "to" + to).css({"width": length + "px", "left":fromx,"top":fromy, "transform":"rotate(" + angle + "rad)"});
		$("#statesCanvas").append('<div ' + 'id="arrow' + from + "to" + to + '" class="arrow"></div>')
		$("#arrow" + from + "to" + to).css({"left":((1-alpha) * fromx + alpha * tox) + "px", "top":((1-alpha) * fromy+ alpha * toy) - 20 + "px", "transform":"rotate(" + (- 3 * Math.PI/4 + angle) + "rad)"});
	}
	else{
		var xCorrectionState = 0;
		var yCorrectionState = 0;
		var xCorrectionArrow = 2 * SMALL_RADIUS - 23;
		var yCorrectionArrow = 2 * SMALL_RADIUS - 23;
		var angle = 0;

		if(fromx <= leftMargin + radius && fromy <= topMargin + radius){
			xCorrectionState = - 2 * SMALL_RADIUS;
			yCorrectionState = - 2 * SMALL_RADIUS;
			xCorrectionArrow = xCorrectionState + 11;
			yCorrectionArrow = yCorrectionState;
			angle = Math.PI/12;
		}
		else if(fromx <= leftMargin + radius && fromy > topMargin + radius){
			xCorrectionState = - 2 * SMALL_RADIUS;
			yCorrectionState = 0;
			xCorrectionArrow = xCorrectionState + 8;
			yCorrectionArrow = yCorrectionState;
		}
		else if(fromx > leftMargin + radius && fromy <= topMargin + radius){
			xCorrectionState = 0;
			yCorrectionState = - 2 * SMALL_RADIUS;
			xCorrectionArrow = xCorrectionState + 14;
			yCorrectionArrow = yCorrectionState;
		}

		$("#statesCanvas").append('<div ' + 'id="selfLoop' + from +'" class="selfLoop"></div>');
		$("#selfLoop" + from).css({"background-color": "none", "border-style" : "solid", "border-color" : "white", "top" : (fromy + yCorrectionState) + "px", "left" : (fromx + xCorrectionState) + "px"});
		$("#statesCanvas").append('<div ' + 'id="arrow' + from + "to" + to + '" class="arrow"></div>')
		$("#arrow" + from + "to" + to).css({"left": fromx + xCorrectionArrow + "px", "top": fromy + yCorrectionArrow + "px", "transform":"rotate(" + angle + "rad)"});
	}
}