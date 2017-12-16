const SMALL_RADIUS = 50;
const HIGHLIGHT_COLOR = "#C6FF00";
const DEFAULT_COLOR = "#3cb371";
const COLOR_TRANSITION_TIME = 1000;

$(document).ready(function(){
	var tabela;
	var atual;
	var tipoMaquina;
	var input;
	var qtdEstados;
	
	var sequenciaEstados = [];
	var sequenciaEntradas = [];
	var sequenciaSaidas = [];
	
	$("#statesCanvas").hide();
	$("#botoes").hide();
	$("#mealy").hide();	
	$("#backButton").hide();	
	$("#descriptionBox").fadeIn(1000);
	
	$("#nextButton1").click(function(){
		$("#descriptionBox").animate({width: "50%"}, 1000);	
		$("#firstScreen").fadeOut(1000);
		$("#firstScreen").hide();
		$("#secondScreen").fadeIn(1000);
	});

	$("#previousButton2").click(function(){
		$("#descriptionBox").animate({width: "20%"}, 1000);	
		$("#secondScreen").hide();
		$("#firstScreen").fadeIn(1000);
	});

	$("#qtdEstados").on('input', function(){
		$("#sliderValue").text($("#qtdEstados").val());
	});

	$("#previousButton3").click(function(){
		$("#thirdScreen").hide();
		$("#secondScreen").fadeIn(1000);
	});

	$("#nextButton2").click(function(){
		$("#secondScreen").hide();
		$("#thirdScreen").fadeIn(1000);
	});

	$("#text").click(function(){
		$("#thirdScreen").hide();
		$("#fourthScreen").fadeIn(1000);
	});

	$("#text").click(function(){
		$("#thirdScreen").hide();
		$("#fourthScreen").fadeIn(1000);
	});

	$("#examplesButton").click(function(){
		$("#firstScreen").fadeOut();
		$("#firstScreen").hide();
		$("#descriptionBox").animate({width: "40%"});	
		$("#descriptionBox").animate({height: 500},function(){ $("#examplesScreen").fadeIn()});
	});

	$("#previousButton5").click(function(){
		$("#descriptionBox").animate({width: "20%"}, 1000);	
		$("#descriptionBox").animate({height: "400px"}, 1000);
		$("#examplesScreen").hide();
		$("#firstScreen").fadeIn(1000);
		$("#previousButton6").hide();
		$("#generate1").hide();
	});

	$("#previousButton6").click(function(){
		$("#ex1").empty();
		$("#descriptionBox").animate({height: "500px"}, 1000);
		$("#ex1").css("display", "none");
		$("#examplesScreen").fadeIn(1000);
		$("#previousButton6").hide();
		$("#generate1").hide();
	});
	
	$(".exemple").click(function(){
		$("#examplesScreen").fadeOut(1000);
		$("#examplesScreen").hide();		
		$("#ex1").fadeIn(1000);
		$("#previousButton6").show();
		$("#generate1").show();
	});
	
	$(".generate").click(function(){
			$("#descriptionBox").hide();
			
			$("#previousButton6").hide();
			$("#generate1").hide();
			$("#ex1").empty();
			$("#ex1").hide();
			
			atual = 0;
			tabela = tabela.replace( /\n/g, " " ).split(" ");
			
			if(tipoMaquina == 0){
				$("#mealy").show();
			}
			
			$("#descriptionBox").fadeOut(1000, myFunction(tipoMaquina,qtdEstados,tabela));
			$("#backButton").show();	
			$("#state" + atual).css("background-color", HIGHLIGHT_COLOR);
	});
	
	$("#example1").click(function(){
		tipoMaquina = 1;
		qtdEstados = 4;
		$("#ex1").css("display", "block");	
		$("#ex1").append("<div><center><b><font size='4'>Input</font></b></center><p>0 0 1 0</p><p>0 1 3 1</p><p>1 0 3 1</p><p>1 1 0 1</p><p>2 0 2 1</p><p>2 1 0 1</p><p>3 0 2 1</p><p>3 1 3 1</p></div>");
		tabela = "0 0 1 0\n0 1 3 1\n1 0 3 1\n1 1 0 1\n2 0 2 1\n3 0 2 1\n3 1 3 1";
	});

	$("#example2").click(function(){
		$("#descriptionBox").animate({height: "500"}, 1000);
		tipoMaquina = 1;
		qtdEstados = 4;
		$("#ex1").css("display", "block");	
		$("#ex1").append("<center><b><font size='4'>Input</font></b></center><p>0 0 0 1</p><p>0 1 1 1</p><p>1 0 2 1</p><p>1 1 3 1</p><p>2 0 1 1</p><p>2 1 3 1</p><p>3 0 1 1</p><p>3 1 3 1</p>");
		tabela = "0 0 0 1\n0 1 1 1\n1 0 2 1\n1 1 3 1\n2 0 1 1\n2 1 3 1\n3 0 1 1\n3 1 3 1";
	});

	$("#example3").click(function(){
		$("#descriptionBox").animate({height: "700"}, 1000);
		tipoMaquina = 1;
		qtdEstados = 8;
		$("#ex1").css("display", "block");	
		$("#ex1").append("<center><b><font size='4'>Input</font></b></center><p>0 0 3 0</p><p>1 0 4 1</p><p>2 0 5 0</p><p>3 0 6 0</p><p>4 0 7 1</p><p>5 0 0 1</p><p>6 0 1 1</p><p>7 0 2 0</p><p>0 1 1 1</p><p>1 1 2 1</p><p>2 1 3 0</p><p>3 1 4 1</p><p>4 1 5 0</p><p>5 1 6 0</p><p>6 1 7 1</p><p>7 1 0 1</p>");
		tabela = "0 0 3 0\n1 0 4 1\n2 0 5 0\n3 0 6 0\n4 0 7 1\n5 0 0 1\n6 0 1 1\n7 0 2 0\n0 1 1 1\n1 1 2 1\n2 1 3 0\n3 1 4 1\n4 1 5 0\n5 1 6 0\n6 1 7 1\n7 1 0 1";	
	});

	$("#example4").click(function(){
		$("#descriptionBox").animate({height: "700"}, 1000);
		tipoMaquina = 1;
		qtdEstados = 8;
		$("#ex1").css("display", "block");	
		$("#ex1").append("<center><b><font size='4'>Input</font></b></center><p>0 0 1 0</p><p>1 0 0 0</p><p>3 0 0 1</p><p>4 0 0 1</p><p>5 0 0 1</p><p>5 0 0 1</p><p>6 0 0 1</p><p>7 0 0 1</p><p>0 1 1 1</p><p>1 1 2 1</p><p>2 1 3 1</p><p>3 1 4 1</p><p>4 1 5 1</p><p>5 1 6 1</p><p>6 1 7 1</p><p>7 1 0 1</p>");
		tabela = "0 0 0 1\n1 0 0 0\n2 0 0 1\n3 0 0 1\n4 0 0 1\n5 0 0 1\n6 0 0 1\n7 0 0 1\n0 1 1 1\n1 1 2 1\n2 1 3 1\n3 1 4 1\n4 1 5 1\n5 1 6 1\n6 1 7 1\n7 1 0 0";
	});

	$("#example5").click(function(){
		$("#descriptionBox").animate({height: "1300px"}, 1000);
		tipoMaquina = 1;
		qtdEstados = 30;
		$("#ex1").css("display", "block");	
		$("#ex1").append("<center><b><font size='4'>Input</font></b></center><p>0 0 1 0<br />1 0 2 1<br />2 0 3 0<br />3 0 4 1<br />4 0 5 0<br />5 0 6 1<br />6 0 7 0<br />7 0 8 1<br />8 0 9 0<br />9 0 10 1<br />10 0 11 0<br />11 0 12 1<br />12 0 13 0<br />13 0 14 1<br />14 0 15 0<br />15 0 16 1<br />16 0 17 0<br />17 0 18 1<br />18 0 19 0<br />19 0 20 1<br />20 0 21 1<br />21 0 22 0<br />22 0 23 1<br />23 0 24 0<br />24 0 25 1<br />25 0 26 0<br />26 0 27 1<br />27 0 28 0<br />28 0 29 1<br />29 0 0 0<br />0 1 5 0<br />1 1 6 1<br />2 1 7 0<br />3 1 8 1<br />4 1 9 0<br />5 1 10 1<br />6 1 11 0<br />7 1 12 1<br />8 1 13 0<br />9 1 14 1<br />10 1 15 0<br />11 1 16 1<br />12 1 17 0<br />13 1 18 1<br />14 1 19 0<br />15 1 20 1<br />16 1 21 0<br />17 1 22 1<br />18 1 23 0<br />19 1 24 1<br />20 1 25 1<br />21 1 26 0<br />22 1 27 1<br />23 1 28 0<br />24 1 29 1<br />25 1 0 0<br />26 1 1 1<br />27 1 2 0<br />28 1 3 1<br />29 1 4 0</p>");
		tabela = "0 0 1 0\n1 0 2 1\n2 0 3 0\n3 0 4 1\n4 0 5 0\n5 0 6 1\n6 0 7 0\n7 0 8 1\n8 0 9 0\n9 0 10 1\n10 0 11 0\n11 0 12 1\n12 0 13 0\n13 0 14 1\n14 0 15 0\n15 0 16 1\n16 0 17 0\n17 0 18 1\n18 0 19 0\n19 0 20 1\n20 0 21 1\n21 0 22 0\n22 0 23 1\n23 0 24 0\n24 0 25 1\n25 0 26 0\n26 0 27 1\n27 0 28 0\n28 0 29 1\n29 0 0 0\n0 1 5 0\n1 1 6 1\n2 1 7 0\n3 1 8 1\n4 1 9 0\n5 1 10 1\n6 1 11 0\n7 1 12 1\n8 1 13 0\n9 1 14 1\n10 1 15 0\n11 1 16 1\n12 1 17 0\n13 1 18 1\n14 1 19 0\n15 1 20 1\n16 1 21 0\n17 1 22 1\n18 1 23 0\n19 1 24 1\n20 1 25 1\n21 1 26 0\n22 1 27 1\n23 1 28 0\n24 1 29 1\n25 1 0 0\n26 1 1 1\n27 1 2 0\n28 1 3 1\n29 1 4 0";
		});

	$("#example6").click(function(){
		$("#descriptionBox").animate({height: "500"}, 1000);
		tipoMaquina = 0;
		qtdEstados = 4;
		$("#ex1").css("display", "block");	
		$("#ex1").append("<center><b><font size='4'>Input</font></b></center><p>0 0 1 0</p><p>0 1 3 1</p><p>1 0 3 1</p><p>1 1 0 1</p><p>2 0 2 1</p><p>2 1 0 1</p><p>3 0 2 1</p><p>3 1 3 1</p>");
		tabela = "0 0 1 0\n0 1 3 1\n1 0 3 1\n1 1 0 1\n2 0 2 1\n3 0 2 1\n3 1 3 1";
	});

	$("#example7").click(function(){
		$("#descriptionBox").animate({height: "600px"}, 1000);
		tipoMaquina = 0;
		qtdEstados = 4;
		$("#ex1").css("display", "block");	
		$("#ex1").append("<center><b><font size='4'>Input</font></b></center><p>0 0 0 1</p><p>0 1 1 1</p><p>1 0 2 1</p><p>1 1 3 1</p><p>2 0 1 1</p><p>2 1 3 1</p><p>3 0 1 1</p><p>3 1 3 1</p>");
		tabela = "0 0 1 0\n1 0 2 0\n2 0 3 1\n3 0 0 1\n0 1 2 0\n1 1 3 1\n2 1 0 1\n3 1 1 0";
	});

	$("#example8").click(function(){
		$("#descriptionBox").animate({height: "600px"}, 1000);
		tipoMaquina = 0;
		qtdEstados = 8;
		$("#ex1").css("display", "block");	
		$("#ex1").append("<center><b><font size='4'>Input</font></b></center><p>0 0 3 0</p><p>1 0 4 1</p><p>2 0 5 0</p><p>3 0 6 0</p><p>4 0 7 1</p><p>5 0 0 1</p><p>6 0 1 1</p><p>7 0 2 0</p><p>0 1 1 1</p><p>1 1 2 1</p><p>2 1 3 0</p><p>3 1 4 1</p><p>4 1 5 0</p><p>5 1 6 0</p><p>6 1 7 1</p><p>7 1 0 1</p>");
		tabela = "0 0 3 0\n1 0 4 1\n2 0 5 0\n3 0 6 0\n4 0 7 1\n5 0 0 1\n6 0 1 1\n7 0 2 0\n0 1 1 1\n1 1 2 1\n2 1 3 0\n3 1 4 1\n4 1 5 0\n5 1 6 0\n6 1 7 1\n7 1 0 1";	
	});

	$("#example9").click(function(){
		$("#descriptionBox").animate({height: "650px"}, 1000);
		tipoMaquina = 0;
		qtdEstados = 8;
		$("#ex1").css("display", "block");	
		$("#ex1").append("<center><b><font size='4'>Input</font></b></center><p>0 0 1 0</p><p>1 0 0 0</p><p>3 0 0 1</p><p>4 0 0 1</p><p>5 0 0 1</p><p>5 0 0 1</p><p>6 0 0 1</p><p>7 0 0 1</p><p>0 1 1 1</p><p>1 1 2 1</p><p>2 1 3 1</p><p>3 1 4 1</p><p>4 1 5 1</p><p>5 1 6 1</p><p>6 1 7 1</p><p>7 1 0 1</p>");
		tabela = "0 0 0 1\n1 0 0 0\n2 0 0 1\n3 0 0 1\n4 0 0 1\n5 0 0 1\n6 0 0 1\n7 0 0 1\n0 1 1 1\n1 1 2 1\n2 1 3 1\n3 1 4 1\n4 1 5 1\n5 1 6 1\n6 1 7 1\n7 1 0 0";
	});
	
	$("#backButton").click(function(){
		sequenciaEntradas = [];
		sequenciaEstados = [];
		sequenciaSaidas = [];
		
		$("#descriptionBox").show();
		$("#descriptionBox").animate({height: "400", width: "20%"});
		$("#statesCanvas").empty();
		$("#thirdScreen").hide();
		$("#statesCanvas").hide();
		$("#backButton").hide();
		$("#mealy").hide();
		$("#botoes").hide();
		$("#firstScreen").show();
	});
	
	$("#example10").click(function(){
		$("#descriptionBox").animate({height: "1300"}, 1000);
		tipoMaquina = 0;
		qtdEstados = 30;
		$("#ex1").css("display", "block");	
		$("#ex1").append("<center><b><font size='4'>Input</font></b></center><p>0 0 1 0<br />1 0 2 1<br />2 0 3 0<br />3 0 4 1<br />4 0 5 0<br />5 0 6 1<br />6 0 7 0<br />7 0 8 1<br />8 0 9 0<br />9 0 10 1<br />10 0 11 0<br />11 0 12 1<br />12 0 13 0<br />13 0 14 1<br />14 0 15 0<br />15 0 16 1<br />16 0 17 0<br />17 0 18 1<br />18 0 19 0<br />19 0 20 1<br />20 0 21 1<br />21 0 22 0<br />22 0 23 1<br />23 0 24 0<br />24 0 25 1<br />25 0 26 0<br />26 0 27 1<br />27 0 28 0<br />28 0 29 1<br />29 0 0 0<br />0 1 5 0<br />1 1 6 1<br />2 1 7 0<br />3 1 8 1<br />4 1 9 0<br />5 1 10 1<br />6 1 11 0<br />7 1 12 1<br />8 1 13 0<br />9 1 14 1<br />10 1 15 0<br />11 1 16 1<br />12 1 17 0<br />13 1 18 1<br />14 1 19 0<br />15 1 20 1<br />16 1 21 0<br />17 1 22 1<br />18 1 23 0<br />19 1 24 1<br />20 1 25 1<br />21 1 26 0<br />22 1 27 1<br />23 1 28 0<br />24 1 29 1<br />25 1 0 0<br />26 1 1 1<br />27 1 2 0<br />28 1 3 1<br />29 1 4 0</p>");
		tabela = "0 0 1 0\n1 0 2 1\n2 0 3 0\n3 0 4 1\n4 0 5 0\n5 0 6 1\n6 0 7 0\n7 0 8 1\n8 0 9 0\n9 0 10 1\n10 0 11 0\n11 0 12 1\n12 0 13 0\n13 0 14 1\n14 0 15 0\n15 0 16 1\n16 0 17 0\n17 0 18 1\n18 0 19 0\n19 0 20 1\n20 0 21 1\n21 0 22 0\n22 0 23 1\n23 0 24 0\n24 0 25 1\n25 0 26 0\n26 0 27 1\n27 0 28 0\n28 0 29 1\n29 0 0 0\n0 1 5 0\n1 1 6 1\n2 1 7 0\n3 1 8 1\n4 1 9 0\n5 1 10 1\n6 1 11 0\n7 1 12 1\n8 1 13 0\n9 1 14 1\n10 1 15 0\n11 1 16 1\n12 1 17 0\n13 1 18 1\n14 1 19 0\n15 1 20 1\n16 1 21 0\n17 1 22 1\n18 1 23 0\n19 1 24 1\n20 1 25 1\n21 1 26 0\n22 1 27 1\n23 1 28 0\n24 1 29 1\n25 1 0 0\n26 1 1 1\n27 1 2 0\n28 1 3 1\n29 1 4 0";
	});
	
	$(document).scroll(function(){ 
		$('#botoes').css('top', 57 + $(this).scrollTop());
		$('#botoes').css('left', $(this).scrollLeft());
		$('#mealy').css('left', 8 + $(this).scrollLeft());
		$('#mealy').css('top', 225 + $(this).scrollTop());
		$('#backButton').css('left', 5 + $(this).scrollLeft());
		$('#backButton').css('top', 5 + $(this).scrollTop());
	});
	
	$(document).on("mouseover", ".line", function() {
		var identification = this.id;
		var res = identification.split("-", 2);
		
		for(var i = 0; i < tabela.length; i += 4){
			if(tabela[i] == res[0] && tabela[i + 2] == res[1]){
				$("#inputMealy").html("<p>input:<br>" + tabela[i + 1] + "</p>");
				$("#outputMealy").html("<p>output:<br>" + tabela[i + 3] + "</p>");
			}
		}
	});
	
	$(document).on("mouseover", ".selfLoop", function() {
		var identification = this.id;
		var res = identification.split("-", 2);
		
		for(var i = 0; i < tabela.length; i += 4){
			if(tabela[i] == res[0] && tabela[i + 2] == res[1]){
				$("#inputMealy").html("<p>input:<br>" + tabela[i + 1] + "</p>");
				$("#outputMealy").html("<p>output:<br>" + tabela[i + 3] + "</p>");
			}
		}
	});
	
	
	$(function() {
		$("#botoes").draggable();
		$("#mealy").draggable();
	});
	
	sequenciaEstados.push(atual);

	$("#submitButton").click(function(){		
		tipoMaquina = parseInt($("input[name='machineType']:checked").val());
		qtdEstados = parseInt($("#qtdEstados").val());
				
		if(tipoMaquina == 0){
			$("#mealy").show();
		}
				
		if($("input[name='resetState']").val() != "")	atual = parseInt($("input[name='resetState']").val());
		else{
			alert("Estado de RESET não inserido, adotando estado de RESET como zero");
			atual = 0;		
		}
		tabela = $("textarea[name='truthTable']").val();
		tabela = tabela.replace( /\n/g, " " ).split(" ");
		$("#descriptionBox").fadeOut(1000, myFunction(tipoMaquina,qtdEstados,tabela));
		$("#backButton").show();	
		$("#state" + atual).css("background-color", HIGHLIGHT_COLOR);
	});
	
	$("#inputButton").click(function(){
		var input = parseInt($("input[name='commit']").val());
		var anterior;
		var find = 0;
		
			for(var i = 0; i < tabela.length; i += 4){
				if(tabela[i] == atual && tabela[i+1] == input){
					find = 1;
					sequenciaSaidas.push(tabela[i+3]);
					anterior = atual;
					atual = tabela[i+2];
					
					$("#state" + atual).animate({backgroundColor: HIGHLIGHT_COLOR}, COLOR_TRANSITION_TIME);
					
					if(anterior != atual){
						$("#" + anterior + "-" + atual).animate({backgroundColor: HIGHLIGHT_COLOR}, COLOR_TRANSITION_TIME);
						$("#" + anterior + "-" + atual).animate({backgroundColor: "white"}, COLOR_TRANSITION_TIME);
					}
					else{
						$("#" + atual + "-" + atual).animate({borderColor: HIGHLIGHT_COLOR}, COLOR_TRANSITION_TIME);
						$("#" + atual + "-" + atual).animate({borderColor: "white"}, COLOR_TRANSITION_TIME);
					}
					
					sequenciaEstados.push(atual);
					sequenciaEntradas.push(input);
					
					if(tipoMaquina == 0){
						for(var j = 0; j < tabela.length; j += 4){
							console.log(tabela[j] + " " + tabela[j + 2]);
							console.log("anterior: " + anterior + " atual: " + atual);
							if(tabela[j] == anterior && tabela[j + 2] == atual && tabela[j + 1] == input){
								$("#inputMealy").html("<p>input:<br>" + tabela[j + 1] + "</p>");
								$("#outputMealy").html("<p>output:<br>" + tabela[j + 3] + "</p>");
							}
						}
						$("#inputMealy").animate({backgroundColor: HIGHLIGHT_COLOR}, COLOR_TRANSITION_TIME);
						$("#inputMealy").animate({backgroundColor: DEFAULT_COLOR}, COLOR_TRANSITION_TIME);
						$("#outputMealy").animate({backgroundColor: HIGHLIGHT_COLOR}, COLOR_TRANSITION_TIME);
						$("#outputMealy").animate({backgroundColor: DEFAULT_COLOR}, COLOR_TRANSITION_TIME);
					}
					
					// contabiliza entrada e saida'
					break;
				}
			}

		// pinta o novo atual
		if(!find){
			alert("Comportamento indefinido para entrada inserida");
		}
		else{
			$("#state" + anterior).animate({backgroundColor: "white"}, COLOR_TRANSITION_TIME);
			if(anterior == atual) $("#state" + anterior).animate({backgroundColor: HIGHLIGHT_COLOR}, COLOR_TRANSITION_TIME);
			
			
		}
	});

	$("#relatorio").click(function(){
		alert("sequência de estados: "+sequenciaEstados + "\n"+ "sequência de entradas: " + sequenciaEntradas + "\n" +  "sequência de saidas: " + sequenciaSaidas);
	});
		
});

function myFunction(machineType, numStates, table){
	$("#statesCanvas").show();
	$("#botoes").show();

	var div = 360 / numStates;
    var radius = numStates * 35;
    
    var topMargin = 120;
    var leftMargin = 270;

    var offsetToParentCenter = numStates * 80 / 2;
    var offsetToChildCenter = 20;
    var totalOffset = offsetToParentCenter - offsetToChildCenter;

    for (var i = 0; i < numStates; ++i){
        $("#statesCanvas").append('<div ' + 'id="state' + i +'" class="circle"></div>');
        
        if(machineType == 0){	
        	$("#statesCanvas").append('<div ' + 'id="box' + i +'" class="box">' + i +'</div>');
			
        }
        else if(machineType == 1){
        	var output = "UNDEFINED";

        	for(var j = 0; j < table.length; j += 4){
				if(table[j] == i){
					output = table[j + 3];
					break;
				}
			}

        	$("#statesCanvas").append('<div ' + 'id="box' + i +'" class="box"><u>&nbsp' + i +' </u><br>' + output + '</div>');
        }

        var y = Math.sin((div * i) * (Math.PI / 180)) * radius;
        var x = Math.cos((div * i) * (Math.PI / 180)) * radius;
        $("#state" + i).css({"top" : (topMargin + y + totalOffset) + "px", "left": (leftMargin + x + totalOffset) + "px"});
        $("#box" + i).css({"top" : (topMargin + y + totalOffset) + "px", "left": (leftMargin + x + totalOffset) + "px"});
    }  

	for (var i = 0; i < table.length; i += 4){
		
		var flag = 1;
		
		if(i != 0){
			for (var j = i - 4; j >= 0; j -= 4){				
				if(table[j] == table[i] && table[j + 2] == table[i + 2]){
					console.log("igual");
					flag = 0;
				}
			}
		}
		
		if(flag == 1){
			console.log(table[i+2]);
			drawArrow(table[i], table[i + 2], radius, leftMargin, topMargin, table[i + 1], table[i + 3], machineType);
		}
	}

	$("#statesCanvas").append('<div ' + 'id="padding"></div>');
	$("#padding").css({"position" : "absolute", "left" : leftMargin + 3 * radius, "height" : "100px", "width" : "100px"});
}

function drawArrow(from, to, radius, leftMargin, topMargin, input, output, machineType){
	var fromx = parseFloat($("#state" + from).css("left")) + SMALL_RADIUS;
	var fromy = parseFloat($("#state" + from).css("top")) + SMALL_RADIUS;
	var tox = parseFloat($("#state" + to).css("left")) + SMALL_RADIUS;
	var toy = parseFloat($("#state" + to).css("top")) + SMALL_RADIUS;

	var length = Math.sqrt(Math.pow(tox -  fromx, 2) + Math.pow(toy -  fromy, 2));
	var angle = Math.atan2(toy - fromy, tox - fromx);
	var alpha = 1 - SMALL_RADIUS/length;
	

	if(length != 0){
		$("#statesCanvas").append('<div ' + 'id="' + from + "-" + to + '" class="line"></div>');
		$("#" + from + "-" + to).css({"width": length + "px", "left":fromx,"top":fromy, "transform":"rotate(" + angle + "rad)"});
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

		$("#statesCanvas").append('<div ' + 'id="' + from + "-" + from +'" class="selfLoop"></div>');
		$("#" + from + "-" + from).css({"background-color": "none", "border-style" : "solid", "border-color" : "white", "top" : (fromy + yCorrectionState) + "px", "left" : (fromx + xCorrectionState) + "px"});
		$("#statesCanvas").append('<div ' + 'id="arrow' + from + "to" + to + '" class="arrow"></div>')
		$("#arrow" + from + "to" + to).css({"left": fromx + xCorrectionArrow + "px", "top": fromy + yCorrectionArrow + "px", "transform":"rotate(" + angle + "rad)"});
	}
}