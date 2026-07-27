// =========================
// LOVE STORY
// =========================

// ---------- Loader ----------

window.addEventListener("load", () => {

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

    if(!heroContent) return;

    const x = (event.clientX / window.innerWidth - 0.5) * 8;

    const y = (event.clientY / window.innerHeight - 0.5) * 8;

    heroContent.style.transform = `translate(${x}px, ${y}px)`;

});

window.addEventListener("mouseleave", () => {

    if(heroContent){

        heroContent.style.transform = "translate(0, 0)";

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