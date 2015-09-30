<?php 
require_once "include/BaseDeDatos.php";
require_once "include/classes.php";
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <title>Vacaciones</title>
  <meta chaeset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <link rel="shortcut icon" href="include/favicon_32x32.ico" type="image/x-icon">
<!-- MIS TEMAS!!! --> 
    <!-- data-theme="c" BOTON AUXILIAR -->
    <link rel="stylesheet" href="libreria/MyThemes/baux.css" />
    <!-- data-theme="d" BOTON AZUL -->
    <link rel="stylesheet" href="libreria/MyThemes/azul.css" />
    <!-- data-theme="e" BOTON Theme B + claro -->
    <link rel="stylesheet" href="libreria/MyThemes/bbaux.css" />
    <!-- data-theme="f" BOTON CANCELAR -->
    <link rel="stylesheet" href="libreria/MyThemes/bc.css" />
    <!-- data-theme="g" BOTON ACEPTAR -->
    <link rel="stylesheet" href="libreria/MyThemes/bac.css" />
    <link rel="stylesheet" href="libreria/MyThemes/jquery.mobile.icons.min.css" />
<!-- -- FIN MIS TEMAS!!! -->
    <link rel="stylesheet" href="libreria/jquery.mobile-1.4.5/jquery.mobile-1.4.5.min.css">

<!-- DATEBOX !!! -->
    <link rel="stylesheet" href="libreria/datebox/jqm-datebox-1.4.5.min.css">
<!-- -- FIN DATEBOX !!! -->

  <!--<script type="text/javascript" src="../libreria/jquery-2.1.3.js"></script>-->
    <script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="libreria/jquery.mobile-1.4.5/jquery.mobile-1.4.5.min.js"></script>

<!-- DATEBOX !!! -->
    <script src="libreria/datebox/jqm-datebox.core.min.js"></script>
    <script src="libreria/datebox/jqueryDateBox.js"></script>
    <script src="libreria/datebox/jquery.mobile.datebox.i18n.en_US.utf8.js"></script>
<!-- -- FIN DATEBOX !!! -->
  
    <script src="libreria/jquery-ui/jquery-ui.js"></script>
    
    
    <script src="libreria/general.js" type="text/javascript"></script>
    <script src="libreria/vacas.js" type="text/javascript"></script>

<!-- DATEBOX !!! -->
    <script type="text/javascript">

    window.fmtMe = function(date) {
          //console.log(date);
        if ( date.Date > 9 && date.Date < 20 ) {
            return { text: "<i>" + date.Date + "</i>", "class": "reddyred" };
        } else {
            return date.Date;
        }
    }
    jQuery.extend(jQuery.mobile.datebox.prototype.options, {
        closeCallback: function(a, b) { console.log(a); console.log(b); },
        closeCallbackArgs: ['hi'],
            //beforeOpenCallback: function(a, b) { console.log(a); console.log(b); return true;},
            useLang: "en",
            useClearButton: true,
            useCollapsedBut: false,
            calShowWeek: false,
            themeCloseButton: "b",
            calUsePickers: true,
            calUsePickersIcons: true,
            calNoHeader: true,
            calControlGroup: false,
            calFormatter: "fmtMe",
            minDur: 34652,
            maxDur: 34700,
            customData: [
                {"input": false, "name": "Wheel1", "data":["a","b","c","d"]},
                {"input": false, "name": "Wheel2", "data":["a","b","c","d"]},
                {"input": false, "name": "Wheel3", "data":["a","b","c","d"]},
            ],
            overrideSlideFieldOrder: ["y","a","m","d","h","i"]
    });
    </script>
<!-- -- FIN DATEBOX !!! -->

</head> 
<body>
<!------------------>
<!-- INICIO MENU PRINCIPAL-->
<div data-role="page" id="two">
    <div data-role="panel" id="navpanel" data-theme="b" data-display="overlay" data-position="left">
        <div data-role="controlgroup" data-corners="false">
          <a href="#two" data-icon="bars" data-role="button">Men&uacute;</a>
          <a href="#ordentrabajo" data-icon="clipboard" data-role="button">Ordenes de Trabajo</a>
          <a href="#gastos" data-icon="euro" data-role="button">Gastos</a>
          <a href="#busqueda" data-role="button" data-icon="search"> B&uacute;squeda </a>
          <?php //if($_SESSION['username']=="j.martinez" || $_SESSION['username']=="f.novoa" || $_SESSION['username'] == "c.garcia"  || $_SESSION['username'] == "f.garcia" || $_SESSION['username'] == "l.cossio") {?>
          <a href="#asignar" data-icon="user" data-role="button">Asignar Obras</a>
          <a href="#reabrir" data-role="button" data-icon="key">  Reabrir Obras </a>
          <a href="#operarioObra" data-role="button" data-icon="thumb-tack">  Operario - Obra </a>
          <a href="#informes" data-icon="euro" data-role="button">Informe de Gastos</a>
          <!-- <a href="#graficos" data-icon="bar-chart-o" data-role="button">Gr&aacute;ficos</a> -->
          <?php //} else { ?>
          <a href="#autoasignar" data-role="button" data-icon="user">Auto-Asignar Obras</a>
          <?php //} ?>
          <?php //if($_SESSION['username']=="r.corrales"){ ?>
          <a href="#ordenes_terminadas" data-role="button" data-icon="clipboard">&Oacute;rdenes Pendientes</a>
          <?php //} ?>
          <a href="#documentos" data-icon="book" data-role="button">Documentos</a>
        </div>
    </div>
    <div data-role="header" data-position="fixed" data-theme="b" align="center">
        <a  data-icon="bars" class="ui-btn-left bars-button btn_cab" style="margin-top:10px;" href="#navpanel" ><span>Men&uacute;</span></a>
        <img src="include/logo.png" height="50" width="165" alt="main logo" vspace="2"/>
        <a id="bars-button" data-icon="power" class="ui-btn-right btn_cab" style="margin-top:10px;"><span>Desconectar</span></a>
    </div>
    <div data-role="content" class='login_prin'>
        <a href="#ordentrabajo" data-role="button" data-icon="clipboard" class='title_span' data-theme="b"> &Oacute;RDENES DE TRABAJO </a>
        <a href="#gastos" data-role="button" data-icon="euro" class='title_span' data-theme="b">  GASTOS </a>
        <a href="#Agenda" data-role="button" data-icon="calendar" class='title_span vacaciones_url' data-theme="b"> VACACIONES </a>
        <a href="#busqueda" data-role="button" data-icon="search" class='title_span' data-theme="b"> B&Uacute;SQUEDA </a>
        <?php //if($_SESSION['username']=="j.martinez" || $_SESSION['username']=="f.novoa" || $_SESSION['username'] == "c.garcia"  || $_SESSION['username'] == "f.garcia" || $_SESSION['username'] == "l.cossio") {?>
        <a href="#asignar" data-role="button" data-icon="user" class='title_span' data-theme="b">  ASIGNAR OBRAS </a>
        <a href="#reabrir" data-role="button" data-icon="key" class='title_span' data-theme="b">  REABRIR OBRAS </a>
        <a href="#operarioObra" data-role="button" data-icon="thumb-tack" class='title_span' data-theme="b">  OPERARIO - OBRA </a>
        <a href="#informes" data-role="button" data-icon="euro" class='title_span' data-theme="b">  INFORMES DE GASTOS </a>
        <!-- <a href="#graficos" data-role="button" data-icon="bar-chart-o" class='title_span' data-theme="b">  GR&Aacute;FICOS </a> -->
        <?php //} else { ?>
        <a href="#autoasignar" data-role="button" data-icon="user" class='title_span' data-theme="b">  AUTO - ASIGNAR OBRAS </a>
        <?php // } ?>
        <?php //if($_SESSION['username']=="r.corrales"){ ?>
        <a href="#ordenes_terminadas" data-role="button" data-icon="clipboard" class='title_span' data-theme="b">&Oacute;RDENES PENDIENTES </a>
        <?php //} ?>
        <a href="#documentos" data-role="button" data-icon="book" class='title_span' data-theme="b">  DOCUMENTOS </a>
    </div>
    <div data-role="footer" data-position="fixed" data-theme="b">
        Usuario <?php //echo $_SESSION['username']; ?>
    </div>
    <div style='display:none;' id='id_us'>
        <?php //echo $_SESSION['idUsuario']; ?>
    </div>
</div>
<!-- FIN INICIO MENU PRINCIPAL-->
<!------------------>


<!------------------>
<!--INICIO VACACIONES-->
<div data-role="page" data-theme="a" id="Agenda">
    <!-- MENU -->
    <div data-role="panel" id="navpanel" data-theme="b" data-display="overlay" data-position="left"> 
        <div data-role="controlgroup" data-corners="false">
            <a href="#two" data-icon="bars" data-role="button">Men&uacute;</a>
            <a href="#ordentrabajo" data-icon="clipboard" data-role="button">Ordenes de Trabajo</a>
            <a href="#gastos" data-icon="euro" data-role="button">Gastos</a>
            <a href="#Agenda" data-role="button" data-icon="calendar" >Vacaciones</a>
            <a href="#busqueda" data-role="button" data-icon="search"> B&uacute;squeda </a>
            <?php //if($_SESSION['username']=="j.martinez" || $_SESSION['username']=="f.novoa" || $_SESSION['username'] == "c.garcia"  || $_SESSION['username'] == "f.garcia" || $_SESSION['username'] == "l.cossio") {?>
            <a href="#asignar" data-icon="user" data-role="button">Asignar Obras</a>
            <a href="#reabrir" data-role="button" data-icon="key">  Reabrir Obras </a>
            <a href="#operarioObra" data-role="button" data-icon="thumb-tack">  Operario - Obra </a>
            <a href="#informes" data-icon="euro" data-role="button">Informe de Gastos</a>
            <!-- <a href="#graficos" data-icon="bar-chart-o" data-role="button">Gr&aacute;ficos</a> -->
            <?php //} else { ?>
            <a href="#autoasignar" data-role="button" data-icon="user">Auto-Asignar Obras</a>
            <?php// } ?>
            <?php //if($_SESSION['username']=="r.corrales"){ ?>
            <a href="#ordenes_terminadas" data-role="button" data-icon="clipboard">&Oacute;rdenes Pendientes</a>
            <?php //} ?>
            <a href="#documentos" data-icon="book" data-role="button">Documentos</a>
        </div>
    </div>
    <div data-role="header" data-position="fixed" data-theme="b" align="center">
        <a  data-icon="bars" class="ui-btn-left bars-button btn_cab" style="margin-top:10px;" href="#navpanel" ><span>Men&uacute;</span></a>
        <img src="include/logo.png" height="50" width="165" alt="main logo" vspace="2"/>
        <a id="bars-button" data-icon="power" class="ui-btn-right btn_cab" style="margin-top:10px;"><span>Desconectar</span></a>
    </div>
    <!-- -- FIN MENU -- --> 

    <div  data-role="content" data-theme="a">
        <div class="ui-grid-c">
            <div class="ui-block-a">
                <a href="#intro" data-role="button" data-theme="b" data-icon="edit">Introducir Vacaciones</a>
            </div>
            <div class="ui-block-b">
                <a href="" data-role="button" data-theme="b" data-icon="action">Generar  solicitud</a>
            </div>
            <div class="ui-block-c" >
                <a href="" data-role="button" data-theme="b" data-icon="eye" >Consultar</a>
            </div>
            <div class="ui-block-d" >
                <a href="" data-role="button" data-theme="b" data-icon="arrow-d">Excel</a>
            </div>
        </div> 
    </div>
    <div data-role="footer" data-position="fixed" data-theme="b">Usuario <?php //echo $_SESSION['username']; ?>
    </div>
    <div style='display:none;' id='id_us'><?php //echo $_SESSION['idUsuario']; ?></div>
</div>
<!--FIN VACACIONES-->
<!------------------>


<!------------------>
<!--INICIO INTRODUCIR-->
<div data-role="page" data-theme="a" id="intro">
    <!-- -- MENU -- -->
    <div data-role="panel" id="navpanel" data-theme="b" data-display="overlay" data-position="left"> 
        <div data-role="controlgroup" data-corners="false">
            <a href="#two" data-icon="bars" data-role="button">Men&uacute;</a>
            <a href="#ordentrabajo" data-icon="clipboard" data-role="button">Ordenes de Trabajo</a>
            <a href="#gastos" data-icon="euro" data-role="button">Gastos</a>
            <a href="#Agenda" data-role="button" data-icon="calendar" >Vacaciones</a>
            <a href="#busqueda" data-role="button" data-icon="search"> B&uacute;squeda </a>
            <?php //if($_SESSION['username']=="j.martinez" || $_SESSION['username']=="f.novoa" || $_SESSION['username'] == "c.garcia"  || $_SESSION['username'] == "f.garcia" || $_SESSION['username'] == "l.cossio") {?>
            <a href="#asignar" data-icon="user" data-role="button">Asignar Obras</a>
            <a href="#reabrir" data-role="button" data-icon="key">  Reabrir Obras </a>
            <a href="#operarioObra" data-role="button" data-icon="thumb-tack">  Operario - Obra </a>
            <a href="#informes" data-icon="euro" data-role="button">Informe de Gastos</a>
            <!-- <a href="#graficos" data-icon="bar-chart-o" data-role="button">Gr&aacute;ficos</a> -->
            <?php //} else { ?>
            <a href="#autoasignar" data-role="button" data-icon="user">Auto-Asignar Obras</a>
            <?php// } ?>
            <?php //if($_SESSION['username']=="r.corrales"){ ?>
            <a href="#ordenes_terminadas" data-role="button" data-icon="clipboard">&Oacute;rdenes Pendientes</a>
            <?php //} ?>
            <a href="#documentos" data-icon="book" data-role="button">Documentos</a>
        </div>
    </div>
    <div data-role="header" data-position="fixed" data-theme="b" align="center">
        <a  data-icon="bars" class="ui-btn-left bars-button btn_cab" style="margin-top:10px;" href="#navpanel" ><span>Men&uacute;</span></a>
        <img src="include/logo.png" height="50" width="165" alt="main logo" vspace="2"/>
        <a id="bars-button" data-icon="power" class="ui-btn-right btn_cab" style="margin-top:10px;"><span>Desconectar</span></a>
    </div>
    <!-- -- FIN MENU -- --> 

    <div  data-role="content">
        <form name="intro1" id="intro1" method="post">  
            <fieldset >
                <h3>Elige empleado: </h3>
                <?php 
                    $sesion="l.fernandez";//$_SESSION["usuario"];
                    $empleados=BD::CargaEmpleados($sesion);
                ?>
                <select name="empleado" id="empleado" data-theme="e" data-native-menu="false">
                    <option>--- Seleccione empleado ---</option>
                    <?php foreach ($empleados as $emple) { ?>
                    <option value="<?php echo $emple->codigo;?>">
                        <?php echo $emple->nombre." ".$emple->apellido1." ".$emple->apellido2; ?>
                    </option>
                    <?php } ?>
                </select>
            </fieldset>

            <div class="ui-field-contain" id='fecha_Inicio'>
              <label for="FechaI"><h3>Fecha desde:</h3></label>
              <input name="FechaI" type="text"  data-role="datebox" data-datebox-mode="flipbox" id="FechaI" />
            </div>

            <label>
                <input type="checkbox" name="medio1" value="0.5" >
                <h3>Medio dia</h3>
            </label>

            <div class="ui-field-contain" id='fecha_Fin'>
                <label for="FechaF"><h3>Fecha hasta:</h3></label>
                <input name="FechaF" type="text"  data-role="datebox" data-datebox-mode="flipbox" id="FechaF"/>
            </div>

            <label>
                <input type="checkbox" name="medio2" value="0.5" >
                <h3>Medio dia</h3>
            </label>

            <div class="ui-field-contain">
                <h3>Tipo:</h3>
                <select name="tipe" id="tipe" data-theme="e" data-native-menu="false" >
                    <option>-- Selecciona Tipo --</option>
                    <option value="vacaciones">Vacaciones</option>
                    <option value="PerRe">Permiso Retribuido</option>
                    <option value="PerNoRe">Permiso no retribuido</option>
                    <option value="bec">Baja enfermedad comun</option>
                    <option value="bal">Baja accidente laboral</option>
                </select>
            </div>
            <div class="ui-field-contain">
                <label for="descrip"><h3>Comentario</h3></label>
                <textarea name="descrip" id="descrip" data-theme="a"></textarea>
            </div>
            <div class="ui-grid-b">
                <div class="ui-block-a">
                    <button data-role="button" name="aceptarW" data-theme="c" data-icon="bullets">
                        Aceptar y Generar Word
                    </button>
                </div>
                <div class="ui-block-b" >
                    <a href="#two" data-role="button" data-theme="f" data-icon="delete" >Cancelar</a>
                </div>
                <div class="ui-block-c" >
                    <input type="submit" name="aceptar" value="Aceptar" data-role="button" data-theme="g" data-icon="bullets">
                </div>
            </div>
        </form>
        <div class="festivos">
            
        </div>

    </div>
    <div data-role="footer" data-position="fixed" data-theme="b">
        Usuario <?php //echo $_SESSION['username']; ?>
    </div>
    <div style='display:none;' id='id_us'>
        <?php //echo $_SESSION['idUsuario']; ?>
    </div>
</div>
<!--FIN INTRODUCIR-->
<!------------------>


<!------------------>
<!--INICIO CORRECTO-->
<div data-role="page" data-theme="a" id="correcto">
    <!-- -- MENU -- -->
    <div data-role="panel" id="navpanel" data-theme="b" data-display="overlay" data-position="left"> 
        <div data-role="controlgroup" data-corners="false">
            <a href="#two" data-icon="bars" data-role="button">Men&uacute;</a>
            <a href="#ordentrabajo" data-icon="clipboard" data-role="button">Ordenes de Trabajo</a>
            <a href="#gastos" data-icon="euro" data-role="button">Gastos</a>
            <a href="#Agenda" data-role="button" data-icon="calendar" >Vacaciones</a>
            <a href="#busqueda" data-role="button" data-icon="search"> B&uacute;squeda </a>
            <?php //if($_SESSION['username']=="j.martinez" || $_SESSION['username']=="f.novoa" || $_SESSION['username'] == "c.garcia"  || $_SESSION['username'] == "f.garcia" || $_SESSION['username'] == "l.cossio") {?>
            <a href="#asignar" data-icon="user" data-role="button">Asignar Obras</a>
            <a href="#reabrir" data-role="button" data-icon="key">  Reabrir Obras </a>
            <a href="#operarioObra" data-role="button" data-icon="thumb-tack">  Operario - Obra </a>
            <a href="#informes" data-icon="euro" data-role="button">Informe de Gastos</a>
            <!-- <a href="#graficos" data-icon="bar-chart-o" data-role="button">Gr&aacute;ficos</a> -->
            <?php //} else { ?>
            <a href="#autoasignar" data-role="button" data-icon="user">Auto-Asignar Obras</a>
            <?php// } ?>
            <?php //if($_SESSION['username']=="r.corrales"){ ?>
            <a href="#ordenes_terminadas" data-role="button" data-icon="clipboard">&Oacute;rdenes Pendientes</a>
            <?php //} ?>
            <a href="#documentos" data-icon="book" data-role="button">Documentos</a>
        </div>
    </div>
    <div data-role="header" data-position="fixed" data-theme="b" align="center">
        <a  data-icon="bars" class="ui-btn-left bars-button btn_cab" style="margin-top:10px;" href="#navpanel" ><span>Men&uacute;</span></a>
        <img src="include/logo.png" height="50" width="165" alt="main logo" vspace="2"/>
        <a id="bars-button" data-icon="power" class="ui-btn-right btn_cab" style="margin-top:10px;"><span>Desconectar</span></a>
    </div>
    <!-- -- FIN MENU -- --> 

    <div  data-role="content">
        <h3 style="text-align:center">Realizado correctamente</h3>
        <div class="ui-grid-a">
            <div class="ui-block-a">
                <a href="#Agenda" data-role="button" data-theme="b" data-icon="arrow-l">Atras</a>
            </div>
            <div class="ui-block-b" >
                <a href="#two" data-role="button" data-theme="b" data-icon="home" >Pagina principal</a>
            </div>
        </div>
    </div>
    <div data-role="footer" data-position="fixed" data-theme="b">
        Usuario <?php //echo $_SESSION['username']; ?>
    </div>
    <div style='display:none;' id='id_us'>
        <?php //echo $_SESSION['idUsuario']; ?>
    </div>
</div>
<!--FIN CORRECTO-->
<!------------------>


<!------------------>
<!--INICIO ERROR-->
<div data-role="page" data-theme="a" id="correcto">
    <!-- -- MENU -- -->
    <div data-role="panel" id="navpanel" data-theme="b" data-display="overlay" data-position="left"> 
        <div data-role="controlgroup" data-corners="false">
            <a href="#two" data-icon="bars" data-role="button">Men&uacute;</a>
            <a href="#ordentrabajo" data-icon="clipboard" data-role="button">Ordenes de Trabajo</a>
            <a href="#gastos" data-icon="euro" data-role="button">Gastos</a>
            <a href="#Agenda" data-role="button" data-icon="calendar" >Vacaciones</a>
            <a href="#busqueda" data-role="button" data-icon="search"> B&uacute;squeda </a>
            <?php //if($_SESSION['username']=="j.martinez" || $_SESSION['username']=="f.novoa" || $_SESSION['username'] == "c.garcia"  || $_SESSION['username'] == "f.garcia" || $_SESSION['username'] == "l.cossio") {?>
            <a href="#asignar" data-icon="user" data-role="button">Asignar Obras</a>
            <a href="#reabrir" data-role="button" data-icon="key">  Reabrir Obras </a>
            <a href="#operarioObra" data-role="button" data-icon="thumb-tack">  Operario - Obra </a>
            <a href="#informes" data-icon="euro" data-role="button">Informe de Gastos</a>
            <!-- <a href="#graficos" data-icon="bar-chart-o" data-role="button">Gr&aacute;ficos</a> -->
            <?php //} else { ?>
            <a href="#autoasignar" data-role="button" data-icon="user">Auto-Asignar Obras</a>
            <?php// } ?>
            <?php //if($_SESSION['username']=="r.corrales"){ ?>
            <a href="#ordenes_terminadas" data-role="button" data-icon="clipboard">&Oacute;rdenes Pendientes</a>
            <?php //} ?>
            <a href="#documentos" data-icon="book" data-role="button">Documentos</a>
        </div>
    </div>
    <div data-role="header" data-position="fixed" data-theme="b" align="center">
        <a  data-icon="bars" class="ui-btn-left bars-button btn_cab" style="margin-top:10px;" href="#navpanel" ><span>Men&uacute;</span></a>
        <img src="include/logo.png" height="50" width="165" alt="main logo" vspace="2"/>
        <a id="bars-button" data-icon="power" class="ui-btn-right btn_cab" style="margin-top:10px;"><span>Desconectar</span></a>
    </div>
    <!-- -- FIN MENU -- --> 

    <div  data-role="content">
        <h3 style="text-align:center">Se ha producido un error <br> Vuelva a intentarlo mas tarde</h3>
        <div class="ui-grid-a">
            <div class="ui-block-a">
                <a href="#Agenda" data-role="button" data-theme="b" data-icon="arrow-l">Atras</a>
            </div>
            <div class="ui-block-b" >
                <a href="#two" data-role="button" data-theme="b" data-icon="home" >Pagina principal</a>
            </div>
        </div>
    </div>
    <div data-role="footer" data-position="fixed" data-theme="b">
        Usuario <?php //echo $_SESSION['username']; ?>
    </div>
    <div style='display:none;' id='id_us'>
        <?php //echo $_SESSION['idUsuario']; ?>
    </div>
</div>
<!--FIN ERROR-->
<!------------------>
</body>
</html>