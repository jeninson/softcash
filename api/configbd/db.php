<?php

$servidor = 'localhost';
$base = 'bd_822_823';
$usuario = 'root';
$contrasena = '';

$conexion = new mysqli($servidor, $usuario, $contrasena, $base);

// Verificar conexión
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}
echo "Conexión exitosa";

// Cerrar conexión
$conexion->close();

/*|
class DB {
    private $servidor = 'localhost';
    private $base = 'prueba822_23';
    private $usuario = 'root';
    private $contrasena = '';
    
    public function conectar() {
        $conexion = new mysqli($this->servidor, $this->usuario, $this->contrasena, $this->base);
        if ($conexion->connect_error) {
            die('Error de conexión: ' . $conexion->connect_error);
        }
        return $conexion;
    }
}*/