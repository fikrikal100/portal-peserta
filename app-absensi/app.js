// ----------------------------------------------------
// 1. INISIALISASI SUPABASE
// ----------------------------------------------------
const SUPABASE_URL = "https://bxgzkfvqwkzbnikvvjhp.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4Z3prZnZxd2t6Ym5pa3Z2amhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE5MjQ1NjMsImV4cCI6MjEwNzUwMDU2M30.mSC45wlyGiP2V6UpCTeIJWZs9HVu7Z4ZaqucUFqDqDg";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let currentSessionUser = null;
let currCalDate = new Date();
let selectedBatchDates = [];

// Data awal libur nasional (Lokal agar instan tanpa loading)
let loadedNationalHolidays = {
  // 2024
  "2024-01-01": "Tahun Baru 2024 Masehi",
  "2024-02-08": "Isra Mikraj Nabi Muhammad SAW",
  "2024-02-09": "Cuti Bersama Imlek",
  "2024-02-10": "Tahun Baru Imlek 2575 Kongzili",
  "2024-03-11": "Hari Suci Nyepi Tahun Baru Saka 1946",
  "2024-03-29": "Wafat Isa Al Masih",
  "2024-03-31": "Hari Paskah",
  "2024-04-10": "Hari Raya Idul Fitri 1445 Hijriah",
  "2024-04-11": "Hari Raya Idul Fitri 1445 Hijriah",
  "2024-05-01": "Hari Buruh Internasional",
  "2024-05-09": "Kenaikan Isa Al Masih",
  "2024-05-23": "Hari Raya Waisak 2568 BE",
  "2024-06-01": "Hari Lahir Pancasila",
  "2024-06-17": "Hari Raya Idul Adha 1445 Hijriah",
  "2024-07-07": "Tahun Baru Islam 1446 Hijriah",
  "2024-08-17": "Hari Kemerdekaan Republik Indonesia",
  "2024-09-16": "Maulid Nabi Muhammad SAW",
  "2024-12-25": "Hari Raya Natal",

  // 2025
  "2025-01-01": "Tahun Baru 2025 Masehi",
  "2025-01-27": "Isra Mikraj Nabi Muhammad SAW",
  "2025-01-29": "Tahun Baru Imlek 2576 Kongzili",
  "2025-03-29": "Hari Suci Nyepi Tahun Baru Saka 1947",
  "2025-03-31": "Hari Raya Idul Fitri 1446 Hijriah",
  "2025-04-01": "Hari Raya Idul Fitri 1446 Hijriah",
  "2025-04-18": "Wafat Yesus Kristus",
  "2025-04-20": "Kebangkitan Yesus Kristus (Paskah)",
  "2025-05-01": "Hari Buruh Internasional",
  "2025-05-12": "Hari Raya Waisak 2569 BE",
  "2025-05-29": "Kenaikan Yesus Kristus",
  "2025-06-01": "Hari Lahir Pancasila",
  "2025-06-06": "Hari Raya Idul Adha 1446 Hijriah",
  "2025-06-27": "1 Muharam Tahun Baru Islam 1447 Hijriah",
  "2025-08-17": "Proklamasi Kemerdekaan RI",
  "2025-09-05": "Maulid Nabi Muhammad SAW",
  "2025-12-25": "Hari Raya Natal",

  // 2026
  "2026-01-01": "Tahun Baru 2026 Masehi",
  "2026-01-16": "Isra Mikraj Nabi Muhammad SAW",
  "2026-02-17": "Tahun Baru Imlek 2577 Kongzili",
  "2026-03-19": "Hari Suci Nyepi Tahun Baru Saka 1948",
  "2026-03-20": "Hari Raya Idul Fitri 1447 Hijriah",
  "2026-03-21": "Hari Raya Idul Fitri 1447 Hijriah",
  "2026-04-03": "Wafat Yesus Kristus",
  "2026-05-01": "Hari Buruh Internasional",
  "2026-05-14": "Kenaikan Yesus Kristus",
  "2026-05-27": "Hari Raya Idul Adha 1447 Hijriah",
  "2026-05-31": "Hari Raya Waisak 2570 BE",
  "2026-06-01": "Hari Lahir Pancasila",
  "2026-06-16": "Tahun Baru Islam 1448 Hijriah",
  "2026-08-17": "Proklamasi Kemerdekaan RI",
  "2026-08-25": "Maulid Nabi Muhammad SAW",
  "2026-12-25": "Hari Raya Natal"
};

// ----------------------------------------------------
// HELPER FUNCTIONS
// ----------------------------------------------------
function cleanStringForMatch(str) {
  if (!str) return '';
  return str.toString().toLowerCase().replace(/[^a-z0-9]/g, '');
}

function sortBatchesDescending(batchArray) {
  return batchArray.sort((a, b) => {
    if (a.created_at && b.created_at) {
      const diffTime = new Date(b.created_at) - new Date(a.created_at);
      if (diffTime !== 0) return diffTime;
    }
    if (a.tgl_mulai && b.tgl_mulai) {
      const diffDate = new Date(b.tgl_mulai) - new Date(a.tgl_mulai);
      if (diffDate !== 0) return diffDate;
    }
    const titleA = a.judul || a.id || '';
    const titleB = b.judul || b.id || '';
    return titleB.localeCompare(titleA, undefined, { numeric: true, sensitivity: 'base' });
  });
}

function formatJamLokalPerangkat(isoString) {
  if (!isoString) return '-';
  const dateObj = new Date(isoString);
  if (isNaN(dateObj.getTime())) return isoString;

  const jam = String(dateObj.getHours()).padStart(2, '0');
  const menit = String(dateObj.getMinutes()).padStart(2, '0');
  return `${jam}:${menit}`;
}

// ----------------------------------------------------
// 2. LOGIKA LOGIN & SESSION
// ----------------------------------------------------
async function prosesLogin() {
  const u = document.getElementById('loginUsername').value.trim().toLowerCase();
  const p = document.getElementById('loginPassword').value.trim();

  if (!u || !p) {
    alert("Harap isi Username dan Password!");
    return;
  }

  const btn = document.getElementById('btnLogin');
  const originalText = btn.innerHTML;
  btn.innerText = "Memproses...";
  btn.disabled = true;

  try {
    const { data, error } = await supabaseClient
      .from('users')
      .select('*, trainings(*)')
      .eq('username', u)
      .eq('password', p)
      .maybeSingle();

    if (error) {
      alert("Terjadi masalah koneksi Supabase: " + error.message);
      return;
    }

    if (!data) {
      alert("Username atau Password salah!");
      return;
    }

    currentSessionUser = data;
    document.getElementById('sectionLogin').classList.add('hidden');
    document.getElementById('btnLogout').classList.remove('hidden');

    if (data.role === 'admin') {
      document.getElementById('sectionAdmin').classList.remove('hidden');
      loadBatchOptions();
      renderCalendar();
      onSKPFilterChange();
      loadDropdownMasterModulAdmin();
    } else {
      document.getElementById('sectionPeserta').classList.remove('hidden');
      renderPesertaData(data);
      startCamera();
    }

  } catch (err) {
    alert("Terjadi kesalahan sistem: " + err.message);
  } finally {
    btn.innerHTML = originalText;
    btn.disabled = false;
  }
}

function logout() {
  location.reload();
}

function switchTabPeserta(tabName) {
  document.querySelectorAll('.tab-peserta-content').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.tab-peserta-btn').forEach(el => {
    el.classList.remove('bg-emerald-800', 'text-white');
    el.classList.add('hover:bg-slate-100');
  });

  if (tabName === 'profil') {
    document.getElementById('tabPesertaProfil').classList.remove('hidden');
    document.getElementById('tabBtnProfil').classList.add('bg-emerald-800', 'text-white');
  } else if (tabName === 'absensi') {
    document.getElementById('tabPesertaAbsensi').classList.remove('hidden');
    document.getElementById('tabBtnAbsensi').classList.add('bg-emerald-800', 'text-white');
  } else if (tabName === 'sertifikat') {
    document.getElementById('tabPesertaSertifikat').classList.remove('hidden');
    document.getElementById('tabBtnSertifikat').classList.add('bg-emerald-800', 'text-white');
  } else if (tabName === 'modul') {
    document.getElementById('tabPesertaModul').classList.remove('hidden');
    document.getElementById('tabBtnModul').classList.add('bg-emerald-800', 'text-white');
    loadKatalogModulPeserta();
  } else if (tabName === 'info') {
    document.getElementById('tabPesertaInfo').classList.remove('hidden');
    document.getElementById('tabBtnInfo').classList.add('bg-emerald-800', 'text-white');
  }
}

// RENDER DATA PESERTA & RIWAYAT MULTI-TRAINING
async function renderPesertaData(user) {
  document.getElementById('pesertaNama').innerText = user.nama || '-';
  document.getElementById('pesertaPerusahaan').innerHTML = `<i class="fa-solid fa-building mr-1"></i> Perusahaan: ${user.perusahaan || '-'}`;
  document.getElementById('pesertaNIK').innerText = user.nik || '-';
  document.getElementById('pesertaUsername').innerText = user.username || '-';

  const userTrainingsSet = new Set();
  if (user.training_id) userTrainingsSet.add(user.training_id);

  const { data: logs } = await supabaseClient.from('log_absensi').select('training_id').eq('username', user.username);
  if (logs) logs.forEach(l => { if (l.training_id) userTrainingsSet.add(l.training_id); });

  const { data: certs } = await supabaseClient.from('certificates').select('training_id').eq('username', user.username);
  if (certs) certs.forEach(c => { if (c.training_id) userTrainingsSet.add(c.training_id); });

  const allTrainingsList = Array.from(userTrainingsSet);
  
  const elTraining = document.getElementById('pesertaTraining');
  if (elTraining) {
    elTraining.innerHTML = allTrainingsList.map(t => `<span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full mr-1">${t}</span>`).join(' ');
  }

  const tInfo = user.trainings;
  if (tInfo && tInfo.jadwal_tanggal && tInfo.jadwal_tanggal.length > 0) {
    const sorted = [...tInfo.jadwal_tanggal].sort();
    document.getElementById('pesertaJadwal').innerText = `${sorted[0]} s/d ${sorted[sorted.length-1]} (${sorted.length} Hari Pelatihan)`;
  } else if (tInfo) {
    document.getElementById('pesertaJadwal').innerText = `${tInfo.tgl_mulai} s/d ${tInfo.tgl_selesai}`;
  } else {
    document.getElementById('pesertaJadwal').innerText = 'Sesuai Sesi Pelatihan';
  }

  loadSertifikatPeserta(user.username);
  loadMatriksAbsensiUser();
}

// ----------------------------------------------------
// RENDER DAFTAR SERTIFIKAT
// ----------------------------------------------------
async function loadSertifikatPeserta(username) {
  const container = document.getElementById('containerListSertifikatPeserta');
  if (!container) return;

  container.innerHTML = '<p class="text-xs text-center text-slate-400 py-2">Mengecek sertifikat...</p>';

  const { data: certs, error } = await supabaseClient
    .from('certificates')
    .select('*')
    .eq('username', username)
    .order('created_at', { ascending: false });

  if (error || !certs || certs.length === 0) {
    container.innerHTML = `
      <div class="text-xs text-amber-700 font-semibold bg-amber-50 p-4 rounded-xl border border-amber-200 text-center">
        ⏳ Belum ada sertifikat yang diterbitkan untuk akun ini.
      </div>
    `;
    return;
  }

  container.innerHTML = '';
  certs.forEach(c => {
    container.innerHTML += `
      <div class="bg-emerald-50 border border-emerald-300 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-3">
        <div>
          <p class="text-xs font-bold text-emerald-900">${c.nama_sertifikat}</p>
          <p class="text-[10px] text-emerald-700 mt-0.5">Kode/File: ${c.training_id || '-'}</p>
        </div>
        <a href="${c.url_sertifikat}" target="_blank" class="bg-emerald-700 hover:bg-emerald-800 text-white text-xs px-4 py-2 rounded-lg font-bold shadow transition flex items-center gap-1.5 whitespace-nowrap">
          <i class="fa-solid fa-file-arrow-down"></i> Unduh PDF
        </a>
      </div>
    `;
  });
}

// ----------------------------------------------------
// 3. LOGIKA ABSENSI REAL-TIME & MATRIKS
// ----------------------------------------------------
async function loadMatriksAbsensiUser() {
  if (!currentSessionUser) return;

  const { data: logs } = await supabaseClient
    .from('log_absensi')
    .select('*')
    .eq('username', currentSessionUser.username);

  renderMatriksAbsensi(currentSessionUser.trainings, logs || []);
}

function renderMatriksAbsensi(training, logs = []) {
  const tbody = document.getElementById('tbodyMatriksAbsensi');
  if (!tbody) return;
  tbody.innerHTML = '';

  let listTanggal = [];

  if (training && training.jadwal_tanggal && training.jadwal_tanggal.length > 0) {
    listTanggal = [...training.jadwal_tanggal].sort();
  } 
  else if (training && training.tgl_mulai && training.tgl_selesai) {
    let start = new Date(training.tgl_mulai);
    let end = new Date(training.tgl_selesai);
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      listTanggal.push(d.toISOString().split('T')[0]);
    }
  }

  if (listTanggal.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" class="text-center py-3 text-slate-400">Jadwal pelatihan belum diatur oleh Panitia.</td></tr>`;
    return;
  }

  listTanggal.forEach(dateStr => {
    const s1 = logs.find(l => l.tanggal === dateStr && Number(l.sesi) === 1);
    const s2 = logs.find(l => l.tanggal === dateStr && Number(l.sesi) === 2);

    const badgeS1 = s1 
      ? `<span class="bg-emerald-100 text-emerald-800 text-[10px] px-2.5 py-1 rounded-full font-bold">✓ Hadir (${formatJamLokalPerangkat(s1.waktu_absen)})</span>` 
      : `<span class="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded-full font-semibold">Belum Absen</span>`;

    const badgeS2 = s2 
      ? `<span class="bg-emerald-100 text-emerald-800 text-[10px] px-2.5 py-1 rounded-full font-bold">✓ Hadir (${formatJamLokalPerangkat(s2.waktu_absen)})</span>` 
      : `<span class="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded-full font-semibold">Belum Absen</span>`;

    let statusTotal = `<span class="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-full font-bold">Pending</span>`;
    if (s1 && s2) statusTotal = `<span class="bg-emerald-700 text-white text-[10px] px-2.5 py-0.5 rounded-full font-bold">Lengkap 100%</span>`;
    else if (s1 || s2) statusTotal = `<span class="bg-blue-100 text-blue-800 text-[10px] px-2.5 py-0.5 rounded-full font-bold">Parsial 50%</span>`;

    tbody.innerHTML += `
      <tr class="border-b border-slate-100 hover:bg-slate-50">
        <td class="px-3 py-2.5 font-bold text-slate-700">${dateStr}</td>
        <td class="px-3 py-2.5">${badgeS1}</td>
        <td class="px-3 py-2.5">${badgeS2}</td>
        <td class="px-3 py-2.5">${statusTotal}</td>
      </tr>
    `;
  });
}

// ----------------------------------------------------
// 4. KAMERA & ABSENSI REAL-TIME
// ----------------------------------------------------
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ 
      video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" } 
    });
    document.getElementById('webcam').srcObject = stream;
  } catch (err) {
    console.warn("Kamera tidak dapat diakses secara langsung:", err);
  }
}

async function ambilAbsen() {
  if (!currentSessionUser) return alert("Sesi login tidak ditemukan, harap login ulang!");

  const training = currentSessionUser.trainings;
  let listTanggal = [];

  if (training && training.jadwal_tanggal && training.jadwal_tanggal.length > 0) {
    listTanggal = [...training.jadwal_tanggal].sort();
  } else if (training && training.tgl_mulai && training.tgl_selesai) {
    let start = new Date(training.tgl_mulai);
    let end = new Date(training.tgl_selesai);
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      listTanggal.push(d.toISOString().split('T')[0]);
    }
  }

  const now = new Date();
  const tglHariIni = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  if (listTanggal.length === 0) {
    return alert("⚠️ Jadwal pelatihan kamu belum diatur oleh Panitia!");
  }

  const tglAwal = listTanggal[0];
  const tglAkhir = listTanggal[listTanggal.length - 1];

  if (tglHariIni > tglAkhir) {
    return alert(`⛔ Pelatihan Kamu Sudah Selesai!\nMasa pelatihan telah berakhir pada tanggal ${tglAkhir}. Akses absensi sudah ditutup.`);
  }

  if (tglHariIni < tglAwal) {
    return alert(`⏳ Pelatihan Belum Dimulai!\nJadwal pelatihan kamu baru akan dimulai pada tanggal ${tglAwal}.`);
  }

  if (!listTanggal.includes(tglHariIni)) {
    return alert(`⚠️ Hari Ini Libur / Tidak Ada Sesi!\nTanggal ${tglHariIni} tidak termasuk dalam jadwal sesi pelatihan kamu.`);
  }

  const btn = document.getElementById('btnKirimAbsen');
  const originalText = btn.innerHTML;
  btn.innerText = "Mengambil Foto & Lokasi GPS...";
  btn.disabled = true;

  try {
    let lat = null, lng = null;
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 8000 });
      });
      lat = position.coords.latitude;
      lng = position.coords.longitude;
    } catch (e) {
      console.warn("GPS tidak diizinkan/timeout, melanjutkan tanpa koordinat.");
    }

    const video = document.getElementById('webcam');
    const canvas = document.getElementById('canvasAbsen');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const fotoBase64 = canvas.toDataURL('image/jpeg', 0.7);

    const jam = now.getHours();
    let sesiNum = 1;
    if (jam >= 12) sesiNum = 2;

    const waktuAbsenTeks = now.toLocaleString('id-ID', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    const { error } = await supabaseClient.from('log_absensi').insert([{
      username: currentSessionUser.username,
      training_id: currentSessionUser.training_id,
      tanggal: tglHariIni,
      sesi: sesiNum,
      waktu_absen: waktuAbsenTeks,
      foto: fotoBase64,
      latitude: lat,
      longitude: lng
    }]);

    if (error) {
      alert("Gagal menyimpan absensi: " + error.message);
    } else {
      alert(`✅ Absensi Sesi ${sesiNum} Berhasil Dicatat!`);
      loadMatriksAbsensiUser();
    }

  } catch (err) {
    alert("Terjadi kesalahan absensi: " + err.message);
  } finally {
    btn.innerHTML = originalText;
    btn.disabled = false;
  }
}

// ----------------------------------------------------
// FETCH API LIBUR NASIONAL OTOMATIS
// ----------------------------------------------------
async function fetchHolidays(year) {
  try {
    const response = await fetch(`https://dayoffapi.vercel.app/api?year=${year}`);
    if (!response.ok) return;
    const data = await response.json();
    
    if (Array.isArray(data)) {
      data.forEach(h => {
        if (h.is_cuti === false || h.is_cuti === undefined) {
          loadedNationalHolidays[h.tanggal] = h.keterangan;
        } else {
          loadedNationalHolidays[h.tanggal] = `Cuti Bersama: ${h.keterangan}`;
        }
      });
      renderCalendar();
    }
  } catch (err) {
    console.warn(`API libur nasional offline/timeout tahun ${year}. Menggunakan data bawaan.`);
  }
}

// ----------------------------------------------------
// 5. KALENDER MULTI-SELECT PILIHAN ADMIN
// ----------------------------------------------------
function renderCalendar() {
  const grid = document.getElementById('calendarGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const y = currCalDate.getFullYear();
  const m = currCalDate.getMonth();

  const selectMonth = document.getElementById('calSelectMonth');
  const selectYear = document.getElementById('calSelectYear');

  if (selectMonth) selectMonth.value = m;

  if (selectYear && selectYear.options.length === 0) {
    selectYear.innerHTML = '';
    const currentYear = new Date().getFullYear();
    for (let yr = currentYear - 2; yr <= currentYear + 5; yr++) {
      selectYear.innerHTML += `<option value="${yr}">${yr}</option>`;
    }
  }
  if (selectYear) selectYear.value = y;

  const firstDay = new Date(y, m, 1).getDay();
  const totalDays = new Date(y, m + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    grid.innerHTML += `<div></div>`;
  }

  for (let day = 1; day <= totalDays; day++) {
    const dateString = `${y}-${String(m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dateObj = new Date(y, m, day);
    const isSunday = dateObj.getDay() === 0;
    const holidayName = loadedNationalHolidays[dateString];
    const isSelected = selectedBatchDates.includes(dateString);

    let btnClass = "";
    let titleAttr = holidayName ? `title="${holidayName}"` : '';

    if (isSelected) {
      btnClass = "bg-emerald-700 text-white font-bold rounded-xl p-2 text-center shadow ring-2 ring-emerald-500 transition";
    } else if (isSunday || holidayName) {
      btnClass = "bg-red-50 border border-red-200 text-red-600 font-bold rounded-xl p-2 text-center hover:bg-red-100 transition relative";
    } else {
      btnClass = "bg-white border text-slate-700 font-semibold rounded-xl p-2 text-center hover:bg-emerald-50 transition";
    }

    grid.innerHTML += `
      <button onclick="toggleDateSelection('${dateString}')" class="${btnClass}" ${titleAttr}>
        ${day}
      </button>
    `;
  }

  renderSelectedBadges();
}

function jumpCalendarMonthYear() {
  const m = parseInt(document.getElementById('calSelectMonth').value);
  const y = parseInt(document.getElementById('calSelectYear').value);
  currCalDate.setFullYear(y);
  currCalDate.setMonth(m);
  renderCalendar();
  fetchHolidays(y);
}

function changeMonth(dir) {
  currCalDate.setMonth(currCalDate.getMonth() + dir);
  renderCalendar();
  fetchHolidays(currCalDate.getFullYear());
}

function toggleDateSelection(dateStr) {
  const idx = selectedBatchDates.indexOf(dateStr);
  if (idx > -1) {
    selectedBatchDates.splice(idx, 1);
  } else {
    selectedBatchDates.push(dateStr);
  }
  selectedBatchDates.sort();
  renderCalendar();
}

function resetSelectedDates() {
  selectedBatchDates = [];
  renderCalendar();
}

function renderSelectedBadges() {
  const countEl = document.getElementById('textSelectedDatesCount');
  if (countEl) countEl.innerText = `${selectedBatchDates.length} Hari`;

  const container = document.getElementById('containerSelectedBadges');
  if (!container) return;

  container.innerHTML = '';
  selectedBatchDates.forEach(d => {
    const holidayName = loadedNationalHolidays[d];
    const holidayTag = holidayName ? ` (${holidayName})` : '';

    container.innerHTML += `
      <span class="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
        ${d}${holidayTag} <i onclick="toggleDateSelection('${d}')" class="fa-solid fa-xmark cursor-pointer hover:text-red-600"></i>
      </span>
    `;
  });
}

// ----------------------------------------------------
// 6. FITUR ADMIN: BUAT BATCH PELATIHAN
// ----------------------------------------------------
async function simpanBatchTraining() {
  const masterId = document.getElementById('adminSelectMasterTraining').value;
  const batchNum = document.getElementById('adminInputBatch').value.trim();
  
  if (!batchNum) return alert("Harap isi Nomor Batch!");
  if (selectedBatchDates.length === 0) return alert("Harap pilih minimal 1 tanggal pada kalender!");

  const trainingId = `${masterId}-${batchNum.replace(/\s+/g, '-').toUpperCase()}`;
  const sortedDates = [...selectedBatchDates].sort();

  const { error } = await supabaseClient.from('trainings').upsert([{
    id: trainingId,
    master_training_id: masterId,
    batch_number: batchNum,
    judul: `Pelatihan ${masterId} - ${batchNum}`,
    tgl_mulai: sortedDates[0],
    tgl_selesai: sortedDates[sortedDates.length - 1],
    jadwal_tanggal: sortedDates
  }]);

  if (error) alert("Gagal menyimpan batch: " + error.message);
  else {
    alert(`✅ Batch Training Berhasil Dibuat: ${trainingId}\n\nJadwal Terpilih (${sortedDates.length} Hari):\n` + sortedDates.join(", "));
    loadBatchOptions();
    resetSelectedDates();
  }
}

// ----------------------------------------------------
// LOAD PILIHAN BATCH UNTUK DROPDOWN
// ----------------------------------------------------
async function loadBatchOptions() {
  const { data, error } = await supabaseClient
    .from('trainings')
    .select('*');
  
  const selectRekap = document.getElementById('adminSelectBatchRekap');
  const selectManual = document.getElementById('manualSelectBatch');
  const selectImport = document.getElementById('importSelectBatch');
  
  if (selectRekap) selectRekap.innerHTML = '<option value="">-- Pilih Batch Training --</option>';
  if (selectManual) selectManual.innerHTML = '<option value="">-- Pilih Batch Pelatihan --</option>';
  if (selectImport) selectImport.innerHTML = '<option value="">-- Pilih Batch Pelatihan --</option>';

  if (error || !data) return;

  const sortedData = sortBatchesDescending([...data]);

  sortedData.forEach(b => {
    const totalHari = b.jadwal_tanggal ? b.jadwal_tanggal.length : '-';
    const optHtml = `<option value="${b.id}">${b.judul} (${totalHari} Hari Sesi)</option>`;
    if (selectRekap) selectRekap.innerHTML += optHtml;
    if (selectManual) selectManual.innerHTML += optHtml;
    if (selectImport) selectImport.innerHTML += optHtml;
  });
}

// ----------------------------------------------------
// IMPORT EXCEL PESERTA MASAL
// ----------------------------------------------------
function importExcelPeserta() {
  const selectedBatchId = document.getElementById('importSelectBatch').value;
  const fileInput = document.getElementById('fileExcelPeserta');
  const file = fileInput.files[0];

  if (!selectedBatchId) return alert("Harap pilih Batch Pelatihan Tujuan terlebih dahulu!");
  if (!file) return alert("Pilih file Excel/CSV lebih dulu!");

  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array', cellDates: true, raw: false });
      const sheetName = workbook.SheetNames[0];
      const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      if (!rows || rows.length === 0) {
        return alert("File Excel kosong atau tidak terbaca!");
      }

      const usersToInsert = rows.map(r => {
        const rawNama = String(r.Nama || r.nama || r["Nama Lengkap"] || "").trim();
        let rawTglLahir = r.TanggalLahir || r.tanggallahir || r["Tanggal Lahir"] || "";
        const rawNIK = String(r.NIK || r.nik || "-").trim();
        const rawPerusahaan = String(r.Perusahaan || r.perusahaan || r["Nama Perusahaan"] || "PT Mandiri Maha Daya").trim();

        let formattedDateForDb = "";
        let cleanDDMMYYYY = "";

        if (rawTglLahir instanceof Date) {
          const d = rawTglLahir.getDate().toString().padStart(2, '0');
          const m = (rawTglLahir.getMonth() + 1).toString().padStart(2, '0');
          const y = rawTglLahir.getFullYear();
          formattedDateForDb = `${y}-${m}-${d}`;
          cleanDDMMYYYY = `${d}${m}${y}`;
        } else {
          const strTgl = String(rawTglLahir).trim();
          
          if (strTgl.includes('-') || strTgl.includes('/')) {
            const parts = strTgl.split(/[-/]/);
            if (parts.length === 3) {
              if (parts[0].length === 4) {
                const y = parts[0];
                const m = parts[1].padStart(2, '0');
                const d = parts[2].padStart(2, '0');
                formattedDateForDb = `${y}-${m}-${d}`;
                cleanDDMMYYYY = `${d}${m}${y}`;
              } else {
                const d = parts[0].padStart(2, '0');
                const m = parts[1].padStart(2, '0');
                const y = parts[2];
                formattedDateForDb = `${y}-${m}-${d}`;
                cleanDDMMYYYY = `${d}${m}${y}`;
              }
            }
          } else {
            const digits = strTgl.replace(/[^0-9]/g, '');
            if (digits.length === 8) {
              const day = digits.substring(0, 2);
              const month = digits.substring(2, 4);
              const year = digits.substring(4, 8);
              formattedDateForDb = `${year}-${month}-${day}`;
              cleanDDMMYYYY = digits;
            } else {
              formattedDateForDb = strTgl;
              cleanDDMMYYYY = digits;
            }
          }
        }

        const formattedUsername = rawNama.replace(/\s+/g, '').toLowerCase();
        const idSertifikat = `${formattedUsername}_${cleanDDMMYYYY}`;

        return {
          username: formattedUsername,
          password: cleanDDMMYYYY,
          nama: rawNama,
          nik: rawNIK,
          tgl_lahir: formattedDateForDb,
          perusahaan: rawPerusahaan,
          training_id: selectedBatchId,
          id_sertifikat: idSertifikat,
          role: 'peserta'
        };
      });

      const { error } = await supabaseClient.from('users').upsert(usersToInsert);
      if (error) {
        alert("Gagal mengimpor data peserta: " + error.message);
      } else {
        alert(`✅ Berhasil mengimpor ${usersToInsert.length} akun peserta ke dalam Batch: ${selectedBatchId}!`);
        fileInput.value = '';
        document.getElementById('importSelectBatch').value = '';
        loadDatabasePeserta();
      }

    } catch (err) {
      alert("Gagal membaca file Excel: " + err.message);
    }
  };
  reader.readAsArrayBuffer(file);
}

// ----------------------------------------------------
// 7. INPUT PESERTA MANUAL
// ----------------------------------------------------
async function simpanPesertaManual() {
  const nama = document.getElementById('manualNama').value.trim();
  const tglLahirRaw = document.getElementById('manualTglLahir').value.trim();
  const nik = document.getElementById('manualNIK').value.trim();
  const perusahaan = document.getElementById('manualPerusahaan').value.trim();
  const trainingId = document.getElementById('manualSelectBatch').value;

  if (!nama || !tglLahirRaw || !trainingId) {
    return alert("Harap lengkapi Nama, Tanggal Lahir, dan Pilih Batch Pelatihan!");
  }

  const digits = tglLahirRaw.replace(/[^0-9]/g, '');

  if (digits.length !== 8) {
    return alert("Format Tanggal Lahir salah! Harap masukkan 8 digit angka, contoh: 20-12-1998 atau 20121998.");
  }

  const day = digits.substring(0, 2);
  const month = digits.substring(2, 4);
  const year = digits.substring(4, 8);

  const formattedDateForDb = `${year}-${month}-${day}`;
  const formattedDDMMYYYY = `${day}${month}${year}`;
  const formattedUsername = nama.replace(/\s+/g, '').toLowerCase();
  const idSertifikat = `${formattedUsername}_${formattedDDMMYYYY}`;

  const userObject = {
    username: formattedUsername,
    password: formattedDDMMYYYY,
    nama: nama,
    nik: nik || '-',
    tgl_lahir: formattedDateForDb,
    perusahaan: perusahaan || 'PT Mandiri Maha Daya',
    training_id: trainingId,
    id_sertifikat: idSertifikat,
    role: 'peserta'
  };

  const { error } = await supabaseClient.from('users').upsert([userObject]);

  if (error) {
    alert("Gagal menambahkan peserta: " + error.message);
  } else {
    alert(`✅ Peserta Berhasil Ditambahkan!\n\nUsername: ${formattedUsername}\nPassword: ${formattedDDMMYYYY}\nID Sertifikat: ${idSertifikat}`);
    
    document.getElementById('manualNama').value = '';
    document.getElementById('manualTglLahir').value = '';
    document.getElementById('manualNIK').value = '';
    document.getElementById('manualPerusahaan').value = '';
    document.getElementById('manualSelectBatch').value = '';
    loadDatabasePeserta();
  }
}

// ----------------------------------------------------
// UPLOAD & SYNC SERTIFIKAT MASAL
// ----------------------------------------------------
async function uploadSertifikatMasal() {
  const fileInput = document.getElementById('fileSertifikatMasal');
  const files = fileInput.files;
  if (!files.length) return alert("Pilih file PDF atau file .ZIP sertifikat lebih dulu!");

  let pdfFileList = [];

  const { data: allUsers, error: uErr } = await supabaseClient
    .from('users')
    .select('username, id_sertifikat, nama');

  if (uErr || !allUsers) {
    return alert("Gagal mengambil data peserta dari database: " + (uErr ? uErr.message : 'Data kosong'));
  }

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.name.toLowerCase().endsWith('.zip')) {
      try {
        const zip = await JSZip.loadAsync(file);
        for (const relativePath in zip.files) {
          const zipEntry = zip.files[relativePath];
          if (!zipEntry.dir && relativePath.toLowerCase().endsWith('.pdf')) {
            const blob = await zipEntry.async('blob');
            const cleanName = relativePath.split('/').pop();
            pdfFileList.push(new File([blob], cleanName, { type: 'application/pdf' }));
          }
        }
      } catch (e) {
        alert("Gagal mengurai file ZIP: " + e.message);
      }
    } else if (file.name.toLowerCase().endsWith('.pdf')) {
      pdfFileList.push(file);
    }
  }

  if (pdfFileList.length === 0) {
    return alert("Tidak ditemukan file PDF sertifikat yang valid!");
  }

  let sukses = 0;
  let gagalLog = [];

  for (const pdfFile of pdfFileList) {
    const rawFileName = pdfFile.name.replace(/\.[^/.]+$/, "");
    const cleanFileName = cleanStringForMatch(rawFileName);

    const matchedUser = allUsers.find(u => {
      const cleanId = cleanStringForMatch(u.id_sertifikat);
      const cleanUsername = cleanStringForMatch(u.username);
      return (cleanId && cleanFileName.includes(cleanId)) || 
             (cleanUsername && cleanFileName.includes(cleanUsername));
    });

    if (matchedUser) {
      const nameParts = rawFileName.split('_');
      let kodeTrainingDisplay = "K3";
      
      if (nameParts.length >= 3) {
        kodeTrainingDisplay = nameParts[1].toUpperCase();
      } else if (nameParts.length === 2 && isNaN(nameParts[1])) {
        kodeTrainingDisplay = nameParts[1].toUpperCase();
      }

      let judulSertifikat = `Sertifikat Pelatihan K3 - ${kodeTrainingDisplay}`;
      const storagePath = `${matchedUser.username}_${Date.now()}_${pdfFile.name.replace(/\s+/g, '_')}`;
      
      const { error: uploadErr } = await supabaseClient.storage
        .from('sertifikat')
        .upload(storagePath, pdfFile, { upsert: true });

      if (!uploadErr) {
        const { data: urlData } = supabaseClient.storage
          .from('sertifikat')
          .getPublicUrl(storagePath);

        const { error: insertErr } = await supabaseClient
          .from('certificates')
          .insert([{
            username: matchedUser.username,
            training_id: kodeTrainingDisplay,
            nama_sertifikat: judulSertifikat,
            url_sertifikat: urlData.publicUrl
          }]);

        if (!insertErr) {
          sukses++;
        } else {
          gagalLog.push(`${pdfFile.name} (Gagal catat ke tabel certificates: ${insertErr.message})`);
        }
      } else {
        gagalLog.push(`${pdfFile.name} (Gagal upload storage: ${uploadErr.message})`);
      }
    } else {
      gagalLog.push(`${pdfFile.name} (Gagal Match: nama/username tidak cocok)`);
    }
  }

  let pesanHasil = `✅ Selesai memproses ${sukses} dari ${pdfFileList.length} sertifikat!`;
  if (gagalLog.length > 0) {
    pesanHasil += `\n\nDetail kendala (${gagalLog.length} file):\n- ` + gagalLog.join('\n- ');
  }

  alert(pesanHasil);
  fileInput.value = '';
}

// ----------------------------------------------------
// 9. EXPORT REKAP ABSENSI PDF A4
// ----------------------------------------------------
async function downloadRekapBatchPDF() {
  const selectedBatchId = document.getElementById('adminSelectBatchRekap').value;
  if (!selectedBatchId) return alert("Harap pilih Batch Training terlebih dahulu!");

  const btn = document.getElementById('btnExportRekap');
  const originalText = btn.innerHTML;
  btn.innerText = "Generating PDF A4...";
  btn.disabled = true;

  try {
    const { data: trainingData } = await supabaseClient
      .from('trainings')
      .select('*')
      .eq('id', selectedBatchId)
      .single();

    if (!trainingData) return alert("Data batch tidak ditemukan!");

    const { data: pesertaList } = await supabaseClient
      .from('users')
      .select('*')
      .eq('training_id', selectedBatchId)
      .eq('role', 'peserta');

    if (!pesertaList || pesertaList.length === 0) {
      return alert("Belum ada peserta terdaftar di batch ini!");
    }

    const { data: logList } = await supabaseClient
      .from('log_absensi')
      .select('*')
      .eq('training_id', selectedBatchId);

    let listTanggal = [];
    if (trainingData.jadwal_tanggal && trainingData.jadwal_tanggal.length > 0) {
      listTanggal = [...trainingData.jadwal_tanggal].sort();
    } else if (trainingData.tgl_mulai && trainingData.tgl_selesai) {
      let start = new Date(trainingData.tgl_mulai);
      let end = new Date(trainingData.tgl_selesai);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        listTanggal.push(d.toISOString().split('T')[0]);
      }
    }

    const formatTanggalIndo = (dateStr) => {
      if (!dateStr) return '-';
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
      return dateStr;
    };

    const tglAwalIndo = formatTanggalIndo(listTanggal[0]);
    const tglAkhirIndo = formatTanggalIndo(listTanggal[listTanggal.length - 1]);

    const pdfContainer = document.getElementById('pdfExportContainer');
    pdfContainer.innerHTML = '';

    let fullHtml = `
      <style>
        .pdf-page-wrapper {
          width: 100%;
          padding: 8mm;
          background: #ffffff;
          box-sizing: border-box;
          page-break-after: always;
        }
        .pdf-header-kop {
          text-align: center;
          border-bottom: 2px solid #065f46;
          padding-bottom: 6px;
          margin-bottom: 10px;
        }
        .pdf-table-rekap {
          width: 100%;
          border-collapse: collapse;
          font-size: 10px;
        }
        .pdf-table-rekap th {
          background-color: #065f46;
          color: #ffffff;
          padding: 6px 4px;
          font-size: 9px;
          text-align: center;
          border: 1px solid #047857;
        }
        .pdf-table-rekap td {
          border: 1px solid #cbd5e1;
          padding: 6px 4px;
          vertical-align: middle;
        }
        .tr-peserta-row {
          page-break-inside: avoid !important;
        }
        .img-thumb-pdf {
          width: 40px;
          height: 40px;
          object-fit: cover;
          border-radius: 6px;
          display: block;
          margin: 0 auto 2px auto;
          border: 1px solid #cbd5e1;
        }
        .gps-text-pdf {
          font-size: 7.5px;
          color: #475569;
          text-align: center;
          margin-top: 1px;
          line-height: 1.1;
        }
      </style>
      <div id="pdfExportWrapper">
    `;

    listTanggal.forEach((dateStr, hIdx) => {
      const dateFormattedDDMMYYYY = formatTanggalIndo(dateStr);

      fullHtml += `
        <div class="pdf-page-wrapper">
          <div class="pdf-header-kop">
            <h2 style="font-size: 14px; font-weight: bold; color: #065f46; margin: 0;">PT MANDIRI MAHA DAYA</h2>
            <h3 style="font-size: 11px; font-weight: bold; margin: 2px 0; color: #1e293b;">LAPORAN REKAPITULASI KEHADIRAN PESERTA K3</h3>
            <p style="font-size: 10px; font-weight: bold; color: #047857; margin: 1px 0;">PROGRAM: ${trainingData.judul.toUpperCase()}</p>
            <p style="font-size: 8.5px; color: #64748b; margin: 0;">Jadwal Pelatihan: ${tglAwalIndo} s/d ${tglAkhirIndo} (${listTanggal.length} Hari Sesi)</p>
          </div>

          <div style="margin-bottom: 8px;">
            <h4 style="font-size: 9.5px; font-weight: bold; color: #065f46; background-color: #ecfdf5; padding: 5px 8px; border-left: 4px solid #047857; margin: 0; border-radius: 4px;">
              HARI KE-${hIdx + 1} : TANGGAL ${dateFormattedDDMMYYYY}
            </h4>
          </div>

          <table class="pdf-table-rekap">
            <thead>
              <tr>
                <th style="width: 5%;">NO</th>
                <th style="width: 25%;">NAMA PESERTA / NIK</th>
                <th style="width: 20%;">PERUSAHAAN</th>
                <th style="width: 20%;">SESI 1 (PAGI)</th>
                <th style="width: 20%;">SESI 2 (SIANG)</th>
                <th style="width: 10%;">STATUS</th>
              </tr>
            </thead>
            <tbody>
      `;

      pesertaList.forEach((p, pIdx) => {
        const absS1 = (logList || []).find(l => l.username === p.username && l.tanggal === dateStr && Number(l.sesi) === 1);
        const absS2 = (logList || []).find(l => l.username === p.username && l.tanggal === dateStr && Number(l.sesi) === 2);

        let displayS1 = `<span style="color: #dc2626; font-size: 8.5px; display: block; text-align: center; font-weight: 600;">Belum Absen</span>`;
        if (absS1) {
          const jamTxt = formatJamLokalPerangkat(absS1.waktu_absen);
          const gpsTxt = (absS1.latitude && absS1.longitude) 
            ? `📍 ${Number(absS1.latitude).toFixed(4)}, ${Number(absS1.longitude).toFixed(4)}`
            : `📍 Lokasi N/A`;
          
          const imgHtml = absS1.foto ? `<img src="${absS1.foto}" class="img-thumb-pdf">` : '';
          displayS1 = `
            ${imgHtml}
            <div style="text-align: center;">
              <span style="font-size: 8px; font-weight: bold; color: #065f46;">Jam: ${jamTxt}</span>
              <div class="gps-text-pdf">${gpsTxt}</div>
            </div>
          `;
        }

        let displayS2 = `<span style="color: #dc2626; font-size: 8.5px; display: block; text-align: center; font-weight: 600;">Belum Absen</span>`;
        if (absS2) {
          const jamTxt = formatJamLokalPerangkat(absS2.waktu_absen);
          const gpsTxt = (absS2.latitude && absS2.longitude) 
            ? `📍 ${Number(absS2.latitude).toFixed(4)}, ${Number(absS2.longitude).toFixed(4)}`
            : `📍 Lokasi N/A`;
          
          const imgHtml = absS2.foto ? `<img src="${absS2.foto}" class="img-thumb-pdf">` : '';
          displayS2 = `
            ${imgHtml}
            <div style="text-align: center;">
              <span style="font-size: 8px; font-weight: bold; color: #065f46;">Jam: ${jamTxt}</span>
              <div class="gps-text-pdf">${gpsTxt}</div>
            </div>
          `;
        }

        let statusStr = `<span style="color: #64748b; font-weight: bold; font-size: 8.5px;">0%</span>`;
        if (absS1 && absS2) statusStr = `<span style="color: #047857; font-weight: bold; font-size: 8.5px;">100%</span>`;
        else if (absS1 || absS2) statusStr = `<span style="color: #2563eb; font-weight: bold; font-size: 8.5px;">50%</span>`;

        fullHtml += `
          <tr class="tr-peserta-row">
            <td style="text-align: center; font-weight: bold; color: #64748b;">${pIdx + 1}</td>
            <td>
              <b style="color: #1e293b;">${p.nama}</b><br>
              <span style="font-size: 7.5px; color: #64748b;">NIK: ${p.nik || '-'}</span>
            </td>
            <td style="color: #334155;">${p.perusahaan || '-'}</td>
            <td>${displayS1}</td>
            <td>${displayS2}</td>
            <td style="text-align: center;">${statusStr}</td>
          </tr>
        `;
      });

      fullHtml += `
            </tbody>
          </table>

          <div style="margin-top: 10px; font-size: 7.5px; color: #94a3b8; text-align: right;">
            PT Mandiri Maha Daya • Halaman ${hIdx + 1} dari ${listTanggal.length}
          </div>
        </div>
      `;
    });

    fullHtml += `</div>`;
    pdfContainer.innerHTML = fullHtml;

    const element = document.getElementById('pdfExportWrapper');
    const opt = {
      margin:       5,
      filename:     `Laporan_Kehadiran_${selectedBatchId}_A4.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, scrollY: 0, scrollX: 0 },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    await html2pdf().set(opt).from(element).save();

    alert(`✅ Laporan PDF Rekapitulasi Berhasil Diunduh!`);

  } catch (err) {
    alert("Terjadi kesalahan export PDF: " + err.message);
  } finally {
    btn.innerHTML = originalText;
    btn.disabled = false;
  }
}

// ----------------------------------------------------
// 10. FITUR FILTER & EDIT PESERTA DATABASE
// ----------------------------------------------------
async function onSKPFilterChange() {
  const selectSKP = document.getElementById('dbFilterSKP');
  const selectBatch = document.getElementById('dbFilterBatch');
  
  if (!selectBatch) return;
  const selectedSKP = selectSKP ? selectSKP.value : '';
  selectBatch.innerHTML = '<option value="">-- Semua Batch --</option>';

  const { data } = await supabaseClient.from('trainings').select('*');
  if (!data) return;

  let filteredBatches = selectedSKP 
    ? data.filter(b => b.master_training_id === selectedSKP || b.id.startsWith(selectedSKP))
    : data;

  filteredBatches = sortBatchesDescending(filteredBatches);

  filteredBatches.forEach(b => {
    selectBatch.innerHTML += `<option value="${b.id}">${b.judul}</option>`;
  });

  loadDatabasePeserta();
}

async function loadDatabasePeserta() {
  const selectSKP = document.getElementById('dbFilterSKP');
  const selectBatch = document.getElementById('dbFilterBatch');
  
  const selectedSKP = selectSKP ? selectSKP.value : '';
  const selectedBatch = selectBatch ? selectBatch.value : '';
  const tbody = document.getElementById('tbodyDatabasePeserta');

  if (!tbody) return;
  tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-slate-400">Memuat data peserta...</td></tr>';

  let query = supabaseClient.from('users').select('*, trainings(*)').eq('role', 'peserta');

  if (selectedBatch) {
    query = query.eq('training_id', selectedBatch);
  }

  const { data: pesertaList, error } = await query;

  if (error || !pesertaList || pesertaList.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-slate-400 italic">Tidak ada data peserta ditemukan.</td></tr>';
    return;
  }

  let resultList = pesertaList;
  if (selectedSKP && !selectedBatch) {
    resultList = pesertaList.filter(p => {
      const masterId = p.trainings?.master_training_id || '';
      const tId = p.training_id || '';
      return masterId === selectedSKP || tId.startsWith(selectedSKP);
    });
  }

  if (resultList.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-slate-400 italic">Tidak ada peserta untuk program ini.</td></tr>';
    return;
  }

  const { data: allLogs } = await supabaseClient.from('log_absensi').select('*');

  tbody.innerHTML = '';
  resultList.forEach((p, idx) => {
    const training = p.trainings;
    let listTanggal = training?.jadwal_tanggal || [];
    const totalSesiWajib = listTanggal.length * 2;

    const userLogs = (allLogs || []).filter(l => l.username === p.username);
    const totalAbsenHadir = userLogs.length;

    let persenProgres = 0;
    if (totalSesiWajib > 0) {
      persenProgres = Math.min(100, Math.round((totalAbsenHadir / totalSesiWajib) * 100));
    } else if (totalAbsenHadir > 0) {
      persenProgres = 100;
    }

    let badgeProgres = `<span class="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold text-[10px]">0% (0/${totalSesiWajib} Sesi)</span>`;
    if (persenProgres === 100) {
      badgeProgres = `<span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold text-[10px]">✓ 100% Selesai</span>`;
    } else if (persenProgres > 0) {
      badgeProgres = `<span class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold text-[10px]">${persenProgres}% (${totalAbsenHadir}/${totalSesiWajib} Sesi)</span>`;
    }

    const userDataJson = JSON.stringify(p).replace(/'/g, "&apos;").replace(/"/g, "&quot;");

    tbody.innerHTML += `
      <tr class="hover:bg-slate-50 transition border-b border-slate-100">
        <td class="p-3 text-center font-bold text-slate-400">${idx + 1}</td>
        <td class="p-3">
          <p class="font-bold text-slate-800">${p.nama || '-'}</p>
          <p class="text-[10px] text-slate-400">NIK: ${p.nik || '-'}</p>
        </td>
        <td class="p-3 font-mono text-[11px]">
          <span class="text-emerald-700 font-bold">User:</span> ${p.username}<br>
          <span class="text-amber-700 font-bold">Pass:</span> ${p.password}
        </td>
        <td class="p-3 font-medium text-slate-700">${p.perusahaan || '-'}</td>
        <td class="p-3">
          <span class="bg-slate-100 text-slate-700 font-bold text-[10px] px-2 py-1 rounded-md border border-slate-200">
            ${training?.judul || p.training_id || '-'}
          </span>
        </td>
        <td class="p-3 text-center">${badgeProgres}</td>
        <td class="p-3 text-center">
          <button onclick='bukaModalEditPeserta(${userDataJson})' class="bg-amber-100 hover:bg-amber-200 text-amber-800 text-[10px] px-2.5 py-1.5 rounded-lg font-bold border border-amber-300 transition flex items-center gap-1 mx-auto">
            <i class="fa-solid fa-pen-to-square"></i> Edit
          </button>
        </td>
      </tr>
    `;
  });
}

// Buka Modal Edit Peserta
async function bukaModalEditPeserta(user) {
  document.getElementById('editOriginalUsername').value = user.username;
  document.getElementById('editNama').value = user.nama || '';
  document.getElementById('editNIK').value = user.nik || '';
  
  let tglLahirFormatted = '';
  if (user.tgl_lahir) {
    const parts = user.tgl_lahir.split('-');
    if (parts.length === 3) tglLahirFormatted = `${parts[2]}-${parts[1]}-${parts[0]}`;
    else tglLahirFormatted = user.tgl_lahir;
  }
  document.getElementById('editTglLahir').value = tglLahirFormatted;
  
  document.getElementById('editUsername').value = user.username || '';
  document.getElementById('editPassword').value = user.password || '';
  document.getElementById('editPerusahaan').value = user.perusahaan || '';

  const selectBatch = document.getElementById('editSelectBatch');
  selectBatch.innerHTML = '<option value="">-- Pilih Batch Pelatihan --</option>';

  const { data: batches } = await supabaseClient.from('trainings').select('*');
  if (batches) {
    const sorted = sortBatchesDescending([...batches]);
    sorted.forEach(b => {
      selectBatch.innerHTML += `<option value="${b.id}">${b.judul}</option>`;
    });
  }
  selectBatch.value = user.training_id || '';

  document.getElementById('modalEditPeserta').classList.remove('hidden');
}

// Tutup Modal
function tutupModalEditPeserta() {
  document.getElementById('modalEditPeserta').classList.add('hidden');
}

// Simpan Perubahan Edit Peserta
async function simpanPerubahanPeserta() {
  const originalUsername = document.getElementById('editOriginalUsername').value;
  const nama = document.getElementById('editNama').value.trim();
  const nik = document.getElementById('editNIK').value.trim();
  const tglLahirRaw = document.getElementById('editTglLahir').value.trim();
  const username = document.getElementById('editUsername').value.trim().toLowerCase();
  const password = document.getElementById('editPassword').value.trim();
  const perusahaan = document.getElementById('editPerusahaan').value.trim();
  const trainingId = document.getElementById('editSelectBatch').value;

  if (!nama || !username || !password || !trainingId) {
    return alert("Harap lengkapi Nama, Username, Password, dan Batch Pelatihan!");
  }

  let formattedDateForDb = '';
  const digits = tglLahirRaw.replace(/[^0-9]/g, '');
  if (digits.length === 8) {
    const d = digits.substring(0, 2);
    const m = digits.substring(2, 4);
    const y = digits.substring(4, 8);
    formattedDateForDb = `${y}-${m}-${d}`;
  } else if (tglLahirRaw.includes('-')) {
    const parts = tglLahirRaw.split('-');
    if (parts.length === 3 && parts[0].length === 2) {
      formattedDateForDb = `${parts[2]}-${parts[1]}-${parts[0]}`;
    } else {
      formattedDateForDb = tglLahirRaw;
    }
  } else {
    formattedDateForDb = tglLahirRaw;
  }

  const idSertifikat = `${username}_${password}`;

  const btn = document.getElementById('btnSimpanEditPeserta');
  const originalText = btn ? btn.innerHTML : '';
  if (btn) {
    btn.innerText = "Menyimpan...";
    btn.disabled = true;
  }

  try {
    const updatedUser = {
      username: username,
      password: password,
      nama: nama,
      nik: nik || '-',
      tgl_lahir: formattedDateForDb,
      perusahaan: perusahaan || 'PT Mandiri Maha Daya',
      training_id: trainingId,
      id_sertifikat: idSertifikat
    };

    const { error } = await supabaseClient
      .from('users')
      .update(updatedUser)
      .eq('username', originalUsername);

    if (error) {
      alert("Gagal memperbarui data peserta: " + error.message);
    } else {
      alert("✅ Data peserta berhasil diperbarui!");
      tutupModalEditPeserta();
      loadDatabasePeserta();
    }
  } catch (err) {
    alert("Terjadi kesalahan sistem: " + err.message);
  } finally {
    if (btn) {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  }
}

// ----------------------------------------------------
// 11. DAFTAR MASTER KATALOG MODUL LENGKAP (29 PROGRAM)
// ----------------------------------------------------
const KATALOG_MODUL_MASTER = [
  // ====================================================
  // KELOMPOK 1: PEMBINAAN K3 KEMNAKER RI (23 PROGRAM)
  // ====================================================
  {
    master_id: "AK3U",
    kategori: "KEMNAKER",
    nama_program: "AK3U - Kemnaker RI",
    deskripsi: "Pembinaan & Lisensi Ahli K3 Umum Kemnaker RI"
  },
  {
    master_id: "P3K",
    kategori: "KEMNAKER",
    nama_program: "P3K - Kemnaker RI",
    deskripsi: "Pertolongan Pertama Pada Kecelakaan Kerja Kemnaker RI"
  },
  {
    master_id: "TKBT1",
    kategori: "KEMNAKER",
    nama_program: "TKBT 1 - Kemnaker RI",
    deskripsi: "Tenaga Kerja Bangunan Tinggi Tingkat 1 Kemnaker RI"
  },
  {
    master_id: "TKBT2",
    kategori: "KEMNAKER",
    nama_program: "TKBT 2 - Kemnaker RI",
    deskripsi: "Tenaga Kerja Bangunan Tinggi Tingkat 2 Kemnaker RI"
  },
  {
    master_id: "TKPK1",
    kategori: "KEMNAKER",
    nama_program: "TKPK 1 - Kemnaker RI",
    deskripsi: "Tenaga Kerja Pada Ketinggian Tingkat 1 Kemnaker RI"
  },
  {
    master_id: "TKPK2",
    kategori: "KEMNAKER",
    nama_program: "TKPK 2 - Kemnaker RI",
    deskripsi: "Tenaga Kerja Pada Ketinggian Tingkat 2 Kemnaker RI"
  },
  {
    master_id: "TKPK3",
    kategori: "KEMNAKER",
    nama_program: "TKPK 3 - Kemnaker RI",
    deskripsi: "Tenaga Kerja Pada Ketinggian Tingkat 3 Kemnaker RI"
  },
  {
    master_id: "GONDOLA",
    kategori: "KEMNAKER",
    nama_program: "Operator Gondola - Kemnaker RI",
    deskripsi: "Pengoperasian & Keselamatan Operator Gondola Kemnaker RI"
  },
  {
    master_id: "TEKNISI-LISTRIK",
    kategori: "KEMNAKER",
    nama_program: "Teknisi K3 Listrik - Kemnaker RI",
    deskripsi: "Pembinaan Teknisi Keselamatan Listrik Kemnaker RI"
  },
  {
    master_id: "AHLI-LISTRIK",
    kategori: "KEMNAKER",
    nama_program: "Ahli K3 Listrik - Kemnaker RI",
    deskripsi: "Pembinaan & Lisensi Ahli K3 Listrik Kemnaker RI"
  },
  {
    master_id: "TEKNISI-PERANCAH",
    kategori: "KEMNAKER",
    nama_program: "Teknisi Perancah - Kemnaker RI",
    deskripsi: "Pemasangan & Pembongkaran Perancah Kemnaker RI"
  },
  {
    master_id: "SUPERVISI-PERANCAH",
    kategori: "KEMNAKER",
    nama_program: "Supervisi Perancah - Kemnaker RI",
    deskripsi: "Pengawasan & Inspeksi Keselamatan Perancah Kemnaker RI"
  },
  {
    master_id: "AHLI-UTAMA-KONSTRUKSI",
    kategori: "KEMNAKER",
    nama_program: "Ahli Utama K3 Konstruksi - Kemnaker RI",
    deskripsi: "Manajemen K3 Konstruksi Tingkat Utama Kemnaker RI"
  },
  {
    master_id: "AHLI-MADYA-KONSTRUKSI",
    kategori: "KEMNAKER",
    nama_program: "Ahli Madya K3 Konstruksi - Kemnaker RI",
    deskripsi: "Manajemen K3 Konstruksi Tingkat Madya Kemnaker RI"
  },
  {
    master_id: "AHLI-MUDA-KONSTRUKSI",
    kategori: "KEMNAKER",
    nama_program: "Ahli Muda K3 Konstruksi - Kemnaker RI",
    deskripsi: "Pelaksanaan K3 Proyek Konstruksi Kemnaker RI"
  },
  {
    master_id: "OPERATOR-ELEVATOR",
    kategori: "KEMNAKER",
    nama_program: "Operator Elevator - Kemnaker RI",
    deskripsi: "Pengoperasian & Keselamatan Lift Kemnaker RI"
  },
  {
    master_id: "TEKNISI-ELEVATOR",
    kategori: "KEMNAKER",
    nama_program: "Teknisi Elevator - Kemnaker RI",
    deskripsi: "Pemeliharaan & Perbaikan Elevator Kemnaker RI"
  },
  {
    master_id: "TEKNISI-CONFINED-SPACE",
    kategori: "KEMNAKER",
    nama_program: "Teknisi Ruang Terbatas - Kemnaker RI",
    deskripsi: "Teknisi K3 Pekerjaan Ruang Terbatas Kemnaker RI"
  },
  {
    master_id: "RESCUE-CONFINED-SPACE",
    kategori: "KEMNAKER",
    nama_program: "Petugas Rescue Ruang Terbatas - Kemnaker RI",
    deskripsi: "Evakuasi & Penyelamatan Ruang Terbatas Kemnaker RI"
  },
  {
    master_id: "GAS-DETECTOR",
    kategori: "KEMNAKER",
    nama_program: "Petugas Gas Detector - Kemnaker RI",
    deskripsi: "Pengukuran Gas Berbahaya di Tempat Kerja Kemnaker RI"
  },
  {
    master_id: "FORKLIFT",
    kategori: "KEMNAKER",
    nama_program: "Operator Forklift - Kemnaker RI",
    deskripsi: "Pengoperasian & Keselamatan Forklift Kemnaker RI"
  },
  {
    master_id: "ESKAVATOR",
    kategori: "KEMNAKER",
    nama_program: "Operator Eskavator - Kemnaker RI",
    deskripsi: "Pengoperasian Alat Berat Eskavator Kemnaker RI"
  },
  {
    master_id: "GRIDER",
    kategori: "KEMNAKER",
    nama_program: "Operator Grider - Kemnaker RI",
    deskripsi: "Pengoperasian Motor Grader Alat Berat Kemnaker RI"
  },

  // ====================================================
  // KELOMPOK 2: SERTIFIKASI KOMPETENSI BNSP (6 PROGRAM)
  // ====================================================
  {
    master_id: "BNSP-AK3U",
    kategori: "BNSP",
    nama_program: "AK3U - BNSP",
    deskripsi: "Sertifikasi Kompetensi Ahli K3 Umum BNSP"
  },
  {
    master_id: "BNSP-TKPK1",
    kategori: "BNSP",
    nama_program: "TKPK 1 - BNSP",
    deskripsi: "Sertifikasi BNSP Tenaga Kerja Pada Ketinggian 1"
  },
  {
    master_id: "BNSP-TKPK2",
    kategori: "BNSP",
    nama_program: "TKPK 2 - BNSP",
    deskripsi: "Sertifikasi BNSP Tenaga Kerja Pada Ketinggian 2"
  },
  {
    master_id: "BNSP-TKPK3",
    kategori: "BNSP",
    nama_program: "TKPK 3 - BNSP",
    deskripsi: "Sertifikasi BNSP Tenaga Kerja Pada Ketinggian 3"
  },
  {
    master_id: "BNSP-TKBT1",
    kategori: "BNSP",
    nama_program: "TKBT 1 - BNSP",
    deskripsi: "Sertifikasi BNSP Tenaga Kerja Bangunan Tinggi 1"
  },
  {
    master_id: "BNSP-TKBT2",
    kategori: "BNSP",
    nama_program: "TKBT 2 - BNSP",
    deskripsi: "Sertifikasi BNSP Tenaga Kerja Bangunan Tinggi 2"
  }
];

// Populate Dropdown Admin untuk Upload Materi Training
function loadDropdownMasterModulAdmin() {
  const select = document.getElementById('adminSelectMasterModul');
  if (!select) return;
  select.innerHTML = '<option value="">-- Pilih Judul Training --</option>';
  KATALOG_MODUL_MASTER.forEach(m => {
    select.innerHTML += `<option value="${m.master_id}">${m.nama_program}</option>`;
  });
}

// Upload File Materi ke Supabase Storage & Database (Admin)
async function uploadMateriTrainingAdmin() {
  const masterId = document.getElementById('adminSelectMasterModul').value;
  const fileInput = document.getElementById('fileMateriTraining');
  const file = fileInput ? fileInput.files[0] : null;

  if (!masterId) return alert("Harap pilih Judul Training terlebih dahulu!");
  if (!file) return alert("Harap pilih file PDF, PPT, RAR, atau ZIP!");

  const btn = document.getElementById('btnUploadMateri');
  const originalText = btn ? btn.innerHTML : '';
  if (btn) {
    btn.innerText = "Mengunggah File...";
    btn.disabled = true;
  }

  try {
    const fileExt = file.name.split('.').pop();
    const storagePath = `modul_${masterId}_${Date.now()}.${fileExt}`;

    const { error: uploadErr } = await supabaseClient.storage
      .from('sertifikat')
      .upload(storagePath, file, { upsert: true });

    if (uploadErr) throw uploadErr;

    const { data: urlData } = supabaseClient.storage.from('sertifikat').getPublicUrl(storagePath);

    const { error: insertErr } = await supabaseClient.from('training_modules').insert([{
      master_id: masterId,
      file_name: file.name,
      file_url: urlData.publicUrl,
      file_type: fileExt.toLowerCase()
    }]);

    if (insertErr) throw insertErr;

    alert(`✅ File "${file.name}" berhasil diunggah ke folder modul ${masterId}!`);
    if (fileInput) fileInput.value = '';
    document.getElementById('adminSelectMasterModul').value = '';

  } catch (err) {
    alert("Gagal mengunggah file materi: " + err.message);
  } finally {
    if (btn) {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  }
}

// ----------------------------------------------------
// LOGIKA RENDER FOLDER MODUL DENGAN AKSES TERKUNCI/TERBUKA
// ----------------------------------------------------
async function loadKatalogModulPeserta() {
  const container = document.getElementById('containerFolderModul');
  if (!container || !currentSessionUser) return;

  container.innerHTML = '<p class="text-xs text-slate-400 text-center col-span-full py-4">Mengecek histori pelatihan kamu...</p>';

  try {
    const setHistoriTraining = new Set();

    if (currentSessionUser.training_id) {
      setHistoriTraining.add(currentSessionUser.training_id.toUpperCase());
    }

    const { data: logs } = await supabaseClient.from('log_absensi').select('training_id').eq('username', currentSessionUser.username);
    if (logs) logs.forEach(l => { if (l.training_id) setHistoriTraining.add(l.training_id.toUpperCase()); });

    const { data: certs } = await supabaseClient.from('certificates').select('training_id').eq('username', currentSessionUser.username);
    if (certs) certs.forEach(c => { if (c.training_id) setHistoriTraining.add(c.training_id.toUpperCase()); });

    const listHistoriUser = Array.from(setHistoriTraining);

    const listKemnaker = KATALOG_MODUL_MASTER.filter(m => m.kategori === 'KEMNAKER');
    const listBNSP = KATALOG_MODUL_MASTER.filter(m => m.kategori === 'BNSP');

    function renderCardHTML(modul) {
      const isUnlocked = listHistoriUser.some(tId => {
        const cleanTId = cleanStringForMatch(tId);
        const cleanMId = cleanStringForMatch(modul.master_id);
        const cleanProgramName = cleanStringForMatch(modul.nama_program);
        return cleanTId.includes(cleanMId) || cleanTId.includes(cleanProgramName);
      });

      if (isUnlocked) {
        return `
          <div onclick="bukaModalFolderModul('${modul.master_id}', '${modul.nama_program}')" class="bg-white border-2 border-emerald-500/40 rounded-2xl p-4 shadow-sm hover:shadow-md cursor-pointer transition relative overflow-hidden group">
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg font-bold group-hover:scale-105 transition">
                  <i class="fa-solid fa-folder-open"></i>
                </div>
                <div>
                  <span class="bg-emerald-100 text-emerald-800 text-[9px] font-extrabold px-2 py-0.5 rounded-full">AKSES TERBUKA</span>
                  <h4 class="text-xs font-bold text-slate-800 mt-1">${modul.nama_program}</h4>
                </div>
              </div>
            </div>
            <p class="text-[10px] text-slate-500 mt-2">${modul.deskripsi}</p>
            
            <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px]">
              <span class="text-emerald-700 font-bold flex items-center gap-1">Klik untuk buka isi folder <i class="fa-solid fa-arrow-right-long ml-1"></i></span>
            </div>
          </div>
        `;
      } else {
        return `
          <div onclick="peringatanModulTerkunci('${modul.nama_program}')" class="bg-slate-50 border border-slate-200 rounded-2xl p-4 cursor-pointer hover:border-slate-300 transition relative overflow-hidden group">
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-slate-200 text-slate-500 flex items-center justify-center text-lg font-bold group-hover:scale-105 transition">
                  <i class="fa-solid fa-folder-minus"></i>
                </div>
                <div>
                  <span class="bg-slate-200 text-slate-600 text-[9px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 w-max">
                    <i class="fa-solid fa-lock text-[8px]"></i> TERKUNCI
                  </span>
                  <h4 class="text-xs font-bold text-slate-600 mt-1">${modul.nama_program}</h4>
                </div>
              </div>
            </div>
            <p class="text-[10px] text-slate-400 mt-2">${modul.deskripsi}</p>
            
            <div class="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
              <span>🔒 Kunci Modul Otomatis</span>
              <span class="text-emerald-700 font-bold group-hover:underline">Info Akses <i class="fa-solid fa-chevron-right text-[8px]"></i></span>
            </div>
          </div>
        `;
      }
    }

    container.innerHTML = `
      <!-- KELOMPOK 1: KEMNAKER RI -->
      <div class="col-span-full border-b border-slate-200 pb-2 mb-2">
        <h3 class="text-xs font-bold text-emerald-900 uppercase tracking-wide flex items-center gap-2">
          <i class="fa-solid fa-building-columns text-emerald-700"></i> Modul Pembinaan K3 Kemnaker RI (${listKemnaker.length} Program)
        </h3>
      </div>
      ${listKemnaker.map(m => renderCardHTML(m)).join('')}

      <!-- KELOMPOK 2: BNSP -->
      <div class="col-span-full border-b border-slate-200 pb-2 mb-2 mt-6">
        <h3 class="text-xs font-bold text-emerald-900 uppercase tracking-wide flex items-center gap-2">
          <i class="fa-solid fa-award text-emerald-700"></i> Modul Sertifikasi BNSP (${listBNSP.length} Program)
        </h3>
      </div>
      ${listBNSP.map(m => renderCardHTML(m)).join('')}
    `;

  } catch (err) {
    container.innerHTML = '<p class="text-xs text-red-500 text-center col-span-full py-4">Gagal memuat modul pelatihan.</p>';
  }
}

// BUKA MODAL POP-UP ISI FOLDER MODUL (SISI PESERTA)
async function bukaModalFolderModul(masterId, namaProgram) {
  const modalJudul = document.getElementById('modalJudulFolder');
  if (modalJudul) modalJudul.innerText = namaProgram;

  const container = document.getElementById('containerListFileFolder');
  if (container) {
    container.innerHTML = '<p class="text-xs text-slate-400 text-center py-4">Memuat materi & modul pembelajaran...</p>';
  }

  const modalEl = document.getElementById('modalIsiFolderModul');
  if (modalEl) modalEl.classList.remove('hidden');

  try {
    const { data: files, error } = await supabaseClient
      .from('training_modules')
      .select('*')
      .eq('master_id', masterId)
      .order('created_at', { ascending: false });

    if (error || !files || files.length === 0) {
      if (container) {
        container.innerHTML = `
          <div class="text-center py-8">
            <i class="fa-solid fa-folder-open text-slate-300 text-4xl mb-2"></i>
            <p class="text-xs font-bold text-slate-500">Belum ada modul/materi yang diunggah.</p>
            <p class="text-[10px] text-slate-400 mt-1">Panitia akan mengunggah materi pembelajaran secara bertahap.</p>
          </div>
        `;
      }
      return;
    }

    if (container) {
      container.innerHTML = '';
      files.forEach(f => {
        let iconClass = "fa-file-pdf text-red-600";
        const fileTypeLower = (f.file_type || '').toLowerCase();
        if (fileTypeLower === 'ppt' || fileTypeLower === 'pptx') iconClass = "fa-file-powerpoint text-amber-600";
        else if (fileTypeLower === 'rar' || fileTypeLower === 'zip') iconClass = "fa-file-zipper text-indigo-600";

        container.innerHTML += `
          <div class="flex items-center justify-between p-3 bg-slate-50 hover:bg-emerald-50 rounded-xl text-xs transition border border-slate-200">
            <div class="flex items-center gap-3 truncate pr-2">
              <i class="fa-solid ${iconClass} text-xl"></i>
              <div class="truncate">
                <p class="font-bold text-slate-800 truncate">${f.file_name}</p>
                <span class="text-[9px] text-slate-400 uppercase font-semibold">Tipe File: ${f.file_type || 'PDF'}</span>
              </div>
            </div>
            <a href="${f.file_url}" target="_blank" download class="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition flex items-center gap-1.5 shadow-sm">
              <i class="fa-solid fa-download"></i> Unduh
            </a>
          </div>
        `;
      });
    }

  } catch (err) {
    if (container) {
      container.innerHTML = '<p class="text-xs text-red-500 text-center py-4">Gagal memuat isi modul.</p>';
    }
  }
}

function tutupModalFolderModul() {
  const modalEl = document.getElementById('modalIsiFolderModul');
  if (modalEl) modalEl.classList.add('hidden');
}

function peringatanModulTerkunci(namaProgram) {
  alert(`🔒 AKSES MODUL TERKUNCI!\n\nModul "${namaProgram}" hanya dapat diakses oleh peserta yang pernah mengikuti/terdaftar pada pelatihan ini di PT Mandiri Maha Daya.`);
}

// ----------------------------------------------------
// EKSPOR FUNGSI KE SCOPE GLOBAL
// ----------------------------------------------------
window.switchTabAdmin = function(tabName) {
  document.querySelectorAll('.tab-admin-content').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.tab-admin-btn').forEach(el => {
    el.classList.remove('bg-emerald-800', 'text-white');
    el.classList.add('hover:bg-slate-100');
  });

  if (tabName === 'kelola') {
    document.getElementById('tabAdminKelola').classList.remove('hidden');
    document.getElementById('tabBtnAdminKelola').classList.add('bg-emerald-800', 'text-white');
  } else if (tabName === 'database') {
    document.getElementById('tabAdminDatabase').classList.remove('hidden');
    document.getElementById('tabBtnAdminDatabase').classList.add('bg-emerald-800', 'text-white');
    onSKPFilterChange();
  }
};

window.prosesLogin = prosesLogin;
window.logout = logout;
window.switchTabPeserta = switchTabPeserta;
window.ambilAbsen = ambilAbsen;
window.simpanBatchTraining = simpanBatchTraining;
window.importExcelPeserta = importExcelPeserta;
window.simpanPesertaManual = simpanPesertaManual;
window.uploadSertifikatMasal = uploadSertifikatMasal;
window.downloadRekapBatchPDF = downloadRekapBatchPDF;
window.onSKPFilterChange = onSKPFilterChange;
window.loadDatabasePeserta = loadDatabasePeserta;
window.bukaModalEditPeserta = bukaModalEditPeserta;
window.tutupModalEditPeserta = tutupModalEditPeserta;
window.simpanPerubahanPeserta = simpanPerubahanPeserta;
window.loadKatalogModulPeserta = loadKatalogModulPeserta;
window.peringatanModulTerkunci = peringatanModulTerkunci;
window.uploadMateriTrainingAdmin = uploadMateriTrainingAdmin;
window.bukaModalFolderModul = bukaModalFolderModul;
window.tutupModalFolderModul = tutupModalFolderModul;
