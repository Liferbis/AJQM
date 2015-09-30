var AsignarShow = function() {
	localStorage.Page = 0;
         localStorage.MaxPage = 0;

     $('.ui-icon-power').off('click').on('click', function(event) {
         event.preventDefault();
         localStorage.logout == true;
         window.open("logout.php", "_self");
    	});

    	var getObrasSinAsignar = function(id_obra, pagination, filtro, estado) {
        	return $.post( "/../php/AJAX/trabajos_asignadas.php", {"id_obra" : id_obra, "pagination":pagination, "filter" : filtro, "estado" : estado});
    	}

    	var cargaObrasEstadoAsignacion = function(id_obra) {
         $('body,html').animate({scrollTop : 0}, 200);
         $(".listaDatos3").html("");
         var estado = $("#asignar div[data-id='foo1'] a.ui-btn-active").attr("data-estado");
         var selector = $("#select_lista").html();
         var  filtro = $("#search_sinasignar").val();
         getObrasSinAsignar(id_obra, localStorage.Page, filtro, estado).done( function( response ) {
            	if(response.success ) {
                    	var cont=0;
                    	MostrarPaginacion(response.data.contador, "#asignar");
                    	$.each(response.data.obra, function( key2, value2 ) {
                           var pintar = pintarEstadoAsignacionObras(cont, value2['NObra'], value2['IDObra'], value2['IDTrabajo'], value2['NObra'], value2['DescObra'], value2['Cliente']);
                           $(".listaDatos3").append(pintar[0]);
                           $(".enl_asignar").button();
                        	cont = pintar[1]+1;
                    	});
                    	output ="</tbody></table></div>";
                     	$(".listaDatos3").append(output);
                     	terminado = true;
             } else {
                  localStorage.MaxPage = 0;
                  localStorage.Page = 0;
                  $("#asignar .pagination_info span:eq(0)").html(0);
                  $("#asignar .pagination_info span:eq(1)").html(0);
                  $("#asignar .pagination_info span:eq(2)").html(0);
            	}
        	})
        	.fail(function(jqXHR, textStatus, errorThrown) {
             informeErrores(jqXHR.responseText);
        	});
    	}

    	cargaObrasEstadoAsignacion("");

    	$("#asignar .asig_pagination div a").off('click').on('click', function(event) {
                 event.preventDefault();
                 var diferente = CambiarPagina($(this).attr("data-page"));
                 if(diferente) {
                     	cargaObrasEstadoAsignacion("");
                 }
    	});

    	$("#search_sinasignar").keyup(function(event) {
        cargaObrasEstadoAsignacion("");
   	});

    	$("#search_sinasignar").change(function(event) {
        	cargaObrasEstadoAsignacion("");
    	});

    	$("#asignar tbody").off('click').on('click', 'tr', function(event) {
         event.preventDefault();
         localStorage.idObraAsignar = $(this).attr("data-idobra");
         localStorage.nObraAsignar = $(this).attr("data-Nobra");
         $.mobile.changePage( "index2.php#asignartrabajo", {changeHash: false });
    	});

    $("#asignar").off('click').on('click', '[data-id="foo1"] a', function(event) {
        event.preventDefault();
        if($(this)[0].className.indexOf("ui-btn-active") < 0) {
             $("div[data-id='foo1'] a").toggleClass("ui-btn-active ui-state-persist");
              cargaObrasEstadoAsignacion("");
         }
     });
}

var pintarEstadoAsignacionObras = function(cont, NObra, IDObra, IDTrabajo, NObra, Descripcion, Cliente) {
     output = "<tr class='' data-num="+cont+" data-nobra="+NObra+" data-idobra="+IDObra+" data-idtrabajo="+IDTrabajo+">";
     output +=" <th class='numero_tabla' style='text-align: center;'>"+NObra+"</th>";
     output += "<td style='text-align: center;' class=''><b class='ui-table-cell-label'>Descripci&oacute;n</b>"+Descripcion + "</td>";
     output += "<td style='text-align: center;' class='tipo' '><b class='ui-table-cell-label'>Cliente</b>"+Cliente+ "";
     output += "</td></tr>";
     return [output, cont];
}