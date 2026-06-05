// Esta variable guarda la ruta al JSON dependiendo de desde dónde se llama
var estamosEnPages = window.location.pathname.includes("/pages/");
var rutaJSON = estamosEnPages ? "../data/productos.json" : "data/productos.json";

// Función principal: trae los productos del JSON y los muestra en pantalla
// Recibe una categoría ("lanas", "merceria", "tejidos") para filtrar
// Si no recibe ninguna, muestra todos (para el home)
function cargarProductos(categoria) {
    fetch(rutaJSON)
        .then(function(respuesta) {
            return respuesta.json();
        })
        .then(function(productos) {

            // Si se pasó una categoría, filtramos solo los de esa categoría
            var productosFiltrados;
            if (categoria) {
                productosFiltrados = productos.filter(function(p) {
                    return p.categoria === categoria;
                });
            } else {
                // En el home mostramos 2 o 3 productos de cada categoría
                productosFiltrados = obtenerProductosParaHome(productos);
            }

            mostrarCards(productosFiltrados);
        })
        .catch(function(error) {
            console.log("Error al cargar productos:", error);
        });
}

// Para el home agarramos los primeros 3 productos de cada categoría
function obtenerProductosParaHome(todosLosProductos) {
    var categorias = ["lanas", "merceria", "tejidos"];
    var resultado = [];

    for (var i = 0; i < categorias.length; i++) {
        var deEstaCategoria = todosLosProductos.filter(function(p) {
            return p.categoria === categorias[i];
        });
        // Tomamos solo los primeros 3
        var losPrimerosTres = deEstaCategoria.slice(0, 3);
        resultado = resultado.concat(losPrimerosTres);
    }

    return resultado;
}

// Crea las cards HTML y las mete en el contenedor
function mostrarCards(productos) {
    var contenedor = document.getElementById("contenedorProductos");
    contenedor.innerHTML = "";

    for (var i = 0; i < productos.length; i++) {
        var producto = productos[i];
        var tarjeta = crearTarjeta(producto);
        contenedor.appendChild(tarjeta);
    }
}

// Crea una sola tarjeta HTML para un producto
function crearTarjeta(producto) {
    var div = document.createElement("div");
    div.className = "tarjeta";

    div.innerHTML =
        '<img src="' + producto.imagen + '" alt="' + producto.nombre + '">' +
        '<h3>' + producto.nombre + '</h3>' +
        '<p>' + producto.descripcion + '</p>' +
        '<p class="precio">$' + producto.precio + '</p>' +
        '<div class="cantidad">' +
            '<button onclick="disminuir(this)">-</button>' +
            '<span>1</span>' +
            '<button onclick="aumentar(this)">+</button>' +
        '</div>' +
        '<button class="btn-agregar" onclick="agregarAlCarrito(' + producto.id + ', \'' + producto.nombre + '\', ' + producto.precio + ', this)">Agregar al carrito</button>';

    return div;
}

// Aumenta la cantidad mostrada en la tarjeta
function aumentar(boton) {
    var span = boton.previousElementSibling;
    span.textContent = parseInt(span.textContent) + 1;
}

// Disminuye la cantidad (mínimo 1)
function disminuir(boton) {
    var span = boton.nextElementSibling;
    var cantidad = parseInt(span.textContent);
    if (cantidad > 1) {
        span.textContent = cantidad - 1;
    }
}

// Agrega un producto al carrito guardado en localStorage
function agregarAlCarrito(id, nombre, precio, boton) {
    // Leemos el carrito actual del localStorage (o un array vacío si no hay nada)
    var carritoGuardado = localStorage.getItem("carrito");
    var carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

    // Buscamos la cantidad seleccionada en la tarjeta
    var tarjeta = boton.closest(".tarjeta") || boton.parentElement;
    var spanCantidad = tarjeta.querySelector(".cantidad span");
    var cantidadSeleccionada = parseInt(spanCantidad.textContent);

    // Buscamos si el producto ya estaba en el carrito
    var productoExistente = null;
    for (var i = 0; i < carrito.length; i++) {
        if (carrito[i].id === id) {
            productoExistente = carrito[i];
            break;
        }
    }

    if (productoExistente) {
        // Si ya estaba, sumamos la cantidad nueva
        productoExistente.cantidad += cantidadSeleccionada;
    } else {
        // Si no estaba, lo agregamos al carrito
        carrito.push({
            id: id,
            nombre: nombre,
            precio: precio,
            cantidad: cantidadSeleccionada
        });
    }

    // Guardamos el carrito actualizado en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert(cantidadSeleccionada + "x " + nombre + " agregado al carrito!");
}
