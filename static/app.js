const state = {
  players: [],
  cases: [],
  selectedCase: "",
  roles: [],
  objections: 0,
  supports: 0,
  soundOn: true,
  gameStarted: false,
};

const menuScreen = document.getElementById("menuScreen");
const gameScreen = document.getElementById("gameScreen");
const playerCountInput = document.getElementById("playerCount");
const caseInput = document.getElementById("caseInput");
const selectedCaseText = document.getElementById("selectedCaseText");
const caseList = document.getElementById("caseList");
const rolesBoard = document.getElementById("rolesBoard");
const courtStatus = document.getElementById("courtStatus");
const decisionInput = document.getElementById("decisionInput");
const scoreBoard = document.getElementById("scoreBoard");
const eventLog = document.getElementById("eventLog");
const soundToggleBtn = document.getElementById("soundToggleBtn");

const ALL_ROLES = [
  "Hakim",
  "Savci",
  "Sanik",
  "Sanik Avukati",
  "Magdur",
  "Magdur Avukati",
  "Tanık",
  "Katip",
  "Mubasir",
  "Juri Uyesi",
];

function notify(text) {
  const li = document.createElement("li");
  li.textContent = text;
  eventLog.prepend(li);
  playTone();
}

function playTone() {
  if (!state.soundOn) return;
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "triangle";
  osc.frequency.value = 650;
  gain.gain.value = 0.05;
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.09);
}

function renderCases() {
  caseList.innerHTML = "";
  if (!state.cases.length) {
    const empty = document.createElement("li");
    empty.textContent = "Henuz suc eklenmedi.";
    caseList.appendChild(empty);
    return;
  }
  state.cases.forEach((crime, i) => {
    const li = document.createElement("li");
    li.textContent = `${i + 1}. ${crime}`;
    caseList.appendChild(li);
  });
}

function renderRoles() {
  rolesBoard.innerHTML = "";
  state.roles.forEach((item) => {
    const div = document.createElement("div");
    div.className = "role-item";
    div.innerHTML = `<strong>${item.player}</strong><br>${item.role}`;
    rolesBoard.appendChild(div);
  });
}

function updateScore() {
  scoreBoard.textContent = `Itiraz: ${state.objections} | Destek: ${state.supports}`;
}

function startGame() {
  const count = Number(playerCountInput.value);
  if (!Number.isInteger(count) || count < 3 || count > 12) {
    alert("Oyuncu sayisi 3-12 arasinda olmali.");
    return;
  }
  state.players = Array.from({ length: count }, (_, i) => `Oyuncu ${i + 1}`);
  state.gameStarted = true;
  menuScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  notify(`Oyun basladi. ${count} oyuncu hazir.`);
}

function addCase() {
  const value = caseInput.value.trim();
  if (!value) return;
  state.cases.push(value);
  caseInput.value = "";
  renderCases();
}

function pickRandomCase() {
  if (!state.cases.length) {
    alert("Once suc listesi girin.");
    return;
  }
  const index = Math.floor(Math.random() * state.cases.length);
  state.selectedCase = state.cases[index];
  selectedCaseText.textContent = `Secilen dava: ${state.selectedCase}`;
  notify(`Rastgele dava secildi: ${state.selectedCase}`);
}

function assignRoles() {
  if (!state.gameStarted) return;
  const shuffled = [...state.players].sort(() => Math.random() - 0.5);
  const selectedRoles = ALL_ROLES.slice(0, shuffled.length);
  state.roles = shuffled.map((player, i) => ({ player, role: selectedRoles[i] }));
  renderRoles();
  notify("Roller dagitildi.");
}

function addObjection() {
  state.objections += 1;
  courtStatus.textContent = "Itiraz kayda gecti. Hakim degerlendiriyor.";
  updateScore();
  notify("Itiraz edildi.");
}

function addSupport() {
  state.supports += 1;
  courtStatus.textContent = "Karara destek beyan edildi.";
  updateScore();
  notify("Karar desteklendi.");
}

function announceDecision() {
  const text = decisionInput.value.trim();
  if (!text) {
    alert("Karar metni bos olamaz.");
    return;
  }
  courtStatus.textContent = `Karar aciklandi: ${text}`;
  notify("Karar aciklandi.");
}

function newRound() {
  state.selectedCase = "";
  state.roles = [];
  state.objections = 0;
  state.supports = 0;
  decisionInput.value = "";
  selectedCaseText.textContent = "Yeni tur: suclar arasindan rastgele bir dava secin.";
  courtStatus.textContent = "Yeni tur hazir.";
  renderRoles();
  updateScore();
  notify("Yeni tur baslatildi.");
}

function endGame() {
  if (!confirm("Oyunu bitirmek istiyor musun?")) return;
  state.gameStarted = false;
  menuScreen.classList.remove("hidden");
  gameScreen.classList.add("hidden");
  notify("Oyun kapatildi. Yeni oyun icin menuden baslat.");
}

function toggleSound() {
  state.soundOn = !state.soundOn;
  soundToggleBtn.textContent = state.soundOn ? "Sesi Kapat" : "Sesi Ac";
}

document.getElementById("startGameBtn").addEventListener("click", startGame);
document.getElementById("addCaseBtn").addEventListener("click", addCase);
document.getElementById("pickCaseBtn").addEventListener("click", pickRandomCase);
document.getElementById("assignRolesBtn").addEventListener("click", assignRoles);
document.getElementById("objectionBtn").addEventListener("click", addObjection);
document.getElementById("supportBtn").addEventListener("click", addSupport);
document.getElementById("announceBtn").addEventListener("click", announceDecision);
document.getElementById("newRoundBtn").addEventListener("click", newRound);
document.getElementById("endGameBtn").addEventListener("click", endGame);
soundToggleBtn.addEventListener("click", toggleSound);

renderCases();
updateScore();
