<?php
    require_once 'loginModel.php';
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

try {
    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        try {
            //Validacion de parametros
            $_POST = json_decode(file_get_contents('php://input'), true);
            // Validar parámetros
            if (!empty($_POST['usuario']) && !empty($_POST['clave'])) {
                $usuario = htmlspecialchars(trim($_POST['usuario']));
                $clave = htmlspecialchars(trim($_POST['clave']));
                
                //Nuevo objero de Modelo LoginModel
                $loginModel = new LoginModel();
                //Llamada al metodo de autenticacion
                $result = $loginModel->autenticacionUsuario($_POST['usuario'], $_POST['clave']);
                if(count($result) > 0){

                    $idUser = $result[0]["id"];
                    $userNombre = $result[0]["nombres"] . " " . $result[0]["apellidos"];
                    
                    //Generar token
                    $tokenGenerado = $loginModel->generarToken($idUser, $userNombre);
                    
                    header("HTTP/1.1 200 OK");
                    echo json_encode(array("code"=>200, "idUser" => $idUser, "Usuario" => $userNombre, "idTk"=>$tokenGenerado, "msg" => "Usuario OK"));
                } else {
                    header("HTTP/1.1 203 Non-Authoritative Information");
                    echo json_encode(array("code"=>203, "msg" => "Las credenciales no son válidas"));
                }               
            } else {
                header("HTTP/1.1 402 Bad Request");
                echo json_encode(array("code"=>402, "msg" => "Error, faltan parámetros necesarios"));
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