document.addEventListener("DOMContentLoaded", () => {
    const pause = document.querySelector("#set-pause");
    const play = document.querySelector("#set-play");
    const reset  = document.querySelector("#set-reset");
    const config  = document.querySelector("#set-config");
    const resting = document.querySelector('.rest');
    const configuration = document.querySelector(".configuration");
    const config_work = document.querySelector("#work-m");
    const config_rest = document.querySelector("#rest-m");
    const config_save = document.querySelector("#save-config");
    const rest_message = document.querySelector(".rest");
    let work_minutes = 30;
    let work_seconds = 0;
    let rest_minutes = 10;
    let rest_seconds = 0;
    let minutes = work_minutes;
    let seconds = 60;
    let interval;
    let rest_bool = false;


    if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {});
    }

    const notif = (message) => {
        if (Notification.permission === "granted") {
            let body = message;
            let icon = ";
            let title = "The Pomodoro Clock";
            let options = {
                body: body,      
                icon: icon,      
                lang: "ES",      
                tag: 'notify',   
                dir: 'auto',     
                renotify: "true" 
            }
            let audio = new Audio('https://directory.audio/media/fc_local_media/audio_preview/pending-notification.mp3');
            audio.play()
            let notification = new Notification(title,options);
            setTimeout(notification.close.bind(notification), 10000);
        }
    }
    
    const rest = () => {
        interval = undefined;
        if (!rest_bool) {
            rest_message.innerHTML = `Rest of ${rest_minutes} minutes`
            notif(`Resting of ${rest_minutes} minutes!`);
            resting.classList.toggle("_show");        
            minutes = rest_minutes;
            rest_bool = true
            interval = setInterval(clock, 1000);
            return
        }
        notif(`Working Now of ${work_minutes} minutes!`);
        resting.classList.toggle("_show");        
        minutes = work_minutes;
        rest_bool = false;
        interval = setInterval(clock, 1000)
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
        if (seconds == 0 || minutes == work_minutes) { 
            minutes = minutes - 1;
            seconds = 60;
            document.getElementById("minutes").innerHTML = minutes;
        };
    }

    play.addEventListener("click", () => {
        if (interval) {return false}
        interval = setInterval(clock, 1000);
        const audio = new Audio('https://directory.audio/media/fc_local_media/audio_preview/notification-perc-bip.mp3');
        audio.play()

    });
    pause.addEventListener("click", () => {
        clearInterval(interval);
        interval = undefined;

    })
    reset.addEventListener("click", () => {
        clearInterval(interval);
        interval = undefined;
        minutes = work_minutes;
        seconds = 60;
        document.getElementById("seconds").innerHTML = "00";
        document.getElementById("minutes").innerHTML = minutes;

    })
     config.addEventListener("click", () => {
        configuration.classList.toggle("_show")    
    });

    config_save.addEventListener("click", () => {
        work_minutes = config_work.value;
        rest_minutes = config_rest.value;
        minutes = work_minutes;
        seconds = 60;
        clearInterval(interval);
        interval = undefined;
        document.getElementById("seconds").innerHTML = "00";
        document.getElementById("minutes").innerHTML = minutes;
        configuration.classList.toggle("_show")    
    });
    
})

