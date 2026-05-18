const carousel = document.getElementById("carousel");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

nextBtn.onclick = () => carousel.scrollLeft += 300;
prevBtn.onclick = () => carousel.scrollLeft -= 300;

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalVideo = document.getElementById("modal-video");
const close = document.getElementById("close");
const modalNext = document.getElementById("modal-next");
const modalPrev = document.getElementById("modal-prev");

const mediaElements = Array.from(document.querySelectorAll(".carousel img, .carousel video"));
let currentIndex = 0;

const bgAudio = document.getElementById("bg-audio");

// Función segura para reproducir el audio de fondo
function reproducirAudioFondo() {
    if (bgAudio && bgAudio.paused) {
        bgAudio.play().catch(e => console.log("Audio de fondo esperando interacción:", e));
    }
}

function showMedia(index) {
    if (index < 0) index = mediaElements.length - 1;
    if (index >= mediaElements.length) index = 0;
    currentIndex = index;

    const media = mediaElements[currentIndex];

    if (media.tagName === 'IMG') {
        modalImg.src = media.src;
        modalImg.style.display = 'block';
        modalVideo.style.display = 'none';
        modalVideo.pause();

        // Si volvemos a una imagen, nos aseguramos que la música de fondo siga sonando
        reproducirAudioFondo();
    } else if (media.tagName === 'VIDEO') {
        modalVideo.src = media.src;
        modalVideo.style.display = 'block';
        modalImg.style.display = 'none';

        // Opcional: Pausar o bajar el volumen de la música de fondo mientras hay un video
        if (bgAudio) bgAudio.pause();

        modalVideo.play().catch(e => console.log("El video requería interacción:", e));
    }
}

mediaElements.forEach((media, index) => {
    media.addEventListener("click", () => {
        // Forzamos la activación del audio de fondo en el primer clic a una imagen
        reproducirAudioFondo();
        showMedia(index);
        modal.style.display = "flex";
    });
});

modalNext.onclick = (e) => {
    e.stopPropagation();
    showMedia(currentIndex + 1);
};

modalPrev.onclick = (e) => {
    e.stopPropagation();
    showMedia(currentIndex - 1);
};

// Al cerrar el modal, nos aseguramos que la música de fondo continúe si se había pausado por un video
close.onclick = () => {
    modal.style.display = "none";
    modalVideo.pause();
    reproducirAudioFondo();
};

modal.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
        modalVideo.pause();
        reproducirAudioFondo();
    }
};

// Eventos globales para asegurar el disparo del audio en cualquier otra parte de la pantalla
const enableAudio = () => {
    reproducirAudioFondo();
    document.removeEventListener("click", enableAudio);
    document.removeEventListener("touchstart", enableAudio);
};

document.addEventListener("click", enableAudio);
document.addEventListener("touchstart", enableAudio);