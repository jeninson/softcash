<?php
    //var_dump(file_get_contents("config.json"));
    $credenciales = file_get_contents("../configbd/config.json");
    $credenciales = json_decode($credenciales, true);

class Db {
    private $servidor;
    private $usuario;
    private $contrasena;
    private $base;
    
    public function __construct() {
        global $credenciales;
        $this->servidor = $credenciales['host'];
        $this->usuario = $credenciales['user'];
        $this->contrasena = $credenciales['pass'];
        $this->base = $credenciales['db'];
    }

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

