<?php
    require_once '../configbd/db.php';
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

try {
    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        try {
            //Validacion de parametros
            if(isset($_POST['usuario']) && isset($_POST['clave'])){ 
                //conexion a la base de datos               
                $base = new Db();
                $conn = $base->conectar();
                $user = $_POST['usuario'];
                $pass = $_POST['clave'];
                $sql = "SELECT `id`, `nombres`, `apellidos` FROM `tbusuarios` WHERE `correo` =:user_name  and `contrasena` = MD5(:password_user)";
                $stmt = $conn->prepare($sql);
                $stmt->bindValue(':user_name', trim($user), PDO::PARAM_STR);
                $stmt->bindValue(':password_user', trim($pass), PDO::PARAM_STR);

                if($stmt->execute()){
                    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    if(count($result) > 0){
                        $idUser = $result[0]["id"];
                        $userNombre = $result[0]["nombres"] . " " . $result[0]["apellidos"];
                        
                        header("HTTP/1.1 200 OK");
                        echo json_encode(array("code"=>200, "idUser" => $idUser, "Usuario" => $userNombre, "msg" => "Usuario OK"));
                    } else {
                        header("HTTP/1.1 203 Non-Authoritative Information");
                        echo json_encode(array("code"=>203, "msg" => "Las credenciales no son válidas"));
                    }
                } else {
                    header("HTTP/1.1 500 Internal Server Error");
                    echo json_encode(array("code"=>500, "msg" => "Error al ejecutar la consulta"));
                }
            } else {
                header("HTTP/1.1 402 Bad Request");
                echo json_encode(array("code"=>400, "msg" => "Error, faltan parámetros necesarios"));
            }
        } catch (Exception $e) {
            header("HTTP/1.1 500 Internal Server Error");
            echo json_encode(array("code"=>500, "msg" => "Error en el servidor \n".$e->getMessage()));
        }
        exit();
    } else {
        header("HTTP/1.1 400 Bad Request");
        echo json_encode(array("code"=>400, "msg" => "Solicitud incorrecta por parte del cliente"));
    }

} catch (Exception $e) {
    header("HTTP/1.1 500 Internal Server Error");
    echo json_encode(array("code"=>500, "msg" => "Error en el servidor \n".$e->getMessage()));
}
?>