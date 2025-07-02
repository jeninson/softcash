<?php

require_once '../configbd/db.php';

class RegristrosModel {
    private $conn;

    public function __construct() {
        $base = new Db();
        $this->conn = $base->conectar();
    }

    public function consultarUltimosMovimiento($id, $lim) {
        try {
            // Preparar la consulta SQL para evitar inyecciones SQL
            $sql = "SELECT r.`id`, r.`valor`, r.`fecha`, r.`descripcion`, r.`updated_at`, r.`id_usuario`, CONCAT(u.nombres,' ',u.apellidos) as 'Usuario', r.`tipo_reg`, t.Tipo as 'tipo_registro', r.id_categoria, c.nombre as 'categoria' FROM `tbregistros` r inner JOIN tbusuarios u ON (r.`id_usuario`=u.id) inner JOIN tbtipo_reg t ON (r.`tipo_reg`=t.id) inner join tbcategorias c ON (r.id_categoria=c.id)";
            if (!empty($id)) {
                $sql .= " WHERE r.id = :id";
            }
            $sql .= " ORDER BY r.fecha DESC";
            if (!empty($lim)) {
                $sql .= " LIMIT :lim";
            }
            $stmt = $this->conn->prepare($sql);
            if (!empty($id)) {
                $stmt->bindValue(':id', $id, PDO::PARAM_INT);
            }
            if (!empty($lim)) {
                $stmt->bindValue(':lim', $lim, PDO::PARAM_INT);
            }
            if ($stmt->execute()) {
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            } else {
                return false;
            }
        } catch (Exception $e) {
            throw new Exception("Error en la consulta: " . $e->getMessage());
        }
    }

    
    public function guardarRegistro($idUser, $tipo_registro, $fecha, $valor, $categoria, $descripcion) {
        try {
            // Preparar la consulta SQL para evitar inyecciones SQL
            $sql = "INSERT INTO `tbregistros` (`valor`, `tipo_reg`, `fecha`, `descripcion`, `id_categoria`, `id_usuario`) VALUES 
            (:valor, :tipo_registro, :fecha, :descripcion, :categoria, :idUser)";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':idUser', $idUser, PDO::PARAM_INT);
            $stmt->bindParam(':tipo_registro', $tipo_registro, PDO::PARAM_INT);
            $stmt->bindParam(':fecha', $fecha);
            $stmt->bindParam(':valor', $valor);
            $stmt->bindParam(':categoria', $categoria, PDO::PARAM_INT);
            $stmt->bindParam(':descripcion', $descripcion);

            if ($stmt->execute()) {
                return true;
            } else {
                return false;
            }
        } catch (Exception $e) {
            throw new Exception("Error al guardar el ingreso: " . $e->getMessage());
        }
    }

    function eliminarRegistro($id) {
        try {
            // Preparar la consulta SQL para evitar inyecciones SQL
            $sql = "DELETE FROM `tbregistros` WHERE id = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);

            if ($stmt->execute()) {
                return true;
            } else {
                return false;
            }
        } catch (Exception $e) {
            throw new Exception("Error al eliminar el registro: " . $e->getMessage());
        }
    }

    function actualizarRegistro($id_reg_act, $idUser, $tipo_registro, $fecha, $valor, $idcategoria, $descripcion) {
        try {
            // Preparar la consulta SQL para evitar inyecciones SQL
            $sql = "UPDATE `tbregistros` SET `id_usuario` = :idUser, `valor` = :valor, `fecha` = :fecha, `descripcion` = :descripcion, `id_categoria` = :idcategoria WHERE id = :id_reg_act";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id_reg_act', $id_reg_act, PDO::PARAM_INT);
            $stmt->bindParam(':idUser', $idUser, PDO::PARAM_INT);
            $stmt->bindParam(':fecha', $fecha);
            $stmt->bindParam(':valor', $valor);
            $stmt->bindParam(':idcategoria', $idcategoria, PDO::PARAM_INT);
            $stmt->bindParam(':descripcion', $descripcion);

            if ($stmt->execute()) {
                return true;
            } else {
                return false;
            }
        } catch (Exception $e) {
            throw new Exception("Error al actualizar el registro: " . $e->getMessage());
        }
    }
}
?>