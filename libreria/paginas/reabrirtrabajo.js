var ReabrirTrabajoShow = function() {
	$("#NumeroObra7").val(localStorage.nObraAsignar);

	$('.ui-icon-power').off('click').on('click', function(event) {
		event.preventDefault();
		localStorage.logout == true;
		window.open("logout.php", "_self");
    	});

        var getObra = function(nobra, usuario){
                	return $.post( "/../php/AJAX/obras2.php", { "nobra" : nobra, "usuario" : usuario });
        }

         var abrirObra = function(id_operario, desc_operario, obra, trabajos, usuario) {
                	return $.post( "/../php/AJAX/abrir_obra.php", {"id_operario" : id_operario, "desc_operario" : desc_operario ,"obras" : obra, "trabajos" : trabajos,  "usuario" : usuario});
      	}

      	var buscarObras3 = function() {
           	var NumO = $('#NumeroObra7').val();
           	var selector = $("#select_lista").html();
           	var output, output3 ="", output_des;
           	var output_select = "";
           	var trabajos = [];
           	var lista = [];
           	$(".listaDatos8").html("");
           	getObra(NumO, "").done( function( response ) {
                		if( response.success ) {
                    		$.each(response.data.obra, function( key, value ) {
                        			var trabajo_operario = new Object();
                            		if(!output) {
                            			output = pintarDetallesObraReabrir(output, value);
                            		}
                            		if($.inArray(value['IDTrabajo'], trabajos) ==-1) {
                                			output3 = pintarTrabajosReabrir(value, selector);
                            			trabajos.push(value['IDTrabajo']);
                            			$(".listaDatos8").append(output3);
                        			}
		                           trabajo_operario.Trabajo = value['IDTrabajo'];
		                           trabajo_operario.Operario = value["idOperario"];
		                           trabajo_operario.descOperario = value["descOperario"];
		                           trabajo_operario.Estado = value['Estado'];
		                           lista.push(trabajo_operario);
                   		});
                    		for(i=0; i<lista.length; i++) {
                    			texto = TrabajosAbiertoCerradoReabrir(lista);
                        		}
	                           $("#pruebas4 div h3 a").text("Mostrar Datos");
	                           $("#response-container4").buttonMarkup({theme: 'a'});
	                           $("#response-container4").html("<div id='datos_mostrar2' align='left'>" + output+"</div>");
	                           var tabla = $(output3);
	                           $(".oper_tabla").css("color","#000");
                    	} else {
	                           $("#pruebas4 div h3 a").text("No hay datos que mostrar");
	                           $("#response-container4").html('');
	                           $(".listaDatos8").html("");
                    	}
                	}).fail(function(jqXHR, textStatus, errorThrown ) {
                    	informeErrores(jqXHR.responseText);
            	});
         }

         $('#reabrirtrabajo').off('click').on('click', '.SumoSelect .SlectBox', function(e){
                  $(this).parent().children(".multiple").toggleClass('open');
         });

         $('#reabrirtrabajo').on('focusout', '.SumoSelect',function(e) {
                  console.log(e.target);
                  $(".open").toggleClass('open');
         });

        $("#reabrirtrabajo").on('click','.SumoSelect ul li',function(event) {
                  $(this).toggleClass("selected");
                  if($(this).parent().children(".selected").length>0) {
                           $(this).parents(".SumoSelect").children(".SlectBox").children("span").html($(this).parent().children(".selected").length+" Seleccionados");
                  } else {
                           $(this).parents(".SumoSelect").children(".SlectBox").children("span").html("Seleccione un operario");
                  }
         });

     	$('#submit_btn').closest('.ui-btn').hide();

     	$("input#btn_abrir").off('click').on('click', function(e){
     		popupLoader("Abriendo y asignando trabajos...");
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
                        	abrirObra(operarios_seleccionados,operarios2_seleccionados, localStorage.idObraAsignar, trabajos_seleccionados,localStorage.username).done( function( response ) {
                            	if( response.success ) {
                               		popupLoader('Obras Asignadas y Abiertas');
                                		setTimeout(function() {
                                    		$.mobile.loading( 'hide');
                                    		buscarObras3();
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
                        	popupLoader('Tiene que seleccionar alg\u00FAn trabajo y operario primero');
                            	setTimeout(function() {
                                		$.mobile.loading( 'hide');
                           }, 1000);
                  }
         });
	buscarObras3();
}

var pintarDetallesObraReabrir = function(output, value) {
	output = "<p ><span style='font-size :18px;'>Raz\u00F3n Social: </span><span style='font-size :14.5px;'>" + value['RazonSocial'] + "</span></p>";
	output += "<p ><span style='font-size :18px;'>Direcci\u00F3n: </span><span style='font-size :14.5px;'>" + value['Direccion'] + "</span></p>";
	output += "<p ><span style='font-size :18px;'>Poblaci\u00F3n: </span><span style='font-size :14.5px;'>" + value['Poblacion'] + "</span></p>";
	output += "<p ><span style='font-size :18px;'>Provincia: </span><span style='font-size :14.5px;'>" + value['Provincia'] + "</span></p>";
	output += "<p ><span style='font-size :18px;'>Tel\u00E9fono: </span><span style='font-size :14.5px;'>" + value['Telefono'] + "</span></p>";
	output += "<p ><span style='font-size :18px;'>Descripci\u00F3n de la Obra: </span><span style='font-size :14.5px;'>" + value['DescObra'] + "</span></p>";
	$('input[name="idObra_auto"]').val(value['IDObra']);

	return output;
}

var pintarTrabajosReabrir = function(value, selector) {
	output = "";
	if(value['EstadoGlobal']==1 || value['EstadoGlobal']==0) {
    		output3 = "<tr class='estado"+value['EstadoGlobal']+"' data-idobra="+value['IDObra']+" data-idtrabajo="+value['IDTrabajo']+">";
    		output3 +="<td style='text-align: center;' class='tipo'>"+value['DescTrabajo'];
    		output3 +="<p style='font-size:11px;' class='cerrado'></p>";
    		output3 +="<p style='font-size:11px;' class='abierto'></p>";
    		output3 +="<td  class='oper_tabla' style='text-align:center;'>"+selector+"</td>";
    		output3 +="</td></tr>";
	} else {
     		output3 = "<tr class='estado2' data-idobra="+value['IDObra']+" data-idtrabajo="+value['IDTrabajo']+">";
     		output3 += "<td style='text-align: center;' class='tipo' '>"+value['DescTrabajo'] + "</td>";
     		output3 += "<td  class='oper_tabla' style='text-align:center;'>"+selector+"</td>";
      		output3 += "</tr>";
	}
	return output3;
}

var TrabajosAbiertoCerradoReabrir = function(lista) {
	if(lista[i]['Estado']==1) {
                  var texto = $("#reabrirtrabajo tbody tr[data-idtrabajo='"+lista[i]['Trabajo']+"'] .tipo p.cerrado").text();
                  if(texto!="") {
                           $("#reabrirtrabajo tbody tr[data-idtrabajo='"+lista[i]['Trabajo']+"'] .tipo p.cerrado").text(texto+" - "+lista[i]['descOperario']);
                  } else {
                           $("#reabrirtrabajo tbody tr[data-idtrabajo='"+lista[i]['Trabajo']+"'] .tipo p.cerrado").text("Cerrado por: "+lista[i]['descOperario']);
                  }
         } else if(lista[i]['Estado']==0) {
                  var texto = $("#reabrirtrabajo tbody tr[data-idtrabajo='"+lista[i]['Trabajo']+"'] .tipo p.abierto").text();
                  if(texto!="") {
                           $("#reabrirtrabajo tbody tr[data-idtrabajo='"+lista[i]['Trabajo']+"'] .tipo p.abierto").text(texto+" - "+lista[i]['descOperario']);
                  } else {
                           $("#reabrirtrabajo tbody tr[data-idtrabajo='"+lista[i]['Trabajo']+"'] .tipo p.abierto").text("Abierto por: "+lista[i]['descOperario']);
                  }
         } else {
                  console.log("");
         }
         return texto;
}