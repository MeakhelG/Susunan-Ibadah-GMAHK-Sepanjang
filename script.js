// Variabel dan Setup
const form = document.getElementById('generatorForm');
const inputs = form.querySelectorAll('input, select');
const previewText = document.getElementById('previewText');

// Daftar Bulan dalam Bahasa Indonesia
const namaBulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

// Helper untuk format Tanggal
function formatTanggalString(dateString) {
    if (!dateString) return "[Pilih Tanggal]";
    const dateObj = new Date(dateString);
    if (isNaN(dateObj)) return "[Pilih Tanggal]";

    const tg = String(dateObj.getDate()).padStart(2, '0');
    const bln = namaBulan[dateObj.getMonth()];
    const thn = dateObj.getFullYear();

    return `${tg}  -  ${bln}  -  ${thn}`;
}

// Helper untuk mengambil value input biasa
function gV(id) {
    const val = document.getElementById(id).value.trim();
    // Kalau kosong, gunakan "..." atau biarkan kosong, tapi karena template WhatsApp baiknya pakai placeholder titik-titik
    return val ? val : "......................";
}

// Fungsi utama generator teks
function updatePreview() {
    // Info Umum
    const tglRaw = document.getElementById('tanggal').value;
    const tglStr = formatTanggalString(tglRaw);
    
    // Tweak untuk Sabat Ke dan TW supaya pakai titik-titik terpisah dari gV standar
    const sabatKeRaw = document.getElementById('sabatKe').value.trim();
    const sabatKe = sabatKeRaw ? sabatKeRaw : "....";
    const twRaw = document.getElementById('tw').value.trim();
    const tw = twRaw ? twRaw : "....";
    
    const waktuMulai = gV('waktuMulai');
    const waktuSelesai = gV('waktuSelesai');

    // Jenis Sabat (Opsional)
    const jenisSabatInput = document.getElementById('jenisSabat').value.trim();
    const typeSabatString = jenisSabatInput !== "" ? ` ${jenisSabatInput.toUpperCase()}` : "";

    // Default Template Building
    const hasil = `*Sabat Shalom 🌿*

*Hari Sabat-Oh! Jadikanlah itu sebagai hari yang paling indah dan yang paling berbahagia dari hari-hari sepanjang minggu.*
Review and Herald. 14 April 1885. 


*Susunan Ibadah  SABAT${typeSabatString}* 


*Sabat ke - ${sabatKe}   TW  - ${tw}*
${tglStr}

*Dimulai  Pukul  : ${waktuMulai} WIB - ${waktuSelesai} WIB*


*IBADAH   SEKOLAH SABAT* 

● *Operator*
${gV('ssOperator')} 

● *Pianist*
${gV('ssPianist')} 

● *MC  +  Yel Yel  SS*
${gV('ssMc')}
    
                            
● *Lagu   Buka*
LSEL   No. ${gV('ssLaguBukaNo')}   :                
*"${gV('ssLaguBukaJudul')}"*                                  
                                                                                        
    
● *Ayat   Inti  SS  dan  Doa Buka*
${gV('ssAyatDoa')}


 ● *Bacaan   Berita Mission*  
${gV('ssMission')}
    
                                                                              
● *Ringkasan   Sekolah Sabat   Dewasa*
${gV('ssRingkasan')}


● *Promosi   Pelayanan Perorangan*
${gV('ssPromosi')}

                                       
● *Lagu   Tutup* 
LSEL No. ${gV('ssLaguTutupNo')}   :             
*"${gV('ssLaguTutupJudul')}"*                                                                                  

                                                                         
● *Doa   Tutup*
${gV('ssDoaTutup')}


● *PENGUMUMAN*
${document.getElementById('pengumuman').value || "Officers/Tua-Tua Jemaat"}
 
 
                      
*IBADAH KHOTBAH*



● *Cerita  Alkitab Anak*
${gV('khCerita')} 


 ● *Diakon / nes*                                                    
1. ${gV('khDiakon1')}                              
2. ${gV('khDiakon2')} 


● *Pemimpin   Lagu*
${gV('khPemimpinLagu')}


● *Lagu   Pengiring Partisipan  Masuk Mimbar Atas* 
LSEL No. 515  :
*"Tuhan Ada Dalam Bait Allah"*


● *Lagu   Pembuka*
LSEL No. 1 :
*"Di Hadapan Hadirat-Mu"*


● *Doa   Buka*
${gV('khDoaBuka')}


● *Ayat   Bersahutan*
${gV('khAyatBersahutanNama')}
*${gV('khAyatBersahutanRef')}*


● *Lagu Buka* 
LSEL No  ${gV('khLaguBukaNo')}  :                                                                                                                                                                          
*"${gV('khLaguBukaJudul')}"*


● *Lagu  Pengantar  Doa Syafaat* 
LSEL No. ${gV('khLaguPengantarNo')}
*"${gV('khLaguPengantarJudul')}"*


● *Doa   Syafaat*
${gV('khDoaSyafaat')}


● *Lagu  Sambutan  Doa Syafaat* 
LSEL No. ${gV('khLaguSambutanNo')} 
*"${gV('khLaguSambutanJudul')}"*


● *Bacaan  Persembahan &  Persepuluhan*
${gV('khBacaanPersembahan')}


● *Lagu   Persembahan*
LSEL No. ${gV('khLaguPersDNo')}      
*“${gV('khLaguPersDJudul')}”*


● *Lagu   Sambutan Persembahan*       
LSEL No. ${gV('khLaguSambutanPersNo')} 
*"${gV('khLaguSambutanPersJudul')}"* 


● *Doa   Persembahan*
${gV('khDoaPersembahan')}


● *Lagu  Pujian*
${gV('khLaguPujian')}
      
                                                              
● *Ayat Inti*
${gV('khAyatIntiNama')} 
*${gV('khAyatIntiRef')}*


● *Lagu Tema* 
*"MISI  KITA"*


● *PENGKHOTBAH*
${gV('khPengkhotbahNama')}
*"${gV('khPengkhotbahJudul')}"*


● *Lagu  Tutup*
LSEL  No  ${gV('khLaguTutupNo')}   :                                                                                                                                       
*"${gV('khLaguTutupJudul')}"*


● *Doa TUTUP   dan Doa BERKAT*
${gV('khDoaBerkat')}


__________________________


_Janganlah kita menjauhkan diri dari pertemuan-pertemuan ibadah kita, seperti dibiasakan oleh beberapa orang, tetapi marilah kita saling menasihati, dan semakin giat melakukannya menjelang hari Tuhan yang mendekat._
Ibrani 10 : 25`;

    previewText.textContent = hasil;
}

// Tambahkan event listener untuk memanggil updatePreview tiap ada perubahan ketikan
inputs.forEach(input => {
    input.addEventListener('input', updatePreview);
    input.addEventListener('change', updatePreview); // khusus untuk date picker / select
});

// Panggil sekali saat dimuat untuk inisiasi
updatePreview();

// Menangani eksklusivitas dropdown (seseorang tak bisa bertugas ganda di 3 fungsi ini)
function handleSelectExclusivity() {
    const selects = [
        document.getElementById('ssOperator'),
        document.getElementById('ssPianist'),
        document.getElementById('khPemimpinLagu')
    ].filter(Boolean);
    
    // Ambil list nilai yang sedang terpilih yang tidak kosong
    const selectedValues = selects.map(s => s.value).filter(v => v !== "");
    
    selects.forEach(selectBox => {
        const currentValue = selectBox.value;
        Array.from(selectBox.options).forEach(option => {
            if(option.value === "") return;
            
            // disable option ini jika orangnya sudah dipilih di dropdown lain
            if(selectedValues.includes(option.value) && option.value !== currentValue) {
                option.disabled = true;
                option.textContent = option.value + " (Sudah Terpilih)"; // opsional: beri keterangan
            } else {
                option.disabled = false;
                option.textContent = option.value; // kembalikan text aslinya
            }
        });
    });
}

// Tambahkan trigger saat diganti
document.querySelectorAll('.exclusive-select').forEach(sel => {
    sel.addEventListener('change', handleSelectExclusivity);
});
// inisiasi jalankan sekali saat mulai
handleSelectExclusivity();

// Fungsi Copy to Clipboard
function copyToClipboard() {
    const teksToCopy = previewText.textContent;

    navigator.clipboard.writeText(teksToCopy).then(() => {
        const btnTop = document.getElementById('copyBtnTop');
        const btnBot = document.getElementById('copyBtnBottom');

        // Animasi Top
        if(btnTop) {
            const defaultText = btnTop.innerHTML;
            btnTop.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Berhasil Disalin!`;
            btnTop.classList.add('copy-anim');
            setTimeout(() => {
                btnTop.innerHTML = defaultText;
                btnTop.classList.remove('copy-anim');
            }, 2000);
        }

        // Animasi Bottom (Icon Only)
        if(btnBot) {
            const defaultBot = btnBot.innerHTML;
            btnBot.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
            btnBot.classList.add('copy-anim');
            setTimeout(() => {
                btnBot.innerHTML = defaultBot;
                btnBot.classList.remove('copy-anim');
            }, 2000);
        }
        
    }).catch(err => {
        console.error('Gagal menyalin teks:', err);
        alert('Gagal menyalin teks ke clipboard.');
    });
}

// === Theme Switcher Logic ===
const themeToggleBtn = document.getElementById('themeToggleBtn');
const body = document.body;

function toggleTheme() {
    body.classList.toggle('light-theme');
    const isLight = body.classList.contains('light-theme');

    // Simpan pilihan ke localStorage
    localStorage.setItem('theme', isLight ? 'light' : 'dark');

    // Ubah ikon
    themeToggleBtn.innerHTML = isLight ? '🌙' : '☀️';
}

// Cek tema yang tersimpan di localStorage saat dibuka
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-theme');
    themeToggleBtn.innerHTML = '🌙';
} else {
    // Default system adalah dark
    themeToggleBtn.innerHTML = '☀️';
}
