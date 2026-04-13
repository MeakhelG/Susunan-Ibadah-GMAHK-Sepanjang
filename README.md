# Generator Susunan Ibadah GMAHK Sepanjang 🌿

Aplikasi berbasis web (*Single Page Application*) yang elegan, interaktif, dan responsif. Digunakan untuk menghasilkan (*men-generate*) susunan acara ibadah secara cepat dan seragam, lalu menyalin format akhirnya secara otomatis ke *Clipboard* agar siap di-*Paste* ke aplikasi WhatsApp / Media Sosial Jemaat.

**Versi App:** v1.4.0

## Apa yang baru di v1.4.0 🎉
- **Sistem Autentikasi & Dashboard Admin:** Telah ditambahkan panel khusus Admin yang dilindungi sistem *Login* berbasis Supabase Auth. Memungkinkan petugas gereja untuk mengelola jadwal (Tambah/Edit data) langsung dari dalam aplikasi web tanpa harus mengakses *dashboard* eksternal.
- **Implementasi Row Level Security (RLS):** Ekosistem database telah diamankan berlapis dengan RLS Supabase. Hanya Admin (*Authenticated*) yang dapat memodifikasi basis data; sementara pengguna umum (*Public*) menerima akses mode baca (*Read-only*).
- **Interaksi Pop-up Elegan:** Terintegrasi dengan pustaka modern *SweetAlert2* untuk menampilkan interaksi konfirmasi (sukses, peringatan error, atau respon *logout*) secara mulus, premium, dan 100% responsif terhadap adaptasi warna *Dark/Light mode* aplikasi.

## Fitur Inti
- **Integrasi Ekosistem Multi-Tab:** Form Ibadah dipecah dalam tab-tab fungsional (Sabat Raya, Pemuda Advent, Rabu Malam) tanpa proses *reload* antarklik.
- **Integrasi Database Serverless (Supabase):** Ditenagai database *real-time* dengan fitur *Auto-Fill* jadwal terdekat, memotong waktu input manual hingga 90%.
- **Smart Date & Quarter Detection:** Kalkulasi otomatis untuk angka "Sabat Ke" dan rentang "Triwulan" berakurasi tinggi sesuai kalender berjalan.
- **Fuzzy Name Matching & Auto Sync:** Sinkronisasi cerdas antar-tugas. Mencegah redudansi penulisan nama yang berbeda (contoh: "Sdr" vs "Sdra.") dan mengunci jabatan eksklusif ganda secara transparan.
- **Live Preview Teks WA:** Teks di *panel* pratinjau seketika terbangun (merakit cetak tebal dan miring ala WhatsApp) bersamaan dengan input ketikan yang mempermudah monitor langsung susunan WA-nya.
- **Dark/Light Mode:** Preferensi visual disajikan dalam tema estetika UI Modern, yang *state* simpanannya tak akan hilang meski layar ter-tutup/ter-refresh.
- **Responsivitas Padat Layar:** Tata letak grid otomatis ditransformasi jika jendela diakses menggunakan platform sentuh (*mobile-friendly*).
- **1-Click Copy Data:** Salin susunan ke *clipboard* perangkat dalam sekejap dibekali notifikasi visual animasi.

## Cara Penggunaan
1. Buka Tautan [Susunan Ibadah GMAHK Sepanjang](https://meakhelg.github.io/Susunan-Ibadah-GMAHK-Sepanjang/)
2. Tunggu 1 hingga 2 detik untuk inisialisasi Database Data Serverless **Supabase**. *Voila!* Anda akan mendapati jadwal otomatis tertarik ke form-form kosong Anda.
3. Ketik dan poles sedikit kekosongan sisa yang belum terakomodasi di sistem untuk melengkapi alur peribadatan hari itu.
4. Klik tombol "Salin ke Clipboard", buka Whatsapp jemaat, dan tekan CTRL+V (*Paste*). 

---

## 🛠 Dikembangkan Oleh
**Meakhel Gunawan**  
&copy; 2026 - Semua Hak Cipta Dilindungi (All rights reserved).


## 🚀 Roadmap (Rencana Fitur Mendatang)
Aplikasi ini direncanakan akan terus berekspansi ke depannya untuk menampung seluruh alur peribadatan jemaat:
- [x] Susunan Ibadah PA (Pemuda Advent) - *Selesai di v1.1.0*
- [x] Susunan Ibadah Rabu Malam - *Selesai di v1.2.0*
- [x] Transformasi Serverless via Integrasi Supabase - *Selesai di v1.3.0*
- [x] Secured Admin Dashboard & Authentication - *Selesai di v1.4.0*
- [ ] Susunan Jadwal Vesper / Buka Sabat

*Note: Mengingat fondasi database solid berteknologi pintar sudah diletakkan, ekspansi otomatisasi untuk jadwal-jadwal baru di gereja kini adalah hal yang sangat mudah direalisasikan!*