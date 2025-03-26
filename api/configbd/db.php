<?php
    include_once 'llaves.php';

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
        try {
            $conexion = new PDO("mysql:host=$this->servidor;dbname=$this->base", $this->usuario, $this->contrasena);
            $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conexion;
        } catch (PDOException $e) {
            return "Error: " . $e->getMessage();
        }
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

