<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$tarea = json_decode($_POST['tarea']);

$sql = "INSERT INTO tareas VALUES(null, '$tarea->nombre' , '$tarea->descripcion',  $tarea->idproyecto ); ";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);

} else {
    // Prototipo responder($datos,$error,$mensaje,$conexion)
    responder(null, false, "Se ha dado de alta la tarea", $conexion);
}
?>
