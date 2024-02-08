<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$nombre = $_POST['nombre'];
$f_ini = $_POST['f_ini'];
$f_fin = $_POST['f_fin'];
$descripcion = $_POST['descripcion'];


$sql = "INSERT INTO proyectos VALUES (null,'$nombre', '$f_ini', '$f_fin', '$descripcion');";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);

} else {
    // Prototipo responder($datos,$error,$mensaje,$conexion)
    responder(null, false, "Se ha insertado el proyecto", $conexion);
}
?>
