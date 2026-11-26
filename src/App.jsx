import { useState } from 'react'
import { formatRupiah, menuItems } from './data/menu.js'
import Navbar from './components/Navbar.jsx'
import SearchFilter from './components/SearchFilter.jsx'
import MenuList from './components/MenuList.jsx'
import Cart from './components/Cart.jsx'
import Footer from './components/Footer.jsx'

function App() {
  // state: 6 state utama aplikasi disimpan di App.jsx menggunakan useState
  const [halamanAktif, setHalamanAktif] = useState('beranda') // 'beranda' | 'menu' | 'keranjang'
  const [keyword, setKeyword] = useState('')
  const [kategoriAktif, setKategoriAktif] = useState('Semua')
  const [urutan, setUrutan] = useState('default')
  const [favorit, setFavorit] = useState([])
  const [keranjang, setKeranjang] = useState([])
  const [detailTerbuka, setDetailTerbuka] = useState(null)
  const [toastPesan, setToastPesan] = useState('')

  // event handling: tambah/hapus id menu dari daftar favorit
  function handleToggleFavorit(idMenu) {
    if (favorit.includes(idMenu)) {
      setFavorit(favorit.filter((id) => id !== idMenu))
    } else {
      setFavorit([...favorit, idMenu])
    }
  }

  // event handling: tambah menu ke keranjang (jika sudah ada, jumlah +1; menu habis tidak bisa ditambah)
  function handleTambahKeranjang(idMenu) {
    const menuDipilih = menuItems.find((item) => item.id === idMenu)
    if (!menuDipilih || !menuDipilih.tersedia) {
      return
    }

    const itemSudahAda = keranjang.find((item) => item.id === idMenu)
    if (itemSudahAda) {
      setKeranjang(
        keranjang.map((item) =>
          item.id === idMenu ? { ...item, jumlah: item.jumlah + 1 } : item
        )
      )
    } else {
      setKeranjang([...keranjang, { id: idMenu, jumlah: 1 }])
    }

    // Tampilkan notifikasi toast langsung saat tombol Tambah diklik
    setToastPesan(`${menuDipilih.emoji} ${menuDipilih.nama} berhasil ditambahkan!`)
    setTimeout(() => {
      setToastPesan('')
    }, 2400)
  }

  // event handling: tambah jumlah item di keranjang
  function handleTambahJumlah(idMenu) {
    setKeranjang(
      keranjang.map((item) =>
        item.id === idMenu ? { ...item, jumlah: item.jumlah + 1 } : item
      )
    )
  }

  // event handling: kurangi jumlah item di keranjang (batas minimal 1)
  function handleKurangJumlah(idMenu) {
    setKeranjang(
      keranjang.map((item) =>
        item.id === idMenu && item.jumlah > 1
          ? { ...item, jumlah: item.jumlah - 1 }
          : item
      )
    )
  }

  // event handling: hapus item dari keranjang
  function handleHapusKeranjang(idMenu) {
    setKeranjang(keranjang.filter((item) => item.id !== idMenu))
  }

  // event handling: buka/tutup detail menu (hanya satu detail terbuka dalam satu waktu)
  function handleToggleDetail(idMenu) {
    if (detailTerbuka === idMenu) {
      setDetailTerbuka(null)
    } else {
      setDetailTerbuka(idMenu)
    }
  }

  // Menghitung hasil filter, pencarian, dan pengurutan langsung dari state
  const daftarMenuTampil = menuItems
    .filter((menu) => {
      const cocokKeyword = menu.nama
        .toLowerCase()
        .includes(keyword.trim().toLowerCase())
      const cocokKategori =
        kategoriAktif === 'Semua' || menu.kategori === kategoriAktif
      return cocokKeyword && cocokKategori
    })
    .slice()
    .sort((a, b) => {
      if (urutan === 'termurah') {
        return a.harga - b.harga
      }
      if (urutan === 'termahal') {
        return b.harga - a.harga
      }
      return a.id - b.id
    })

  // Menggabungkan data keranjang ({ id, jumlah }) dengan detail menu lengkap dari menuItems
  const isiKeranjangLengkap = keranjang.map((itemKeranjang) => {
    const dataMenu = menuItems.find((m) => m.id === itemKeranjang.id)
    return {
      ...dataMenu,
      jumlah: itemKeranjang.jumlah,
    }
  })

  // Menghitung total jumlah item untuk badge Navbar dan total harga pesanan
  const jumlahItemKeranjang = keranjang.reduce(
    (acc, item) => acc + item.jumlah,
    0
  )
  const totalHargaKeranjang = isiKeranjangLengkap.reduce(
    (acc, item) => acc + item.harga * item.jumlah,
    0
  )

  return (
    <div className="app-wrapper">
      {/* Toast Notifikasi saat item ditambahkan */}
      {toastPesan && (
        <div className="toast-banner" role="status">
          <span className="toast-icon">✓</span>
          <span className="toast-text">{toastPesan}</span>
        </div>
      )}

      {/* props: mengirim jumlahKeranjang, halamanAktif, dan onGantiHalaman ke Navbar */}
      <Navbar
        jumlahKeranjang={jumlahItemKeranjang}
        halamanAktif={halamanAktif}
        onGantiHalaman={setHalamanAktif}
      />

      <main>
        {/* conditional rendering: Halaman BERANDA hanya tampil saat halamanAktif === 'beranda' */}
        {halamanAktif === 'beranda' && (
          <section id="beranda" className="page-beranda">
            <div className="hero-banner">
              <div className="container hero-content">
                <span className="hero-badge-pill">🔥 Rekomendasi Menu Hangat &amp; Nikmat</span>
                <h1 className="hero-title">
                  Paling Pas Buat Santai &amp; Teman Nugas
                </h1>
                <p className="hero-desc">
                  Nikmati kelezatan roti bakar renyah dengan aneka topping lumer, seduhan kopi segar,
                  dan aneka camilan lezat dengan harga ramah kantong.
                </p>

                <div className="hero-perks">
                  <span className="perk-pill">🍞 Roti Panggang Fresh</span>
                  <span className="perk-pill">☕ Kopi Gula Aren Asli</span>
                  <span className="perk-pill">🥟 Camilan Renyah Gurih</span>
                </div>

                <div className="hero-cta-group">
                  <button
                    type="button"
                    className="btn btn-primary btn-hero"
                    onClick={() => setHalamanAktif('menu')}
                  >
                    Buka Katalog Menu ➔
                  </button>
                  {jumlahItemKeranjang > 0 && (
                    <button
                      type="button"
                      className="btn btn-secondary btn-hero"
                      onClick={() => setHalamanAktif('keranjang')}
                    >
                      Lihat Keranjang ({jumlahItemKeranjang})
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Bagian Tentang Kedai Bakar & Seduh */}
            <div className="container about-container">
              <div className="about-card about-card-single">
                <div className="about-info">
                  <h2>Tentang Kedai Bakar &amp; Seduh</h2>
                  <p>
                    <strong>Kedai Bakar &amp; Seduh</strong> adalah kedai roti bakar
                    dan kopi fiktif yang menghadirkan suasana santai dengan menu
                    andalan roti panggang klasik, kopi susu gula aren, serta
                    camilan hangat yang ramah di kantong mahasiswa.
                  </p>
                  <p>
                    Dengan suasana yang nyaman dan harga yang bersahabat, kami ingin setiap sudut kedai menjadi ruang favorit untuk beristirahat sejenak, bertukar cerita, maupun menemani waktu nugasmu.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* conditional rendering: Halaman MENU hanya tampil saat halamanAktif === 'menu' */}
        {halamanAktif === 'menu' && (
          <section id="menu" className="section-block">
            <div className="container">
              <div className="section-header section-header-with-action">
                <div>
                  <span className="section-subtag">PILIHAN KEDAI</span>
                  <h2>Katalog Menu Kami</h2>
                  <p>
                    Menampilkan <strong>{daftarMenuTampil.length}</strong> dari{' '}
                    {menuItems.length} pilihan menu
                  </p>
                </div>
                {jumlahItemKeranjang > 0 && (
                  <button
                    type="button"
                    className="btn btn-primary btn-to-cart-top"
                    onClick={() => setHalamanAktif('keranjang')}
                  >
                    🛒 Buka Keranjang ({jumlahItemKeranjang})
                  </button>
                )}
              </div>

              {/* props: mengirim nilai state dan handler pencarian/filter/urutan ke SearchFilter */}
              <SearchFilter
                keyword={keyword}
                onKeywordChange={setKeyword}
                kategoriAktif={kategoriAktif}
                onKategoriChange={setKategoriAktif}
                urutan={urutan}
                onUrutanChange={setUrutan}
              />

              {/* props: mengirim daftarMenu hasil filter dan handler interaksi ke MenuList */}
              <MenuList
                daftarMenu={daftarMenuTampil}
                favorit={favorit}
                onToggleFavorit={handleToggleFavorit}
                onTambahKeranjang={handleTambahKeranjang}
                onToggleDetail={handleToggleDetail}
                detailTerbuka={detailTerbuka}
                keranjang={keranjang}
              />

              {/* Floating Bottom Cart Bar ala Aplikasi Food Delivery */}
              {jumlahItemKeranjang > 0 && (
                <div className="floating-cart-bar">
                  <div className="floating-cart-text">
                    <span className="floating-cart-count">🛍️ {jumlahItemKeranjang} Item Dipilih</span>
                    <strong className="floating-cart-price">{formatRupiah(totalHargaKeranjang)}</strong>
                  </div>
                  <button
                    type="button"
                    className="btn btn-floating-action"
                    onClick={() => setHalamanAktif('keranjang')}
                  >
                    Buka Keranjang ➔
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* conditional rendering: Halaman KERANJANG hanya tampil saat halamanAktif === 'keranjang' */}
        {halamanAktif === 'keranjang' && (
          <section id="keranjang" className="section-block">
            <div className="container">
              <div className="section-header">
                <span className="section-subtag">PESANAN ANDA</span>
                <h2>Keranjang Pesanan</h2>
                <p>Periksa kembali daftar menu dan jumlah porsi pilihanmu.</p>
              </div>

              {/* props: mengirim isiKeranjang yang sudah digabung, handler jumlah/hapus, total harga, dan shortcut ke menu */}
              <Cart
                isiKeranjang={isiKeranjangLengkap}
                onTambahJumlah={handleTambahJumlah}
                onKurangJumlah={handleKurangJumlah}
                onHapus={handleHapusKeranjang}
                total={totalHargaKeranjang}
                onKeMenu={() => setHalamanAktif('menu')}
              />
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App
