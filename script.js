const SMALL_RADIUS = 50;

$(document).ready(function(){
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

	$("#submitButton").click(function(){
		$("#descriptionBox").fadeOut(1000, myFunction(parseInt($("#qtdEstados").val())));
	});


	var tabela;
	var atual = 1;
	
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
		
	});
	
	$("#btn0").click(function(){
		var find = 0;
		// despinta o atual
			for(var i = 0; i < tabela.length; i += 4){
				if(tabela[i] == atual && tabela[i+1] == 0){
					sequenciaSaidas.push(tabela[i+3]);
					alert("Atual: " +atual + " proximo: " +  tabela[i+2] + " saida: " + tabela[i+3]);
					atual = tabela[i+2];
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
		// despinta o atual
		for(var i = 0; i < tabela.length; i += 4){
			if(tabela[i] == atual && tabela[i+1] == 1){
				sequenciaSaidas.push(tabela[i+3]);
				alert("Atual: " +atual + " proximo: " +  tabela[i+2] + " saida: " + tabela[i+3]);
				atual = tabela[i+2];
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

function myFunction(numStates){
	$("#statesCanvas").show();
	$("#botoes").show();

	var div = 360 / numStates;
    var radius = numStates * 35;
    
    var topMargin = 10;
    var leftMargin = 100;

    var offsetToParentCenter = numStates * 80 / 2;
    var offsetToChildCenter = 20;
    var totalOffset = offsetToParentCenter - offsetToChildCenter;

    for (var i = 1; i <= numStates; ++i){
        $("#statesCanvas").append('<div ' + 'id="state' + i +'" class="circle">' + i +'</div>');
        var y = Math.sin((div * i) * (Math.PI / 180)) * radius;
        var x = Math.cos((div * i) * (Math.PI / 180)) * radius;
        $("#state" + i).css("top", (topMargin + y + totalOffset) + "px");
        $("#state" + i).css("left", (leftMargin + x + totalOffset) + "px");
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
	var alpha = 1 - SMALL_RADIUS/length;

	$("#statesCanvas").append('<div ' + 'id="line' + from + "to" + to + '" class="line"></div>');
	$("#line" + from + "to" + to).css({"width": length + "px", "left":fromx,"top":fromy, "transform":"rotate(" + angle + "rad)"});
	$("#statesCanvas").append('<div ' + 'id="arrow' + from + "to" + to + '" class="arrow"></div>')
	$("#arrow" + from + "to" + to).css({"left":((1-alpha) * fromx + alpha * tox) + "px", "top":((1-alpha) * fromy+ alpha * toy) - 20 + "px", "transform":"rotate(" + (- 3 * Math.PI/4 + angle) + "rad)"});
	
}