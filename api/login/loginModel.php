<?php
    require_once '../configbd/db.php';
    
    class LoginModel {
        private $conn;

        public function __construct() {
            $base = new Db();
            $this->conn = $base->conectar();
        }

        public function autenticacionUsuario($user, $pass) {
            try {
                    // Preparar la consulta SQL para evitar inyecciones SQL
                    $sql = "SELECT `id`, `nombres`, `apellidos` FROM `tbusuarios` WHERE `correo` = :user_name AND `contrasena` = :password_user";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindValue(':user_name', trim($user), PDO::PARAM_STR);
                    $stmt->bindValue(':password_user', trim($pass), PDO::PARAM_STR);

                    if ($stmt->execute()) {
                        return $stmt->fetchAll(PDO::FETCH_ASSOC);
                    } else {
                        return false;
                    }
            } catch (Exception $e) {
                throw new Exception("Error en la consulta: " . $e->getMessage());
            }
        }

        public function generarToken($userId,$userName) {
            try {
                // Generar un hash único para el token
                $token = bin2hex(random_bytes(32));
                $fechaCreacion = date('Y-m-d H:i:s');

                // Insertar el token en la base de datos
                $sql = "CALL addtoken (:user_id, :token, :user_name)";
                $stmt = $this->conn->prepare($sql);
                $stmt->bindValue(':user_id', $userId, PDO::PARAM_INT);
                $stmt->bindValue(':token', $token, PDO::PARAM_STR);
                $stmt->bindValue(':user_name', $userName, PDO::PARAM_STR);

                if ($stmt->execute()) {
                    return $token;
                } else {
                    throw new Exception("Error al guardar el token en la base de datos.");
                }
            } catch (Exception $e) {
                throw new Exception("Error al generar el token: " . $e->getMessage());
            }
        }

        public function validarToken($token) {
            try {
                // Verificar si el token existe en la base de datos
                $sql = "SELECT user_id FROM tbtokens WHERE token = :token AND id_estado = 1";
                $stmt = $this->conn->prepare($sql);
                $stmt->bindValue(':token', $token, PDO::PARAM_STR);
                $stmt->execute();

                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                return $result ? $result['user_id'] : false;
            } catch (Exception $e) {
                throw new Exception("Error al validar el token: " . $e->getMessage());
            }
        }
    }
?>