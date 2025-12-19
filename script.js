// DARK MODE
document.getElementById("themeToggle").addEventListener("change",()=>{
  document.body.classList.toggle("light");
});

// SCROLL ANIMATION
const reveals=document.querySelectorAll(".reveal");
window.addEventListener("scroll",()=>{
  reveals.forEach(r=>{
    if(r.getBoundingClientRect().top < window.innerHeight-100){
      r.classList.add("active");
    }
  })
});
document.querySelectorAll(".btn").forEach(btn=>{
  btn.addEventListener("click",function(e){
    const ripple=document.createElement("span");
    ripple.className="ripple";
    this.appendChild(ripple);

    const x=e.clientX-this.getBoundingClientRect().left;
    const y=e.clientY-this.getBoundingClientRect().top;

    ripple.style.left=`${x}px`;
    ripple.style.top=`${y}px`;

    setTimeout(()=>ripple.remove(),600);
  });
});
const toggle = document.getElementById("themeToggle");
const body = document.body;

// FORCE DEFAULT DARK
if (!localStorage.getItem("theme")) {
  localStorage.setItem("theme", "dark");
}

// APPLY SAVED THEME
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light");
  toggle.checked = true;
} else {
  body.classList.remove("light");
  toggle.checked = false;
}

// TOGGLE EVENT
toggle.addEventListener("change", () => {
  if (toggle.checked) {
    body.classList.add("light");
    localStorage.setItem("theme", "light");
  } else {
    body.classList.remove("light");
    localStorage.setItem("theme", "dark");
  }
});
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
let stars = [];

function resizeCanvas(){
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Create stars
for(let i=0;i<120;i++){
  stars.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    r:Math.random()*1.2,
    s:Math.random()*0.5
  });
}

function animateStars(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="white";
  stars.forEach(star=>{
    ctx.beginPath();
    ctx.arc(star.x,star.y,star.r,0,Math.PI*2);
    ctx.fill();
    star.y+=star.s;
    if(star.y>canvas.height) star.y=0;
  });
  if(!document.body.classList.contains("light")){
    requestAnimationFrame(animateStars);
  }
}
animateStars();
document.querySelectorAll(".accent-picker span").forEach(c=>{
  c.style.background=c.dataset.color;
  c.onclick=()=>{
    document.documentElement.style.setProperty(
      "--grad",`linear-gradient(90deg,${c.dataset.color},#22d3ee)`
    );
  }
});
const hour = new Date().getHours();
if(hour >= 19 || hour <= 6){
  document.body.classList.remove("light");
  localStorage.setItem("theme","dark");
}
// Throttle scroll animations
let ticking=false;
window.addEventListener("scroll",()=>{
  if(!ticking){
    window.requestAnimationFrame(()=>{
      document.querySelectorAll(".reveal").forEach(el=>{
        if(el.getBoundingClientRect().top < innerHeight-100){
          el.classList.add("active");
        }
      });
      ticking=false;
    });
    ticking=true;
  }
});
