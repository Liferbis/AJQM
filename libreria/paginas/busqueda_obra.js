var BusquedaObraShow = function() {
	var getdatos2 = function(idtrabajo, idobra) {
           	return $.post( "/../php/AJAX/cargaDatos.php", { "idtrabajo" : idtrabajo, "idobra" : idobra });
     	}

      	var cargaDatos2 = function() {
           	getdatos2(localStorage.idTrabajo_search, localStorage.idObra_search).done( function( response ) {
                		if(response.success ) {
                      		var output2="";
                     		var cont=0;
                     		$.each(response.data.datos, function( key2, value2 ) {
                     			output2 = PintarDatosBusqueda(value2, cont, output2);
                     			cont++;
                     		});
                     		output2 +="</tbody></table></div>";
                    		$(".listaDatosB").html(output2);
                		} else {
                     		$(".listaDatosB").html('No ha habido suerte: ' + response.data.message);
                 		}
           	})
           	.fail(function(jqXHR, textStatus, errorThrown) {
             	 	informeErrores(jqXHR.responseText);
          	 });
      	}
      cargaDatos2();
}

var PintarDatosBusqueda = function(value2, cont, output2) {
	if(cont%2==0) {
                  output2 += "<tr class='"+value2['Tipo']+"'>";
         } else {
                  output2 += "<tr class='"+value2['Tipo']+" alt2'>";
         }
	var fecha = value2['FechaCreacionAudi']['date'].split(" ");
	fecha1 = fecha[0];
	fecha1 = fecha1.split("-");
	fecha1 = fecha1[2]+"/"+fecha1[1]+"/"+fecha1[0]+" "+fecha[1];
  	output2 += "<td class='td_idmat2'><b class='ui-table-cell-label label2'>Tipo</b>"+value2['Tipo']+"<span style='display: none;' class='span_id'>-"+value2['ID']+"</span></td>";
  	output2+=  "<td class='td_idmat2'><b class='ui-table-cell-label label2'>Fecha</b>"+fecha1 + "</td>";
  	output2 += "<td class='tipo' ><b class='ui-table-cell-label label2'>Usuario</b>"+value2['UsuarioAudi'] + "</td>";
  	output2 += "<td class='td_idmat2' '><b class='ui-table-cell-label label2'>Descripci&oacute;n</b>"+value2['Descripcion'] + "</td>";
  	output2 += "<td class='tipo' '><b class='ui-table-cell-label label2'>Valor</b>"+value2['Valor'] + "</td>";
  	output2 +="</tr>";

  	return output2;
}