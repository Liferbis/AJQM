<?php 
require_once ("BaseDeDatos.php");
$emple=BD::UnEmpleado($_POST['empleado']);

foreach ($emple as $em) {
	$codigo=$em->codigo;
	$dni=$em->dni;
	$nombre=$em->nombre;
	$apellido1=$em->apellido1;
	$apellido2=$em->apellido2;
	$localidad=$em->localidad;
	$movil=$em->movil;
	$dep=$em->comentarios;
	$saldo=$em->saldo;
}

$jsondata = array();
$hoy=date("Y-m-d H:i:s");
$hoy1=date("Y-m-d");
$docu=$nombre."_".$apellido1."-".$hoy1;

$sesion="l.fernandez";

$estado=BD::dias($codigo, $_POST["FechaI"], $_POST["FechaF"], $_POST["diasN"], $_POST["diasL"], $_POST["tipe"], $_POST["descrip"], $sesion);

if($estado=="true") {
	$jsondata["success"] = true;
} else {
	$jsondata["success"] = false;
}

header('Content-type: application/json; charset=utf-8');
echo json_encode($jsondata);
 ?>