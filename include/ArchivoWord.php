<?php

	require_once ("BaseDeDatos.php");
	require_once("/../libreria/tcpdf/tcpdf.php");
	
	ob_clean();

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

	$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
	// set document information
	$pdf->SetCreator(PDF_CREATOR);
	$pdf->SetAuthor('l.fernandez');
	$pdf->SetTitle('Parte de Vacaciones');
	$pdf->SetSubject('Parte de Vacaciones');
	$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, '' , "Usuario: ".$nombre." (".$hoy.")");


	// set header and footer fonts
	$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
	$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

	// set default monospaced font
	$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

	// set margins
	$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
	$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
	$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

	// set auto page breaks
	$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

	// set image scale factor
	$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
	$pdf->SetPrintFooter(false);

	// set some language-dependent strings (optional)
	if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
		require_once(dirname(__FILE__).'/lang/eng.php');
		$pdf->setLanguageArray($l);
	}
	$pdf->AddPage();
			$html = '
				<h3>COPIA PARA EL EMPLEADO</h3>
				<table width="100%"  style="border:1px solid black">
					<thead>
						<tr colspan="2">
							<th colspan="2">
								<h3 style="text-align:center">
									<br/>
									SOLICITUD DE VACACIONES-PERMISOS
									<br/>
								</h3>
							</th>
						</tr>
					</thead>
					<tbody style="text-aling:center">
						<tr colspan="2" >
							<td colspan="2" style="border:1px solid black"><h4>DATOS PERSONALES</h4></td>
						</tr>
						<tr rowspan="2">
							<td> <br/> </td>
							<td> <br/> </td>
						</tr>
						<tr>
							<td>Nombre y apellidos: </td>						
							<td>'.$nombre.' '.$apellido1.'</td>
						</tr>
						<tr>
							<td>DNI</td>
							<td>'.$dni.'</td>
						</tr>
						<tr>
							<td>Localidad de trabajo</td>
							<td>'.$localidad.'</td>
						</tr>
						<tr rowspan="2">
							<td> <br/> </td>
							<td> <br/> </td>
						</tr>
						<tr colspan="2" >
							<td colspan="2" style="border:1px solid black"><h4>VACACIONES-PERMISOS</h4></td>
						</tr>
						<tr rowspan="2">
							<td> <br/> </td>
							<td> <br/> </td>
						</tr>
						<tr>
							<td>Desde</td>
							<td>'.$_POST["FechaI"].'</td>
						</tr>
						<tr>
							<td>Hasta</td>
							<td>'.$_POST["FechaF"].'</td>
						</tr>
						<tr>
							<td>Num Dias Naturales</td>
							<td>'.$_POST["diasN"].'</td>
						</tr>
						<tr>
							<td>Num Dias Laborables</td>
							<td>'.$_POST["diasL"].'</td>
						</tr>
						<tr rowspan="2">
							<td> <br/> </td>
							<td> <br/> </td>
						</tr>
						<tr>
							<td>
								<strong>
									Con el caracter de:
								</strong>
							</td>
							<td>
								<strong>';
									if($_POST["tipe"]=="vacaciones"){
										$html .='VACACIONES';	
									}else if($_POST["tipe"]=="PerRe"){ 
										$html .='PERMISO RETRIBUIDO';
									}else if($_POST["tipe"]=="PerNoRe"){ 
										$html .='PERMISO NO RETRIBUIDO';
									}
						$html .='
								</strong>
							</td>
						</tr>
						<tr rowspan="2">
							<td> <br/> </td>
							<td> <br/> </td>
						</tr>
						<tr colspan="2" >
							<td colspan="2" style="border:1px solid black"><h4>OBSERVACIONES</h4></td>
						</tr>
						<tr colspan="2">
							<td colspan="2">'.$_POST["descrip"].'<br></td>
						</tr>
					</tbody>
				</table>

	 			<table width=100% >
					<thead>
						<tr rowspan="2">
							<th ><br/></th >
							<th ><br/></th >
						</tr>
						<tr>
							<th >FIRMA DEL SOLICITANTE:</th>
							<th>AUTORIZADO POR:</th>
						</tr>
					</thead>
					
				</table>';
	$pdf->writeHTML($html, true, 0, true, 0);
	$pdf->AddPage();
		$html ='
				
				<h3>COPIA PARA LA EMPRESA</h3>
				<table width="100%"  style="border:1px solid black">
					<thead>
						<tr colspan="2">
							<th colspan="2"><h3 style="text-align:center"><br/>SOLICITUD DE VACACIONES-PERMISOS<br/></h3></th>
						</tr>
					</thead>
					<tbody >
						<tr colspan="2" >
							<td colspan="2" style="border:1px solid black"><h4>DATOS PERSONALES</h4></td>
						</tr>
						<tr rowspan="2">
							<td> <br/> </td>
							<td> <br/> </td>
						</tr>
						<tr>
							<td>Nombre y apellidos: </td>						
							<td>'.$nombre.' '.$apellido1.'</td>
						</tr>
						<tr>
							<td>DNI</td>
							<td>'.$dni.'</td>
						</tr>
						<tr>
							<td>Localidad de trabajo</td>
							<td>'.$localidad.'</td>
						</tr>
						<tr rowspan="2">
							<td> <br/> </td>
							<td> <br/> </td>
						</tr>
						<tr colspan="2" >
							<td colspan="2" style="border:1px solid black"><h4>VACACIONES-PERMISOS</h4></td>
						</tr>
						<tr rowspan="2">
							<td> <br/> </td>
							<td> <br/> </td>
						</tr>
						<tr>
							<td>Desde</td>
							<td>'.$_POST["FechaI"].'</td>
						</tr>
						<tr>
							<td>Hasta</td>
							<td>'.$_POST["FechaF"].'</td>
						</tr>
						<tr>
							<td>Num Dias Naturales</td>
							<td>'.$_POST["diasN"].'</td>
						</tr>
						<tr>
							<td>Num Dias Laborables</td>
							<td>'.$_POST["diasL"].'</td>
						</tr>
						<tr rowspan="2">
							<td> <br/> </td>
							<td> <br/> </td>
						</tr>
						<tr>
							<td>
								<strong>
									Con el caracter de:
								</strong>
							</td>
							<td>
								<strong>';					
									if($_POST["tipe"]=="vacaciones"){
										$html .='VACACIONES';	
									}else if($_POST["tipe"]=="PerRe"){ 
										$html .='PERMISO RETRIBUIDO';
									}else if($_POST["tipe"]=="PerNoRe"){ 
										$html .='PERMISO NO RETRIBUIDO';
									}
						$html .='
								</strong>
							</td>
						</tr>
						<tr rowspan="2">
							<td> <br/> </td>
							<td> <br/> </td>
						</tr>
						<tr colspan="2" >
							<td colspan="2" style="border:1px solid black"><h4>OBSERVACIONES</h4></td>
						</tr>
						<tr colspan="2">
							<td colspan="2">'.$_POST["descrip"].'<br></td>
						</tr>
					</tbody>
				</table> 

				<table width=100% >
					<thead>
						<tr rowspan="2">
							<th ><br/></th >
							<th ><br/></th >
						</tr>
						<tr>
							<th>
								FIRMA DEL SOLICITANTE:
							</th>
							<th>
								AUTORIZADO POR:
							</th>
						</tr>
					</thead>
					
				</table>';

$pdf->writeHTML($html, true, 0, true, 0);
$pdf->Output('C:/Users/l.fernandez/Downloads/'.$nombre.'_'.$apellido1.'-'.$hoy1.'.pdf', "F");

header('Content-type: application/json; charset=utf-8');
echo json_encode($jsondata);
?>