<?php

require_once '../configbd/db.php';
class CategoriaModel {
    private $conn;

    public function __construct() {
        $base = new Db();
        $this->conn = $base->conectar();
    }

    public function consultarCategorias($id = "", $tipo = "") {
        try {
            // Preparar la consulta SQL para evitar inyecciones SQL
            $sql = "SELECT * FROM `tbcategorias`";
            if ($id != "") {
                $sql .= " WHERE `id`= :id";
                if ($tipo != "") {
                    $sql .= " AND `tipo` = :tipo";
                }
            } else if ($tipo != "") {
                $sql .= " WHERE `tipo` = :tipo";
            }

            $stmt = $this->conn->prepare($sql);
            if ($id != "") {
                $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            }
            if ($tipo != "") {
                $stmt->bindParam(':tipo', $tipo, PDO::PARAM_STR);
            }

            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
            //return array("sql"=> $sql);
        } catch (Exception $e) {
            throw new Exception("Error al consultar las categorías: " . $e->getMessage());
        }
    }
}   

?>