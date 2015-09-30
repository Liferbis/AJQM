var OrdenesTerminadasShow = function() {
	$('.ui-icon-power').off('click').on('click', function(event) {
           	event.preventDefault();
           	localStorage.logout == true;
           	window.open("logout.php", "_self");
    	});

    	localStorage.Page = 0;
         localStorage.MaxPage = 0;

     	var getOrdenesPendientes = function(estado, inicio) {
        		return $.post( "/../php/AJAX/cargaPendientes.php", { "estado":estado, "inicio" : inicio});
    	}

    	var actualizarEstadoObra =  function(idObraEstado) {
        		return $.post( "/../php/AJAX/entregarObra.php", { "idObraEstado":idObraEstado});
    	}

    	var cargaObrasPendientes = function() {
      		var estado = $("#ordenes_terminadas .ui-btn-active").attr("data-leido");
         	$(".listaDatosOT").html("");
         	getOrdenesPendientes(estado,localStorage.Page).done( function( response ) {
         		if(response.success ) {
             			var output2 ="";
             			var cont =0;
             			MostrarPaginacion(response.data.contador, "#ordenes_terminadas");
               			$.each(response.data.pendientes, function( key2, value2 ) {
               				output2 = pintarOrdenesTerminadas(value2, output2, estado, cont);
                				cont++;
            			});
            			output2 +="</tbody></table></div>";
            			$(".listaDatosOT").html(output2);
        			} else {
          			localStorage.MaxPage = 0;
		                  localStorage.Page = 0;
		                  $("#ordenes_terminadas .pagination_info span:eq(0)").html(0);
		                  $("#ordenes_terminadas .pagination_info span:eq(1)").html(0);
		                  $("#ordenes_terminadas .pagination_info span:eq(2)").html(0);
        			}
    		})
          	.fail(function(jqXHR, textStatus, errorThrown) {
            		informeErrores(jqXHR.responseText);
        		});
    	}

    	$('#ordenes_terminadas div[data-div="estado"] a[data-role="button"]').on('click',  function(event) {
        		event.preventDefault();
        		$("#ordenes_terminadas .ui-btn-active").toggleClass("ui-btn-active ui-state-persist");
        		$(this).toggleClass("ui-btn-active ui-state-persist");
        		localStorage.Page = 0;
      	 	cargaObrasPendientes();
    	});
    	cargaObrasPendientes();

    	$("#ordenes_terminadas").off('click').on('click', ".btn_infor.btn_aprobar", function(event) {
      		event.preventDefault();
      		var id = $(this).attr("data-obra");
      		actualizarEstadoObra(id).done( function( response ) {
                           if( response.success ) {
                               	popupLoader('Estado de la Obra modificado correctamente');
                                	setTimeout(function() {
                                    	$.mobile.loading( 'hide');
                                  		cargaObrasPendientes();
                                	}, 1000);
                           }
                  })
                  .fail(function(jqXHR, textStatus, errorThrown ) {
                           popupLoader('Ha habido un error al modificar el estado de la obra');
                           setTimeout(function() {
                                	$.mobile.loading( 'hide');
                           }, 1000);
                           informeErrores(jqXHR.responseText);
                  });
    	});

    	$("#ordenes_terminadas .asig_pagination div a").off('click').on('click', function(event) {
                 event.preventDefault();
                 var diferente = CambiarPagina($(this).attr("data-page"));
                 if(diferente) {
                     	cargaObrasPendientes();
                 }
    	});

}

var pintarOrdenesTerminadas = function(value2, output2, estado, cont) {
	if(cont%2==0) {
		output2 += "<tr class=''>"
	} else {
		output2 += "<tr class='alt2' style='background: rgb(235,235,235);'>"
	}
		output2+=  "<td class='td_idmat2' style='text-align:center;'><b class='ui-table-cell-label label2'>NObra</b>"+value2['NObra'] + "</td>";
		output2 += "<td class='tipo'  style='text-align:center;'><b class='ui-table-cell-label label2'>Operario</b>"+value2['descOperario'] + "</td>";
		output2 += "<td class='td_idmat2'  style='text-align:center;'><b class='ui-table-cell-label label2'>Fecha</b>"+value2['FechaCerrado']['date'] + "</td>";
	if(estado==1) {
		output2 += "<td class='td_idmat2'  style='text-align:center;'><b class='ui-table-cell-label label2'>Fecha Terminada</b>"+value2['FechaEntregado']['date'] + "</td>";
		output2 +="<td class='inf_bot' style='text-align:center;'><a href='#' data-role='button' class='btn_infor btn_aprobar' data-obra="+value2['IDEstadoObra']+" data-estado=1> No Recibido </a></div></td>";
         } else {
                  output2 += "<td class='td_idmat2'  style='text-align:center;'><b class='ui-table-cell-label label2'>Fecha Entrega</b>---</td>";
                  output2 +="<td class='inf_bot' style='text-align:center;'><a href='#' data-role='button' class='btn_infor btn_aprobar' data-obra="+value2['IDEstadoObra']+" data-estado=1> Recibido </a></div></td>";
         }
         output2 += "</tr>";

         return output2;
}