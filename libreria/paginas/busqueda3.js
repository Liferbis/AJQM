var Busqueda3Show = function() {
    $("#NumeroObra5").val(localStorage.SearchNumObra);
    $("#NumeroObra5").keyup();
    $("#search_list_trab li.estado0, #search_list_trab li.estado2 li.estado1, #search_list_trab li.estado0, #search_list_trab li.estado2").off('click', "**");
}

var Busqueda3Create = function() {

        var getObradetails2 = function(nobra, usuario){
                  return $.post( "/../php/AJAX/obras.php", { "nobra" : nobra, "usuario" : usuario });
         }

         $("#busqueda3 [data-role='header'] div[data-role='controlgroup'] .ui-btn-icon-left").attr("href", localStorage.anterior);

         $('.ui-icon-power').off('click').on('click', function(event) {
                  event.preventDefault();
                  localStorage.logout == true;
                  window.open("logout.php", "_self");
         });

        var buscarObra2 = function() {
                  var NumO = $('#NumeroObra5').val();
                  var salida="", output3 ="";
                  var trabajos = [];
                  var lista = [];

                  getObradetails2(NumO, localStorage.username).done( function( response ) {
                          if( response.success ) {
                                   $.each(response.data.obra, function( key, value ) {
                                             var trabajo_operario = new Object();
                                             if(salida=="") {
                                                  salida = pintarObraDetalleClienteBusqueda(value,  NumO);
                                             }
                                             if($.inArray(value['IDTrabajo'], trabajos) ==-1) {
                                                 output3 = pintarObraDetalleTrabajosBusqueda(value, output3);
                                                 trabajos.push(value['IDTrabajo']);
                                             }
                                             trabajo_operario.Trabajo = value['IDTrabajo'];
                                             trabajo_operario.Operario = value["idOperario"];
                                             trabajo_operario.descOperario = value["descOperario"];
                                             trabajo_operario.Estado = value['Estado'];
                                             lista.push(trabajo_operario);
                                    });
                                    $("#prueba2 div h3 a").text("Mostrar Datos");
                                    $("#response-container32").buttonMarkup({theme: 'a'});
                                    $("#response-container32").html("<div id='datos_mostrar3' align='left'>" + salida+"</div>");
                                    $("#search_list_trab").html(output3);
                                    var tabla = $(output3);
                                    $("#search_list_trab").listview("refresh");
                                    $("#search_list_trab li.estado0, #search_list_trab li.estado2, li.estado1, #search_list_trab li.estado0").off('click').on('click', function(e){
                                             $('input[name="IDTrabajo_search"]').val($(this).attr('data-idtrabajo'));
                                             $('input[name="Trabajo_search"]').val($(this).find("input").val());
                                             $('input[name="estadoTrabajo_search"]').val("Finalizada");
                                             localStorage.idTrabajo_search = $(this).attr('data-idtrabajo');
                                             localStorage.idObra_search = $(this).attr('data-idobra');
                                             $( "#btn_confirm_search" ).click();
                                    });

                                    for(i=0; i<lista.length; i++) {
                                         TrabajoAbiertoCerrado(lista);
                                    }
                           } else {
                                    $("#prueba2 div h3 a").text("No hay datos que mostrar");
                                    $("#response-container32").html('');
                                    $("#idObra_search").val("");
                                    $("#search_list_trab").html("");
                           }
                  })
                  .fail(function(jqXHR, textStatus, errorThrown ) {
                           informeErrores(jqXHR.responseText);
                   });
         }

        //Buscar Numero de Obra
         $('#NumeroObra5').keyup(function(e){
                  e.preventDefault();
                  buscarObra2();
        });

        $("#NumeroObra5").change(function(event) {
                  localStorage.SearchNumObra ="";
                  buscarObra2();
        });

        $('#submit_btn').closest('.ui-btn').hide();
                  $('#my-form2').submit( function () {
                  e.preventDefault();
                  $.mobile.changePage("busqueda_obra");
         });
}

var pintarObraDetalleClienteBusqueda = function(value, NumO) {
  var output = "";
    output = "<p ><span style='font-size :18px;'>Raz\u00F3n Social: </span><span style='font-size :14.5px;'>" + value['RazonSocial'] + "</span></p>";
    output += "<p ><span style='font-size :18px;'>Direcci\u00F3n: </span><span style='font-size :14.5px;'>" + value['Direccion'] + "</span></p>";
    output += "<p ><span style='font-size :18px;'>Poblaci\u00F3n: </span><span style='font-size :14.5px;'>" + value['Poblacion'] + "</span></p>";
    output += "<p ><span style='font-size :18px;'>Provincia: </span><span style='font-size :14.5px;'>" + value['Provincia'] + "</span></p>";
    output += "<p ><span style='font-size :18px;'>Tel\u00E9fono: </span><span style='font-size :14.5px;'>" + value['Telefono'] + "</span></p>";
    output += "<p ><span style='font-size :18px;'>Descripci\u00F3n de la Obra: </span><span style='font-size :14.5px;'>" + value['DescObra'] + "</span></p>";
    var fecha = value['FechaInicio']['date'].split(" ");
    fecha = fecha[0].split("-");
    $('input[name="DescObra_search"]').val(value['DescObra']);
    $('input[name="DescCliente_search"]').val(value['RazonSocial']);
    $('input[name="idObra_search"]').val(value['IDObra']);
    $('input[name="nObra_search"]').val(NumO);
    $('input[name="Fecha_search"]').val(fecha[2]+"/"+fecha[1]+"/"+fecha[0]);

    return output;
}

var pintarObraDetalleTrabajosBusqueda = function(value, output3) {
    if(value['cUsuario']==localStorage.username) {
         output3 += "<li data-idobra="+value['IDObra']+" data-idtrabajo="+value['IDTrabajo']+" class='estado"+value['Estado']+"'><a><p class='"+value['IDTrabajo']+"'>"+value['DescTrabajo'] + "<input value='"+value['DescTrabajo']+"' style='visibility:hidden;width:0; height:0;' ></p><p style='font-size:11px;' class='cerrado'></p><p style='font-size:11px;' class='abierto'></p></a></li>";
     } else {
         if(!value['Estado']){
              value['Estado']=value['EstadoGlobal'];
         }
         output3 += "<li data-idobra="+value['IDObra']+" data-idtrabajo="+value['IDTrabajo']+" class='estado"+value['Estado']+"'><a><p class='"+value['IDTrabajo']+"'>"+value['DescTrabajo'] + "<input value='"+value['DescTrabajo']+"' style='visibility:hidden;width:0; height:0;' ></p><p style='font-size:11px;' class='cerrado'></p><p style='font-size:11px;' class='abierto'></p></a></li>";
     }
     return output3;
}

var TrabajoAbiertoCerrado = function(lista, output) {
    if(lista[i]['Estado']==1) {
         var texto = $("#busqueda3 li[data-idtrabajo='"+lista[i]['Trabajo']+"']  p.cerrado").text();
         if(texto!="") {
             $("#busqueda3 li[data-idtrabajo='"+lista[i]['Trabajo']+"']  p.cerrado").text(texto+" - "+lista[i]['descOperario']);
         } else {
              $("#busqueda3 li[data-idtrabajo='"+lista[i]['Trabajo']+"']  p.cerrado").text("Cerrado por: "+lista[i]['descOperario']);
         }
     } else if(lista[i]['Estado']==0) {
         var texto = $("#busqueda3 li[data-idtrabajo='"+lista[i]['Trabajo']+"']  p.abierto").text();
         if(texto!="") {
              $("#busqueda3 li[data-idtrabajo='"+lista[i]['Trabajo']+"']  p.abierto").text(texto+" - "+lista[i]['descOperario']);
         } else {
             $("#busqueda3 li[data-idtrabajo='"+lista[i]['Trabajo']+"']  p.abierto").text("Abierto por: "+lista[i]['descOperario']);
         }
     } else {
         console.log("");
     }
}

