let clientes = [];
let creditos = [];

let tasaInteres = 15;
let clienteSeleccionado = null;
let clienteCreditoSeleccionado = null;

let cuotaCalculada = 0;
let montoCalculado = 0;
let plazoCalculado = 0;
let creditoAprobado = false;

// OCULTAR TODAS LAS SECCIONES

function ocultarSecciones() {

    document
        .getElementById("parametros")
        .classList.remove("activa");

    document
        .getElementById("clientes")
        .classList.remove("activa");

    document
        .getElementById("credito")
        .classList.remove("activa");

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
    let clienteExistente;
    let cliente;

    cedula = recuperaraTexto("cedulaCliente");
    nombre = recuperaraTexto("nombreCliente");
    apellido = recuperaraTexto("apellidoCliente");
    ingresos = recuperarFloat("ingresosCliente");
    egresos = recuperarFloat("egresosCliente");

    if (
        cedula === "" ||
        nombre === "" ||
        apellido === "" ||
        isNaN(ingresos) ||
        isNaN(egresos)
    ) {

        mostrarTexto(
            "mensajeCliente",
            "Debe completar correctamente todos los campos"
        );

        return;

    }

    if (clienteSeleccionado === null) {

        clienteExistente = buscarCliente(cedula);

        if (clienteExistente !== null) {

            mostrarTexto(
                "mensajeCliente",
                "Ya existe un cliente con esa cédula"
            );

            return;

        }

        cliente = {
            cedula: cedula,
            nombre: nombre,
            apellido: apellido,
            ingresos: ingresos,
            egresos: egresos
        };

        clientes.push(cliente);

        mostrarTexto(
            "mensajeCliente",
            "Cliente guardado correctamente"
        );

    } else {

        clienteSeleccionado.nombre = nombre;
        clienteSeleccionado.apellido = apellido;
        clienteSeleccionado.ingresos = ingresos;
        clienteSeleccionado.egresos = egresos;

        mostrarTexto(
            "mensajeCliente",
            "Cliente actualizado correctamente"
        );

    }

    pintarClientes();
    limpiarFormularioCliente();

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
                    "<button onclick=\"seleccionarCliente('" +
                    cliente.cedula +
                    "')\">Actualizar</button>" +
                "</td>" +
            "</tr>";

    }

    tabla.innerHTML = contenido;

}

function limpiar() {

    limpiarFormularioCliente();

    mostrarTexto("mensajeCliente", "");

}

function buscarCliente(cedula) {

    let clienteEncontrado = null;
    let cliente;

    for (let indice = 0; indice < clientes.length; indice++) {

        cliente = clientes[indice];

        if (cliente.cedula === cedula) {

            clienteEncontrado = cliente;
            break;

        }

    }

    return clienteEncontrado;

}

function seleccionarCliente(cedula) {

    clienteSeleccionado = buscarCliente(cedula);

    if (clienteSeleccionado !== null) {

        mostrarTextoEnCaja(
            "cedulaCliente",
            clienteSeleccionado.cedula
        );

        mostrarTextoEnCaja(
            "nombreCliente",
            clienteSeleccionado.nombre
        );

        mostrarTextoEnCaja(
            "apellidoCliente",
            clienteSeleccionado.apellido
        );

        mostrarTextoEnCaja(
            "ingresosCliente",
            clienteSeleccionado.ingresos
        );

        mostrarTextoEnCaja(
            "egresosCliente",
            clienteSeleccionado.egresos
        );

        document.getElementById("cedulaCliente").disabled = true;

        mostrarTexto(
            "mensajeCliente",
            "Cliente seleccionado para actualizar"
        );

    }

}

function limpiarFormularioCliente() {

    mostrarTextoEnCaja("cedulaCliente", "");
    mostrarTextoEnCaja("nombreCliente", "");
    mostrarTextoEnCaja("apellidoCliente", "");
    mostrarTextoEnCaja("ingresosCliente", "");
    mostrarTextoEnCaja("egresosCliente", "");

    document.getElementById("cedulaCliente").disabled = false;

    clienteSeleccionado = null;

}

function buscarClienteCredito() {

    let cedula;

    cedula = recuperaraTexto("buscarCedulaCredito");

    clienteCreditoSeleccionado = buscarCliente(cedula);

    if (clienteCreditoSeleccionado !== null) {

        mostrarDatosClienteCredito();

    } else {

        document.getElementById("datosClienteCredito").innerHTML =
            "<h3>Cliente no encontrado</h3>" +
            "<p>No existe un cliente registrado con esa cédula.</p>";

        document.getElementById("resultadoCredito").innerHTML = "";

    }

}

function mostrarDatosClienteCredito() {

    let datosClienteCredito;

    datosClienteCredito =
        document.getElementById("datosClienteCredito");

    datosClienteCredito.innerHTML =
        "<h3>Datos del Cliente</h3>" +
        "<p><strong>Cédula:</strong> " +
        clienteCreditoSeleccionado.cedula +
        "</p>" +
        "<p><strong>Nombre:</strong> " +
        clienteCreditoSeleccionado.nombre +
        "</p>" +
        "<p><strong>Apellido:</strong> " +
        clienteCreditoSeleccionado.apellido +
        "</p>" +
        "<p><strong>Ingresos:</strong> $" +
        clienteCreditoSeleccionado.ingresos +
        "</p>" +
        "<p><strong>Egresos:</strong> $" +
        clienteCreditoSeleccionado.egresos +
        "</p>";

}

function calcularCredito() {

    let monto;
    let plazo;
    let capacidadPago;
    let interes;
    let totalPagar;
    let cuotaMensual;
    let resultadoCredito;

    resultadoCredito = document.getElementById("resultadoCredito");

    if (clienteCreditoSeleccionado === null) {

        resultadoCredito.innerHTML =
            "Primero debe buscar un cliente.";

        resultadoCredito.className = "rechazado";

        return;

    }

    monto = recuperarFloat("montoCredito");
    plazo = recuperarInt("plazoCredito");

    if (
        isNaN(monto) ||
        isNaN(plazo) ||
        monto <= 0 ||
        plazo <= 0
    ) {

        resultadoCredito.innerHTML =
            "Ingrese correctamente el monto y el plazo.";

        resultadoCredito.className = "rechazado";

        return;

    }

    capacidadPago =
        clienteCreditoSeleccionado.ingresos -
        clienteCreditoSeleccionado.egresos;

    interes =
        monto *
        (tasaInteres / 100) *
        (plazo / 12);

    totalPagar = monto + interes;

    cuotaMensual = totalPagar / plazo;

    if (cuotaMensual <= capacidadPago) {

        resultadoCredito.innerHTML =
            "Capacidad de pago: $" +
            capacidadPago.toFixed(2) +
            "<br>" +
            "Total a pagar: $" +
            totalPagar.toFixed(2) +
            "<br>" +
            "Cuota mensual: $" +
            cuotaMensual.toFixed(2) +
            "<br>" +
            "RESULTADO: APROBADO";

        resultadoCredito.className = "aprobado";

    } else {

        resultadoCredito.innerHTML =
            "Capacidad de pago: $" +
            capacidadPago.toFixed(2) +
            "<br>" +
            "Total a pagar: $" +
            totalPagar.toFixed(2) +
            "<br>" +
            "Cuota mensual: $" +
            cuotaMensual.toFixed(2) +
            "<br>" +
            "RESULTADO: RECHAZADO";

        resultadoCredito.className = "rechazado";

    }

}