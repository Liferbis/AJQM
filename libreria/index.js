/*///////////////////////////////////////////////////
---------------------------- PAGE TWO ---------------------------
///////////////////////////////////////////////////*/
$( document ).on( "pageshow", "#two", function() {
    menuShow();
});
$( document ).on( "pagecreate", "#two", function() {
    menuCreate();
});
/*///////////////////////////////////////////////////
----------------------PAGE ORDEN TRABAJO -------------------------
////////////////////////////////////////////////////*/
$( document ).on( "pageshow", "#ordentrabajo", function() {
     OrdenTrabajoShow();
});
$( document ).on( "pagecreate", "#ordentrabajo", function() {
    OrdenTrabajoCreate();
});
/*///////////////////////////////////////////////////
------------------PAGE ORDEN TRABAJO LISTA -------------------
////////////////////////////////////////////////////*/
$( document ).on( "pageshow", "#ordentrabajo_lista", function() {
    OrdenTrabajoListaShow();
});
$( document ).on( "pagecreate", "#ordentrabajo_lista", function() {
    OrdenTrabajoListaCreate();
});
/*///////////////////////////////////////////////////
--PAGE ORDEN TRABAJO_REASIGNAR -> SHOW EVENT ---
////////////////////////////////////////////////////*/
$( document ).on( "pagecreate", "#ordentrabajo_reasignar", function() {
    OrdenTrabajoReasignarCreate();
});
$( document ).on( "pageshow", "#ordentrabajo_reasignar", function() {
    OrdenTrabajoReasignarShow();
});
/*///////////////////////////////////////////////////
---------------------------PAGE ORDENOBRA --------------------------
////////////////////////////////////////////////////*/
$( document ).on( "pagecreate", "#ordenobra", function(e) {
     OrdenObraCreate(e);
});
/*///////////////////////////////////////////////////
--------------------------PAGE INFORMES ------------------------------
////////////////////////////////////////////////////*/
$( document ).on( "pageshow", "#informes", function() {
    InformesShow();
});
/*///////////////////////////////////////////////////
--------------------------- PAGE GASTOS -----------------------------
////////////////////////////////////////////////////*/
$( document ).on( "pagecreate", "#gastos", function() {
    GastosCreate();
});
/*///////////////////////////////////////////////////
-------------------------- PAGE ASIGNAR ---------------------------
////////////////////////////////////////////////////*/
$( document ).on( "pageshow", "#asignar", function() {
    AsignarShow();
});
/*///////////////////////////////////////////////////
---------------------- PAGE AUTOASIGNAR ------------------------
////////////////////////////////////////////////////*/
$( document ).on( "pagecreate", "#autoasignar", function() {
      AutoAsignarCreate();
});
/*///////////////////////////////////////////////////
-------------------PAGE ASIGNARTRABAJO ---------------------
////////////////////////////////////////////////////*/
$( document ).on( "pageshow", "#asignartrabajo", function() {
    AsignarTrabajoShow();
});
/*///////////////////////////////////////////////////
-------------------PAGE BUSQUEDA ---------------------
////////////////////////////////////////////////////*/
$( document ).on( "pageshow", "#busqueda", function() {
    BusquedaShow();
});
$( document ).on( "pagecreate", "#busqueda", function() {
  BusquedaCreate();
});
/*///////////////////////////////////////////////////
---------------PAGE SHOW - BUSQUEDA2 ----------------
////////////////////////////////////////////////////*/
$( document ).on( "pageshow", "#busqueda2", function() {
    Busqueda2Show();
});
/*///////////////////////////////////////////////////
---------PAGE BUSQUEDA ORDEN TRABAJO ->  ---------
////////////////////////////////////////////////////*/
$( document ).on( "pagecreate", "#busqueda3", function() {
          Busqueda3Create();
    });
$( document ).on( "pageshow", "#busqueda3", function() {
    Busqueda3Show();
});
/*///////////////////////////////////////////////////
-------------------- PAGE BUSQUEDA OBRA ->  -------------------
////////////////////////////////////////////////////*/
$(document).on("pageshow","#busqueda_obra", function() {
      BusquedaObraShow();
});
/*///////////////////////////////////////////////////
----------------------------PAGE REABRIR----------------------------
////////////////////////////////////////////////////*/
$(document).on('pageshow', '#reabrir', function(event) {
    ReabrirShow();
});
/*///////////////////////////////////////////////////
-------------------- PAGE REABRIR TRABAJO ---------------------
////////////////////////////////////////////////////*/
$( document ).on( "pageshow", "#reabrirtrabajo", function() {
  ReabrirTrabajoShow();
});
/*///////////////////////////////////////////////////
---------------------- PAGE OPERARIO OBRA -----------------------
////////////////////////////////////////////////////*/
$( document ).on( "pageshow", "#operarioObra", function() {
    OperarioObraShow();
});
/*///////////////////////////////////////////////////
-------------------------- PAGE GASTOS 2 ---------------------------
////////////////////////////////////////////////////*/
$( document ).on( "pageshow", "#gastos2", function() {
      Gastos2Show();
});
/*///////////////////////////////////////////////////
----------------- PAGE ORDENES TERMINADAS ------------------
////////////////////////////////////////////////////*/
$( document ).on( "pageshow", "#ordenes_terminadas", function() {
    OrdenesTerminadasShow();
});