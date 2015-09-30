var AsignarTrabajoShow = function() {
	$("#NumeroObra6").val(localStorage.nObraAsignar);

         $('.ui-icon-power').off('click').on('click', function(event) {
	         event.preventDefault();
	         localStorage.logout == true;
	         window.open("logout.php", "_self");
    	});

         var getObra = function(nobra, usuario){
                  return $.post( "/../php/AJAX/obras.php", { "nobra" : nobra, "usuario" : usuario });
         }

         var asignarObra = function(id_operario, desc_operario, obra, trabajos, usuario) {
                	return $.post( "/../php/AJAX/asignar_obras.php", {"id_operario" : id_operario, "desc_operario" : desc_operario ,"obras" : obra, "trabajos" : trabajos,  "usuario" : usuario});
         }

	var buscarObras = function() {
                  var NumO = $('#NumeroObra6').val();
		var selector = $("#select_lista").html();
		var output, output3 ="", output_des;
		var output_select = "";
		var trabajos = [];
                  var lista = [];

                  $(".listaDatos6").html("");
                  getObra(NumO, "").done( function( response ) {
                           if( response.success ) {
                                    $.each(response.data.obra, function( key, value ) {
                                    var trabajo_operario = new Object();
                                          	if(!output) {
                                          	      	pintarDetalleObraAsignar(value);
                                             }
                                             if($.inArray(value['IDTrabajo'], trabajos) ==-1) {
                                                  	output3 = pintarTrabajosEstadoAsignar(value, selector);
                                                  	trabajos.push(value['IDTrabajo']);
                                                  	$(".listaDatos6").append(output3);
                                            }
                                             trabajo_operario.Trabajo = value['IDTrabajo'];
                                             trabajo_operario.Operario = value["idOperario"];
                                             trabajo_operario.descOperario = value["descOperario"];
                                             lista.push(trabajo_operario);
                                    });
                                    for(i=0; i<lista.length; i++) {
                                       	var dataval =lista[i]['Operario'];
                                       	$("#asignartrabajo tbody [data-idtrabajo='"+lista[i]['Trabajo']+"'] [data-val*='"+dataval+"']").addClass("disabled");
                                    }

                                    $("#pruebas3 div h3 a").text("Mostrar Datos");
                                    var tabla = $(output3);
                                    $(".oper_tabla").css("color","#000");
                           } else {
                                    $("#pruebas3 div h3 a").text("No hay datos que mostrar");
                                    $("#response-container3").html('');
                                    $(".listaDatos6").html("");
                                }
                        })
                        	.fail(function(jqXHR, textStatus, errorThrown ) {
                                 	informeErrores(jqXHR.responseText);
                        	});
           	}

                  $('#asignartrabajo').off('click').on('click', '.SumoSelect .SlectBox', function(e){
                        	$(this).parent().children(".multiple").toggleClass('open');
                  });

                  $('#asignartrabajo').on('focusout', '.SumoSelect',function(e) {
                         	console.log(e.target);
                         	$(".open").toggleClass('open');
                  });

                  $("#asignartrabajo").on('click','.SumoSelect ul li',function(event) {
                          $(this).toggleClass("selected");
                          if($(this).parent().children(".selected").length>0) {
                              	$(this).parents(".SumoSelect").children(".SlectBox").children("span").html($(this).parent().children(".selected").length+" Seleccionados");
                          } else {
                              	$(this).parents(".SumoSelect").children(".SlectBox").children("span").html("Seleccione un operario");
                          }
                 });

         $('#NumeroObra6').keyup(function(e){
                  localStorage.nObraAsignar ="";
                  e.preventDefault();
                  buscarObras();
         });

         $("#NumeroObra6").change(function(event) {
                  localStorage.nObraAsignar ="";
                  buscarObras();
         });

         $('#submit_btn').closest('.ui-btn').hide();

     	$("input#btn_asignar").off('click').on('click', function(e){
         	popupLoader("Asignando Obras...");
          	var trabajos_seleccionados = [];
          	var operarios_seleccionados = [];
           	var operarios2_seleccionados = [];

                	for(var i=0; i<$(".oper_tabla  .selected").length; i++) {
                  	var operario_id = $(".oper_tabla .selected:eq("+i+")").attr("data-val").split("|");
                  	trabajos_seleccionados.push($(".oper_tabla .selected:eq("+i+")").parents("tr").attr("data-idtrabajo"));
                  	operarios_seleccionados.push(operario_id[0]);
                  	operarios2_seleccionados.push(operario_id[0]);
                	}

          	if(trabajos_seleccionados.length>0) {
                        	asignarObra(operarios_seleccionados,operarios2_seleccionados, localStorage.idObraAsignar, trabajos_seleccionados,localStorage.username).done( function( response ) {
                            	if( response.success ) {
                              		popupLoader('Obras Asignadas');
                              		setTimeout(function() {
                                    		$.mobile.loading( 'hide');
                                    		buscarObras();
                              		}, 1000);
                            	}
                        	})
                        	.fail(function(jqXHR, textStatus, errorThrown ) {
                          		popupLoader('Ha habido un error al asignar las obras');
                          		setTimeout(function() {
                                		$.mobile.loading( 'hide');
                          		}, 1000);
                          		informeErrores(jqXHR.responseText);
                        	});
                  } else {
                      	popupLoader('Tiene que seleccionar algun operario antes');
                          	setTimeout(function() {
                                	$.mobile.loading( 'hide');
                          	}, 1000);
                  }
         });
	buscarObras();

}

var pintarDetalleObraAsignar = function(value) {
	output = "<p ><span style='font-size :18px;'>Raz\u00F3n Social: </span><span style='font-size :14.5px;'>" + value['RazonSocial'] + "</span></p>";
	output += "<p ><span style='font-size :18px;'>Direcci\u00F3n: </span><span style='font-size :14.5px;'>" + value['Direccion'] + "</span></p>";
	output += "<p ><span style='font-size :18px;'>Poblaci\u00F3n: </span><span style='font-size :14.5px;'>" + value['Poblacion'] + "</span></p>";
	output += "<p ><span style='font-size :18px;'>Provincia: </span><span style='font-size :14.5px;'>" + value['Provincia'] + "</span></p>";
	output += "<p ><span style='font-size :18px;'>Tel\u00E9fono: </span><span style='font-size :14.5px;'>" + value['Telefono'] + "</span></p>";
	output += "<p ><span style='font-size :18px;'>Descripci\u00F3n de la Obra: </span><span style='font-size :14.5px;'>" + value['DescObra'] + "</span></p>";
	$('input[name="idObra_auto"]').val(value['IDObra']);

         $("#response-container3").buttonMarkup({theme: 'a'});
         $("#response-container3").html("<div id='datos_mostrar2' align='left'>" + output+"</div>");

}

var pintarTrabajosEstadoAsignar = function(value, selector) {
	if(value['Estado']==1) {
                  output3 = "<tr class='estado"+value['Estado']+"' data-idobra="+value['IDObra']+" data-idtrabajo="+value['IDTrabajo']+"><td style='text-align: center;' class='tipo' '>"+value['DescTrabajo'] + "</td><td  class='oper_tabla' style='text-align:center;'></td></tr>";
         } else if(value['Estado']==0) {
                  output3 = "<tr class='estado"+value['Estado']+"' data-idobra="+value['IDObra']+" data-idtrabajo="+value['IDTrabajo']+"><td style='text-align: center;' class='tipo' '>"+value['DescTrabajo'] + "</td><td  class='oper_tabla' style='text-align:center;'>"+selector+"</td></tr>";
         } else {
                  output3 = "<tr class='estado2' data-idobra="+value['IDObra']+" data-idtrabajo="+value['IDTrabajo']+"><td style='text-align: center;' class='tipo' '>"+value['DescTrabajo'] + "</td><td  class='oper_tabla' style='text-align:center;'>"+selector+"</td></tr>";
         }
         return output3;
}