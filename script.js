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
    theme: "light",
    isEditingSementara: false
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
                { time: "", title: "MC & Yel Yel Sekolah Sabat", desc: "Sdr. Kevin A.", highlight: false },
                { time: "", title: "Ringkasan Sekolah Sabat Dewasa", desc: "Di kelas masing-masing (Sabat ke-3)", highlight: true },
                { isHeader: true, title: "III. Ibadah Khotbah (10:35 - 12:00)" },
                { time: "", title: "Ibadah Khotbah (Divine Service)", desc: "Pdt. Benny Lumbantobing", highlight: true, note: "Tema: 'Misi Terakhir untuk Dunia'" }
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
                { time: "", title: "Pembukaan & Pujian PA", desc: "Pengurus PA" },
                { time: "", title: "Aktivitas / Seminar Pemuda", desc: "Sdr. Bryan S.", highlight: true, note: "Tema: 'Pemuda Masa Kini & Tantangan Zaman'" },
                { time: "", title: "Vesper & Doa Penutup", desc: "Sdri. Grace T." }
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
                { time: "", title: "Host", desc: "Sdri. Linda K." },
                { time: "", title: "MC & Doa Buka", desc: "Sdri. Linda K." },
                { time: "", title: "Kesaksian", desc: "Sdr. Julian" },
                { time: "", title: "Lagu Pujian", desc: "Sdri. Linda K." },
                { time: "", title: "Doa Syafaat", desc: "Pdt. Benny Lumbantobing", highlight: true },
                { time: "", title: "Firman Tuhan", desc: "Pnt. J. Silitonga", highlight: true, note: "Tema: 'Kekuatan dalam Doa Syafaat'" },
                { time: "", title: "Doa Tutup", desc: "Pnt. J. Silitonga" },
                { time: "", title: "Ucapan Terima Kasih & Pengumuman", desc: "Ketua Jemaat" }
            ],
            waFormat: `GMAHK Sepanjang mengundang Anda untuk bergabung ke rapat Zoom yang terjadwal.

Topic: Ibadah Rabu Malam - GMAHK Sepanjang
*Waktu: Rabu, 22 Juli 2026; Jam: 19:00 WIB (ontime)*

Join Zoom Meeting
https://us06web.zoom.us/j/82101187786?pwd=dJOh8nzgiWRMFTkMvxByhbSrbnMtiH.1

Meeting ID: 821 0118 7786
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
 * Update Tanggal Hari Ini di Header
 */
function updateCurrentDate() {
    const el = document.getElementById("currentDateText");
    if (el) {
        const now = new Date();
        const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        const dayName = days[now.getDay()];
        const dateNum = now.getDate();
        const monthName = months[now.getMonth()];
        const year = now.getFullYear();
        el.textContent = `${dayName}, ${dateNum} ${monthName} ${year}`;
    }
}

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

    // Inisialisasi Routing & Back Button Handler
    handleRoute();
    window.addEventListener('popstate', handleRoute);
    window.addEventListener('hashchange', handleRoute);
}

/**
 * Handle URL Hash Routing & Browser Back/Forward Navigation
 */
function handleRoute(event) {
    let rawHash = '';

    if (event && event.state && event.state.tab) {
        rawHash = event.state.tab;
    } else {
        rawHash = window.location.hash.replace('#', '').trim();
    }

    if (!rawHash) {
        rawHash = 'home';
        if (window.location.hash !== '#home') {
            history.replaceState({ tab: 'home' }, '', '#home');
        }
    }

    if (rawHash === 'admin') {
        if (currentAdminSession) {
            openAdminDashboardView(false);
        } else {
            switchTab('home', false);
            openLoginModal();
        }
    } else if (['home', 'susunan', 'persembahan', 'tentang'].includes(rawHash)) {
        switchTab(rawHash, false);
    } else {
        switchTab('home', false);
    }
}

/**
 * Logika Perpindahan Tab Utama
 */
function switchTab(tabId, updateHash = true) {
    if (!tabId) tabId = 'home';

    // Tutup tampilan admin jika sedang terbuka
    const adminView = document.getElementById('adminDashboardView');
    if (adminView && adminView.style.display !== 'none') {
        closeAdminDashboardView(false);
    }

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

    // Update URL Hash untuk histori browser
    if (updateHash && window.location.hash !== `#${tabId}`) {
        history.pushState({ tab: tabId }, '', `#${tabId}`);
    }
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

                // Load local overrides if they exist (Tipe 1)
                const overrides = loadLocalScheduleChanges(program, data.dateDisplay);
                if (overrides) {
                    data.timeline = overrides;
                }

                // Toggle visibility of Reset button
                const resetBtn = document.getElementById("btn-reset-edit");
                if (resetBtn) {
                    resetBtn.style.display = (overrides || appState.isEditingSementara) ? "inline-flex" : "none";
                }

                let currentGroupContainer = null;

                data.timeline.forEach((item, itemIndex) => {
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

                    const isEditing = appState.isEditingSementara;
                    const isKhotbahItem = item.title.toLowerCase().includes("khotbah") || item.title.toLowerCase().includes("renungan");
                    const showNoteField = (item.note && item.note !== '-') || (isEditing && isKhotbahItem);
                    const noteText = (item.note && item.note !== '-') ? item.note : (isEditing && isKhotbahItem ? "(tambah catatan)" : "");
                    const isPlaceholder = isEditing && isKhotbahItem && (!item.note || item.note === '-');

                    timelineContent += `
                        <div class="timeline-content">
                            <h6>${item.title}</h6>
                            <div class="timeline-desc-wrapper">
                                <p ${isEditing ? `contenteditable="true" class="editable-field" data-type="desc" data-index="${itemIndex}"` : ''}>${item.desc}</p>
                                ${showNoteField ? `<p class="detail-note ${isPlaceholder ? 'placeholder-note' : ''}" ${isEditing ? `contenteditable="true" class="editable-field" data-type="note" data-index="${itemIndex}"` : ''}>${noteText}</p>` : ''}
                            </div>
                        </div>
                    `;
                    itemEl.innerHTML = timelineContent;
                    currentGroupContainer.appendChild(itemEl);
                });

                // Attach input event listener for inline editing
                attachTimelineEditListener(timelineContainer);
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

    // Load local overrides to make sure the copied text matches what's visible
    const overrides = loadLocalScheduleChanges(program, data.dateDisplay);
    const activeTimeline = overrides || data.timeline;

    let waText = "";
    if (program === "sabat") {
        waText = buildSabatWaFormatFromTimeline(activeTimeline, data.dateDisplay);
    } else if (program === "pa") {
        waText = buildPaWaFormatFromTimeline(activeTimeline, data.dateDisplay);
    } else if (program === "rabu") {
        waText = buildRabuWaFormatFromTimeline(activeTimeline, data.dateDisplay);
    }

    copyToClipboard(waText, () => {
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
 * Auto-refresh Google Slides Hero iframe to ensure continuous infinite loop
 */
function ensureSlideshowLoop() {
    const iframe = document.getElementById('heroSlideshowIframe');
    if (!iframe) return;

    // Refresh iframe src every 60 seconds to guarantee endless slide looping
    setInterval(() => {
        try {
            const currentSrc = iframe.src;
            iframe.src = currentSrc;
        } catch (e) {}
    }, 60000);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureSlideshowLoop);
} else {
    ensureSlideshowLoop();
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
                { time: "", title: "Pianist", desc: `${pos.Pianist || '-'}`, highlight: true },
                { time: "", title: "Operator", desc: `${pos.Operator || '-'}`, highlight: true },
                { time: "", title: "Soundman", desc: `${pos.Soundman || '-'}`, highlight: true },

                // Group 2: Ibadah Sekolah Sabat (09:00 - 10:30)
                { isHeader: true, title: "II. Ibadah Sekolah Sabat (09:00 - 10:30)" },
                { time: "", title: "MC & Yel Yel Sekolah Sabat", desc: `${ss.MC || '-'}`, highlight: false },
                { time: "", title: "Lagu Buka Sekolah Sabat", desc: "LSEL No. [Kosong]", highlight: false },
                { time: "", title: "Ayat Inti SS & Doa Buka", desc: `${ss.AyatIntiDoaBuka || '-'}`, highlight: false },
                { time: "", title: "Bacaan Berita Mission", desc: `${ss.BeritaMision || '-'}`, highlight: false },
                { time: "", title: "Ringkasan Sekolah Sabat Dewasa", desc: `${ss.RingkasanSS || '-'}`, highlight: true },
                { time: "", title: "Promosi Pelayanan Perorangan", desc: `${ss.PelayananPerorangan || '-'}`, highlight: false },
                { time: "", title: "Lagu Tutup Sekolah Sabat", desc: "LSEL No. [Kosong]", highlight: false },
                { time: "", title: "Doa Tutup Sekolah Sabat", desc: `${ss.PelayananPerorangan || '-'}`, highlight: false },
                { time: "", title: "Pengumuman Jemaat", desc: "Tua-Tua / Officers Jemaat", highlight: false },
                { time: "", title: "Cerita Alkitab Anak-Anak", desc: "-", highlight: false },

                // Group 3: Ibadah Khotbah (10:35 - 12:00)
                { isHeader: true, title: "III. Ibadah Khotbah (10:30 - 12:00)" },
                { time: "", title: "Diakon & Diakones Bertugas", desc: `${kh.DiakenDiaken || '-'}`, highlight: false },
                { time: "", title: "Pemimpin Lagu Ibadah Khotbah", desc: `${kh.PemimpinLagu || '-'}`, highlight: false },
                { time: "", title: "Lagu Pengiring Partisipan Mimbar", desc: "LSEL No. 515", highlight: false },
                { time: "", title: "Lagu Pembuka Ibadah", desc: "LSEL No. 1", highlight: false },
                { time: "", title: "Doa Buka Ibadah", desc: `${kh.Khotbah || '-'}`, highlight: false },
                { time: "", title: "Pembacaan Ayat Bersahutan", desc: `${kh.DoaSyafaat || '-'}`, highlight: false },
                { time: "", title: "Lagu Pengantar Doa Syafaat", desc: "LSEL No. 520", highlight: false },
                { time: "", title: "Doa Syafaat Bersama", desc: `${kh.DoaSyafaat || '-'}`, highlight: false },
                { time: "", title: "Bacaan Persembahan & Persepuluhan", desc: `${kh.BacaanPersembahan || '-'}`, highlight: false },
                { time: "", title: "Lagu Persembahan & Doa Persembahan", desc: `${kh.BacaanPersembahan || '-'}`, highlight: false },
                { time: "", title: "Lagu Pujian (Koor / Vokal Grup)", desc: "-", highlight: false },
                { time: "", title: "Pembacaan Ayat Inti & Lagu Tema", desc: "MISI KITA", highlight: false },
                { time: "", title: "Khotbah / Renungan Firman Tuhan", desc: `${kh.Khotbah || '-'}`, highlight: true, note: "Judul: [Kosong]" },
                { time: "", title: "Lagu Tutup Kebaktian", desc: "LSEL No. [Kosong]", highlight: false },
                { time: "", title: "Doa TUTUP dan Doa BERKAT", desc: "Pdt. Benny Lumbantobing", highlight: false },
                { time: "", title: "Lagu Sambutan Doa Tutup & Berkat", desc: "LSEL No. 523", highlight: false }
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
                { time: "", title: "MC & Janji PA", desc: `${p.MC || '-'}` },
                { time: "", title: "Lagu Pembuka (AYS)", desc: "AYS No. [Kosong]" },
                { time: "", title: "Ayat Inti & Doa Buka PA", desc: `${p.AyatIntiDoaBuka || '-'}` },
                { time: "", title: "Belajar Alkitab Bersama (BAB)", desc: `${p.BAB || '-'}` },
                { time: "", title: "Funfact / Tips", desc: `${p.TipsFunfact || '-'}` },
                { time: "", title: "Games", desc: `${p.Games || '-'}` },
                { time: "", title: "Acara Inti & Diskusi", desc: `${p.AcaraInti || '-'}` },
                { time: "", title: "Lagu Penutup (AYS)", desc: "AYS No. [Kosong]" },
                { time: "", title: "Doa Tutup", desc: `${p.AcaraInti || '-'}` },
                { time: "", title: "Pengumuman", desc: "Pengurus PA" },
                { time: "", title: "Laporan Bendahara PA", desc: "Bendahara PA" }
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

        // Clean up old localStorage overrides based on new active dates
        let currentSabatDateStr = "";
        let currentPaDateStr = "";
        if (tempSabatSchedule.length > 0) {
            const idx = findClosestUpcomingIndex(tempSabatSchedule);
            if (tempSabatSchedule[idx]) currentSabatDateStr = tempSabatSchedule[idx].dateDisplay;
        }
        if (tempPaSchedule.length > 0) {
            const idx = findClosestUpcomingIndex(tempPaSchedule);
            if (tempPaSchedule[idx]) currentPaDateStr = tempPaSchedule[idx].dateDisplay;
        }
        cleanupObsoleteLocalOverrides(currentSabatDateStr, currentPaDateStr);

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

// Local Persistence Helpers for Edit Sementara (Tipe 1)
function saveLocalScheduleChanges(program, dateDisplay, timeline) {
    const key = `schedule_override_${program}_${dateDisplay}`;
    localStorage.setItem(key, JSON.stringify(timeline));
}

function loadLocalScheduleChanges(program, dateDisplay) {
    const key = `schedule_override_${program}_${dateDisplay}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
}

function cleanupObsoleteLocalOverrides(currentSabatDate, currentPaDate) {
    try {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith("schedule_override_")) {
                if (!key.includes(currentSabatDate) && !key.includes(currentPaDate)) {
                    localStorage.removeItem(key);
                    i--; // adjust index
                }
            }
        }
    } catch (e) {
        console.error("Gagal membersihkan cache lokal:", e);
    }
}

// Toggle Edit Mode
function toggleEditSementara() {
    appState.isEditingSementara = !appState.isEditingSementara;

    const editBtn = document.getElementById("btn-toggle-edit");
    if (editBtn) {
        const textSpan = editBtn.querySelector("span");
        if (appState.isEditingSementara) {
            editBtn.classList.remove("btn-secondary");
            editBtn.classList.add("btn-primary");
            if (textSpan) textSpan.textContent = "Selesai Edit";
            editBtn.querySelector("svg").innerHTML = `<path d="M20 6 9 17l-5-5"/>`; // checkmark icon
        } else {
            editBtn.classList.remove("btn-primary");
            editBtn.classList.add("btn-secondary");
            if (textSpan) textSpan.textContent = "Edit Sementara";
            editBtn.querySelector("svg").innerHTML = `<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>`; // edit icon
        }
    }

    renderActiveAcara();
}

// Reset Local Changes
function resetEditSementara() {
    const program = appState.currentProgramAcara;
    const dataList = scheduleData[program];
    if (!dataList || dataList.length === 0) return;

    let activeIndex = 0;
    if (program === "sabat" || program === "pa") {
        activeIndex = findClosestUpcomingIndex(dataList);
    }
    const data = dataList[activeIndex];
    if (!data) return;

    Swal.fire({
        title: "Reset Edit Sementara?",
        text: "Semua perubahan sementara yang Anda buat di browser ini akan dihapus dan dikembalikan ke data asli server.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#D97706",
        cancelButtonColor: "#EF4444",
        confirmButtonText: "Ya, Reset!",
        cancelButtonText: "Batal"
    }).then((result) => {
        if (result.isConfirmed) {
            const key = `schedule_override_${program}_${data.dateDisplay}`;
            localStorage.removeItem(key);

            // Re-fetch data from Supabase (or load default fallback) to cleanly restore memory variables
            fetchDataFromSupabase().then(() => {
                // If offline or supabase fails, manually reload fallback
                renderActiveAcara();
                Swal.fire({
                    title: "Riset Selesai!",
                    text: "Jadwal telah dikembalikan ke data default server.",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                    toast: true,
                    position: "bottom-end",
                    iconColor: "#D97706"
                });
            });
        }
    });
}

// Event Delegation for ContentEditable Changes
function attachTimelineEditListener(container) {
    if (container.dataset.listenerAttached) return;
    container.dataset.listenerAttached = "true";

    container.addEventListener("input", (e) => {
        if (e.target.classList.contains("editable-field")) {
            const program = appState.currentProgramAcara;
            const dataList = scheduleData[program];
            if (!dataList || dataList.length === 0) return;

            let activeIndex = 0;
            if (program === "sabat" || program === "pa") {
                activeIndex = findClosestUpcomingIndex(dataList);
            }
            const data = dataList[activeIndex];
            if (!data || !data.timeline) return;

            const type = e.target.dataset.type;
            const itemIndex = parseInt(e.target.dataset.index);
            let val = e.target.textContent;

            if (data.timeline[itemIndex]) {
                const item = data.timeline[itemIndex];
                if (type === "title") {
                    item.title = val.trim();
                } else if (type === "desc") {
                    item.desc = val.trim();
                } else if (type === "note") {
                    if (val.trim() === "(tambah catatan)") {
                        item.note = "";
                    } else {
                        item.note = val.trim();
                    }
                }

                if (type === "note" && val.trim() !== "(tambah catatan)") {
                    e.target.classList.remove("placeholder-note");
                }

                saveLocalScheduleChanges(program, data.dateDisplay, data.timeline);

                const resetBtn = document.getElementById("btn-reset-edit");
                if (resetBtn) resetBtn.style.display = "inline-flex";
            }
        }
    });

    container.addEventListener("focusin", (e) => {
        if (e.target.classList.contains("editable-field") && e.target.dataset.type === "note") {
            if (e.target.textContent.trim() === "(tambah catatan)") {
                e.target.textContent = "";
                e.target.classList.remove("placeholder-note");
            }
        }
    });

    container.addEventListener("focusout", (e) => {
        if (e.target.classList.contains("editable-field") && e.target.dataset.type === "note") {
            if (e.target.textContent.trim() === "") {
                e.target.textContent = "(tambah catatan)";
                e.target.classList.add("placeholder-note");

                const program = appState.currentProgramAcara;
                const dataList = scheduleData[program];
                if (!dataList || dataList.length === 0) return;

                let activeIndex = 0;
                if (program === "sabat" || program === "pa") {
                    activeIndex = findClosestUpcomingIndex(dataList);
                }
                const data = dataList[activeIndex];
                if (!data || !data.timeline) return;

                const itemIndex = parseInt(e.target.dataset.index);
                if (data.timeline[itemIndex]) {
                    data.timeline[itemIndex].note = "";
                    saveLocalScheduleChanges(program, data.dateDisplay, data.timeline);
                }
            }
        }
    });
}


// Local Persistence Helpers for Edit Sementara (Tipe 1)
function saveLocalScheduleChanges(program, dateDisplay, timeline) {
    const key = `schedule_override_${program}_${dateDisplay}`;
    localStorage.setItem(key, JSON.stringify(timeline));
}

function loadLocalScheduleChanges(program, dateDisplay) {
    const key = `schedule_override_${program}_${dateDisplay}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
}

function cleanupObsoleteLocalOverrides(currentSabatDate, currentPaDate) {
    try {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith("schedule_override_")) {
                if (!key.includes(currentSabatDate) && !key.includes(currentPaDate)) {
                    localStorage.removeItem(key);
                    i--; // adjust index
                }
            }
        }
    } catch (e) {
        console.error("Gagal membersihkan cache lokal:", e);
    }
}

// Toggle Edit Mode
function toggleEditSementara() {
    appState.isEditingSementara = !appState.isEditingSementara;

    const editBtn = document.getElementById("btn-toggle-edit");
    if (editBtn) {
        const textSpan = editBtn.querySelector("span");
        if (appState.isEditingSementara) {
            editBtn.classList.remove("btn-secondary");
            editBtn.classList.add("btn-primary");
            if (textSpan) textSpan.textContent = "Selesai Edit";
            editBtn.querySelector("svg").innerHTML = `<path d="M20 6 9 17l-5-5"/>`; // checkmark icon
        } else {
            editBtn.classList.remove("btn-primary");
            editBtn.classList.add("btn-secondary");
            if (textSpan) textSpan.textContent = "Edit Sementara";
            editBtn.querySelector("svg").innerHTML = `<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>`; // edit icon
        }
    }

    renderActiveAcara();
}

// Reset Local Changes
function resetEditSementara() {
    const program = appState.currentProgramAcara;
    const dataList = scheduleData[program];
    if (!dataList || dataList.length === 0) return;

    let activeIndex = 0;
    if (program === "sabat" || program === "pa") {
        activeIndex = findClosestUpcomingIndex(dataList);
    }
    const data = dataList[activeIndex];
    if (!data) return;

    Swal.fire({
        title: "Reset Edit Sementara?",
        text: "Semua perubahan sementara yang Anda buat di browser ini akan dihapus dan dikembalikan ke data asli server.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#D97706",
        cancelButtonColor: "#EF4444",
        confirmButtonText: "Ya, Reset!",
        cancelButtonText: "Batal"
    }).then((result) => {
        if (result.isConfirmed) {
            const key = `schedule_override_${program}_${data.dateDisplay}`;
            localStorage.removeItem(key);

            // Re-fetch data from Supabase (or load default fallback) to cleanly restore memory variables
            fetchDataFromSupabase().then(() => {
                // If offline or supabase fails, manually reload fallback
                renderActiveAcara();
                Swal.fire({
                    title: "Riset Selesai!",
                    text: "Jadwal telah dikembalikan ke data default server.",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                    toast: true,
                    position: "bottom-end",
                    iconColor: "#D97706"
                });
            });
        }
    });
}

// Event Delegation for ContentEditable Changes
function attachTimelineEditListener(container) {
    if (container.dataset.listenerAttached) return;
    container.dataset.listenerAttached = "true";

    container.addEventListener("input", (e) => {
        if (e.target.classList.contains("editable-field")) {
            const program = appState.currentProgramAcara;
            const dataList = scheduleData[program];
            if (!dataList || dataList.length === 0) return;

            let activeIndex = 0;
            if (program === "sabat" || program === "pa") {
                activeIndex = findClosestUpcomingIndex(dataList);
            }
            const data = dataList[activeIndex];
            if (!data || !data.timeline) return;

            const type = e.target.dataset.type;
            const itemIndex = parseInt(e.target.dataset.index);
            let val = e.target.textContent;

            if (data.timeline[itemIndex]) {
                const item = data.timeline[itemIndex];
                if (type === "title") {
                    item.title = val.trim();
                } else if (type === "desc") {
                    item.desc = val.trim();
                } else if (type === "note") {
                    if (val.trim() === "(tambah catatan)") {
                        item.note = "";
                    } else {
                        item.note = val.trim();
                    }
                }

                if (type === "note" && val.trim() !== "(tambah catatan)") {
                    e.target.classList.remove("placeholder-note");
                }

                saveLocalScheduleChanges(program, data.dateDisplay, data.timeline);

                const resetBtn = document.getElementById("btn-reset-edit");
                if (resetBtn) resetBtn.style.display = "inline-flex";
            }
        }
    });

    container.addEventListener("focusin", (e) => {
        if (e.target.classList.contains("editable-field") && e.target.dataset.type === "note") {
            if (e.target.textContent.trim() === "(tambah catatan)") {
                e.target.textContent = "";
                e.target.classList.remove("placeholder-note");
            }
        }
    });

    container.addEventListener("focusout", (e) => {
        if (e.target.classList.contains("editable-field") && e.target.dataset.type === "note") {
            if (e.target.textContent.trim() === "") {
                e.target.textContent = "(tambah catatan)";
                e.target.classList.add("placeholder-note");

                const program = appState.currentProgramAcara;
                const dataList = scheduleData[program];
                if (!dataList || dataList.length === 0) return;

                let activeIndex = 0;
                if (program === "sabat" || program === "pa") {
                    activeIndex = findClosestUpcomingIndex(dataList);
                }
                const data = dataList[activeIndex];
                if (!data || !data.timeline) return;

                const itemIndex = parseInt(e.target.dataset.index);
                if (data.timeline[itemIndex]) {
                    data.timeline[itemIndex].note = "";
                    saveLocalScheduleChanges(program, data.dateDisplay, data.timeline);
                }
            }
        }
    });
}

// WhatsApp sharing text builders directly from Timeline state (enables editing capture)
function buildSabatWaFormatFromTimeline(timeline, dateDisplay) {
    let text = `*Sabat Shalom 🌿*

*Hari Sabat-Oh! Jadikanlah itu sebagai hari yang paling indah dan yang paling berbahagia dari hari-hari sepanjang minggu.*
Review and Herald. 14 April 1885. 

*Susunan Ibadah SABAT* 

*Sabat ke - .... TW - ....*
${dateDisplay}

*Dimulai Pukul : 09.00 WIB - 12.00 WIB*\n\n`;

    timeline.forEach(item => {
        if (item.isHeader) {
            if (item.title.includes("Informasi")) {
                text += `*I. INFORMASI UMUM*\n`;
            } else if (item.title.includes("Sekolah Sabat")) {
                text += `\n*II. IBADAH SEKOLAH SABAT*\n`;
            } else if (item.title.includes("Khotbah")) {
                text += `\n*III. IBADAH KHOTBAH*\n`;
            }
        } else {
            if (item.title.toLowerCase().includes("lagu pujian") && (!item.desc || item.desc.trim() === '' || item.desc.trim() === '-')) {
                return;
            }
            text += `● *${item.title}*\n${item.desc || '-'}\n`;
            if (item.note && item.note.trim() !== '' && item.note.trim() !== '-') {
                text += `_${item.note}_\n`;
            }
            text += `\n`;
        }
    });

    text += `__________________________

_Janganlah kita menjauhkan diri dari pertemuan-pertemuan ibadah kita, seperti dibiasakan oleh beberapa orang, tetapi marilah kita saling menasihati, dan semakin giat melakukannya menjelang hari Tuhan yang mendekat._
Ibrani 10 : 25`;

    return text;
}

function buildPaWaFormatFromTimeline(timeline, dateDisplay) {
    let text = `*Shalom KUPAS, berikut adalah :* 
*Susunan Partisipan Ibadah Pemuda Advent Tanggal ${dateDisplay}*\n\n`;

    timeline.forEach(item => {
        if (!item.isHeader) {
            text += `● *${item.title}* : \n${item.desc || '-'}\n`;
            if (item.note && item.note.trim() !== '' && item.note.trim() !== '-') {
                text += `_${item.note}_\n`;
            }
            text += `\n`;
        }
    });

    text += `*Selamat Melayani~*
*Tuhan Memberkati 😇🙏*`;

    return text;
}

function buildRabuWaFormatFromTimeline(timeline, dateDisplay) {
    let text = `GMAHK Sepanjang mengundang Anda untuk bergabung ke rapat Zoom yang terjadwal.

Topic: Ibadah Rabu Malam - GMAHK Sepanjang
*Waktu: ${dateDisplay}; Jam: 19:00 WIB (ontime)*

Join Zoom Meeting
https://us06web.zoom.us/j/82101187786?pwd=dJOh8nzgiWRMFTkMvxByhbSrbnMtiH.1

Meeting ID: 821 0118 7786
Passcode: sepanjang


🌟 *JADWAL PELAYANAN* 
⛪️ Konferens Jawa Kawasan Timur
🗓️ ${dateDisplay}
Pukul 19.00 WIB (Malam)

*Pelayan Ibadah:*\n`;

    timeline.forEach(item => {
        if (!item.isHeader) {
            text += `* _${item.title}: ${item.desc || '-'}_ \n`;
            if (item.note && item.note.trim() !== '' && item.note.trim() !== '-') {
                text += `  _(${item.note})_\n`;
            }
        }
    });

    text += `\n📖 "Dan apa saja yang kamu minta dalam doa dengan penuh kepercayaan, kamu akan menerimanya."
*— Matius 21:22*

✨ Selamat Melayani
🙏 Tuhan Memberkati`;

    return text;
}

/* ============================================================
   ADMIN SIDE & SUPABASE CRUD (TIPE 2)
   ============================================================ */

const DB_SCHEMAS = {
    pos: {
        title: "Tabel POS (Pianist, Operator, Soundman)",
        supabaseTable: "Tabel POS",
        columns: {
            'Tanggal': 'Tanggal',
            'Pianist': 'Pianist',
            'Operator': 'Operator',
            'Soundman': 'Soundman'
        }
    },
    ss: {
        title: "Tabel Sekolah Sabat",
        supabaseTable: "Tabel SS",
        columns: {
            'Tanggal': 'Tanggal',
            'MC': 'MC',
            'AyatIntiDoaBuka': 'Ayat Inti & Doa Buka',
            'BeritaMision': 'Berita Mision',
            'RingkasanSS': 'Ringkasan SS',
            'PelayananPerorangan': 'Pelayanan Perorangan'
        }
    },
    khotbah: {
        title: "Tabel Khotbah",
        supabaseTable: "Tabel Khotbah",
        columns: {
            'Tanggal': 'Tanggal',
            'Khotbah': 'Khotbah',
            'DoaSyafaat': 'Doa Syafaat',
            'BacaanPersembahan': 'Bacaan Persembahan',
            'PemimpinLagu': 'Pemimpin Lagu',
            'DiakenDiaken': 'Diaken-Diaken'
        }
    },
    pa: {
        title: "Tabel Pemuda Advent",
        supabaseTable: "Tabel PA",
        columns: {
            'Tanggal': 'Tanggal',
            'MC': 'MC & Janji PA',
            'AyatIntiDoaBuka': 'Ayat Inti & Doa Buka',
            'BAB': 'Belajar Alkitab Bersama (BAB)',
            'Games': 'Games',
            'TipsFunfact': 'Tips / Funfact',
            'AcaraInti': 'Acara Inti & Doa Tutup'
        }
    }
};

let currentAdminTab = 'pos';
let currentEditId = null;
let currentAdminTableData = [];
let currentSort = { col: 'Tanggal', asc: false };

// Auth State Listener
let currentAdminSession = null;

if (supabaseClient) {
    supabaseClient.auth.onAuthStateChange((event, session) => {
        currentAdminSession = session;
        const loginBtn = document.getElementById('adminLoginBtn');
        if (!loginBtn) return;

        if (session) {
            loginBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>
                <span>Dashboard Admin</span>
            `;
            loginBtn.onclick = openAdminDashboardView;
            loginBtn.classList.remove("btn-secondary-outline");
            loginBtn.classList.add("btn-primary");
        } else {
            loginBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span>Admin</span>
            `;
            loginBtn.onclick = openLoginModal;
            loginBtn.classList.remove("btn-primary");
            loginBtn.classList.add("btn-secondary-outline");
            closeAdminDashboardView();
        }
    });
}

function handleAdminButtonClick() {
    if (currentAdminSession) {
        openAdminDashboardView();
    } else {
        openLoginModal();
    }
}

function openLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) modal.classList.add('active');
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) modal.classList.remove('active');
}

async function handleLogin() {
    const email = document.getElementById('adminEmail').value.trim();
    const password = document.getElementById('adminPassword').value.trim();
    const btn = document.getElementById('loginSubmitBtn');

    if (!email || !password) {
        Swal.fire({ icon: 'warning', title: 'Perhatian', text: 'Email dan password wajib diisi.' });
        return;
    }

    btn.innerHTML = "Memuat...";
    btn.disabled = true;

    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) throw error;

        closeLoginModal();
        Swal.fire({
            icon: 'success',
            title: 'Login Berhasil',
            text: 'Selamat datang di Dashboard Admin Supabase.',
            timer: 1800,
            showConfirmButton: false
        });
        
        openAdminDashboardView();
    } catch (err) {
        Swal.fire({ icon: 'error', title: 'Gagal Login', text: err.message || 'Email atau password salah.' });
        console.error("Login Error:", err);
    } finally {
        btn.innerHTML = "Login Admin";
        btn.disabled = false;
    }
}

async function handleLogout() {
    Swal.fire({
        title: 'Logout Admin?',
        text: "Anda yakin ingin keluar dari sesi Admin Supabase?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#EF4444',
        cancelButtonColor: '#475569',
        confirmButtonText: 'Ya, Logout',
        cancelButtonText: 'Batal'
    }).then(async (result) => {
        if (result.isConfirmed) {
            closeAdminDashboardView();
            const { error } = await supabaseClient.auth.signOut();
            if (error) {
                console.error("Logout Error:", error);
                Swal.fire('Error', 'Gagal memproses logout.', 'error');
            } else {
                Swal.fire({ icon: 'success', title: 'Berhasil Logout', text: 'Sesi Admin telah diakhiri.', timer: 1500, showConfirmButton: false });
            }
        }
    });
}

function openAdminDashboardView(updateHash = true) {
    const appContainer = document.querySelector('.app-container');
    const appHeader = document.querySelector('.app-header');
    const bottomNav = document.querySelector('.bottom-nav');
    const mainContent = document.querySelector('.main-content');
    const adminDashboardView = document.getElementById('adminDashboardView');

    if (adminDashboardView) {
        document.body.classList.add('admin-mode-active');
        if (appContainer) appContainer.classList.add('admin-mode-active');
        if (appHeader) appHeader.style.display = 'none';
        if (bottomNav) bottomNav.style.display = 'none';
        if (mainContent) mainContent.style.display = 'none';
        adminDashboardView.style.display = 'block';

        switchAdminTab(currentAdminTab);

        if (updateHash && window.location.hash !== '#admin') {
            history.pushState({ tab: 'admin' }, '', '#admin');
        }
    }
}

function closeAdminDashboardView(updateHash = true) {
    const appContainer = document.querySelector('.app-container');
    const appHeader = document.querySelector('.app-header');
    const bottomNav = document.querySelector('.bottom-nav');
    const mainContent = document.querySelector('.main-content');
    const adminDashboardView = document.getElementById('adminDashboardView');

    if (adminDashboardView) {
        document.body.classList.remove('admin-mode-active');
        if (appContainer) appContainer.classList.remove('admin-mode-active');
        if (appHeader) appHeader.style.display = 'flex';
        if (bottomNav) bottomNav.style.display = 'flex';
        if (mainContent) mainContent.style.display = 'block';
        adminDashboardView.style.display = 'none';

        if (updateHash) {
            const targetTab = appState.currentTab || 'home';
            if (window.location.hash !== `#${targetTab}`) {
                history.pushState({ tab: targetTab }, '', `#${targetTab}`);
            }
        }
    }
}

function switchAdminTab(tabKey) {
    currentAdminTab = tabKey;
    const config = DB_SCHEMAS[tabKey];

    document.querySelectorAll('.admin-nav-item, .admin-tab-btn').forEach(btn => btn.classList.remove('active'));

    const btn = document.getElementById('btn-adm-' + tabKey);
    if (btn) btn.classList.add('active');

    const titleEl = document.getElementById('adminTableTitle');
    if (titleEl) titleEl.innerText = config.title;

    loadAdminTableData(config.supabaseTable);
}

async function loadAdminTableData(tableName) {
    const tbody = document.getElementById('adminTableBody');
    const thead = document.getElementById('adminTableHead');

    if (!tbody || !thead) return;

    tbody.innerHTML = `<tr><td colspan="10" style="text-align: center; padding: 20px;">Memuat data dari Supabase...</td></tr>`;
    thead.innerHTML = '';

    try {
        const { data, error } = await supabaseClient
            .from(tableName)
            .select('*')
            .order('Tanggal', { ascending: false })
            .limit(100);

        if (error) throw error;

        currentAdminTableData = data || [];
        currentSort = { col: 'Tanggal', asc: false };

        renderAdminTable();

    } catch (err) {
        console.error("Gagal memuat tabel admin:", err);
        tbody.innerHTML = `<tr><td colspan="10" style="text-align: center; color: #EF4444; padding: 20px;">Error: Gagal memuat data dari server. ${err.message}</td></tr>`;
    }
}

function sortAdminTable(colName) {
    if (currentSort.col === colName) {
        currentSort.asc = !currentSort.asc;
    } else {
        currentSort.col = colName;
        currentSort.asc = true;
    }

    currentAdminTableData.sort((a, b) => {
        let valA = a[colName];
        let valB = b[colName];

        if (valA === null || valA === undefined) valA = '';
        if (valB === null || valB === undefined) valB = '';

        if (!isNaN(valA) && !isNaN(valB) && valA !== '' && valB !== '') {
            valA = Number(valA);
            valB = Number(valB);
        } else {
            valA = valA.toString().toLowerCase();
            valB = valB.toString().toLowerCase();
        }

        if (valA < valB) return currentSort.asc ? -1 : 1;
        if (valA > valB) return currentSort.asc ? 1 : -1;
        return 0;
    });

    renderAdminTable();
}

function renderAdminTable() {
    const tbody = document.getElementById('adminTableBody');
    const thead = document.getElementById('adminTableHead');

    if (!tbody || !thead) return;

    if (currentAdminTableData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="10" style="text-align: center; padding: 20px;">Belum ada data tersedia di tabel ini.</td></tr>`;
        thead.innerHTML = '';
        return;
    }

    const config = DB_SCHEMAS[currentAdminTab];
    const columns = Object.keys(currentAdminTableData[0]).filter(col => col.toLowerCase() !== 'created_at' && col.toLowerCase() !== 'id');

    let headerHTML = '';
    columns.forEach(col => {
        let displayLabel = (config.columns && config.columns[col]) ? config.columns[col] : col;
        headerHTML += `<th style="cursor: pointer; user-select: none;" onclick="sortAdminTable('${col}')">${displayLabel}</th>`;
    });
    headerHTML += `<th>Aksi</th>`;
    thead.innerHTML = headerHTML;

    let bodyHTML = '';
    currentAdminTableData.forEach(row => {
        let rowHTML = `<tr>`;
        columns.forEach(col => {
            let cellData = row[col];
            if (cellData === null || cellData === undefined || cellData === "") cellData = '-';

            if (col.toLowerCase() === 'tanggal') {
                let formattedDate = cellData;
                if (typeof cellData === 'string') {
                    if (cellData.includes('T')) formattedDate = cellData.split('T')[0];
                    else if (cellData.includes(' ')) formattedDate = cellData.split(' ')[0];
                }
                rowHTML += `<td><span class="date-tag-badge">${formattedDate}</span></td>`;
            } else {
                if (typeof cellData === 'string' && cellData.length > 40) {
                    cellData = cellData.substring(0, 40) + '...';
                }
                rowHTML += `<td>${cellData}</td>`;
            }
        });

        const safeRowJson = JSON.stringify(row).replace(/'/g, "&apos;").replace(/"/g, "&quot;");

        rowHTML += `
            <td>
                <div style="display: flex; gap: 6px;">
                    <button class="btn btn-secondary" style="padding: 4px 10px; font-size: 0.72rem;" onclick="openFormModal('${safeRowJson}')">Edit</button>
                    <button class="btn btn-danger" style="padding: 4px 10px; font-size: 0.72rem;" onclick="deleteAdminTableData('${safeRowJson}')">Hapus</button>
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

    if (!modal) return;
    modal.classList.add('active');

    let rowData = null;
    currentEditId = null;

    const config = DB_SCHEMAS[currentAdminTab];

    if (rowDataStr) {
        rowData = JSON.parse(rowDataStr);
        currentEditId = rowData.Id || rowData.id;
        title.innerText = "Edit Jadwal Permanen - " + config.title;
    } else {
        title.innerText = "Tambah Jadwal Baru - " + config.title;
    }

    let schemaDbKeys = Object.keys(config.columns);

    let formHTML = '';
    schemaDbKeys.forEach(dbCol => {
        let label = config.columns[dbCol];
        let value = (rowData && rowData[dbCol]) ? rowData[dbCol] : '';
        let inputType = 'text';

        if (dbCol.toLowerCase().includes('tanggal')) {
            inputType = 'date';
            if (value && value.includes('T')) value = value.split('T')[0];
            else if (value && value.includes(' ')) value = value.split(' ')[0];
        }

        formHTML += `
            <div class="input-group" style="display: flex; flex-direction: column; gap: 4px;">
                <label style="font-size: 0.78rem; font-weight: 700;">${label}</label>
                <input type="${inputType}" id="dyn_${dbCol}" value="${value}" style="padding: 8px 12px; border: 1px solid var(--border-color); border-radius: 8px; font-family: inherit; font-size: 0.85rem; background-color: var(--bg-card); color: var(--text-main);">
            </div>
        `;
    });

    container.innerHTML = formHTML;
}

function closeFormModal() {
    const modal = document.getElementById('dataFormModal');
    if (modal) modal.classList.remove('active');
}

async function simpanDataTabel() {
    const btn = document.getElementById('saveDataBtn');
    btn.innerHTML = "Menyimpan ke Supabase...";
    btn.disabled = true;

    let payload = {};
    let isDateEmpty = false;
    const inputs = document.querySelectorAll('#dynamicFormContainer input');

    inputs.forEach(input => {
        const colName = input.id.replace('dyn_', '');
        payload[colName] = input.value;
        if (colName === 'Tanggal' && !input.value) isDateEmpty = true;
    });

    if (isDateEmpty) {
        Swal.fire({ icon: 'warning', title: 'Perhatian', text: 'Kolom Tanggal wajib diisi.' });
        btn.innerHTML = "Simpan Data Permanen";
        btn.disabled = false;
        return;
    }

    Object.keys(payload).forEach(k => {
        if (payload[k] === "") payload[k] = "-";
    });

    try {
        const config = DB_SCHEMAS[currentAdminTab];

        if (currentEditId) {
            let result = await supabaseClient
                .from(config.supabaseTable)
                .update(payload)
                .eq('Id', currentEditId);

            if (result.error && result.error.message.includes('does not exist')) {
                result = await supabaseClient
                    .from(config.supabaseTable)
                    .update(payload)
                    .eq('id', currentEditId);
            }

            if (result.error) throw result.error;
        } else {
            const { error } = await supabaseClient
                .from(config.supabaseTable)
                .insert([payload]);
            if (error) throw error;
        }

        Swal.fire({
            icon: 'success',
            title: 'Berhasil Disimpan!',
            text: 'Data jadwal telah diperbarui permanen di server Supabase.',
            timer: 1800,
            showConfirmButton: false
        });

        closeFormModal();
        loadAdminTableData(config.supabaseTable);

        // Auto-refresh main app view
        fetchDataFromSupabase();

    } catch (err) {
        console.error("Gagal simpan:", err);
        Swal.fire({ icon: 'error', title: 'Gagal', text: err.message || 'Gagal menyimpan ke database' });
    } finally {
        btn.innerHTML = "Simpan Data Permanen";
        btn.disabled = false;
    }
}

async function deleteAdminTableData(rowDataStr) {
    if (!rowDataStr) return;

    let rowData;
    try {
        rowData = JSON.parse(rowDataStr);
    } catch (e) {
        console.error("Gagal parse data baris:", e);
        return;
    }

    const rowId = rowData.Id || rowData.id;
    const config = DB_SCHEMAS[currentAdminTab];

    Swal.fire({
        title: 'Hapus Data Permanen?',
        text: "Apakah Anda yakin ingin menghapus data ini dari server Supabase?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#EF4444',
        cancelButtonColor: '#475569',
        confirmButtonText: 'Ya, Hapus!',
        cancelButtonText: 'Batal'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                let deleteResult = await supabaseClient
                    .from(config.supabaseTable)
                    .delete()
                    .eq('Id', rowId);

                if (deleteResult.error && deleteResult.error.message.includes('does not exist')) {
                    deleteResult = await supabaseClient
                        .from(config.supabaseTable)
                        .delete()
                        .eq('id', rowId);
                }

                if (deleteResult.error) throw deleteResult.error;

                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil Dihapus',
                    text: 'Data telah dihapus secara permanen.',
                    timer: 1500,
                    showConfirmButton: false
                });

                loadAdminTableData(config.supabaseTable);
                fetchDataFromSupabase();

            } catch (err) {
                console.error("Gagal hapus:", err);
                Swal.fire({ icon: 'error', title: 'Gagal Hapus', text: err.message || 'Gagal menghapus data' });
            }
        }
    });
}

// Inisialisasi Aplikasi saat DOM Siap
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
