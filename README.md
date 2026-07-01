# Generator Susunan Ibadah GMAHK Sepanjang 🌿

Aplikasi berbasis web (*Single Page Application*) yang elegan, interaktif, dan responsif. Digunakan untuk menghasilkan (*men-generate*) susunan acara ibadah secara cepat dan seragam, lalu menyalin format akhirnya secara otomatis ke *Clipboard* agar siap di-*Paste* ke aplikasi WhatsApp / Media Sosial Jemaat.

**Versi App:** v1.6.1

## Apa yang baru di v1.6.1 🎉
- **Pembaruan Link & ID Zoom:** Memperbarui tautan, Meeting ID, dan Passcode untuk Ibadah Rabu Malam menggunakan kredensial Zoom terbaru.

## Fitur Inti
- **Dashboard Admin & Manajemen Jadwal:** Panel aman berbasis *Supabase Auth & RLS* untuk mengelola jadwal Sabat Raya dan PA. Dilengkapi fitur hapus data (konfirmasi *SweetAlert2*) serta tombol penggeser tanggal ("Majukan/Mundurkan 1 Minggu").
- **Auto-Fill & Integrasi Database:** Pengisian otomatis (*Auto-Fill*) jadwal terdekat dari database *real-time* Supabase (termasuk petugas *Soundman*) serta fitur autocomplete pencarian judul lagu Sion (LSEL) dan lagu PA (AYS).
- **Multi-Tab & Rapat Virtual:** Pemisahan form ibadah (Sabat Raya, Pemuda Advent, dan Rabu Malam) secara mulus tanpa *reload*, serta pembuatan otomatis undangan rapat Zoom dengan tautan, ID, dan passcode terbaru.
- **Logika Validasi & Deteksi Otomatis Pintar:** Kalkulasi otomatis untuk penentuan angka "Sabat Ke" dan "Triwulan", penempatan otomatis lagu sambutan tetap setelah Doa Tutup, serta pengisian otomatis nama pendeta default pada doa syafaat Rabu Malam.
- **Pratinjau Langsung & 1-Click Copy WA:** Teks WhatsApp pratinjau diperbarui secara langsung (*real-time*) saat mengetik dan dapat disalin ke *clipboard* dalam sekali klik.
- **Desain Modern, Responsif, & Estetis:** Antarmuka berwarna *Maroon* elegan dengan dukungan *Dark/Light mode*, serta tampilan tabel full-screen yang responsif menyesuaikan visual laptop, tablet, maupun ponsel.
- **Kode Sumber Bersih & Rapi:** Struktur HTML, CSS, dan JavaScript yang terorganisir dengan kelas utilitas terstandarisasi, dokumentasi logika yang mendetail, serta komentar kode yang rapi.

## Cara Penggunaan
1. Buka Tautan [Susunan Ibadah GMAHK Sepanjang](https://meakhelg.github.io/Susunan-Ibadah-GMAHK-Sepanjang/)
2. Tunggu 1 hingga 2 detik untuk inisialisasi Database Data Serverless **Supabase**. *Voila!* Anda akan mendapati jadwal otomatis tertarik ke form-form kosong Anda.
3. Ketik dan poles sedikit kekosongan sisa yang belum terakomodasi di sistem untuk melengkapi alur peribadatan hari itu.
4. Klik tombol "Salin ke Clipboard", buka Whatsapp jemaat, dan tekan CTRL+V (*Paste*). 

---

## 🛠 Hak Cipta
&copy; 2026 - Semua Hak Cipta Dilindungi (All rights reserved).


## 🚀 Roadmap (Rencana Fitur Mendatang)
Aplikasi ini direncanakan akan terus berekspansi ke depannya untuk menampung seluruh alur peribadatan jemaat:
- [x] Susunan Ibadah PA (Pemuda Advent) - *Selesai di v1.1.0*
- [x] Susunan Ibadah Rabu Malam - *Selesai di v1.2.0*
- [x] Transformasi Serverless via Integrasi Supabase - *Selesai di v1.3.0*
- [x] Secured Admin Dashboard & Authentication - *Selesai di v1.4.0*
- [ ] Susunan Jadwal Vesper / Buka Sabat

*Note: Mengingat fondasi database solid berteknologi pintar sudah diletakkan, ekspansi otomatisasi untuk jadwal-jadwal baru di gereja kini adalah hal yang sangat mudah direalisasikan!*