<?php

$MAX_FILE_SIZE = 3145728;
$output = array();
$dataDebug = array(); // array to hold debug info

$fileName = $_FILES["userPhotos"]["name"];
$fileTmpName = $_FILES["userPhotos"]["tmp_name"];
$fileType = $_FILES["userPhotos"]["type"];
$fileSize = $_FILES["userPhotos"]["size"];
$fileError = $_FILES["userPhotos"]["error"];

if(isset($fileTmpName) && !empty($fileTmpName)){
	$output = upload_photo($fileName, $fileTmpName, $fileType, $fileSize, $fileError);
}


echo json_encode($output);


function upload_photo($fileName, $fileTmpName, $fileType, $fileSize, $fileError)
{
	global $MAX_FILE_SIZE;
	$output = array(); // array to pass back data
    
    $uuid = uniqid();

	$debug = true;

	if($debug){
		$debugUpload = array();
		$debugUpload['photoName'] = $fileName;
		$debugUpload['fileTmpName'] = $fileTmpName;
		$debugUpload['fileType'] = $fileType;
		$debugUpload['fileSize'] = $fileSize;
		$debugUpload['fileError'] = $fileError;
		$dataDebug['photoUploadInfo'] = $debugUpload;
	}

	//set session id if is not set
	$ses_id = session_id();
	if (empty($ses_id)) {
		session_start();
		$ses_id = session_id();
	}

	if($debug){
		$dataDebug['sessionId'] = "<br>L'id du session est: ". $ses_id . "<br>";
	}

	// Définit le fuseau horaire par défaut à utiliser. Disponible depuis PHP 5.1
	date_default_timezone_set('Europe/Brussels');
	$today = date("d-m-Y");

	$allowedExts = array("gif", "jpeg", "jpg", "png");
	$upload_permitted_types= array('image/jpeg','image/pjpeg','image/gif','image/png', 'image/x-png');
	$temp = explode(".", $fileName);
	$extension = end($temp);
	// Afin de simplifier les comparaisons, on met tout en minuscule
	$extension = strtolower($extension);
	$target_path = "../uploads/" . $ses_id;

	//On formate le nom du fichier ici...
	// $photo_name = strtr($filename,
	//	'ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöùúûüýÿ', 
	//	'AAAAAACEEEEIIIIOOOOOUUUUYaaaaaaceeeeiiiioooooouuuuyy');
	$photo_temp_name = preg_replace('/([^.a-z0-9]+)/i', '-', $fileName);
	$photo_temp_name = str_replace(" ", "_", $photo_temp_name);
	$photo_name = $today . "_" . $uuid . $photo_temp_name;

	$photo = "../uploads/" . $ses_id . "/" . $photo_name;
	$photoSrc = "uploads/" . $ses_id . "/" . $photo_name;


	if (!in_array($fileType, $upload_permitted_types)){
		$output = ['error' => "Seulement les documents de type \"image\" sont autorisés."];
		return $output;
	} elseif($fileSize > $MAX_FILE_SIZE){
		$output = ['error' => "Le fichier \" " . $fileName . "\" (" . $fileSize . " Ko) dépasse la taille maximale autorisée qui est de 3072 Ko."];
		return $output;
	} elseif(!in_array($extension, $allowedExts)){
		$output = ['error' => "Type de document invalide pour \" " . $fileName . "\". Seulement les documents de type \"image\" sont autorisés"];
		return $output;
	}

	if ($fileError > 0) {
		$output = ['error' => "Le fichier ne respecte pas les critères"];
		return $output;
	} else {

		if (file_exists($photo)) {

		} else {
			//créér le répertoire avec le nom de la ses_id si il n'existe pas encore
			if (!file_exists($target_path)) {
				mkdir($target_path, 0777, true);
				if($debug){
					$dataDebug['pathTarget'] = "A new directory was created: " . $target_path;
				}
			} else {
				if($debug){
					$dataDebug['pathTarget'] = "Warning: The directory: " . $target_path . " was already created ";
				}
			}

			//Make sure we have a filepath
			if ($fileTmpName != "") {
				//enregistrer l'image
				if (!move_uploaded_file($fileTmpName, $photo)) {
					$output = ['error'=>'Une error est survenue, la photo n\'a pas pu être téléchargée. Envoyez-nous le message avec votre adresse email! '];
					return $output;
				} else {
					if($debug){
						$dataDebug['uploaded'] = "aaabbbThe photo from: " . $fileTmpName . " was moved to: " . $photo;
					}
				}
			}


			//Si l'image depase la largeur de 700px ou hauteur de 500px alors redimensionner

			//Obtenir les dimensions de l'image
			$imageSize = getimagesize($photo);
			//$imageSize[0] = width de l'image
			$img_src_width = $imageSize[0];
			$img_src_height = $imageSize[1];

			if ($img_src_width > 700 || $img_src_height > 500) {
				switch ($extension) {
					case "jpg": //pour le cas où l'extension est "jpeg"
						$img_src_resource = imagecreatefromjpeg($photo);
						break;

					case "gif":
						$img_src_resource = imagecreatefromgif($photo);
						break;

					case "png":
						$img_src_resource = imagecreatefrompng($photo);
						break;

					default:
						//echo "L'image n'est pas dans un format reconnu. Extensions autorisées : jpg/jpeg, gif, png";
						$output = ['error' => "Type de document invalide pour \" " . $fileName . "\". Seulement les documents de type \"image\" sont autorisés"];
						return $output;
				}

				$newWidth = 700; //Largeur choisie à 700 px
				$newHeight = (($img_src_height * (($newWidth) / $img_src_width)));
				// creer la nouvelle image
				$newImage = imagecreatetruecolor($newWidth, $newHeight) or die ("Erreur");
				imagecopyresized($newImage, $img_src_resource, 0, 0, 0, 0, $newWidth, $newHeight, $img_src_width, $img_src_height);
				imagejpeg($newImage, "../uploads/" . $ses_id . "/" . $photo_name, 100);
				//destory the src image
				imagedestroy($img_src_resource);
			}

		}
		$output = [
			'initialPreview' =>
			[
				"<img style='height:160px' src='".$photoSrc."' class='file-preview-image' alt='".$fileName."' title='".$fileName."'>"
			],
			'initialPreviewConfig' =>
			[
				[
					'caption' => $fileName,
					'width' => '120px',
					'url' => 'php/delete.php',
					'key' => $photoSrc
				],
			],
			'append' => true
		];
	}
	$output['Debug'] = $dataDebug;
	return $output;

}