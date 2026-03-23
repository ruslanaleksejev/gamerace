let player = null;

const levels = [
    { name: "Kiviaeg", char: "🦴", desc: "Kogu kive ja ehita esimene varjualune." },
    { name: "Antiikaeg", char: "🏛️", desc: "Laienda impeeriumi ja võitle mässajatega." },
    { name: "Keskaeg", char: "⚔️", desc: "Kaitse oma lossi draakonite eest." },
    { name: "Tänapäev", char: "🏙️", desc: "Halda suurlinna liiklust ja majandust." },
    { name: "Tulevik", char: "🚀", desc: "Lenda tähtede poole ja paranda kosmoselaev." }
];

async function login() {
    const name = document.getElementById('username').value;
    if (!name) return;

    const res = await fetch('/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name })
    });
    player = await res.json();
    
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    updateUI();
}

function updateUI() {
    const levelData = levels[player.level - 1];
    document.getElementById('player-title').innerText = `Mängija: ${player.name}`;
    document.getElementById('level-name').innerText = `Tase ${player.level}: ${levelData.name}`;
    document.getElementById('character').innerText = levelData.char; // ASENDA FIGMA SVG-GA
    document.getElementById('level-desc').innerText = levelData.desc;

    if (player.level >= 5) {
        document.getElementById('next-btn').innerText = "Mäng läbi!";
        document.getElementById('next-btn').disabled = true;
    }
}

async function nextLevel() {
    if (player.level < 5) {
        player.level++;
        await fetch('/api/save', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ name: player.name, level: player.level })
        });
        updateUI();
    }
}