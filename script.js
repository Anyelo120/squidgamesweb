document.addEventListener("DOMContentLoaded", function () {
    if ('caches' in window) {
        caches.keys().then(function(cacheNames) {
            cacheNames.forEach(function(cacheName) {
                caches.delete(cacheName);
            });
        });
    }

    const countdownElement = document.getElementById("countdown");
    const targetDate = new Date("December 1, 2024 20:00:00 GMT-3").getTime();

    function updateCountdown() {
        const currentDate = new Date().getTime();

        const distance = targetDate - currentDate;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
        document.getElementById("seconds").innerText = seconds;

        if (distance < 0) {
            clearInterval(interval);
            countdownElement.innerHTML = `
                <p>El misterio ha llegado...</p>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/XNCnmQksrmk" 
                title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        }
    }

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();

    const buttons = document.querySelectorAll('.hidden-button');
    const secretText = document.getElementById('secret-text');
    let activatedButtons = 0;

    buttons.forEach((button, index) => {
        button.addEventListener('click', function() {
            if (!button.classList.contains('activated')) {
                button.classList.add('activated');
                activatedButtons++;
                if (activatedButtons === buttons.length) {
                    secretText.style.display = 'block';
                }
            }
        });
    });
});

document.addEventListener("mousemove", function(event) {
    const shapes = ["circle", "triangle", "square"];
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    const shapeElement = document.createElement("div");
    shapeElement.className = `shape ${randomShape}`;
    
    const offsetX = (Math.random() - 0.5) * 50;
    const offsetY = (Math.random() - 0.5) * 50;
    shapeElement.style.left = `${event.clientX + offsetX}px`;
    shapeElement.style.top = `${event.clientY + offsetY}px`;

    document.body.appendChild(shapeElement);

    setTimeout(() => {
        shapeElement.remove();
    }, 1200);
});

document.addEventListener("DOMContentLoaded", function() {
    const activateFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Error al intentar entrar en pantalla completa: ${err.message}`);
            });
        }
        document.removeEventListener("click", activateFullScreen);
    };
    document.addEventListener("click", activateFullScreen);
});
