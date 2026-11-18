import { useState } from 'react'
import { menuItems } from './data/menu.js'
import Navbar from './components/Navbar.jsx'
import SearchFilter from './components/SearchFilter.jsx'
import MenuList from './components/MenuList.jsx'
import Cart from './components/Cart.jsx'

function App() {
  // state: pengelolaan state utama aplikasi di App.jsx menggunakan useState
  const [halamanAktif, setHalamanAktif] = useState('beranda') // 'beranda' | 'menu' | 'keranjang'
  const [keyword, setKeyword] = useState('')
  const [kategoriAktif, setKategoriAktif] = useState('Semua')
  const [urutan, setUrutan] = useState('default')
  const [favorit, setFavorit] = useState([])
  const [keranjang, setKeranjang] = useState([])
  const [detailTerbuka, setDetailTerbuka] = useState(null)

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
            <div className="hero-section">
              <div className="container hero-inner">
                <span className="hero-badge">✨ Fresh Bakes &amp; Specialty Brews ☕</span>
                <h1>Kedai Bakar &amp; Seduh</h1>
                <p>
                  Spot nongkrong aesthetic buat chill, nugas, dan ngobrol santai.
                  Roti bakar crispy dengan topping melimpah &amp; seduhan kopi creamy favoritmu.
                </p>
                <div className="hero-cta">
                  <button
                    type="button"
                    className="btn btn-primary hero-link"
                    onClick={() => setHalamanAktif('menu')}
                  >
                    Buka Katalog Menu 🚀
                  </button>
                  <span className="hero-stat">
                    ❤️ Disukai: <strong>{favorit.length}</strong> menu
                  </span>
                </div>
              </div>
            </div>

            {/* Fitur Highlight Beranda */}
            <div className="container beranda-highlights">
              <div className="highlight-grid">
                <div className="highlight-card">
                  <div className="highlight-icon">🍞</div>
                  <h3>Roti Bakar Signature</h3>
                  <p>Roti tawar tebal dipanggang renyah dengan mentega gurih dan aneka topping lumer.</p>
                </div>
                <div className="highlight-card">
                  <div className="highlight-icon">☕</div>
                  <h3>Kopi Seduh Pilihan</h3>
                  <p>Kopi susu gula aren asli dan racikan kopi hitam yang wangi untuk teman produktifmu.</p>
                </div>
                <div className="highlight-card">
                  <div className="highlight-icon">🥟</div>
                  <h3>Camilan Hangat</h3>
                  <p>Cireng bumbu rujak, pisang goreng, dan kentang renyah yang selalu enak dicemil bareng.</p>
                </div>
              </div>

              <div className="beranda-cta-banner">
                <div className="cta-banner-text">
                  <h3>Penasaran sama pilihan menunya?</h3>
                  <p>Tersedia 15 pilihan menu makanan, minuman, dan snack yang siap disajikan!</p>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setHalamanAktif('menu')}
                >
                  Lihat Semua Menu
                </button>
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
                  <h2>Katalog Menu Kami</h2>
                  <p>
                    Menampilkan <strong>{daftarMenuTampil.length}</strong> dari{' '}
                    {menuItems.length} pilihan menu
                  </p>
                </div>
                {jumlahItemKeranjang > 0 && (
                  <button
                    type="button"
                    className="btn btn-primary btn-to-cart"
                    onClick={() => setHalamanAktif('keranjang')}
                  >
                    🛒 Lihat Keranjang ({jumlahItemKeranjang})
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
              />
            </div>
          </section>
        )}

        {/* conditional rendering: Halaman KERANJANG hanya tampil saat halamanAktif === 'keranjang' */}
        {halamanAktif === 'keranjang' && (
          <section id="keranjang" className="section-block">
            <div className="container">
              <div className="section-header">
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
    </div>
  )
}

export default App
