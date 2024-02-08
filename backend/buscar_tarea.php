<?php
require_once('config.php');
$conexion = obtenerConexion();

if ($conexion) {
    $nombretarea = $_POST['nombretarea'];

    $sql = "SELECT t.*, p.nombre AS nombreProyecto FROM tareas t
    INNER JOIN proyectos p ON t.idproyecto = p.idproyecto
    WHERE t.nombre LIKE ?;";

    // Preparar la sentencia
    if ($stmt = mysqli_prepare($conexion, $sql)) {
        // Vincular parámetros para marcadores
        $nombretarea_like = "%".$nombretarea."%";
        mysqli_stmt_bind_param($stmt, "s", $nombretarea_like);

        // Ejecutar la sentencia
        mysqli_stmt_execute($stmt);

        // Vincular variables a los resultados
        $resultado = mysqli_stmt_get_result($stmt);

        // Pedir una fila
        $fila = mysqli_fetch_assoc($resultado);

        if ($fila) { // Devuelve datos
            responder($fila, false, "Datos recuperados", $conexion);
        } else { // No hay datos
            responder(null, true, "No existe el componente", $conexion);
        }

        // Cerrar sentencia
        mysqli_stmt_close($stmt);
    } else {
        echo "Error al preparar la consulta: " . mysqli_error($conexion);
    }

    // Cerrar conexión
    mysqli_close($conexion);
} else {
    echo "Error de conexión: " . mysqli_connect_error();
}
?>
