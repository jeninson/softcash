<?php

require_once '../configbd/db.php';

class IngresosModel {
    private $conn;

    public function __construct() {
        $base = new Db();
        $this->conn = $base->conectar();
    }

    public function guardarIngreso($idUser, $tipo_registro, $fecha, $valor, $categoria, $descripcion) {
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
}
?>