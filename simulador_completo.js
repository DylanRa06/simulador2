let clientes = [];
let creditos = [];

let tasaInteres = 15;
let clienteSeleccionado = null;
let cuotaCalculada = 0;
let montoCalculado = 0;
let plazoCalculado = 0;
let creditoAprobado = false;


// OCULTAR TODAS LAS SECCIONES

function ocultarSecciones() {

    document.getElementById("parametros").classList.remove("activa");
    document.getElementById("clientes").classList.remove("activa");

}


// MOSTRAR UNA SECCIÓN

function mostrarSeccion(idSeccion) {

    ocultarSecciones();

    document.getElementById(idSeccion).classList.add("activa");

}


// Para recuperar o mostrar información usar los métodos
// de la clase utilitarios.