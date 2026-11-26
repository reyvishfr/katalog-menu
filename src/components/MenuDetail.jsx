import { formatRupiah } from '../data/menu.js'

// Komponen MenuDetail untuk menampilkan informasi lengkap sebuah menu
// props: menerima objek menu dari MenuCard
function MenuDetail({ menu }) {
  return (
    <div className="menu-detail">
      <p className="detail-desc">{menu.deskripsi}</p>
      <ul className="detail-list">
        <li>
          <span>Kategori:</span> <strong>{menu.kategori}</strong>
        </li>
        <li>
          {/* conditional rendering: menampilkan status Tersedia atau Sedang Habis */}
          <span>Status:</span>{' '}
          <strong className={menu.tersedia ? 'status-tersedia' : 'status-habis'}>
            {menu.tersedia ? 'Tersedia' : 'Sedang Habis'}
          </strong>
        </li>
        <li>
          <span>Harga:</span> <strong>{formatRupiah(menu.harga)}</strong>
        </li>
      </ul>
    </div>
  )
}

export default MenuDetail

