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
    document.getElementById("parametros").classList.remove("activa");
    document.getElementById("clientes").classList.remove("activa");
    document.getElementById("credito").classList.remove("activa");
    document.getElementById("listaCreditos").classList.remove("activa");
    document.getElementById("contacto").classList.remove("activa");
}

// MOSTRAR UNA SECCIÓN
function mostrarSeccion(idSeccion) {
    ocultarSecciones();
    document.getElementById(idSeccion).classList.add("activa");
}

function guardarTasa() {
    let nuevaTasa = recuperarFloat("tasaInteres");

    if (nuevaTasa >= 10 && nuevaTasa <= 20) {
        tasaInteres = nuevaTasa;
        mostrarTexto("mensajeTasa", "Tasa configurada correctamente: " + tasaInteres + "%");
    } else {
        mostrarTexto("mensajeTasa", "La tasa debe estar entre 10% y 20%");
    }
}

function guardarCliente() {
    let cedula = recuperaraTexto("cedulaCliente");
    let nombre = recuperaraTexto("nombreCliente");
    let apellido = recuperaraTexto("apellidoCliente");
    let ingresos = recuperarFloat("ingresosCliente");
    let egresos = recuperarFloat("egresosCliente");
    let correo = recuperaraTexto("correoCliente");

    if (
        cedula === "" ||
        nombre === "" ||
        apellido === "" ||
        isNaN(ingresos) ||
        isNaN(egresos)
    ) {
        mostrarTexto("mensajeCliente", "Debe completar correctamente todos los campos");
        return;
    }

    if (clienteSeleccionado === null) {
        if (buscarCliente(cedula) !== null) {
            mostrarTexto("mensajeCliente", "Ya existe un cliente con esa cédula");
            return;
        }

        let cliente = {
            cedula: cedula,
            nombre: nombre,
            apellido: apellido,
            ingresos: ingresos,
            egresos: egresos,
            correo: correo
        };

        clientes.push(cliente);
        mostrarTexto("mensajeCliente", "Cliente guardado correctamente");
    } else {
        clienteSeleccionado.nombre = nombre;
        clienteSeleccionado.apellido = apellido;
        clienteSeleccionado.ingresos = ingresos;
        clienteSeleccionado.egresos = egresos;
        clienteSeleccionado.correo = correo;

        mostrarTexto("mensajeCliente", "Cliente actualizado correctamente");
    }

    pintarClientes();
    limpiarFormularioCliente();
}

function pintarClientes() {
    let tabla = document.getElementById("tablaClientes");
    let contenido = "";

    for (let indice = 0; indice < clientes.length; indice++) {
        let cliente = clientes[indice];

        contenido +=
            "<tr>" +
                "<td>" + cliente.cedula + "</td>" +
                "<td>" + cliente.nombre + "</td>" +
                "<td>" + cliente.apellido + "</td>" +
                "<td>" + cliente.ingresos + "</td>" +
                "<td>" + cliente.egresos + "</td>" +
                "<td>" + (cliente.correo || "") + "</td>" +
                "<td>" +
                    "<button onclick=\"seleccionarCliente('" + cliente.cedula + "')\">Actualizar</button>" +
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

    for (let indice = 0; indice < clientes.length; indice++) {
        if (clientes[indice].cedula === cedula) {
            clienteEncontrado = clientes[indice];
            break;
        }
    }

    return clienteEncontrado;
}

function seleccionarCliente(cedula) {
    clienteSeleccionado = buscarCliente(cedula);

    if (clienteSeleccionado !== null) {
        mostrarTextoEnCaja("cedulaCliente", clienteSeleccionado.cedula);
        mostrarTextoEnCaja("nombreCliente", clienteSeleccionado.nombre);
        mostrarTextoEnCaja("apellidoCliente", clienteSeleccionado.apellido);
        mostrarTextoEnCaja("ingresosCliente", clienteSeleccionado.ingresos);
        mostrarTextoEnCaja("egresosCliente", clienteSeleccionado.egresos);
        mostrarTextoEnCaja("correoCliente", clienteSeleccionado.correo || "");

        document.getElementById("cedulaCliente").disabled = true;
        mostrarTexto("btnGuardarCliente", "Actualizar cliente");
        mostrarTexto("mensajeCliente", "Cliente seleccionado para actualizar");
    }
}

function limpiarFormularioCliente() {
    mostrarTextoEnCaja("cedulaCliente", "");
    mostrarTextoEnCaja("nombreCliente", "");
    mostrarTextoEnCaja("apellidoCliente", "");
    mostrarTextoEnCaja("ingresosCliente", "");
    mostrarTextoEnCaja("egresosCliente", "");
    mostrarTextoEnCaja("correoCliente", "");

    document.getElementById("cedulaCliente").disabled = false;
    mostrarTexto("btnGuardarCliente", "Guardar cliente");
    clienteSeleccionado = null;
}

function buscarClienteCredito() {
    let cedula = recuperaraTexto("buscarCedulaCredito");
    clienteCreditoSeleccionado = buscarCliente(cedula);

    if (clienteCreditoSeleccionado !== null) {
        mostrarDatosClienteCredito();
    } else {
        document.getElementById("datosClienteCredito").innerHTML =
            "<h3>Cliente no encontrado</h3>" +
            "<p>No existe un cliente registrado con esa cédula.</p>";

        document.getElementById("resultadoCredito").innerHTML = "";
        document.getElementById("btnAsignarCredito").disabled = true;
    }
}

function mostrarDatosClienteCredito() {
    let datosClienteCredito = document.getElementById("datosClienteCredito");

    datosClienteCredito.innerHTML =
        "<h3>Datos del Cliente</h3>" +
        "<p><strong>Cédula:</strong> " + clienteCreditoSeleccionado.cedula + "</p>" +
        "<p><strong>Nombre:</strong> " + clienteCreditoSeleccionado.nombre + "</p>" +
        "<p><strong>Apellido:</strong> " + clienteCreditoSeleccionado.apellido + "</p>" +
        "<p><strong>Ingresos:</strong> $" + clienteCreditoSeleccionado.ingresos + "</p>" +
        "<p><strong>Egresos:</strong> $" + clienteCreditoSeleccionado.egresos + "</p>";
}

function calcularCredito() {
    let resultadoCredito = document.getElementById("resultadoCredito");
    let btnAsignar = document.getElementById("btnAsignarCredito");

    if (clienteCreditoSeleccionado === null) {
        resultadoCredito.innerHTML = "Primero debe buscar un cliente.";
        resultadoCredito.className = "rechazado";
        btnAsignar.disabled = true;
        return;
    }

    let monto = recuperarFloat("montoCredito");
    let plazo = recuperarInt("plazoCredito");

    if (isNaN(monto) || isNaN(plazo) || monto <= 0 || plazo <= 0) {
        resultadoCredito.innerHTML = "Ingrese correctamente el monto y el plazo.";
        resultadoCredito.className = "rechazado";
        btnAsignar.disabled = true;
        return;
    }

    let capacidadPago = clienteCreditoSeleccionado.ingresos - clienteCreditoSeleccionado.egresos;
    let interes = monto * (tasaInteres / 100) * (plazo / 12);
    let totalPagar = monto + interes;
    let cuotaMensual = totalPagar / plazo;

    // Guardar los valores calculados
    montoCalculado = monto;
    plazoCalculado = plazo;
    cuotaCalculada = cuotaMensual;

    if (cuotaMensual <= capacidadPago) {
        resultadoCredito.innerHTML =
            "Capacidad de pago: $" + capacidadPago.toFixed(2) + "<br>" +
            "Total a pagar: $" + totalPagar.toFixed(2) + "<br>" +
            "Cuota mensual: $" + cuotaMensual.toFixed(2) + "<br>" +
            "RESULTADO: APROBADO";

        resultadoCredito.className = "aprobado";
        creditoAprobado = true;
        btnAsignar.disabled = false; // PASO 2: Habilitar si es aprobado
    } else {
        resultadoCredito.innerHTML =
            "Capacidad de pago: $" + capacidadPago.toFixed(2) + "<br>" +
            "Total a pagar: $" + totalPagar.toFixed(2) + "<br>" +
            "Cuota mensual: $" + cuotaMensual.toFixed(2) + "<br>" +
            "RESULTADO: RECHAZADO";

        resultadoCredito.className = "rechazado";
        creditoAprobado = false;
        btnAsignar.disabled = true; // PASO 2: Deshabilitar si es rechazado
    }
}

// PASO 2: ASIGNAR CRÉDITO
function asignarCredito() {
    if (!creditoAprobado || clienteCreditoSeleccionado === null) {
        return;
    }

    let credito = {
        cedula: clienteCreditoSeleccionado.cedula,
        nombre: clienteCreditoSeleccionado.nombre,
        apellido: clienteCreditoSeleccionado.apellido,
        monto: montoCalculado,
        tasa: tasaInteres,
        plazo: plazoCalculado,
        cuota: cuotaCalculada
    };

    creditos.push(credito);
    pintarCreditos(creditos);

    alert("¡Crédito asignado correctamente!");

    // Reiniciar campos tras la asignación
    document.getElementById("btnAsignarCredito").disabled = true;
    document.getElementById("resultadoCredito").innerHTML = "";
    document.getElementById("datosClienteCredito").innerHTML = "";
    mostrarTextoEnCaja("buscarCedulaCredito", "");
    mostrarTextoEnCaja("montoCredito", "");
    mostrarTextoEnCaja("plazoCredito", "");
    clienteCreditoSeleccionado = null;
}

// PASO 4: FUNCION BUSCAR CREDITOS
function buscarCreditos(cedula) {
    let creditosCliente = [];

    for (let indice = 0; indice < creditos.length; indice++) {
        if (creditos[indice].cedula === cedula) {
            creditosCliente.push(creditos[indice]);
        }
    }

    return creditosCliente;
}

// PASO 5 y 7: FUNCION PINTAR CREDITOS
function pintarCreditos(arregloCreditos) {
    let tabla = document.getElementById("tablaCreditos");
    let contenido = "";

    for (let indice = 0; indice < arregloCreditos.length; indice++) {
        let cr = arregloCreditos[indice];

        contenido +=
            "<tr>" +
                "<td>" + cr.cedula + "</td>" +
                "<td>" + cr.nombre + "</td>" +
                "<td>" + cr.apellido + "</td>" +
                "<td>" + cr.monto + "</td>" +
                "<td>" + cr.tasa + "%</td>" +
                "<td>" + cr.plazo + " meses</td>" +
                "<td>" + cr.cuota.toFixed(2) + "</td>" +
            "</tr>";
    }

    tabla.innerHTML = contenido;
}

// PASO 6: FUNCION BUSCAR CREDITOS CLIENTE
function buscarCreditosCliente() {
    let cedula = recuperaraTexto("buscarCedulaListado");
    let creditosEncontrados = buscarCreditos(cedula);
    pintarCreditos(creditosEncontrados);
}