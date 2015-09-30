var Busqueda2Show = function() {

	var getObrasBusqueda = function(direccion, fechaA, fechaB) {
           	return $.post( "/../php/AJAX/getObrasBusqueda.php", { "direccion" : direccion, "fechaA" : fechaA, "fechaB" : fechaB});
     	}

 	var cargarObras = function() {
  		fechaA =$("#fech_searchD").val();
  		fechaB =$("#fech_searchH").val();
        		getObrasBusqueda(localStorage.IDDireccion, fechaA, fechaB).done( function( response ) {
            		if( response.success ) {
             			output ="";
              			$("#list_obras_direc").html("");
                 			$.each(response.data.obra, function( key, value ) {
                      			output += "<li class='estado"+value['Estado']+"'><a><p data-num='"+value['NObra']+"'>"+value['NObra']+" - "+value['DescObra'] + "<input value='"+value['DescObra']+"' style='visibility:hidden;width:0; height:0;' ></p></a></li>";
                 			});
                 			$("#list_obras_direc").html(output);
                 			$("#list_obras_direc li").off('click').on('click', function(event) {
                         			event.preventDefault();
                         			localStorage.anterior = "#busqueda2";
                         			localStorage.SearchNumObra = $(this).children("a").children("p").attr("data-num");
                         			$.mobile.changePage( "index2.php#busqueda3", {changeHash: false });
	                 		});
	                 		$("#list_obras_direc").listview('refresh');
	            	} else {
	              		$("#list_obras_direc").html("");
	              		popupLoader('No hay obras con esos parametros');
	                        	setTimeout(function() {
	                                	$.mobile.loading( 'hide');
	                      	}, 2000);
	            	}
	         })
	         .fail(function(jqXHR, textStatus, errorThrown ) {
	              	informeErrores(jqXHR.responseText);
	         });
	}

	$("#fech_searchD, #fech_searchH").date({
	         changeMonth: true,
	         changeYear: true,
	         firstDay: 1,
	         maxDate: 0,
	         dateFormat: 'dd/mm/yy',
	         monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
	         monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
	         dayNames: ['Domingo', 'Lunes', 'Martes', 'MiÃ©rcoles', 'Jueves', 'Viernes', 'Sabado'],
	         dayNamesShort: ['Dom','Lun','Mar','MiÃ©','Juv','Vie','Sab'],
	         dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sa'],
	});

	$("#fech_searchD, #fech_searchH").keydown(function(event) {
	         event.preventDefault();
	         return false;
	});

      	$("#fech_searchH").val(new Date().toJSONLocal2());

      	$("#fech_searchD, #fech_searchH").change(function(event) {
            	cargarObras();
      	});

      	cargarObras();
}