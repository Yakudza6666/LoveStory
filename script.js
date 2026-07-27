// =========================
// LOVE STORY
// =========================

// ---------- Loader ----------

window.addEventListener("load", () => {

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    setTimeout(() => {

        document.getElementById("loader").style.display = "none";

    }, 2800);

});

// ---------- Scroll Animation ----------

const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.15
});

sections.forEach(section=>observer.observe(section));

const heroSection = document.querySelector('.hero');
if(heroSection){
    heroSection.classList.add('show');
}

// ---------- Love Timer ----------

const startDate = new Date("2026-06-06T00:00:00");

function updateLoveTimer(){

    const now = new Date();

    let diff = now - startDate;

    if(diff < 0){

        diff = 0;

    }

    const days = Math.floor(diff / 86400000);

    const hours = Math.floor(diff % 86400000 / 3600000);

    const minutes = Math.floor(diff % 3600000 / 60000);

    const seconds = Math.floor(diff % 60000 / 1000);

    document.getElementById("loveTimer").innerHTML = `

        <div class="time-box">
            <h2>${days}</h2>
            <span>Дней</span>
        </div>

        <div class="time-box">
            <h2>${hours}</h2>
            <span>Часов</span>
        </div>

        <div class="time-box">
            <h2>${minutes}</h2>
            <span>Минут</span>
        </div>

        <div class="time-box">
            <h2>${seconds}</h2>
            <span>Секунд</span>
        </div>

    `;

}

updateLoveTimer();

setInterval(updateLoveTimer,1000);


// ---------- Floating Hearts ----------

const particles = document.getElementById("particles");

function createHeart(){

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = "❤";

    heart.style.left = Math.random()*100+"vw";

    heart.style.fontSize = (14 + Math.random()*22)+"px";

    heart.style.animationDuration = (6 + Math.random()*6)+"s";

    particles.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },12000);

}

setInterval(createHeart,700);


// ---------- Start Button ----------

const startButton = document.getElementById("start");

if(startButton){

    startButton.addEventListener("click",()=>{

        window.scrollTo({

            top:window.innerHeight,

            behavior:"smooth"

        });

    });

}

const heroContent = document.querySelector(".hero-content");

window.addEventListener("mousemove", (event) => {

    if(!heroContent || window.innerWidth <= 520) return;

    const x = (event.clientX / window.innerWidth - 0.5) * 12;

    const y = (event.clientY / window.innerHeight - 0.5) * 12;

    heroContent.style.transform = `translate(${x}px, ${y}px)`;

});

window.addEventListener("mouseleave", () => {

    if(heroContent){

        heroContent.style.transform = "translate(0, 0)";

    }

});

window.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ' ') {
        const active = document.activeElement;
        if(active === document.getElementById('start')) {
            e.preventDefault();
            startButton.click();
        }
    }
});

// ---------- Floating gallery cards ----------

const galleryCards = document.querySelectorAll(".photo-card");

galleryCards.forEach((card) => {

    const baseRotate = card.style.getPropertyValue("--rotate") || "0deg";
    const baseScale = card.style.getPropertyValue("--scale") || "1";

    card.dataset.baseRotate = baseRotate;
    card.dataset.baseScale = baseScale;

    card.addEventListener("pointermove", (event) => {

        if(window.innerWidth <= 520) return;

        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;

        card.style.setProperty("--tx", `${x}px`);
        card.style.setProperty("--ty", `${y}px`);
        card.style.setProperty("--rotate", `${x * -0.6}deg`);
        card.style.setProperty("--scale", "1.03");

    });

    card.addEventListener("pointerleave", () => {

        card.style.setProperty("--tx", "0px");
        card.style.setProperty("--ty", "0px");
        card.style.setProperty("--rotate", card.dataset.baseRotate);
        card.style.setProperty("--scale", card.dataset.baseScale);

    });

    card.addEventListener("click", () => {

        if(window.innerWidth <= 520) return;

        const isScattered = card.classList.contains("scattered");

        if(isScattered){

            card.classList.remove("scattered");
            card.style.setProperty("--scatter-x", "0px");
            card.style.setProperty("--scatter-y", "0px");
            card.style.setProperty("--scatter-rotate", "0deg");

        } else {

            const scatterX = (Math.random() > 0.5 ? 1 : -1) * (18 + Math.random() * 30);
            const scatterY = (Math.random() > 0.5 ? 1 : -1) * (10 + Math.random() * 24);
            const scatterRotate = (Math.random() > 0.5 ? 1 : -1) * (8 + Math.random() * 10);

            card.classList.add("scattered");
            card.style.setProperty("--scatter-x", `${scatterX}px`);
            card.style.setProperty("--scatter-y", `${scatterY}px`);
            card.style.setProperty("--scatter-rotate", `${scatterRotate}deg`);

        }

    });

});

// ---------- Music ----------

const music = document.getElementById("music");

if(music){

    music.volume = 0.35;

    startButton.addEventListener("click",()=>{

        music.play().catch(()=>{});

    });

}
// =========================
// PHOTO VIEWER
// =========================

const photos = document.querySelectorAll(".gallery img");

const viewer = document.getElementById("viewer");

const viewerImg = document.getElementById("viewerImg");

// ---------- Hero scattered photos ----------
function initHeroPhotos(){
    const container = document.getElementById('heroPhotos');
    if(!container) return;
    const items = Array.from(container.querySelectorAll('.hero-photo-item'));
    const rect = document.querySelector('.hero').getBoundingClientRect();

    items.forEach((img, i) => {
        // random position inside hero rect with some padding
        const padX = Math.max(40, rect.width * 0.08);
        const padY = Math.max(40, rect.height * 0.08);
        const x = Math.random() * (rect.width - padX * 2) + padX;
        const y = Math.random() * (rect.height - padY * 2) + padY;
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;

        // small random rotation
        const r = (Math.random() * 24 - 12).toFixed(2) + 'deg';
        img.style.setProperty('--r', r);

        // random size variants
        if(i === items.length - 1){
            img.classList.add('large');
        } else if(Math.random() > 0.7){
            img.classList.add('small');
        }

        // gentle float animation with CSS keyframes via inline style
        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if(!prefersReduced && window.innerWidth > 520){
            const dur = 6 + Math.random() * 6; // shorter, subtler
            img.style.animation = `heroFloat ${dur}s ease-in-out ${Math.random()*2}s infinite`;
        } else {
            img.style.animation = 'none';
        }

        // allow dragging on pointer devices (simple)
        img.addEventListener('pointerdown', (e)=>{
            if(window.innerWidth <= 520) return;
            img.setPointerCapture(e.pointerId);
            img.dataset.dragging = '1';
            img.dataset.offsetX = e.clientX - img.getBoundingClientRect().left;
            img.dataset.offsetY = e.clientY - img.getBoundingClientRect().top;
        });
        img.addEventListener('pointermove', (e)=>{
            if(img.dataset.dragging !== '1') return;
            const ox = parseFloat(img.dataset.offsetX);
            const oy = parseFloat(img.dataset.offsetY);
            const nx = e.clientX - rect.left - ox;
            const ny = e.clientY - rect.top - oy;
            img.style.left = `${Math.max(8, Math.min(rect.width - 8, nx))}px`;
            img.style.top = `${Math.max(8, Math.min(rect.height - 8, ny))}px`;
        });
        img.addEventListener('pointerup', (e)=>{
            img.releasePointerCapture(e.pointerId);
            img.dataset.dragging = '0';
        });

    });

    // recompute positions on resize
    window.addEventListener('resize', ()=>{
        // slight reposition to keep inside hero
        const rect2 = document.querySelector('.hero').getBoundingClientRect();
        items.forEach(img=>{
            const left = parseFloat(img.style.left || 0);
            const top = parseFloat(img.style.top || 0);
            img.style.left = `${Math.min(rect2.width-20, left)}px`;
            img.style.top = `${Math.min(rect2.height-20, top)}px`;
        });
    });
}

// float animation keyframes (insert via stylesheet)
const style = document.createElement('style');
style.innerHTML = `@keyframes heroFloat{ 0%{ transform: translateY(0) rotate(var(--r,0deg)) } 50%{ transform: translateY(-6px) rotate(calc(var(--r,0deg) + 1.5deg)) } 100%{ transform: translateY(0) rotate(var(--r,0deg)) } }`;
document.head.appendChild(style);

// init on load
window.addEventListener('load', ()=>{
    initHeroPhotos();
});

const closeViewer = document.getElementById("close");

photos.forEach(photo=>{

    photo.onclick=()=>{

        viewer.style.display="flex";

        viewerImg.src=photo.src;

    };

});

closeViewer.onclick=()=>{

viewer.style.display="none";

};

viewer.onclick=(e)=>{

if(e.target===viewer){

viewer.style.display="none";

}

};