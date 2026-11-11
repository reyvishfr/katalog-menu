import MenuCard from './MenuCard.jsx'

// Komponen MenuList untuk merender daftar kartu menu
// props: menerima daftarMenu serta state dan fungsi handler untuk diteruskan ke MenuCard
function MenuList({
  daftarMenu,
  favorit,
  onToggleFavorit,
  onTambahKeranjang,
  onToggleDetail,
  detailTerbuka,
}) {
  // conditional rendering: jika hasil filter/pencarian kosong, tampilkan pesan
  if (daftarMenu.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-title">Menu tidak ditemukan</p>
        <p className="empty-subtitle">
          Coba gunakan kata kunci pencarian atau filter kategori yang lain.
        </p>
      </div>
    )
  }

  return (
    <div className="menu-grid">
      {/* list rendering: merender daftarMenu menggunakan map() dengan key={menu.id} */}
      {daftarMenu.map((menu) => (
        <MenuCard
          key={menu.id}
          menu={menu}
          isFavorit={favorit.includes(menu.id)}
          onToggleFavorit={onToggleFavorit}
          onTambahKeranjang={onTambahKeranjang}
          onToggleDetail={onToggleDetail}
          detailTerbuka={detailTerbuka}
        />
      ))}
    </div>
  )
}

export default MenuList
