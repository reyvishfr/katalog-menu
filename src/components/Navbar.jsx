// Komponen Navbar untuk navigasi halaman dan identitas mahasiswa
// props: menerima jumlahKeranjang dari App.jsx
function Navbar({ jumlahKeranjang }) {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <div className="navbar-brand">
          <a href="#beranda" className="brand-title">
            🍞 Kedai Bakar &amp; Seduh
          </a>
          <span className="brand-student">
            Reyvianti Shafira &bull; 1247050021
          </span>
        </div>

        <nav className="navbar-links" aria-label="Navigasi Utama">
          <a href="#beranda">Beranda</a>
          <a href="#menu">Menu</a>
          <a href="#keranjang" className="nav-cart-link">
            Keranjang
            <span className="cart-badge">{jumlahKeranjang}</span>
          </a>
          <a href="#tentang">Tentang</a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
