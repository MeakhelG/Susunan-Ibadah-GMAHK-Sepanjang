/**
 * ============================================================
 * script.js — Generator Susunan Ibadah GMAHK Sepanjang
 * ============================================================
 * 
 * DAFTAR ISI:
 * 
 *   1. KONEKSI SUPABASE
 *      - Inisialisasi client Supabase (URL + Publishable Key)
 * 
 *   2. VARIABEL GLOBAL & SETUP
 *      - Referensi elemen DOM (form, inputs, preview)
 *      - State tab aktif
 * 
 *   3. FUNGSI HELPER
 *      - namaBulan[]         : Array nama bulan Indonesia
 *      - formatTanggalRabu() : Format tanggal khusus Rabu Malam
 *      - formatTanggalString(): Format tanggal umum (DD - Bulan - YYYY)
 *      - gV()                : Ambil value input, kembalikan "...." jika kosong
 * 
 *   4. GENERATOR TEKS WHATSAPP (updatePreview)
 *      - Template Rabu Malam
 *      - Template Pemuda Advent (PA)
 *      - Template Sabat Raya (SS + Khotbah)
 * 
 *   5. TAB SWITCHER
 *      - switchTab(): Ganti tab aktif & update preview
 * 
 *   6. EVENT LISTENERS
 *      - Auto-update preview setiap input berubah
 * 
 *   7. EKSKLUSIVITAS DROPDOWN (Operator / Pianist / Pemimpin Lagu)
 *      - normalizeName()        : Samakan format nama (Sdr/Sdra./Sdri.)
 *      - handleSelectExclusivity(): Kunci opsi yang sudah dipilih di dropdown lain
 * 
 *   8. COPY TO CLIPBOARD
 *      - copyToClipboard(): Salin teks preview ke clipboard + animasi feedback
 * 
 *   9. TEMA GELAP / TERANG
 *      - toggleTheme()    : Toggle class 'light-theme' + simpan ke localStorage
 *      - Inisialisasi tema: Baca localStorage saat halaman dimuat
 * 
 *   10. SUPABASE AUTO-FILL
 *       - setSelectValueSafely()             : Set dropdown dengan fuzzy matching
 *       - fetchAndFillNextSabbathSchedule()   : Tarik data Sabat terdekat & isi form
 *       - Logika tanggal: Cari >= hari ini, ambil 1 terdekat
 *       - Mapping kolom DB ke field HTML
 * 
 * ============================================================
 */


/* ============================================================
   1. KONEKSI SUPABASE
   - URL dan Publishable Key diambil dari Dashboard Supabase
   - Key ini AMAN ditaruh di frontend (dilindungi oleh RLS)
   ============================================================ */
const supabaseUrl = 'https://ymvhvaytlfexspvumnnj.supabase.co';
const supabaseKey = 'sb_publishable_2_acMp4RrGHbmhdIb9JSIw_H5CfIQcn';
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);


/* ============================================================
   2. VARIABEL GLOBAL & SETUP
   ============================================================ */
const form = document.getElementById('generatorForm');
const inputs = form.querySelectorAll('input, select');
const previewText = document.getElementById('previewText');
let currentTab = 'sabat'; // Tab default saat pertama kali dibuka


/* ============================================================
   3. FUNGSI HELPER
   ============================================================ */

// Daftar nama bulan dalam Bahasa Indonesia
const namaBulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

/**
 * Format tanggal untuk template Rabu Malam
 * Output: "Rabu,  12 April 2026"
 */
function formatTanggalRabu(dateString) {
    if (!dateString) return "[Pilih Tanggal]";
    const dateObj = new Date(dateString);
    if (isNaN(dateObj)) return "[Pilih Tanggal]";

    const tg = String(dateObj.getDate()).padStart(2, '0');
    const bln = namaBulan[dateObj.getMonth()];
    const thn = dateObj.getFullYear();

    return `Rabu,  ${tg} ${bln} ${thn}`;
}

/**
 * Format tanggal untuk template Sabat Raya & PA
 * Output: "12  -  April  -  2026"
 */
function formatTanggalString(dateString) {
    if (!dateString) return "[Pilih Tanggal]";
    const dateObj = new Date(dateString);
    if (isNaN(dateObj)) return "[Pilih Tanggal]";

    const tg = String(dateObj.getDate()).padStart(2, '0');
    const bln = namaBulan[dateObj.getMonth()];
    const thn = dateObj.getFullYear();

    return `${tg}  -  ${bln}  -  ${thn}`;
}

/**
 * Ambil value dari input berdasarkan ID
 * Jika kosong, kembalikan placeholder "......................"
 */
function gV(id) {
    const val = document.getElementById(id).value.trim();
    return val ? val : "......................";
}


/* ============================================================
   4. GENERATOR TEKS WHATSAPP (updatePreview)
   - Fungsi utama yang membangun teks WhatsApp berdasarkan tab aktif
   - Dipanggil setiap kali ada perubahan input
   ============================================================ */
function updatePreview() {

    // -------------------------------------------
    // 4a. TEMPLATE RABU MALAM
    // -------------------------------------------
    if (currentTab === 'rabu') {
        const tglStr = formatTanggalRabu(document.getElementById('rmTanggal').value);

        const teks = `"JADWAL IBADAH  RABU MALAM" : 

GMAHK Sepanjang mengundang Anda untuk bergabung ke rapat Zoom yang terjadwal.

Topik: Ibadah Rabu Malam GMAHK Sepanjang 
Waktu: ${document.getElementById('rmTanggal').value ? tglStr : 'Rabu, [Pilih Tanggal]'}; Jam: 19:00 WIB (ontime)

Bergabung ke Rapat Zoom
https://us06web.zoom.us/j/83615502100?pwd=bmRVcGaCg35OCJWbaD7M7o22SEMqKl.1

ID Rapat: 836 1550 2100
Kode Sandi: sepanjang


🌟 JADWAL PELAYANAN 
⛪️ Konferens Jawa Kawasan Timur
🗓️ ${document.getElementById('rmTanggal').value ? tglStr : 'Rabu, [Pilih Tanggal]'}
🕕 Pukul 19.00 WIB (Malam)

Pelayan Ibadah:
* Host: ${gV('rmHost')}
* MC, Doa: ${gV('rmMcDoa')}
* Kesaksian: ${gV('rmKesaksian')}
${document.getElementById('togglePujianRabu').checked ? `* _Pujian: ${document.getElementById('rmPujian').value.trim() ? document.getElementById('rmPujian').value.trim() + '_' : '_'}\n` : ''}* Firman Tuhan: ${gV('rmFirman')}
* Doa Tutup: ${gV('rmDoaTutup')}
* Ucapan Terima kasih & Pengumuman: ${document.getElementById('rmPengumuman').value || "Ketua"}

📖 "Dan apa saja yang kamu minta dalam doa dengan penuh kepercayaan, kamu akan menerimanya."
— Matius 21:22

✨ Selamat Melayani
🙏 Tuhan Memberkati`;
        previewText.textContent = teks;
        return;
    }

    // -------------------------------------------
    // 4b. TEMPLATE PEMUDA ADVENT (PA)
    // -------------------------------------------
    if (currentTab === 'pa') {
        const tglStr = formatTanggalString(document.getElementById('paTanggal').value);
        const teks = `*Selamat Sabat dan Selamat Malam KUPAS Berikut adalah :* 
*Susunan Partisipan Ibadah Pemuda Advent Tanggal ${document.getElementById('paTanggal').value ? tglStr : '[Pilih Tanggal]'}*

● *MC & Janji PA* : ${gV('paMc')}

● *Lagu Buka* : AYS ${gV('paLaguBukaNo')}: *"${gV('paLaguBukaJudul')}"* 

● *Ayat Inti & Doa Buka* : ${gV('paAyatDoa')}

● *BAB* : ${gV('paBabNama')} (${gV('paBabJudul')})

● *Funfact / Tips* : ${gV('paFunfact')}

● *Games* : ${gV('paGames')}

● *Acara Inti* : ${gV('paAcaraInti')}

● *Lagu Tutup* : AYS ${gV('paLaguTutupNo')}: *"${gV('paLaguTutupJudul')}"* 

● *Doa Tutup* : ${gV('paDoaTutup')}

● *Pengumuman* : ${document.getElementById('paPengumuman').value || "Ketua PA"}

● *Laporan Bendahara* : ${document.getElementById('paBendahara').value || "Bendahara PA"}

*Selamat Melayani~*
*Tuhan Memberkati😇🙏*`;
        previewText.textContent = teks;
        return;
    }

    // -------------------------------------------
    // 4c. TEMPLATE SABAT RAYA (Default)
    // -------------------------------------------

    // Info Umum
    const tglRaw = document.getElementById('tanggal').value;
    const tglStr = formatTanggalString(tglRaw);

    // Sabat Ke dan TW (pakai "...." jika kosong, bukan placeholder panjang)
    const sabatKeRaw = document.getElementById('sabatKe').value.trim();
    const sabatKe = sabatKeRaw ? sabatKeRaw : "....";
    const twRaw = document.getElementById('tw').value.trim();
    const tw = twRaw ? twRaw : "....";

    const waktuMulai = gV('waktuMulai');
    const waktuSelesai = gV('waktuSelesai');

    // Jenis Sabat (Opsional, misal: SSAA, PERJAMUAN KUDUS)
    const jenisSabatInput = document.getElementById('jenisSabat').value.trim();
    const typeSabatString = jenisSabatInput !== "" ? ` ${jenisSabatInput.toUpperCase()}` : "";

    // Bangun template teks WhatsApp Sabat Raya
    const hasil = `*Sabat Shalom 🌿*

*Hari Sabat-Oh! Jadikanlah itu sebagai hari yang paling indah dan yang paling berbahagia dari hari-hari sepanjang minggu.*
Review and Herald. 14 April 1885. 

*Susunan Ibadah SABAT${typeSabatString}* 

*Sabat ke - ${sabatKe} TW - ${tw}*
${tglStr}

*Dimulai Pukul : ${waktuMulai} WIB - ${waktuSelesai} WIB*

● *Operator*
${gV('ssOperator')} 

● *Pianist*
${gV('ssPianist')} 


*IBADAH SEKOLAH SABAT* 

● *MC + Yel Yel SS*
${gV('ssMc')}

● *Lagu Buka*
LSEL No. ${gV('ssLaguBukaNo')}:
*"${gV('ssLaguBukaJudul')}"*

● *Ayat Inti SS dan Doa Buka*
${gV('ssAyatDoa')}

● *Bacaan Berita Mission*
${gV('ssMission')}

● *Ringkasan Sekolah Sabat Dewasa*
${gV('ssRingkasan')}

● *Promosi Pelayanan Perorangan*
${gV('ssPromosi')}

● *Lagu Tutup* 
LSEL No. ${gV('ssLaguTutupNo')}:
*"${gV('ssLaguTutupJudul')}"*

● *Doa Tutup*
${gV('ssDoaTutup')}


● *PENGUMUMAN*
${document.getElementById('pengumuman').value || "Officers/Tua-Tua Jemaat"}

● *Cerita Alkitab Anak*
${gV('khCerita')} 


*IBADAH KHOTBAH*

● *Diakon/Diakones*
1. ${gV('khDiakon1')}
2. ${gV('khDiakon2')}

● *Pemimpin Lagu*
${gV('khPemimpinLagu')}

● *Lagu Pengiring Partisipan Masuk Mimbar Atas*
LSEL No. 515:
*"Tuhan Ada Dalam Bait Allah"*

● *Lagu Pembuka*
LSEL No. 1:
*"Di Hadapan Hadirat-Mu"*

● *Doa Buka*
${gV('khDoaBuka')}

● *Ayat Bersahutan*
${gV('khAyatBersahutanNama')}
*${gV('khAyatBersahutanRef')}*

● *Lagu Buka* 
LSEL No. ${gV('khLaguBukaNo')}:
*"${gV('khLaguBukaJudul')}"*

● *Lagu Pengantar Doa Syafaat*
LSEL No. 520
*"Kami Datang Dalam Doa"*

● *Doa Syafaat*
${gV('khDoaSyafaat')}

● *Lagu Sambutan Doa Syafaat*
LSEL No. 516
*"Dengar Ya Tuhan"*

● *Bacaan Persembahan & Persepuluhan*
${gV('khBacaanPersembahan')}

● *Lagu Persembahan*
LSEL No. 260:
*"Bawa Persembahanmu"*

● *Lagu Sambutan Persembahan*
LSEL No. 21
*"Pada-Mu Allah Ku Puji"* 

● *Doa Persembahan*
${gV('khDoaPersembahan')}

${document.getElementById('togglePujianSabat').checked ? `● *Lagu Pujian*\n${gV('khLaguPujian')}\n\n` : ''}● *Ayat Inti*
${gV('khAyatIntiNama')} 
*${gV('khAyatIntiRef')}*

● *Lagu Tema* 
*"MISI KITA"*

● *PENGKHOTBAH*
${gV('khPengkhotbahNama')}
*"${gV('khPengkhotbahJudul')}"*

● *Lagu Tutup*
LSEL No ${gV('khLaguTutupNo')}:
*"${gV('khLaguTutupJudul')}"*

● *Doa TUTUP dan Doa BERKAT*
${gV('khDoaBerkat')}

__________________________

_Janganlah kita menjauhkan diri dari pertemuan-pertemuan ibadah kita, seperti dibiasakan oleh beberapa orang, tetapi marilah kita saling menasihati, dan semakin giat melakukannya menjelang hari Tuhan yang mendekat._
Ibrani 10 : 25`;

    previewText.textContent = hasil;
}


/* ============================================================
   5. TAB SWITCHER
   - Mengubah tab aktif dan memperbarui preview
   ============================================================ */
function switchTab(tabId) {
    currentTab = tabId;

    // Matikan semua tombol & pane
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));

    // Nyalakan yang diklik
    document.getElementById('btn-tab-' + tabId).classList.add('active');
    document.getElementById('tab-' + tabId).classList.add('active');

    // Update text
    updatePreview();
}


/* ============================================================
   6. EVENT LISTENERS
   - Auto-update preview setiap kali user mengetik atau memilih
   ============================================================ */
inputs.forEach(input => {
    input.addEventListener('input', updatePreview);
    input.addEventListener('change', updatePreview); // khusus untuk date picker / select
});

// Panggil sekali saat dimuat untuk inisiasi preview awal
updatePreview();


/* ============================================================
   7. EKSKLUSIVITAS DROPDOWN (Operator / Pianist / Pemimpin Lagu)
   - Mencegah 1 orang bertugas ganda di 3 posisi sekaligus
   - Normalisasi nama: "Sdr", "Sdra.", "Sdri.", "Sdri" dianggap sama
   ============================================================ */

/**
 * Normalisasi nama agar perbandingan tidak terganggu oleh
 * perbedaan penulisan (Sdr vs Sdra., Sdri vs Sdri.)
 */
function normalizeName(name) {
    if (!name) return "";
    return name.toLowerCase()
        .replace(/\./g, '')
        .replace(/sdra\s/g, 'sdr ')
        .replace(/sdri\s/g, 'sdri ')
        .trim();
}

/**
 * Kunci opsi di dropdown lain jika orang tersebut sudah terpilih
 */
function handleSelectExclusivity() {
    const selects = [
        document.getElementById('ssOperator'),
        document.getElementById('ssPianist'),
        document.getElementById('khPemimpinLagu')
    ].filter(Boolean);

    // Kumpulkan semua nama yang sudah terpilih (dalam bentuk normal)
    const selectedNormalized = selects.map(s => normalizeName(s.value)).filter(v => v !== "");

    selects.forEach(selectBox => {
        const currentValueNormalized = normalizeName(selectBox.value);
        Array.from(selectBox.options).forEach(option => {
            if (option.value === "") return;

            const optValueNormalized = normalizeName(option.value);

            // Disable jika orangnya sudah dipilih di dropdown lain
            if (selectedNormalized.includes(optValueNormalized) && optValueNormalized !== currentValueNormalized) {
                option.disabled = true;
                const originalText = option.textContent.replace(" (Sudah Terpilih)", "");
                option.textContent = originalText + " (Sudah Terpilih)";
            } else {
                option.disabled = false;
                option.textContent = option.textContent.replace(" (Sudah Terpilih)", "");
            }
        });
    });
}

// Tambahkan trigger saat dropdown diganti
document.querySelectorAll('.exclusive-select').forEach(sel => {
    sel.addEventListener('change', handleSelectExclusivity);
});

// Jalankan sekali saat halaman dimuat
handleSelectExclusivity();


/* ============================================================
   8. COPY TO CLIPBOARD
   - Menyalin teks preview ke clipboard
   - Menampilkan animasi feedback "Berhasil Disalin!"
   ============================================================ */
function copyToClipboard() {
    const teksToCopy = previewText.textContent;

    navigator.clipboard.writeText(teksToCopy).then(() => {
        const btnTop = document.getElementById('copyBtnTop');

        if (btnTop) {
            const defaultText = btnTop.innerHTML;
            btnTop.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Berhasil Disalin!`;
            btnTop.classList.add('copy-anim');
            setTimeout(() => {
                btnTop.innerHTML = defaultText;
                btnTop.classList.remove('copy-anim');
            }, 2000);
        }

    }).catch(err => {
        console.error('Gagal menyalin teks:', err);
        alert('Gagal menyalin teks ke clipboard.');
    });
}


/* ============================================================
   9. TEMA GELAP / TERANG
   - Toggle antara dark mode (default) dan light mode
   - Pilihan disimpan ke localStorage agar persisten
   ============================================================ */
const themeToggleBtn = document.getElementById('themeToggleBtn');
const body = document.body;

function toggleTheme() {
    body.classList.toggle('light-theme');
    const isLight = body.classList.contains('light-theme');

    // Simpan pilihan ke localStorage
    localStorage.setItem('theme', isLight ? 'light' : 'dark');

    // Ubah ikon & Teks tombol
    const icon = isLight ? '🌙' : '☀️';
    const textTarget = isLight ? 'Tema Gelap' : 'Tema Terang';
    const textAnim = isLight ? 'Tema Terang Diterapkan' : 'Tema Gelap Diterapkan';

    themeToggleBtn.innerHTML = `${icon} ${textAnim}`;
    themeToggleBtn.classList.add('copy-anim');

    setTimeout(() => {
        themeToggleBtn.innerHTML = `${icon} ${textTarget}`;
        themeToggleBtn.classList.remove('copy-anim');
    }, 1500);
}

// Inisialisasi tema: cek localStorage saat halaman dibuka
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-theme');
    themeToggleBtn.innerHTML = '🌙 Tema Gelap';
} else {
    // Default: dark mode
    themeToggleBtn.innerHTML = '☀️ Tema Terang';
}


/* ============================================================
   10. SUPABASE AUTO-FILL
   - Menarik data jadwal dari Supabase berdasarkan tanggal terdekat
   - Mengisi form secara otomatis (Auto-Fill)
   - Tabel yang digunakan: "Tabel POS", "Tabel Khotbah", "Tabel SS"
   ============================================================ */

/**
 * Set value dropdown (select) secara aman
 * - Jika value dari DB cocok persis → langsung set
 * - Jika beda tipis (misal "Sdra. Jimmy" vs "Sdr Jimmy") → coba fuzzy match
 * - Jika tetap tidak ada → buat opsi baru secara otomatis
 */
function setSelectValueSafely(selectId, value) {
    if (!value || value === '-') return;
    const select = document.getElementById(selectId);
    let options = Array.from(select.options);

    // Cek exact match
    let optMatch = options.find(o => o.value === value);

    // Fuzzy match: hapus titik dan bandingkan
    if (!optMatch) {
        const cleanedValue = value.replace(/\./g, '').trim();
        optMatch = options.find(o => o.value.replace(/\./g, '').trim() === cleanedValue);
    }

    if (optMatch) {
        select.value = optMatch.value;
    } else {
        // Buat opsi baru secara otomatis di dropdown
        const newOpt = new Option(value, value);
        select.add(newOpt);
        select.value = value;
    }
}

/**
 * Fungsi utama: Tarik data jadwal Sabat terdekat dari Supabase
 * 
 * LOGIKA TANGGAL:
 * - Cari data di "Tabel POS" dengan Tanggal >= hari ini
 * - Ambil 1 baris terdekat (ORDER BY Tanggal ASC, LIMIT 1)
 * - Gunakan tanggal tersebut untuk query "Tabel Khotbah" dan "Tabel SS"
 * - Jika tidak ada data lagi di DB → form dibiarkan kosong (tidak error)
 * - Jika DB diisi lagi nanti → otomatis tampil saat website dibuka kembali
 */
async function fetchAndFillNextSabbathSchedule() {
    try {
        // 1. Dapatkan tanggal hari ini (format YYYY-MM-DD lokal)
        const dateNow = new Date();
        const year = dateNow.getFullYear();
        const month = String(dateNow.getMonth() + 1).padStart(2, '0');
        const day = String(dateNow.getDate()).padStart(2, '0');
        const todayStr = `${year}-${month}-${day}`;

        console.log("🔍 Mencari jadwal untuk tanggal >=", todayStr);

        // 2. Query Tabel POS: cari Sabat terdekat dari hari ini
        const { data: posData, error: posError } = await supabaseClient
            .from('Tabel POS')
            .select('*')
            .gte('Tanggal', todayStr)
            .order('Tanggal', { ascending: true })
            .limit(1);

        if (posError) throw posError;

        // STOP: Jika data habis di DB, biarkan form kosong
        if (!posData || posData.length === 0) {
            console.log("⚠️ Tidak ada data jadwal mendatang di database.");
            return;
        }

        const nextSchedule = posData[0];
        const nextDateFull = nextSchedule.Tanggal;

        console.log("✅ Jadwal Sabat terdekat ditemukan:", nextDateFull);

        // 3. Query Tabel Khotbah dan Tabel SS berdasarkan tanggal yang sama
        const { data: khotbahData, error: khotbahError } = await supabaseClient
            .from('Tabel Khotbah')
            .select('*')
            .eq('Tanggal', nextDateFull);

        const { data: ssData, error: ssError } = await supabaseClient
            .from('Tabel SS')
            .select('*')
            .eq('Tanggal', nextDateFull);

        if (khotbahError) throw khotbahError;
        if (ssError) throw ssError;

        // 4. AUTO-FILL: Masukkan data ke input HTML

        // --- Tanggal Sabat ---
        const ymdFormat = nextDateFull.split(' ')[0].split('T')[0]; // Ambil YYYY-MM-DD saja
        document.getElementById('tanggal').value = ymdFormat;

        // --- Logika Sabat Ke & Triwulan (TW) ---
        const sabatDateObj = new Date(ymdFormat);
        const sb_month = sabatDateObj.getMonth() + 1; // 1-12
        const sb_year = sabatDateObj.getFullYear();

        // Cari Triwulan ke berapa
        const nilaiTriwulan = Math.ceil(sb_month / 3);
        
        // Cari bulan awal Triwulan ini (0: Jan, 3: Apr, 6: Jul, 9: Okt)
        const startMonthOfTW = (nilaiTriwulan - 1) * 3;
        
        // Cari kapan Sabat (Sabtu) pertama di Triwulan ini jatuh
        const firstDayOfTW = new Date(sb_year, startMonthOfTW, 1);
        const daysToFirstSat = (6 - firstDayOfTW.getDay() + 7) % 7; 
        const firstSatOfTW = new Date(sb_year, startMonthOfTW, 1 + daysToFirstSat);
        
        // Hitung selisih hari dari Sabat pertama Triwulan ke Sabat ini
        const diffTime = sabatDateObj.getTime() - firstSatOfTW.getTime();
        const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
        
        // Sabat ke-n dalam triwulan ini
        const nilaiSabatKe = (diffDays / 7) + 1;

        document.getElementById('sabatKe').value = nilaiSabatKe;
        document.getElementById('tw').value = nilaiTriwulan;

        // --- Dari Tabel POS: Operator & Pianist ---
        setSelectValueSafely('ssOperator', nextSchedule.Operator);
        setSelectValueSafely('ssPianist', nextSchedule.Pianist);

        // --- Dari Tabel Khotbah ---
        if (khotbahData && khotbahData.length > 0) {
            const k = khotbahData[0];

            // Pengkhotbah & Doa Buka (Doa Buka selalu sama dengan Pengkhotbah)
            if (k.Khotbah) {
                if (k.Khotbah === "PA" || k.Khotbah === "SSAA" || k.Khotbah === "BWA") {
                    // Jenis Sabat khusus → isi di kolom Jenis Sabat
                    document.getElementById('jenisSabat').value = k.Khotbah;
                } else {
                    const namaPengkhotbah = k.Khotbah !== '-' ? k.Khotbah : '';
                    document.getElementById('khPengkhotbahNama').value = namaPengkhotbah;
                    document.getElementById('khDoaBuka').value = namaPengkhotbah;
                }
            }

            // Doa Syafaat, Ayat Bersahutan, & Ayat Inti Khotbah
            if (k.DoaSyafaat && k.DoaSyafaat !== '-') {
                document.getElementById('khDoaSyafaat').value = k.DoaSyafaat;
                document.getElementById('khAyatBersahutanNama').value = k.DoaSyafaat;
                document.getElementById('khAyatIntiNama').value = k.DoaSyafaat;
            }

            // Bacaan Persembahan & Doa Persembahan
            if (k.BacaanPersembahan && k.BacaanPersembahan !== '-') {
                document.getElementById('khBacaanPersembahan').value = k.BacaanPersembahan;
                document.getElementById('khDoaPersembahan').value = k.BacaanPersembahan;
            }

            // Pemimpin Lagu (dropdown eksklusif)
            setSelectValueSafely('khPemimpinLagu', k.PemimpinLagu);

            // Diakon: Pisahkan "Bpk. A & Bpk. B" → field Diakon 1 dan Diakon 2
            if (k.DiakenDiaken && k.DiakenDiaken !== '-') {
                const parts = k.DiakenDiaken.split('&').map(s => s.trim());
                document.getElementById('khDiakon1').value = parts[0] || '';
                document.getElementById('khDiakon2').value = parts[1] || '';
            }
        }

        // --- Dari Tabel SS ---
        if (ssData && ssData.length > 0) {
            const s = ssData[0];
            if (s.MC && s.MC !== '-') document.getElementById('ssMc').value = s.MC;
            if (s.AyatIntiDoaBuka && s.AyatIntiDoaBuka !== '-') document.getElementById('ssAyatDoa').value = s.AyatIntiDoaBuka;
            if (s.BeritaMision && s.BeritaMision !== '-') document.getElementById('ssMission').value = s.BeritaMision;
            if (s.RingkasanSS && s.RingkasanSS !== '-') document.getElementById('ssRingkasan').value = s.RingkasanSS;
            if (s.PelayananPerorangan && s.PelayananPerorangan !== '-') {
                document.getElementById('ssPromosi').value = s.PelayananPerorangan;
                document.getElementById('ssDoaTutup').value = s.PelayananPerorangan; // Doa Tutup SS = Pelayanan Perorangan
            }
        }

        // Update UI: refresh preview teks WA & kunci dropdown eksklusif
        handleSelectExclusivity();
        updatePreview();

    } catch (err) {
        console.error("❌ Gagal menarik data dari Supabase:", err);
    }
}

// Eksekusi Auto-Fill saat halaman selesai dimuat
window.addEventListener('DOMContentLoaded', fetchAndFillNextSabbathSchedule);


/* ============================================================
   11. ADMIN AUTH & MODAL
   ============================================================ */
function openLoginModal() {
    document.getElementById('loginModal').classList.add('active');
    document.getElementById('loginErrorMsg').style.display = 'none';
}

function closeLoginModal() {
    document.getElementById('loginModal').classList.remove('active');
}

async function handleLogin() {
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;
    const btn = document.getElementById('loginSubmitBtn');

    if (!email || !password) {
        Swal.fire({ icon: 'warning', title: 'Perhatian', text: 'Email dan Password harus diisi!' });
        return;
    }

    btn.innerHTML = "Memuat...";
    btn.disabled = true;

    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            throw error;
        }

        // Login sukses
        closeLoginModal();
        Swal.fire({
            icon: 'success',
            title: 'Login Berhasil',
            text: 'Selamat datang di Dashboard Admin.',
            timer: 2000,
            showConfirmButton: false
        });
    } catch (err) {
        Swal.fire({ icon: 'error', title: 'Gagal Login', text: 'Email atau password salah.' });
        console.error("Login Error:", err);
    } finally {
        btn.innerHTML = "Login";
        btn.disabled = false;
    }
}

async function handleLogout() {
    Swal.fire({
        title: 'Keluar',
        text: "Anda yakin ingin logout dari panel Admin?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#475569',
        confirmButtonText: 'Ya, Logout'
    }).then(async (result) => {
        if (result.isConfirmed) {
            const { error } = await supabaseClient.auth.signOut();
            if (error) {
                console.error("Logout Error:", error);
                Swal.fire('Error', 'Gagal memproses logout.', 'error');
            } else {
                Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Anda telah logout.', timer: 1500, showConfirmButton: false });
            }
        }
    });
}

// ============================================================
// 12. ADMIN DASHBOARD & CRUD LOGIC (FASE 4)
// ============================================================
let currentAdminTable = 'Tabel POS';
let currentEditId = null;
let currentAdminTableData = [];
let currentSort = { col: 'Tanggal', asc: false };

// Cek status secara realtime (Apakah sedang login atau tidak?)
supabaseClient.auth.onAuthStateChange((event, session) => {
    const loginBtn = document.getElementById('adminLoginBtn');
    const generatorView = document.getElementById('generatorView');
    const adminDashboardView = document.getElementById('adminDashboardView');
    
    if (session) {
        // Admin sedang login
        loginBtn.innerHTML = "🔒 Logout Admin";
        loginBtn.onclick = handleLogout;
        loginBtn.style.color = "white";
        loginBtn.style.background = "#ef4444"; 
        loginBtn.style.borderColor = "#dc2626";
        
        // Tampilkan Dashboard, sembunyikan Generator
        if (generatorView) generatorView.style.display = 'none';
        if (adminDashboardView) adminDashboardView.style.display = 'flex';
        
        // Otomatis muat data tabel
        switchAdminTab(currentAdminTable);
    } else {
        // User biasa (tidak login)
        loginBtn.innerHTML = "🔑 Admin";
        loginBtn.onclick = openLoginModal;
        loginBtn.style.color = ""; 
        loginBtn.style.background = "";
        loginBtn.style.borderColor = "";
        
        // Tampilkan Generator, sembunyikan Dashboard
        if (generatorView) generatorView.style.display = 'grid'; // asalnya display grid
        if (adminDashboardView) adminDashboardView.style.display = 'none';
        
        // Jika logout, kita segarkan data public generator
        fetchAndFillNextSabbathSchedule();
    }
});

function switchAdminTab(tableName) {
    currentAdminTable = tableName;
    
    // Update tombol nav (Sidebar)
    document.querySelectorAll('.admin-tab-btn').forEach(btn => btn.classList.remove('active'));
    
    if (tableName === 'Tabel POS') document.getElementById('btn-adm-pos').classList.add('active');
    if (tableName === 'Tabel SS') document.getElementById('btn-adm-ss').classList.add('active');
    if (tableName === 'Tabel Khotbah') document.getElementById('btn-adm-khotbah').classList.add('active');
    
    document.getElementById('adminTableTitle').innerText = tableName;
    
    // Mulai tarik data
    loadAdminTableData(tableName);
}

async function loadAdminTableData(tableName) {
    const tbody = document.getElementById('adminTableBody');
    const thead = document.getElementById('adminTableHead');
    
    tbody.innerHTML = `<tr><td colspan="10" style="text-align: center; padding: 20px;">Memuat data...</td></tr>`;
    thead.innerHTML = ''; 

    try {
        const { data, error } = await supabaseClient
            .from(tableName)
            .select('*')
            .order('Tanggal', { ascending: false }) // Yang terbaru di atas
            .limit(100);
            
        if (error) throw error;
        
        currentAdminTableData = data || [];
        currentSort = { col: 'Tanggal', asc: false }; // Kembalikan sorter awal tiap ganti tab
        
        renderAdminTable();
        
    } catch (err) {
        console.error("Gagal memuat tabel:", err);
        tbody.innerHTML = `<tr><td colspan="10" style="text-align: center; color: #ef4444; padding: 20px;">Error: Gagal memuat data dari server. ${err.message}</td></tr>`;
    }
}

function sortAdminTable(colName) {
    // Jika klik kolom yang sama, balik arahnya (Asc <-> Desc)
    if (currentSort.col === colName) {
        currentSort.asc = !currentSort.asc;
    } else {
        // Jika klik kolom baru, jadikan sorting baru secara ascending
        currentSort.col = colName;
        currentSort.asc = true;
    }
    
    // Proses sorting lokal untuk efisiensi hit API Supabase
    currentAdminTableData.sort((a, b) => {
        let valA = a[colName];
        let valB = b[colName];
        
        // Handle nil values
        if (valA === null || valA === undefined) valA = '';
        if (valB === null || valB === undefined) valB = '';
        
        // Jika murni angka, ubah tipe untuk sorting numerik yang benar
        if (!isNaN(valA) && !isNaN(valB) && valA !== '' && valB !== '') {
            valA = Number(valA);
            valB = Number(valB);
        } else {
            // Untuk string, kapitalisasi disamakan agar case-insensitive
            valA = valA.toString().toLowerCase();
            valB = valB.toString().toLowerCase();
        }
        
        if (valA < valB) return currentSort.asc ? -1 : 1;
        if (valA > valB) return currentSort.asc ? 1 : -1;
        return 0;
    });
    
    // Cetak ulang tabel
    renderAdminTable();
}

function renderAdminTable() {
    const tbody = document.getElementById('adminTableBody');
    const thead = document.getElementById('adminTableHead');
    
    if (currentAdminTableData.length === 0) {
         tbody.innerHTML = `<tr><td colspan="10" style="text-align: center; padding: 20px;">Belum ada data tersedia.</td></tr>`;
         thead.innerHTML = '';
         return;
    }

    // Buat kolom header
    const columns = Object.keys(currentAdminTableData[0]).filter(col => col.toLowerCase() !== 'created_at');
    
    let headerHTML = '';
    columns.forEach(col => {
        let cUp = 'currentColor';
        let opUp = '0.2';
        let cDn = 'currentColor';
        let opDn = '0.2';
        
        // Cek jika kolom ini sedang disortir
        if (currentSort.col === col) {
            if (currentSort.asc) {
                cUp = 'var(--accent)'; 
                opUp = '1';
            } else {
                cDn = 'var(--accent)'; 
                opDn = '1';
            }
        }
        
        // Ikon panah dua arah ala Data Seluler
        let sortIcon = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
            <path d="M9 20V4M5 8l4-4 4 4" stroke="${cUp}" style="opacity:${opUp}; transition: all 0.2s ease;"></path>
            <path d="M15 4v16m-4-4 4 4 4-4" stroke="${cDn}" style="opacity:${opDn}; transition: all 0.2s ease;"></path>
        </svg>`;
        
        headerHTML += `<th style="cursor: pointer; user-select: none;" title="Klik untuk mengurutkan" onclick="sortAdminTable('${col}')">
                            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                                <span>${col}</span>
                                <span>${sortIcon}</span>
                            </div>
                       </th>`; 
    });
    headerHTML += `<th>Aksi</th>`;
    thead.innerHTML = headerHTML;
    
    // Buat baris tabel
    let bodyHTML = '';
    currentAdminTableData.forEach(row => {
        let rowHTML = `<tr>`;
        columns.forEach(col => {
            let cellData = row[col];
            // Jika teks terlalu kepanjangan, potong visualnya
            if (typeof cellData === 'string' && cellData.length > 50) {
                cellData = cellData.substring(0, 50) + '...';
            }
            if (cellData === null || cellData === undefined || cellData === "") cellData = '-';
            
            // Warnai baris tanggal dengan badge biar cantik
            if (col.toLowerCase() === 'tanggal') {
                 let d = cellData.split(' ')[0].split('T')[0]; // Ambil YYYY-MM-DD
                 rowHTML += `<td><span class="badge badge-success">${d}</span></td>`;
            } else {
                 rowHTML += `<td>${cellData}</td>`;
            }
        });
        
        // Format aman json
        const safeRowJson = JSON.stringify(row).replace(/'/g, "&apos;").replace(/"/g, "&quot;");
        
        rowHTML += `
            <td>
                <div class="action-btns">
                    <button class="btn btn-secondary" style="padding: 4px 12px; font-size: 11px;" onclick="openFormModal('${safeRowJson}')">Edit</button>
                </div>
            </td>
        </tr>`;
        bodyHTML += rowHTML;
    });
    tbody.innerHTML = bodyHTML;
}

function openFormModal(rowDataStr = null) {
    const modal = document.getElementById('dataFormModal');
    const title = document.getElementById('formModalTitle');
    const container = document.getElementById('dynamicFormContainer');
    
    modal.classList.add('active');
    
    let rowData = null;
    currentEditId = null;
    
    if (rowDataStr) {
        rowData = JSON.parse(rowDataStr);
        currentEditId = rowData.Id || rowData.id; 
        title.innerText = "Edit Jadwal - " + currentAdminTable;
    } else {
        title.innerText = "Tambah Jadwal Baru - " + currentAdminTable;
    }
    
    // Tentukan kolom dinamis
    let schema = [];
    if (currentAdminTable === 'Tabel POS') {
        schema = ['Tanggal', 'Pianist', 'Operator', 'Soundman'];
    } else if (currentAdminTable === 'Tabel Khotbah') {
        schema = ['Tanggal', 'Khotbah', 'DoaSyafaat', 'BacaanPersembahan', 'PemimpinLagu', 'DiakenDiaken'];
    } else if (currentAdminTable === 'Tabel SS') {
        schema = ['Tanggal', 'MC', 'AyatIntiDoaBuka', 'BeritaMision', 'RingkasanSS', 'PelayananPerorangan'];
    }

    let formHTML = '';
    schema.forEach(col => {
        let value = (rowData && rowData[col]) ? rowData[col] : '';
        let inputType = 'text';
        
        if (col.toLowerCase().includes('tanggal')) {
            inputType = 'date';
            if (value && value.includes('T')) value = value.split('T')[0];
            else if (value && value.includes(' ')) value = value.split(' ')[0];
        }
        
        formHTML += `
            <div class="input-group">
                <label>${col.replace(/([A-Z])/g, ' $1').trim()}</label>
                <input type="${inputType}" id="dyn_${col}" value="${value}">
            </div>
        `;
    });
    
    container.innerHTML = formHTML;
}

function closeFormModal() {
    document.getElementById('dataFormModal').classList.remove('active');
}

async function simpanDataTabel() {
    const btn = document.getElementById('saveDataBtn');
    btn.innerHTML = "Menyimpan...";
    btn.disabled = true;

    // Ambil data dari elemen dinamis
    let payload = {};
    let isDateEmpty = false;
    const inputs = document.querySelectorAll('#dynamicFormContainer input');
    
    inputs.forEach(input => {
        const colName = input.id.replace('dyn_', '');
        payload[colName] = input.value;
        if(colName === 'Tanggal' && !input.value) isDateEmpty = true;
    });

    if (isDateEmpty) {
        Swal.fire({ icon: 'warning', title: 'Perhatian', text: 'Kolom Tanggal wajib diisi.' });
        btn.innerHTML = "Simpan Data";
        btn.disabled = false;
        return;
    }

    // Ubah string kosong jadi null
    Object.keys(payload).forEach(k => {
        if (payload[k] === "") payload[k] = "-";
    });

    try {
        if (currentEditId) {
            // Mode Update: Kita coba tembak kolom Primary Key 'Id' (huruf besar dulu)
            let result = await supabaseClient
                .from(currentAdminTable)
                .update(payload)
                .eq('Id', currentEditId);
                
            // Jika PostgreSQL mengamuk karena bilang 'Id' huruf besar tidak ada, tes pakai 'id' huruf kecil
            if (result.error && result.error.message.includes('does not exist')) {
                result = await supabaseClient
                    .from(currentAdminTable)
                    .update(payload)
                    .eq('id', currentEditId);
            }
            
            if (result.error) throw result.error;
        } else {
            // Mode Insert
            const { error } = await supabaseClient
                .from(currentAdminTable)
                .insert([payload]);
            if (error) throw error;
        }

        Swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: 'Data berhasil disimpan!',
            timer: 1500,
            showConfirmButton: false
        });

        closeFormModal();
        loadAdminTableData(currentAdminTable); 
        
    } catch (err) {
        console.error("Gagal simpan:", err);
        Swal.fire({ icon: 'error', title: 'Gagal', text: err.message || 'Gagal menyimpan ke database' });
    } finally {
        btn.innerHTML = "Simpan Data";
        btn.disabled = false;
    }
}
