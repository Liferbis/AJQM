var Gastos2Show = function() {
	$('.ui-icon-power').off('click').on('click', function(event) {
           	event.preventDefault();
           	localStorage.logout == true;
           	window.open("logout.php", "_self");
    	});

    	 localStorage.Page = 0;
      localStorage.MaxPage = 0;

     	var getGastos = function(estado, inicio, estado2) {
        		return $.post( "/../php/AJAX/cargaGastos.php", { "estado":estado, "inicio" : inicio, "estado2" : estado2});
    	     }

          var verificar = function(funcion, id_gasto, id_acreedor, precio) {
              return $.post( "/../php/AJAX/verificargasto.php", { "funcion":funcion, "id_gasto" : id_gasto, "id_acreedor": id_acreedor, "precio" : precio});
          }

    	var cargaGastos = function() {
      		$("#pagination9_info span:eq(0)").html(parseInt(localStorage.Page)*15+1);
         	$("#pagination9_info span:eq(1)").html((parseInt(localStorage.Page)*15)+15);
         	$(".listaDatos9").html("");
        		var estado = $("#gastos2 [data-div='estado'] .ui-btn-active").attr("data-leido");
             var estado2 = $("#gastos2 [data-div='subestado'] .ui-btn-active").attr("data-leido");
             if(estado2==undefined) {
              estado2 ="";
             }
         	getGastos(estado,localStorage.Page, estado2).done( function( response ) {
         		if(response.success ) {
             			var output2 ="";
             			var cont =0;
                			MostrarPaginacion(response.data.contador, "#gastos2");
               			$.each(response.data.gastos, function( key2, value2 ) {
                				output2 = pintarListaGastos(value2, cont, output2);
               				cont++;
            			});
            			output2 +="</tbody></table></div>";
            			$(".listaDatos9").html(output2);
            			$(".fancybox").fancybox();
                      $(".fancybox1").fancybox();
		        } else {
    		               localStorage.MaxPage = 0;
                        localStorage.Page = 0;
                        $("#gastos2 .pagination_info span:eq(0)").html(0);
                        $("#gastos2 .pagination_info span:eq(1)").html(0);
                        $("#gastos2 .pagination_info span:eq(2)").html(0);
		        }
    		})
          	.fail(function(jqXHR, textStatus, errorThrown) {
            		informeErrores(jqXHR.responseText);
        		});
   	}
    	cargaGastos();

      $('#gastos2 div[data-div="estado"] a[data-role="button"]').on('click',  function(event) {
          event.preventDefault();
          $("#gastos2 div[data-div='estado'] .ui-btn-active").toggleClass("ui-btn-active ui-state-persist");
          $("#gastos2 div[data-div='subestado'] .ui-btn-active").toggleClass("ui-btn-active ui-state-persist");
          $(this).toggleClass("ui-btn-active ui-state-persist");
          localStorage.Page = 0;
          cargaGastos();
      });
      $('#gastos2 div[data-div="subestado"] a[data-role="button"]').on('click',  function(event) {
          event.preventDefault();
          if($(this)[0] != $("#gastos2 div[data-div='subestado'] .ui-btn-active")[0]) {
              $("#gastos2 div[data-div='subestado'] .ui-btn-active").toggleClass("ui-btn-active ui-state-persist");
              $(this).toggleClass("ui-btn-active ui-state-persist");
          } else {
              $("#gastos2 div[data-div='subestado'] .ui-btn-active").toggleClass("ui-btn-active ui-state-persist");
          }
          localStorage.Page = 0;
          cargaGastos();
      });

        $("#gastos2 .asig_pagination div a").off('click').on('click', function(event) {
           event.preventDefault();
           var diferente = CambiarPagina($(this).attr("data-page"));
           if(diferente) {
                  cargaGastos();
           }
      });

        $("#gastos2").off('click').on('click', '.btn_veri', function(event) {
          event.preventDefault();
          localStorage.id_gasto = $(this).attr("data-gasto");
          localStorage.id_acreedor = $(this).attr("data-acreedor");
          localStorage.precio = $(this).parents("tr").children("td[data-precio]")[0].attributes[2].nodeValue;
          $("a#verificar_gasto").click();
        });

        var VerificarGasto = function(funcion, id, id_acreedor, precio) {
            verificar(funcion, id, id_acreedor, precio).done( function( response ) {
                  if(response.success ) {
                      popupLoader("Se ha verificado el gasto correctamente");
                      setTimeout(function() {
                            $.mobile.loading( 'hide');
                            cargaInformes();
                      }, 2000);
                  } else {
                      popupLoader("No se ha podido verificar el gasto correctamente");
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
        }

        $("#gastos2").on('click', '.ver_gasto', function(event) {
          event.preventDefault();
          var id = localStorage.id_gasto;
          var idA = localStorage.id_acreedor;
          var funcion = $(this).attr("data-funcion");
          var precio = localStorage.precio;
          localStorage.id_gasto = "";
           localStorage.id_acreedor = "";
           localStorage.precio = "";
          VerificarGasto(funcion, id, idA, precio);
        });
}

var pintarListaGastos = function(value2, cont, output2) {
	value2['Fecha']['date'] = value2['Fecha']['date'].split(" ");
    var fecha = value2['Fecha']['date'][0].split("-");
     fecha = fecha[2]+"/"+fecha[1]+"/"+fecha[0];

	if(cont%2==0) {
		output2 += "<tr class='verificado"+value2['Verificado']+"'>"
	} else {
   		output2 += "<tr class='alt2 verificado"+value2['Verificado']+"' style='background: rgb(235,235,235);'>"
	}
	output2 += "<th class='gast_img' style='text-align:center;'><a class='fancybox' rel='group' href='"+value2['Url']+"' title='N Obra: "+value2['NObra'] +", Total: "+value2['ImpRealGastoA']+"' ><img width='100px;' src='"+value2['Url']+"' alt='' /></th>";
	output2 += "<td class='' style='text-align:center;'><b class='ui-table-cell-label'>Operario</b>"+value2['descOperario']+"</td>"
	output2 += "<td class='' style='text-align:center;'><b class='ui-table-cell-label'>Fecha</b>"+  fecha + "</td>"
	output2 += "<td class='' style='text-align:center;'><b class='ui-table-cell-label'>Obra</b>"+value2['NObra'] + "</td>"
	output2 += "<td class='' style='text-align:center;' data-precio="+value2['ImpRealGastoA']+"><b class='ui-table-cell-label' >Precio</b>"+value2['ImpRealGastoA']+ "</td>"
     output2 += "<td class='' style='text-align:center;'><b class='ui-table-cell-label'>Acreedor</b>"+value2['RazonSocial']+ "</td>"
     if(value2['Verificado']==1) {
      output2 += "<td class='' style='text-align:center;'><b class='ui-table-cell-label'>Precio Acreedor</b>"+value2['PrecioAcreedor']+ "</td>"
          output2 += "<td class='inf_bot' style='text-align:center;'><a href='#' data-role='button' class='btn_infor btn_aprobar' data-gasto="+value2['IDLineaGastoControl']+" data-estado=1> Pagado </a></div></td>";
     } else {
          output2 += "<td class='' style='text-align:center;'><b class='ui-table-cell-label'>Precio Acreedor</b>"+value2['PrecioAcreedor']+ "<br/><a class='fancybox1' rel='group' href='"+value2['UrlAcreedor']+"' title='N Obra: "+value2['NObra'] +", Total: "+value2['ImpRealGastoA']+"' > Ver <img width='0px;' src='"+value2['UrlAcreedor']+"' alt='' /></td>"
          output2 += "<td class='inf_bot' style='text-align:center;'><a href='#' data-role='button' class='btn_veri' data-gasto="+value2['IDLineaGastoControl']+" data-acreedor="+value2['IDAcreedor']+" data-estado=1> Verificar </a></div></td>";
     }

	output2 += "</tr>";

	return output2;
}