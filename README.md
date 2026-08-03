# Susunan Ibadah GMAHK Sepanjang 🌿

Aplikasi web modern (*Single Page Application*) yang interaktif, elegan, dan responsif. Dirancang khusus untuk mempermudah pengelolaan, pengeditan langsung (*live inline edit*), serta generasi susunan ibadah dan jadwal petugas jemaat **GMAHK Sepanjang** yang siap disalin secara presisi ke WhatsApp dan media sosial.

**Versi App:** v2.0.2

---

## 🌟 Apa yang Baru di v2.0.2 🎉

- **☁️ Cloud Persistence Live Overrides (`Tabel Override Susunan`):** Perubahan susunan acara (judul lagu, pasal ayat, atau petugas) yang diubah oleh Admin melalui tombol **Edit** kini langsung tersimpan ke Cloud Database Supabase. Seluruh jemaat yang membuka website dapat langsung melihat susunan acara terupdate secara *real-time*.
- **🔒 Proteksi Keamanan Fitur Edit & Reset Khusus Admin:** Tombol **Edit** dan **Reset Data** hanya ditampilkan bagi Admin yang telah terautentikasi Supabase Auth, menjaga antarmuka jemaat publik tetap rapi dan aman dari perubahan tak disengaja.
- **🏛️ Redesain Kartu Profil & Pengurus Jemaat (Single-Column Layout):** Penataan ulang layout kartu Pengurus Jemaat menjadi 1 kolom penuh yang modern dengan foto profil berukuran lebih besar, efek *gradient blend overlay*, dan *fallback SVG/initials* di direktori `avatars/`.
- **📱 Formatting Salin WhatsApp Presisi (PA & Song Bolding):**
  - Susunan PA pada format salin WA kini tersusun *inline* / menyamping (`● *MC & Janji PA* : Sdra Ricky`).
  - Judul lagu AYS dan LSEL otomatis di-format *bold* di WhatsApp (contoh: `AYS No. 4: - *"Amazing Grace"*`).
  - Pembersihan field catatan tema pada item Firman Tuhan Ibadah Rabu Malam.

---

## 🌟 Fitur Utama v2.0.0

- **Pembaruan Total Antarmuka (UI/UX v2.0.0):** Desain visual berbasis *cards* yang mewah dengan navigasi Tab yang responsif (*Home*, *Susunan Acara*, *Jadwal Petugas*, dan *Persembahan*), mendukung tema Terang (*Light Mode*) dan Gelap (*Dark Mode*).
- **Mode Edit (Inline Editing):** Mengubah susunan acara secara langsung di atas kartu tanpa perlu membuka form rumit. Dilengkapi *placeholder* pintar seperti `(tambah judul)` dan `(tambah pasal ayat)` tanpa mengganggu pengetikan.
- **Pencarian & Autocomplete Lagu Otomatis (LSEL & AYS):** Fitur pencarian lagu 2 arah real-time. Mengetik judul lagu (misal *"Mari"*) atau nomor lagu akan langsung menampilkan daftar saran *dropdown* lagu secara otomatis.
- **Kalkulasi Otomatis Sabat ke-N & Triwulan (TW):** Perhitungan presisi jumlah hari Sabat dalam triwulan aktif (TW 1 – TW 4) yang terhitung otomatis sesuai tanggal ibadah dan melakukan *reset* otomatis di awal triwulan/tahun baru.
- **Penanggalan Dinamis Rabu Malam:** Sistem secara pintar menghitung dan menampilkan tanggal hari Rabu mendatang (`Rabu, X Agustus 2026`) secara dinamis meskipun data belum diisi di database.
- **Pembaruan Liturgi & Roster Petugas:**
  - **Sabat Raya:** Penyempurnaan alur ibadah khotbah, penambahan sub-field rujukan ayat pada *Pembacaan Ayat Bersahutan* & *Pembacaan Ayat Inti*, serta standarisasi istilah Bahasa Indonesia pada jadwal petugas.
  - **Pemuda Advent (PA):** Restrukturisasi 7 tahapan peribadatan PA yang sistematis.
  - **Rabu Malam:** Nilai default pintar untuk pelayan ibadah (*Lagu Pujian = Host*, *Pengumuman = Ketua Jemaat*).
- **Kartu Tautan Google Drive Interaktif:** Kartu akses langsung untuk mengunduh PDF Jadwal Pelayanan bulanan/triwulan di Google Drive dengan animasi *redirect*.

---

## 🔥 Fitur Unggulan

- ⚡ **Auto-Sync Supabase Database:** Sinkronisasi jadwal secara otomatis dan *real-time* dari database serverless Supabase.
- ☁️ **Cloud Database Live Sync:** Perubahan susunan acara tersimpan di cloud database sehingga dapat diakses secara sinkron oleh seluruh jemaat.
- 📱 **1-Click Salin Format WhatsApp:** Menghasilkan format pesan WhatsApp yang rapi, presisi, dan lengkap dengan detail Zoom/Ayat/Lagu hanya dengan satu kali klik.
- 🛠️ **Dashboard Admin Aman:** Panel administrasi terlindungi (*Supabase Auth & RLS*) untuk menambah, mengubah, menggeser tanggal minggu, atau menghapus jadwal ibadah.
- 🌐 **Desain Responsif & Tema Ganda:** Tampilan yang nyaman diakses dari smartphone, tablet, maupun desktop komputer.

---

## 📖 Cara Penggunaan

1. Buka situs [Susunan Ibadah GMAHK Sepanjang](https://meakhelg.github.io/Susunan-Ibadah-GMAHK-Sepanjang/).
2. Jadwal ibadah terdekat akan terisi secara otomatis dari database **Supabase**.
3. Bagi Admin yang telah login, gunakan tombol **Edit** jika ingin menyesuaikan lagu, judul khotbah, atau ayat untuk hari itu lalu klik **Selesai Edit** untuk menyimpan ke Cloud.
4. Klik **Salin Format WA**, lalu tempel (*Paste / Ctrl+V*) pada grup WhatsApp jemaat.

---

## 🛠 Hak Cipta
&copy; 2026 - **GMAHK Sepanjang**. All rights reserved.  
Developed with ❤️ by **Meakhel Gunawan**.

---

## 🚀 Roadmap (Rencana Pengembangan Fitur)

- [x] Susunan Ibadah Pemuda Advent (PA) - *Selesai di v1.1.0*
- [x] Susunan Ibadah Rabu Malam - *Selesai di v1.2.0*
- [x] Integrasi Serverless Database Supabase - *Selesai di v1.3.0*
- [x] Secured Admin Dashboard & Authentication - *Selesai di v1.4.0*
- [x] Smart Autocomplete & PA Seamless Automation - *Selesai di v1.5.0*
- [x] Secure Admin Deletion & Batch Schedule Shifting - *Selesai di v1.6.0*
- [x] Redesain Total UI, Profil Officers, Admin Security & Cloud Persistence Overrides - *Selesai di v2.0.0*
- [ ] Fitur Persembahan & Persepuluhan Online (*Sedang Dipersiapkan*)
- [ ] Susunan Jadwal Vesper / Buka Sabat