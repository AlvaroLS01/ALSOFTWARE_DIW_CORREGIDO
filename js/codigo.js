"use strict";

// Suponiendo la existencia de una clase Empresa con métodos relevantes ya definidos en objetos.js

var oEmpresa = new Empresa();

document.addEventListener("DOMContentLoaded", function () {
  registrarEventos();
});

function registrarEventos() {
  // Aquí asumimos que tienes botones o enlaces en tu HTML para las acciones de alta de proyecto, alta de tarea, etc.
  //TAREA
  document
    .querySelector("#mnuAltaTarea")
    .addEventListener("click", mostrarFormulario);
  document
    .querySelector("#mnuBuscarTarea")
    .addEventListener("click", mostrarFormulario);
  document
    .querySelector("#mnuListadoPorProyecto")
    .addEventListener("click", mostrarFormulario);
  document
    .querySelector("#mnuListadoTarea")
    .addEventListener("click", mostrarListadoTarea);

  //PROYECTO
  document
    .querySelector("#mnuAltaProyecto")
    .addEventListener("click", mostrarFormulario);
  document
    .querySelector("#mnuListadoProyecto")
    .addEventListener("click", mostrarListadoProyecto);

  //BOTONES
  frmAltaTarea.btnAceptarAltaTarea.addEventListener("click", procesarAltaTarea);
  frmBuscarTarea.btnBuscarTarea.addEventListener("click", procesarBuscarTarea);
  frmListadoPorProyecto.btnAceptarListadoPorProyecto.addEventListener("click", procesarListadoPorProyecto);

  frmAltaProyecto.btnAceptarAltaProyecto.addEventListener("click", procesarAltaProyecto);
  frmModificarTarea.btnAceptarModTarea.addEventListener("click", procesarModificarTarea);

}

function mostrarFormulario(oEvento) {
  var idBoton = oEvento.target.id;
  ocultarFormularios(); // Asegurarse de que otros formularios estén ocultos

  switch (idBoton) {
    case "mnuAltaTarea":
      frmAltaTarea.style.display = "block";
      actualizarDesplegableProyectos(undefined);
      break;
    case "mnuBuscarTarea":
      frmBuscarTarea.style.display = "block";
      break;
    case "mnuListadoPorProyecto":
      frmListadoPorProyecto.style.display = "block";
      actualizarDesplegableProyectos(undefined);
      break;
    case "mnuAltaProyecto":
      frmAltaProyecto.style.display = "block";
      break;
  }
}

function ocultarFormularios() {
  frmAltaTarea.style.display = "none";
  frmBuscarTarea.style.display = "none";
  frmListadoPorProyecto.style.display = "none";
  frmModificarTarea.style.display = "none";

  frmAltaProyecto.style.display = "none";

  resultadoBusqueda.style.display = 'none';
  document.querySelector("#listados").innerHTML = "";
}

async function actualizarDesplegableProyectos(idProyectoSeleccionado) {
  let respuesta = await oEmpresa.getProyectos();
    let options = "";

    for (let proyectos of respuesta.datos) {
        if (idProyectoSeleccionado && idProyectoSeleccionado == proyectos.idproyecto) { // Si llega el parámetro ( != undefined )
            options += "<option selected value='" + proyectos.idproyecto + "' >" + proyectos.nombre + "</option>";
        } else {
            options += "<option value='" + proyectos.idproyecto + "' >" + proyectos.nombre + "</option>";
        }

    }
    // Agrego los options generados a partir del contenido de la BD
    frmListadoPorProyecto.lstProyecto.innerHTML = options;
    // Aprovecho y actualizo todos los desplegables se vea o no el formulario
    frmModificarTarea.lstModProyecto.innerHTML = options;
    frmAltaTarea.lstAltaProyecto.innerHTML = options;
}

async function procesarAltaTarea() {
  // Recuperar datos del formulario de alta de tarea
  let nombre = frmAltaTarea.txtAltaNombre.value.trim();
  let descripcion = frmAltaTarea.txtAltaDescripcion.value.trim();
  let idProyecto = frmAltaTarea.lstAltaProyecto.value; // Selecciona el ID del proyecto desde un <select>

  // Validar datos del formulario
  if (validarAltaTarea()) {
      let respuesta = await oEmpresa.altaTarea(new Tareas(null, nombre, descripcion, idProyecto));
      alert(respuesta.mensaje);

      if (!respuesta.error) {
          // Resetear formulario
          frmAltaTarea.reset();
          // Ocultar el formulario
          frmAltaTarea.style.display = "none";
      }
  }
}

function validarAltaTarea() {
  // Recuperar datos del formulario de alta de tarea
  let nombre = frmAltaTarea.txtAltaNombre.value.trim();
  let descripcion = frmAltaTarea.txtAltaDescripcion.value.trim();
  let idProyecto = frmAltaTarea.lstAltaProyecto.value;

  let valido = true;
  let errores = "";

  // Validaciones específicas para el formulario de alta de tarea
  if (nombre.length == 0 || descripcion.length == 0) {
      valido = false;
      errores += "El nombre y la descripción no pueden estar vacíos.\n";
  }

  if (!valido) {
      alert(errores);
  }

  return valido;
}

async function procesarBuscarTarea() {
  if (validarBuscarTarea()) {
    let nombretarea = frmBuscarTarea.txtNombreTarea.value.trim();

    let respuesta = await oEmpresa.buscarTarea(nombretarea);

    if (!respuesta.error) { // Si NO hay error
      let resultadoBusqueda = document.querySelector("#resultadoBusqueda");
      let tablaSalida = "<table class='table'>";
      tablaSalida += "<thead><tr><th>IDTAREA</th><th>NOMBRE</th><th>DESCRIPCION</th><th>PROYECTO</th><th>ACCION</th></tr></thead><tbody>";

      // Asegurar que respuesta.datos sea siempre un arreglo
      let tareas = Array.isArray(respuesta.datos) ? respuesta.datos : [respuesta.datos];

      tareas.forEach(tarea => {
        tablaSalida += `<tr>
                        <td>${tarea.idtarea}</td>
                        <td>${tarea.nombre}</td>
                        <td>${tarea.descripcion}</td>
                        <td>${tarea.nombreProyecto}</td>
                        <td><input type='button' class='btn btn-danger' value='Borrar' id='btnBorrarTarea${tarea.idtarea}' data-idtarea='${tarea.idtarea}'></td>
                        </tr>`;
      });

      tablaSalida += "</tbody></table>";
      resultadoBusqueda.innerHTML = tablaSalida;
      resultadoBusqueda.style.display = 'block';

      document.querySelector("[id^='btnBorrarTarea']").addEventListener("click", borrarTarea);


      // Registrar evento para cada botón borrar, si necesario
    } else { // Si hay error
      alert(respuesta.mensaje);
    }
  }
}

function validarBuscarTarea() {
  let nombretarea = frmBuscarTarea.txtNombreTarea.value.trim();
  let valido = true;
  let errores = "";

  if (nombretarea === "") {
      valido = false;
      errores += "El nombre de la tarea no puede estar vacío.";
  }

  if (!valido) {
      // Hay errores
      alert(errores);
  }

  return valido;
}

async function procesarAltaProyecto() {
  // Recuperar datos del formulario de alta de proyecto
  let nombre = frmAltaProyecto.txtAltaNombreProyecto.value.trim();
  let descripcion = frmAltaProyecto.txtAltaDescripcionProyecto.value.trim();
  let fechaInicio = frmAltaProyecto.txtAltaFechaInicio.value; // Asume un campo de entrada para la fecha de inicio
  let fechaFin = frmAltaProyecto.txtAltaFechaFin.value; // Asume un campo de entrada para la fecha de fin

  // Validar datos del formulario
  if (validarAltaProyecto(nombre, descripcion, fechaInicio, fechaFin)) {
      let proyecto = {
          nombre: nombre,
          descripcion: descripcion,
          f_ini: fechaInicio,
          f_fin: fechaFin
      };
      
      let respuesta = await oEmpresa.altaProyecto(proyecto);
      alert(respuesta.mensaje);

      if (!respuesta.error) {
          // Resetear formulario
          frmAltaProyecto.reset();
          // Ocultar el formulario
          frmAltaProyecto.style.display = "none";
      }
  }
}

function validarAltaProyecto(nombre, descripcion, fechaInicio, fechaFin) {
  let valido = true;
  let errores = "";

  // Validaciones específicas para el formulario de alta de proyecto
  if (nombre.length == 0 || descripcion.length == 0) {
      valido = false;
      errores += "El nombre y la descripción no pueden estar vacíos.\n";
  }

  // Validar el formato de las fechas y que la fecha de inicio sea menor que la fecha de fin
  // Esto podría requerir convertir las fechas a objetos Date y compararlas
  let fechaInicioObj = new Date(fechaInicio);
  let fechaFinObj = new Date(fechaFin);
  

  if (!valido) {
      alert(errores);
  }

  return valido;
}

async function procesarListadoPorProyecto() {
  // Recuperar idProyecto seleccionado
  let idProyecto = frmListadoPorProyecto.lstProyecto.value;

  let respuesta = await oEmpresa.listadoPorProyecto(idProyecto);

  let tabla = "<table class='table table-striped' id='listadoPorProyecto'>";
  tabla += "<thead><tr><th>IDTAREA</th><th>NOMBRE</th><th>DESCRIPCION</th><th>ID PROYECTO</th><th>ACCION</th></tr></thead><tbody>";

  for (let tarea of respuesta.datos) {
      tabla += "<tr><td>" + tarea.idtarea + "</td>";
      tabla += "<td>" + tarea.nombre + "</td>";
      tabla += "<td>" + tarea.descripcion + "</td>";
      tabla += "<td>" + tarea.idproyecto + "</td>"; // Asumiendo que 'nombreProyecto' se recupera en la respuesta

      tabla += "<td><button id='btnModificarTarea' class='btn btn-primary' data-tarea='" + JSON.stringify(tarea) + "' onclick='editarTarea(this)'><i class='bi bi-pencil-square'></i></button></td></tr>";
  }

  tabla += "</tbody></table>";

  // Agregamos el contenido a la capa de listados
  document.querySelector("#listados").innerHTML = tabla;

  document.querySelector("#btnModificarTarea").addEventListener("click", procesarBotonEditarTarea);

}

async function borrarTarea(oEvento) {
  let boton = oEvento.target;
  let idtarea = boton.dataset.idtarea;

  let respuesta = await oEmpresa.borrarTarea(idtarea);

  alert(respuesta.mensaje);

  if (!respuesta.error) { // Si NO hay error
      // Borrado de la tabla html
      document.querySelector("#resultadoBusqueda").innerHTML = "";
  }

}

function mostrarListadoProyecto() {
  open("listado_proyectos.html ");
}

function procesarBotonEditarTarea(oEvento) {
  let boton = null;

  // Verificamos si han hecho clic sobre el botón o el icono
  if (oEvento.target.nodeName == "I" || oEvento.target.nodeName == "BUTTON") {
      if (oEvento.target.nodeName == "I") {
          // Pulsación sobre el icono
          boton = oEvento.target.parentElement; // El padre es el botón
      } else {
          boton = oEvento.target;
      }

      // 1. Ocultar todos los formularios
      ocultarFormularios();
      // 2. Mostrar el formulario de modificación de tareas
      frmModificarTarea.style.display = "block";
      // 3. Rellenar los datos de este formulario con los de la tarea
      let tarea = JSON.parse(boton.dataset.tarea);

      frmModificarTarea.txtModIdTarea.value = tarea.idtarea;
      frmModificarTarea.txtModNombreTarea.value = tarea.nombre;
      frmModificarTarea.txtModDescripcionTarea.value = tarea.descripcion;
      // Suponiendo que haya que seleccionar un proyecto para la tarea
      actualizarDesplegableProyectos(tarea.idproyecto);
  }
}

async function procesarModificarTarea() {
  // Recuperar datos del formulario frmModificarTarea
  let idTarea = frmModificarTarea.txtModIdTarea.value.trim();
  let nombre = frmModificarTarea.txtModNombreTarea.value.trim();
  let descripcion = frmModificarTarea.txtModDescripcionTarea.value.trim();
  let idProyecto = frmModificarTarea.lstModProyecto.value; // Suponiendo que asignas tareas a proyectos

  // Validar datos del formulario
  if (validarModTarea()) {
      let respuesta = await oEmpresa.modificarTarea(new Tareas(idTarea, nombre, descripcion, idProyecto));

      alert(respuesta.mensaje);

      if (!respuesta.error) { // Si NO hay error
          // Resetear formulario
          frmModificarTarea.reset();
          // Ocultar el formulario
          frmModificarTarea.style.display = "none";
      }
  }
}


function validarModTarea() {
  // Recuperar datos del formulario frmModificarTarea
  let idTarea = frmModificarTarea.txtModIdTarea.value.trim();
  let nombre = frmModificarTarea.txtModNombreTarea.value.trim();
  let descripcion = frmModificarTarea.txtModDescripcionTarea.value.trim();
  let idProyecto = parseInt(frmModificarTarea.lstModProyecto.value);

  let valido = true;
  let errores = "";

  if (isNaN(idTarea)) {
      valido = false;
      errores += "El identificador de la tarea debe ser numérico.\n";
  }

  if (isNaN(idProyecto)) {
      valido = false;
      errores += "El identificador del proyecto debe ser numérico.\n";
  }

  if (nombre.length == 0 || descripcion.length == 0) {
      valido = false;
      errores += "El nombre y la descripción no pueden estar vacíos.\n";
  }

  if (!valido) {
      // Hay errores
      alert(errores);
  }

  return valido;
}

function mostrarListadoTarea() {
  open("listado_tareas.html ");
}






//EDITAR TAREA HAY Q HACERLO, ESTA EN procesarListadoPorProyecto()