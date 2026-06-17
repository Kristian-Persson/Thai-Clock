const digitalTime = document.getElementById("digitalTime");
const thaiTime = document.getElementById("thaiTime");
const phoneticTime = document.getElementById("phoneticTime");
const timeButton = document.getElementById("timeButton");
const speakBtn = document.getElementById("speakBtn");

function pad(n) {
  return String(n).padStart(2, "0");
}

function thaiNumberText(n) {
  const map = {
    0: "ศูนย์",
    1: "หนึ่ง",
    2: "สอง",
    3: "สาม",
    4: "สี่",
    5: "ห้า",
    6: "หก",
    7: "เจ็ด",
    8: "แปด",
    9: "เก้า",
    10: "สิบ",
    11: "สิบเอ็ด",
    12: "สิบสอง",
    13: "สิบสาม",
    14: "สิบสี่",
    15: "สิบห้า",
    16: "สิบหก",
    17: "สิบเจ็ด",
    18: "สิบแปด",
    19: "สิบเก้า",
    20: "ยี่สิบ",
    21: "ยี่สิบเอ็ด",
    22: "ยี่สิบสอง",
    23: "ยี่สิบสาม",
    24: "ยี่สิบสี่",
    25: "ยี่สิบห้า",
    26: "ยี่สิบหก",
    27: "ยี่สิบเจ็ด",
    28: "ยี่สิบแปด",
    29: "ยี่สิบเก้า",
    30: "สามสิบ",
    31: "สามสิบเอ็ด",
    32: "สามสิบสอง",
    33: "สามสิบสาม",
    34: "สามสิบสี่",
    35: "สามสิบห้า",
    36: "สามสิบหก",
    37: "สามสิบเจ็ด",
    38: "สามสิบแปด",
    39: "สามสิบเก้า",
    40: "สี่สิบ",
    41: "สี่สิบเอ็ด",
    42: "สี่สิบสอง",
    43: "สี่สิบสาม",
    44: "สี่สิบสี่",
    45: "สี่สิบห้า",
    46: "สี่สิบหก",
    47: "สี่สิบเจ็ด",
    48: "สี่สิบแปด",
    49: "สี่สิบเก้า",
    50: "ห้าสิบ",
    51: "ห้าสิบเอ็ด",
    52: "ห้าสิบสอง",
    53: "ห้าสิบสาม",
    54: "ห้าสิบสี่",
    55: "ห้าสิบห้า",
    56: "ห้าสิบหก",
    57: "ห้าสิบเจ็ด",
    58: "ห้าสิบแปด",
    59: "ห้าสิบเก้า"
  };
  return map[n] || String(n);
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

function buildSpokenThai(hour, minute) {
  const [thaiHour] = thaiHourText(hour);

  if (minute === 0) {
    return thaiHour;
  }

  if (minute === 30) {
    if (hour >= 1 && hour <= 11) return `${thaiHour} ครึ่ง`;
    if (hour === 12) return `เที่ยงครึ่ง`;
    return `${thaiHour} ครึ่ง`;
  }

  if (minute === 15) {
    return `${thaiHour} สิบห้านาที`;
  }

  return `${thaiHour} ${thaiNumberText(minute)}นาที`;
}

function updateClock() {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();

  digitalTime.textContent = `${pad(h)}:${pad(m)}`;

  const [thaiHour, phoneticHour] = thaiHourText(h);
  const minuteThai = m === 0 ? "" : ` ${thaiNumberText(m)}นาที`;
  const minutePhonetic = m === 0 ? "" : ` ${m} naathi`;

  thaiTime.textContent = `${thaiHour}${minuteThai}`.trim();
  phoneticTime.textContent = `${phoneticHour}${minutePhonetic}`.trim();
}

function speakThai() {
  if (!("speechSynthesis" in window)) return;

  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const text = buildSpokenThai(h, m);

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "th-TH";
  utterance.rate = 1;
  utterance.pitch = 1;

  const voices = window.speechSynthesis.getVoices();
  const thaiVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith("th"));
  if (thaiVoice) {
    utterance.voice = thaiVoice;
  }

  window.speechSynthesis.speak(utterance);
}

timeButton.addEventListener("click", speakThai);
speakBtn.addEventListener("click", speakThai);

updateClock();
setInterval(updateClock, 1000);

if ("speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = updateClock;
}
