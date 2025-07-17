![Logo](/public/logo.png)
<img src="/logo.png" width="400" alt="Laravel Logo"

## Personal Task Manager App

---

### 1. Pendahuluan

**Personal Task Manager** adalah aplikasi web modern yang dirancang untuk membantu pengguna mengelola tugas-tugas harian mereka secara efisien.

Aplikasi ini sepenuhnya berjalan di sisi klien (_client-side_), tanpa memerlukan backend atau database eksternal. Semua data pengguna dan tugas disimpan secara lokal di browser menggunakan `localStorage`, memastikan persistensi data bahkan setelah halaman di-refresh.

#### Teknologi yang Digunakan

- **Framework:** Next.js 15+ (App Router)
- **Bahasa:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Hooks (`useState`, `useEffect`, `useContext`, `useMemo`) & URL State (`useSearchParams`)
- **Linting & Formatting:** ESLint & Prettier

---

### 2. Fitur Utama

##### a. Autentikasi Pengguna

- **Login Statis:** Sistem login tanpa registrasi dengan kredensial yang ditentukan secara statis (`username: user`, `password: password123`).
- **Sesi Persisten:** Pengguna tetap terautentikasi setelah me-refresh halaman. Status login disimpan di `localStorage` dan hanya akan berakhir jika pengguna melakukan logout secara manual.
- **Route Protection:** Semua halaman (kecuali halaman Login) terlindungi dan tidak dapat diakses sebelum pengguna berhasil login.

##### b. CRUD (Create, Read, Update, Delete)

- **Create:** Pengguna dapat menambahkan tugas baru melalui sebuah form modal yang interaktif.
- **Read:** Menampilkan semua tugas dalam bentuk daftar kartu.
- **Update:** Pengguna dapat mengedit judul dan deskripsi tugas yang sudah ada, serta menandai tugas sebagai "selesai" atau "belum selesai".
- **Delete:** Pengguna dapat menghapus tugas dari daftar dengan konfirmasi untuk mencegah kesalahan.

##### c. Pencarian dan Paginasi

- **Pencarian Real-time:** Fitur pencarian untuk memfilter tugas berdasarkan judul atau deskripsi.
- **Paginasi Kustom:** Navigasi halaman untuk mengelola daftar tugas yang panjang, dibangun murni tanpa library pihak ketiga.
- **State Persisten via URL:** Status pencarian dan halaman saat ini disimpan dalam _query string_ URL (misal: `?q=Project&page=2`). Ini memastikan bahwa saat halaman di-refresh, pengguna tetap berada pada kondisi filter dan halaman yang sama.

##### d. Manajemen Profil Pengguna (Upcoming)

- Sebuah halaman profil khusus di mana pengguna dapat mengedit nama lengkap mereka.
- Perubahan nama akan secara otomatis dan instan diperbarui pada Navbar tanpa perlu me-refresh halaman, berkat sistem event kustom.

##### e. Tema Dark / Light Mode (Upcoming)

- **Tiga Pilihan Tema:** Pengguna dapat memilih antara mode Terang (Light), Gelap (Dark), atau mengikuti pengaturan Sistem Operasi (System).
- **Deteksi Otomatis:** Aplikasi secara otomatis beradaptasi dengan perubahan tema di level OS jika opsi "System" dipilih.
- **Preferensi Tersimpan:** Pilihan tema pengguna disimpan di `localStorage` untuk sesi berikutnya.

---

### 3. Panduan Instalasi dan Menjalankan Proyek

Untuk menjalankan proyek ini secara lokal, ikuti langkah-langkah berikut:

1.  **Clone Repository**

    ```bash
    git clone https://github.com/feryndka/personal-task-manager.git
    cd personal-task-manager
    ```

2.  **Instalasi Dependensi**
    Pastikan Anda memiliki Node.js (v18 atau lebih baru) dan npm terinstal.

    ```bash
    npm install
    ```

3.  **Menjalankan Server Development**

    ```bash
    npm run dev
    ```

4.  **Buka Aplikasi**
    Buka browser dan navigasikan ke `http://localhost:3000`.
