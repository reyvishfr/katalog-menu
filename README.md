# Katalog Menu — Kedai Bakar & Seduh 🍞☕

Aplikasi web interaktif katalog menu makanan, minuman, dan camilan untuk **Kedai Bakar & Seduh**. Dibuat menggunakan **React + Vite (JavaScript & JSX)** sebagai tugas mata kuliah *Component-Based UI Development*.

## Identitas Mahasiswa
- **Nama:** Reyvianti Shafira
- **NIM:** 1247050021
- **Program Studi:** Teknik Informatika, UIN Sunan Gunung Djati Bandung

## Fitur Utama
1. **Cari Menu:** Pencarian menu berdasarkan nama secara langsung (*case-insensitive*).
2. **Filter Kategori:** Penyaringan menu berdasarkan kategori (`Semua`, `Makanan`, `Minuman`, `Snack`).
3. **Urutkan Harga:** Pengurutan daftar menu berdasarkan urutan `Default`, harga `Termurah`, atau harga `Termahal`.
4. **Favorit:** Menandai atau menghapus menu favorit (`❤️` / `🤍`) dengan penghitung jumlah menu disukai.
5. **Detail Menu:** Menampilkan atau menyembunyikan informasi lengkap menu (hanya satu detail yang terbuka dalam satu waktu).
6. **Keranjang Pesanan:** Menambahkan menu tersedia ke keranjang, mengubah jumlah porsi (`+` / `-`), menghapus item, dan menghitung subtotal serta total harga secara otomatis.

## Cara Menjalankan di Lokal

1. Masuk ke folder proyek:
   ```bash
   cd katalog-menu
   ```
2. Install seluruh dependensi:
   ```bash
   npm install
   ```
3. Jalankan server pengembangan (*development server*):
   ```bash
   npm run dev
   ```
4. Buka URL lokal yang tampil di terminal (misalnya `http://localhost:5173`) melalui browser.

## Langkah Publikasi ke Website Pribadi

Proyek ini telah dikonfigurasi dengan `base: './'` pada `vite.config.js` sehingga aset hasil build menggunakan path relatif dan dapat berjalan di dalam subfolder (*subpath*) website pribadi.

1. Jalankan perintah build produksi:
   ```bash
   npm run build
   ```
2. Perintah di atas akan menghasilkan folder `dist/` yang berisi file `index.html` dan folder `assets/`.
3. Upload seluruh isi di dalam folder `dist/` ke subfolder pada repositori atau hosting website pribadi (misalnya ke folder `/katalog-menu/`).
4. Tambahkan tautan (link) menuju subfolder aplikasi tersebut (contoh: `https://domain-kamu.com/katalog-menu/`) pada halaman utama website pribadi.
