var OrdenTrabajoReasignarShow = function() {
	localStorage.OrdenObra="";
}

var OrdenTrabajoReasignarCreate = function() {

	var getOperarios = function(operarios) {
         	return $.post( "/../php/AJAX/operarios_select.php", {"operarios": operarios});
    	}

    	var getObrasAsignadas = function(id_obra, usuario, reasignar, estado) {
         	return $.post( "/../php/AJAX/obras_asignadas.php", {"id_obra" : id_obra, "usuario" : usuario, "reasignar" : reasignar, "estado": estado});
    	}

    	var ReasignarObras = function(id_operario , desc_operario, obras, trabajos, usuario, idUsuario) {
         	return $.post( "/php/AJAX/reasignar_obras.php", {"id_operario": id_operario, "desc_operario": desc_operario, "obras" : obras, "trabajos" : trabajos,  "usuario" : usuario, "idUsuario": idUsuario});
    		}

     	$('.ui-icon-power').off('click').on('click', function(event) {
	         event.preventDefault();
	         localStorage.logout == true;
	         window.open("logout.php", "_self");
    	});

    	var getObrasAsignadas_rea = function() {
        		getObrasAsignadas("", localStorage.username, "si",0).done( function( response ) {
                		if(response.success ) {
                     		var output2="<thead><tr><th data-priority='1' >Descripci&oacute;n Trabajo</th><th data-priority='2'>Obra</th><th data-priority='3'>Cliente</th><th data-priority='4'>Operarios</th></tr></thead><tbody>";
                    		$.each(response.data.obra, function( key2, value2 ) {
                            		output2 = pintarObrasAsignadasReAsignar(value2, output2, operarios_t, operarios_s);
                    		});
                    		output2 +="</tbody></table></div>";
                    		$("#reasignar").html(output2);
                    		$(".oper_asig").selectmenu();
                		} else {
                    		$("#lista_d").html('No hay ninguna obra asignada');
                		}
            	})
            	.fail(function(jqXHR, textStatus, errorThrown) {
                		informeErrores(jqXHR.responseText);
            	});
    	}

    	var CargarOperarios = function() {
           	operarios_t = new Array();
           	operarios_s = new Array();
           	getOperarios().done( function( response ) {
                   	if(response.success ) {
                         		var num_oper= 0;
                          		$.each(response.data.operarios, function( key2, value2 ) {
	                                   operarios_t[num_oper] = value2['descOperario'];
	                                   operarios_s[num_oper] = value2['idOperario'];
	                                   num_oper++;
                          		});
                      	}
            	});
            	getObrasAsignadas_rea();
     	}

         $(document).on('click','#button_asignar',function() {
                  var select = $("select.oper_asig");
                  var obras_a = $(".idobra");
                  var asignados = new Array();
                  var asignado = new Array();
                  var desc_asignados = new Array();
                  var desc_asignado = new Array();
                  var trabajo = new Array();
                  var obras = new Array();
                  var cont_asig = 0;
                  for(var i=0; i<select.length; i++) {
	                  if (select[i].value.indexOf("Selecciona") == -1) {
	                          var valor =select[i].value;
	                          valor = valor.split("||");
	                          asignado[cont_asig] = valor[0];
	                          desc_asignado[cont_asig] = valor[1];
	                          trabajo[cont_asig] = select[i].id;
	                          obras[cont_asig] = obras_a[i].textContent;
	                          cont_asig++;
	                  }
                  }
                  asignados[0] = asignado;
                  desc_asignados[0] = desc_asignado;
                  if(cont_asig>0) {
                     	popupLoader("Espere mientras se reasignan las obras por favor...");
                      	ReasignarObras(asignados,desc_asignados,obras, trabajo, localStorage.username, localStorage.idUsuario).done( function( response ) {
                          		if( response.success ) {
                            		popupLoader("Obras reasignadas correctamente");
                                           	setTimeout(function() {
                                                      document.location.reload();
                                           	}, 2000);
                                    } else {
                                          	popupLoader("Ha habido un error al reasignar");
                                             setTimeout(function() {
                                                      $.mobile.loading( 'hide');
                                             }, 2000);
                                    }
                           })
                           .fail(function(jqXHR, textStatus, errorThrown ) {
                                    $.mobile.loading( 'hide');
                                             informeErrores(jqXHR.responseText);
                           });
                  } else {
                           popupLoader("Tienes que seleccionar algun operario antes");
                           setTimeout(function() {
                                    $.mobile.loading( 'hide');
                           }, 2000);
                  }
      	});

 	CargarOperarios();

}

var pintarObrasAsignadasReAsignar = function(value2, output2, operarios_t, operarios_s) {
	output2 += "<tr><th class='title'><b class='ui-table-cell-label'>Descripci&oacute;n</b>"+value2['Descripcion']+"</th>";
	output2 += "<td> <b class='ui-table-cell-label'>Obra</b>";
	output2 += "<span class='idobra' style='display:none;' data-role='none'>"+value2['IDObra']+"</span>";
	output2 += value2['NObra'] + "</td>";
	output2 += "<td><b class='ui-table-cell-label'>Cliente</b>"+value2['DescCliente'] + "</td>";
	output2 += "<td><b class='ui-table-cell-label'>Operarios</b>";
	output2 += "<select name='select-custom-22' class='oper_asig' id='"+value2['IDTrabajo']+"' data-native-menu='false'><option>Selecciona un Operario...</option>";
	var operarios_select = new Array();
	var cont2=0;
	$.each(value2['Operarios'], function( key3, value3 ) {
	         operarios_select[cont2] = value3;
	        cont2++;
	});
	for(var j=0; j<operarios_t.length; j++) {
		var asignado = false;
		for(var m=0; m<operarios_select.length; m++) {
		         if(operarios_select[m]==operarios_t[j]) {
		                  asignado = true;
		                  output2 += "<option value='"+operarios_s[j]+"||"+operarios_t[j]+"' disabled>"+operarios_t[j]+"</option>";
		         }
		         if(m==operarios_select.length -1 && asignado == false) {
		                  output2 += "<option value='"+operarios_s[j]+"||"+operarios_t[j]+"'>"+operarios_t[j]+"</option>";
		         }
		}
	}
         output2 += "</td></tr>";
         return output2;
}