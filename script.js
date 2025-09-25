  /* === FUNGSI MUSIK === */
  const music = document.getElementById("bg-music");
  const musicBtn = document.getElementById("music-btn");
  let isPlaying = true;

  function toggleMusic() {
    if (isPlaying) {
      music.pause();
      musicBtn.innerHTML = '<i class="fas fa-pause"></i>'; 
    } else {
      music.play();
      musicBtn.innerHTML = '<i class="fas fa-music"></i>'; 
    }
    isPlaying = !isPlaying;
  }

  /* === FUNGSI BUKA UNDANGAN === */
  function openInvitation() {
    document.getElementById("cover").style.display = "none";
    document.querySelector(".nav").style.display = "flex";
    music.play();

  // mainkan video setelah buka undangan
  const video = document.getElementById("bg-video");
  video.play();

    // langsung trigger cek reveal pertama kali
    revealObserver.observe(document.getElementById("opening"));
  }

  /* === COUNTDOWN === */
  const countdownEl = document.getElementById("countdown");
  const weddingDate = new Date("2025-11-14 07:00:00").getTime(); 
  setInterval(() => {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    if (distance < 0) { countdownEl.innerHTML = "Acara sudah berlangsung"; return; }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    countdownEl.innerHTML = `
      <div>${days}<br>Hari</div>
      <div>${hours}<br>Jam</div>
      <div>${minutes}<br>Menit</div>
      <div>${seconds}<br>Detik</div>
    `;
  }, 1000);

/* === COPY TO CLIPBOARD === */
function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    // sukses, tapi tidak perlu alert
    console.log("Teks berhasil disalin:", text); // opsional untuk debug
  }).catch(err => {
    console.error("Gagal menyalin teks: ", err);
  });
}

/* === SAVE TO CALENDAR === */
function saveToCalendar() {
  const title = "Pernikahan Putri & Putra ";
  const start = "20251114T000000Z"; // 14 Nov 2025, 07:00 WIB
  const end   = "20251114T050000Z"; // 14 Nov 2025, 12:00 WIB
  const details = "Undangan pernikahan Putri & Putra ";
  const location = "https://maps.app.goo.gl/fGkJCddBoqoEkyeW7"; // link Google Maps

  const url = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
  
  window.open(url, "_blank");
}

 /* === REVEAL ANIMATION BUNGA === */
  document.addEventListener("DOMContentLoaded", function () {
    const bunga = document.querySelector(".section-divider img");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          bunga.classList.add("show");
        }
      });
    });

    observer.observe(bunga);
  });

  /* === REVEAL ANIMATION WITH INTERSECTION OBSERVER === */
  const reveals = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        // kalau mau sekali saja animasi, uncomment ini:
        // revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  reveals.forEach(el => {
    revealObserver.observe(el);
  });

  

document.getElementById("rsvpForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let formData = new FormData(this);

  fetch("https://script.google.com/macros/s/AKfycbwtzT44TzIKxDMhPuqYwQ96HhNAz-l1PQ02IU_fV3vmHKA3TfWBcfxFWNW6gmVPmNrd/exec", {
    method: "POST",
    body: formData
  })
  .then(res => res.text())
  .then(data => {
    alert("Terima kasih, data berhasil disimpan 🙏");
    window.location.href = "index.html"; // balik ke halaman utama
  })
  .catch(err => console.error(err));
});



const GET_URL = "https://script.google.com/macros/s/AKfycbwtzT44TzIKxDMhPuqYwQ96HhNAz-l1PQ02IU_fV3vmHKA3TfWBcfxFWNW6gmVPmNrd/exec"; 
const ucapanBody = document.getElementById("ucapanBody");

function loadUcapan() {
  fetch(GET_URL)
    .then(res => res.json())
    .then(data => {
      ucapanBody.innerHTML = ""; // reset dulu
      let hadirCount = 0;
      let tidakHadirCount = 0;

data.reverse().forEach(item => {
  const kehadiran = (item.kehadiran || "").trim().toLowerCase();

  const row = document.createElement("div");
  row.classList.add("ucapan-item");
  row.innerHTML = `
    <div class="ucapan-header">
      <span>${item.nama}</span>
      <span class="ucapan-kehadiran ${kehadiran.replace(" ", "")}">
        ${item.kehadiran}
      </span>
    </div>
    <div class="ucapan-teks">${item.ucapan}</div>
  `;
  ucapanBody.appendChild(row);

  // hitung jumlah hadir / tidak hadir
  if (kehadiran === "hadir") {
    hadirCount++;
  } else if (kehadiran === "tidak hadir") {
    tidakHadirCount++;
  }
});


      // update hasil ke HTML
      document.getElementById("jumlahHadir").textContent = hadirCount;
      document.getElementById("jumlahTidakHadir").textContent = tidakHadirCount;
    })
    .catch(err => console.error(err));
}

// otomatis load pas halaman dibuka
document.addEventListener("DOMContentLoaded", loadUcapan);



document.addEventListener("DOMContentLoaded", function () {
  const target = document.querySelector(".love-story-bottom");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        target.classList.add("show");
      }
    });
  }, { threshold: 0.2 }); // muncul kalau 20% elemen terlihat

  observer.observe(target);
});



 const urlParams = new URLSearchParams(window.location.search);
  const nama = urlParams.get("nama") || "Tamu Undangan";
  document.getElementById("nama-tamu").innerText = nama;