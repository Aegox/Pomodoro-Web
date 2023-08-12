document.addEventListener("DOMContentLoaded", () => {
    const pause = document.querySelector("#set-pause");
    const play = document.querySelector("#set-play");
    const reset  = document.querySelector("#set-reset");
    const resting = document.querySelector('.rest');
    let minutes = 30;
    let seconds = 60;
    let interval;
    let rest_bool = false;


    if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {});
    }

    const notif = (message) => {
        if (Notification.permission === "granted") {
            var body = message;
            var icon = "https://www.quecodigo.com/img/qc_logo.jpg";
            var title = "The Pomodoro Clock";
            var options = {
                body: body,      //El texto o resumen de lo que deseamos notificar.
                icon: icon,      //El URL de una imágen para usarla como icono.
                lang: "ES",      //El idioma utilizado en la notificación.
                tag: 'notify',   //Un ID para el elemento para hacer get/set de ser necesario.
                dir: 'auto',     // izquierda o derecha (auto).
                renotify: "true" //Se puede volver a usar la notificación, default: false.
            }
            var notification = new Notification(title,options);
            setTimeout(notification.close.bind(notification), 10000);
        }
    }
    
    const rest = () => {
        interval = undefined;
        if (!rest_bool) {
            notif("Resting of 10 minutes!");
            resting.classList.toggle("_show");        
            minutes = 9;
            seconds = 60;
            rest_bool = true
            console.log(true)
            interval = setInterval(clock, 1000);
            return
        }
        notif("Working Now of 30 minutes!");
        resting.classList.toggle("_show");        
        minutes = 30;
        seconds = 60;
        rest_bool = false;
        interval = setInterval(clock, 1000)
        console.log(false);
        return
    } 

    const clock = () => {
        seconds = seconds  - 1;
        if (minutes < 10) { 
            document.getElementById("minutes").innerHTML = "0" + minutes;
        } else { document.getElementById("minutes").innerHTML = minutes };
        if (seconds < 10) { 
            document.getElementById("seconds").innerHTML = "0" + seconds
        } else { document.getElementById("seconds").innerHTML = seconds };
         if (minutes == 0 && seconds == 0) {
            clearInterval(interval)
            interval = undefined;
            rest();
        }
        if (seconds == 0 || minutes == 30) {
            minutes = minutes - 1;
            seconds = 60;
            document.getElementById("minutes").innerHTML = minutes;
        };
    }

    

    play.addEventListener("click", () => {
        if (interval) {return false}
        interval = setInterval(clock, 1000)
    });
    pause.addEventListener("click", () => {
        clearInterval(interval);
        interval = undefined;

    })
    reset.addEventListener("click", () => {
        clearInterval(interval);
        interval = undefined;
        minutes = 30;
        seconds = 60;
        document.getElementById("seconds").innerHTML = "00";
        document.getElementById("minutes").innerHTML = minutes;

    })

    
})

