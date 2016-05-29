<?php

function upload_photo($fileName, $fileTmpName, $fileType, $fileSize, $fileError)
{

	$debug = false;


	if($debug){
		echo "<br>upload_photo START: <br>";
		echo "photo name is : " . $fileName . "<br>";
	}

	//set session id if is not set
	$ses_id = session_id();
	$_SESSION['ses_id'] = $ses_id;
	if (empty($ses_id)) {
		session_start();
		$ses_id = session_id();
		$_SESSION['ses_id'] = $ses_id;
	}

	if($debug){
		echo "<br>L'id du session est: ". $ses_id . "<br>";
	}

	// Définit le fuseau horaire par défaut à utiliser. Disponible depuis PHP 5.1
	date_default_timezone_set('Europe/Brussels');
	$today = date("d-m-Y_H-i");

	$allowedExts = array("gif", "jpeg", "jpg", "png");
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
	$photo_name = $today . "_" . $photo_temp_name;

	$photo = "../uploads/" . $ses_id . "/" . $photo_name;

	if ((($fileType == "image/gif")
					|| ($fileType == "image/jpeg")
					|| ($fileType == "image/jpg")
					|| ($fileType == "image/pjpeg")
					|| ($fileType == "image/x-png")
					|| ($fileType == "image/png"))
			&& ($fileSize < 5000000)
			&& in_array($extension, $allowedExts)
	) {
		if ($fileError > 0) {
			$_SESSION['message'] = "Le fichier ne respecte pas les critères";
		} else {

			if (file_exists($photo)) {
				// files already exists
				/*
                if (!file_exists("../uploads/" . $ses_id)) {
                    mkdir("../uploads/" . $ses_id, 0777, true);
                }

                if(!move_uploaded_file($_FILES["file"]["tmp_name"], "../uploads/" . $ses_id . "/" . mt_rand() . $photo_name)){
                    $_SESSION['errorUpload'] = "Une error est survenue, la photo n'a pas pu être téléchargée";
                }
                */
			} else {
				//créér le répertoire avec le nom de la ses_id si il n'existe pas encore
				if (!file_exists($target_path)) {
					mkdir($target_path, 0777, true);
					if($debug){
						echo "A new directory was created: " . $target_path . "<br>";
					}
				} else {
					if($debug){
						echo "Warning: The directory: " . $target_path . " is already created ". "<br>";
					}
				}

				//Make sure we have a filepath
				if ($fileTmpName != "") {
					//enregistrer l'image
					if (!move_uploaded_file($fileTmpName, $photo)) {
						$_SESSION['message'] = "Une error est survenue, la photo n'a pas pu être téléchargée";
					} else {
						if($debug){
							echo "The photo from: " . $fileTmpName . " was moved to: " . $photo . "<br>";
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

						// On peut également ouvrir les formats wbmp, xbm et xpm (vérifier la configuration du serveur)

						default:
							$_SESSION['message'] = "L'image n'est pas dans un format reconnu. Extensions autorisées : jpg/jpeg, gif, png";
							//echo "L'image n'est pas dans un format reconnu. Extensions autorisées : jpg/jpeg, gif, png";
							break;
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
		}
	} else {
		echo "Invalid file";
	}

}
?>