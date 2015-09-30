var AutoAsignarCreate = function() {

	$('.ui-icon-power').off('click').on('click', function(event) {
           	event.preventDefault();
           	localStorage.logout == true;
           	window.open("logout.php", "_self");
   	});

         var getObra = function(nobra, usuario){
               	return $.post( "/../php/AJAX/obras.php", { "nobra" : nobra, "usuario" : usuario });
         }

         var autoasignar = function(obra, trabajos, usuario) {
                	return $.post( "/../php/AJAX/asignar_obras2.php", {"obra" : obra, "trabajos" : trabajos,  "usuario" : usuario});
       	}

	var buscarObras = function() {
                  var NumO = $('#NumeroObra4').val();
                  var output, output3 ="", output_des;
                  var output_select;
                  var trabajos = [];
                  getObra(NumO, localStorage.username).done( function( response ) {
                           if( response.success ) {
                                   	$.each(response.data.obra, function( key, value ) {
                                   		respuesta = pintarObra(output, value, output3, trabajos);
                                   		output = respuesta[0];
                                   		output3 = respuesta[1];
                                   		trabajos = respuesta[2];
                                    });
                                    $("#pruebas div h3 a").text("Mostrar Datos");
                                    $("#response-container2").buttonMarkup({theme: 'a'});
                                    $("#response-container2").html("<div id='datos_mostrar2' align='left'>" + output+"</div>");
                                    $("#list_trab2").html(output3);
                                    var tabla = $(output3);
                                    $("#list_trab2").listview("refresh");
                                    $("#list_trab2 li").off('click').on('click', function(event) {
                                    	if($(this).children("a").attr('class').indexOf("ui-icon-check")>= 0) {
                                                      $(this).data('icon', 'carat-r');
                                                      $(this).children("a").css({background: '#f6f6f6'});
                                                      $(this).children("a").css({color: '#333'});
                                                      $(this).children("a").addClass("ui-icon-carat-r").removeClass("ui-icon-check");
                                             } else {
                                                      $(this).data('icon', 'check');
                                                      $(this).children("a").css({background: 'green'});
                                                      $(this).children("a").css({color: '#fff'});
                                                      $(this).children("a").addClass("ui-icon-check").removeClass("ui-icon-carat-r");
                                             }
                                    });
                           } else {
                                    $("#pruebas div h3 a").text("No hay datos que mostrar");
                                    $("#response-container2").html('');
                                    $("#list_trab2").html("");
                           }
                  })
                  .fail(function(jqXHR, textStatus, errorThrown ) {
                           informeErrores(jqXHR.responseText);
                  });
         }

         //Buscar Numero de Obra
         $('#NumeroObra4').keyup(function(e){
                  localStorage.NumObra ="";
                  e.preventDefault();
                  buscarObras();
         });

         $("#NumeroObra4").change(function(event) {
                  localStorage.NumObra ="";
                  buscarObras();
         });

         $('#submit_btn').closest('.ui-btn').hide();

         $("#btn_autoasignar").off('click').on('click', function(event) {
                  event.preventDefault();
                  if($(".ui-icon-check").length>0) {
                  	popupLoader("Asignando trabajos...");
                           var trabajos = new Array();
                           var asignado = new Array();
                           var desc_asignados = new Array();
                           var desc_asignado = new Array();
                           for(var i=0; i<$(".ui-icon-check").length; i++) {
                                    trabajos[i] = $(".ui-icon-check")[i].children[0].className;
                           }
                           var obra = $('input[name="idObra_auto"]').val();
                        	autoasignar(obra, trabajos, localStorage.username).done( function( response ) {
                            	if(response.success) {
                            		popupLoader("Trabajos Asignados");
                                    	setTimeout(function() {
                                        		$.mobile.loading( 'hide');
                                       		localStorage.NumObra ="";
                                       		buscarObras();
                                 		}, 1000);
                            	} else {
                              		popupLoader("Ha habido un error al asignar los trabajos");
                               		setTimeout(function() {
                                        		$.mobile.loading( 'hide');
                                		}, 1000);
                            	}
                        	})
                       	.fail(function(jqXHR, textStatus, errorThrown ) {
                           	popupLoader("Ha ocurrido un error interno");
                           	setTimeout(function() {
                                        	$.mobile.loading( 'hide');
                                 	}, 1000);
                           	informeErrores(jqXHR.responseText);
                             });
                  } else {
                        	popupLoader("Tiene que seleccionar algun trabajo para poder asignartelo");
                        	setTimeout(function() {
                                	$.mobile.loading( 'hide');
                      	}, 2000);
                  }
         });
}

var pintarObra = function(output, value, output3, trabajos) {
	if(!output) {
                  output = "<p ><span style='font-size :18px;'>Raz\u00F3n Social: </span><span style='font-size :14.5px;'>" + value['RazonSocial'] + "</span></p>";
                  output += "<p ><span style='font-size :18px;'>Direcci\u00F3n: </span><span style='font-size :14.5px;'>" + value['Direccion'] + "</span></p>";
                  output += "<p ><span style='font-size :18px;'>Poblaci\u00F3n: </span><span style='font-size :14.5px;'>" + value['Poblacion'] + "</span></p>";
                  output += "<p ><span style='font-size :18px;'>Provincia: </span><span style='font-size :14.5px;'>" + value['Provincia'] + "</span></p>";
                  output += "<p ><span style='font-size :18px;'>Tel\u00E9fono: </span><span style='font-size :14.5px;'>" + value['Telefono'] + "</span></p>";
                  output += "<p ><span style='font-size :18px;'>Descripci\u00F3n de la Obra: </span><span style='font-size :14.5px;'>" + value['DescObra'] + "</span></p>";
                  $('input[name="idObra_auto"]').val(value['IDObra']);
         }
         if($.inArray(value['IDTrabajo'], trabajos) ==-1) {
                  if(value['cUsuario']==localStorage.username) {
                           console.log("entro");
                  } else {
                           if(value['EstadoGlobal']!=1)
                                    output3 += "<li class='estado2'><a><p class='"+value['IDTrabajo']+"'>"+value['DescTrabajo'] + "<input value='"+value['DescTrabajo']+"' style='visibility:hidden;width:0; height:0;' ></p></a></li>";
                 }
                 trabajos.push(value['IDTrabajo']);
         }
	return [output, output3, trabajos];
}