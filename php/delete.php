<?php
/**
 * Created by IntelliJ IDEA.
 * User: Andrei
 * Date: 09-05-16
 * Time: 22:11
 */

$output = array();
$dataDebug = array(); // array to hold debug info

$debug = false;

//set session id if is not set
$ses_id = session_id();
if (empty($ses_id)) {
    session_start();
    $ses_id = session_id();
}
$target_path = "../uploads/" . $ses_id;

if(isset($_GET['all'])) {
    if($debug){
        //echo json_encode("GET all is defined");
    }
    $deleteAll = $_GET['all'];
    if($deleteAll == true){
        $output = deleteAll();
        echo json_encode($output);
    }
}


if(isset($_POST['key'])) {
    if($debug){
        //echo "GET key is defined";
    }
    $fileLocation = $_POST['key'];
    $path = '../' . $fileLocation;
    $output = delete($path);
    //$output['success'] = "File deleted";
    echo json_encode($output);
}

function delete($path){
    global $debug;
    if($debug){
        //echo json_encode("debug is enable in delete function");
    }

    try {
        if($debug){
            $dataDebug['fileLocation'] = $path;
        }
        if (is_file($path)) {
            if (unlink($path)) {
                $output['success'] = "File deleted";
            } else {
                $output['error'] = "File cannot be deleted!!";
            }
        } else {
            $output['warn'] = "File [".$path."] do not exists!!";
        }
    } catch (Exception $e){
        $output['error'] = "File cannot be deleted. An unexpected error has occurred: " . $e->getMessage();
    }
    if($debug){
        $output['Debug'] = $dataDebug;
    }
    return $output;
}

//Not in use
function deleteAll(){
    global $debug, $ses_id, $target_path;
    $output = array();
    try {
        if ($debug) {
            $dataDebug['sessionId'] = $ses_id;
        }
        if (file_exists($target_path)) {
            $dataDebug['target_path'] = $target_path;
            delTree($target_path);
                $dataDebug['deleted'] = "All Files deleted";
                $output['success'] = "All Files deleted";

        } else {
            $dataDebug['error'] = "Target path: [". $target_path."] cannot be found!!";
        }
    } catch (Exception $e){
        $output['feedBackError'] = "File cannot be deleted. An unexpected error has occurred: " . $e->getMessage();
    }
    if($debug){
        $output['Debug'] = $dataDebug;
    }
    return $output;
}

function delTree($dir) {
    $files = array_diff(scandir($dir), array('.','..'));
    foreach ($files as $file) {
        (is_dir("$dir/$file")) ? delTree("$dir/$file") : unlink("$dir/$file");
    }
    return rmdir($dir);
}