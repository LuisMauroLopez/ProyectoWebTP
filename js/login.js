document.getElementById("formularioLogin").addEventListener("submit", function(evento) {
    evento.preventDefault();

    var email = document.getElementById("email").value;

    // Guardamos en sessionStorage que el usuario está logueado
    // También guardamos el email para poder mostrarlo si hace falta
    sessionStorage.setItem("usuarioLogueado", "true");
    sessionStorage.setItem("usuarioEmail", email);

    // Redirigimos al inicio (login.html está en pages/, por eso usamos ../)
    window.location.href = "../index.html";
});
