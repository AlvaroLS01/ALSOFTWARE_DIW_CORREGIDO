class Proyectos {
    constructor(idproyecto, nombre, f_ini, f_fin, descripcion) {
        this.idproyecto = idproyecto;
        this.nombre = nombre;
        this.f_ini = f_ini;
        this.f_fin = f_fin;
        this.descripcion = descripcion;
    }
}

class Tareas {
    constructor(idtarea, nombre, descripcion, idproyecto) {
        this.idtarea = idtarea;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.idproyecto = idproyecto;
    }
}

class Empresa {
    
    async getProyectos() {
        let datos = new FormData();

        let respuesta = await peticionGET("get_proyectos.php", datos);

        return respuesta;
    }

    
    async buscarTarea(nombretarea) {
        let datos = new FormData();

        datos.append("nombretarea", nombretarea);

        let respuesta = await peticionPOST("buscar_tarea.php", datos);

        return respuesta;
    }
    
    async altaTarea(oTarea) {
        let datos = new FormData();

        // Se podría pasar campo a campo al servidor
        // pero en esta ocasión vamos a pasar todos los datos 
        // en un solo parámetro cuyos datos van en formato JSON
        datos.append("tarea",JSON.stringify(oTarea));
       
        let respuesta = await peticionPOST("alta_tarea.php", datos);

        return respuesta;
    }

    async altaProyecto(oProyecto) {
        let datos = new FormData();

        datos.append("nombre", oProyecto.nombre);
        datos.append("f_ini", oProyecto.f_ini);
        datos.append("f_fin", oProyecto.f_fin);
        datos.append("descripcion", oProyecto.descripcion);

        let respuesta = await peticionPOST("alta_proyecto.php", datos);

        return respuesta;
    }

    async listadoPorProyecto(idproyecto) {
        let datos = new FormData();

        datos.append("idproyecto",idproyecto);

        let respuesta = await peticionGET("get_tareas_por_proyecto.php", datos);

        return respuesta;
    }

    async borrarTarea(idtarea) {
        let datos = new FormData();

        datos.append("idtarea", idtarea);

        let respuesta = await peticionPOST("borrar_tarea.php", datos);

        return respuesta;
    }

    async listadoProyecto() {
        let listado = "";

        let respuesta = await peticionGET("get_proyectos.php", new FormData());

        if (respuesta.error) {
            listado = respuesta.mensaje;
        } else {
            listado = "<table class='table table-striped'>";
            listado += "<thead><tr><th>IDPROYECTO</th><th>NOMBRE</th><th>FECHA INICIO</th><th>FECHA FIN</th><th>DESCRIPCIÓN</th></tr></thead>";
            listado += "<tbody>";

            for (let proyecto of respuesta.datos) {
                listado += "<tr><td>" + proyecto.idproyecto + "</td>";
                listado += "<td>" + proyecto.nombre + "</td>";
                listado += "<td>" + proyecto.f_ini + "</td>";
                listado += "<td>" + proyecto.f_fin + "</td>";
                listado += "<td>" + proyecto.descripcion + "</td></tr>";
            }
            listado += "</tbody></table>";
        }

        return listado;
    }

    async modificarTarea(oTarea) {
        let datos = new FormData();

        // Se podría pasar campo a campo al servidor
        // pero en esta ocasión vamos a pasar todos los datos 
        // en un solo parámetro cuyos datos van en formato JSON
        datos.append("tarea",JSON.stringify(oTarea));
       
        let respuesta = await peticionPOST("modificar_tarea.php", datos);

        return respuesta;
    }

    async listadoTarea() {
        let listado = "";

        let respuesta = await peticionGET("get_tareas.php", new FormData());

        if (respuesta.error) {
            listado = respuesta.mensaje;
        } else {
            listado = "<table class='table table-striped'>";
            listado += "<thead><tr><th>ID TAREA</th><th>NOMBRE</th><th>DESCRIPCION</th><th>ID PROYECTO</th></tr></thead>";
            listado += "<tbody>";

            for (let tarea of respuesta.datos) {
                listado += "<tr><td>" + tarea.idtarea + "</td>";
                listado += "<td>" + tarea.nombre + "</td>";
                listado += "<td>" + tarea.descripcion + "</td>";
                listado += "<td>" + tarea.idproyecto + "</td></tr>";
            }
            listado += "</tbody></table>";
        }

        return listado;
    }
}
