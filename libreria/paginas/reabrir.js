var ReabrirShow = function() {
	localStorage.asignarPageF = 0;
      	$('.ui-icon-power').off('click').on('click', function(event) {
          	 event.preventDefault();
           	localStorage.logout == true;
           	window.open("logout.php", "_self");
   	 });

     	var getObrasFinalizadas = function(id_obra, pagination, filtro) {
        		return $.post( "/../php/AJAX/obras_finalizadas.php", {"id_obra" : id_obra, "pagination":pagination, "filter" : filtro});
    	}

	var cargaObrasFinalizadas = function(id_obra) {
     		$('body,html').animate({scrollTop : 0}, 200);
    		$(".listaDatos7").html("");
     		var selector = $("#select_lista").html();
     		var  filtro = $("#search_finalizadas").val();
        		getObrasFinalizadas(id_obra, localStorage.asignarPageF, filtro).done( function( response ) {
            		if(response.success ) {
                			var output5="";
                			var cont=0;
                			$(".listaDatos7").html("");
                			MostrarPaginacion(response.data.contador, "#reabrir");
                			$.each(response.data.obra, function( key2, value2 ) {
                      			var pintar = pintarObrasReabrir(cont, value2['NObra'], value2['IDObra'], value2['IDTrabajo'], value2['NObra'], value2['DescObra'], value2['Cliente']);
                           		$(".listaDatos7").append(pintar[0]);
                           		$(".enl_asignar").button();
                        			cont = pintar[1]+1;
                 			});
                 			output ="</tbody></table></div>";
                 			$(".listaDatos7").append(output);
                 			terminado = true;
            		} else {
		                  localStorage.MaxPage = 0;
		                  localStorage.Page = 0;
		                  $("#reabrir .pagination_info span:eq(0)").html(0);
		                  $("#reabrir .pagination_info span:eq(1)").html(0);
		                  $("#reabrir .pagination_info span:eq(2)").html(0);
            		}
        		})
	         .fail(function(jqXHR, textStatus, errorThrown) {
	            	informeErrores(jqXHR.responseText);
	         });
    	}
    	cargaObrasFinalizadas("");

    	$("#reabrir .asig_pagination div a").off('click').on('click', function(event) {
          	event.preventDefault();
          	var diferente = CambiarPagina($(this).attr("data-page"));
          	if(diferente) {
             		cargaObrasFinalizadas("");
         	}
    	});

    	$("#search_finalizadas").keyup(function(event) {
        		cargaObrasFinalizadas("");
    	});

    	$("#search_finalizadas").change(function(event) {
         	cargaObrasFinalizadas("");
    	});

    	$("#reabrir tbody").off('click').on('click', 'tr', function(event) {
        		event.preventDefault();
        		localStorage.idObraAsignar = $(this).attr("data-idobra");
        		localStorage.nObraAsignar = $(this).attr("data-Nobra");
        		$.mobile.changePage( "index2.php#reabrirtrabajo", {changeHash: false });
    	});
}


 var pintarObrasReabrir = function(cont, NObra, IDObra, IDTrabajo, NObra, Descripcion, Cliente) {
         output = "<tr class='' data-num="+cont+" data-nobra="+NObra+" data-idobra="+IDObra+" data-idtrabajo="+IDTrabajo+">";
         output +=" <th class='numero_tabla' style='text-align: center;'>"+NObra+"</th>";
         output += "<td style='text-align: center;' class=''><b class='ui-table-cell-label'>Descripci&oacute;n</b>"+Descripcion + "</td>";
         output += "<td style='text-align: center;' class='tipo' '><b class='ui-table-cell-label'>Cliente</b>"+Cliente+ "";
         output += "</td></tr>";
         return [output, cont];
    }