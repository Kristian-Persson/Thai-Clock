const digitalTime = document.getElementById("digitalTime");
const thaiTime = document.getElementById("thaiTime");
const phoneticTime = document.getElementById("phoneticTime");
const timeButton = document.getElementById("timeButton");
const speakBtn = document.getElementById("speakBtn");

let availableVoices = [];

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

function thaiPhoneticNumber(n) {
  const map = {
    0: "soon",
    1: "neung",
    2: "song",
    3: "sam",
    4: "si",
    5: "ha",
    6: "hok",
    7: "jet",
    8: "paet",
    9: "kao",
    10: "sip",
    11: "sip-et",
    12: "sip-song",
    13: "sip-sam",
    14: "sip-si",
    15: "sip-ha",
    16: "sip-hok",
    17: "sip-jet",
    18: "sip-paet",
    19: "sip-kao",
    20: "yi-sip",
    21: "yi-sip-et",
    22: "yi-sip-song",
    23: "yi-sip-sam",
    24: "yi-sip-si",
    25: "yi-sip-ha",
    26: "yi-sip-hok",
    27: "yi-sip-jet",
    28: "yi-sip-paet",
    29: "yi-sip-kao",
    30: "sam-sip",
    31: "sam-et",
    32: "sam-song",
    33: "sam-sam",
    34: "sam-si",
    35: "sam-ha",
    36: "sam-hok",
    37: "sam-jet",
    38: "sam-paet",
    39: "sam-kao",
    40: "si-sip",
    41: "si-et",
    42: "si-song",
    43: "si-sam",
    44: "si-si",
    45: "si-ha",
    46: "si-hok",
    47: "si-jet",
    48: "si-paet",
    49: "si-kao",
    50: "ha-sip",
    51: "ha-et",
    52: "ha-song",
    53: "ha-sam",
    54: "ha-si",
    55: "ha-ha",
    56: "ha-hok",
    57: "ha-jet",
    58: "ha-paet",
    59: "ha-kao"
  };
  return map[n] || String(n);
}

function thaiHourText(hour) {
  const map = {
    0: ["เที่ยงคืน", "thiang khuen"],
    1: ["ตีหนึ่ง", "ti neung"],
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
    19: ["หนึ่งทุ่ม", "neung thum"],
    20: ["สองทุ่ม", "song thum"],
    21: ["สามทุ่ม", "sam thum"],
    22: ["สี่ทุ่ม", "si thum"],
    23: ["ห้าทุ่ม", "ha thum"]
  };
  return map[hour] || ["", ""];
}

function buildSpokenThai(hour, minute) {
  const [thaiHour] = thaiHourText(hour);
  if (minute === 0) return thaiHour;
  if (minute === 30) return `${thaiHour} ครึ่ง`;
  return `${thaiHour} ${thaiNumberText(minute)}นาที`;
}

function buildSpokenPhonetic(hour, minute) {
  const [, phoneticHour] = thaiHourText(hour);
  if (minute === 0) return phoneticHour;
  if (minute === 30) return `${phoneticHour} khrueng`;
  return `${phoneticHour} ${thaiPhoneticNumber(minute)} naathi`;
}

function updateClock() {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();

  digitalTime.textContent = `${pad(h)}:${pad(m)}`;

  const [thaiHour, phoneticHour] = thaiHourText(h);
  const minuteThai = m === 0 ? "" : ` ${thaiNumberText(m)}นาที`;
  const minutePhonetic = m === 0 ? "" : ` ${thaiPhoneticNumber(m)} naathi`;

  thaiTime.textContent = `${thaiHour}${minuteThai}`.trim();
  phoneticTime.textContent = `${phoneticHour}${minutePhonetic}`.trim();
}

function refreshVoices() {
  if (!("speechSynthesis" in window)) return;
  availableVoices = window.speechSynthesis.getVoices();
}

function speakText(text, lang, voice = null) {
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.text = text;
  utterance.lang = lang;
  utterance.rate = 0.95;
  utterance.pitch = 1;
  utterance.volume = 1;

  if (voice) utterance.voice = voice;

  utterance.onerror = (e) => {
    console.log("Speech error:", e.error);
  };

  setTimeout(() => {
    window.speechSynthesis.speak(utterance);
  }, 100);
}

function speakThai() {
  if (!("speechSynthesis" in window)) return;

  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();

  const thaiText = buildSpokenThai(h, m);
  const phoneticText = buildSpokenPhonetic(h, m);

  const thaiVoice = availableVoices.find(
    v => v.lang && v.lang.toLowerCase().startsWith("th")
  );

  if (thaiVoice) {
    speakText(thaiText, "th-TH", thaiVoice);
  } else {
    speakText(phoneticText, "en-US");
  }
}

timeButton.addEventListener("click", speakThai);
speakBtn.addEventListener("click", speakThai);

refreshVoices();
if ("speechSynthesis" in window) {
  if ("onvoiceschanged" in window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = refreshVoices;
  } else {
    window.speechSynthesis.addEventListener("voiceschanged", refreshVoices);
  }
}

updateClock();
setInterval(updateClock, 1000);
