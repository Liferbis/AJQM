
$( document ).on( "pagecreate", "#intro", function() {

    var set_intro = function(empleado, fechaI, fechaF, tipe, descrip, diasN, diasL) {
       //alert(empleado+"--"+fechaI+"--"+fechaF+"--"+tipe+"--"+descrip+"--"+diasN+"--"+diasL);
        
        if(tipe=="vacaciones" || tipe=="PerRe" || tipe=="PerNoRe"){
            return $.post("include/ArchivoWord.php", {"empleado":empleado, "FechaI":fechaI, "FechaF":fechaF, "tipe":tipe, "descrip":descrip, "diasN":diasN, "diasL": diasL
 	          });
        }else{
            alert("ERRORR");
        }
    }

// Cargar dias festivos de la base de datos
    var festivos = [];
    var cargarFestivos = function() {
        return $.post("include/DiasFestivos.php");
    }
 
    var traerFestivos = function() {
        cargarFestivos().done( function( response ) {
            if( response.success) {
                $.each(response.data.datos, function( key2, value2 ) {
                    
                    // key2 nos da el valor numerico 
                    // value2 nos da el valor del atributo
                    festivos[key2]= value2;
                });
            } else {
                alert("<h1>Se ha producido un error al cargar los datos, <br/> Intentelo de nuevo mas tarde!</h1>");
            }
        }).fail(function(jqXHR, textStatus, errorThrown ) {
            alert(jqXHR.responseText);
        });

    }


// al pinchar sobre cualquier parte del input
	$("#FechaI").off('click').on('click', function(event) {
        $('#fecha_Inicio a').click();
    });

    $("#FechaF").off('click').on('click', function(event) {
        $('#fecha_Fin a').click();
    });

// Boton aceptar y generar!!
    $("#intro").on("click", "[name='aceptarW']", function(event) {
    	event.preventDefault();
    	popupLoader("Introduciendo datos")
        var empleado = $("#empleado").val();
        var fechaI = $("#FechaI").val();
        var fechaF = $("#FechaF").val();
        var tipe = $("#tipe").val(); 
        var descrip = $("#descrip").val(); 
        if($("[name='medio1']").attr("data-cacheval")=='false') {
        	var medio1=$("[name='medio1']").val();
        } else {
        	var medio1 = 0;
        }
        if($("[name='medio2']").attr("data-cacheval")=='false') {
        	var medio2=$("[name='medio2']").val();
        } else {
        	var medio2 = 0;
        }
        var dias = CalcularDiasLaborales(fechaI, fechaF)
        var diasL= dias[0]-medio1-medio2;
        var diasN= dias[1];
        //alert("1: "+medio1+" 2: "+medio2)
        set_intro(empleado, fechaI, fechaF, tipe, descrip, diasN, diasL).done( function( response ) {
            if( response.success) {
                setTimeout(function() {
                    $.mobile.loading( 'hide');
                }, 1000);
            } else {
                alert("<h1>Se ha producido un error al cargar los datos, <br/> Intentelo de nuevo mas tarde!</h1>");
            }
        }).fail(function(jqXHR, textStatus, errorThrown ) {
            alert(jqXHR.responseText);
        });
    });

    traerFestivos();
    var CalcularDiasLaborales = function(fechaI, fechaF) {
        
        var fecha1 = fechaI.split("/");
        var fecha2 = fechaF.split("/");
        var fFecha1 = Date.UTC(fecha1[2],fecha1[1]-1,fecha1[0]);
        var fFecha2 = Date.UTC(fecha2[2],fecha2[1]-1,fecha2[0]);
        var dif = fFecha2 - fFecha1;
        var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
        var diasLaborales = 0;
        var diaN=0;

        for(var i=0; i<=dias; i++) {
            var fecha_sinParse = sumaFecha(i,fechaI);
            fecha1 = Date.parse(sumaFecha(i,fechaI));
            day = new Date(fecha1);

            // Si NO es domingo  NI sabado entra !!
            if(day.getDay()!=0 && day.getDay()!=6) {
                diaN++;
                // si la fecha NO se encuentra en el array entra!!
                if($.inArray(fecha_sinParse, festivos)==-1) {
                   
                    // si entra suma un dia laborable!! 
                    diasLaborales++;
                }
                
            }else{
                diaN++;
            }
        }
        var dia = new Array( diasLaborales, diaN );
        return dia;
    }

    sumaFecha = function(d, fecha) {
        var Fecha = new Date();
        var sFecha = fecha || (Fecha.getDate() + "/" + (Fecha.getMonth() +1) + "/" + Fecha.getFullYear());
        var sep = sFecha.indexOf('/') != -1 ? '/' : '-';
        var aFecha = sFecha.split(sep);
        var fecha = aFecha[2]+'/'+aFecha[1]+'/'+aFecha[0];
        fecha= new Date(fecha);
        fecha.setDate(fecha.getDate()+parseInt(d));
        var anno=fecha.getFullYear();
        var mes= fecha.getMonth()+1;
        var dia= fecha.getDate();
        mes = (mes < 10) ? ("0" + mes) : mes;
        dia = (dia < 10) ? ("0" + dia) : dia;
        var fechaFinal = anno+"-"+mes+"-"+dia;
        return (fechaFinal);
    }



    
});