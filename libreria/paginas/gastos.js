var GastosCreate = function() {
	var idObra;

    	$('.ui-icon-power').off('click').on('click', function(event) {
           	event.preventDefault();
           	localStorage.logout == true;
           	window.open("logout.php", "_self");
    	});

    	var getObradetails = function(nobra, usuario){
         	return $.post( "/../php/AJAX/obras_gastos.php", { "nobra" : nobra, "usuario" : usuario });
    	}

    	var insertarInforme = function(descOperario, FechaDesde, FechaHasta,NObra, UsuarioAudi) {
        		return $.post("../php/AJAX/insertarInforme.php", { "descOperario" : descOperario, "FechaDesde": FechaDesde, "FechaHasta" : FechaHasta, "NObra": NObra, "UsuarioAudi" : UsuarioAudi});
    	}

    	var guardarPDF = function(NObra, FechaDesde, FechaHasta,UsuarioAudi) {
                	return $.post("../php/AJAX/guardarPdf.php", { "NObra" : NObra, "FechaDesde": FechaDesde, "FechaHasta" : FechaHasta, "UsuarioAudi" : UsuarioAudi});
    	}

   	 var enviarEmail = function(mail, asunto, mensaje, usuario) {
                	return $.post("../php/AJAX/enviar_mail.php", { "mail" : mail, "asunto": asunto, "mensaje" : mensaje, "usuario" : usuario});
    	}

   	var enviarEmailAdjunto = function(mail, asunto, mensaje, usuario) {
                	return $.post("../php/AJAX/enviar_mail_adjunto.php", { "mail" : mail, "asunto": asunto, "mensaje" : mensaje, "usuario" : usuario});
    	}

     var FechaGasto = function(usuario) {
        return $.post("../php/AJAX/fecha_gasto.php", { "usuario" : usuario});
     }

     var PrimeraFecha = function() {
        FechaGasto(localStorage.username).done( function( response ) {
                if( response.success ) {
                    $('#fecha_desde').val(new Date().toJSONLocalMonth());
                        var fecha = response.data.fecha['date'].split(" ");
                        $('#fecha_desde').val(fecha[0]);
                        $('#datepicker_env').val(fecha[0]);
                  } else {
                            $('#fecha_desde').val(new Date().toJSONLocalMonth());
                            $('#datepicker_env').val(new Date().toJSONLocalMonth());
                  }
              })
              .fail(function(jqXHR, textStatus, errorThrown ) {
                  informeErrores(jqXHR.responseText);
              });
     }

    	$("#fecha_desde, #fecha_hasta").date({
            	changeMonth: true,
            	changeYear: true,
            	firstDay: 1,
            	maxDate: 0,
            	dateFormat: 'yy-mm-dd',
            	monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        		monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
        		dayNames: ['Domingo', 'Lunes', 'Martes', 'MiÃ©rcoles', 'Jueves', 'Viernes', 'Sabado'],
        		dayNamesShort: ['Dom','Lun','Mar','MiÃ©','Jue','Vie','Sab'],
        		dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sa'],
         });

   	$("#fecha_desde").off('click').on('click', function(){
        		$("#fecha_desde").datepicker( "show" );
    	});
      	$("#fecha_hasta").off('click').on('click', function(){
        		$("#fecha_hasta").datepicker( "show" );
    	});


	//RELLENAMOS lOS CAMPOS INICIALES
	$('#fecha_hasta').val(new Date().toJSONLocal());
	$('#datepicker2_env').val(new Date().toJSONLocal());
	$("[name='Usuario']").val(localStorage.username);
    PrimeraFecha();

      	var verificarObra = function(value) {
        		if(value!="") {
        			getObradetails(value, localStorage.username).done( function( response ) {
           			if( response.success ) {
                				$('#crearPDF').prop('disabled',false);
                        			$("#numeroG").val($("#NumeroObra2").val());
                        			$("#numeroG2").val($("#NumeroObra2").val());
                        			$("[name='idobra']").val(idObra);
                       			$('#crearPDF').parent().css("background", "#9FF781");
            			} else {
                        			$('#crearPDF').prop('disabled', true);
                         			$('#crearPDF').parent().css("background", "#FA5858");
             			}
        			})
        			.fail(function(jqXHR, textStatus, errorThrown ) {
            			informeErrores(jqXHR.responseText);
        			});
      		}
    	}

    	verificarObra("");

    	$("#crearPDF").off('click').on('click', function(){
               	$('#verificar').css("display", "initial");
               	$("[name='usuario2']").val(localStorage.username);
               	$("[name='fecha_desde2']").val(fecha_desde);
               	$("[name='fecha_hasta2']").val(fecha_hasta);
               	if($("#NumeroObra2").val()!="") {
                          $("[name='nObra2']").val(nObra);
                	}
                	$("[name='fecha_desde']").prop('disabled',true);
                	$("[name='fecha_hasta']").prop('disabled',true);
    	});

    	$("#NumeroObra2, #fecha_desde2, #fecha_hasta2").keyup(function() {
          	$("[name='fecha_desde']").prop('disabled',false);
          	$("[name='fecha_hasta']").prop('disabled',false);
          	$('#verificar').css("display", "none");
                  if($("#NumeroObra2").val()=="") {
                           $('#crearPDF').prop("disabled", false);
                           $('#crearPDF').parent().css("background", "#9FF781");
                  } else{
                        	verificarObra($("#NumeroObra2").val());
                  }
        	});

         $("#VerificarInforme").off('click').on('click', function(e){
                 $( "#verificar" ).submit(e);
         });

         $("#verificar").submit(function(e) {
            	e.preventDefault();
            	popupLoader("Insertando Informe...");
            	var FechaDesde = $("[name='fecha_desde']").val();
            	var FechaHasta = $("[name='fecha_hasta']").val();
            	var NObra = $("#NumeroObra2").val();

           	guardarPDF(NObra, FechaDesde, FechaHasta,localStorage.username).done( function( response ) {
                  	if( response.success ) {
                           	popupLoader("Se ha subido el informe al servidor correctamente");
                              	setTimeout(function() {
                                        	popupLoader("Enviado el informe por email...");
                                         		insertarInforme(localStorage.idUsuario, FechaDesde, FechaHasta,NObra, localStorage.username).done( function( response ) {
                                                		 if( response.success ) {
                                                             		setTimeout(function() {
                                                                        	$.mobile.loading( 'hide');
                                                                        	$('#verificar').css("display", "none");
                                                                        	if(NObra!="") {
                                                                             		var numeroObra = "para la obra '"+NObra+"'";
                                                                        	} else {
                                                                            		var numeroObra = "General";
                                                                        	}

                                                                        	var mensaje = "El usuario "+localStorage.username+" ha creado un informe "+numeroObra+" de sus gastos entre las fechas comprendidas de "+FechaDesde+"/"+FechaHasta;
                                                                        	enviarEmailAdjunto("r.mosquera,ma.eguskiza" , "Informe de Gastos", mensaje,'r.mosquera'/* localStorage.username*/).done( function( response ) {
                                                                          		if(response.success) {
                                                                            			popupLoader("Se ha creado y enviado correctamente");
                                                                                            	setTimeout(function() {
                                                                                                		$.mobile.loading( 'hide');
                                                                                             	}, 2000);
                                                                           		} else {
                                                                               			popupLoader("Ha habido un error al enviar el informe");
                                                                                   		setTimeout(function() {
                                                                                            		$.mobile.loading( 'hide');
                                                                                  		}, 1000);
                                                                           		}
                                                                        	}).fail(function(jqXHR, textStatus, errorThrown ) {
                                                                                 	popupLoader("Ha habido un error al enviar el informe");
                                                                                   	setTimeout(function() {
                                                                                            	$.mobile.loading( 'hide');
                                                                                  	}, 1000);
                                                                                   	informeErrores(jqXHR.responseText);
                                                                        	});
                                                            		}, 1000);
                                                    		} else {
                                                               	popupLoader("No se ha podido insertar el informe");
                                                            		setTimeout(function() {
                                                                        	$.mobile.loading( 'hide');
                                                              		}, 1000);
                                                    		}
                                         		}).fail(function(jqXHR, textStatus, errorThrown ) {
                                          			popupLoader("Ha habido un error al insertar el informe");
                                                   		setTimeout(function() {
                                                            		$.mobile.loading( 'hide');
                                                  		}, 1000);
                                                   		informeErrores(jqXHR.responseText);
                                        		});
                             		}, 1000);
                   		} else {
                     			popupLoader("Ha habido un error al crear el informe");
                               		setTimeout(function() {
                                         		$.mobile.loading( 'hide');
                              		}, 1000);
                 			}
             		}).fail(function(jqXHR, textStatus, errorThrown ) {
                     		popupLoader("Ha habido un error al subir el informe al servidor");
                     		setTimeout(function() {
                           		$.mobile.loading( 'hide');
                     		}, 1000);
                          		informeErrores(jqXHR.responseText);
              		});
     		});
     		$('#crearPDF').parent().css("background", "#9FF781");
     		verificarObra("");
     		$("#fecha_desde, #fecha_hasta").change(function() {
         	$("#datepicker_env").val($("#fecha_desde").val());
         	$("#datepicker2_env").val($("#fecha_hasta").val());
         	if($("#NumeroObra2").val()!="") {
              		verificarObra($("#NumeroObra2").val());
         	} else {
	              	$('#crearPDF').prop('disabled',false);
	              	$("[name='idobra']").val("");
         	}
    	});

}