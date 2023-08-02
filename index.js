document.addEventListener("DOMContentLoaded", () => {
    const pause = document.querySelector("#set-pause");
    const play = document.querySelector("#set-play");
    let minutes = 30;
    let seconds = 60;
    let interval;

if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
        // Acción si el usuario acepta.
    });
}

if (Notification.permission === "granted") {
    // Si está bien vamos a crear una notificación
    // Primero vamos a crear una variables las 
    // cuales forman nuestra norificación
    var body = "Hola";
    var icon = "https://www.quecodigo.com/img/qc_logo.jpg";
    var title = "Notificación";
    var options = {
        body: body,      //El texto o resumen de lo que deseamos notificar.
        icon: icon,      //El URL de una imágen para usarla como icono.
        lang: "ES",      //El idioma utilizado en la notificación.
        tag: 'notify',   //Un ID para el elemento para hacer get/set de ser necesario.
        dir: 'auto',     // izquierda o derecha (auto).
        renotify: "true" //Se puede volver a usar la notificación, default: false.
    }
    // Creamos la notificación con las opciones que pusimos arriba.
    var notification = new Notification(title,options);
    // Cerramos la notificación.
    setTimeout(notification.close.bind(notification), 5000);
}

    const clock = () => {
        seconds = seconds  - 1;
        document.getElementById("seconds").innerHTML = seconds;
        if (seconds < 10) { document.getElementById("seconds").innerHTML = "0" + seconds };
        if (seconds == 0 || minutes == 30) {
            minutes = minutes - 1;
            seconds = 60;
            document.getElementById("minutes").innerHTML = minutes;
        };
    }

    play.addEventListener("click", () => {interval = setInterval(clock, 1000)});
    pause.addEventListener("click", () => {clearInterval(interval)})
})

