// Komponen Footer untuk menampilkan informasi mahasiswa di bagian bawah halaman
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-brand">
          <strong>Kedai Bakar &amp; Seduh</strong> &mdash; Katalog Menu Roti Bakar &amp; Kopi
        </p>
        <p className="footer-student">
          Dibuat oleh <strong>Reyvianti Shafira</strong> (NIM: <strong>1247050021</strong>)
        </p>
        <p className="footer-prodi">
          Teknik Informatika, UIN Sunan Gunung Djati Bandung &bull; 2026
        </p>
      </div>
    </footer>
  )
}

export default Footer
