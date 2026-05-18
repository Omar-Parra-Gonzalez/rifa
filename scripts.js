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
    } else if (media.tagName === 'VIDEO') {
        modalVideo.src = media.src;
        modalVideo.style.display = 'block';
        modalImg.style.display = 'none';
        modalVideo.play();
    }
}

mediaElements.forEach((media, index) => {
    media.addEventListener("click", () => {
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

close.onclick = () => {
    modal.style.display = "none";
    modalVideo.pause();
};

modal.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
        modalVideo.pause();
    }
};

const bgAudio = document.getElementById("bg-audio");

// Reproducir el audio de fondo en la primera interacción del usuario
const enableAudio = () => {
    if (bgAudio) {
        bgAudio.play().catch(e => console.log("Autoplay bloqueado:", e));
    }
    document.removeEventListener("click", enableAudio);
    document.removeEventListener("touchstart", enableAudio);
};

document.addEventListener("click", enableAudio);
document.addEventListener("touchstart", enableAudio);