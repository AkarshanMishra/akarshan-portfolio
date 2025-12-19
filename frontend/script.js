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
function generateInsight(){
  const input = document.getElementById("dataInput").value.trim();
  const output = document.getElementById("aiOutput");

  if(!input){
    output.style.display="block";
    output.innerHTML="⚠️ Please provide some data for analysis.";
    return;
  }

  // AI-style insights (logic-based)
  let insights = `
  <b>AI Insights Generated:</b><br><br>
  📊 Data shows revenue concentration among top customers.<br>
  📈 Trend analysis suggests consistent growth in selected periods.<br>
  🧠 Potential optimization identified in high-cost segments.<br>
  🔍 Recommend deeper drill-down by region and product category.
  `;

  output.style.display="block";
  output.innerHTML=insights;
}
function askAI(){
  const input = document.getElementById("chatInput");
  const body = document.getElementById("chatBody");
  const question = input.value.toLowerCase().trim();
  if(!question) return;

  body.innerHTML += `<div class="ai-msg user">${input.value}</div>`;
  input.value="";

  let answer = "I'm not sure. Could you please ask about experience, skills, Excel, SQL, or interview questions?";

  // ABOUT YOU
  if(question.includes("who are you") || question.includes("about you")){
    answer = "Akarshan Mishra is a Data Analyst with 4+ years of experience in fintech, specializing in Advanced Excel and MySQL for business and financial analytics.";
  }
  else if(question.includes("experience")){
    answer = "He has been working as a Data Analyst at Novel Patterns since 2021, focusing on financial analysis, reporting, predictive insights, and data automation.";
  }
  else if(question.includes("skills")){
    answer = "Key skills include Advanced Excel (Pivot Tables, Power Query, XLOOKUP), MySQL (joins, aggregation), Python, and business analytics.";
  }
  else if(question.includes("project")){
    answer = "He has built Excel financial dashboards, automated reporting systems, and MySQL-based analysis for revenue, risk, and performance tracking.";
  }

  // INTERVIEW QUESTIONS
  else if(question.includes("excel")){
    answer = "Advanced Excel is used for data cleaning, Pivot Tables, Power Query, dashboards, and automation using formulas like XLOOKUP, INDEX-MATCH, and SUMIFS.";
  }
  else if(question.includes("sql") || question.includes("mysql")){
    answer = "MySQL is used to analyze structured data using SELECT, JOINs, GROUP BY, HAVING, and subqueries to generate business insights.";
  }
  else if(question.includes("strength")){
    answer = "His strengths are analytical thinking, attention to detail, business understanding, and the ability to convert data into actionable insights.";
  }
  else if(question.includes("weakness")){
    answer = "He continuously improves by learning new tools and optimizing processes to overcome limitations and deliver better results.";
  }
  else if(question.includes("hire")){
    answer = "You should hire him because he combines strong analytical skills with business understanding and delivers data-driven solutions efficiently.";
  }

  setTimeout(()=>{
    body.innerHTML += `<div class="ai-msg bot">${answer}</div>`;
    body.scrollTop = body.scrollHeight;
  },600);
}
function toggleChat(){
  const chat=document.getElementById("aiChat");
  chat.style.display = chat.style.display === "block" ? "none" : "block";
}
async function askAI(){
  const input=document.getElementById("chatInput");
  const body=document.getElementById("chatBody");
  const text=input.value.trim();
  if(!text) return;

  body.innerHTML+=`<div class="ai-msg user">${text}</div>`;
  input.value="";

  const res = await fetch("http://localhost:5000/chat",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({message:text})
  });

  const data = await res.json();

  body.innerHTML+=`<div class="ai-msg bot">${data.reply}</div>`;
  body.scrollTop = body.scrollHeight;
}
function speak(text){
  const speech = new SpeechSynthesisUtterance(text);
  speech.rate = 1;
  speech.pitch = 1;
  speech.lang = "en-US";
  window.speechSynthesis.speak(speech);
}
const reply = data.reply;
body.innerHTML+=`<div class="ai-msg bot">${reply}</div>`;
speak(reply);
const recognition = new webkitSpeechRecognition();
recognition.lang="en-US";

function startVoice(){
  recognition.start();
  recognition.onresult = e=>{
    document.getElementById("chatInput").value =
      e.results[0][0].transcript;
    askAI();
  };
}

