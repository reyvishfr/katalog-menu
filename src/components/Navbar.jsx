// Komponen Navbar untuk navigasi halaman dan identitas mahasiswa
// props: menerima jumlahKeranjang, halamanAktif, dan onGantiHalaman dari App.jsx
function Navbar({ jumlahKeranjang, halamanAktif, onGantiHalaman }) {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <div className="navbar-brand">
          <button
            type="button"
            className="brand-button"
            onClick={() => onGantiHalaman('beranda')}
          >
            <span className="brand-icon">🍞</span>
            <span className="brand-name">Kedai Bakar &amp; Seduh</span>
          </button>
          <span className="brand-student">
            Reyvianti Shafira &bull; 1247050021
          </span>
        </div>

        <nav className="navbar-links" aria-label="Navigasi Utama">
          <button
            type="button"
            className={`nav-btn ${halamanAktif === 'beranda' ? 'active' : ''}`}
            onClick={() => onGantiHalaman('beranda')}
          >
            Beranda
          </button>
          <button
            type="button"
            className={`nav-btn ${halamanAktif === 'menu' ? 'active' : ''}`}
            onClick={() => onGantiHalaman('menu')}
          >
            Menu
          </button>
          <button
            type="button"
            className={`nav-btn nav-cart-btn ${halamanAktif === 'keranjang' ? 'active' : ''}`}
            onClick={() => onGantiHalaman('keranjang')}
          >
            Keranjang
            <span className="cart-badge">{jumlahKeranjang}</span>
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
