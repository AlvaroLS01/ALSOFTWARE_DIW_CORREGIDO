<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$idtarea = $_POST['idtarea'];

// SQL
$sql = "DELETE FROM tareas WHERE idtarea = $idtarea;";

$resultado = mysqli_query($conexion, $sql);

// responder(datos, error, mensaje, conexion)
responder(null, false, "Datos eliminados", $conexion);

