const digitalTime = document.getElementById("digitalTime");
const thaiTime = document.getElementById("thaiTime");
const phoneticTime = document.getElementById("phoneticTime");
const timeButton = document.getElementById("timeButton");
const speakBtn = document.getElementById("speakBtn");

function pad(n) {
  return String(n).padStart(2, "0");
}

function thaiHourText(hour) {
  const map = {
    0: ["เที่ยงคืน", "thiang khuen"],
    1: ["ตีหนึ่ง", "ti nueng"],
    2: ["ตีสอง", "ti song"],
    3: ["ตีสาม", "ti sam"],
    4: ["ตีสี่", "ti si"],
    5: ["ตีห้า", "ti ha"],
    6: ["หกโมงเช้า", "hok mong chao"],
    7: ["เจ็ดโมงเช้า", "jet mong chao"],
    8: ["แปดโมงเช้า", "paet mong chao"],
    9: ["เก้าโมงเช้า", "kao mong chao"],
    10: ["สิบโมงเช้า", "sip mong chao"],
    11: ["สิบเอ็ดโมงเช้า", "sip-et mong chao"],
    12: ["เที่ยง", "thiang"],
    13: ["บ่ายโมง", "bai mong"],
    14: ["บ่ายสองโมง", "bai song mong"],
    15: ["บ่ายสามโมง", "bai sam mong"],
    16: ["สี่โมงเย็น", "si mong yen"],
    17: ["ห้าโมงเย็น", "ha mong yen"],
    18: ["หกโมงเย็น", "hok mong yen"],
    19: ["หนึ่งทุ่ม", "nueng thum"],
    20: ["สองทุ่ม", "song thum"],
    21: ["สามทุ่ม", "sam thum"],
    22: ["สี่ทุ่ม", "si thum"],
    23: ["ห้าทุ่ม", "ha thum"]
  };
  return map[hour] || ["", ""];
}

function updateClock() {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();

  digitalTime.textContent = `${pad(h)}:${pad(m)}`;

  const [thaiHour, phoneticHour] = thaiHourText(h);
  const thaiMinute = m === 0 ? "" : ` ${m} นาที`;
  const phoneticMinute = m === 0 ? "" : ` ${m} naathi`;

  thaiTime.textContent = `${thaiHour}${thaiMinute}`.trim();
  phoneticTime.textContent = `${phoneticHour}${phoneticMinute}`.trim();
}

function speakThai() {
  const text = thaiTime.textContent || "";
  if (!text || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "th-TH";

  const voices = window.speechSynthesis.getVoices();
  const thaiVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith("th"));
  if (thaiVoice) utterance.voice = thaiVoice;

  window.speechSynthesis.speak(utterance);
}

timeButton.addEventListener("click", speakThai);
speakBtn.addEventListener("click", speakThai);

updateClock();
setInterval(updateClock, 1000);

if ("speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = updateClock;
}
