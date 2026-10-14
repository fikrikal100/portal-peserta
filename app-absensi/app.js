// ----------------------------------------------------
// 1. INISIALISASI SUPABASE
// ----------------------------------------------------
const SUPABASE_URL = "https://bxgzkfvqwkzbnikvvjhp.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4Z3prZnZxd2t6Ym5pa3Z2amhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE5MjQ1NjMsImV4cCI6MjEwNzUwMDU2M30.mSC45wlyGiP2V6UpCTeIJWZs9HVu7Z4ZaqucUFqDqDg";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let currentSessionUser = null;
let currCalDate = new Date();
let selectedBatchDates = [];

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
  } else if (tabName === 'info') {
    document.getElementById('tabPesertaInfo').classList.remove('hidden');
    document.getElementById('tabBtnInfo').classList.add('bg-emerald-800', 'text-white');
  }
}

function renderPesertaData(user) {
  document.getElementById('pesertaNama').innerText = user.nama || '-';
  document.getElementById('pesertaPerusahaan').innerHTML = `<i class="fa-solid fa-building mr-1"></i> Perusahaan: ${user.perusahaan || '-'}`;
  document.getElementById('pesertaNIK').innerText = user.nik || '-';
  document.getElementById('pesertaUsername').innerText = user.username || '-';
  
  const tInfo = user.trainings;
  document.getElementById('pesertaTraining').innerText = tInfo ? tInfo.judul : (user.training_id || '-');
  
  if (tInfo && tInfo.jadwal_tanggal && tInfo.jadwal_tanggal.length > 0) {
    const sorted = [...tInfo.jadwal_tanggal].sort();
    document.getElementById('pesertaJadwal').innerText = `${sorted[0]} s/d ${sorted[sorted.length-1]} (${sorted.length} Hari Pelatihan)`;
  } else if (tInfo) {
    document.getElementById('pesertaJadwal').innerText = `${tInfo.tgl_mulai} s/d ${tInfo.tgl_selesai}`;
  } else {
    document.getElementById('pesertaJadwal').innerText = 'Sesuai Jadwal Sesi';
  }

  if (user.url_sertifikat) {
    document.getElementById('boxSertifikatPeserta').classList.remove('hidden');
    document.getElementById('pesanSertifikatBelum').classList.add('hidden');
    document.getElementById('btnDownloadSertifikat').href = user.url_sertifikat;
  }

  loadMatriksAbsensiUser();
}

// ----------------------------------------------------
// 3. LOGIKA ABSENSI REAL-TIME & MATRIKS SUPABASE
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
      ? `<span class="bg-emerald-100 text-emerald-800 text-[10px] px-2.5 py-1 rounded-full font-bold">✓ Hadir (${s1.waktu_absen ? s1.waktu_absen.substring(11,16) : 'Sesi 1'})</span>` 
      : `<span class="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded-full font-semibold">Belum Absen</span>`;

    const badgeS2 = s2 
      ? `<span class="bg-emerald-100 text-emerald-800 text-[10px] px-2.5 py-1 rounded-full font-bold">✓ Hadir (${s2.waktu_absen ? s2.waktu_absen.substring(11,16) : 'Sesi 2'})</span>` 
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

    const now = new Date();
    const jam = now.getHours();
    let sesiNum = 1;
    if (jam >= 12) sesiNum = 2;

    const tglHariIni = now.toISOString().split('T')[0];

    const { error } = await supabaseClient.from('log_absensi').insert([{
      username: currentSessionUser.username,
      training_id: currentSessionUser.training_id,
      tanggal: tglHariIni,
      sesi: sesiNum,
      waktu_absen: now.toISOString(),
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
// 5. KALENDER MULTI-SELECT PILIHAN ADMIN
// ----------------------------------------------------
function renderCalendar() {
  const grid = document.getElementById('calendarGrid');
  grid.innerHTML = '';

  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const y = currCalDate.getFullYear();
  const m = currCalDate.getMonth();

  document.getElementById('calendarMonthYear').innerText = `${monthNames[m]} ${y}`;

  const firstDay = new Date(y, m, 1).getDay();
  const totalDays = new Date(y, m + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    grid.innerHTML += `<div></div>`;
  }

  for (let day = 1; day <= totalDays; day++) {
    const dateString = `${y}-${String(m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const isSelected = selectedBatchDates.includes(dateString);

    const btnClass = isSelected 
      ? "bg-emerald-700 text-white font-bold rounded-xl p-2 text-center shadow ring-2 ring-emerald-500 transition"
      : "bg-white border text-slate-700 font-semibold rounded-xl p-2 text-center hover:bg-emerald-50 transition";

    grid.innerHTML += `
      <button onclick="toggleDateSelection('${dateString}')" class="${btnClass}">
        ${day}
      </button>
    `;
  }

  renderSelectedBadges();
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
  document.getElementById('textSelectedDatesCount').innerText = `${selectedBatchDates.length} Hari`;
  const container = document.getElementById('containerSelectedBadges');
  container.innerHTML = '';
  selectedBatchDates.forEach(d => {
    container.innerHTML += `
      <span class="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
        ${d} <i onclick="toggleDateSelection('${d}')" class="fa-solid fa-xmark cursor-pointer hover:text-red-600"></i>
      </span>
    `;
  });
}

function changeMonth(dir) {
  currCalDate.setMonth(currCalDate.getMonth() + dir);
  renderCalendar();
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
  const { data } = await supabaseClient.from('trainings').select('*');
  
  const selectRekap = document.getElementById('adminSelectBatchRekap');
  const selectManual = document.getElementById('manualSelectBatch');
  
  selectRekap.innerHTML = '<option value="">-- Pilih Batch Training --</option>';
  selectManual.innerHTML = '<option value="">-- Pilih Batch Pelatihan --</option>';

  (data || []).forEach(b => {
    const totalHari = b.jadwal_tanggal ? b.jadwal_tanggal.length : '-';
    const optHtml = `<option value="${b.id}">${b.judul} (${totalHari} Hari Sesi)</option>`;
    selectRekap.innerHTML += optHtml;
    selectManual.innerHTML += optHtml;
  });
}

// ----------------------------------------------------
// 7. INPUT PESERTA MANUAL
// ----------------------------------------------------
async function simpanPesertaManual() {
  const nama = document.getElementById('manualNama').value.trim();
  const tglLahirRaw = document.getElementById('manualTglLahir').value;
  const nik = document.getElementById('manualNIK').value.trim();
  const perusahaan = document.getElementById('manualPerusahaan').value.trim();
  const trainingId = document.getElementById('manualSelectBatch').value;

  if (!nama || !tglLahirRaw || !trainingId) {
    return alert("Harap lengkapi Nama, Tanggal Lahir, dan Pilih Batch Pelatihan!");
  }

  const parts = tglLahirRaw.split('-');
  const formattedPassword = `${parts[2]}${parts[1]}${parts[0]}`;
  const formattedUsername = nama.replace(/\s+/g, '').toLowerCase();
  const idSertifikat = `${formattedUsername}_${formattedPassword}`;

  const userObject = {
    username: formattedUsername,
    password: formattedPassword,
    nama: nama,
    nik: nik || '-',
    tgl_lahir: tglLahirRaw,
    perusahaan: perusahaan || 'PT Mandiri Maha Daya',
    training_id: trainingId,
    id_sertifikat: idSertifikat,
    role: 'peserta'
  };

  const { error } = await supabaseClient.from('users').upsert([userObject]);

  if (error) {
    alert("Gagal menambahkan peserta: " + error.message);
  } else {
    alert(`✅ Peserta Berhasil Ditambahkan!\n\nUsername: ${formattedUsername}\nPassword: ${formattedPassword}\nID Sertifikat: ${idSertifikat}`);
    
    document.getElementById('manualNama').value = '';
    document.getElementById('manualTglLahir').value = '';
    document.getElementById('manualNIK').value = '';
    document.getElementById('manualPerusahaan').value = '';
    document.getElementById('manualSelectBatch').value = '';
  }
}

// ----------------------------------------------------
// 8. IMPORT EXCEL & UPLOAD SERTIFIKAT
// ----------------------------------------------------
function importExcelPeserta() {
  const fileInput = document.getElementById('fileExcelPeserta');
  const file = fileInput.files[0];
  if (!file) return alert("Pilih file Excel lebih dulu!");

  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      const usersToInsert = rows.map(r => {
        const formattedUsername = String(r.Nama).replace(/\s+/g, '').toLowerCase();
        const idSertifikat = `${formattedUsername}_${String(r.TanggalLahir).replace(/[^0-9]/g, '')}`;

        return {
          username: formattedUsername,
          password: String(r.TanggalLahir),
          nama: r.Nama,
          nik: r.NIK ? String(r.NIK) : '-',
          perusahaan: r.Perusahaan || 'PT Mandiri Maha Daya',
          training_id: r.KodeTraining,
          id_sertifikat: idSertifikat,
          role: 'peserta'
        };
      });

      const { error } = await supabaseClient.from('users').upsert(usersToInsert);
      if (error) alert("Gagal import: " + error.message);
      else alert(`Berhasil mengimpor ${usersToInsert.length} akun peserta!`);

    } catch (err) {
      alert("Gagal membaca file Excel: " + err.message);
    }
  };
  reader.readAsArrayBuffer(file);
}

async function uploadSertifikatMasal() {
  const fileInput = document.getElementById('fileSertifikatMasal');
  const files = fileInput.files;
  if (!files.length) return alert("Pilih minimal 1 file PDF sertifikat!");

  let sukses = 0;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filenameWithoutExt = file.name.replace(/\.[^/.]+$/, "").toLowerCase();

    const { data: uploadData, error: uploadErr } = await supabaseClient.storage
      .from('sertifikat')
      .upload(`public/${file.name}`, file, { upsert: true });

    if (!uploadErr) {
      const { data: urlData } = supabaseClient.storage.from('sertifikat').getPublicUrl(`public/${file.name}`);
      
      await supabaseClient.from('users')
        .update({ url_sertifikat: urlData.publicUrl })
        .eq('id_sertifikat', filenameWithoutExt);

      sukses++;
    }
  }
  alert(`Selesai memproses ${sukses} dari ${files.length} sertifikat!`);
}

// ----------------------------------------------------
// 9. EXPORT REKAP ABSENSI PDF A4 (PER HARI & DENGAN FOTO)
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

    const pdfContainer = document.getElementById('pdfExportContainer');
    
    let htmlBody = `
      <div class="pdf-page" id="pdfTemplateArea">
        <div class="pdf-header text-center">
          <h2 style="font-size: 16px; font-weight: bold; color: #065f46; margin: 0;">PT MANDIRI MAHA DAYA</h2>
          <h3 style="font-size: 13px; font-weight: bold; margin: 4px 0;">LAPORAN REKAPITULASI KEHADIRAN PESERTA K3</h3>
          <p style="font-size: 11px; font-weight: bold; color: #047857; margin: 2px 0;">PROGRAM: ${trainingData.judul.toUpperCase()}</p>
          <p style="font-size: 10px; color: #64748b; margin: 0;">Jadwal Pelatihan: ${listTanggal[0] || '-'} s/d ${listTanggal[listTanggal.length-1] || '-'} (${listTanggal.length} Hari Sesi)</p>
        </div>
    `;

    listTanggal.forEach((dateStr, hIdx) => {
      htmlBody += `
        <div style="margin-top: 15px; margin-bottom: 8px;">
          <h4 style="font-size: 11px; font-weight: bold; color: #065f46; background-color: #ecfdf5; padding: 6px 10px; border-left: 4px solid #047857; margin: 0;">
            HARI KE-${hIdx + 1} : TANGGAL ${dateStr}
          </h4>
        </div>

        <table class="pdf-table">
          <thead>
            <tr>
              <th style="width: 5%;">NO</th>
              <th style="width: 20%;">NAMA PESERTA / NIK</th>
              <th style="width: 18%;">PERUSAHAAN</th>
              <th style="width: 22%;">SESI 1 (PAGI 08.00-12.00)</th>
              <th style="width: 22%;">SESI 2 (SIANG 13.00-17.00)</th>
              <th style="width: 13%;">STATUS</th>
            </tr>
          </thead>
          <tbody>
      `;

      pesertaList.forEach((p, pIdx) => {
        const absS1 = (logList || []).find(l => l.username === p.username && l.tanggal === dateStr && Number(l.sesi) === 1);
        const absS2 = (logList || []).find(l => l.username === p.username && l.tanggal === dateStr && Number(l.sesi) === 2);

        const imgS1 = absS1 && absS1.foto 
          ? `<img src="${absS1.foto}" class="img-absen-thumb"><p style="font-size: 8px; text-align: center; margin-top: 2px;">Jam: ${absS1.waktu_absen ? absS1.waktu_absen.substring(11,16) : '-'}</p>`
          : `<span style="color: #dc2626; font-size: 9px; display: block; text-align: center;">Belum Absen</span>`;

        const imgS2 = absS2 && absS2.foto 
          ? `<img src="${absS2.foto}" class="img-absen-thumb"><p style="font-size: 8px; text-align: center; margin-top: 2px;">Jam: ${absS2.waktu_absen ? absS2.waktu_absen.substring(11,16) : '-'}</p>`
          : `<span style="color: #dc2626; font-size: 9px; display: block; text-align: center;">Belum Absen</span>`;

        let statusStr = `<span style="color: #64748b; font-weight: bold;">0%</span>`;
        if (absS1 && absS2) statusStr = `<span style="color: #047857; font-weight: bold;">Lengkap 100%</span>`;
        else if (absS1 || absS2) statusStr = `<span style="color: #2563eb; font-weight: bold;">Parsial 50%</span>`;

        htmlBody += `
          <tr>
            <td style="text-align: center;">${pIdx + 1}</td>
            <td>
              <b>${p.nama}</b><br>
              <span style="font-size: 8px; color: #64748b;">NIK: ${p.nik || '-'}</span>
            </td>
            <td>${p.perusahaan || '-'}</td>
            <td style="text-align: center;">${imgS1}</td>
            <td style="text-align: center;">${imgS2}</td>
            <td style="text-align: center;">${statusStr}</td>
          </tr>
        `;
      });

      htmlBody += `
          </tbody>
        </table>
      `;
    });

    htmlBody += `
        <div style="margin-top: 20px; font-size: 9px; color: #64748b; text-align: right;">
          Dicetak Otomatis via Portal Mandiri Maha Daya pada ${new Date().toLocaleString('id-ID')}
        </div>
      </div>
    `;

    pdfContainer.innerHTML = htmlBody;

    const element = document.getElementById('pdfTemplateArea');
    const opt = {
      margin:       0,
      filename:     `Laporan_Kehadiran_${selectedBatchId}_A4.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
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
