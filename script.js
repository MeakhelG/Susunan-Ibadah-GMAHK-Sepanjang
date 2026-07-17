/**
 * ============================================================
 * script.js — Aplikasi Web GMAHK Sepanjang
 * ============================================================
 */

// Koneksi Supabase
const supabaseUrl = 'https://ymvhvaytlfexspvumnnj.supabase.co';
const supabaseKey = 'sb_publishable_2_acMp4RrGHbmhdIb9JSIw_H5CfIQcn';
let supabaseClient;
try {
    if (window.supabase) {
        supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
    } else {
        console.warn("⚠️ Pustaka Supabase tidak terdeteksi.");
    }
} catch (e) {
    console.error("❌ Gagal menginisialisasi Supabase:", e);
}

// State Global
const appState = {
    currentTab: "home",
    currentSubTab: "acara",
    currentProgramAcara: "sabat",
    currentProgramPetugas: "sabat",
    rosterSabatIndex: 1, // Default ke Sabtu, 18 Juli 2026 (indeks 1)
    rosterPaIndex: 1,    // Default ke Sabtu, 18 Juli 2026 (indeks 1)
    rosterRabuIndex: 1,  // Default ke Rabu, 22 Juli 2026 (indeks 1)
    theme: "light"
};

// Data Jadwal Ibadah (Liturgy) Terdekat
const scheduleData = {
    sabat: [
        {
            day: "18",
            month: "Jul",
            dateDisplay: "Sabtu, 18 Juli 2026",
            title: "Ibadah Sabat Raya",
            timeline: [
                { isHeader: true, title: "I. Informasi Umum" },
                { time: "", title: "Pianist Jemaat", desc: "Sdr. Bayu Satria", highlight: true },
                { time: "", title: "Operator Slide/Zoom", desc: "Sdr. Operator", highlight: true },
                { time: "", title: "Soundman Bertugas", desc: "Sdr. Soundman", highlight: true },
                { isHeader: true, title: "II. Ibadah Sekolah Sabat (09:00 - 10:30)" },
                { time: "09:00", title: "MC & Yel Yel Sekolah Sabat", desc: "MC: Sdr. Kevin A.", highlight: false },
                { time: "09:30", title: "Ringkasan Sekolah Sabat Dewasa", desc: "Di kelas masing-masing (Sabat ke-3)", highlight: true },
                { isHeader: true, title: "III. Ibadah Khotbah (10:35 - 12:00)" },
                { time: "10:45", title: "Ibadah Khotbah (Divine Service)", desc: "Pembicara: Pdt. Benny Lumbantobing", highlight: true, note: "Tema: 'Misi Terakhir untuk Dunia'" }
            ],
            waFormat: `*SUSUNAN ACARA SABAT RAYA*\n*GMAHK Jemaat Sepanjang*\nSabtu, 18 Juli 2026\n\n09:00 - Sekolah Sabat (P.L: Sdr. Kevin A.)\n09:30 - Pelajaran Sekolah Sabat (Kelas masing-masing)\n10:45 - Ibadah Khotbah\n- Pembicara: Pdt. Benny Lumbantobing\n- Tema: "Misi Terakhir untuk Dunia"\n\n_Diharapkan hadir tepat waktu._`
        }
    ],
    pa: [
        {
            day: "18",
            month: "Jul",
            dateDisplay: "Sabtu, 18 Juli 2026",
            title: "Pemuda Advent (PA)",
            timeline: [
                { time: "16:00", title: "Pembukaan & Pujian PA", desc: "Pemimpin Acara: Pengurus PA" },
                { time: "16:30", title: "Aktivitas / Seminar Pemuda", desc: "Pemateri: Sdr. Bryan S.", highlight: true, note: "Tema: 'Pemuda Masa Kini & Tantangan Zaman'" },
                { time: "17:30", title: "Vesper & Doa Penutup", desc: "Pianis: Sdri. Grace T." }
            ],
            waFormat: `*SUSUNAN ACARA PEMUDA ADVENT (PA)*\n*GMAHK Jemaat Sepanjang*\nSabtu, 18 Juli 2026\n\n16:00 - Pujian PA (Pengurus PA)\n16:30 - Aktivitas Pemuda\n- Pemateri: Sdr. Bryan S.\n- Tema: "Pemuda Masa Kini & Tantangan Zaman"\n17:30 - Vesper & Doa Penutup\n\n_Mari pemuda-pemudi kita berkumpul memuji Tuhan!_`
        }
    ],
    rabu: [
        {
            day: "22",
            month: "Jul",
            dateDisplay: "Rabu, 22 Juli 2026",
            title: "Ibadah Rabu Malam",
            timeline: [
                { time: "19:00", title: "Join Zoom & Pemimpin Acara", desc: "Host: Sdri. Linda K." },
                { time: "19:05", title: "Pembukaan & MC Doa Buka", desc: "MC/Doa: Sdri. Linda K." },
                { time: "19:10", title: "Kesaksian Jemaat", desc: "Petugas: Sdr. Julian" },
                { time: "19:20", title: "Lagu-Lagu Pujian Tengah Pekan", desc: "Song Leader: Sdri. Linda K." },
                { time: "19:30", title: "Doa Syafaat Tengah Pekan", desc: "Pendoa Syafaat: Pdt. Benny Lumbantobing", highlight: true },
                { time: "19:40", title: "Renungan Firman Tuhan", desc: "Pembicara: Pnt. J. Silitonga", highlight: true, note: "Tema: 'Kekuatan dalam Doa Syafaat'" },
                { time: "20:00", title: "Doa Tutup & Doa Berkat", desc: "Pendoa: Pnt. J. Silitonga" },
                { time: "20:05", title: "Ucapan Terima Kasih & Pengumuman", desc: "Ketua Jemaat" }
            ],
            waFormat: `GMAHK Sepanjang mengundang Anda untuk bergabung ke rapat Zoom yang terjadwal.

Topic: Ibadah Rabu Malam - GMAHK Sepanjang
*Waktu: Rabu, 22 Juli 2026; Jam: 19:00 WIB (ontime)*

Join Zoom Meeting
https://us06web.zoom.us/j/84580474203?pwd=pfIdV8blFAQkxcb3g18YAHmd016e2X.1

Meeting ID: 845 8047 4203
Passcode: sepanjang


🌟 *JADWAL PELAYANAN* 
⛪️ Konferens Jawa Kawasan Timur
🗓️ Rabu, 22 Juli 2026
🕕 Pukul 19.00 WIB (Malam)

*Pelayan Ibadah:*
* _Host: Sdri. Linda K._
* _MC, Doa: Sdri. Linda K._
* _Kesaksian: Sdr. Julian_
* _Doa Syafaat: Pdt. Benny Lumbantobing_
* Firman Tuhan: Pnt. J. Silitonga
* _Doa Tutup: Pnt. J. Silitonga_
* _Ucapan Terima kasih & Pengumuman: Ketua_

📖 "Dan apa saja yang kamu minta dalam doa dengan penuh kepercayaan, kamu akan menerimanya."
*— Matius 21:22*

✨ Selamat Melayani
🙏 Tuhan Memberkati`
        }
    ]
};

// Data Jadwal Petugas (Roster) Triwulan - Dipisah Sabat, PA, Rabu Malam (High-Fidelity)
const rosterData = {
    sabat: [
        {
            dateDisplay: "Sabtu, 11 Juli 2026",
            programTag: "IBADAH SABAT RAYA",
            departments: [
                {
                    name: "INFORMASI UMUM",
                    time: "",
                    roles: [
                        { role: "Pianist", name: "Sdri. Grace T." },
                        { role: "Operator Slide", name: "-" },
                        { role: "Soundman", name: "-" }
                    ]
                },
                {
                    name: "IBADAH SEKOLAH SABAT",
                    time: "09:00 - 10:30 WIB",
                    roles: [
                        { role: "Pemimpin Lagu", name: "Sdri. Linda K." },
                        { role: "Ayat Inti & Doa Buka", name: "Sdr. Bryan S." },
                        { role: "Berita Misi", name: "Sdri. Martha L." }
                    ]
                },
                {
                    name: "IBADAH KHOTBAH",
                    time: "10:35 - 12:00 WIB",
                    roles: [
                        { role: "Khotbah", name: "Pnt. R. Hutabarat" },
                        { role: "Pendamping 1", name: "Pnt. J. Silitonga" },
                        { role: "Cerita Anak-anak", name: "Ibu Julia P." }
                    ]
                }
            ],
            waFormat: `*JADWAL PETUGAS SABAT RAYA*\n*GMAHK Jemaat Sepanjang*\nSabtu, 11 Juli 2026\n\n*INFORMASI UMUM*\n- Pianist: Sdri. Grace T.\n\n*IBADAH SEKOLAH SABAT*\n- Pemimpin Lagu: Sdri. Linda K.\n- Ayat & Doa: Sdr. Bryan S.\n- Berita Misi: Sdri. Martha L.\n\n*IBADAH KHOTBAH*\n- Pembicara: Pnt. R. Hutabarat\n- Pendamping 1: Pnt. J. Silitonga\n- Cerita Anak: Ibu Julia P.`
        },
        {
            dateDisplay: "Sabtu, 18 Juli 2026",
            programTag: "IBADAH SABAT RAYA",
            departments: [
                {
                    name: "INFORMASI UMUM",
                    time: "",
                    roles: [
                        { role: "Pianis", name: "Sdri. Grace T." },
                        { role: "Operator Slide", name: "-" },
                        { role: "Soundman", name: "-" }
                    ]
                },
                {
                    name: "IBADAH SEKOLAH SABAT",
                    time: "09:00 - 10:30 WIB",
                    roles: [
                        { role: "Pemimpin Lagu", name: "Sdr. Kevin A." },
                        { role: "Ayat Inti & Doa Buka", name: "Sdr. Bryan S." },
                        { role: "Berita Misi", name: "Sdri. Martha L." }
                    ]
                },
                {
                    name: "IBADAH KHOTBAH",
                    time: "10:35 - 12:00 WIB",
                    roles: [
                        { role: "Khotbah", name: "Pdt. Benny Lumbantobing" },
                        { role: "Pendamping 1", name: "Pnt. R. Hutabarat" },
                        { role: "Pendamping 2", name: "Pnt. J. Silitonga" },
                        { role: "Cerita Anak-anak", name: "Ibu Julia P." }
                    ]
                }
            ],
            waFormat: `*JADWAL PETUGAS SABAT RAYA*\n*GMAHK Jemaat Sepanjang*\nSabtu, 18 Juli 2026\n\n*INFORMASI UMUM*\n- Pianist: Sdri. Grace T.\n\n*IBADAH SEKOLAH SABAT*\n- Pemimpin Lagu: Sdr. Kevin A.\n\n*IBADAH KHOTBAH*\n- Khotbah: Pdt. Benny Lumbantobing\n- Pendamping: Pnt. R. Hutabarat & Pnt. J. Silitonga`
        },
        {
            dateDisplay: "Sabtu, 25 Juli 2026",
            programTag: "IBADAH SABAT RAYA",
            departments: [
                {
                    name: "INFORMASI UMUM",
                    time: "",
                    roles: [
                        { role: "Pianist", name: "Jose G." },
                        { role: "Operator Slide", name: "-" },
                        { role: "Soundman", name: "-" }
                    ]
                },
                {
                    name: "IBADAH SEKOLAH SABAT",
                    time: "09:00 - 10:30 WIB",
                    roles: [
                        { role: "Pembawa Acara", name: "Sdri. Priska R." },
                        { role: "Ayat Inti & Doa Buka", name: "Sdri. Netta" },
                        { role: "Berita Misi", name: "Sdr. Julian" },
                        { role: "Pelayanan Perorangan", name: "Sdr. Arfan W." }
                    ]
                },
                {
                    name: "IBADAH KHOTBAH",
                    time: "10:35 - 12:00 WIB",
                    roles: [
                        { role: "Khotbah", name: "Ibu Yvonne Dompas - Dir. Pendidikan KJKT" },
                        { role: "Pendamping 1", name: "Sdri. Septha" },
                        { role: "Pendamping 2", name: "Ibu Kasfia" },
                        { role: "Cerita Anak-anak", name: "Sdri. Kristiningtyas" },
                        { role: "Song Leader", name: "Ribka" }
                    ]
                }
            ],
            waFormat: `*JADWAL PETUGAS SABAT RAYA*\n*GMAHK Jemaat Sepanjang*\nSabtu, 25 Juli 2026\n\n*INFORMASI UMUM*\n- Pianist: Jose G.\n\n*IBADAH SEKOLAH SABAT*\n- Pembawa Acara: Sdri. Priska R.\n\n*IBADAH KHOTBAH*\n- Pembicara: Ibu Yvonne Dompas\n- Cerita Anak: Sdri. Kristiningtyas`
        }
    ],
    pa: [
        {
            dateDisplay: "Sabtu, 11 Juli 2026",
            programTag: "IBADAH PEMUDA ADVENT (PA)",
            departments: [
                {
                    name: "PEMUDA ADVENT (PA)",
                    time: "16:00 - Selesai",
                    roles: [
                        { role: "Pemimpin Acara", name: "Pengurus PA" },
                        { role: "Moderator", name: "Sdr. Kevin A." },
                        { role: "Pianis", name: "Sdri. Grace T." }
                    ]
                }
            ],
            waFormat: `*JADWAL PETUGAS PA*\n*GMAHK Jemaat Sepanjang*\nSabtu, 11 Juli 2026\n\n- Pemimpin Acara: Pengurus PA\n- Moderator: Sdr. Kevin A.\n- Pianis: Sdri. Grace T.`
        },
        {
            dateDisplay: "Sabtu, 18 Juli 2026",
            programTag: "IBADAH PEMUDA ADVENT (PA)",
            departments: [
                {
                    name: "PEMUDA ADVENT (PA)",
                    time: "16:00 - Selesai",
                    roles: [
                        { role: "Pemimpin Acara", name: "Pengurus PA" },
                        { role: "Pemateri", name: "Sdr. Bryan S." },
                        { role: "Pianis", name: "Sdri. Grace T." }
                    ]
                }
            ],
            waFormat: `*JADWAL PETUGAS PA*\n*GMAHK Jemaat Sepanjang*\nSabtu, 18 Juli 2026\n\n- Pemimpin Acara: Pengurus PA\n- Pemateri: Sdr. Bryan S.\n- Pianis: Sdri. Grace T.`
        },
        {
            dateDisplay: "Sabtu, 25 Juli 2026",
            programTag: "IBADAH PEMUDA ADVENT (PA)",
            departments: [
                {
                    name: "PEMUDA ADVENT (PA)",
                    time: "16:00 - Selesai",
                    roles: [
                        { role: "Pemimpin Acara", name: "Pengurus PA" },
                        { role: "Penyaji", name: "Sdr. Kevin A." },
                        { role: "Pianis", name: "Sdri. Grace T." }
                    ]
                }
            ],
            waFormat: `*JADWAL PETUGAS PA*\n*GMAHK Jemaat Sepanjang*\nSabtu, 25 Juli 2026\n\n- Pemimpin Acara: Pengurus PA\n- Penyaji: Sdr. Kevin A.\n- Pianis: Sdri. Grace T.`
        }
    ],
    rabu: [
        {
            dateDisplay: "Rabu, 15 Juli 2026",
            programTag: "IBADAH PERMINTAAN DOA",
            departments: [
                {
                    name: "RABU MALAM",
                    time: "19:00 WIB - Selesai",
                    roles: [
                        { role: "Pianis", name: "Ibu Merry O." },
                        { role: "Pemimpin Acara", name: "Sdri. Linda K." },
                        { role: "Renungan", name: "Pnt. R. Hutabarat" }
                    ]
                }
            ],
            waFormat: `*JADWAL PETUGAS RABU MALAM*\n*GMAHK Jemaat Sepanjang*\nRabu, 15 Juli 2026\n\n- Pemimpin Acara: Sdri. Linda K.\n- Renungan: Pnt. R. Hutabarat\n- Pianis: Ibu Merry O.`
        },
        {
            dateDisplay: "Rabu, 22 Juli 2026",
            programTag: "IBADAH PERMINTAAN DOA",
            departments: [
                {
                    name: "RABU MALAM",
                    time: "19:00 WIB - Selesai",
                    roles: [
                        { role: "Pianis", name: "Bayu Satria" },
                        { role: "Pemimpin Acara", name: "Sdri. Jocelyn" },
                        { role: "Renungan", name: "Bp. Charly" },
                        { role: "Doa Syafaat", name: "Ibu Menur" },
                        { role: "Diakon Bertugas", name: "Sdr. Siondy" }
                    ]
                }
            ],
            waFormat: `*JADWAL PETUGAS RABU MALAM*\n*GMAHK Jemaat Sepanjang*\nRabu, 22 Juli 2026\n\n- Pemimpin Acara: Sdri. Jocelyn\n- Renungan: Bp. Charly\n- Doa Syafaat: Ibu Menur\n- Pianis: Bayu Satria`
        },
        {
            dateDisplay: "Rabu, 29 Juli 2026",
            programTag: "IBADAH PERMINTAAN DOA",
            departments: [
                {
                    name: "RABU MALAM",
                    time: "19:00 WIB - Selesai",
                    roles: [
                        { role: "Pianis", name: "Sdri. Grace T." },
                        { role: "Pemimpin Acara", name: "Sdr. Bryan S." },
                        { role: "Renungan", name: "Bp. H. Sianipar" },
                        { role: "Doa Syafaat", name: "Ibu Merry O." },
                        { role: "Diakon Bertugas", name: "Sdr. Kevin A." }
                    ]
                }
            ],
            waFormat: `*JADWAL PETUGAS RABU MALAM*\n*GMAHK Jemaat Sepanjang*\nRabu, 29 Juli 2026\n\n- Pemimpin Acara: Sdr. Bryan S.\n- Renungan: Bp. H. Sianipar\n- Doa Syafaat: Ibu Merry O.\n- Pianis: Sdri. Grace T.`
        }
    ]
};

/**
 * Inisialisasi Awal Aplikasi
 */
function initApp() {
    // Terapkan Tema yang Disimpan
    const savedTheme = localStorage.getItem("gmahk-theme") || "light";
    if (savedTheme === "dark") {
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
        appState.theme = "dark";
    }

    // Set Tanggal Hari Ini secara Otomatis
    updateCurrentDate();

    // Render Awal untuk kedua Sub-tab (Data Lokal / Fallback Visual)
    renderActiveAcara();
    renderActiveRoster();

    // Ambil data riil dari database Supabase
    fetchDataFromSupabase();
}

/**
 * Memperbarui Teks Tanggal di Header
 */
function updateCurrentDate() {
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabat"];
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    
    const today = new Date();
    const dayName = days[today.getDay()];
    const dateNum = today.getDate();
    const monthName = months[today.getMonth()];
    const year = today.getFullYear();
    
    const dateStr = `${dayName}, ${dateNum} ${monthName} ${year}`;
    const dateEl = document.getElementById("currentDateText");
    if (dateEl) {
        dateEl.textContent = dateStr;
    }
}

/**
 * Logika Perpindahan Tab Utama
 */
function switchTab(tabId) {
    if (tabId === appState.currentTab) return;

    // Sembunyikan semua tab content
    const tabPanes = document.querySelectorAll(".tab-pane");
    tabPanes.forEach(pane => pane.classList.remove("active"));

    // Hilangkan kelas active pada semua navigasi bawah
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => item.classList.remove("active"));

    // Tampilkan tab yang dipilih
    const activePane = document.getElementById(`tab-${tabId}`);
    if (activePane) {
        activePane.classList.add("active");
    }

    // Aktifkan item nav yang sesuai
    const activeNav = document.getElementById(`nav-${tabId}`);
    if (activeNav) {
        activeNav.classList.add("active");
    }

    // Update state & scroll ke atas
    appState.currentTab = tabId;
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Mengubah Tema Tampilan (Dark/Light Mode)
 */
function toggleTheme() {
    if (appState.theme === "light") {
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
        appState.theme = "dark";
        localStorage.setItem("gmahk-theme", "dark");
        showToast("Tema Gelap Diaktifkan", "success");
    } else {
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
        appState.theme = "light";
        localStorage.setItem("gmahk-theme", "light");
        showToast("Tema Terang Diaktifkan", "success");
    }
}

/**
 * Logika Perpindahan Sub-Tab (Susunan Acara vs Jadwal Petugas)
 */
function switchSubTab(subTabId) {
    if (subTabId === appState.currentSubTab) return;

    // Sembunyikan semua sub-tab content
    const subPanes = document.querySelectorAll(".sub-tab-pane");
    subPanes.forEach(pane => pane.classList.remove("active"));

    // Hapus kelas active dari tombol sub-tab
    const subBtns = document.querySelectorAll(".sub-tab-btn");
    subBtns.forEach(btn => btn.classList.remove("active"));

    // Tampilkan sub-tab terpilih
    const targetPane = document.getElementById(`sub-tab-content-${subTabId}`);
    if (targetPane) {
        targetPane.classList.add("active");
    }

    // Aktifkan tombol yang sesuai
    const targetBtn = document.getElementById(`sub-tab-btn-${subTabId}`);
    if (targetBtn) {
        targetBtn.classList.add("active");
    }

    appState.currentSubTab = subTabId;

    // Render ulang sub-tab terupdate
    if (subTabId === "acara") {
        renderActiveAcara();
    } else if (subTabId === "petugas") {
        renderActiveRoster();
    }
}

/**
 * Memfilter Kategori Program di Sub-Tab Susunan Acara
 */
function filterProgramAcara(programType) {
    if (programType === appState.currentProgramAcara) return;

    // Reset kelas active tombol program switcher di acara
    const buttons = document.querySelectorAll("#sub-tab-content-acara .switcher-btn");
    buttons.forEach(btn => btn.classList.remove("active"));

    const activeBtn = document.getElementById(`program-acara-btn-${programType}`);
    if (activeBtn) {
        activeBtn.classList.add("active");
    }

    appState.currentProgramAcara = programType;
    renderActiveAcara();
}

/**
 * Memfilter Kategori Program di Sub-Tab Jadwal Petugas
 */
function filterProgramPetugas(programType) {
    if (programType === appState.currentProgramPetugas) return;

    // Reset kelas active tombol program switcher di petugas
    const buttons = document.querySelectorAll("#sub-tab-content-petugas .switcher-btn");
    buttons.forEach(btn => btn.classList.remove("active"));

    const activeBtn = document.getElementById(`program-petugas-btn-${programType}`);
    if (activeBtn) {
        activeBtn.classList.add("active");
    }

    appState.currentProgramPetugas = programType;
    renderActiveRoster();
}

/**
 * Merender Liturgi Acara Terdekat
 */
function renderActiveAcara() {
    const program = appState.currentProgramAcara;
    const dataList = scheduleData[program];
    if (!dataList || dataList.length === 0) return;

    // Cari indeks terdekat dari hari ini (default index 0 jika data cuman 1 atau rabu)
    let activeIndex = 0;
    if (program === "sabat" || program === "pa") {
        activeIndex = findClosestUpcomingIndex(dataList);
    }

    const data = dataList[activeIndex];
    if (!data) return;

    const cardEl = document.querySelector("#sub-tab-content-acara .schedule-main-card");
    if (cardEl) {
        cardEl.style.opacity = 0.4;
        cardEl.style.transform = "scale(0.99)";
        
        setTimeout(() => {
            // Update Hari, Bulan, Judul & Subtitle
            const dayEl = document.getElementById("acaraDayText");
            const monthEl = document.getElementById("acaraMonthText");
            const titleEl = document.getElementById("acaraTitleText");
            const subtitleEl = document.getElementById("acaraSubtitleText");

            if (dayEl) dayEl.textContent = data.day;
            if (monthEl) monthEl.textContent = data.month;
            if (titleEl) titleEl.textContent = data.title;
            if (subtitleEl) subtitleEl.textContent = data.dateDisplay;

            // Update Timeline
            const timelineContainer = document.getElementById("acaraTimelineContainer");
            if (timelineContainer) {
                timelineContainer.innerHTML = ""; // Bersihkan timeline lama

                let currentGroupContainer = null;

                data.timeline.forEach(item => {
                    if (item.isHeader) {
                        const headerEl = document.createElement("div");
                        headerEl.className = "timeline-group-header";
                        headerEl.textContent = item.title;
                        timelineContainer.appendChild(headerEl);

                        currentGroupContainer = document.createElement("div");
                        currentGroupContainer.className = "schedule-timeline-group";
                        timelineContainer.appendChild(currentGroupContainer);
                        return;
                    }

                    if (!currentGroupContainer) {
                        currentGroupContainer = document.createElement("div");
                        currentGroupContainer.className = "schedule-timeline-group";
                        timelineContainer.appendChild(currentGroupContainer);
                    }

                    const itemEl = document.createElement("div");
                    itemEl.className = `timeline-item ${item.highlight ? "highlight" : ""}`;

                    let timelineContent = "";
                    if (item.time) {
                        timelineContent += `<span class="time">${item.time}</span>`;
                    }
                    
                    timelineContent += `
                        <div class="timeline-content" ${!item.time ? 'style="margin-left: 0;"' : ''}>
                            <h6>${item.title}</h6>
                            <p>${item.desc}</p>
                    `;

                    if (item.note) {
                        timelineContent += `<p class="detail-note">${item.note}</p>`;
                    }

                    timelineContent += `</div>`;
                    itemEl.innerHTML = timelineContent;
                    currentGroupContainer.appendChild(itemEl);
                });
            }

            // Kembalikan Opasitas Kartu
            cardEl.style.opacity = 1;
            cardEl.style.transform = "scale(1)";
        }, 150);
    }
}

/**
 * Merender Roster Petugas Ibadah Sesuai Kategori & Tanggal Aktif
 */
function renderActiveRoster() {
    const program = appState.currentProgramPetugas;
    // Cari index berdasarkan program aktif (rosterSabatIndex, rosterPaIndex, rosterRabuIndex)
    const indexKey = `roster${program.charAt(0).toUpperCase() + program.slice(1)}Index`;
    const index = appState[indexKey];
    const dataList = rosterData[program];
    const currentRoster = dataList[index];

    if (!currentRoster) return;

    // Update Detail Tanggal & Tag Program di Navigator
    const dateTitleEl = document.getElementById("rosterDateTitle");
    const programTagEl = document.getElementById("rosterProgramTag");
    
    if (dateTitleEl) dateTitleEl.textContent = currentRoster.dateDisplay;
    if (programTagEl) programTagEl.textContent = currentRoster.programTag;

    // Render Konten Departemen Roster
    const container = document.getElementById("rosterDetailsContainer");
    if (!container) return;

    let htmlContent = "";

    currentRoster.departments.forEach(dept => {
        htmlContent += `
            <div class="roster-department-section">
                <div class="roster-dept-header">
                    <h5>${dept.name}</h5>
                    <span class="roster-dept-time">${dept.time}</span>
                </div>
                <div class="roster-rows-list">
        `;

        dept.roles.forEach(row => {
            htmlContent += `
                <div class="roster-row">
                    <span class="roster-role">${row.role}</span>
                    <span class="roster-name">${row.name}</span>
                </div>
            `;
        });

        htmlContent += `
                </div>
            </div>
        `;
    });

    container.innerHTML = htmlContent;
}

/**
 * Navigasi Panah Tanggal di Jadwal Petugas (Kiri/Kanan)
 */
function navigateRosterDate(direction) {
    const program = appState.currentProgramPetugas;
    const indexKey = `roster${program.charAt(0).toUpperCase() + program.slice(1)}Index`;
    let index = appState[indexKey];
    const dataList = rosterData[program];

    if (direction === "prev") {
        index = index - 1;
        if (index < 0) {
            index = dataList.length - 1; // Wrap ke akhir
        }
    } else if (direction === "next") {
        index = index + 1;
        if (index >= dataList.length) {
            index = 0; // Wrap ke awal
        }
    }

    appState[indexKey] = index;

    // Animasi transisi konten saat berpindah tanggal
    const container = document.getElementById("rosterDetailsContainer");
    if (container) {
        container.style.opacity = 0.3;
        container.style.transform = "scale(0.98)";
        
        setTimeout(() => {
            renderActiveRoster();
            container.style.opacity = 1;
            container.style.transform = "scale(1)";
        }, 150);
    }
}

/**
 * Menyalin Teks Nomor Rekening
 */
function copyAccount(elementId, bankName) {
    const textEl = document.getElementById(elementId);
    if (!textEl) return;

    const textToCopy = textEl.textContent.trim();
    
    copyToClipboard(textToCopy, () => {
        Swal.fire({
            title: "Tersalin!",
            text: `Nomor rekening BCA/Mandiri (${bankName}) berhasil disalin ke papan klip.`,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
            toast: true,
            position: "bottom-end",
            iconColor: "#D97706",
            customClass: {
                popup: "swal-custom-toast"
            }
        });
    });
}

/**
 * Menyalin Susunan Ibadah Aktif ke Format WA
 */
function copyScheduleText() {
    const program = appState.currentProgramAcara;
    const dataList = scheduleData[program];
    if (!dataList || dataList.length === 0) return;

    let activeIndex = 0;
    if (program === "sabat" || program === "pa") {
        activeIndex = findClosestUpcomingIndex(dataList);
    }
    const data = dataList[activeIndex];
    if (!data) return;

    copyToClipboard(data.waFormat, () => {
        Swal.fire({
            title: "Format WA Tersalin!",
            text: "Gunakan paste (Ctrl+V atau tempel) pada obrolan WhatsApp Anda.",
            icon: "success",
            timer: 2500,
            showConfirmButton: false,
            toast: true,
            position: "bottom-end",
            iconColor: "#6B1D2F",
            customClass: {
                popup: "swal-custom-toast"
            }
        });
    });
}

/**
 * Helper Fungsi Salin ke Clipboard (Fallback Aman)
 */
function copyToClipboard(text, successCallback) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(successCallback).catch(err => {
            console.error("Gagal menyalin menggunakan clipboard API: ", err);
            fallbackCopy(text, successCallback);
        });
    } else {
        fallbackCopy(text, successCallback);
    }
}

function fallbackCopy(text, successCallback) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed"; // hindari scrolling ke bawah
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand("copy");
        successCallback();
    } catch (err) {
        console.error("Metode salin alternatif gagal: ", err);
    }
    document.body.removeChild(textArea);
}

/**
 * Mockup Unduh QRIS
 */
function downloadQRIS() {
    Swal.fire({
        title: "Unduh QRIS",
        text: "Fitur penyimpanan gambar QRIS sedang disiapkan untuk rilis berikutnya.",
        icon: "info",
        confirmButtonColor: "#6B1D2F",
        confirmButtonText: "Mengerti"
    });
}

/**
 * Menyalin Roster Petugas ke Format WA
 */
function copyCurrentRosterWA() {
    const program = appState.currentProgramPetugas;
    const indexKey = `roster${program.charAt(0).toUpperCase() + program.slice(1)}Index`;
    const index = appState[indexKey];
    const currentRoster = rosterData[program][index];
    if (!currentRoster) return;

    copyToClipboard(currentRoster.waFormat, () => {
        Swal.fire({
            title: "Petugas Tersalin!",
            text: `Roster pelayanan untuk ${currentRoster.dateDisplay} berhasil disalin ke papan klip.`,
            icon: "success",
            timer: 2500,
            showConfirmButton: false,
            toast: true,
            position: "bottom-end",
            iconColor: "#6B1D2F",
            customClass: {
                popup: "swal-custom-toast"
            }
        });
    });
}

/**
 * Mockup Putar Video Khotbah
 */
function playFeaturedVideo() {
    Swal.fire({
        title: "Putar Khotbah",
        text: "Apakah Anda ingin membuka pemutar video khotbah Sabat (YouTube)?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#6B1D2F",
        cancelButtonColor: "#6B7280",
        confirmButtonText: "Ya, Buka",
        cancelButtonText: "Batal"
    }).then((result) => {
        if (result.isConfirmed) {
            window.open("https://www.youtube.com", "_blank");
        }
    });
}

/**
 * Helper Sederhana untuk Toast Ringan
 */
function showToast(message, type = "success") {
    const colors = {
        success: "#6B1D2F",
        info: "#D97706"
    };

    Swal.fire({
        title: message,
        icon: type,
        timer: 1500,
        showConfirmButton: false,
        toast: true,
        position: "bottom-end",
        iconColor: colors[type] || "#6B1D2F"
    });
}

// Event listener saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

/**
 * ------------------------------------------------------------
 * SINKRONISASI & PARSING SUPABASE DATABASE
 * ------------------------------------------------------------
 */

// Helper normalisasi tanggal
function normalizeDate(dateStr) {
    if (!dateStr) return "";
    return dateStr.split(" ")[0].split("T")[0];
}

// Helper nama bulan pendek
function getShortMonthName(monthIndex) {
    const shortMonths = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];
    return shortMonths[monthIndex] || "";
}

// Helper format tanggal penuh
function formatFullDate(dateObj) {
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    
    const dayName = days[dateObj.getDay()];
    const dateNum = dateObj.getDate();
    const monthName = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    
    return `${dayName}, ${dateNum} ${monthName} ${year}`;
}

// Helper untuk parsing tanggal dari display "Sabtu, 18 Juli 2026"
function parseDateFromDisplay(display) {
    try {
        const parts = display.split(",");
        if (parts.length < 2) return null;
        const dateParts = parts[1].trim().split(" ");
        if (dateParts.length < 3) return null;
        
        const day = parseInt(dateParts[0]);
        const monthName = dateParts[1];
        const year = parseInt(dateParts[2]);
        
        const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        const monthIndex = months.indexOf(monthName);
        
        if (monthIndex === -1) return null;
        return new Date(year, monthIndex, day);
    } catch (e) {
        return null;
    }
}

// Helper untuk mencari index terdekat dari hari ini
function findClosestUpcomingIndex(rosterList) {
    if (!rosterList || rosterList.length === 0) return 0;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let closestIndex = 0;
    let minDiff = Infinity;
    
    for (let i = 0; i < rosterList.length; i++) {
        const dateStr = rosterList[i].dateDisplay;
        const parsedDate = parseDateFromDisplay(dateStr);
        
        if (parsedDate) {
            const diff = parsedDate.getTime() - today.getTime();
            if (diff >= 0 && diff < minDiff) {
                minDiff = diff;
                closestIndex = i;
            }
        }
    }
    if (minDiff === Infinity) {
        return rosterList.length - 1;
    }
    
    return closestIndex;
}

// Fungsi utama menarik dan memproses data dari Supabase
async function fetchDataFromSupabase() {
    if (!supabaseClient) {
        console.warn("⚠️ Client Supabase tidak terinisialisasi. Menggunakan data lokal fallback.");
        return;
    }

    try {
        console.log("🔌 Mengambil data dari Supabase...");

        // Ambil data POS, SS, Khotbah, dan PA
        const { data: posList, error: posErr } = await supabaseClient.from("Tabel POS").select("*");
        const { data: ssList, error: ssErr } = await supabaseClient.from("Tabel SS").select("*");
        const { data: khotbahList, error: khotbahErr } = await supabaseClient.from("Tabel Khotbah").select("*");
        const { data: paList, error: paErr } = await supabaseClient.from("Tabel PA").select("*");

        if (posErr) console.error("Gagal load POS:", posErr);
        if (ssErr) console.error("Gagal load SS:", ssErr);
        if (khotbahErr) console.error("Gagal load Khotbah:", khotbahErr);
        if (paErr) console.error("Gagal load PA:", paErr);

        const posArr = posList || [];
        const ssArr = ssList || [];
        const khotbahArr = khotbahList || [];
        const paArr = paList || [];

        // Olah Data Sabat Raya (POS + SS + Khotbah digabung per tanggal)
        const sabatDates = new Set();
        posArr.forEach(r => r.Tanggal && sabatDates.add(normalizeDate(r.Tanggal)));
        ssArr.forEach(r => r.Tanggal && sabatDates.add(normalizeDate(r.Tanggal)));
        khotbahArr.forEach(r => r.Tanggal && sabatDates.add(normalizeDate(r.Tanggal)));

        const sortedSabatDates = Array.from(sabatDates).sort();

        const tempSabatSchedule = [];
        const tempSabatRoster = [];

        sortedSabatDates.forEach(dateStr => {
            const pos = posArr.find(r => normalizeDate(r.Tanggal) === dateStr) || {};
            const ss = ssArr.find(r => normalizeDate(r.Tanggal) === dateStr) || {};
            const kh = khotbahArr.find(r => normalizeDate(r.Tanggal) === dateStr) || {};

            const dateObj = new Date(dateStr);
            const day = String(dateObj.getDate()).padStart(2, '0');
            const month = getShortMonthName(dateObj.getMonth());
            const dateDisplay = formatFullDate(dateObj);

            // Pisahkan Diakon
            let khDiakon1 = '-';
            let khDiakon2 = '-';
            if (kh.DiakenDiaken && kh.DiakenDiaken !== '-') {
                const parts = kh.DiakenDiaken.split('&').map(s => s.trim());
                khDiakon1 = parts[0] || '-';
                khDiakon2 = parts[1] || '-';
            }

            // Timeline acara lengkap Sabat Raya (High-Fidelity)
            const timeline = [
                // Group 1: Informasi Umum
                { isHeader: true, title: "I. Informasi Umum" },
                { time: "", title: "Pianist Jemaat", desc: `${pos.Pianist || '-'}`, highlight: true },
                { time: "", title: "Operator Slide/Zoom", desc: `${pos.Operator || '-'}`, highlight: true },
                { time: "", title: "Soundman Bertugas", desc: `${pos.Soundman || '-'}`, highlight: true },

                // Group 2: Ibadah Sekolah Sabat (09:00 - 10:30)
                { isHeader: true, title: "II. Ibadah Sekolah Sabat (09:00 - 10:30)" },
                { time: "09:00", title: "MC & Yel Yel Sekolah Sabat", desc: `MC: ${ss.MC || '-'}`, highlight: false },
                { time: "09:10", title: "Lagu Buka Sekolah Sabat", desc: "LSEL No. [Kosong]", highlight: false },
                { time: "09:15", title: "Ayat Inti SS & Doa Buka", desc: `Petugas: ${ss.AyatIntiDoaBuka || '-'}`, highlight: false },
                { time: "09:20", title: "Bacaan Berita Mission", desc: `Petugas: ${ss.BeritaMision || '-'}`, highlight: false },
                { time: "09:30", title: "Ringkasan Sekolah Sabat Dewasa", desc: `Pemateri: ${ss.RingkasanSS || '-'}`, highlight: true },
                { time: "10:15", title: "Promosi Pelayanan Perorangan", desc: `Petugas: ${ss.PelayananPerorangan || '-'}`, highlight: false },
                { time: "10:20", title: "Lagu Tutup Sekolah Sabat", desc: "LSEL No. [Kosong]", highlight: false },
                { time: "10:25", title: "Doa Tutup Sekolah Sabat", desc: `Pendoa: ${ss.PelayananPerorangan || '-'}`, highlight: false },
                { time: "10:25", title: "Pengumuman Jemaat", desc: "Tua-Tua / Officers Jemaat", highlight: false },
                { time: "10:30", title: "Cerita Alkitab Anak-Anak", desc: "Pencerita: [Kosong]", highlight: false },

                // Group 3: Ibadah Khotbah (10:35 - 12:00)
                { isHeader: true, title: "III. Ibadah Khotbah (10:35 - 12:00)" },
                { time: "10:35", title: "Diakon & Diakones Bertugas", desc: `Diakon 1: ${khDiakon1} | Diakon 2: ${khDiakon2}`, highlight: false },
                { time: "10:35", title: "Pemimpin Lagu Ibadah Khotbah", desc: `Song Leader: ${kh.PemimpinLagu || '-'}`, highlight: false },
                { time: "10:37", title: "Lagu Pengiring Partisipan Mimbar", desc: 'LSEL No. 515 "Tuhan Ada Dalam Bait Allah"', highlight: false },
                { time: "10:40", title: "Lagu Pembuka Ibadah", desc: 'LSEL No. 1 "Di Hadapan Hadirat-Mu"', highlight: false },
                { time: "10:43", title: "Doa Buka Ibadah", desc: `Pendoa: ${kh.Khotbah || '-'}`, highlight: false },
                { time: "10:45", title: "Pembacaan Ayat Bersahutan", desc: `Pembaca: ${kh.DoaSyafaat || '-'} (Ref: [Kosong])`, highlight: false },
                { time: "10:50", title: "Lagu Pengantar Doa Syafaat", desc: 'LSEL No. 520 "Kami Datang Dalam Doa"', highlight: false },
                { time: "10:53", title: "Doa Syafaat Bersama", desc: `Pendoa: ${kh.DoaSyafaat || '-'}`, highlight: false },
                { time: "11:00", title: "Bacaan Persembahan & Persepuluhan", desc: `Petugas: ${kh.BacaanPersembahan || '-'}`, highlight: false },
                { time: "11:05", title: "Lagu Persembahan & Doa Persembahan", desc: `LSEL No. 260 | Pendoa: ${kh.BacaanPersembahan || '-'}`, highlight: false },
                { time: "11:10", title: "Lagu Pujian (Koor / Vokal Grup)", desc: "Tampil: [Kosong]", highlight: false },
                { time: "11:15", title: "Pembacaan Ayat Inti & Lagu Tema", desc: `Lagu Tema: "MISI KITA"`, highlight: false },
                { time: "11:20", title: "Khotbah / Renungan Firman Tuhan", desc: `Pengkhotbah: ${kh.Khotbah || '-'}`, highlight: true, note: "Judul: [Kosong]" },
                { time: "11:50", title: "Lagu Tutup Kebaktian", desc: "LSEL No. [Kosong]", highlight: false },
                { time: "11:55", title: "Doa TUTUP dan Doa BERKAT", desc: "Pendoa: Pdt. Benny Lumbantobing", highlight: false },
                { time: "12:00", title: "Lagu Sambutan Doa Tutup & Berkat", desc: 'LSEL No. 523 "Tuhan Dengar Doa Kami"', highlight: false }
            ];

            // Roster petugas HTML (modal detail)
            const officersHtml = `
                <div style="text-align: left; font-size: 0.85rem; line-height: 1.6;">
                    <p><strong>Pianist:</strong> ${pos.Pianist || '-'}</p>
                    <p><strong>Operator:</strong> ${pos.Operator || '-'}</p>
                    <p><strong>Soundman:</strong> ${pos.Soundman || '-'}</p>
                    <hr style="margin: 8px 0; border: 0; border-top: 1px solid var(--border-color);">
                    <p><strong>MC Sekolah Sabat:</strong> ${ss.MC || '-'}</p>
                    <p><strong>Ayat Inti & Doa SS:</strong> ${ss.AyatIntiDoaBuka || '-'}</p>
                    <p><strong>Berita Mision:</strong> ${ss.BeritaMision || '-'}</p>
                    <p><strong>Ringkasan Kelas SS:</strong> ${ss.RingkasanSS || '-'}</p>
                    <p><strong>Pelayanan Perorangan:</strong> ${ss.PelayananPerorangan || '-'}</p>
                    <hr style="margin: 8px 0; border: 0; border-top: 1px solid var(--border-color);">
                    <p><strong>Khotbah:</strong> ${kh.Khotbah || '-'}</p>
                    <p><strong>Doa Syafaat:</strong> ${kh.DoaSyafaat || '-'}</p>
                    <p><strong>Bacaan Persembahan:</strong> ${kh.BacaanPersembahan || '-'}</p>
                    <p><strong>Song Leader:</strong> ${kh.PemimpinLagu || '-'}</p>
                    <p><strong>Diakon Bertugas:</strong> ${kh.DiakenDiaken || '-'}</p>
                </div>
            `;

            // Format WhatsApp liturgi
            const waFormat = buildSabatWaFormat(pos, ss, kh, dateDisplay);

            tempSabatSchedule.push({
                day,
                month,
                dateDisplay,
                title: "Ibadah Sabat Raya",
                timeline,
                officersHtml,
                waFormat
            });

            // Roster petugas departemen
            const departments = [
                {
                    name: "INFORMASI UMUM",
                    time: "",
                    roles: [
                        { role: "Pianist", name: pos.Pianist || '-' },
                        { role: "Operator Slide", name: pos.Operator || '-' },
                        { role: "Soundman", name: pos.Soundman || '-' }
                    ]
                },
                {
                    name: "IBADAH SEKOLAH SABAT",
                    time: "09:00 - 10:30 WIB",
                    roles: [
                        { role: "Pemimpin Acara/MC", name: ss.MC || '-' },
                        { role: "Ayat Inti & Doa SS", name: ss.AyatIntiDoaBuka || '-' },
                        { role: "Berita Mision", name: ss.BeritaMision || '-' },
                        { role: "Pelayanan Perorangan", name: ss.PelayananPerorangan || '-' }
                    ]
                },
                {
                    name: "IBADAH KHOTBAH",
                    time: "10:35 - 12:00 WIB",
                    roles: [
                        { role: "Khotbah (Divine)", name: kh.Khotbah || '-' },
                        { role: "Doa Syafaat", name: kh.DoaSyafaat || '-' },
                        { role: "Bacaan Persembahan", name: kh.BacaanPersembahan || '-' },
                        { role: "Song Leader", name: kh.PemimpinLagu || '-' },
                        { role: "Diakon Bertugas", name: kh.DiakenDiaken || '-' }
                    ]
                }
            ];

            const rosterWaFormat = `*JADWAL PETUGAS SABAT RAYA*\n*GMAHK Jemaat Sepanjang*\n${dateDisplay}\n\n*SEKOLAH SABAT*\n- Pianist: ${pos.Pianist || '-'}\n- MC: ${ss.MC || '-'}\n- Ayat & Doa: ${ss.AyatIntiDoaBuka || '-'}\n- Misi: ${ss.BeritaMision || '-'}\n\n*KHOTBAH / UMUM*\n- Khotbah: ${kh.Khotbah || '-'}\n- Syafaat: ${kh.DoaSyafaat || '-'}\n- Song Leader: ${kh.PemimpinLagu || '-'}\n- Diakon: ${kh.DiakenDiaken || '-'}\n\n*OPERATOR/SOUND*\n- Operator: ${pos.Operator || '-'}\n- Soundman: ${pos.Soundman || '-'}\n\n_Terima kasih atas pelayanan Anda, Tuhan memberkati!_`;

            tempSabatRoster.push({
                dateDisplay,
                programTag: "IBADAH SABAT RAYA",
                departments,
                waFormat: rosterWaFormat
            });
        });

        // Olah Data PA (dari Tabel PA)
        const sortedPaArr = paArr.filter(r => r.Tanggal).sort((a, b) => a.Tanggal.localeCompare(b.Tanggal));
        const tempPaSchedule = [];
        const tempPaRoster = [];

        sortedPaArr.forEach(p => {
            const dateObj = new Date(p.Tanggal);
            const day = String(dateObj.getDate()).padStart(2, '0');
            const month = getShortMonthName(dateObj.getMonth());
            const dateDisplay = formatFullDate(dateObj);

            // Timeline lengkap PA (High-Fidelity)
            const timeline = [
                { time: "16:00", title: "MC & Janji PA", desc: `MC: ${p.MC || '-'}` },
                { time: "16:05", title: "Lagu Pembuka (AYS)", desc: "AYS No. [Kosong]" },
                { time: "16:10", title: "Ayat Inti & Doa Buka PA", desc: `Petugas: ${p.AyatIntiDoaBuka || '-'}` },
                { time: "16:15", title: "Belajar Alkitab Bersama (BAB)", desc: `Petugas: ${p.BAB || '-'}` },
                { time: "16:45", title: "Funfact / Tips Pemuda", desc: `Petugas: ${p.TipsFunfact || '-'}` },
                { time: "16:55", title: "Aktivitas / Games Pemuda", desc: `Koordinator: ${p.Games || '-'}` },
                { time: "17:15", title: "Acara Inti & Diskusi", desc: `Pemateri: ${p.AcaraInti || '-'}` },
                { time: "17:35", title: "Lagu Penutup (AYS)", desc: "AYS No. [Kosong]" },
                { time: "17:40", title: "Doa Tutup & Vesper", desc: `Pendoa: ${p.AcaraInti || '-'}` },
                { time: "17:45", title: "Pengumuman Pemuda", desc: "Pengurus PA" },
                { time: "17:50", title: "Laporan Bendahara PA", desc: "Bendahara PA" }
            ];

            const officersHtml = `
                <div style="text-align: left; font-size: 0.85rem; line-height: 1.6;">
                    <p><strong>MC & Janji PA:</strong> ${p.MC || '-'}</p>
                    <p><strong>Ayat Inti & Doa SS/PA:</strong> ${p.AyatIntiDoaBuka || '-'}</p>
                    <p><strong>Belajar Alkitab Bersama:</strong> ${p.BAB || '-'}</p>
                    <p><strong>Games:</strong> ${p.Games || '-'}</p>
                    <p><strong>Tips / Funfact:</strong> ${p.TipsFunfact || '-'}</p>
                    <p><strong>Acara Inti & Doa:</strong> ${p.AcaraInti || '-'}</p>
                </div>
            `;

            // Format WhatsApp liturgi PA
            const waFormat = buildPaWaFormat(p, dateDisplay);

            tempPaSchedule.push({
                day,
                month,
                dateDisplay,
                title: "Pemuda Advent (PA)",
                timeline,
                officersHtml,
                waFormat
            });

            const departments = [
                {
                    name: "PEMUDA ADVENT (PA)",
                    time: "16:00 - Selesai",
                    roles: [
                        { role: "MC & Janji PA", name: p.MC || '-' },
                        { role: "Ayat Inti & Doa", name: p.AyatIntiDoaBuka || '-' },
                        { role: "Belajar Alkitab (BAB)", name: p.BAB || '-' },
                        { role: "Games / Acara", name: p.Games || '-' },
                        { role: "Funfact / Tips", name: p.TipsFunfact || '-' },
                        { role: "Acara Inti & Doa Tutup", name: p.AcaraInti || '-' }
                    ]
                }
            ];

            const rosterWaFormat = `*JADWAL PETUGAS PEMUDA ADVENT (PA)*\n*GMAHK Jemaat Sepanjang*\n${dateDisplay}\n\n*PETUGAS PA*\n- MC & Janji PA: ${p.MC || '-'}\n- Ayat & Doa: ${p.AyatIntiDoaBuka || '-'}\n- BAB: ${p.BAB || '-'}\n- Games: ${p.Games || '-'}\n- Acara Inti: ${p.AcaraInti || '-'}\n\n_Terima kasih atas pelayanan Anda, Tuhan memberkati!_`;

            tempPaRoster.push({
                dateDisplay,
                programTag: "IBADAH PEMUDA ADVENT (PA)",
                departments,
                waFormat: rosterWaFormat
            });
        });

        // Simpan data & atur index terdekat
        if (tempSabatSchedule.length > 0) {
            scheduleData.sabat = tempSabatSchedule;
            rosterData.sabat = tempSabatRoster;
            appState.rosterSabatIndex = findClosestUpcomingIndex(tempSabatRoster);
        }

        if (tempPaSchedule.length > 0) {
            scheduleData.pa = tempPaSchedule;
            rosterData.pa = tempPaRoster;
            appState.rosterPaIndex = findClosestUpcomingIndex(tempPaRoster);
        }

        console.log("✅ Berhasil memproses data dari Supabase!");
        
        // Render ulang tampilan setelah data ditarik
        renderActiveAcara();
        renderActiveRoster();

    } catch (e) {
        console.error("❌ Gagal total sinkronisasi Supabase:", e);
    }
}

// WhatsApp template generator helpers
function buildSabatWaFormat(pos, ss, kh, dateDisplay) {
    let khDiakon1 = '-';
    let khDiakon2 = '-';
    if (kh.DiakenDiaken && kh.DiakenDiaken !== '-') {
        const parts = kh.DiakenDiaken.split('&').map(s => s.trim());
        khDiakon1 = parts[0] || '-';
        khDiakon2 = parts[1] || '-';
    }

    return `*Sabat Shalom 🌿*

*Hari Sabat-Oh! Jadikanlah itu sebagai hari yang paling indah dan yang paling berbahagia dari hari-hari sepanjang minggu.*
Review and Herald. 14 April 1885. 

*Susunan Ibadah SABAT* 

*Sabat ke - .... TW - ....*
${dateDisplay}

*Dimulai Pukul : 09.00 WIB - 12.00 WIB*

● *Pianist*
${pos.Pianist || '-'} 

● *Operator*
${pos.Operator || '-'} 

● *Soundman*
${pos.Soundman || '-'} 


*IBADAH SEKOLAH SABAT* 

● *MC + Yel Yel SS*
${ss.MC || '-'}

● *Lagu Buka*
LSEL No. [Kosong]

● *Ayat Inti SS dan Doa Buka*
${ss.AyatIntiDoaBuka || '-'}

● *Bacaan Berita Mission*
${ss.BeritaMision || '-'}

● *Ringkasan Sekolah Sabat Dewasa*
${ss.RingkasanSS || '-'}

● *Promosi Pelayanan Perorangan*
${ss.PelayananPerorangan || '-'}

● *Lagu Tutup* 
LSEL No. [Kosong]

● *Doa Tutup*
${ss.PelayananPerorangan || '-'}


● *PENGUMUMAN*
Officers/Tua-Tua Jemaat

● *Cerita Alkitab Anak*
- 


*IBADAH KHOTBAH*

● *Diakon/Diakones*
1. ${khDiakon1}
2. ${khDiakon2}

● *Pemimpin Lagu*
${kh.PemimpinLagu || '-'}

● *Lagu Pengiring Partisipan Masuk Mimbar Atas*
LSEL No. 515:
*"Tuhan Ada Dalam Bait Allah"*

● *Lagu Pembuka*
LSEL No. 1:
*"Di Hadapan Hadirat-Mu"*

● *Doa Buka*
${kh.Khotbah || '-'}

● *Ayat Bersahutan*
${kh.DoaSyafaat || '-'}
*[Kosong]*

● *Lagu Buka* 
LSEL No. [Kosong]

● *Lagu Pengantar Doa Syafaat*
LSEL No. 520
*"Kami Datang Dalam Doa"*

● *Doa Syafaat*
${kh.DoaSyafaat || '-'}

● *Lagu Sambutan Doa Syafaat*
LSEL No. 516
*"Dengar Ya Tuhan"*

● *Bacaan Persembahan & Persepuluhan*
${kh.BacaanPersembahan || '-'}

● *Lagu Persembahan*
LSEL No. 260:
*"Bawa Persembahanmu"*

● *Lagu Sambutan Persembahan*
LSEL No. 21
*"Pada-Mu Allah Ku Puji"* 

● *Doa Persembahan*
${kh.BacaanPersembahan || '-'}

● *Ayat Inti*
${kh.DoaSyafaat || '-'} 
*[Kosong]*

● *Lagu Tema* 
*"MISI KITA"*

● *PENGKHOTBAH*
${kh.Khotbah || '-'}
*"[Kosong]"*

● *Lagu Tutup*
LSEL No [Kosong]

● *Doa TUTUP dan Doa BERKAT*
Pdt. Benny Lumbantobing

● *Lagu Sambutan Doa Tutup dan Doa Berkat*
LSEL No. 523:
*"Tuhan Dengar Doa Kami"*

__________________________

_Janganlah kita menjauhkan diri dari pertemuan-pertemuan ibadah kita, seperti dibiasakan oleh beberapa orang, tetapi marilah kita saling menasihati, dan semakin giat melakukannya menjelang hari Tuhan yang mendekat._
Ibrani 10 : 25`;
}

function buildPaWaFormat(p, dateDisplay) {
    return `*Shalom KUPAS, berikut adalah :* 
*Susunan Partisipan Ibadah Pemuda Advent Tanggal ${dateDisplay}*

● *MC & Janji PA* : ${p.MC || '-'}

● *Lagu Buka* : AYS [Kosong]

● *Ayat Inti & Doa Buka* : ${p.AyatIntiDoaBuka || '-'}

● *BAB* : ${p.BAB || '-'}

● *Funfact / Tips* : ${p.TipsFunfact || '-'}

● *Games* : ${p.Games || '-'}

● *Acara Inti* : ${p.AcaraInti || '-'}

● *Lagu Tutup* : AYS [Kosong]

● *Doa Tutup* : ${p.AcaraInti || '-'}

● *Pengumuman* : Ketua PA

● *Laporan Bendahara* : Bendahara PA

*Selamat Melayani~*
*Tuhan Memberkati 😇🙏*`;
}
