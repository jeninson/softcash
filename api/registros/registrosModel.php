<?php

require_once '../configbd/db.php';

class RegristrosModel {
    private $conn;

    public function __construct() {
        $base = new Db();
        $this->conn = $base->conectar();
    }

    public function consultarUltimosMovimiento($idUser, $lim) {
        try {
            // Preparar la consulta SQL para evitar inyecciones SQL
            $sql = "SELECT r.`id`, r.`valor`, r.`fecha`, r.`descripcion`, r.`updated_at`, r.`id_usuario`, CONCAT(u.nombres,' ',u.apellidos) as 'Usuario', r.`tipo_reg`, t.Tipo as 'tipo_registro', r.id_categoria, c.nombre as 'categoria' FROM `tbregistros` r inner JOIN tbusuarios u ON (r.`id_usuario`=u.id) inner JOIN tbtipo_reg t ON (r.`tipo_reg`=t.id) inner join tbcategorias c ON (r.id_categoria=c.id) ORDER BY `r`.`fecha` DESC LIMIT :lim";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindValue(':lim', $lim, PDO::PARAM_INT);
            if ($stmt->execute()) {
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            } else {
                return false;
            }
        } catch (Exception $e) {
            throw new Exception("Error en la consulta: " . $e->getMessage());
        }
    }
}
?>