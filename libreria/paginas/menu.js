var menuShow = function() {
	var user = $("#footer_span span").text();
	user = user.split("Usuario ");
	localStorage.username= user[1];
	localStorage.idUsuario = $("#id_us").html();
	localStorage.OrdenObra = "";
}

var menuCreate = function() {
	$('[data-icon="power"]').off('click').on('click', function(event) {
      		event.preventDefault();
       		localStorage.logout == true;
       		window.open("logout.php", "_self");
    	});
         $(".vacaciones_url").off('click').on('click', function(event) {
    		event.preventDefault();
  		window.open("AgendaVacaciones/", "_self");
  	});
}