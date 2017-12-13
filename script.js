$(document).ready(function(){
	$("#descriptionBox").fadeIn(3000);
	$("#submitButton").click(function(){
		alert("Máquina: " + $("input[name=machineType]:checked").val());
	});
});


