<?php

require_once 'categoriaModel.php';
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

try {
    if($_SERVER['REQUEST_METHOD'] == 'GET') {
        try {
            //Validacion de parametros
            
            //$idUser = htmlspecialchars(trim($_POST['idUser']));
            $id = ""; $tipo = "";
            if(!empty($_GET['id'])){$id = trim(htmlspecialchars($_GET['id']));}
            if(!empty($_GET['tipo'])){$tipo = trim($_GET['tipo']);}
            
            $registrosModel = new CategoriaModel();
            //Llamada al metodo de autenticacion
            $result = $registrosModel->consultarCategorias($id, $tipo);
            if(count($result) > 0){
                header("HTTP/1.1 200 OK");
                echo json_encode(array("code"=>200, "data" => $result, "msg" => "Consulta correcta"));
            } else {
                header("HTTP/1.1 203 Non-Authoritative Information");
                echo json_encode(array("code"=>203, "msg" => "No se encontraron registros"));
            }  
        } catch (Exception $e) {
            header("HTTP/1.1 500 Internal Server Error");
            echo json_encode(array("code"=>500, "msg" => "Error en el servidor \n".$e->getMessage()));
        }
    } else {
        header("HTTP/1.1 400 Bad Request");
        echo json_encode(array("code"=>400, "msg" => "Solicitud incorrecta por parte del cliente"));
    }
} catch (Exception $e) {
    header("HTTP/1.1 500 Internal Server Error");
    echo json_encode(array("code"=>500, "msg" => "Error en el servidor \n".$e->getMessage()));
}
?>