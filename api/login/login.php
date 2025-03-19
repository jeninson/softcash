<?php
    require_once '../configbd/db.php';
    try {
        $base = new Db();
        $conn = $base->conectar();
    } catch (Exception $e) {
        echo "ERROR=>".$e->getMessage();
    }
?>