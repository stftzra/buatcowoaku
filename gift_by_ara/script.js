// PIN check
function checkPin(){
    const input = document.getElementById("pin").value;
    if(input==="080425"){
        document.getElementById("splash").style.display="none";
        startQuiz();
    }else{
        alert("PIN salah!");
    }
}

// Quiz data
const quizData = [
    { question: "Aku paling senang kalau kamu ...?", options: ["A. Senyum padaku", "B. Marah-marah", "C. Lari menjauh", "D. Diam saja"], answer: "A. Senyum padaku" },
    { question: "Kamu bikin aku ...", options: ["A. Sedih", "B. Bahagia", "C. Bete", "D. Bingung"], answer: "B. Bahagia" },
    { question: "Kalau kita jalan bareng, aku ingin ...", options: ["A. Main HP terus", "B. Ngobrol sama kamu", "C. Tidur aja", "D. Sendirian"], answer: "B. Ngobrol sama kamu" }
];

let currentQuiz = 0;

// Start quiz
function startQuiz(){
    document.getElementById("quiz").style.display="block";
    showQuestion();
}

function showQuestion(){
    const q = quizData[currentQuiz];
    document.getElementById("question").innerText = q.question;
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    q.options.forEach(opt=>{
        const btn = document.createElement("button");
        btn.className="option";
        btn.innerText=opt;
        btn.onclick = ()=> checkAnswer(opt);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(selected){
    const q = quizData[currentQuiz];
    if(selected === q.answer){
        currentQuiz++;
        if(currentQuiz < quizData.length){
            showQuestion();
        }else{
            document.getElementById("quiz").style.display="none";
            startImageQuiz();
        }
    }else{
        alert("Jawaban salah! Coba lagi.");
    }
}

// Tebak Gambar Flip 3D
const images = [
    { src: "images/ara.jpg", correct:true },
    { src: "images/ara (2).jpg", correct:true },
    { src: "images/zonk.jpg", correct:false },
    { src: "images/zonk2.jpg", correct:false }
];

function startImageQuiz(){
    document.getElementById("image-quiz").style.display="block";
    const container = document.getElementById("img-options");
    container.innerHTML = "";
    images.sort(()=>Math.random()-0.5);
    
    images.forEach(img=>{
        const card = document.createElement("div");
        card.style.width = "120px";
        card.style.height = "120px";
        card.style.margin = "10px";
        
        const inner = document.createElement("div");
        inner.style.width = "100%";
        inner.style.height = "100%";
        inner.style.position = "relative";
        inner.style.transition = "transform 0.6s";
        inner.style.transformStyle = "preserve-3d";
        
        const front = document.createElement("div");
        front.style.position = "absolute";
        front.style.width = "100%";
        front.style.height = "100%";
        front.style.backfaceVisibility = "hidden";
        front.style.backgroundColor = "black";
        front.style.borderRadius = "12px";
        
        const back = document.createElement("img");
        back.src = img.src;
        back.style.width = "100%";
        back.style.height = "100%";
        back.style.borderRadius = "12px";
        back.style.objectFit = "cover";
        back.style.backfaceVisibility = "hidden";
        back.style.transform = "rotateY(180deg)";
        
        inner.appendChild(front);
        inner.appendChild(back);
        card.appendChild(inner);
        container.appendChild(card);
        
        card.onclick = ()=>{
            inner.style.transform = "rotateY(180deg)";
            if(img.correct){
                back.style.boxShadow = "0 0 20px 5px #1e90ff";
                back.style.transform = "rotateY(180deg) scale(1.2)";
                createConfetti(50);
                setTimeout(()=>{
                    document.getElementById("image-quiz").style.display="none";
                    document.getElementById("main").style.display="block";
                    startTyping();
                    const audio = document.getElementById("bg-audio");
                    audio.play().catch(()=>{});
                },1000);
            }else{
                setTimeout(()=>{ inner.style.transform = "rotateY(0deg)"; },800);
            }
        };
    });
}

// Typing effect
const messages = [
"aku cuma mau ngomong thank u for being in my life.\ni lovee u so so sooo much",
"kalo misalnya ada alat ukur kebahagiaan mungkin udah ngga keukur sebahagia apa,\ntapi dengan adanya kata kata ini udah nyeritain semuanya. semenjak kamu dateng\naku jadi ngerasa punya support system terbaik yang dulu ga pernah aku temuin di seseorang manapun.",
"kamu selalu dukung apa aja yang aku lakuin, kamu selalu jadi alesan aku kenapa setiap hari aku bahagia.\nmakasi udah mau bertahan sampai saat ini buat aku. gabisa ngucapin apa apaa lagi karena kata kata\naja ngga cukup buat kasih tau dunia kalo aku beruntung bisa punya kamu.",
"tetep jadi my fav person yang aku kenal yaa, selalu jadi rumah buat aku. yang terakhir,\naku mau kamu stay sama aku terus. jangan tinggalin aku ya? hehe.",
"aku juga mau cerita semenjak kehadiran kamu udah bikin aku sebahagia ini.\nAKU BAHAGIA BANGET BISA KENAL KAMU!! tau gaa?!? 24/7 aku itu suka cerita tentang kamu ke orang orang\ndekatku karena AKU SAYANG BANGET SAMA KAMU."
];
let msgIndex=0,charIndex=0,speed=50;
function startTyping(){
    function typeText(){
        if(msgIndex<messages.length){
            const current=messages[msgIndex];
            if(charIndex<current.length){
                document.getElementById("typing").innerHTML+=current.charAt(charIndex);
                charIndex++;
                setTimeout(typeText,speed);
            }else{
                document.getElementById("typing").innerHTML+="\n\n";
                msgIndex++;
                charIndex=0;
                setTimeout(typeText,600);
            }
        }
    }
    typeText();
}

// Fullscreen Image
const splashImg=document.querySelector("#splash img");
const fullImg=document.getElementById("fullscreen-img");
splashImg.addEventListener("click",()=>{ fullImg.src=splashImg.src; fullImg.style.display="block"; });
fullImg.addEventListener("click",()=>{ fullImg.style.display="none"; });

// Floating Hearts
function createHeart(){
    const heart=document.createElement("div");
    heart.className="heart";
    heart.innerHTML="❤";
    heart.style.left=Math.random()*100+"vw";
    heart.style.top="-10px";
    heart.style.fontSize=(15+Math.random()*20)+"px";
    document.body.appendChild(heart);
    setTimeout(()=>heart.remove(),3000);
}
setInterval(createHeart,300);

// Floating Sparkles
function createSparkle() {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.innerText = "•";
    sparkle.style.left = Math.random() * 100 + "vw";
    sparkle.style.fontSize = (8 + Math.random() * 8) + "px";
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 4000);
}
setInterval(createSparkle, 500);

// Confetti
function createConfetti(amount){
    for(let i=0;i<amount;i++){
        const conf = document.createElement("div");
        conf.innerHTML="🎉";
        conf.style.position="fixed";
        conf.style.left=Math.random()*100+"vw";
        conf.style.top="-10px";
        conf.style.fontSize=(10+Math.random()*20)+"px";
        conf.style.zIndex="1000";
        document.body.appendChild(conf);
        setTimeout(()=>conf.remove(),3000);
    }
}
