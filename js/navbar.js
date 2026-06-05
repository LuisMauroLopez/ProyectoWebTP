// Array con todas las páginas del sitio
var paginas = [
    { titulo: "Inicio",   direccion: "index.html" },
    { titulo: "Lanas",    direccion: "pages/lanas.html" },
    { titulo: "Mercería", direccion: "pages/merceria.html" },
    { titulo: "Tejidos",  direccion: "pages/tejidos.html" }
];

// Detectamos si estamos dentro de pages/ para ajustar las rutas
var estamosEnPages = window.location.pathname.includes("/pages/");

function obtenerRuta(ruta) {
    if (estamosEnPages) {
        return "../" + ruta;
    }
    return ruta;
}

function cargarNavbar() {
    var menu = document.getElementById("menuNavegacion");
    menu.innerHTML = "";

    // Creamos los links de cada página
    for (var i = 0; i < paginas.length; i++) {
        var elemento = document.createElement("li");
        var enlace = document.createElement("a");
        enlace.href = obtenerRuta(paginas[i].direccion);
        enlace.textContent = paginas[i].titulo;
        elemento.appendChild(enlace);
        menu.appendChild(elemento);
    }

    // Verificamos si el usuario está logueado
    var usuarioLogueado = sessionStorage.getItem("usuarioLogueado");

    if (usuarioLogueado === "true") {
        // Mostramos el carrito y cerrar sesión
        var elementoCarrito = document.createElement("li");
        var enlaceCarrito = document.createElement("a");
        enlaceCarrito.href = obtenerRuta("pages/carrito.html");
        enlaceCarrito.textContent = "🛒 Carrito";
        elementoCarrito.appendChild(enlaceCarrito);
        menu.appendChild(elementoCarrito);

        var elementoLogout = document.createElement("li");
        var botonLogout = document.createElement("a");
        botonLogout.href = "#";
        botonLogout.textContent = "Cerrar sesión";
        botonLogout.addEventListener("click", function() {
            sessionStorage.removeItem("usuarioLogueado");
            window.location.href = obtenerRuta("pages/login.html");
        });
        elementoLogout.appendChild(botonLogout);
        menu.appendChild(elementoLogout);
    } else {
        // Mostramos Entrar y Registrarse
        var elementoLogin = document.createElement("li");
        var enlaceLogin = document.createElement("a");
        enlaceLogin.href = obtenerRuta("pages/login.html");
        enlaceLogin.textContent = "Entrar";
        elementoLogin.appendChild(enlaceLogin);
        menu.appendChild(elementoLogin);

        var elementoRegistro = document.createElement("li");
        var enlaceRegistro = document.createElement("a");
        enlaceRegistro.href = obtenerRuta("pages/registro.html");
        enlaceRegistro.textContent = "Registrarse";
        elementoRegistro.appendChild(enlaceRegistro);
        menu.appendChild(elementoRegistro);
    }
}

cargarNavbar();
