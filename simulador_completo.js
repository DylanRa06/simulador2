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

function guardarTasa() {

    let nuevaTasa;

    nuevaTasa = recuperarFloat("tasaInteres");

    if (nuevaTasa >= 10 && nuevaTasa <= 20) {

        tasaInteres = nuevaTasa;

        mostrarTexto(
            "mensajeTasa",
            "Tasa configurada correctamente: " + tasaInteres + "%"
        );

    } else {

        mostrarTexto(
            "mensajeTasa",
            "La tasa debe estar entre 10% y 20%"
        );

    }

}
function guardarCliente() {

    let cedula;
    let nombre;
    let apellido;
    let ingresos;
    let egresos;
    let cliente;

    cedula = recuperaraTexto("cedulaCliente");
    nombre = recuperaraTexto("nombreCliente");
    apellido = recuperaraTexto("apellidoCliente");
    ingresos = recuperarFloat("ingresosCliente");
    egresos = recuperarFloat("egresosCliente");

    cliente = {
        cedula: cedula,
        nombre: nombre,
        apellido: apellido,
        ingresos: ingresos,
        egresos: egresos
    };

    clientes.push(cliente);

    pintarClientes();

    mostrarTexto(
        "mensajeCliente",
        "Cliente guardado correctamente"
    );

}

function pintarClientes() {

    let tabla;
    let contenido = "";
    let cliente;

    tabla = document.getElementById("tablaClientes");

    for (let indice = 0; indice < clientes.length; indice++) {

        cliente = clientes[indice];

        contenido +=
            "<tr>" +
                "<td>" + cliente.cedula + "</td>" +
                "<td>" + cliente.nombre + "</td>" +
                "<td>" + cliente.apellido + "</td>" +
                "<td>" + cliente.ingresos + "</td>" +
                "<td>" + cliente.egresos + "</td>" +
                "<td>" +
                    "<button>Actualizar</button>" +
                "</td>" +
            "</tr>";

    }

    tabla.innerHTML = contenido;

}

function limpiar() {

    mostrarTextoEnCaja("cedulaCliente", "");
    mostrarTextoEnCaja("nombreCliente", "");
    mostrarTextoEnCaja("apellidoCliente", "");
    mostrarTextoEnCaja("ingresosCliente", "");
    mostrarTextoEnCaja("egresosCliente", "");

    mostrarTexto("mensajeCliente", "");

}