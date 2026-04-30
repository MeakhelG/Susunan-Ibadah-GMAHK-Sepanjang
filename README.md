# Generator Susunan Ibadah GMAHK Sepanjang 🌿

Aplikasi berbasis web (*Single Page Application*) yang elegan, interaktif, dan responsif. Digunakan untuk menghasilkan (*men-generate*) susunan acara ibadah secara cepat dan seragam, lalu menyalin format akhirnya secara otomatis ke *Clipboard* agar siap di-*Paste* ke aplikasi WhatsApp / Media Sosial Jemaat.

**Versi App:** v1.5.2

## Apa yang baru di v1.5.2 🎉
- **Perbaikan Format Spasi:** Menghilangkan *bug* spasi ganda yang muncul pada *output* tanggal di template Rabu Malam.
- **Pembaruan Tautan Zoom:** Mengganti tautan (*link*) dan ID Rapat Zoom untuk ibadah Rabu Malam dengan informasi ruangan virtual terbaru.
- **Refactoring & Pembaruan Dokumentasi:** Melakukan *clean-up* pada baris kode HTML, menyusun ulang hierarki file CSS dengan pengenalan class utilitas `.btn-success`, serta memperbarui *header* Daftar Isi di `script.js` menjadi lebih mendetail (kini mencakup penjelasan hingga 13 *section* logika aplikasi).

## Fitur Inti
- **Dashboard Admin Aman & Interaktif:** Panel manajemen data di dalam aplikasi untuk mempermudah edit data, dilindungi oleh autentikasi login terenkripsi berbasis ekosistem *Supabase Auth & Row Level Security* (RLS), serta ditenagai interaksi pop-up mulus dari *SweetAlert2*. Tabel PA dan Sabat Raya terintegrasi penuh ke dalam *Manager* Dasbor.
- **Integrasi Ekosistem Multi-Tab:** Form Ibadah dipecah dalam tab-tab fungsional (Sabat Raya, Pemuda Advent, Rabu Malam) tanpa proses *reload* antarklik.
- **Integrasi Database Serverless (Supabase):** Ditenagai database *real-time* dengan fitur *Auto-Fill* cerdas. Jadwal Sabat (termasuk kelengkapan petugas *Soundman*) dan Jadwal PA terdekat akan terisi secara otomatis, memotong waktu input manual hingga 90%.
- **Smart Song Autocomplete (LSEL & AYS):** Pencarian judul lagu Sion (LSEL) dan lagu Pemuda Advent (AYS) yang cerdas dan cepat dari *database* (cukup ketik 3 huruf), lengkap dengan *dropdown list* rekomendasi interaktif dan otomatisasi sinkronisasi ke nomor nyanyian.
- **Smart Date & Quarter Detection:** Kalkulasi otomatis untuk angka "Sabat Ke" dan rentang "Triwulan" berakurasi tinggi sesuai kalender berjalan.
- **Fuzzy Name Matching & Auto Sync:** Sinkronisasi cerdas antar-tugas. Mencegah redudansi penulisan nama yang berbeda (contoh: "Sdr" vs "Sdra.") dan mengunci jabatan eksklusif ganda secara transparan.
- **Live Preview & 1-Click Copy WA:** Teks *WhatsApp* pratinjau seketika terbangun bersamaan dengan input ketikan, siap disalin dalam sekali klik (dilengkapi notifikasi aksi).
- **Tema Bebas Distraksi & Responsif:** Hadir dalam balutan estetika UI modern berwarna *Maroon* elegan (mendukung *Dark/Light mode* permanen dengan palet *muted* yang nyaman di mata) yang otomatis bertransformasi padat menyesuaikan peranti genggam Anda.

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