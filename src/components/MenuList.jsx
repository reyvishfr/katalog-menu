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
  keranjang = [],
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
      {daftarMenu.map((menu) => {
        const itemKeranjang = keranjang.find((k) => k.id === menu.id)
        const jumlahDiKeranjang = itemKeranjang ? itemKeranjang.jumlah : 0

        return (
          <MenuCard
            key={menu.id}
            menu={menu}
            isFavorit={favorit.includes(menu.id)}
            onToggleFavorit={onToggleFavorit}
            onTambahKeranjang={onTambahKeranjang}
            onToggleDetail={onToggleDetail}
            detailTerbuka={detailTerbuka}
            jumlahDiKeranjang={jumlahDiKeranjang}
          />
        )
      })}
    </div>
  )
}

export default MenuList
