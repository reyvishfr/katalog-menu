import { useState } from 'react'
import { menuItems } from './data/menu.js'
import Navbar from './components/Navbar.jsx'
import SearchFilter from './components/SearchFilter.jsx'
import MenuList from './components/MenuList.jsx'
import Cart from './components/Cart.jsx'

function App() {
  // state: 6 state utama aplikasi disimpan di App.jsx menggunakan useState
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
      {/* props: mengirim jumlahKeranjang ke komponen Navbar */}
      <Navbar jumlahKeranjang={jumlahItemKeranjang} />

      <main>
        {/* Section Beranda (Hero) */}
        <section id="beranda" className="hero-section">
          <div className="container hero-inner">
            <span className="hero-badge">✨ Fresh Bakes &amp; Specialty Brews ☕</span>
            <h1>Kedai Bakar &amp; Seduh</h1>
            <p>
              Spot nongkrong aesthetic buat chill, nugas, dan ngobrol santai.
              Roti bakar crispy dengan topping melimpah &amp; seduhan kopi creamy favoritmu.
            </p>
            <div className="hero-cta">
              <a href="#menu" className="btn btn-primary hero-link">
                Eksplor Menu 🚀
              </a>
              <span className="hero-stat">
                ❤️ Disukai: <strong>{favorit.length}</strong> menu
              </span>
            </div>
          </div>
        </section>

        {/* Section Menu (SearchFilter + MenuList) */}
        <section id="menu" className="section-block">
          <div className="container">
            <div className="section-header">
              <h2>Katalog Menu Kami</h2>
              <p>
                Menampilkan <strong>{daftarMenuTampil.length}</strong> dari{' '}
                {menuItems.length} pilihan menu
              </p>
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

        {/* Section Keranjang */}
        <section id="keranjang" className="section-block section-alt">
          <div className="container">
            <div className="section-header">
              <h2>Keranjang Pesanan</h2>
              <p>Periksa kembali daftar menu dan jumlah porsi pilihanmu.</p>
            </div>

            {/* props: mengirim isiKeranjang yang sudah digabung, handler jumlah/hapus, dan total harga */}
            <Cart
              isiKeranjang={isiKeranjangLengkap}
              onTambahJumlah={handleTambahJumlah}
              onKurangJumlah={handleKurangJumlah}
              onHapus={handleHapusKeranjang}
              total={totalHargaKeranjang}
            />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
