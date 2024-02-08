<?php
require_once('config.php');
$conexion = obtenerConexion();

// Datos de entrada
$idproyecto = $_GET['idproyecto'];

// SQL
$sql = "SELECT t.*, p.nombre AS proyecto_nombre 
FROM tareas AS t, proyectos AS p 
WHERE t.idproyecto = p.idproyecto 
AND t.idproyecto = $idproyecto;"
;

$resultado = mysqli_query($conexion, $sql);

while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila; // Insertar la fila en el array
}

responder($datos, false, "Datos recuperados", $conexion);