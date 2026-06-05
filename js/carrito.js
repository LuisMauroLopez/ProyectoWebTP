// Cargamos y mostramos el carrito cuando abre la página
function cargarCarrito() {
    var carritoGuardado = localStorage.getItem("carrito");
    var carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

    var contenedor = document.getElementById("contenedorCarrito");
    var seccionTotal = document.getElementById("seccionTotal");

    // Si el carrito está vacío mostramos un mensaje
    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>No tenés productos en el carrito todavía.</p>";
        seccionTotal.style.display = "none";
        return;
    }

    contenedor.innerHTML = "";
    var total = 0;

    // Creamos una fila por cada producto del carrito
    for (var i = 0; i < carrito.length; i++) {
        var item = carrito[i];
        var subtotal = item.precio * item.cantidad;
        total += subtotal;

        var fila = document.createElement("div");
        fila.className = "fila-carrito";
        fila.innerHTML =
            '<span class="nombre-producto">' + item.nombre + '</span>' +
            '<span>Cantidad: ' + item.cantidad + '</span>' +
            '<span>$' + item.precio + ' c/u</span>' +
            '<span>Subtotal: $' + subtotal + '</span>' +
            '<button onclick="eliminarProducto(' + item.id + ')">Eliminar</button>';

        contenedor.appendChild(fila);
    }

    // Mostramos el total
    document.getElementById("totalCarrito").textContent = "$" + total;
    seccionTotal.style.display = "block";
}

// Elimina un producto del carrito por su id
function eliminarProducto(id) {
    var carritoGuardado = localStorage.getItem("carrito");
    var carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

    // Filtramos todos menos el que queremos eliminar
    var carritoNuevo = carrito.filter(function(item) {
        return item.id !== id;
    });

    // Guardamos el carrito sin ese producto
    localStorage.setItem("carrito", JSON.stringify(carritoNuevo));

    // Recargamos la vista del carrito
    cargarCarrito();
}

// Vacía todo el carrito
function vaciarCarrito() {
    localStorage.removeItem("carrito");
    cargarCarrito();
}

// Llamamos a la función cuando carga la página
cargarCarrito();
