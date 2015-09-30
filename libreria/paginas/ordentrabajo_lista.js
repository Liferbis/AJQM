var OrdenTrabajoListaShow = function() {
	localStorage.OrdenObra="";
}

var OrdenTrabajoListaCreate = function() {

	var getObrasAsignadas = function(id_obra, usuario, reasignar, estado) {
         	return $.post( "../php/AJAX/obras_asignadas.php", {"id_obra" : id_obra, "usuario" : usuario, "reasignar" : reasignar, "estado" : estado});
     	}

    	$('.ui-icon-power').off('click').on('click', function(event) {
           	event.preventDefault();
           	localStorage.logout == true;
           	window.open("logout.php", "_self");
    	});

    	var cargarAsignadas = function(estado) {
         	$("#asignadas").html("");
         	$("#datos_ordenes").css("display", "block");
         	$("#NumeroObra").val("");
         	$("#NumeroObra").keyup();
         	getObrasAsignadas("", localStorage.username, "", estado).done( function( response ) {
              		if(response.success ) {
                  		var output2="<thead><tr><th data-priority='1' >Descripci&oacute;n Obra</th><th data-priority='2'>Obra</th><th data-priority='3'>Cliente</th><th data-priority='4'>Operarios</th></tr></thead><tbody style='font-size: 12px;'>";
                  		var cont=0;
                  		$.each(response.data.obra, function( key2, value2 ) {
	                       		output2 = pintarListaObrasAsignadasOperario(cont,output2, value2);
	                       		cont++;
                  		});
	                  	output2 +="</tbody>";
	                  	$("#asignadas").html(output2);
	                  	$("#asignadas tbody tr").off('click').on('click', function(e){
	                  		localStorage.NumObra=$(this).find(".inp_no").val();
	                      		$(".search_btn_orden").click();
	                  	});
	              	} else {
	                  	$("#lista_d").html('No hay ninguna obra asignada');
	              	}
	         })
	         .fail(function(jqXHR, textStatus, errorThrown) {
	              informeErrores(jqXHR.responseText);
	         });
	}

     	$('#my-form2').submit( function () {
            	e.preventDefault();
            	$.mobile.changePage("ordenobra");
        	});

     	$("#ordentrabajo_lista div[data-div='estado'] a").off('click').on('click', function(event) {
          	event.preventDefault();
         	if($(this)[0].className.indexOf("ui-btn-active") < 0) {
              		$("div[data-div='estado'] a").toggleClass("ui-btn-active ui-state-persist");
              		if($("div[data-div='estado'] a.ui-btn-active").html() == "Finalizadas") {
                   		cargarAsignadas(1);
              		} else {
                  		 cargarAsignadas(0);
             		}
         	}
    	});

    	cargarAsignadas(0);

}

var pintarListaObrasAsignadasOperario = function(cont, output2, value2) {
	if(cont%2==0) {
	         output2 += "<tr class='estados"+value2['Estado']+"' style='cursor:pointer;'>"
	} else {
	         output2 += "<tr class='estados"+value2['Estado']+"' style='background: #E6E6E6; cursor:pointer;'>"
	}
	output2 +="<th><b class='ui-table-cell-label'>Descripci&oacute;n</b>"+value2['Descripcion'];
	output2 +="<input value='"+value2['Descripcion']+"' style='visibility:hidden;width:0; height:0;' class='inp_desc'>";
	output2 +="<input value='"+value2['IDTrabajo']+"' style='visibility:hidden;width:0; height:0;' class='inp_idt'>";
	output2 +="<input value='"+value2['IDObra']+"' style='visibility:hidden;width:0; height:0;' class='inp_ido'>";
	output2 +="<input value='"+value2['NObra']+"' style='visibility:hidden;width:0; height:0;' class='inp_no'>";
	output2 +="<input value='"+value2['DescCliente']+"' style='visibility:hidden;width:0; height:0;' class='inp_clie'>";
	output2 +="<input value='"+value2['DescObra']+"' style='visibility:hidden;width:0; height:0;' class='inp_desco'>";
	output2 +="<span data-role='none' style='display:none;' class='idtr_span'>"+value2['IDTrabajo']+"</span></th>";
	output2 +="<td> <b class='ui-table-cell-label'>Obra</b>"+  value2['NObra'] + "</td>";
	output2 +="<td><b class='ui-table-cell-label'>Cliente</b>"+value2['DescCliente'] + "</td>";
	output2 +="<td class='table_oper' style='text-align:center;'><b class='ui-table-cell-label'>Operarios</b>";

	var cont2=0;
	$.each(value2['Operarios'], function( key3, value3 ) {
		if(cont2%2==0) {
	                  	output2 +="<span style='padding: 2px; background:#c2c2c2;'>"+ value3 + "</span><br>";
		} else {
	                  	output2 +="<span style='padding: 2px;'>"+ value3 + "</span><br>";
		}
		cont2++;
	});
	output2 += "</td></tr>";
	return output2;
}