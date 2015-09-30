var OperarioObraShow = function() {
    $('.ui-icon-power').off('click').on('click', function(event) {
          event.preventDefault();
          localStorage.logout == true;
          window.open("logout.php", "_self");
    });

    localStorage.Page = 0;
    localStorage.MaxPage = 0;
    $("#fech_oper_desde, #fech_oper_hasta").date({
          changeMonth: true,
          changeYear: true,
          firstDay: 1,
          maxDate: 0,
          dateFormat: 'yy-mm-dd',
          monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
          dayNames: ['Domingo', 'Lunes', 'Martes', 'MiÃ©rcoles', 'Jueves', 'Viernes', 'Sabado'],
          dayNamesShort: ['Dom','Lun','Mar','MiÃ©','Juv','Vie','Sab'],
          dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sa'],
     });
    $("#fech_oper_hasta").val(new Date().toJSONLocal());
     var getObrasAsignadasOperario = function(pagination, filtro, usuario, estado, fechaD, fechaH) {
         return $.post( "/../php/AJAX/obras_operario.php", { "pagination":pagination, "filter" : filtro, "usuario" : usuario, "estado": estado, "fechaD": fechaD, "fechaH":fechaH});
     }

     $("#operarioObra").on('click', 'div[data-id="foo1"] a[data-role="button"]', function(event) {
           event.preventDefault();
          $(".ui-btn-active").toggleClass("ui-btn-active ui-state-persist");
          $(this).toggleClass("ui-btn-active ui-state-persist");
          if($("#operarioObra select").val()!=0) {
               localStorage.Page = 0;
               cargarObrasOperario();
           }
     });

     $("#fech_oper_hasta, #fech_oper_desde").change(function(event) {
          cargarObrasOperario();
     });

     $("#operarioObra").on('change', 'select', function(event) {
          event.preventDefault();
          cargarObrasOperario();
     });

    var cargarObrasOperario = function() {
      $('body,html').animate({scrollTop : 0}, 200);
      $(".listaDatos9").html("");
        var  filtro = $("#search_operario").val();
        var usuario = $("#operarioObra select").val();
        var estado = $("#operarioObra .ui-btn-active").attr("data-estado");
        var fechaD = $("#fech_oper_desde").val();
        var fechaH = $("#fech_oper_hasta").val();
        var newD = fechaD.replace(/\-/g, '');
        var newH = fechaH.replace(/\-/g, '');
        getObrasAsignadasOperario(localStorage.Page, filtro, usuario, estado, newD, newH).done( function( response ) {
            if(response.success ) {
                var output="";
                var cont=0;
                $(".listaDatos9").html("");
                MostrarPaginacion(response.data.contador, "#operarioObra");
               //$("#asig_pagination").html(response.data.contador);
                $.each(response.data.obra, function( key2, value2 ) {
                    output = pintarObrasOperario(cont, value2);
                    $(".listaDatos9").append(output);
                    cont++;
                });
                output ="</tbody></table></div>";
                 $(".listaDatos9").append(output);


                terminado = true;
            } else {
                    localStorage.MaxPage = 0;
                    localStorage.Page = 0;
                    $("#operarioObra .pagination_info span:eq(0)").html(0);
                    $("#operarioObra .pagination_info span:eq(1)").html(0);
                    $("#operarioObra .pagination_info span:eq(2)").html(0);
            }
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            informeErrores(jqXHR.responseText);
        });

    }

        $("#operarioObra .asig_pagination div a").off('click').on('click', function(event) {
      event.preventDefault();
      var diferente = CambiarPagina($(this).attr("data-page"));
           if(diferente) {
                  cargarObrasOperario();
           }
    });
    $("#search_operario").keyup(function(event) {
              cargarObrasOperario();
    });
    $("#search_operario").change(function(event) {
               cargarObrasOperario();
    });

        $("#operarioObra tbody").off('click').on('click', 'tr', function(event) {
                event.preventDefault();
                localStorage.SearchNumObra = $(this).attr("data-nobra");
                localStorage.anterior = "#operarioObra";
               $.mobile.changePage( "index2.php#busqueda3", {changeHash: false });
          //window.open("index2.php#asignartrabajo","_self");
    });
}

var pintarObrasOperario = function(cont, value2) {
    output = "<tr class='' data-num="+cont+" data-nobra="+value2['NObra']+" data-idobra="+value2['IDObra']+" data-idtrabajo="+value2['IDTrabajo']+">";
    output += "<th class='numero_tabla' style='text-align: center;'>"+value2['NObra']+"</th>";
    output += "<td style='text-align: center;' class=''><b class='ui-table-cell-label'>Descripci&oacute;n</b>"+   value2['DescObra'] + "</td>";
    output += "<td style='text-align: center;' class='tipo' '><b class='ui-table-cell-label'>Cliente</b>"+value2['Cliente'] + "</td>";
    output += "</tr>";
    return output;
}