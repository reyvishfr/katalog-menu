import { formatRupiah } from '../data/menu.js'
import Button from './Button.jsx'
import MenuDetail from './MenuDetail.jsx'

// Komponen MenuCard untuk menampilkan satu kartu menu
// props: menerima menu, isFavorit, onToggleFavorit, onTambahKeranjang, onToggleDetail, detailTerbuka
function MenuCard({
  menu,
  isFavorit,
  onToggleFavorit,
  onTambahKeranjang,
  onToggleDetail,
  detailTerbuka,
}) {
  const apakahDetailTerbuka = detailTerbuka === menu.id

  return (
    <article className={`menu-card ${!menu.tersedia ? 'menu-card-habis' : ''}`}>
      <div className="card-top">
        <div className="card-badges">
          <span className="badge badge-kategori">{menu.kategori}</span>
          {/* conditional rendering: tampilkan badge Populer jika menu.populer bernilai true */}
          {menu.populer && <span className="badge badge-populer">★ Populer</span>}
          {/* conditional rendering: tampilkan badge Habis jika menu tidak tersedia */}
          {!menu.tersedia && <span className="badge badge-habis">Habis</span>}
        </div>

        {/* event handling: klik tombol favorit memanggil onToggleFavorit dengan id menu */}
        <button
          type="button"
          className={`btn-favorit ${isFavorit ? 'aktif' : ''}`}
          onClick={() => onToggleFavorit(menu.id)}
          aria-label={isFavorit ? 'Hapus dari favorit' : 'Tambah ke favorit'}
          title={isFavorit ? 'Hapus dari favorit' : 'Tambah ke favorit'}
        >
          {/* conditional rendering: ikon hati berubah sesuai status favorit */}
          {isFavorit ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="card-emoji" aria-hidden="true">
        {menu.emoji}
      </div>

      <div className="card-body">
        <h3 className="card-title">{menu.nama}</h3>
        <p className="card-price">{formatRupiah(menu.harga)}</p>
      </div>

      <div className="card-actions">
        {/* conditional rendering: tombol Tambah dinonaktifkan (disabled) jika menu habis */}
        <Button
          label={menu.tersedia ? '+ Tambah' : 'Habis'}
          variant="primary"
          disabled={!menu.tersedia}
          onClick={() => onTambahKeranjang(menu.id)}
        />
        <Button
          label={apakahDetailTerbuka ? 'Tutup' : 'Detail'}
          variant="secondary"
          onClick={() => onToggleDetail(menu.id)}
        />
      </div>

      {/* conditional rendering: tampilkan MenuDetail jika detailTerbuka sama dengan id menu ini */}
      {apakahDetailTerbuka && <MenuDetail menu={menu} />}
    </article>
  )
}

export default MenuCard
