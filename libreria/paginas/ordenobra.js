var OrdenObraCreate = function (e) {
      var html_operarios = $("#oper").html();
      var num_operarios = 0;
      var input = $('input[name="filead"]').parent();
      localStorage.cantlist = 0;
      $('.ui-icon-power').off('click').on('click', function(event) {
	           event.preventDefault();
	           localStorage.logout == true;
	           window.open("logout.php", "_self");
        });
      var getdatos = function(idtrabajo, idobra) {
           return $.post( "/../php/AJAX/cargaDatos.php", { "idtrabajo" : idtrabajo, "idobra" : idobra });
     }
     var get_articulos = function(nombrearticulo, filtro){
           return $.post( "/../php/AJAX/articulos.php", { "nombrearticulo" : nombrearticulo, "filtro" : filtro});
     }
     var get_articulos_asignados= function(nombrearticulo, filtro, idtrabajo){
           return $.post( "/../php/AJAX/articulos_asignados.php", { "nombrearticulo" : nombrearticulo, "filtro" : filtro, "idtrabajo" : idtrabajo});
     }
     var get_mano = function(id) {
          return $.post( "/../php/AJAX/cargaMano.php", { "id" : id});
     }
     var cargarUsuario = function(id) {
          return $.post( "/../php/AJAX/cargaUsuario.php", { "id" : id});
     }
     var insertar_articulos_mano =function(id_trabajo,id_obra, id_hora, fechaI, horaI, horaF, horaReal, DescHora, UsuarioAudi, desc_parte, precio_venta) {
           return $.post( "/../php/AJAX/insertar_mano_articulo.php", {"id_trabajo" : id_trabajo, "id_obra" : id_obra,"id_hora" : id_hora, "fechaI" : fechaI, "horaI" :  horaI, "horaF" : horaF, "horaReal" : horaReal, "DescHora" : DescHora, "UsuarioAudi" : UsuarioAudi, "desc_parte" : desc_parte, "precio_venta" : precio_venta});
     }
     var modificar_articulos_mano =function(id_trabajo,id_obra, id_mano, id_hora, fechaI, horaI, horaF, horaReal, DescHora, UsuarioAudi, desc_parte, precio_venta) {
           return $.post( "/../php/AJAX/modificar_mano_articulo.php", {"id_trabajo" : id_trabajo, "id_obra" : id_obra,"id_mano": id_mano, "id_hora" : id_hora, "fechaI" : fechaI, "horaI" :  horaI, "horaF" : horaF, "horaReal" : horaReal, "DescHora" : DescHora, "UsuarioAudi" : UsuarioAudi, "desc_parte" : desc_parte, "precio_venta" : precio_venta});
     }
     var eliminar_articulos_mano = function(id_trabajo, id_obra, id_mano, usuario) {
          return $.post( "/../php/AJAX/eliminar_mano_articulo.php" , {"id_trabajo" : id_trabajo, "id_obra" : id_obra, "id_mano" : id_mano, "usuarioAudi":usuario});
     }
     var insertar_articulos =function(id_trabajo,id_obra, id_material, des_material, qreal, xUsers) {
           return $.post( "/../php/AJAX/insertar_articulos.php", {"id_trabajo" : id_trabajo, "id_obra" : id_obra,"id_material" : id_material, "des_material" : des_material, "qreal" : qreal, "xUsers" :  xUsers});
     }
     var modificar_articulo = function(id, cantidad) {
          return $.post("/../php/AJAX/modificar_articulo.php" , {"id":id, "cantidad" : cantidad});
     }
     var eliminar_articulo = function(id) {
          return $.post("/../php/AJAX/eliminar_articulo.php" , {"id":id});
     }
     var insertar_gasto = function(id_trabajo, id_obra, id_gasto, desc_gasto, importe, usuario, fecha, acreedor, numero) {
           return $.post( "/../php/AJAX/insertar_gasto.php" , {"id_trabajo":id_trabajo , "id_obra" : id_obra, "id_gasto" : id_gasto , "desc_gasto" : desc_gasto, "importe" : importe, "usuario" : usuario,  "fecha" : fecha, "acreedor": acreedor, "numero" : numero});
     }
      var modificar_gasto = function(id_gasto, fecha_gasto, acreedor,  importe, tipo_desc) {
           return $.post( "/../php/AJAX/modificar_gasto.php", {"id_gasto": id_gasto,"fecha" : fecha_gasto, "acreedor" : acreedor, "importe" : importe, "tipo_desc" : tipo_desc});
     }
     var enviar_obs = function(usuario, asunto, texto, user) {
         return $.post( "/../php/AJAX/enviar_mail.php", { "mail" : usuario,"asunto" : asunto, "mensaje" : texto, "usuario": user});
      }
      var verificar_estado = function(id_trabajo, id_obra, usuario) {
          return $.post("/../php/AJAX/verificarTrabajoAsignado.php" , {"id_trabajo":id_trabajo,"id_obra":id_obra, "usuario" : usuario});
      }
      var cerrar_trabajo = function(id_trabajo, id_obra, usuario) {
          return $.post("/../php/AJAX/cerrar_trabajo.php" , {"id_trabajo":id_trabajo, "id_obra": id_obra, "usuario" : usuario});
     }
     var anular_obra = function(id_obra, descripcion) {
           return $.post("/../php/AJAX/anularObra.php" , {"id_obra": id_obra, "descripcion" : descripcion});
     }
    var cargar_acreedores = function() {
           return $.post("/../php/AJAX/autocompletar.php");
     }
     var cargaDatos = function() {
           getdatos(localStorage.idTrabajo, localStorage.idObra).done( function( response ) {
                if(response.success ) {
                      var output2="";
                     var cont=0;
                     $.each(response.data.datos, function( key2, value2 ) {
                              respuesta = pintarDatos(cont, value2, output2);
                              cont = respuesta[1]+1;
                              output2 = respuesta[0];
                     });
                     output2 +="</tbody></table></div>";
                    $(".listaDatos").html(output2);
                } else {
                     $(".listaDatos").html('No ha habido suerte: ' + response.data.message);
                 }
           })
           .fail(function(jqXHR, textStatus, errorThrown) {
                informeErrores(jqXHR.responseText);
           });
      }

     var botonCerrar = function() {
          verificar_estado(localStorage.idTrabajo, localStorage.idObra, localStorage.idUsuario).done( function( response ) {
                if( response.success ) {
                      if(response.estado ==0) {
                           if($("#close_trab1").css("display")=="none") {
                                 $("#close_trab1").css("display", "block");
                                 $("#close_trab1").button()
                           }
                     }
                }
           }).fail(function(jqXHR, textStatus, errorThrown ) {
                 console.log(jqXHR.responseText);
           });
     }

     $('#ordenobra').off('keydown').on('keydown', '.importe, .importe2, .importe_dec, .importe_dec2, .td_cant_input' ,function(e) {
           var key = e.which || e.keyCode;
           if (!e.shiftKey && !e.altKey && !e.ctrlKey && key >= 48 && key <= 57 || key >= 96 && key <= 105 ||  key == 8 || key == 9 || key == 13 || key == 35 || key == 36 ||  key == 37 || key == 39 || key == 46 || key == 45) {
                return true;
          } else {
                return false;
          }
    });

      var insertarMano = function(e) {
            popupLoader("Insertando mano de obra");
            var hora = $("#select_hora").val();
            hora = hora.split("|");
            var id_hora = hora[0];
            var desc_hora = hora[1];
            var fecha_mano = $("#fecha_mano").val();
            var horaI = $("[name='horas_combo']").val()+":"+$("[name='minutes_combo']").val()+":"+"00";
            var HoraInicio = horaI.split(':');
            var segundos_HoraInicio = HoraInicio[0] * 3600 + (HoraInicio[1] * 60);
            var duration_i = $("[name='inp_duration']").val();
            duration_2 = duration_i.split(".");
           if(duration_2[1]==5) {
                 duration_2[1] = 30;
            } else {
                duration_2[1] = 0;
            }
           duration_f = duration_2[0] * 3600 + (duration_2[1] * 60);
           var segundos_horaF = segundos_HoraInicio + duration_f;
           var horaF = secondsTimeSpanToHMS(segundos_horaF);
           var desc_parte = $("[name='descParte']").val();
           var id_material = new Array();
           var desc_material = new Array();
           id_material.push("DISPOSICION");
           desc_material.push("DISPOSICION");
           var precio_venta = 42;
           var id_control = $("#id_mano_obra").val();
           id_control = id_control.split("-");
           if(desc_parte != "") {
                 setTimeout(function() {
                      insertar_articulos_mano(localStorage.idTrabajo, localStorage.idObra, id_hora, fecha_mano, horaI, horaF,duration_i, desc_hora, localStorage.username, desc_parte, precio_venta).done( function( response ) {
                      if( response.success ) {
                            popupLoader("Se ha insertado correctamente la mano de obra");
                            $('#fecha_mano').val(new Date().toJSONLocal());
                            $('select[name="horas_combo"] option[value="01"]').attr('selected', true).siblings('option').removeAttr('selected');
                            $('select[name="minutes_combo"] option[value="00"]').attr('selected', true).siblings('option').removeAttr('selected');
                            $("select[name='select_hora'] option[value='HN|HORA NORMAL']").attr('selected', true).siblings('option').removeAttr('selected');
                            $("[name='inp_duration']").val("1");
                            $("textarea[name='descParte']").val("");
                            $('select[name="horas_combo"]').selectmenu("refresh", true);
                            $('select[name="minutes_combo"]').selectmenu("refresh", true);
                            $('select[name="select_hora"]').selectmenu("refresh", true);
                             setTimeout(function() {
                                 $.mobile.loading( 'hide');
                                      cargaDatos();
                                      botonCerrar();
                                  }, 2500);
                            }
                      }).fail(function(jqXHR, textStatus, errorThrown ) {
                           popupLoader("Ha habido un error al insertar la mano");
                            setTimeout(function() {
                                 $.mobile.loading( 'hide');
                                      cargaDatos();
                            }, 2500);
                            informeErrores(jqXHR.responseText);
                      });
                 }, 2500);
           } else {
                 popupLoader("Tiene que insertar una descripci\u00F3n antes de insertar una mano de obra");
                 setTimeout(function() {
                       $.mobile.loading( 'hide');
                 }, 2500);
          }
      }

      var BorrarMano = function() {
            popupLoader('Borrando mano...');
            var id_control = $("#id_mano_obra2").val();
            id_control = id_control.split("-");
            setTimeout(function() {
                 eliminar_articulos_mano(localStorage.idTrabajo, localStorage.idObra, id_control[0], localStorage.username).done( function( response ) {
                      if( response.success ) {
                           popupLoader('Mano de obra borrada');
                            setTimeout(function() {
                                 $.mobile.loading( 'hide');
                                 cargaDatos();
                            }, 2500);
                      }
                 }).fail(function(jqXHR, textStatus, errorThrown ) {
                      popupLoader('Ha habido un problema al intentar borrar la mano de obra');
                 setTimeout(function() {
                      $.mobile.loading( 'hide');
                      cargaDatos();
                       }, 2500);
                 informeErrores(jqXHR.responseText);
                 });
            }, 2500);
      }

      var modificarMano = function() {
           popupLoader('Modificando mano de obra...');
           var hora = $("#select_hora2").val();
           hora = hora.split("|");
           var id_hora = hora[0];
           var desc_hora = hora[1];
           var fecha_mano = $("#fecha_ds").val();
           var horaI = $("[name='horas_combo2']").val()+":"+$("[name='minutes_combo2']").val()+":"+"00";
           var HoraInicio = horaI.split(':');
           var segundos_HoraInicio = HoraInicio[0] * 3600 + (HoraInicio[1] * 60);
           var duration_i = $("[name='inp_duration2']").val();
           duration_2 = duration_i.split(".");
           if(duration_2[1]==5) {
                 duration_2[1] = 30;
           } else {
                 duration_2[1] = 0;
           }
           duration_f = duration_2[0] * 3600 + (duration_2[1] * 60);
           var segundos_horaF = segundos_HoraInicio + duration_f;
           var horaF = secondsTimeSpanToHMS(segundos_horaF);
           var desc_parte = $("[name='descParte2']").val();
           var id_material = new Array();
           var desc_material = new Array();
           var precio_venta = 35;
           var id_control = $("#id_mano_obra2").val();
           id_control = id_control.split("-");
          setTimeout(function() {
                modificar_articulos_mano(localStorage.idTrabajo, localStorage.idObra,id_control[0], id_hora, fecha_mano, horaI, horaF,duration_i, desc_hora, localStorage.username, desc_parte, precio_venta).done( function( response ) {
                      if( response.success ) {
                           popupLoader('Se ha modificado la mano de obra correctamente');
                           setTimeout(function() {
                                 $.mobile.loading( 'hide');
                                      cargaDatos();
                                 }, 2500);
                      } else {
                           popupLoader('No se ha podido modificar la mano');
                           setTimeout(function() {
                           $.mobile.loading( 'hide');
                                cargaDatos();
                           }, 2500);
                      }
                 }).fail(function(jqXHR, textStatus, errorThrown ) {
                      popupLoader('Ha habido un error al modificar la mano');
                      setTimeout(function() {
                           $.mobile.loading( 'hide');
                            cargaDatos();
                      }, 2500);
                      informeErrores(jqXHR.responseText);
                 });
            });
      }

     var insertarArticulo = function(el) {
          popupLoader("Insertando art\u00EDculos...");
          var e = $(".table_art div table").find(".td_cant");
          var f = $(".table_art div table").find(".td_idmat");
          var g = $(".datagrid2").find("span");
          var cant = 0;
          var cantidad = new Array();
          var id_material = new Array();
          var des_material= new Array();
          for(var i=0; i<e.length; i++) {
                cant = $(e)[i].innerHTML;
                if(cant!=0) {
                    cantidad.push(cant);
                     var position = i+1;
                     id_material.push($(g)[i].innerHTML);
                     des_material.push($(f)[i].innerHTML);
                }
           }
           if($("#btn_art .ui-btn-active").html()=="Otro") {
                if($(".td_cant_input").val()!="" && $(".td_idmat_input").val()!="") {
                      cantidad.push($(".td_cant_input").val());
                      id_material.push($(".table_art .datagrid2 span").html());
                      des_material.push($(".td_idmat_input").val());
                }
          }
           if(des_material.length==0) {
                popupLoader("Tienes que insertar alg\u00FAn art\u00EDculo");
                setTimeout(function() {
                     $.mobile.loading( 'hide');
                     cargaDatos();
                      botonCerrar();
                }, 3000);
           }else {
                 insertar_articulos(localStorage.idTrabajo, localStorage.idObra, id_material, des_material, cantidad, localStorage.username).done( function( response ) {
                     if( response.success ) {
                          cargarArticulos1(el);
                          popupLoader("Art\u00EDculos insertados correctamente");
                           if($("#btn_art .ui-btn-active").html()=="Otro") {
                                $(".td_idmat_input").val("");
                                $(".td_cant_input").val("")
                           }
                           setTimeout(function() {
                                $.mobile.loading( 'hide');
                                cargaDatos();
                                botonCerrar();
                           }, 3000);
                    } else {
                       popupLoader("No se ha podido llevar a cabo la operaricon");
                       setTimeout(function() {
                                $.mobile.loading( 'hide');
                           }, 3000);
                    }
                }).fail(function(jqXHR, textStatus, errorThrown ) {
                    popupLoader("Ha habido un error al insertar los art\u00EDculos");
                    setTimeout(function() {
                                $.mobile.loading( 'hide');
                           }, 2000);
                    informeErrores(jqXHR.responseText);
                });
           }
      }

     function borrarArticulo() {
         var id = $("#art_id").val();
         eliminar_articulo(id).done( function( response ) {
               if( response.success ) {
                     popupLoader("Se ha borrado el Art\u00EDculo correctamente");
                     setTimeout(function() {
                         $.mobile.loading( 'hide');
                          cargaDatos();
                    }, 2500);
               } else {
                      popupLoader("Ha habido un error al borrar el art\u00EDculo");
                      setTimeout(function() {
                           $.mobile.loading( 'hide');
                      }, 2500);
               }
          }).fail(function(jqXHR, textStatus, errorThrown ) {
                popupLoader("Algo ha ido mal");
                setTimeout(function() {
                      $.mobile.loading( 'hide');
                 }, 2500);
                informeErrores(jqXHR.responseText);
           });
      }

     function modificarArticulo() {
            popupLoader("Modificando Art\u00EDculo...");
            var id = $("#art_id").val();
            var cantidad = $("#art_cantidad").val();
            modificar_articulo(id, cantidad).done( function( response ) {
                 if( response.success ) {
                      popupLoader("Se ha modificado correctamente");
                      setTimeout(function() {
                           $.mobile.loading( 'hide');
                                  cargaDatos();
                            }, 2500);
                } else {
                      popupLoader("Ha habido un error al intentar modificarlo");
                      setTimeout(function() {
                            $.mobile.loading( 'hide');
                      }, 2500);
                }
          }).fail(function(jqXHR, textStatus, errorThrown ) {
                popupLoader("Algo ha ido mal");
                setTimeout(function() {
                      $.mobile.loading( 'hide');
                }, 2500);
                informeErrores(jqXHR.responseText);
          });
    }
    $("#ordenobra").on('change', '[name="select_gasto"]', function(event) {
      event.preventDefault();
      var gasto = $("#select_gasto").val();
      gasto = gasto.split("|");
      var id_gasto = gasto[0];
      if(id_gasto=="01") {
        $("[name='num_rest']").css("display", "initial");
      } else {
        $("[name='num_rest']").css("display", "none");
      }
    });
     //INSERTAR GASTO
     $("#gasto").off('submit').on('submit', (function(e){
           e.preventDefault();
           popupLoader("Subiendo imagen al servidor...");
           var id_obra = $("#idO").val();
           var fecha = $("[name='datepicker2']").val();
           var importe = $("[name='importe']").val() + "." + $("[name='importe_dec']").val();
           var gasto = $("#select_gasto").val();
           gasto = gasto.split("|");
           var id_gasto = gasto[0];
          if($("[name='filead']").val()!='') {
                if(importe>0 && importe!="" ) {
                     if($("[name='acreedor']").val()!="") {
                             if((id_gasto=="01" && $("[name='num_rest']").val()!="") || id_gasto!="01") {
                                var directorio = "gastos/"+localStorage.username+"/"+id_obra+"/"+fecha+"/";
                                var prefijo = $("[name='acreedor']").val();
                                $("[name='direct']").val(directorio);
                                $("[name='usuario_img']").val(localStorage.username);
                                $("[name='obra_img']").val(localStorage.idObra);
                                $("[name='fecha_img']").val(fecha);
                                $("[name='trabajo_img']").val(localStorage.idTrabajo);
                                $("[name='pref']").val(prefijo);
                                $.ajax({
                                      url: "../php/AJAX/insertar_img_gastos.php",
                                      type: "POST",
                                      data: new FormData(this),
                                      contentType: false,
                                      cache: false,
                                      processData:false,
                                      success: function(data) {
                                           if(data.length==71) {
                                                popupLoader("Imagen subida correctamente");
                                                setTimeout(function() {
                                                      $.mobile.loading( 'hide');
                                                }, 3000);
                                           } else {
                                                popupLoader(data);
                                                setTimeout(function() {
                                                     $.mobile.loading( 'hide');
                                                }, 3000);
                                           }
                                    }
                                });
                                setTimeout(function() {
                                      popupLoader("Insertando gasto...");
                                      var acreedor = $("[name='acreedor']").val();
                                      if(id_gasto=="01") {
                                          var numero = $("[name='num_rest']").val();
                                      } else{
                                          var numero = 0;
                                      }
                                      var desc_gasto = gasto[1];
                                      var fecha = $("[name='datepicker2']").val();
                                      insertar_gasto(localStorage.idTrabajo, localStorage.idObra, id_gasto, desc_gasto, importe, localStorage.username,  fecha, acreedor, numero).done( function( response ) {
                                          if( response.success ) {
                                                popupLoader("Gasto insertado correctamente");
                                                $('#datepicker2').val(new Date().toJSONLocal());
                                                $('select[name="select_gasto"] option[value="01"]').attr('selected', true).siblings('option').removeAttr('selected');
                                                $("input[name='importe']").val("");
                                                $("input[name='importe_dec']").val("00");
                                                $("input[name='acreedor']").val("");
                                                $("input[name='filead']").val('');
                                                $("input[name='num_rest']").val('');
                                                $('select[name="select_gasto"]').selectmenu("refresh", true)
                                                setTimeout(function() {
                                                      $.mobile.loading( 'hide');
                                                      cargaDatos();
                                                      botonCerrar();
                                                }, 2500);
                                           } else {
                                                popupLoader("No se ha podido guardar el gasto");
                                                setTimeout(function() {
                                                      $.mobile.loading( 'hide');
                                                    }, 2500);
                                           }
                                     })
                                      .fail(function(jqXHR, textStatus, errorThrown ) {
                                           popupLoader("Ha habido un error al insertar el gasto");
                                           setTimeout(function() {
                                                $.mobile.loading( 'hide');
                                                cargaDatos();
                                                botonCerrar();
                                           }, 3000);
                                           informeErrores(jqXHR.responseText);
                                     });
                                      });
                           } else {
                           popupLoader("Tienes que insertar el numero de personas");
                           setTimeout(function() {
                              $.mobile.loading( 'hide');
                           }, 2500);
                         }
                      } else {
                           popupLoader("Tienes que insertar un acreedor");
                           setTimeout(function() {
                                 $.mobile.loading( 'hide');
                            }, 2500);
                      }
                } else {
                     popupLoader("El importe no puede ser 0");
                     setTimeout(function() {
                            $.mobile.loading( 'hide');
                      }, 2500);
                }
          } else {
                 popupLoader("La imagen es obligatoria");
                 setTimeout(function() {
                      $.mobile.loading( 'hide');
                 }, 2500);
           }
      }));

      var modificarGasto = function() {
           var id_gasto = $("[name='id_gasto2']").val();
           var fecha_gasto = $("#fecha_gasto").val();
           var acreedor = $("[name='acreedor2']").val();
           var importe = $(".importe2").val()+"."+$(".importe_dec2").val();
           var tipo = $("[name='select_gasto2']").val();
           tipo = tipo.split("|");
           setTimeout(function() {
                 modificar_gasto( id_gasto, fecha_gasto, acreedor, importe,tipo[1]).done( function( response ) {
                      if( response.success ) {
                           popupLoader("Se ha modificado el gasto correctamente");
                           setTimeout(function() {
                                $.mobile.loading( 'hide');
                                    $('#gasto_salir').click();
                                    cargaDatos();
                                }, 2500);
                     } else {
                          popupLoader("No se ha podido modificar la mano");
                          setTimeout(function() {
                               $.mobile.loading( 'hide');
                                cargaDatos();
                           }, 2500);
                     }
                }).fail(function(jqXHR, textStatus, errorThrown ) {
                     popupLoader("Ha habido un error al modificar el gasto");
                     setTimeout(function() {
                           $.mobile.loading( 'hide');
                                cargaDatos();
                          }, 2500);
                     informeErrores(jqXHR.responseText);
                });
          });
     }
     var ModificarTabla = function (thisObject) {
          var tipo =  thisObject.children().eq(0).text();
          var usuario =  thisObject.children().eq(2).text();
          usuario = usuario.split("Usuario");
          var descripcion = thisObject.children().eq(3).text();
          descripcion = descripcion.split("Descripci\u00F3n");
          descripcion_tipo = descripcion[1];
          descripcion_tipo1 = descripcion_tipo.split(" - ");
          descripcion = descripcion_tipo1[0];
          if(descripcion=="RESTAURANTE") {
                 descripcion = "01|RESTAURANTE";
           } else if(descripcion=="APARCAMIENTO") {
                 descripcion = "02|APARCAMIENTO";
           } else if(descripcion=="GASOIL") {
                 descripcion = "03|GASOIL";
           } else if(descripcion== "OTROS / VARIOS") {
                 descripcion = "04|OTROS / VARIOS";
           } else {
                 console.log("");
           }
           var valor = thisObject.children().eq(4).text();
           var fecha = thisObject.children().eq(1).text();
           valor = valor.split("Valor");
           valor = valor[1];
           var res = tipo.split("-");
           res[0] = res[0].split("Tipo");
           cargarUsuario(localStorage.username).done( function( response ) {
                if( response.success ) {
                     $.each(response.data.operario, function( key, value ) {
                            if(usuario.indexOf(value) > -1) {
                                switch(res[0][1]) {
                                      case "Mano de Obra":
                                           $("#id_mano_obra2").val(res[1]);
                                            get_mano(res[1]).done( function( response ) {
                                                 if( response.success ) {
                                                     var el = $('#select_hora2');
                                                     var el2 = $('[name="horas_combo2"]');
                                                     var el3 = $('[name="minutes_combo2"]');
                                                    $.each(response.data.mano, function( key2, value2 ) {
                                                           $('#select_hora2 option[value="'+value2['IDHora']+'|'+value2['DesHora']+'"]').attr('selected', true).siblings('option').removeAttr('selected');
                                                           el.selectmenu();
                                                           el.selectmenu("refresh", true);
                                                           $('[name="descParte2"]').val(value2['DescParte']);
                                                           $("#inp_duration2").val(value2['Duracion']);
                                                           var fecha = value2['HoraInicio']['date'];
                                                           fecha = fecha.split(" ");
                                                           hora = fecha[1].split(":");
                                                           $("#fecha_ds").val(fecha[0]);
                                                           $('[name="horas_combo2"] option[value="'+hora[0]+'"]').prop('selected', true);
                                                           el2.selectmenu();
                                                           el2.selectmenu("refresh", true);
                                                           $('[name="minutes_combo2"] option[value="'+hora[1]+'"]').prop('selected', true);
                                                           el3.selectmenu();
                                                           el3.selectmenu("refresh", true);
                                                           $("a#modified_mano").click();
                                                    });
                                                }
                                          }).fail(function(jqXHR, textStatus, errorThrown ) {
                                                 popupLoader("Ha habido un error a la hora de cargar la mano de obra indicada");
                                                 setTimeout(function() {
                                                      $.mobile.loading( 'hide');
                                                }, 2500);
                                                 informeErrores(jqXHR.responseText);
                                           });
                                           break;
                                     case "Material":
                                          if(descripcion_tipo.indexOf("DISPOSICION DE SERVICIO") == -1) {
                                                valor = valor.split("u");
                                                $("#art_name").text(descripcion);
                                                $("#art_id").val(res[1]);
                                                $("#art_cantidad").val(valor[0]);
                                                $("a#modified_art").click();
                                           }
                                           break;
                                     case "Gastos":
                                           var selec_menu = $("#select_gasto2");
                                           valor = valor.split("\u20AC");
                                           importe = valor[0];
                                           fecha = fecha.split("Fecha");
                                           fecha = fecha[1].split(" ");
                                           fecha_dia = fecha[0];
                                           fecha_hora = fecha[1];
                                           if (importe.indexOf(".") >= 0) {
                                                importe = importe.split(".");
                                                importe_dec = importe[1];
                                                importe_nodec = importe[0];
                                           } else {
                                                importe_dec = "00";
                                                importe_nodec = importe;
                                           }
                                           $(".importe2").val(importe_nodec);
                                           $(".importe_dec2").val(importe_dec);
                                           fecha_dia = fecha_dia.split("/");

                                           $("#fecha_gasto").val(fecha_dia[2]+"-"+fecha_dia[1]+"-"+fecha_dia[0]);
                                           $("#id_gasto2").val(res[1]);
                                           $(".acreedor2").val(descripcion_tipo1[1]);
                                           $('#select_gasto2 option[value="'+descripcion+'"]').prop('selected', true);
                                           selec_menu.selectmenu("refresh", true);
                                           $("a#modificar_gasto").click();
                                           break;
                                     default:
                                }
                           }
                      });
                }
           }).fail(function(jqXHR, textStatus, errorThrown ) {
                 informeErrores(jqXHR.responseText);
           });
     }
     var anadirArticuloPeticion = function(el) {
           if($(".ui-collapsible:eq(3) .ui-btn-active").html()!="Otro") {
                 var e = $(".table_art2 div table").find(".td_cant");
                 var f = $(".table_art2 div table").find(".td_idmat");
                 var g = $(".datagrid2").find("span");
                 var cant = 0;
                       for(var i=0; i<e.length; i++) {
                            cant = $(e)[i].innerHTML;
                            if(cant!=0) {
                                  var list = "<li data-cont="+ localStorage.cantlist+"><span class='cod_ar'>"+$(g)[i].innerHTML+"</span> - <span class='des_ar'>"+$(f)[i].innerHTML+"</span> - <span class='can_ar'>"+cant+"</span></li>"
                                 $("#pet_list ul").append(list);
                                 $("#pet_list ul").listview('refresh');
                                 $(".info_sol div.table_art2").html("");
                                 $("#add2").val("");
                                  localStorage.cantlist++;
                                  $("#pet_list ul li").off("click").on('click',function(event) {
                                      localStorage.listPet = $(this).attr("data-cont");
                                      event.preventDefault();
                                      $("#peticion_cod").val($(this)[0].children[0].textContent);
                                      $("#peticion_art").html($(this)[0].children[1].textContent);
                                      $("#peticion_cant").val($(this)[0].children[2].textContent);
                                      $("#peticion_art_pop").click();
                                  });
                            }
                       }
                 cargarArticulosPeticion(el);
           } else {
                if($(".ui-collapsible:eq(3) .td_idmat_input").val()!="" && $(".ui-collapsible:eq(3) .td_cant_input").val()>0) {
                      var list = "<li data-cont="+ localStorage.cantlist+"><span class='cod_ar'>Manual</span> - <span class='des_ar'>"+$(".ui-collapsible:eq(3) .td_idmat_input").val()+"</span> - <span class='can_ar'>"+$(".ui-collapsible:eq(3) .td_cant_input").val()+"</span></li>"
                     $("#pet_list ul").append(list);
                     $("#pet_list ul").listview('refresh');
                     localStorage.cantlist++;
                      $("#pet_list ul li").off("click").on('click',function(event) {
                          localStorage.listPet = $(this).attr("data-cont");
                           event.preventDefault();
                           $("#peticion_cod").val($(this)[0].children[0].textContent);
                           $("#peticion_art").html($(this)[0].children[1].textContent);
                           $("#peticion_cant").val($(this)[0].children[2].textContent);
                           $("#peticion_art_pop").click();
                      });
                }
                cargarArticulosPeticion(el);
           }
      }

      var enviarPeticionArticulo = function() {
            popupLoader("Enviando solicitud");
           if($("#pet_list ul li").length>0) {
                 var texto = "<html lang='en'><head><meta charset='UTF-8'><style type='text/CSS'>html {font-family: Arial;}table {border-radius: 8px;background: #8BB6D8;} th {color: #fff;padding: 5px;border-bottom: 2px solid #7E7FBA;}table tbody {background: #E0E9F0;}table tbody tr td {padding: 5px;color :#3B3939;}</style></head>";
                 texto += "<body>";
                 texto += "<table cellpadding='0' cellspacing='0'>";
                 texto += "<tr style='background: #8BB6D8;'>";
                 texto += "<th>Codigo</th>";
                 texto += "<th>Articulo</th>";
                 texto += "<th  style='background: #8BB6D8; color: #000'>Cantidad</th>";
                 texto += "</tr><tbody>";
                for(var i=0; i<$("#pet_list ul li").length; i++) {
                      texto += "<tr style=' background: #E0E9F0;'><td>"+$("#pet_list ul li")[i].children[0].textContent+"</td><td style='padding-left: 10px;font-weight: bold;'>"+$("#pet_list ul li")[i].children[1].textContent+"</td><td style='text-align: center;background: #E0E9F0; color: #000'>"+$("#pet_list ul li")[i].children[2].textContent+"</td></tr>";
                }
                texto +="</tbody></table></body></html>"
                //enviar_obs("logistica", "Solicitud de material" ,texto, localStorage.username).done( function( response ) {
                 enviar_obs("r.mosquera", "Solicitud de material" ,texto, localStorage.username).done( function( response ) {
                      if( response.success ) {
                            $("textarea#txt_obsv").val("");
                            popupLoader("La solicitud se ha enviado correctamente");
                            setTimeout(function() {
                                 $.mobile.loading( 'hide');
                                 $("#add2").val("");
                                 $(".info_sol div.table_art2").html("");
                                 $("#pet_list ul").html("");
                          }, 2500);
                      }
                 }).fail(function(jqXHR, textStatus, errorThrown ) {
                       popupLoader('Algo ha ocurrido, no se ha llegado a enviar la solicitud');
                       setTimeout(function() {
                           $.mobile.loading( 'hide');
                     }, 2500);
                       informeErrores(jqXHR.responseText);
                });
            } else {
                 popupLoader('Tiene que rellenar la solicitud a enviar antes de poder enviarla');
                 setTimeout(function() {
                      $.mobile.loading( 'hide');
                 }, 2500);
           }
      }

     var cancelarPeticionArticulo = function() {
           $("#add2").val("");
           $(".info_sol div.table_art2").html("");
           $("#pet_list ul").html("");
     }

     var modificarPeticionArticulo = function() {
           $("#pet_list ul li[data-cont="+localStorage.listPet+"]")[0].children[2].textContent = $("#peticion_cant").val();
     }

     var borrarPeticionArticulo = function() {
            $("#pet_list ul li[data-cont="+localStorage.listPet+"]").remove();
     }

     var enviarEmailObservaciones = function () {
           popupLoader("Enviando Email...");
            var usuario = $("#oper2 select").val();
            var texto = $("textarea#txt_obsv").val();
           if(usuario!=0 && texto.length>0) {
                enviar_obs(usuario, "Observaciones" ,texto, localStorage.username).done( function( response ) {
                      if( response.success ) {
                           $("textarea#txt_obsv").val("");
                           popupLoader("Email enviado correctamente");
                           setTimeout(function() {
                                 $.mobile.loading( 'hide');
                           }, 2500);
                      }
                 }).fail(function(jqXHR, textStatus, errorThrown ) {
                      popupLoader("Ha habido un error a la hora de enviar el email");
                       setTimeout(function() {
                            $.mobile.loading( 'hide');
                      }, 2500);
                       informeErrores(jqXHR.responseText);
                  });
          } else {
                 popupLoader("Tiene que seleccionar un usuario y escribir alg\u00FAn mensaje");
                 setTimeout(function() {
                            $.mobile.loading( 'hide');
                      }, 3000);
          }
      }



    $(".ui-collapsible:eq(1) .label_elec").off('click').on('click', function(event){
           $("div div.table_art").html("");
           $(".ui-collapsible:eq(1) .ui-btn-active").toggleClass( "ui-btn-active");
           $(".ui-collapsible:eq(1) .ui-state-persist").toggleClass( "ui-state-persist");
           $(this).toggleClass( "ui-btn-active" );
           $(this).toggleClass( "ui-state-persist" );
           if($(this).html()=="Otro") {
                setTimeout(function() {
                      cargarOtro(event, 0);
                }, 2500);
           }else {
                cargarArticulos1(event);
           }
     });

     $(".ui-collapsible:eq(3) .label_elec").off('click').on('click', function(event){
           $("div div.table_art2").html("");
           $(".ui-collapsible:eq(3) .ui-btn-active").toggleClass( "ui-btn-active");
           $(".ui-collapsible:eq(3) .ui-state-persist").toggleClass( "ui-state-persist");
           $(this).toggleClass( "ui-btn-active" );
           $(this).toggleClass( "ui-state-persist" );
            if($(this).html()=="Otro") {
                setTimeout(function() {
                      cargarOtro(event, 1);
                }, 2500);
           }else {
                $(".ui-collapsible:eq(3) .ui-input-search").css("display","block");
                cargarArticulos1(event);
           }
     });

      $(document.body).off('keyup').on('keyup','#art_asig .td_cant', function(e) {
           var cant = parseInt($(this)[0].textContent);
           var padre2 = parseInt($(this).parent("tr").children(".td_cant_usados")[0].textContent);
           var padre1 = parseInt($(this).parent("tr").children(".td_cant_total")[0].textContent);
           var padre = padre1 - padre2;
           if(cant>padre) {
                $(this)[0].textContent = padre;
           }
      });

     $(document.body).off('keydown').on('keydown','#art_asig .td_cant', function(e) {
          var cant = $(this)[0].textContent;
          var padre = $(this).parent("tr").children(".td_cant_total")[0].textContent;
          var key = e.which || e.keyCode;
                if (!e.shiftKey && !e.altKey && !e.ctrlKey && key >= 48 && key <= 57 || key >= 96 && key <= 105 || key == 8 || key == 9 || key == 13 ||  key == 35 || key == 36 || key == 37 || key == 39 ||  key == 46 || key == 45) {
                     if(cant<=padre) {
                          return true;
                     } else {
                          $(this)[0].textContent = padre;
                     }
               } else {
                     return false;
               }
          });

    var cargarOtro = function(e, num) {
           e.preventDefault();
           output2 = "<br><div class='datagrid2'>";
           output2 += "<input type='text' placeholder='ARTICULO DE COMODIN' class='td_idmat td_idmat_input' data-theme='a' ><input type='text' placeholder='Cantidad' class='td_cant  td_cant_input' data-theme='a' ><span style='visibility:hidden; width:0; height:0; display: none;'>ARCOMODIN</span>";
            output2 +="</tbody></table></div>";
           if(num==0) {
                $("div div.table_art").html(output2);
                $(".td_idmat_input").textinput();
                $(".td_cant_input").textinput();
           } else {
                $(".ui-collapsible:eq(3) .ui-input-search").css("display","none");
                $("div div.table_art2").html(output2);
                $(".td_idmat_input").textinput();
                $(".td_cant_input").textinput();
           }

    }

    var cargarArticulos1 = function(e) {
           e.preventDefault();
           value = $("#add1").val();
           var cont2=0;
           var idtrabajo = $("#inp_idtrabajo2").val();
           var filtro = $("#btn_art .ui-btn-active").html();
          if($(".ui-btn-active").html()=="Otro") {
                 value='ARCOMODIN';
                 filtro = "C\u00F3digo";
                 idtrabajo ="";
           }
           get_articulos_asignados("", filtro,idtrabajo).done( function( response ) {
                if( response.success ) {
                      output2 = "<br><div style='max-height:300px;overflow-y: scroll; overflow-x: hidden;' class='datagrid2'><table data-role='table'  data-mode='columntoggle' class='ui-responsive table-stroke' id='art_asig'><thead><tr><th>Codigo</th><th>Articulo</th><th>Cantidad</th><th>Usados</th><th>Total</th></tr></thead><tbody>";

                      $.each(response.data.articulos, function( key2, value2 ) {
                          if(cont2%2==0) {
                                 if($(".ui-btn-active").html()=="Otro") {
                                       output2 += "<tr style='background:#c2c2c2;'><td class='td_idmat' contenteditable>"+value2['DescMaterial'] + "</td><td contenteditable class='td_cant'>0</td><span style='visibility:hidden; width:0; height:0; display: none;'>"+value2['IDMaterial']+"</span></tr>";
                                      cont2++;
                                 } else {
                                       output2 += "<tr style='background:#c2c2c2;'><td class='td_idmat2'>"+value2['IDMaterial'] + "</td><td class='td_idmat'>"+value2['DescMaterial'] + "</td><td contenteditable class='td_cant'>0</td><td class='td_cant_usados'>"+value2['QReal']+"</td><td class='td_cant_total'>"+value2['Qprev'] + "</td><span style='visibility:hidden; width:0; height:0; display: none;'>"+value2['IDMaterial']+"</span></tr>";
                                      cont2++;
                                 }
                           } else {
                                 output2 += "<tr><td class='td_idmat2'>"+value2['IDMaterial'] + "</td><td class='td_idmat'>"+value2['DescMaterial'] + "</td><td contenteditable class='td_cant'>0</td><td class='td_cant_usados'>"+value2['QReal']+"</td><td class='td_cant_total'>"+value2['Qprev'] + "</td><span style='visibility:hidden; width:0; height:0; display:none'>"+value2['IDMaterial']+"</span></tr>";
                                  cont2++;
                           }
                      });
                     output2 +="</tbody></table></div>";
                     $("div div.table_art").html(output2);
                 } else {
                      console.log("entro");
                 }
           })
           .fail(function(jqXHR, textStatus, errorThrown ) {
                informeErrores(jqXHR.responseText);
           });
     }

    var cargarArticulosPeticion = function(e) {
           e.preventDefault();
           value = $("#add2").val();
           if(value!="") {
                 var cont2=0;
                 var filtro = $(".info_sol .ui-btn-active").html();
                 if($("#add2").val()!="") {
                       get_articulos(value, filtro).done( function( response ) {
                             if( response.success ) {
                                  output2 = "<br><div class='datagrid2' style='width:95%;height:150px;min-height:70px;overflow: auto;'><table><thead><tr><th>Lista Art&iacute;culos</th><th>Cantidad</th></tr></thead><tbody>";
                                 $.each(response.data.articulos, function( key2, value2 ) {
                                       if(cont2%2==0) {
                                             output2 += "<tr style='background:#c2c2c2;'><td class='td_idmat'>"+value2['DescArticulo'] + "</td><td contenteditable class='td_cant'>0</td><span style='visibility:hidden; width:0; height:0; display: none;'>"+value2['IDArticulo']+"</span></tr>";
                                            cont2++;
                                       } else {
                                            output2 += "<tr><td class='td_idmat'>"+value2['DescArticulo'] + "</td><td contenteditable class='td_cant'>0</td><span style='visibility:hidden; width:0; height:0;display: none;'>"+value2['IDArticulo']+"</span></tr>";
                                            cont2++;
                                       }
                                });
                                output2 +="</tbody></table></div>";
                                $(".info_sol div.table_art2").html(output2);
                            } else {
                                $(".info_sol div.table_art2").html('No ha habido suerte: ' + response.data.message);
                            }
                        })
                        .fail(function(jqXHR, textStatus, errorThrown ) {
                            informeErrores(jqXHR.responseText);
                        });
                }
           } else {
               $(".info_sol div.table_art2").html("");
          }
     }


     $("#redireccionar").off("click").on('click', function(event) {
           window.open("index2.php", "_self");
     });

     var cerrarTrabajo = function() {
           cerrar_trabajo(localStorage.idTrabajo, localStorage.idObra, localStorage.username).done( function( response ) {
                if( response.success ) {
                    if(response.close) {
                          popupLoader("Trabajo y Obra cerrada, recuerde que en las pr\u00F3ximas 24 horas se debe entregar la documentaci\u00F3n en papel");
                          setTimeout(function() {
                               $.mobile.loading( 'hide');
                               window.open("index2.php", "_self");
                          }, 4000);
                    } else {
                         popupLoader("Trabajo cerrado");
                         setTimeout(function() {
                               $.mobile.loading( 'hide');
                               window.open("index2.php", "_self");
                          }, 3000);
                    }
               } else {
                    popupLoader("No se ha podido cerrar el trabajo, ha ocurrido un error");
                    setTimeout(function() {
                               $.mobile.loading( 'hide');
                    }, 3000);
                }
           }).fail(function(jqXHR, textStatus, errorThrown ) {
                popupLoader("Error de c\u00F3digo");
                 setTimeout(function() {
                               $.mobile.loading( 'hide');
               }, 3000);
                 informeErrores(jqXHR.responseText);
           });
     }



    $(".plus").off('click').on('click', function(){
           var duration = parseFloat($("#inp_duration").val());
           $("#inp_duration").val(duration + 0.5);
    });

    $(".minus").off('click').on('click', function(){
          var duration = parseFloat($("#inp_duration").val());
           if (duration>1) {
                $("#inp_duration").val(duration - 0.5);
           } else {
                $("#inp_duration").val(1);
           }
     });

    $(".plus2").off('click').on('click', function(){
           var duration = parseFloat($("#inp_duration2").val());
           $("#inp_duration2").val(duration + 0.5);
    });

     $(".minus2").off('click').on('click', function(){
           var duration = parseFloat($("#inp_duration2").val());
           if (duration>1) {
                $("#inp_duration2").val(duration - 0.5);
          } else {
                $("#inp_duration2").val(1);
          }
     });

     $(".plus_h").off('click').on('click', function(){
           var hours = $("#timepicker").val();
           var hour = parseFloat(hours.substring(0, 2));
           var minutes = parseFloat(hours.substring(3,5));
          function addZero(i) {
               if (i < 10) {
                      i = "0" + i;
                }
                return i;
           }
          if(hour<23) {
                $("#timepicker").val(addZero(hour+1) + ":"+addZero(minutes));
          } else {
               $("#timepicker").val("00:"+addZero(minutes));
           }
     });

    $(".minus_h").off('click').on('click', function(){
           var hours = $("#timepicker").val();
           var hour = parseFloat(hours.substring(0, 2));
           var minutes = parseFloat(hours.substring(3,5));
           function addZero(i) {
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
           }

          if(hour>0) {
                 $("#timepicker").val(addZero(hour-1) + ":"+addZero(minutes));
           }else {
                 $("#timepicker").val("23:"+addZero(minutes));
           }
          $(".duration_input").val(duration + 0.5);
    });

    $(".plus_m").off('click').on('click', function(){
           var hours = $("#timepicker").val();
           var hour = parseFloat(hours.substring(0, 2));
           var minutes = parseFloat(hours.substring(3,5));
           var min = minutes;
           function addZero(i) {
                if (i < 10) {
                      i = "0" + i;
                }
                return i;
           }
           for (var j=0; j<5;j++) {
                 min = min + 1;
                if(min%5==0) {
                      minutes = min;
                }
           }

           if(minutes<=55) {
                $("#timepicker").val(addZero(hour) + ":"+addZero(minutes));
           } else {
                $("#timepicker").val(addZero(hour)+":00");
           }
    });

     $(".minus_m").off('click').on('click', function(){
           var hours = $("#timepicker").val();
           var hour = parseFloat(hours.substring(0, 2));
           var minutes = parseFloat(hours.substring(3,5));
           var min = minutes;
           function addZero(i) {
                if (i < 10) {
                      i = "0" + i;
                }
                return i;
           }
          for (var j=0; j<5;j++) {
                 min = min - 1;
                 if(min%5==0) {
                      minutes = min;
                }
          }
          if(minutes>=0) {
                $("#timepicker").val(addZero(hour) + ":"+addZero(minutes));
           } else {
                $("#timepicker").val(addZero(hour)+":55");
           }
    });



//LLAMADAS A LAS FUNCIONES//
      cargaDatos();
      botonCerrar();
      cargarArticulos1(e);

      $(".btn_insert_mano").off('click').on('click', function(e){
          insertarMano(e);
      });
      $("#borr_mano").off('click').on('click', function(){
           BorrarMano();
      })
      $("#mod_mano").off('click').on('click', function(){
           modificarMano();
      });

     $("#insert_art").off('click').on('click', function(el){
           insertarArticulo(el);
     });
     $("#borr_art").off('click').on('click', function(){
           borrarArticulo();
     });
     $("#mod_art").off('click').on('click', function(){
           modificarArticulo();
     });

     $("#insert_gast").off('click').on('click', function(){
           $( "#gasto" ).submit();
     });
     $("#mod_gasto").off('click').on('click', function(e){
           e.preventDefault();
           popupLoader("Modificando Gasto");
           var acreedor = $("[name='acreedor2']").val();
           var importe = $(".importe2").val()+"."+$(".importe_dec2").val();
           if(acreedor!="" && importe!="00.00") {
                 modificarGasto();
          }else {
               popupLoader("Tiene que rellenar todos los datos");
                setTimeout(function() {
                      $.mobile.loading( 'hide');
                 }, 2500);
           }
     });

     $("#enviar_peti").off('click').on('click', function(){
           enviarPeticionArticulo();
     });
     $("#mod_pet_art").off('click').on('click', function(){
           modificarPeticionArticulo();
      });
     $("#borr_pet_art").off('click').on('click', function(){
           borrarPeticionArticulo();
      });
     $(".can_sol").off('click').on('click', function(event){
           cancelarPeticionArticulo();
     });
     $("#email_obsv").off('click').on('click', function(){
           enviarEmailObservaciones();
      });

     $('#cargaDatos').on('click', 'tr', function () {
      if(localStorage.EstadoObra==0) {
        ModificarTabla($(this));
      }

     });

     $("#anadir_art").off('click').on('click', function(el){
           anadirArticuloPeticion(el);
     });
     $("#add2").off('keyup').on('keyup', function(e) {
           cargarArticulosPeticion(e);
     });

     $(document).on('click','#close_trab',function() {
           cerrarTrabajo();
     });

    $("#close_trab1").off('click').on('click', function(){
           $("#cerrar_trabajo").click();
     });

     //DATEPICKER Y TIMEPICKER
    $("#timepicker").val(new Date().toJSONLocalTime());
    $('#datepicker_1, #fecha_mano, #datepicker2, #datepicker22, #datepicker3').val(new Date().toJSONLocal());
    $("#fecha_mano, #fecha_ds, #fecha_gasto,  #datepicker2, #datepicker3").date({
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
     $("#link_date").off('click').on('click', function(){
           $("#fecha_mano").datepicker( "show" );
      });
    $("#link_date2").off('click').on('click', function(){
           $("#datepicker2").datepicker( "show" );
    });
    $("a#link_date3").off('click').on('click', function(){
          $("#fecha_ds").datepicker( "show" );
     });
    $("a#link_date4").off('click').on('click', function(){
          $("#fecha_gasto").datepicker( "show" );
     });

    $("#ordenobra").off('click').on('click', '#anular', function(event) {
          event.preventDefault();
          if($("#ordenobra .listaDatos tr").length==0) {
              if($("#txt_anular").val()!="") {
                  $("#anular_enlace").click();
              }else {
                popupLoader('Tienes que insertar un motivo antes de poder anular la obra');
                setTimeout(function() {
                    $.mobile.loading( 'hide');
               }, 2500);
              }
        } else {
                popupLoader('No se puede anular la obra si hay datos insertados');
                setTimeout(function() {
                    $.mobile.loading( 'hide');
               }, 2500);
          }
    });

    $("#ordenobra #btn_anular").off('click').on('click',  function(event) {
        event.preventDefault();
        var descripcion = $("#txt_anular").val();
        anular_obra(localStorage.idObra, descripcion).done( function( response ) {
                if( response.success ) {
                          popupLoader("La Obra y todos sus trabajos han sido anulados, recuerde que para eliminar la anulaci\u00F3n debera contactar con un administrador.");
                          setTimeout(function() {
                               $.mobile.loading( 'hide');
                               window.open("index2.php", "_self");
                          }, 4000);
               } else {
                    popupLoader("No se ha podido anular la obra, ha ocurrido un error");
                    setTimeout(function() {
                               $.mobile.loading( 'hide');
                    }, 3000);
                }
           }).fail(function(jqXHR, textStatus, errorThrown ) {
                popupLoader("Error de c\u00F3digo");
                 setTimeout(function() {
                               $.mobile.loading( 'hide');
               }, 3000);
                 informeErrores(jqXHR.responseText);
           });
    });


var cargarAcreedores = function(){
  var acreedores = new Array();
    cargar_acreedores().done( function( response ) {
         if(response.success) {
              $.each(response.data.datos, function( key2, value2 ) {
                var acreedor= new Object();
                  acreedor.value = value2;
                  acreedores.push(acreedor);
              });
              AutoCompletar(acreedores);
         }
     })
     .fail(function(jqXHR, textStatus, errorThrown) {
           informeErrores(jqXHR.responseText);
     });
}

cargarAcreedores();
var AutoCompletar = function(acreedores) {
          $("#ordenobra .acreedor").autocomplete({
          lookup: acreedores
    });
}


}

var pintarDatos = function (cont, value2,  output2) {
    if(cont%2==0) {
         output2 += "<tr class='"+value2['Tipo']+"";
    } else {
         output2 += "<tr class='"+value2['Tipo']+" alt2";
    }
    if(value2['Usuario']==localStorage.username) {
         output2 += " propio'>";
    } else {
         output2 += "'>";
    }
    var fecha = value2['FechaCreacionAudi']['date'].split(" ");
    fecha1 = fecha[0];
    fecha1 = fecha1.split("-");
    fecha1 = fecha1[2]+"/"+fecha1[1]+"/"+fecha1[0]+" "+fecha[1];
    output2 += "<td class='td_idmat2'><b class='ui-table-cell-label label2'>Tipo</b>"+value2['Tipo']+"<span style='display: none;' class='span_id'>-"+value2['ID']+"</span></td>";
    output2+=  "<td class='td_idmat2'><b class='ui-table-cell-label label2'>Fecha</b>"+fecha1 + "</td>";
    output2 += "<td class='tipo' ><b class='ui-table-cell-label label2'>Usuario</b>"+value2['UsuarioAudi'] + "</td>";
    output2 += "<td class='td_idmat2' '><b class='ui-table-cell-label label2'>Descripci&oacute;n</b>"+value2['Descripcion'] + "</td>";
    output2 += "<td class='tipo' '><b class='ui-table-cell-label label2'>Valor</b>"+value2['Valor'] + "</td>";
    output2 +="</tr>";

    return [output2, cont];
}

