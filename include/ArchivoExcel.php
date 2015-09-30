<?php 

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
////////////   ESTILO DE LA HOJA EXCEL   !!!!!      ESTILOOOOOOOOO    !!!! //////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

//inicio estilos
	$titulo = new PHPExcel_Style(); //nuevo estilo
	$titulo->applyFromArray(
	  array('fill' => array( //relleno de color
	    		'type' => PHPExcel_Style_Fill::FILL_SOLID,
	    		'color' => array('argb' => 'FFCCFFCC')
	    ),'alignment' => array( //alineacion
	    		'wrap' => false,
	    		'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER
	    ),'font' => array( //fuente
	    		'bold' => true,
	    		'size' => 20
	    )
	));
	 
	$subtitulo = new PHPExcel_Style(); //nuevo estilo
	 
	$subtitulo->applyFromArray(
	  array('fill' => array( //relleno de color
	    		'type' => PHPExcel_Style_Fill::FILL_SOLID,
	    		'color' => array('argb' => 'FFCCFFCC')
	    ),'alignment' => array( //alineacion
	      		'wrap' => false,
	      		'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER
	    ),'borders' => array( //bordes
		        'top' => array('style' => PHPExcel_Style_Border::BORDER_THIN),
		        'right' => array('style' => PHPExcel_Style_Border::BORDER_THIN),
		        'bottom' => array('style' => PHPExcel_Style_Border::BORDER_THIN),
		        'left' => array('style' => PHPExcel_Style_Border::BORDER_THIN)
	    )
	));

	$subtitulo1 = new PHPExcel_Style(); //nuevo estilo
	 
	$subtitulo1->applyFromArray(
	  array('fill' => array( //relleno de color
	    		'type' => PHPExcel_Style_Fill::FILL_SOLID,
	    		'color' => array('argb' => 'FFCCFFCC')
	    ),'alignment' => array( //alineacion
	      		'wrap' => false,
	      		'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER
	    ),'borders' => array( //bordes
		        'top' => array('style' => PHPExcel_Style_Border::BORDER_THIN),
		        'right' => array('style' => PHPExcel_Style_Border::BORDER_THIN),
		        'bottom' => array('style' => PHPExcel_Style_Border::BORDER_THIN),
		        'left' => array('style' => PHPExcel_Style_Border::BORDER_THIN)
	    )
	));
	 
	$rellenado = new PHPExcel_Style(); //nuevo estilo
	 
	$rellenado->applyFromArray(
	  array('borders' => array(//bordes
	    		'top' => array('style' => PHPExcel_Style_Border::BORDER_THIN),
	    		'right' => array('style' => PHPExcel_Style_Border::BORDER_THIN),
	    		'bottom' => array('style' => PHPExcel_Style_Border::BORDER_THIN),
	    		'left' => array('style' => PHPExcel_Style_Border::BORDER_THIN)
	    ),'alignment' => array( //alineacion
	      		'wrap' => false,
	      		'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER
	    )
	));

	//fin estilos

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
////////////   CREACION DE HOJA  EXCEL   !!!!!      CREACION Y RELLENADO !!!!!  /////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

	// inicio de nueva excel
		$objPHPExcel = new PHPExcel();

	// inicio autor & titulo 
		$objPHPExcel->getProperties()->setCreator("LidiaF");
		$objPHPExcel->getProperties()->setTitle("Documento Excel de Prueba");
	// fin autor & titulo 

	// inicio combinaciones de celdas
		$objPHPExcel->setActiveSheetIndex(0)->mergeCells('A1:O1');
		$objPHPExcel->setActiveSheetIndex(0)->mergeCells('A3:B3');
   		$objPHPExcel->setActiveSheetIndex(0)->mergeCells('C3:G3');
   		$objPHPExcel->setActiveSheetIndex(0)->mergeCells('H3:J3');
   		$objPHPExcel->setActiveSheetIndex(0)->mergeCells('K3:L3');
	// fin combinaciones de celdas

   	// inicio escritura de titulo y SUBTITULO
		$objPHPExcel->setActiveSheetIndex(0)
			->setCellValue('A1','Gestor de vacaciones')

			->setCellValue('A3','Empleado')
			->setCellValue('C3','DATOS')
			->setCellValue('H3', 'Tipo')
			->setCellValue('K3', 'Baja')
			->setCellValue('M3', 'COMENTARIO')
			->setCellValue('N3', 'USUARIO')
			->setCellValue('O3', 'Fecha')

			->setCellValue('A4', 'Nombre')
			->setCellValue('B4', 'Apellido')
			->setCellValue('C4', 'Fecha Inicio')
			->setCellValue('D4', 'Fecha Fin')
			->setCellValue('E4', 'Dias Naturales')
			->setCellValue('F4', 'Dias laborables')
			->setCellValue('G4', 'Saldo')
			->setCellValue('H4', 'Vacaciones')
			->setCellValue('I4', 'Permiso Retribuido')
			->setCellValue('J4', 'Permiso NO Retribuido')
			->setCellValue('K4', 'Baja AL')
			->setCellValue('L4', 'Baja EC')
			->setCellValue('M4', 'Comentarios')
			->setCellValue('N4', 'Usuario')
			->setCellValue('O4', 'Fecha');
   	// fin escritura de titulo y SUBTITULO
	
	//inicio asignacion de estilos a las celdas
		$objPHPExcel->getActiveSheet()->setSharedStyle($titulo, 'A1:O1');
		$objPHPExcel->getActiveSheet()->setSharedStyle($subtitulo, 'A3:O3');
		//negrita
		$objPHPExcel->getActiveSheet()->getStyle("A3:O3")->getFont()->setBold(true); 
		$objPHPExcel->getActiveSheet()->setSharedStyle($subtitulo1, 'A4:O4');
	//fin asignacion de estilos a las celdas

	// inicio rellenado de filas através de un array
		//Numero de fila donde se va a comenzar a rellenar
 		$i = 5; 
 		foreach ($empleados as $emple) {
 			$nombre=$emple->nombre;
 			$apellido1=$emple->apellido1;
 			$objPHPExcel->getActiveSheet()
 						->setCellValue('A'.$i, $emple->nombre)
						->setCellValue('B'.$i, $emple->apellido1)
						->setCellValue('C'.$i, $emple->FechaInicio)
						->setCellValue('D'.$i, $emple->FechaFin)
						->setCellValue('E'.$i, $emple->dias_Natu)
						->setCellValue('F'.$i, $emple->dias_lab)
						->setCellValue('G'.$i, $emple->SALDO_DIAS)
						->setCellValue('H'.$i, $emple->vacaciones)
						->setCellValue('I'.$i, $emple->PerRetri)
						->setCellValue('J'.$i, $emple->PerNoRetri)
						->setCellValue('K'.$i, $emple->Bal)
						->setCellValue('L'.$i, $emple->Bec)
						->setCellValue('M'.$i, $emple->Comentarios)
						->setCellValue('N'.$i, $emple->user_login)
						->setCellValue('O'.$i, $emple->hoy);	

			$objPHPExcel->getActiveSheet()->setSharedStyle($rellenado, 'A'.$i.':O'.$i);		
			$i++;
		}
	// fin rellenado de filas através de un array

	// inicio autodimensionar las columnas
		foreach (range('A', 'O') as $columnID) {
		  $objPHPExcel->getActiveSheet()->getColumnDimension($columnID)->setAutoSize(true);  
		}
	// fin autodimensionar las columnas

	// inicio damos nombre al libro
		$objPHPExcel->getActiveSheet()->setTitle('Gestor');
	// fin damos nombre al libro

	//inicio ruta de archivo
		$fecha=date('Y-m-d');//'2015-01-01';

		if($todos==1){
			$ruta="//APPSERVER/Vacaciones/Todos/".$fecha;
			if(!file_exists($ruta)){
				$folder=mkdir($ruta, 0755, true);
			}
		}else if($todos==2){
			$ruta="//APPSERVER/Vacaciones/Tipo/".$fecha;
			if(!file_exists($ruta)){
				$folder=mkdir($ruta, 0755, true);
			}
		}else if($todos==3){
			$ruta="//APPSERVER/Vacaciones/Anio/".$fecha;
			if(!file_exists($ruta)){
				$folder=mkdir($ruta, 0755, true);
			}
		}else if($todos==0){
			$dir="//APPSERVER/Vacaciones/".$nombre."_".$apellido1;
	        if(file_exists($dir)){
	            $ruta=$dir."/".$nombre."_".$apellido1."_".$fecha;
	            $folder=mkdir($ruta, 0755, true);
	        }else{
	            $ruta=$dir."/".$nombre."_".$apellido1."_".$fecha;
	            $folder=mkdir($ruta, 0755, true);
	        }
	    }else{
	    	exit();
	    	require_once "VistaTerminadoE.php";
	    }
	//fin ruta de archivo

	// inicio escribimos en el libro
		$objWriter = new PHPExcel_Writer_Excel2007($objPHPExcel);
		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
		$objWriter->save($ruta.'/Vacaciones.xlsx');
	// fin escribimos en el libro


	

 ?>