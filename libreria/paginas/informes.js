var InformesShow = function() {
	localStorage.Page = 0;
    	localStorage.MaxPage = 0;

     	$('.ui-icon-power').off('click').on('click', function(event) {
         	event.preventDefault();
         	localStorage.logout == true;
         	window.open("logout.php", "_self");
    	});

    	var getinformes = function(estado, inicio) {
         	return $.post( "/../php/AJAX/cargaInformes.php", { "estado" : estado, "inicio" : inicio });
    	}

    	var AprobarInforme = function(idinforme, estado) {
         	return $.post( "/../php/AJAX/aprobarInforme.php", { "idinforme" : idinforme, "estado":estado});
    	}

    	$('#informes div[data-div="estado"] a[data-role="button"]').on('click',  function(event) {
         	event.preventDefault();
         	$("#informes .ui-btn-active").toggleClass("ui-btn-active ui-state-persist");
         	$(this).toggleClass("ui-btn-active ui-state-persist");
         	localStorage.Page = 0;
         	cargaInformes();
    	});

    	var cargaInformes = function() {
         	$(".listaDatosI").html("");
         	var leido = $("#informes .ui-btn-active").attr("data-leido");
         	getinformes(leido,localStorage.Page).done( function( response ) {
         		if(response.success ) {
              			var output ="";
              			var cont =0;
              			MostrarPaginacion(response.data.contador, "#informes");
              				$.each(response.data.informes, function( key2, value2 ) {
                   				value2['FechaDesde']['date'] = value2['FechaDesde']['date'].split(" ");
                   				value2['FechaHasta']['date'] = value2['FechaHasta']['date'].split(" ");
                   				var pintar = pintarInformes(output, leido, cont, value2['IDInforme'], value2['DescOperario'],  value2['FechaDesde']['date'][0], value2['FechaHasta']['date'][0], value2['NObra'], value2['FechaCreacionAudi']['date']);
                   				output = pintar[0];
                   				cont = pintar[1];
             				});
              				output +="</tbody></table></div>";
              				$(".listaDatosI").html(output);
         			} else {
             				localStorage.MaxPage = 0;
             				localStorage.Page = 0;
             				$("#informes .pagination_info span:eq(0)").html(0);
             				$("#informes .pagination_info span:eq(1)").html(0);
             				$("#informes .pagination_info span:eq(2)").html(0);
         		}
    		})
    		.fail(function(jqXHR, textStatus, errorThrown) {
       			informeErrores(jqXHR.responseText);
    		});
	}

    	$("#informes .asig_pagination div a").off('click').on('click', function(event) {
	         event.preventDefault();
	         var diferente = CambiarPagina($(this).attr("data-page"));
	         if(diferente) {
	              	cargaInformes();
	         }
     	});
     	cargaInformes();

    	$("#informes").off('click').on('click', '.btn_aprobar, .btn_desaprobar', function(event) {
         	popupLoader("Modificando estado del informe...");
          	event.preventDefault();
          	var informe = $(this).attr("data-informe");
          	var estado = $(this).attr("data-estado");
         	AprobarInforme(informe, estado).done( function( response ) {
              		if(response.success ) {
                   		popupLoader("Estado del informe "+informe+" modificado correctamente");
                   		setTimeout(function() {
                       			$.mobile.loading( 'hide');
                       			cargaInformes();
                  		}, 2000);
              		} else {
                   		popupLoader("No se ha podido modificar el estado el informe correctamente");
	                   	setTimeout(function() {
	                      		$.mobile.loading( 'hide');
	                  	}, 1500);
              		}
         	})
        		.fail(function(jqXHR, textStatus, errorThrown) {
	          	popupLoader("Ha ocurrido un error");
	                	setTimeout(function() {
	                      	$.mobile.loading( 'hide');
	                 	}, 1500);
              		informeErrores(jqXHR.responseText);
         	});
     	});

}

var pintarInformes = function(output, leido, cont, idInforme, descripcion, FechaD, FechaH, NObra, FechaC) {
        if(cont%2==0) {
              	output += "<tr class=''>"
         } else {
              	output += "<tr class='alt2' style='background: rgb(235,235,235);'>"
         }
         output += "<th class=''>"+idInforme+"</th>"
         output += "<td class=''><b class='ui-table-cell-label'>Operario</b>"+descripcion+"</td>"
         output += "<td class=''><b class='ui-table-cell-label'>Desde</b>"+    FechaD+ "</td>"
         output += "<td class='tipo'><b class='ui-table-cell-label'>Hasta</b>"+FechaH + "</td>"
         output += "<td class=''><b class='ui-table-cell-label'>Obra</b>"+NObra + "</td>"
         output += "<td class='tipo'><b class='ui-table-cell-label'>Fecha Creacion</b>"+FechaC +"</td>"
         output += "<td><a target='_blank' href='informes/"+idInforme+".pdf'><b class='ui-table-cell-label'>Link Informe</b>Ver</a></td>"
         if(leido==0) {
             	output += "<td class='inf_bot'><a href='#' data-role='button' class='btn_infor btn_aprobar' data-informe="+idInforme+" data-estado=1> Informar </a></div></td>";
         } else {
              	output += "<td class='inf_bot'><a href='#' data-role='button' class='btn_infor btn_desaprobar' data-informe="+idInforme+" data-estado=0> No informado </a></td>";
         }
         output += "</tr>";
         cont++;
         return  [output, cont];
}