<?php 

require_once 'registrosModel.php';
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

try {
    if($_SERVER['REQUEST_METHOD'] == 'GET') {
        try {
            //Validacion de parametros
            //$_POST = json_decode(file_get_contents('php://input'), true);
            // Validar parámetros
            if (!empty($_GET['limite'])) {
                //$idUser = htmlspecialchars(trim($_POST['idUser']));
                $limite = htmlspecialchars(trim($_GET['limite']));
                
                //Nuevo objero de Modelo LoginModel
                $registrosModel = new RegristrosModel();
                //Llamada al metodo de autenticacion
                $result = $registrosModel->consultarUltimosMovimiento(" ", $limite);
                if(count($result) > 0){
                    header("HTTP/1.1 200 OK");
                    echo json_encode(array("code"=>200, "data" => $result, "msg" => "Consulta correcta"));
                } else {
                    header("HTTP/1.1 203 Non-Authoritative Information");
                    echo json_encode(array("code"=>203, "msg" => "No se encontraron registros"));
                }               
            } else {
                header("HTTP/1.1 402 Bad Request");
                echo json_encode(array("code"=>402, "msg" => "Error, faltan parámetros necesarios"));
            }
        } catch (Exception $e) {
            header("HTTP/1.1 500 Internal Server Error");
            echo json_encode(array("code"=>500, "msg" => "Error en el servidor \n".$e->getMessage()));
        }
    } else if($_SERVER['REQUEST_METHOD'] == 'POST') {
        try {
            //Validacion de parametros
            $_POST = json_decode(file_get_contents('php://input'), true);
            // Validar parámetros
            if (!empty($_POST['idTk']) && !empty($_POST['idUser']) && !empty($_POST['tipo_registro']) && !empty($_POST['fecha']) && !empty($_POST['valor']) && !empty($_POST['categoria']) && !empty($_POST['descripcion'])) {
                $idTk = htmlspecialchars(trim($_POST['idTk']));
                $idUser = htmlspecialchars(trim($_POST['idUser']));
                $tipo_registro = htmlspecialchars(trim($_POST['tipo_registro']));
                $fecha = htmlspecialchars(trim($_POST['fecha']));
                $valor = htmlspecialchars(trim($_POST['valor']));
                $idcategoria = htmlspecialchars(trim($_POST['categoria']));
                $descripcion = htmlspecialchars(trim($_POST['descripcion']));

                // Validar el token
                //$tokenValido = true; // Aquí deberías implementar la lógica para validar el token
                //if (!$tokenValido) {header("HTTP/1.1 401 Unauthorized");echo json_encode(array("code"=>401, "msg" => "Token inválido o expirado"));exit;}
                
                //Nuevo objeto de Modelo IngresosModel
                $registrosModel = new RegristrosModel();
                //Llamada al metodo de autenticacion
                $result = $registrosModel->guardarRegistro($idUser, $tipo_registro, $fecha, $valor, $idcategoria, $descripcion);
                if ($result) {
                    header("HTTP/1.1 200 OK");
                    echo json_encode(array("code"=>200, "msg" => "Registro guardado correctamente"));
                } else {
                    header("HTTP/1.1 500 Internal Server Error");
                    echo json_encode(array("code"=>500, "msg" => "Error al guardar el registro"));
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