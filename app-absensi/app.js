// ====================================================
// KONFIGURASI GOOGLE DRIVE API (SERVICE ACCOUNT)
// ====================================================
const GDRIVE_CONFIG = {
  client_email: "portal-mmd-uploader@portal-sertifikat-mmd.iam.gserviceaccount.com",
  private_key: "-----BEGIN PRIVATE KEY-----\n" +
    "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDUdqFtrjK/I1YK\n" +
    "cPHng0wrGm3d0ZuCyicxm8OX/rZV69h2mZDgXbugEnfAYNNzk2DpFoYUXI0C5IAt\n" +
    "yile+sZEqdHsJRBOHeyJIf3f7E5fNjPY7dA1CqH/zGR5GKK5PpgXsX5GFj5iW2cz\n" +
    "BJghg4yu2G+jo94aIZyDsCf7WrIRd4LSh7xKPxm5tzf5qVrg/ozHOGUdleWJsSNT\n" +
    "3D/hwQp7uEw0zQn30KejzDPDIW/2a+IY3F7oTvgGUBYvcF4Lj+YyomkwfdJKtFAB\n" +
    "X+o1SGw2WcBSRHwBEFGvjuApTrQctoIVlYcvFSD3HUy8QV3bqrF0yGyoA2V7HTi+\n" +
    "0UWQyI0DAgMBAAECggEAInsOP8qhmbuWXyNtXvFED0q+wd0eq9869SYeXDCOTutz\n" +
    "ueu6Q29y38ufe607I+qrM6jgIbXTfMCwvL2ucSepvcMBup1ZRBQ/KxJFLW4gWftl\n" +
    "9rLBs5oCKI13UN/aqM2ryUyY/a7mePf0i6cXOXkr/8RIefpCNWN3DzgrhPN3KrY6\n" +
    "whE5AhGZnm681/4C10nUEa5z/0szQN4tK7SxzefTRKSaYzvnOgUehoFzHIqqijb/\n" +
    "KXhzxTVFOOupbR2urq4SIXxls21LLqiqo4lkaDQ3PN3KCFL1C8fTCvhNEP5GFB4R\n" +
    "nJnWhYM3kRNK3wLH+FqVXO5aV6UKwXwWS0aPZeqpgQKBgQD33/a/K+e0+nmRiIpA\n" +
    "kjVRx3xWhIg1I2xdk+L0ayZw+4H5pMxF5sTKKQjaJ8SFTDuhc04UrQsMZaph3S8x\n" +
    "ugADi5yhiNJGw6tLJScmqe7tLuEZKHsIOPVKm9wv/o+LeTLmjy9IIAgkFWwvmX5e\n" +
    "j710aCu1nWJyBd1NCC5lb4qEUwKBgQDbbYMlqwkIIMK43H9oW2HYOxOg5YQ9osrW\n" +
    "Q6K0oZm0cnKdeEOF01MYy4o4Dfxfhgw2PNDiNm0qJ5snWnWmGZtrR6XPvxbtWImE\n" +
    "bA77J2Y32sYuq4tSHXtt1VOQ2IrOd1HKcZ3qWdDil0we6NwNwkkkOLa6K6qd/+qH\n" +
    "T+Npsqq+kQKBgQCNgfh1rvT6prvcT5zNvCpgY4giREsWOwDUc2bvrnQlsA/Fm0Va\n" +
    "6qGR39dD48wXZSvtwcvjld5m12trr0AQHWWAoKVsupWA/Je/sJgnRIA4O7kaCbgj\n" +
    "O5EdZNlRNPxx3WEnqrqNbGv5XZmDmxc/mMPJvualKhJXke2C2pbSJdloLQKBgQC0\n" +
    "DNhgQEfY84jUR5oD93gCBffFPo+UQ9BMoJMRxMhq2L5TmCtP1GeLIPj5pgBAIa5D\n" +
    "kwOTmzVYMceOMxv2f2yYSuIz5YjamJu+nSxtyZaGnm2gPgLEDo0JQtKfOBAt+pqS\n" +
    "k0gQ1EIirCM5+bkXUSTTI/ZMLSiDHUtEXLkuMf0JAQKBgBMQ/QxkpDS7IB+/0Mrl\n" +
    "e12G9N7UgFLgqp38vPAJZ7xfpLiiXiOwojqF262QsRGgiNI6/L32FMsAA3o3TEyX\n" +
    "ZVd6XBIhlRNWXwtVZQYcm/gxYkxdyw6iV6+arT1qq7lv3WzHSrtJdpzkcKsRxH9T\n" +
    "fCLZEu8DeVbwS7Pno0eUsW2c\n" +
    "-----END PRIVATE KEY-----\n",
  folder_id_sertifikat: "1RFyhPurZf3G1JEo4xkUEKxuyqcNQfA3Q"
};

// ----------------------------------------------------
// 1. INISIALISASI SUPABASE
// ----------------------------------------------------
const SUPABASE_URL = "https://bxgzkfvqwkzbnikvvjhp.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4Z3prZnZxd2t6Ym5pa3Z2amhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE5MjQ1NjMsImV4cCI6MjEwNzUwMDU2M30.mSC45wlyGiP2V6UpCTeIJWZs9HVu7Z4ZaqucUFqDqDg";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let currentSessionUser = null;
let currCalDate = new Date();
let selectedBatchDates = [];

// Variabel Global Ujian Try Out
let activeExamTimer = null;
let currentExamQuestions = [];
let activeExamCode = "";
let activeExamMasterId = "";

// Data awal libur nasional
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
function fixImageUrl(url) {
  if (!url) return null;
  let cleanUrl = url.trim();
  
  // Konversi link share Drive (/file/d/ID/view) ke direct link
  if (cleanUrl.includes('drive.google.com')) {
    const matches = cleanUrl.match(/\/d\/([^\/]+)/) || cleanUrl.match(/id=([^&]+)/);
    if (matches && matches[1]) {
      return `https://lh3.googleusercontent.com/d/${matches[1]}`;
    }
  }
  return cleanUrl;
}

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
    
    // SIMPAN SESI KE LOCALSTORAGE
    localStorage.setItem('mmd_user_session', JSON.stringify(data));

    document.getElementById('sectionLogin').classList.add('hidden');
    document.getElementById('btnLogout').classList.remove('hidden');

    if (data.role === 'admin') {
  document.getElementById('sectionAdmin').classList.remove('hidden');
  aturTampilanAdmin(true);
  loadBatchOptions();
  renderCalendar();
  onSKPFilterChange();
  loadDropdownMasterModulAdmin();
  loadDropdownMasterSoalAdmin();
  loadDropdownJadwalMasterAdmin();
} else {
  document.getElementById('sectionPeserta').classList.remove('hidden');
  aturTampilanAdmin(false); // <-- TAMBAHKAN BARIS INI
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
  aturTampilanAdmin(false); // <-- TAMBAHKAN BARIS INI
  localStorage.removeItem('mmd_user_session');
  location.reload();
}

function checkAutoLogin() {
  const savedSession = localStorage.getItem('mmd_user_session');
  if (!savedSession) return;

  try {
    const user = JSON.parse(savedSession);
    currentSessionUser = user;

    document.getElementById('sectionLogin').classList.add('hidden');
    document.getElementById('btnLogout').classList.remove('hidden');

  if (user.role === 'admin') {
  document.getElementById('sectionAdmin').classList.remove('hidden');
  aturTampilanAdmin(true); // <-- TAMBAHKAN BARIS INI
  loadBatchOptions();
  renderCalendar();
  onSKPFilterChange();
  loadDropdownMasterModulAdmin();
  loadDropdownMasterSoalAdmin();
  loadDropdownJadwalMasterAdmin();
} else {
  document.getElementById('sectionPeserta').classList.remove('hidden');
  aturTampilanAdmin(false); // <-- TAMBAHKAN BARIS INI
  renderPesertaData(user);
  startCamera();
}
    
  } catch (e) {
    console.error("Gagal memuat sesi tersimpan:", e);
    localStorage.removeItem('mmd_user_session');
  }
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
    loadRiwayatTryOutProfil();
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
  } else if (tabName === 'tryout') {
    document.getElementById('tabPesertaTryout').classList.remove('hidden');
    document.getElementById('tabBtnTryout').classList.add('bg-emerald-800', 'text-white');
    loadFolderTryOutPeserta();
  } else if (tabName === 'info') {
    document.getElementById('tabPesertaInfo').classList.remove('hidden');
    document.getElementById('tabBtnInfo').classList.add('bg-emerald-800', 'text-white');
  }
}

async function renderPesertaData(user) {
  // --- SET FOTO PROFIL PESERTA DARI SUPABASE / FALLBACK UI-AVATARS ---
  const imgProfil = document.getElementById('imgFotoProfil');
  if (imgProfil) {
    imgProfil.src = user.foto_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.nama || 'Peserta')}&background=d1fae5&color=065f46`;
  }

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
  loadRiwayatTryOutProfil();
  loadFolderTryOutPeserta();
}

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
        <a href="${c.url_sertifikat}" target="_blank" rel="noopener noreferrer" class="bg-emerald-700 hover:bg-emerald-800 text-white text-xs px-4 py-2 rounded-lg font-bold shadow transition flex items-center gap-1.5 whitespace-nowrap">
          <i class="fa-solid fa-file-arrow-down"></i> Unduh PDF
        </a>
      </div>
    `;
  });
}

// ----------------------------------------------------
// FUNGSI UPLOAD FOTO PROFIL PESERTA KE SUPABASE STORAGE
// ----------------------------------------------------
async function uploadFotoProfil(event) {
  const file = event.target.files[0];
  if (!file) return;

  // Validasi ukuran maks 2MB
  if (file.size > 2 * 1024 * 1024) {
    alert("Ukuran foto maksimal 2MB!");
    return;
  }

  // Ambil data user dari LocalStorage
  const currentUser = JSON.parse(localStorage.getItem('mmd_user_session') || '{}');
  if (!currentUser.username) {
    alert("Sesi tidak valid, silakan login ulang.");
    return;
  }

  const imgProfil = document.getElementById('imgFotoProfil');
  if (imgProfil) imgProfil.style.opacity = '0.5';

  const fileExt = file.name.split('.').pop();
  const fileName = `${currentUser.username}_${Date.now()}.${fileExt}`;
  const filePath = `profiles/${fileName}`;

  // 1. Upload foto ke Supabase Storage (bucket: 'avatars')
  const { data, error: uploadError } = await supabaseClient.storage
    .from('avatars')
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    alert("Gagal mengunggah foto: " + uploadError.message);
    if (imgProfil) imgProfil.style.opacity = '1';
    return;
  }

  // 2. Dapatkan Public URL
  const { data: publicUrlData } = supabaseClient.storage
    .from('avatars')
    .getPublicUrl(filePath);

  const photoUrl = publicUrlData.publicUrl;

  // 3. Update kolom foto_url di tabel 'users'
  const { error: dbError } = await supabaseClient
    .from('users')
    .update({ foto_url: photoUrl })
    .eq('username', currentUser.username);

  if (dbError) {
    alert("Gagal memperbarui profil di database: " + dbError.message);
    if (imgProfil) imgProfil.style.opacity = '1';
    return;
  }

  // 4. Perbarui Tampilan & LocalStorage
  if (imgProfil) {
    imgProfil.src = photoUrl;
    imgProfil.style.opacity = '1';
  }
  
  currentUser.foto_url = photoUrl;
  localStorage.setItem('mmd_user_session', JSON.stringify(currentUser));

  alert("Foto profil berhasil diperbarui!");
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
  const file = fileInput ? fileInput.files[0] : null;

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

      const usersToInsert = rows.map((r, idx) => {
        const rawNama = String(r.Nama || r.nama || r["Nama Lengkap"] || "").trim();
        let rawTglLahir = r.TanggalLahir || r.tanggallahir || r["Tanggal Lahir"] || r["TanggalLahir"] || "";
        const rawNIK = String(r.NIK || r.nik || "-").trim();
        const rawPerusahaan = String(r.Perusahaan || r.perusahaan || r["Nama Perusahaan"] || "PT Mandiri Maha Daya").trim();

        if (!rawNama) return null;

        let formattedDateForDb = null;
        let cleanDDMMYYYY = "01011990";

        if (rawTglLahir instanceof Date && !isNaN(rawTglLahir.getTime())) {
          const d = rawTglLahir.getDate().toString().padStart(2, '0');
          const m = (rawTglLahir.getMonth() + 1).toString().padStart(2, '0');
          const y = rawTglLahir.getFullYear();
          formattedDateForDb = `${y}-${m}-${d}`;
          cleanDDMMYYYY = `${d}${m}${y}`;
        } else if (rawTglLahir) {
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
            }
          }
        }

        if (!formattedDateForDb) {
          formattedDateForDb = "1990-01-01";
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
      }).filter(u => u !== null);

      if (usersToInsert.length === 0) {
        return alert("Tidak ada data peserta yang valid untuk diimpor!");
      }

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
  const searchQuery = document.getElementById('dbSearchPeserta')?.value.trim().toLowerCase() || '';
  
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

  // Filter berdasarkan SKP/Master Training jika batch tidak dipilih
  if (selectedSKP && !selectedBatch) {
    resultList = resultList.filter(p => {
      const masterId = p.trainings?.master_training_id || '';
      const tId = p.training_id || '';
      return masterId === selectedSKP || tId.startsWith(selectedSKP);
    });
  }

  // Filter berdasarkan Input Search (Nama, NIK, Perusahaan, Username)
  if (searchQuery) {
    resultList = resultList.filter(p => {
      const nama = (p.nama || '').toLowerCase();
      const nik = (p.nik || '').toLowerCase();
      const perusahaan = (p.perusahaan || '').toLowerCase();
      const user = (p.username || '').toLowerCase();
      return nama.includes(searchQuery) || nik.includes(searchQuery) || perusahaan.includes(searchQuery) || user.includes(searchQuery);
    });
  }

  if (resultList.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-slate-400 italic">Peserta tidak ditemukan.</td></tr>';
    return;
  }

  // Ambil data log absensi & sertifikat untuk kompilasi histori training
  const { data: allLogs } = await supabaseClient.from('log_absensi').select('username, training_id, tanggal, sesi');
  const { data: allCerts } = await supabaseClient.from('certificates').select('username, training_id');

  tbody.innerHTML = '';
  resultList.forEach((p, idx) => {
    const training = p.trainings;
    let listTanggal = training?.jadwal_tanggal || [];
    const totalSesiWajib = listTanggal.length * 2;

    // 1. Hitung Sesi Unik Absensi
    const userLogs = (allLogs || []).filter(l => 
      l.username === p.username && 
      (l.training_id === p.training_id || !l.training_id) &&
      listTanggal.includes(l.tanggal)
    );

    const uniqueSessions = new Set();
    userLogs.forEach(l => {
      uniqueSessions.add(`${l.tanggal}_sesi${l.sesi}`);
    });

    const totalAbsenHadir = uniqueSessions.size;

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

    // 2. Kompilasi Histori Training Peserta
    const userTrainingSet = new Set();
    if (p.training_id) userTrainingSet.add(p.training_id);

    (allLogs || []).forEach(l => {
      if (l.username === p.username && l.training_id) userTrainingSet.add(l.training_id);
    });

    (allCerts || []).forEach(c => {
      if (c.username === p.username && c.training_id) userTrainingSet.add(c.training_id);
    });

    const listHistori = Array.from(userTrainingSet);
    const historiBadgesHtml = listHistori.map(t => 
      `<span class="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[9px] font-bold px-1.5 py-0.5 rounded-md inline-block mr-1 mb-1">${t}</span>`
    ).join('');

    const userDataJson = JSON.stringify(p).replace(/'/g, "&apos;").replace(/"/g, "&quot;");

    tbody.innerHTML += `
      <tr class="bg-white hover:bg-slate-50 transition border-b border-slate-100">
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
          <p class="font-bold text-slate-700 text-xs mb-1">${training?.judul || p.training_id || '-'}</p>
          <div class="mt-1">
            <p class="text-[9px] font-bold text-slate-400 uppercase tracking-tight mb-0.5">Histori Training:</p>
            ${historiBadgesHtml}
          </div>
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

function tutupModalEditPeserta() {
  document.getElementById('modalEditPeserta').classList.add('hidden');
}

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
  // KELOMPOK 1: PEMBINAAN K3 KEMNAKER RI (23 PROGRAM)
  { master_id: "AK3U", kategori: "KEMNAKER", nama_program: "AK3U - Kemnaker RI", deskripsi: "Pembinaan & Lisensi Ahli K3 Umum Kemnaker RI" },
  { master_id: "P3K", kategori: "KEMNAKER", nama_program: "P3K - Kemnaker RI", deskripsi: "Pertolongan Pertama Pada Kecelakaan Kerja Kemnaker RI" },
  { master_id: "TKBT1", kategori: "KEMNAKER", nama_program: "TKBT 1 - Kemnaker RI", deskripsi: "Tenaga Kerja Bangunan Tinggi Tingkat 1 Kemnaker RI" },
  { master_id: "TKBT2", kategori: "KEMNAKER", nama_program: "TKBT 2 - Kemnaker RI", deskripsi: "Tenaga Kerja Bangunan Tinggi Tingkat 2 Kemnaker RI" },
  { master_id: "TKPK1", kategori: "KEMNAKER", nama_program: "TKPK 1 - Kemnaker RI", deskripsi: "Tenaga Kerja Pada Ketinggian Tingkat 1 Kemnaker RI" },
  { master_id: "TKPK2", kategori: "KEMNAKER", nama_program: "TKPK 2 - Kemnaker RI", deskripsi: "Tenaga Kerja Pada Ketinggian Tingkat 2 Kemnaker RI" },
  { master_id: "TKPK3", kategori: "KEMNAKER", nama_program: "TKPK 3 - Kemnaker RI", deskripsi: "Tenaga Kerja Pada Ketinggian Tingkat 3 Kemnaker RI" },
  { master_id: "PAA_GONDOLA", kategori: "KEMNAKER", nama_program: "Operator Gondola - Kemnaker RI", deskripsi: "Pengoperasian & Keselamatan Operator Gondola Kemnaker RI" },
  { master_id: "LST_TEKNISI", kategori: "KEMNAKER", nama_program: "Teknisi K3 Listrik - Kemnaker RI", deskripsi: "Pembinaan Teknisi Keselamatan Listrik Kemnaker RI" },
  { master_id: "LST_AHLI", kategori: "KEMNAKER", nama_program: "Ahli K3 Listrik - Kemnaker RI", deskripsi: "Pembinaan & Lisensi Ahli K3 Listrik Kemnaker RI" },
  { master_id: "KST_TEKNISI_PERANCAH", kategori: "KEMNAKER", nama_program: "Teknisi Perancah - Kemnaker RI", deskripsi: "Pemasangan & Pembongkaran Perancah Kemnaker RI" },
  { master_id: "KST_SUPERVISI_PERANCAH", kategori: "KEMNAKER", nama_program: "Supervisi Perancah - Kemnaker RI", deskripsi: "Pengawasan & Inspeksi Keselamatan Perancah Kemnaker RI" },
  { master_id: "KST_AHLI_UTAMA", kategori: "KEMNAKER", nama_program: "Ahli Utama K3 Konstruksi - Kemnaker RI", deskripsi: "Manajemen K3 Konstruksi Tingkat Utama Kemnaker RI" },
  { master_id: "KST_AHLI_MADYA", kategori: "KEMNAKER", nama_program: "Ahli Madya K3 Konstruksi - Kemnaker RI", deskripsi: "Manajemen K3 Konstruksi Tingkat Madya Kemnaker RI" },
  { master_id: "KST_AHLI_MUDA", kategori: "KEMNAKER", nama_program: "Ahli Muda K3 Konstruksi - Kemnaker RI", deskripsi: "Pelaksanaan K3 Proyek Konstruksi Kemnaker RI" },
  { master_id: "ELV_OPERATOR", kategori: "KEMNAKER", nama_program: "Operator Elevator - Kemnaker RI", deskripsi: "Pengoperasian & Keselamatan Lift Kemnaker RI" },
  { master_id: "ELV_TEKNISI", kategori: "KEMNAKER", nama_program: "Teknisi Elevator - Kemnaker RI", deskripsi: "Pemeliharaan & Perbaikan Elevator Kemnaker RI" },
  { master_id: "B3_TEKNISI_RT", kategori: "KEMNAKER", nama_program: "Teknisi Ruang Terbatas - Kemnaker RI", deskripsi: "Teknisi K3 Pekerjaan Ruang Terbatas Kemnaker RI" },
  { master_id: "B3_RESCUE_RT", kategori: "KEMNAKER", nama_program: "Petugas Rescue Ruang Terbatas - Kemnaker RI", deskripsi: "Evakuasi & Penyelamatan Ruang Terbatas Kemnaker RI" },
  { master_id: "B3_GAS_DETECTOR", kategori: "KEMNAKER", nama_program: "Petugas Gas Detector - Kemnaker RI", deskripsi: "Pengukuran Gas Berbahaya di Tempat Kerja Kemnaker RI" },
  { master_id: "PAA_FORKLIFT", kategori: "KEMNAKER", nama_program: "Operator Forklift - Kemnaker RI", deskripsi: "Pengoperasian & Keselamatan Forklift Kemnaker RI" },
  { master_id: "PAA_ESKAVATOR", kategori: "KEMNAKER", nama_program: "Operator Eskavator - Kemnaker RI", deskripsi: "Pengoperasian Alat Berat Eskavator Kemnaker RI" },
  { master_id: "PAA_GRIDER", kategori: "KEMNAKER", nama_program: "Operator Grider - Kemnaker RI", deskripsi: "Pengoperasian Motor Grader Alat Berat Kemnaker RI" },

  // KELOMPOK 2: SERTIFIKASI KOMPETENSI BNSP (6 PROGRAM)
  { master_id: "BNSP-AK3U", kategori: "BNSP", nama_program: "AK3U - BNSP", deskripsi: "Sertifikasi Kompetensi Ahli K3 Umum BNSP" },
  { master_id: "BNSP-TKPK1", kategori: "BNSP", nama_program: "TKPK 1 - BNSP", deskripsi: "Sertifikasi BNSP Tenaga Kerja Pada Ketinggian 1" },
  { master_id: "BNSP-TKPK2", kategori: "BNSP", nama_program: "TKPK 2 - BNSP", deskripsi: "Sertifikasi BNSP Tenaga Kerja Pada Ketinggian 2" },
  { master_id: "BNSP-TKPK3", kategori: "BNSP", nama_program: "TKPK 3 - BNSP", deskripsi: "Sertifikasi BNSP Tenaga Kerja Pada Ketinggian 3" },
  { master_id: "BNSP-TKBT1", kategori: "BNSP", nama_program: "TKBT 1 - BNSP", deskripsi: "Sertifikasi BNSP Tenaga Kerja Bangunan Tinggi 1" },
  { master_id: "BNSP-TKBT2", kategori: "BNSP", nama_program: "TKBT 2 - BNSP", deskripsi: "Sertifikasi BNSP Tenaga Kerja Bangunan Tinggi 2" }
];

function loadDropdownMasterModulAdmin() {
  const selectUpload = document.getElementById('adminSelectMasterModul');
  const selectFilter = document.getElementById('adminFilterModulMaster');

  if (selectUpload) selectUpload.innerHTML = '<option value="">-- Pilih Judul Training --</option>';
  if (selectFilter) selectFilter.innerHTML = '<option value="">-- Semua Judul Training --</option>';

  KATALOG_MODUL_MASTER.forEach(m => {
    const optHtml = `<option value="${m.master_id}">${m.nama_program}</option>`;
    if (selectUpload) selectUpload.innerHTML += optHtml;
    if (selectFilter) selectFilter.innerHTML += optHtml;
  });
}

// SIMPAN LINK MODUL/MATERI GOOGLE DRIVE (ADMIN)
async function simpanLinkMateriAdmin() {
  const masterId = document.getElementById('adminSelectMasterModul').value;
  const namaMateri = document.getElementById('adminInputNamaMateri').value.trim();
  const linkDrive = document.getElementById('adminInputLinkDrive').value.trim();
  const tipeFile = document.getElementById('adminSelectTipeFile').value;

  if (!masterId || !namaMateri || !linkDrive) {
    return alert("Harap isi Judul Training, Nama Materi, dan Link Google Drive!");
  }

  const payload = {
    master_id: masterId,
    file_name: namaMateri,
    file_url: linkDrive,
    file_type: tipeFile.toLowerCase()
  };

  const btn = document.getElementById('btnSimpanLinkMateri');
  const originalText = btn ? btn.innerHTML : '';
  if (btn) {
    btn.innerText = "Menyimpan...";
    btn.disabled = true;
  }

  try {
    const { error } = await supabaseClient.from('training_modules').insert([payload]);
    if (error) throw error;

    alert(`✅ Link Materi "${namaMateri}" berhasil ditambahkan!`);
    document.getElementById('adminInputNamaMateri').value = '';
    document.getElementById('adminInputLinkDrive').value = '';
    
    loadDatabaseModulAdmin();

  } catch (err) {
    alert("Gagal menyimpan link materi: " + err.message);
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
      <div class="col-span-full border-b border-slate-200 pb-2 mb-2">
        <h3 class="text-xs font-bold text-emerald-900 uppercase tracking-wide flex items-center gap-2">
          <i class="fa-solid fa-building-columns text-emerald-700"></i> Modul Pembinaan K3 Kemnaker RI (${listKemnaker.length} Program)
        </h3>
      </div>
      ${listKemnaker.map(m => renderCardHTML(m)).join('')}

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

// BUKA MODAL POP-UP ISI FOLDER MODUL (SISI PESERTA DENGAN LINK GOOGLE DRIVE)
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
        let iconClass = "fa-folder-closed text-amber-600";
        const fileTypeLower = (f.file_type || '').toLowerCase();
        if (fileTypeLower === 'pdf') iconClass = "fa-file-pdf text-red-600";
        else if (fileTypeLower === 'ppt' || fileTypeLower === 'pptx') iconClass = "fa-file-powerpoint text-amber-600";
        else if (fileTypeLower === 'zip' || fileTypeLower === 'rar') iconClass = "fa-file-zipper text-indigo-600";

        container.innerHTML += `
          <div class="flex items-center justify-between p-3 bg-slate-50 hover:bg-emerald-50 rounded-xl text-xs transition border border-slate-200">
            <div class="flex items-center gap-3 truncate pr-2">
              <i class="fa-solid ${iconClass} text-xl"></i>
              <div class="truncate">
                <p class="font-bold text-slate-800 truncate">${f.file_name}</p>
                <span class="text-[9px] text-slate-400 uppercase font-semibold">Tipe: ${f.file_type || 'DRIVE'}</span>
              </div>
            </div>
            <a href="${f.file_url}" target="_blank" rel="noopener noreferrer" class="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition flex items-center gap-1.5 shadow-sm">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Buka / Unduh
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
// DATABASE MODUL ADMIN (LOAD, EDIT, HAPUS)
// ----------------------------------------------------
async function loadDatabaseModulAdmin() {
  const tbody = document.getElementById('tbodyDatabaseModul');
  const selectedMasterId = document.getElementById('adminFilterModulMaster')?.value;

  if (!tbody) return;
  tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-slate-400">Memuat data modul...</td></tr>';

  try {
    let query = supabaseClient.from('training_modules').select('*').order('created_at', { ascending: false });

    if (selectedMasterId) {
      query = query.eq('master_id', selectedMasterId);
    }

    const { data: files, error } = await query;

    if (error || !files || files.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-slate-400 italic">Tidak ada file modul ditemukan.</td></tr>';
      return;
    }

    tbody.innerHTML = '';
    files.forEach((f, idx) => {
      const programObj = KATALOG_MODUL_MASTER.find(m => m.master_id === f.master_id);
      const namaProgram = programObj ? programObj.nama_program : f.master_id;

      tbody.innerHTML += `
        <tr class="hover:bg-slate-50 transition border-b border-slate-100">
          <td class="p-3 text-center font-bold text-slate-400">${idx + 1}</td>
          <td class="p-3 font-semibold text-slate-700">${namaProgram}</td>
          <td class="p-3 font-medium text-slate-800">${f.file_name}</td>
          <td class="p-3 text-center font-bold uppercase text-[10px] text-emerald-800">
            <span class="bg-emerald-100 px-2 py-0.5 rounded-full">${f.file_type || 'DRIVE'}</span>
          </td>
          <td class="p-3 text-center">
            <div class="flex items-center justify-center gap-1.5">
              <a href="${f.file_url}" target="_blank" class="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-[10px] px-2 py-1 rounded-lg font-bold transition" title="Buka Link Drive">
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
              <button onclick="editNamaModulAdmin(${f.id}, '${f.file_name.replace(/'/g, "\\'")}')" class="bg-amber-100 hover:bg-amber-200 text-amber-800 text-[10px] px-2 py-1 rounded-lg font-bold border border-amber-300 transition" title="Ganti Nama Materi">
                <i class="fa-solid fa-pen-to-square"></i> Edit
              </button>
              <button onclick="hapusModulAdmin(${f.id}, '${f.file_name.replace(/'/g, "\\'")}')" class="bg-red-100 hover:bg-red-200 text-red-800 text-[10px] px-2 py-1 rounded-lg font-bold border border-red-300 transition" title="Hapus Modul">
                <i class="fa-solid fa-trash"></i> Hapus
              </button>
            </div>
          </td>
        </tr>
      `;
    });

  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-red-500">Gagal memuat modul pelatihan.</td></tr>';
  }
}

async function editNamaModulAdmin(id, oldFileName) {
  const newName = prompt("Masukkan nama file modul yang baru:", oldFileName);
  if (!newName || newName.trim() === '' || newName === oldFileName) return;

  const { error } = await supabaseClient
    .from('training_modules')
    .update({ file_name: newName.trim() })
    .eq('id', id);

  if (error) {
    alert("Gagal merubah nama file: " + error.message);
  } else {
    alert("✅ Nama file modul berhasil diperbarui!");
    loadDatabaseModulAdmin();
  }
}

async function hapusModulAdmin(id, fileName) {
  if (!confirm(`Apakah Anda yakin ingin menghapus file modul "${fileName}"?`)) return;

  const { error } = await supabaseClient
    .from('training_modules')
    .delete()
    .eq('id', id);

  if (error) {
    alert("Gagal menghapus modul: " + error.message);
  } else {
    alert("🗑️ File modul berhasil dihapus!");
    loadDatabaseModulAdmin();
  }
}

// ====================================================
// 12. LOGIKA FITUR TRY OUT INTERAKTIF & BANK SOAL
// ====================================================

function loadDropdownMasterSoalAdmin() {
  const selectForm = document.getElementById('adminSelectSoalMaster');
  const selectFilter = document.getElementById('adminFilterSoalMaster');
  const selectJadwal = document.getElementById('adminSelectMasterJadwal');
  const selectImportMaster = document.getElementById('importSelectSoalMaster');

  if (selectForm) selectForm.innerHTML = '<option value="">-- Pilih Program Training --</option>';
  if (selectFilter) selectFilter.innerHTML = '<option value="">-- Semua Program Training --</option>';
  if (selectJadwal) selectJadwal.innerHTML = '<option value="">-- Pilih Program Training --</option>';
  if (selectImportMaster) selectImportMaster.innerHTML = '<option value="">-- Pilih Program Training --</option>';

  KATALOG_MODUL_MASTER.forEach(m => {
    const optHtml = `<option value="${m.master_id}">${m.nama_program}</option>`;
    if (selectForm) selectForm.innerHTML += optHtml;
    if (selectFilter) selectFilter.innerHTML += optHtml;
    if (selectJadwal) selectJadwal.innerHTML += optHtml;
    if (selectImportMaster) selectImportMaster.innerHTML += optHtml;
  });
}

// SIMPAN SOAL ADMIN (KUNCI DIKONVERSI KE HURUF "a", "b", "c", atau "d")
async function simpanSoalTryOutAdmin() {
  const editId = document.getElementById('adminSoalEditId').value;
  const masterId = document.getElementById('adminSelectSoalMaster').value;
  const tryoutCode = document.getElementById('adminInputSoalTryOutCode').value.trim();
  const soal = document.getElementById('adminTextareaSoal').value.trim();
  const imageUrlRaw = document.getElementById('adminInputSoalImageUrl')?.value.trim() || null;
  const opsiA = document.getElementById('adminInputOpsiA').value.trim();
  const opsiB = document.getElementById('adminInputOpsiB').value.trim();
  const opsiC = document.getElementById('adminInputOpsiC').value.trim();
  const opsiD = document.getElementById('adminInputOpsiD').value.trim();
  let kunci = document.getElementById('adminSelectKunciSoal').value.trim().toLowerCase();

  if (!masterId || !tryoutCode || !soal || !opsiA || !opsiB || !opsiC || !opsiD || !kunci) {
    return alert("Harap lengkapi semua bidang isian soal, opsi jawaban, dan kunci jawaban!");
  }

  // Konversi otomatis jika admin mengisi teks jawaban penuh
  if (kunci === opsiA.toLowerCase()) kunci = 'a';
  else if (kunci === opsiB.toLowerCase()) kunci = 'b';
  else if (kunci === opsiC.toLowerCase()) kunci = 'c';
  else if (kunci === opsiD.toLowerCase()) kunci = 'd';

  const payload = {
    master_id: masterId,
    tryout_code: tryoutCode.toUpperCase(),
    soal: soal,
    image_url: fixImageUrl(imageUrlRaw),
    opsi_a: opsiA,
    opsi_b: opsiB,
    opsi_c: opsiC,
    opsi_d: opsiD,
    kunci: kunci
  };

  const btn = document.getElementById('btnSimpanSoalAdmin');
  const originalText = btn.innerHTML;
  btn.innerText = "Menyimpan Soal...";
  btn.disabled = true;

  try {
    let error = null;
    if (editId) {
      const res = await supabaseClient.from('tryout_questions').update(payload).eq('id', editId);
      error = res.error;
    } else {
      const res = await supabaseClient.from('tryout_questions').insert([payload]);
      error = res.error;
    }

    if (error) throw error;

    alert(editId ? "✅ Soal berhasil diperbarui!" : "✅ Soal baru berhasil disimpan ke database!");
    batalEditSoalAdmin();
    loadDatabaseSoalAdmin();

  } catch (err) {
    alert("Gagal menyimpan soal: " + err.message);
  } finally {
    btn.innerHTML = originalText;
    btn.disabled = false;
  }
}

// 1. IMPORT EXCEL SOAL MASSAL (DENGAN DROPDOWN PROGRAM & KODE TRYOUT OK)
async function importExcelSoalTryOut() {
  const masterId = document.getElementById('importSelectSoalMaster')?.value || '';
  const tryoutCode = document.getElementById('importInputSoalTryoutCode')?.value.trim().toUpperCase() || '';
  const fileInput = document.getElementById('fileExcelSoalAdmin');
  const file = fileInput ? fileInput.files[0] : null;

  if (!file) return alert("Pilih file Excel/CSV berisi soal terlebih dahulu!");

  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet);

      if (!rows || rows.length === 0) return alert("File Excel kosong!");

      const questionsToInsert = rows.map(r => {
        const rowMasterId = masterId || String(r.master_id || r.MasterID || "").trim();
        const rowTryoutCode = tryoutCode || String(r.tryout_code || r.KodeTryOut || "").trim().toUpperCase();

        let rowKunci = String(r.kunci || r.KunciJawaban || "").trim().toLowerCase();
        const oA = String(r.opsi_a || r.OpsiA || "").trim();
        const oB = String(r.opsi_b || r.OpsiB || "").trim();
        const oC = String(r.opsi_c || r.OpsiC || "").trim();
        const oD = String(r.opsi_d || r.OpsiD || "").trim();

        if (rowKunci === oA.toLowerCase()) rowKunci = 'a';
        else if (rowKunci === oB.toLowerCase()) rowKunci = 'b';
        else if (rowKunci === oC.toLowerCase()) rowKunci = 'c';
        else if (rowKunci === oD.toLowerCase()) rowKunci = 'd';

        return {
          master_id: rowMasterId,
          tryout_code: rowTryoutCode,
          soal: String(r.soal || r.Pertanyaan || "").trim(),
          image_url: fixImageUrl(r.image_url || r.GambarURL || null),
          opsi_a: oA,
          opsi_b: oB,
          opsi_c: oC,
          opsi_d: oD,
          kunci: rowKunci
        };
      }).filter(q => q.master_id && q.tryout_code && q.soal);

      if (questionsToInsert.length === 0) {
        return alert("Data soal tidak valid! Pastikan Program Training & Kode Tryout sudah dipilih atau diisi pada kolom Excel.");
      }

      const { error } = await supabaseClient.from('tryout_questions').insert(questionsToInsert);
      if (error) throw error;

      alert(`✅ Berhasil mengimpor ${questionsToInsert.length} soal Try Out!`);
      fileInput.value = '';
      loadDatabaseSoalAdmin();

    } catch (err) {
      alert("Gagal memproses file Excel: " + err.message);
    }
  };
  reader.readAsArrayBuffer(file);
}

// ====================================================
// LOGIKA JADWAL TRY OUT ADMIN (ALUR BARU PER BATCH)
// ====================================================
// 1. FUNGSI ISI DROPDOWN PROGRAM TRAINING DI FORM JADWAL
function loadDropdownJadwalMasterAdmin() {
  const selectMaster = document.getElementById('adminSelectJadwalMaster');
  if (!selectMaster) return;

  selectMaster.innerHTML = '<option value="">-- Pilih Program Training --</option>';

  if (typeof KATALOG_MODUL_MASTER !== 'undefined' && KATALOG_MODUL_MASTER.length > 0) {
    KATALOG_MODUL_MASTER.forEach(m => {
      selectMaster.innerHTML += `<option value="${m.master_id}">${m.nama_program}</option>`;
    });
  }
}

// 2. EVENT SAAT PILIH PROGRAM TRAINING (LOAD BATCH & PAKET SOAL AUTOMATIS)
async function onJadwalMasterChange() {
  const masterId = document.getElementById('adminSelectJadwalMaster').value;
  const selectBatch = document.getElementById('adminSelectJadwalBatch');
  const selectCode = document.getElementById('adminSelectJadwalCode');

  if (!selectBatch || !selectCode) return;

  selectBatch.innerHTML = '<option value="">-- Pilih Batch Aktif --</option>';
  selectCode.innerHTML = '<option value="">-- Pilih Paket Soal --</option>';

  if (!masterId) return;

  try {
    // Load Batch Pelatihan
    const { data: listBatch } = await supabaseClient
      .from('batches')
      .select('*')
      .eq('master_id', masterId)
      .order('created_at', { ascending: false });

    if (listBatch && listBatch.length > 0) {
      listBatch.forEach(b => {
        selectBatch.innerHTML += `<option value="${b.batch_id}">${b.nama_batch || b.batch_id}</option>`;
      });
    }

    // Load Paket Soal
    const { data: listSoal } = await supabaseClient
      .from('tryout_questions')
      .select('tryout_code')
      .eq('master_id', masterId);

    if (listSoal && listSoal.length > 0) {
      const uniqueCodes = [...new Set(listSoal.map(s => s.tryout_code))];
      uniqueCodes.forEach(code => {
        selectCode.innerHTML += `<option value="${code}">Paket ${code}</option>`;
      });
    }
  } catch (err) {
    console.error("Gagal load filter jadwal:", err);
  }
}

// A. EVENT SAAT SELECT MASTER_ID DIUBAH (OTOMATIS FILTER BATCH & PAKET SOAL)
async function onJadwalMasterChange() {
  const masterId = document.getElementById('adminSelectJadwalMaster').value;
  const selectBatch = document.getElementById('adminSelectJadwalBatch');
  const selectCode = document.getElementById('adminSelectJadwalCode');

  selectBatch.innerHTML = '<option value="">-- Pilih Batch Aktif --</option>';
  selectCode.innerHTML = '<option value="">-- Pilih Paket Soal --</option>';

  if (!masterId) return;

  try {
    // 1. Load Batch Pelatihan yang sesuai dengan master_id
    const { data: listBatch } = await supabaseClient
      .from('batches') // Sesuaikan jika nama tabel batch kamu berbeda
      .select('*')
      .eq('master_id', masterId)
      .order('created_at', { ascending: false });

    if (listBatch && listBatch.length > 0) {
      listBatch.forEach(b => {
        selectBatch.innerHTML += `<option value="${b.batch_id}">${b.nama_batch || b.batch_id}</option>`;
      });
    }

    // 2. Load Paket Soal yang sudah ter-upload untuk master_id ini
    const { data: listSoal } = await supabaseClient
      .from('tryout_questions')
      .select('tryout_code')
      .eq('master_id', masterId);

    if (listSoal && listSoal.length > 0) {
      const uniqueCodes = [...new Set(listSoal.map(s => s.tryout_code))];
      uniqueCodes.forEach(code => {
        selectCode.innerHTML += `<option value="${code}">Paket ${code}</option>`;
      });
    }
  } catch (err) {
    console.error("Gagal load filter jadwal:", err);
  }
}

// B. FUNGSI SIMPAN JADWAL KE SUPABASE
async function simpanJadwalTryOutAdmin() {
  const masterId = document.getElementById('adminSelectJadwalMaster').value;
  const tryoutCode = document.getElementById('adminSelectJadwalCode').value;
  const batchId = document.getElementById('adminSelectJadwalBatch').value;
  const durasi = parseInt(document.getElementById('adminInputTryOutDurasi').value) || 60;
  const startTime = document.getElementById('adminInputTryOutStart').value;
  const endTime = document.getElementById('adminInputTryOutEnd').value;

  if (!masterId || !tryoutCode || !batchId || !startTime || !endTime) {
    alert("Harap lengkapi seluruh form jadwal (Program, Paket, Batch, Durasi, dan Waktu)!");
    return;
  }

  try {
    const { error } = await supabaseClient
      .from('tryout_schedules')
      .insert([{
        master_id: masterId,
        tryout_code: tryoutCode,
        batch_id: batchId,
        durasi_menit: durasi,
        start_time: startTime,
        end_time: endTime
      }]);

    if (error) {
      alert("Gagal menyimpan jadwal: " + error.message);
      return;
    }

    alert(`Jadwal Try Out Paket ${tryoutCode} berhasil dirilis untuk Batch ${batchId}!`);
    
    if (typeof loadRekapTryOutAdmin === 'function') loadRekapTryOutAdmin();

  } catch (err) {
    alert("Terjadi kesalahan: " + err.message);
  }
}

function batalEditSoalAdmin() {
  document.getElementById('adminSoalEditId').value = '';
  document.getElementById('adminTextareaSoal').value = '';
  if (document.getElementById('adminInputSoalImageUrl')) document.getElementById('adminInputSoalImageUrl').value = '';
  document.getElementById('adminInputOpsiA').value = '';
  document.getElementById('adminInputOpsiB').value = '';
  document.getElementById('adminInputOpsiC').value = '';
  document.getElementById('adminInputOpsiD').value = '';
  document.getElementById('textEditSoalState').innerText = 'Mode: Tambah Baru';
  document.getElementById('btnBatalEditSoal').classList.add('hidden');
}

// DISPLAY BANK SOAL ADMIN (GROUPING PER PAKET / FOLDER)
async function loadDatabaseSoalAdmin() {
  const container = document.getElementById('tbodyDatabaseSoalAdmin');
  const filterMaster = document.getElementById('adminFilterSoalMaster')?.value;

  if (!container) return;
  container.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-slate-400">Memuat bank soal...</td></tr>';

  try {
    let query = supabaseClient.from('tryout_questions').select('*').order('created_at', { ascending: false });
    if (filterMaster) query = query.eq('master_id', filterMaster);

    const { data: listSoal, error } = await query;
    if (error || !listSoal || listSoal.length === 0) {
      container.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-slate-400 italic">Belum ada paket soal terdaftar.</td></tr>';
      return;
    }

    // Kelompokkan Soal Berdasarkan Paket (master_id + tryout_code)
    const groupedPackages = {};
    listSoal.forEach(s => {
      const pkgKey = `${s.master_id}___${s.tryout_code}`;
      if (!groupedPackages[pkgKey]) {
        groupedPackages[pkgKey] = {
          master_id: s.master_id,
          tryout_code: s.tryout_code,
          questions: []
        };
      }
      groupedPackages[pkgKey].questions.push(s);
    });

    container.innerHTML = '';
    let pIdx = 1;

    for (const key in groupedPackages) {
      const pkg = groupedPackages[key];
      const progObj = KATALOG_MODUL_MASTER.find(m => m.master_id === pkg.master_id);
      const namaProg = progObj ? progObj.nama_program : pkg.master_id;

      container.innerHTML += `
        <tr class="hover:bg-emerald-50/50 border-b border-slate-200 transition">
          <td class="p-3 text-center font-bold text-slate-400">${pIdx++}</td>
          <td class="p-3">
            <span class="font-bold text-slate-800">${namaProg}</span>
          </td>
          <td class="p-3">
            <span class="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-lg border border-emerald-300">
              <i class="fa-solid fa-folder-closed mr-1"></i> Paket ${pkg.tryout_code}
            </span>
          </td>
          <td class="p-3 text-center font-bold text-slate-700">
            ${pkg.questions.length} Soal
          </td>
          <td class="p-3 text-center">
            <div class="flex items-center justify-center gap-2">
              <!-- TOMBOL KELOLA SOAL -->
              <button onclick="bukaModalDetailPaketSoalAdmin('${pkg.master_id}', '${pkg.tryout_code}')" class="bg-emerald-700 hover:bg-emerald-800 text-white text-xs px-3 py-1.5 rounded-lg font-bold transition shadow flex items-center gap-1">
                <i class="fa-solid fa-folder-open"></i> Kelola ${pkg.questions.length} Soal
              </button>

              <!-- TOMBOL HAPUS FOLDER PAKET SOAL -->
              <button onclick="hapusFolderPaketSoalAdmin('${pkg.master_id}', '${pkg.tryout_code}')" class="bg-rose-600 hover:bg-rose-700 text-white text-xs px-3 py-1.5 rounded-lg font-bold transition shadow flex items-center gap-1" title="Hapus Seluruh Folder Paket Soal">
                <i class="fa-solid fa-trash-can"></i> Hapus Folder
              </button>
            </div>
          </td>
        </tr>
      `;
    }

  } catch (err) {
    container.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-red-500">Gagal memuat bank soal.</td></tr>';
  }
}

// FUNGSI LOGIKA HAPUS SELURUH FOLDER PAKET SOAL
async function hapusFolderPaketSoalAdmin(masterId, tryoutCode) {
  const konfirmasi = confirm(`Apakah kamu yakin ingin menghapus SELURUH folder paket "${tryoutCode}"?\nSemua soal di dalam folder ini akan terhapus permanen!`);
  
  if (!konfirmasi) return;

  try {
    const { error } = await supabaseClient
      .from('tryout_questions')
      .delete()
      .eq('master_id', masterId)
      .eq('tryout_code', tryoutCode);

    if (error) {
      alert("Gagal menghapus folder paket soal: " + error.message);
      return;
    }

    alert(`Folder paket "${tryoutCode}" berhasil dihapus!`);
    loadDatabaseSoalAdmin(); // Reload tabel bank soal
  } catch (err) {
    alert("Terjadi kesalahan sistem: " + err.message);
  }
}

// FUNGSI UNTUK MEMBUKA & MERENDER DETAIL SOAL DI DALAM PAKET
async function bukaModalDetailPaketSoalAdmin(masterId, tryoutCode) {
  const container = document.getElementById('tbodyDatabaseSoalAdmin');
  if (!container) return;

  container.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-slate-400">Memuat butir soal paket ' + tryoutCode + '...</td></tr>';

  try {
    // Ambil data butir soal spesifik berdasarkan master_id dan tryout_code
    const { data: listSoal, error } = await supabaseClient
      .from('tryout_questions')
      .select('*')
      .eq('master_id', masterId)
      .eq('tryout_code', tryoutCode)
      .order('created_at', { ascending: false });

    if (error || !listSoal || listSoal.length === 0) {
      container.innerHTML = `
        <tr>
          <td colspan="5" class="text-center py-4 text-slate-400 italic">
            Tidak ada soal ditemukan untuk paket ${tryoutCode}. 
            <button onclick="loadDatabaseSoalAdmin()" class="text-emerald-700 underline font-bold ml-2">Kembali ke Daftar Paket</button>
          </td>
        </tr>`;
      return;
    }

    // Render header navigasi kembali & baris butir soal
    const progObj = KATALOG_MODUL_MASTER.find(m => m.master_id === masterId);
    const namaProg = progObj ? progObj.nama_program : masterId;

    let html = `
      <tr class="bg-emerald-100/60 border-b border-emerald-200">
        <td colspan="5" class="p-3">
          <div class="flex items-center justify-between">
            <span class="font-bold text-xs text-emerald-900">
              <i class="fa-solid fa-folder-open mr-1"></i> Detail Soal: ${namaProg} (${tryoutCode})
            </span>
            <button onclick="loadDatabaseSoalAdmin()" class="bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] px-3 py-1 rounded-lg font-bold transition shadow">
              <i class="fa-solid fa-arrow-left mr-1"></i> Kembali ke Daftar Paket
            </button>
          </div>
        </td>
      </tr>
    `;

    listSoal.forEach((s, idx) => {
      const soalJson = JSON.stringify(s).replace(/'/g, "&apos;").replace(/"/g, "&quot;");

      html += `
        <tr class="hover:bg-slate-50 border-b border-slate-100 text-xs">
          <td class="p-3 text-center font-bold text-slate-400">${idx + 1}</td>
          <td class="p-3">
            <span class="font-bold text-slate-800">${namaProg}</span><br>
            <span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">${s.tryout_code}</span>
          </td>
          <td class="p-3 text-slate-700 max-w-xs truncate">${s.soal}</td>
          <td class="p-3 text-center font-bold uppercase text-emerald-700">${s.kunci}</td>
          <td class="p-3 text-center">
            <div class="flex items-center justify-center gap-1">
              <button onclick='persiapkanEditSoalAdmin(${soalJson})' class="bg-amber-100 hover:bg-amber-200 text-amber-800 text-[10px] px-2 py-1 rounded-lg font-bold transition">
                <i class="fa-solid fa-pen"></i> Edit
              </button>
              <button onclick="hapusSoalAdmin(${s.id})" class="bg-red-100 hover:bg-red-200 text-red-800 text-[10px] px-2 py-1 rounded-lg font-bold transition">
                <i class="fa-solid fa-trash"></i> Hapus
              </button>
            </div>
          </td>
        </tr>
      `;
    });

    container.innerHTML = html;

  } catch (err) {
    container.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-red-500">Gagal memuat rincian soal.</td></tr>';
  }
}

function persiapkanEditSoalAdmin(s) {
  document.getElementById('adminSoalEditId').value = s.id;
  document.getElementById('adminSelectSoalMaster').value = s.master_id;
  document.getElementById('adminInputSoalTryOutCode').value = s.tryout_code;
  document.getElementById('adminTextareaSoal').value = s.soal;
  if (document.getElementById('adminInputSoalImageUrl')) document.getElementById('adminInputSoalImageUrl').value = s.image_url || '';
  document.getElementById('adminInputOpsiA').value = s.opsi_a;
  document.getElementById('adminInputOpsiB').value = s.opsi_b;
  document.getElementById('adminInputOpsiC').value = s.opsi_c;
  document.getElementById('adminInputOpsiD').value = s.opsi_d;
  document.getElementById('adminSelectKunciSoal').value = s.kunci;
  document.getElementById('textEditSoalState').innerText = 'Mode: Edit Soal ID ' + s.id;
  document.getElementById('btnBatalEditSoal').classList.remove('hidden');
}

async function hapusSoalAdmin(id) {
  if (!confirm("Hapus soal ini dari database?")) return;
  const { error } = await supabaseClient.from('tryout_questions').delete().eq('id', id);
  if (error) alert("Gagal menghapus soal: " + error.message);
  else loadDatabaseSoalAdmin();
}

// ----------------------------------------------------
// LOAD TRY OUT SISI PESERTA (HANYA UNTUK PROGRAM YANG DIIKUTI)
// ----------------------------------------------------
async function loadFolderTryOutPeserta() {
  const container = document.getElementById('containerFolderTryOutPeserta');
  if (!container || !currentSessionUser) return;

  container.innerHTML = '<p class="text-xs text-slate-400 text-center col-span-full py-4">Mengecek akses folder Try Out...</p>';

  try {
    const setHistoriTraining = new Set();
    if (currentSessionUser.training_id) setHistoriTraining.add(currentSessionUser.training_id.toUpperCase());

    const { data: logs } = await supabaseClient.from('log_absensi').select('training_id').eq('username', currentSessionUser.username);
    if (logs) logs.forEach(l => { if (l.training_id) setHistoriTraining.add(l.training_id.toUpperCase()); });

    const { data: certs } = await supabaseClient.from('certificates').select('training_id').eq('username', currentSessionUser.username);
    if (certs) certs.forEach(c => { if (c.training_id) setHistoriTraining.add(c.training_id.toUpperCase()); });

    const listHistoriUser = Array.from(setHistoriTraining);

    const modulPeserta = KATALOG_MODUL_MASTER.filter(m => {
      return listHistoriUser.some(tId => {
        const cleanTId = cleanStringForMatch(tId);
        const cleanMId = cleanStringForMatch(m.master_id);
        const cleanProgramName = cleanStringForMatch(m.nama_program);
        return cleanTId.includes(cleanMId) || cleanTId.includes(cleanProgramName);
      });
    });

    if (modulPeserta.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-8 bg-slate-50 rounded-2xl border border-slate-200 p-6">
          <i class="fa-solid fa-folder-closed text-slate-300 text-4xl mb-3"></i>
          <h4 class="text-xs font-bold text-slate-600">Tidak Ada Try Out Tersedia</h4>
          <p class="text-[10px] text-slate-400 mt-1">Kamu belum terdaftar di paket pelatihan aktif.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = modulPeserta.map(m => `
      <div onclick="bukaModalListPaketTryOut('${m.master_id}', '${m.nama_program}')" class="bg-white border-2 border-emerald-500/40 rounded-2xl p-4 shadow-sm hover:shadow-md cursor-pointer transition group">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg font-bold group-hover:scale-105 transition">
            <i class="fa-solid fa-file-pen"></i>
          </div>
          <div>
            <span class="bg-emerald-100 text-emerald-800 text-[9px] font-extrabold px-2 py-0.5 rounded-full">PROGRAM KAMU</span>
            <h4 class="text-xs font-bold text-slate-800 mt-1">${m.nama_program}</h4>
          </div>
        </div>
        <p class="text-[10px] text-slate-500 mt-2">${m.deskripsi}</p>
        <div class="mt-4 pt-3 border-t border-slate-100 text-[10px] text-emerald-700 font-bold flex justify-between items-center">
          <span>Buka Paket Try Out</span>
          <i class="fa-solid fa-chevron-right"></i>
        </div>
      </div>
    `).join('');

  } catch (err) {
    container.innerHTML = '<p class="text-xs text-red-500 text-center col-span-full py-4">Gagal memuat Try Out.</p>';
  }
}

// BUKA PAKET TRY OUT DENGAN VALIDASI JADWAL DAN STATUS HAK AKSES 1 KALI UJIAN
async function bukaModalListPaketTryOut(masterId, namaProgram) {
  document.getElementById('modalJudulFolderTryOut').innerText = namaProgram;
  const container = document.getElementById('containerListPaketTryOutBody');
  container.innerHTML = '<p class="text-xs text-slate-400 text-center py-4">Mengecek jadwal & riwayat ujian...</p>';
  document.getElementById('modalListPaketTryOut').classList.remove('hidden');

  try {
    // 1. Ambil Jadwal Ujian untuk Master ID ini
    const { data: schedules } = await supabaseClient
      .from('tryout_schedules')
      .select('*')
      .eq('master_id', masterId);

    if (!schedules || schedules.length === 0) {
      container.innerHTML = `
        <div class="text-center py-6">
          <i class="fa-solid fa-clock-rotate-left text-slate-300 text-3xl mb-2"></i>
          <p class="text-xs font-bold text-slate-500">Belum ada jadwal Try Out dari Admin.</p>
        </div>
      `;
      return;
    }

    // 2. Ambil Riwayat Ujian Peserta yang Sedang Login
    const { data: userResults } = await supabaseClient
      .from('tryout_results')
      .select('*')
      .eq('username', currentSessionUser.username)
      .eq('master_id', masterId);

    const now = new Date();

    container.innerHTML = schedules.map(s => {
      const start = new Date(s.tgl_mulai);
      const end = new Date(s.tgl_selesai);
      const isOpen = now >= start && now <= end;
      const isEnded = now > end;

      // Cek apakah peserta sudah pernah mengerjakan paket ini
      const hasTaken = (userResults || []).find(r => r.tryout_code === s.tryout_code);

      let btnHtml = '';
      let statusBadge = '';

      if (hasTaken) {
        // Jika sudah pernah tes
        statusBadge = `<span class="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full">✓ SUDAH DIKERJAKAN</span>`;
        btnHtml = `
          <button disabled class="bg-slate-200 text-slate-500 text-xs px-4 py-2 rounded-xl font-bold cursor-not-allowed flex items-center gap-1">
            <i class="fa-solid fa-circle-check text-emerald-600"></i> Nilai: ${hasTaken.score}
          </button>
        `;
      } else if (isOpen) {
        // Jika jadwal buka & belum tes
        statusBadge = `<span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">SEDANG BERLANGSUNG</span>`;
        btnHtml = `
          <button onclick="mulaiTryOutPeserta('${s.master_id}', '${s.tryout_code}', ${s.durasi_menit})" class="bg-emerald-700 hover:bg-emerald-800 text-white text-xs px-4 py-2 rounded-xl font-bold transition shadow">
            Mulai Ujian <i class="fa-solid fa-play ml-1"></i>
          </button>
        `;
      } else if (isEnded) {
        // Jika waktu selesai
        statusBadge = `<span class="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">TELAH BERAKHIR</span>`;
        btnHtml = `<button disabled class="bg-slate-200 text-slate-400 text-xs px-4 py-2 rounded-xl font-bold cursor-not-allowed">Waktu Habis</button>`;
      } else {
        // Jika belum mulai
        statusBadge = `<span class="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">BELUM DIMULAI</span>`;
        btnHtml = `<button disabled class="bg-slate-200 text-slate-400 text-xs px-4 py-2 rounded-xl font-bold cursor-not-allowed">Belum Buka</button>`;
      }

      return `
        <div class="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-center justify-between">
          <div>
            <div class="flex items-center gap-2">
              <h4 class="text-xs font-bold text-slate-800">${s.tryout_code}</h4>
              ${statusBadge}
            </div>
            <p class="text-[10px] text-slate-500 mt-1">Jadwal: ${start.toLocaleString('id-ID')} s/d ${end.toLocaleString('id-ID')} (${s.durasi_menit} Menit)</p>
          </div>
          <div>${btnHtml}</div>
        </div>
      `;
    }).join('');

  } catch (err) {
    container.innerHTML = '<p class="text-xs text-red-500 text-center py-4">Gagal memuat daftar ujian.</p>';
  }
}

function tutupModalListPaketTryOut() {
  document.getElementById('modalListPaketTryOut').classList.add('hidden');
}

// MULAI TRY OUT (DUKUNGAN GAMBAR & DURATION TIMER)
async function mulaiTryOutPeserta(masterId, tryoutCode, durasiMenit = 60) {
  const { data: existingResult } = await supabaseClient
    .from('tryout_results')
    .select('id')
    .eq('username', currentSessionUser.username)
    .eq('master_id', masterId)
    .eq('tryout_code', tryoutCode)
    .maybeSingle();

  if (existingResult) {
    return alert("⛔ Kesempatan Ujian Habis!\nAnda sudah mengerjakan Try Out ini sebelumnya. Akses ujian hanya diizinkan 1 kali.");
  }
  
  const { data: questions, error } = await supabaseClient
    .from('tryout_questions')
    .select('*')
    .eq('master_id', masterId)
    .eq('tryout_code', tryoutCode);

  if (error || !questions || questions.length === 0) {
    return alert("Soal Try Out belum tersedia!");
  }

  currentExamQuestions = [...questions].sort(() => Math.random() - 0.5);
  activeExamCode = tryoutCode;
  activeExamMasterId = masterId;

  tutupModalListPaketTryOut();
  document.getElementById('tryoutExamTitle').innerText = `${masterId} - ${tryoutCode}`;
  
  const container = document.getElementById('containerSoalTryOutBody');
  container.innerHTML = currentExamQuestions.map((q, idx) => {
    const fixedImg = fixImageUrl(q.image_url);
    const imgHtml = fixedImg 
      ? `<div class="my-2"><img src="${fixedImg}" alt="Gambar Soal ${idx+1}" class="max-h-64 rounded-xl border border-slate-200 object-contain shadow-sm" onerror="this.onerror=null; this.src='https://via.placeholder.com/400x200?text=Gambar+Gagal+Dimuat';"></div>` 
      : '';

    return `
      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <p class="text-xs font-bold text-slate-800">${idx + 1}. ${q.soal}</p>
        ${imgHtml}
        <div class="space-y-2 text-xs text-slate-700">
          <label class="flex items-center gap-2 p-2 rounded-lg border border-slate-100 hover:bg-emerald-50 cursor-pointer">
            <input type="radio" name="soal_${q.id}" value="a" class="accent-emerald-700"> A. ${q.opsi_a}
          </label>
          <label class="flex items-center gap-2 p-2 rounded-lg border border-slate-100 hover:bg-emerald-50 cursor-pointer">
            <input type="radio" name="soal_${q.id}" value="b" class="accent-emerald-700"> B. ${q.opsi_b}
          </label>
          <label class="flex items-center gap-2 p-2 rounded-lg border border-slate-100 hover:bg-emerald-50 cursor-pointer">
            <input type="radio" name="soal_${q.id}" value="c" class="accent-emerald-700"> C. ${q.opsi_c}
          </label>
          <label class="flex items-center gap-2 p-2 rounded-lg border border-slate-100 hover:bg-emerald-50 cursor-pointer">
            <input type="radio" name="soal_${q.id}" value="d" class="accent-emerald-700"> D. ${q.opsi_d}
          </label>
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('modalPengerjaanTryOut').classList.remove('hidden');
  startExamTimer(durasiMenit * 60);
}

function startExamTimer(seconds) {
  clearInterval(activeExamTimer);
  let timeLeft = seconds;
  const timerDisplay = document.getElementById('tryoutTimerDisplay');

  activeExamTimer = setInterval(() => {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    if (timerDisplay) {
      timerDisplay.innerText = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    if (timeLeft <= 0) {
      clearInterval(activeExamTimer);
      alert("⏰ Waktu ujian telah habis! Jawaban Anda akan di-submit otomatis.");
      submitJawabanTryOutPeserta();
    }
    timeLeft--;
  }, 1000);
}

async function submitJawabanTryOutPeserta() {
  clearInterval(activeExamTimer);
  let totalSoal = currentExamQuestions.length;
  let totalBenar = 0;

  currentExamQuestions.forEach(q => {
    const selected = document.querySelector(`input[name="soal_${q.id}"]:checked`);
    if (selected) {
      const userAns = selected.value.toLowerCase().trim();
      const kunciLower = (q.kunci || '').toLowerCase().trim();

      const textAnsMap = {
        'a': (q.opsi_a || '').toLowerCase().trim(),
        'b': (q.opsi_b || '').toLowerCase().trim(),
        'c': (q.opsi_c || '').toLowerCase().trim(),
        'd': (q.opsi_d || '').toLowerCase().trim()
      };

      if (userAns === kunciLower || textAnsMap[userAns] === kunciLower) {
        totalBenar++;
      }
    }
  });

  let totalSalah = totalSoal - totalBenar;
  let score = Math.round((totalBenar / totalSoal) * 100);
  let status = score >= 65 ? "Lulus" : "Belum Lulus";

  const payload = {
    username: currentSessionUser.username,
    master_id: activeExamMasterId,
    tryout_code: activeExamCode,
    total_soal: totalSoal,
    total_benar: totalBenar,
    total_salah: totalSalah,
    score: score,
    status: status
  };

  const { error } = await supabaseClient.from('tryout_results').insert([payload]);

  if (error) {
    alert("⚠️ Gagal menyimpan rekap hasil ke database: " + error.message + "\n(Pastikan RLS pada tabel tryout_results sudah diizinkan).");
  } else {
    alert(`📊 HASIL TRY OUT BERHASIL DICATAT!\n\nJumlah Benar: ${totalBenar} dari ${totalSoal} Soal\nNilai Akhir: ${score}\nStatus: ${status.toUpperCase()}`);
  }

  document.getElementById('modalPengerjaanTryOut').classList.add('hidden');
  loadRiwayatTryOutProfil();
}

async function loadRiwayatTryOutProfil() {
  const tbody = document.getElementById('tbodyRiwayatTryOutProfil');
  if (!tbody || !currentSessionUser) return;

  const { data: results } = await supabaseClient
    .from('tryout_results')
    .select('*')
    .eq('username', currentSessionUser.username)
    .order('created_at', { ascending: false });

  if (!results || results.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-slate-400">Belum ada riwayat pengerjaan Try Out.</td></tr>';
    return;
  }

  tbody.innerHTML = results.map(r => `
    <tr class="border-b border-slate-100 text-xs">
      <td class="px-3 py-2 font-bold text-slate-700">${r.master_id}</td>
      <td class="px-3 py-2 text-slate-600">${r.tryout_code}</td>
      <td class="px-3 py-2 text-center font-semibold text-slate-700">${r.total_benar} / ${r.total_soal}</td>
      <td class="px-3 py-2 text-center font-bold text-emerald-800 text-sm">${r.score}</td>
      <td class="px-3 py-2 text-center font-bold">
        <span class="${r.status === 'Lulus' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'} px-2 py-0.5 rounded-full text-[10px]">
          ${r.status}
        </span>
      </td>
    </tr>
  `).join('');
}

// 2. REKAPITULASI NILAI TRY OUT ADMIN (DENGAN TRIPLE FILTER OK)
async function loadRekapTryOutAdmin() {
  const tbody = document.getElementById('tbodyRekapTryOutAdmin');
  if (!tbody) return;

  const filterMaster = document.getElementById('rekapFilterMaster')?.value || '';
  const filterBatch = document.getElementById('rekapFilterBatch')?.value || '';
  const filterCode = document.getElementById('rekapFilterCode')?.value || '';

  tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-slate-400">Memuat rekapitulasi nilai peserta...</td></tr>';

  try {
    let { data: results, error } = await supabaseClient
      .from('tryout_results')
      .select('*')
      .order('created_at', { ascending: false });

    // 1. ISI DROPDOWN FILTER LEBIH DULU (Tetap jalan meski data hasil tes masih kosong)
    await populateRekapFilters(results || []);

    // 2. CEK JIKA BELUM ADA DATA HASIL TES
    if (error || !results || results.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-slate-400">Belum ada peserta yang menyelesaikan Try Out.</td></tr>';
      return;
    }

    const { data: usersData } = await supabaseClient.from('users').select('username, nama, perusahaan, training_id');

    // 3. FILTER DATA BERDASARKAN SELEKSI ADMIN
    let filteredResults = results.filter(r => {
      const matchMaster = !filterMaster || r.master_id === filterMaster;
      const matchCode = !filterCode || r.tryout_code === filterCode;

      let matchBatch = true;
      if (filterBatch) {
        const uInfo = (usersData || []).find(u => u.username === r.username);
        matchBatch = uInfo && uInfo.training_id === filterBatch;
      }

      return matchMaster && matchCode && matchBatch;
    });

    if (filteredResults.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-slate-400 italic">Tidak ada rekap nilai yang sesuai dengan filter.</td></tr>';
      return;
    }

    // 4. RENDER BARIS TABEL
    tbody.innerHTML = filteredResults.map((r, idx) => {
      const uInfo = (usersData || []).find(u => u.username === r.username);
      const namaPeserta = uInfo ? uInfo.nama : r.username;
      const perusahaan = uInfo ? uInfo.perusahaan : '-';

      return `
        <tr class="border-b border-slate-100 text-xs hover:bg-slate-50 transition">
          <td class="p-3 text-center font-bold text-slate-400">${idx + 1}</td>
          <td class="p-3">
            <p class="font-bold text-slate-800">${namaPeserta}</p>
            <p class="text-[10px] text-slate-400">${perusahaan}</p>
          </td>
          <td class="p-3">
            <span class="font-bold text-emerald-800">[${r.master_id}]</span> ${r.tryout_code}
          </td>
          <td class="p-3 text-center font-semibold text-slate-700">${r.total_benar} / ${r.total_soal}</td>
          <td class="p-3 text-center font-extrabold text-sm ${r.score >= 65 ? 'text-emerald-700' : 'text-red-600'}">${r.score}</td>
          <td class="p-3 text-center">
            <span class="${r.status === 'Lulus' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'} px-2 py-0.5 rounded-full text-[10px] font-bold">
              ${r.status}
            </span>
          </td>
        </tr>
      `;
    }).join('');

  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-red-500">Gagal memuat rekapitulasi nilai.</td></tr>';
  }
}

// FUNGSI POPULATE AUTO UNTUK DROPDOWN FILTER REKAP
async function populateRekapFilters(results = []) {
  const selectMaster = document.getElementById('rekapFilterMaster');
  const selectBatch = document.getElementById('rekapFilterBatch');
  const selectCode = document.getElementById('rekapFilterCode');

  // 1. Opsi Program Training selalu diisi dari KATALOG_MODUL_MASTER
  if (selectMaster && selectMaster.options.length <= 1) {
    KATALOG_MODUL_MASTER.forEach(m => {
      selectMaster.innerHTML += `<option value="${m.master_id}">${m.nama_program}</option>`;
    });
  }

  // 2. Opsi Kode Try Out diisi dari hasil yang ada
  if (selectCode && selectCode.options.length <= 1 && results.length > 0) {
    const codes = [...new Set(results.map(r => r.tryout_code))];
    codes.forEach(c => {
      selectCode.innerHTML += `<option value="${c}">${c}</option>`;
    });
  }

  // 3. Opsi Batch Peserta diisi dari tabel trainings
  if (selectBatch && selectBatch.options.length <= 1) {
    const { data: batches } = await supabaseClient.from('trainings').select('*');
    if (batches) {
      sortBatchesDescending([...batches]).forEach(b => {
        selectBatch.innerHTML += `<option value="${b.id}">${b.judul}</option>`;
      });
    }
  }
}

// ----------------------------------------------------
// EVENT LISTENER LOAD PAGE (AUTO LOGIN)
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  checkAutoLogin();
});

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
  } else if (tabName === 'modul') {
    document.getElementById('tabAdminModul').classList.remove('hidden');
    document.getElementById('tabBtnAdminModul').classList.add('bg-emerald-800', 'text-white');
    loadDropdownMasterModulAdmin();
    loadDatabaseModulAdmin();
  } else if (tabName === 'tryout') {
  document.getElementById('tabAdminTryout').classList.remove('hidden');
  document.getElementById('tabBtnAdminTryout').classList.add('bg-emerald-800', 'text-white');
  loadDropdownMasterSoalAdmin();
  loadDatabaseSoalAdmin();
  loadRekapTryOutAdmin();
  loadDropdownJadwalMasterAdmin();
}
};

// ----------------------------------------------------
// FUNGSI GANTI PASSWORD ADMIN
// ----------------------------------------------------
function aturTampilanAdmin(isAdmin) {
  const btnGantiPass = document.getElementById('btnGantiPassAdmin');
  if (btnGantiPass) {
    if (isAdmin) {
      btnGantiPass.classList.remove('hidden');
    } else {
      btnGantiPass.classList.add('hidden');
    }
  }
}

function bukaModalPassAdmin() {
  document.getElementById('adminPassLama').value = '';
  document.getElementById('adminPassBaru').value = '';
  document.getElementById('adminPassKonfirm').value = '';
  document.getElementById('modalGantiPassAdmin').classList.remove('hidden');
}

function tutupModalPassAdmin() {
  document.getElementById('modalGantiPassAdmin').classList.add('hidden');
}

async function simpanPasswordAdminBaru() {
  const passLama = document.getElementById('adminPassLama').value.trim();
  const passBaru = document.getElementById('adminPassBaru').value.trim();
  const passKonfirm = document.getElementById('adminPassKonfirm').value.trim();

  const session = JSON.parse(localStorage.getItem('mmd_user_session') || '{}');
  if (!session.username || session.role !== 'admin') {
    alert("Sesi admin tidak valid!");
    return;
  }

  if (!passLama || !passBaru || !passKonfirm) {
    alert("Harap isi semua kolom password!");
    return;
  }

  if (passLama !== session.password) {
    alert("Password lama kamu salah!");
    return;
  }

  if (passBaru !== passKonfirm) {
    alert("Konfirmasi password baru tidak cocok!");
    return;
  }

  if (passBaru.length < 5) {
    alert("Password minimal 5 karakter!");
    return;
  }

  const { error } = await supabaseClient
    .from('users')
    .update({ password: passBaru })
    .eq('username', session.username);

  if (error) {
    alert("Gagal memperbarui password: " + error.message);
    return;
  }

  session.password = passBaru;
  localStorage.setItem('mmd_user_session', JSON.stringify(session));

  tutupModalPassAdmin();
  alert("Password akun admin berhasil diubah!");
}

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
window.simpanLinkMateriAdmin = simpanLinkMateriAdmin;
window.bukaModalFolderModul = bukaModalFolderModul;
window.tutupModalFolderModul = tutupModalFolderModul;
window.loadDatabaseModulAdmin = loadDatabaseModulAdmin;
window.editNamaModulAdmin = editNamaModulAdmin;
window.hapusModulAdmin = hapusModulAdmin;

// Ekspor Fungsi Try Out Ke Global Scope
window.simpanSoalTryOutAdmin = simpanSoalTryOutAdmin;
window.importExcelSoalTryOut = importExcelSoalTryOut;
window.simpanJadwalTryOutAdmin = simpanJadwalTryOutAdmin;
window.batalEditSoalAdmin = batalEditSoalAdmin;
window.loadDatabaseSoalAdmin = loadDatabaseSoalAdmin;
window.bukaModalDetailPaketSoalAdmin = bukaModalDetailPaketSoalAdmin;
window.persiapkanEditSoalAdmin = persiapkanEditSoalAdmin;
window.hapusSoalAdmin = hapusSoalAdmin;
window.loadFolderTryOutPeserta = loadFolderTryOutPeserta;
window.bukaModalListPaketTryOut = bukaModalListPaketTryOut;
window.tutupModalListPaketTryOut = tutupModalListPaketTryOut;
window.mulaiTryOutPeserta = mulaiTryOutPeserta;
window.submitJawabanTryOutPeserta = submitJawabanTryOutPeserta;
window.loadRekapTryOutAdmin = loadRekapTryOutAdmin;

// Ekspor Fungsi Ganti Password Admin Ke Global Scope
window.bukaModalPassAdmin = bukaModalPassAdmin;
window.tutupModalPassAdmin = tutupModalPassAdmin;
window.simpanPasswordAdminBaru = simpanPasswordAdminBaru;

// Hapus Folder Paket Soal
window.hapusFolderPaketSoalAdmin = hapusFolderPaketSoalAdmin;

// Input soal perbatch
window.onJadwalMasterChange = onJadwalMasterChange;
window.simpanJadwalTryOutAdmin = simpanJadwalTryOutAdmin;
window.loadDropdownJadwalMasterAdmin = loadDropdownJadwalMasterAdmin;
