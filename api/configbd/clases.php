<?php
class Producto {
    private $codigo;
    private $nombre;
    private $precio;

    public function __construct($c, $n, $p) {
        $this->codigo = $c;
        $this->nombre = $n;
        $this->precio = $p;
    }
    public function obtenerPrecio() {
        echo "El precio es: ".$this->precio." pesos";
    }

    public function calcularTotal(){
        return $this->precio*2;
    }

    public function getNombre(){
        return $this->nombre;
    }
    public function setNombre($n){
        $this->nombre = $n;
    }
    
    public function getPrecio(){
        return $this->precio;
    }
    public function setPrecio($p){
        $this->precio = $p;
    }
}

class Bebidas extends Producto {

}

$elemento1 = new Producto('001', 'Laptop', 15000);
echo $elemento1->obtenerPrecio();
echo "<br>";
echo $elemento1->calcularTotal();
echo "<br>";
$elemento2 = new Producto('002', 'Impresora', 3000);
echo $elemento2->obtenerPrecio();
echo "<br>";
echo $elemento2->calcularTotal();
echo "<br>";
echo $elemento2->getNombre();
echo "<br>";
$elemento2->setNombre('Celular');
echo $elemento2->getNombre();
?>