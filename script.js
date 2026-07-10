let playerName = "ゲスト";
let currentStage = 1;

const novelTexts = {
    1: `<p class="novel-p">あの日、僕は見てはいけないものを見た。夕暮れの学校の帰り道、細い路地の奥に、<span class="vibrate-text">ウ</span>ズくまる影があった。</p>
        <p class="novel-p">影は、こちらをじっと見つめている気がした。怖くなって走って逃げたが、足音がピッタリと<span class="vibrate-text">シ</span>がみつくように付いてくる。</p>
        <p class="novel-p font-weight: bold;">誰かが、僕の<span class="vibrate-text">ロ</span>グを、僕の背中を、ずっと覗いている。</p>
        <p class="novel-p">息を切らして部屋に飛び込み、鍵を閉めた。しかし、部屋の隅から細い声が聞こえる。気付けば、僕の<span class="vibrate-text">ウ</span>エに、何かがいる。</p>`,
    
    2: `<p class="novel-p">異変はそれだけでは終わらなかった。次の日から、僕のスマートフォンの画面が時々おかしくなるのだ。</p>
        <p class="novel-p corrupted-text" id="glitch-text">縺ゅ≠縺溘∪縺がいかれ繧区container縺ｿ縺､縺代◆縺励ｓ縺</p>
        <p class="novel-p">文字が真っ赤に染まり、バグのような記号が羅列される。けれど、その文字列をじっくり凝視して【ドラッグして選択】してみると、そこには明確な「意志」が隠されていることに気がついた。</p>`,
    
    3: `<p class="novel-p">視線が、部屋のいたるところから突き刺さる。上から、下から、壁の隙間から。</p>
        <p class="novel-p">空間そのものが、ガタガタと歪み始めているような感覚（画面ノイズ）に襲われる。どこかに、この呪いの発信源となる『黒い核』が潜んでいるはずだ。早くそれを見つけて、消さなければ、僕は……。</p>`,
    
    4: `<p class="novel-p" id="stage4-text">たすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけてたすけて</p>`,
    
    5: `<p class="novel-p">もう逃げられない。部屋の四隅から、実体を持った真っ黒な影が、じわじわと僕の体を飲み込もうと伸ばされてくる。</p>
        <p class="novel-p">この呪いを完全に終わらせるための対価が必要だ。この怪異に、生年生死の生贄となる者の「登録した名前」を正確に差し出せば、この苦しみから解放されるのだろうか？</p>`
};

// 起動時に確実に登録ボタンをプログラム側から生成する
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("btn-container");
    if (container) {
        // ボタンを動的に生成
        const button = document.createElement("button");
        button.id = "dynamic-reg-btn";
        button.className = "reg-btn";
        button.innerText = "登録して読み始める";
        button.style.cursor = "pointer";
        
        // クリックイベントを直接付与
        button.addEventListener("click", () => {
            startRegistration();
        });
        
        container.appendChild(button);
    }

    const nameInput = document.getElementById("username-input");
    if (nameInput) {
        nameInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") startRegistration();
        });
    }
});

function startRegistration() {
    const input = document.getElementById("username-input").value.trim();
    if (!input) {
        alert("ユーザー名を入力してください。");
        return;
    }
    playerName = input;
    
    const nameBadges = document.querySelectorAll(".player-name");
    nameBadges.forEach(badge => badge.innerText = playerName);

    switchPhase("phase-register", "phase-novel");
    loadStage();
}

function switchPhase(fromId, toId) {
    document.getElementById(fromId).classList.remove("active");
    document.getElementById(toId).classList.add("active");
    window.scrollTo(0,0);
}

function loadStage() {
    document.getElementById("novel-body-text").innerHTML = novelTexts[currentStage];
    document.getElementById("solve-input").value = "";
    
    if (currentStage === 3) {
        document.body.classList.add("glitch-bg");
        document.getElementById("curse-icon").style.display = "block";
    } else {
        document.body.classList.remove("glitch-bg");
        document.getElementById("curse-icon").style.display = "none";
    }

    if (currentStage === 4) {
        document.getElementById("hint-label").innerText = "すべての警告を消し去れ（ポップアップが3回出ます）";
    } else if (currentStage === 5) {
        document.getElementById("hint-label").innerText = "呪いを完了させるため、あなたの「名前」を入力してください";
        document.getElementById("shadow-overlay").style.display = "block";
    }
}

function checkAnswer() {
    const answer = document.getElementById("solve-input").value.trim();

    if (currentStage === 1) {
        if (answer === "ウシロ" || answer === "うしろ") {
            nextStageSuccess();
        } else { 
            alert("何も起きない。何かが違うようだ。"); 
        }
    } 
    else if (currentStage === 2) {
        if (answer === "ミツケタ" || answer === "みつけた") {
            nextStageSuccess();
        } else { 
            alert("文字化け部分をマウスで左クリックしながらなぞって（ドラッグ）隠された文字を暴け。"); 
        }
    } 
    else if (currentStage === 3) {
        alert("文字を入力しても効果がない！画面のどこかに潜む『呪いの核（黒い点）』を直接クリックして破壊しろ！");
    } 
    else if (currentStage === 4) {
        alert("警告：システムが著しく汚染されています。");
        alert("警告：深淵があなたを覗いています。");
        alert("警告：後ろを振り返らないでください。");
        
        document.getElementById("stage4-text").innerText = "よくできました。次が最後です。";
        document.getElementById("hint-label").innerText = "「すすむ」と入力してください。";
        
        if (answer === "すすむ") {
            nextStageSuccess();
        }
    } 
    else if (currentStage === 5) {
        if (answer === playerName) {
            executeFinalRitual();
        } else { 
            alert("その名前では契約が一致しません。最初に登録した正確な名前を捧げてください。"); 
        }
    }
}

function solveAnomal3() {
    alert("呪いの核を破壊しました。歪みが収まります。");
    nextStageSuccess();
}

function nextStageSuccess() {
    document.body.classList.add("flash-red");
    setTimeout(() => { 
        document.body.classList.remove("flash-red"); 
    }, 200);

    if (currentStage === 3) {
        currentStage = 4;
        switchPhase("phase-novel", "phase-mid-news");
    } else {
        currentStage++;
        loadStage();
    }
}

function backToNovelPart2() {
    switchPhase("phase-mid-news", "phase-novel");
    loadStage();
}

function executeFinalRitual() {
    document.getElementById("shadow-overlay").style.display = "none";
    switchPhase("phase-novel", "phase-ritual-end");
    
    setTimeout(() => {
        const endText = document.getElementById("end-message");
        endText.style.opacity = 1;
    }, 500);

    setTimeout(() => {
        switchPhase("phase-ritual-end", "phase-final-news");
    }, 4500);
}
