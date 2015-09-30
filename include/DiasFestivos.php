<?php
/////////////////////////////////////////////
/////// Extrae los dias festivos de la //////
/////// base de datos para compararles///////
////////con los dias laborales en  //////////
////////////   vacas.js         /////////////
/////////////////////////////////////////////

require_once "classes.php";


$dwes = new mysqli("localhost", "root" , "", "vajq");
$dwes->set_charset("utf8");


$query="SELECT * FROM festivos ORDER BY fecha ASC";

$resultado = $dwes->query($query);

$jsondata = array();
$festivo=array();
$diasF=array();
$cont = 0;
while($fes= $resultado->fetch_object() ){
	$festivo  [] =  new fiestas(
				$fes->ambito,
				$fes->fecha,
				$fes->comentarios);
	$cont++;
}

foreach ($festivo as $f) {
	$diasF [] =	$f->fecha;
}

if($cont>0) {
	$jsondata["success"] = true;
} else {
	$jsondata["success"] = false;
}

$jsondata["data"]["datos"] = $diasF;

$dwes->close();

header('Content-type: application/json; charset=utf-8');
echo json_encode($jsondata);

?>