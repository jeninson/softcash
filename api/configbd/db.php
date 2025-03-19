<?php

class Db {
    private $servidor = 'localhost';
    private $usuario = 'root';
    private $contrasena = '';
    private $base = 'prueba822_23.';
    
    public function conectar() {
        $conexion = new mysqli($this->servidor, $this->usuario, $this->contrasena, $this->base);
        if ($conexion->connect_error) {
            die('Error de conexión: ' . $conexion->connect_error);
        }
        return $conexion;
    }
}

/*
$servidor = '127.0.0.1';
$usuario = 'root';
$contrasena = '';
$base = 'prueba822_23';

$conexion = new mysqli($servidor, $usuario, $contrasena, $base);

// Verificar conexión
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}
echo "Conexión exitosa";

// Cerrar conexión
$conexion->close();*/

