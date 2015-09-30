var OrdenTrabajoShow = function() {
	localStorage.OrdenObra = "";
     	$("#NumeroObra").val(localStorage.NumObra);
     	$("#NumeroObra").keyup();
     	$("#list_trab li.estado0, #list_trab li.estado2, #list_trab li.estado1").off('click','**');
}

var OrdenTrabajoCreate = function() {

	var getObradetails = function(nobra, usuario){
        		return $.post( "/../php/AJAX/obras.php", { "nobra" : nobra, "usuario" : usuario });
  	}

     	var buscarObra = function() {
         	var NumO = $('#NumeroObra').val();
         	var output, output2 ="", output_des;
         	var trabajos = [];
         	getObradetails(NumO, localStorage.username).done( function( response ) {
	             	if( response.success ) {
	                 		$.each(response.data.obra, function( key, value ) {
	                       		if(!output) {
	                           		pintarObraDetalleCliente(value['RazonSocial'], value['Direccion'], value['Poblacion'], value['Provincia'], value['Telefono'], value['DescObra'], value['FechaInicio'], NumO, value['IDObra']);
	                       		}
	                       		if($.inArray(value['IDTrabajo'], trabajos) ==-1) {
	                          			output2 = pintarObraDetalleTrabajos(value['cUsuario'], value['IDTrabajo'], value['DescTrabajo'], value['EstadoGlobal'], value['Estado'], output2);
	                           		trabajos.push(value['IDTrabajo']);
	                      		}
	                  	});
	                  	$("#prueba div h3 a").text("Mostrar Datos");
	                  	$("#list_trab").html(output2);
	                  	var tabla = $(output2);
	                  	$("#list_trab").listview("refresh");

	                  	$("#list_trab li.estado0, #list_trab li.estado2, #list_trab li.estado1").off('click').on('click', function(e){
	                       		$('input[name="IDTrabajo"]').val($(this).find("p").attr('class'));
	                       		$('input[name="Trabajo"]').val($(this).find("input").val());
	                       		if($(this)[0].className.indexOf("estado1") >= 0) {
	                           		$('input[name="estadoTrabajo"]').val("Finalizada");
	                           		localStorage.EstadoObra = 1;
	                       		} else {
	                           		$('input[name="estadoTrabajo"]').val("No Finalizada");
	                           		localStorage.EstadoObra = 0;
	                       		}
	                       		$('input[name="Fecha"]').val();
	                       		localStorage.idTrabajo = $(this).find("p").attr('class');
	                       		localStorage.idObra = $("input[name='idObra']").val();
	                       		$( "#btn_confirm" ).click();
	                 		});

	             	} else {
	                  	$("#prueba div h3 a").text("No hay datos que mostrar");
	                  	$("#response-container").html('');
	                  	$("#idObra").val("");
	                  	$("#list_trab").html("");
	              	}
	         })
	         .fail(function(jqXHR, textStatus, errorThrown ) {
	              	informeErrores(jqXHR.responseText);
	         });
	}

	$('.ui-icon-power').off('click').on('click', function(event) {
	         event.preventDefault();
	         localStorage.logout == true;
	         window.open("logout.php", "_self");
	});

	//Buscar Numero de Obra
	$('#NumeroObra').keyup(function(e){
	         localStorage.NumObra ="";
	         e.preventDefault();
	         buscarObra();
	});

	$("#NumeroObra").change(function(event) {
	         localStorage.NumObra ="";
	         buscarObra();
	});

	$('#submit_btn').closest('.ui-btn').hide();

	$('#my-form').submit( function () {
	         e.preventDefault();
	         $.mobile.changePage("ordenobra");
	});

}

var pintarObraDetalleCliente = function(RazonSocial, Direccion, Poblacion, Provincia, Telefono, Descripcion, FechaInicio, NumO, IDObra) {
	output = "<p ><span style='font-size :18px;'>Raz\u00F3n Social: </span><span style='font-size :14.5px;'>" + RazonSocial + "</span></p>";
	output += "<p ><span style='font-size :18px;'>Direcci\u00F3n: </span><span style='font-size :14.5px;'>" + Direccion + "</span></p>";
	output += "<p ><span style='font-size :18px;'>Poblaci\u00F3n: </span><span style='font-size :14.5px;'>" + Poblacion + "</span></p>";
	output += "<p ><span style='font-size :18px;'>Provincia: </span><span style='font-size :14.5px;'>" + Provincia + "</span></p>";
	output += "<p ><span style='font-size :18px;'>Tel\u00E9fono: </span><span style='font-size :14.5px;'>" + Telefono + "</span></p>";
	output += "<p ><span style='font-size :18px;'>Descripci\u00F3n de la Obra: </span><span style='font-size :14.5px;'>" + Descripcion + "</span></p>";
	var fecha = FechaInicio['date'].split(" ");
	fecha = fecha[0].split("-");
	$('#ordentrabajo input[name="DescObra"]').val(Descripcion);
	$('#ordentrabajo input[name="DescCliente"]').val(RazonSocial);
	$('#ordentrabajo input[name="idObra"]').val(IDObra);
	$('#ordentrabajo input[name="nObra"]').val(NumO);
	$('#ordentrabajo input[name="Fecha"]').val(fecha[2]+"/"+fecha[1]+"/"+fecha[0]);
	$("#ordentrabajo #response-container").buttonMarkup({theme: 'a'});
	$("#ordentrabajo #response-container").html("<div id='datos_mostrar' align='left'>" + output+"</div>");
}

var pintarObraDetalleTrabajos = function(cUsuario, IDTrabajo, DescTrabajo, EstadoGlobal, Estado, output2) {
	if(cUsuario==localStorage.username) {
	         output2 += "<li class='estado"+Estado+"'><a><p class='"+IDTrabajo+"'>"+DescTrabajo + "<input value='"+DescTrabajo+"' style='visibility:hidden;width:0; height:0;' ></p></a></li>";
	} else {
	         if(EstadoGlobal==0) {
	                  Estado = 2;
	         } else {
	                  Estado = 1;
	         }
	         output2 += "<li class='estado"+Estado+"'><a><p class='"+IDTrabajo+"'>"+DescTrabajo + "<input value='"+DescTrabajo+"' style='visibility:hidden;width:0; height:0;' ></p></a></li>";
	}
	return output2;
}