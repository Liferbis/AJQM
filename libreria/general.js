     var popupLoader = function(message) {
           $.mobile.loading( 'show', {
                 text: message,
                 textVisible: true,
                 theme:  "b",
                 html: ""
          });
     }

     var informeErrores = function(message) {
     	                          $.ajax({
                                  type:"POST",
                                  data: { error: message  },
                                  url: "../log.php",
                                  success: function(data){
                                        console.log("Ha escrito en el fichero");
                                  }
                                 //$("#response-container2").html("Algo ha fallado: " +  errorThrown+" - "+textStatus);
                        });
     }
          function secondsTimeSpanToHMS(s) {
          var h = Math.floor(s/3600); //Get whole hours
           s -= h*3600;
           var m = Math.floor(s/60); //Get remaining minutes
           s -= m*60;
            return h+":"+(m < 10 ? '0'+m : m)+":"+(s < 10 ? '0'+s : s); //zero padding on minutes and seconds
     }

     Date.prototype.toJSONLocal = (function() {
          function addZ(n) {
                  return (n<10? '0' : '') + n;
           }
           return function() {
                return this.getFullYear() + '-' + addZ(this.getMonth() +1) + '-' + addZ(this.getDate());
           };
     }())

    Date.prototype.toJSONLocal2 = (function() {
          function addZ(n) {
                  return (n<10? '0' : '') + n;
           }
           return function() {
                return addZ(this.getDate() + '/' + addZ(this.getMonth() +1) + '/' + this.getFullYear());
           };
     }())
     Date.prototype.toJSONLocalTime = (function() {
           function addZero(i) {
                if (i < 10) {
                      i = "0" + i;
                }
                 return i;
          }
          var d = new Date();
           return function() {
                return addZero(this.getHours()) + ':' + addZero(this.getMinutes());
           };
     }())

     Date.prototype.toJSONLocalMonth = (function() {
            function addZ(n) {
                return (n<10? '0' : '') + n;
            }
            return function() {
                return this.getFullYear() + '-' +
                    addZ(this.getMonth() +1) + '-' +
                    addZ(1);
            };
    }())

     var MostrarPaginacion = function(contador, padre) {
          var primer = (parseInt(localStorage.Page)*15)+1;
          var segundo = primer+14;
          if(segundo>contador) {
              segundo = contador;
         }
         localStorage.MaxPage = Math.ceil((contador/15)-1);
         $(padre+" .pagination_info span:eq(0)").html(primer);
         $(padre+" .pagination_info span:eq(1)").html(segundo);
         $(padre+" .pagination_info span:eq(2)").html(contador);
     }

      var CambiarPagina = function(boton) {
        var diferente = false;
         switch(boton) {
            case "0":
                if(parseInt(localStorage.Page)>0) {
                      localStorage.Page = 0;
                      diferente = true;
                  }
                  break;
             case "1":
                  if(parseInt(localStorage.Page)>0) {
                      localStorage.Page= parseInt(localStorage.Page) -1;
                      diferente = true;
                    }
                      break;
              case "2":
                  if(parseInt(localStorage.Page)<parseInt(localStorage.MaxPage)) {
                      localStorage.Page =parseInt(localStorage.Page) +1;
                      diferente = true;
                    }
                      break;
              case "3":
                  if(parseInt(localStorage.Page)<parseInt(localStorage.MaxPage)) {
                      localStorage.Page = parseInt(localStorage.MaxPage);
                      diferente = true;
                    }
                      break;
         }
         return diferente;
      }



      //Funciones Vista




    var pintarObrasReabrir = function(cont, NObra, IDObra, IDTrabajo, NObra, Descripcion, Cliente) {
         output = "<tr class='' data-num="+cont+" data-nobra="+NObra+" data-idobra="+IDObra+" data-idtrabajo="+IDTrabajo+">";
         output +=" <th class='numero_tabla' style='text-align: center;'>"+NObra+"</th>";
         output += "<td style='text-align: center;' class=''><b class='ui-table-cell-label'>Descripci&oacute;n</b>"+Descripcion + "</td>";
         output += "<td style='text-align: center;' class='tipo' '><b class='ui-table-cell-label'>Cliente</b>"+Cliente+ "";
         output += "</td></tr>";
         return [output, cont];
    }
