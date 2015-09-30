var BusquedaShow = function() {
   	localStorage.OrdenObra = "";
}

var BusquedaCreate = function() {

	$('[data-icon="power"]').off('click').on('click', function(event) {
           	event.preventDefault();
           	localStorage.logout == true;
           	window.open("logout.php", "_self");
         });

     	var getClientesBusqueda = function(cliente, razon) {
           	return $.post( "/../php/AJAX/getClientesBusqueda.php", { "cliente" : cliente, "razon" : razon});
     	}

   	var cargarClientes = function() {
      		var cliente = $("#search_cliente").val();
     		var razon = $("#search_razon").val();
        		getClientesBusqueda(cliente, razon).done( function( response ) {
            		if( response.success ) {
                			$("#list_busqueda").html("");
                			$.each(response.data.obra, function( key, value ) {
                    			pintarClientes(value);
                 			});
                			$(".ul_interior li").off('click').on('click', function(event) {
		                           event.preventDefault();
		                           localStorage.IDDireccion = $(this).attr("iddireccion");
		                           $.mobile.changePage( "index2.php#busqueda2", { changeHash: false });
                			});
	                		$( "#list_busqueda" ).collapsibleset('refresh');
	                		$("ul").listview();
	            	} else {
	              		$("#list_busqueda").html("");
	              		popupLoader('No hay clientes con esos parametros');
	                        	setTimeout(function() {
	                                	$.mobile.loading( 'hide');
	                      	}, 2000);
	            	}
	         })
	         .fail(function(jqXHR, textStatus, errorThrown ) {
	               informeErrores(jqXHR.responseText);
	         });
	}

        	$("#btn_buscar").off('click').on('click', function(event) {
          	event.preventDefault();
          	if($("#search_cliente").val()=="" && $("#search_razon").val()=="" && $("#search_oper").val()=="" /*&& $("#search_estado").val()==""*/) {
            		popupLoader('Tiene que rellenar algun dato antes de buscar');
                        	setTimeout(function() {
                                	$.mobile.loading( 'hide');
                      	}, 2000);
          	} else {
            		cargarClientes();
          	}
        });

        	$("#btn_clear").off('click').on('click', function(event) {
	         event.preventDefault();
	         var cliente = $("#search_cliente").val("");
	         var razon = $("#search_razon").val("");
	         $("#list_busqueda").html("");
	         var operario = $("#search_oper").val();
        	});

}

var pintarClientes = function(value) {
	if($("h2."+value['IDCliente']+"").length>0) {
                  $("h2."+value['IDCliente']+"").parent().children("ul").append("<li data-theme='a' IDDireccion='"+value['IDDireccion']+"'><a href='#'>"+value['RazonSocial']+" ("+value['ObrasAsignadas']+")</a></li>");
         } else {
                  output = "<div data-role='collapsible' data-iconpos='right' data-shadow='false' data-corners='false' data-inset='false'>";
                  output +="<h2 class='"+value['IDCliente']+"'>"+value['DescCliente'] + "<input value='"+value['DescCliente']+"' style='visibility:hidden;width:0; height:0;' ></h2>";
                  output +="<ul id='"+value['IDCliente']+"' class='ul_interior' data-role='listview' data-content-theme='a'>";
                  output +="<li data-theme='a' IDDireccion='"+value['IDDireccion']+"'>";
                  output +="<a href='#'>"+value['RazonSocial']+" ("+value['ObrasAsignadas']+")</a>";
                  output +="</li></ul></div>";
                  $("#list_busqueda").append(output);
          }
}