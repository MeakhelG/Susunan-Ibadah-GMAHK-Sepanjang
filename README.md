# Generator Susunan Ibadah GMAHK Sepanjang 🌿

Aplikasi berbasis web (*Single Page Application*) yang elegan, interaktif, dan responsif. Digunakan untuk menghasilkan (*men-generate*) susunan acara ibadah secara cepat dan seragam, lalu menyalin format akhirnya secara otomatis ke *Clipboard* agar siap di-*Paste* ke aplikasi WhatsApp / Media Sosial Jemaat.

**Versi App:** v1.3.0

## Apa yang baru di v1.3.0 🎉
- **Integrasi Database Serverless (Supabase):** Kini ditenagai oleh database *real-time*. Saat aplikasi dibuka, sistem akan otomatis mendeteksi Sabat terdekat dan langsung melakukan *Auto-Fill* (mengisi formulir) berdasarkan tabel jadwal (POS, Khotbah, SS) dari database, memotong waktu input manual hingga 90%!
- **Smart Date & Quarter Detection:** Mesin menghitung secara otomatis angka "Sabat Ke" dan "Triwulan" dengan akurasi tinggi ala kalender GMAHK (kelipatan penomoran 1-13/14 bersifat kumulatif murni per Triwulan).
- **Fuzzy Name Matching & Auto Sync:** Pembenahan logika UI untuk sinkronisasi tugas. Terlepas dari perbedaan ketikan "Sdr Meakhel" vs "Sdra. Meakhel", sistem eksklusivitas akan menangkapnya sebagai individu yang sama. Atribusi antar korelasi (Pengkhotbah ➔ Doa Buka) juga dikerjakan 100% transparan secara otomatis.
- **Clean Code & Dokumentasi Menyeluruh:** Perombakan ulang *source code* (HTML, CSS, JS) dengan standar penulisan modular. Dibekali tata letak fungsional *Daftar Isi* (TOC) di tiap *file* untuk memanjakan *developer* lokal dalam melakukan kustomisasi lanjutan di kemudian hari.

## Fitur Inti
- **Integrasi Ekosistem Multi-Tab:** Form Ibadah dipecah dalam tab-tab fungsional (Sabat Raya, Pemuda Advent, Rabu Malam) tanpa proses *reload* antarklik.
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
- [ ] Susunan Jadwal Vesper / Buka Sabat

*Note: Mengingat fondasi database solid berteknologi pintar sudah diletakkan, ekspansi otomatisasi untuk jadwal-jadwal baru di gereja kini adalah hal yang sangat mudah direalisasikan!*