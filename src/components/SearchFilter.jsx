// Komponen SearchFilter untuk input pencarian, filter kategori, dan pengurutan harga
// props: menerima keyword, onKeywordChange, kategoriAktif, onKategoriChange, urutan, onUrutanChange
function SearchFilter({
  keyword,
  onKeywordChange,
  kategoriAktif,
  onKategoriChange,
  urutan,
  onUrutanChange,
}) {
  return (
    <div className="search-filter">
      <div className="filter-group filter-search">
        <label htmlFor="input-cari">Cari Menu</label>
        {/* event handling: mengubah nilai keyword saat pengguna mengetik di kolom input */}
        <input
          id="input-cari"
          type="text"
          placeholder="Cari nama menu (misal: roti, kopi)..."
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="select-kategori">Kategori</label>
        {/* event handling: mengubah kategoriAktif saat dropdown kategori dipilih */}
        <select
          id="select-kategori"
          value={kategoriAktif}
          onChange={(e) => onKategoriChange(e.target.value)}
        >
          <option value="Semua">Semua</option>
          <option value="Makanan">Makanan</option>
          <option value="Minuman">Minuman</option>
          <option value="Snack">Snack</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="select-urutan">Urutkan Harga</label>
        {/* event handling: mengubah urutan harga saat dropdown urutan dipilih */}
        <select
          id="select-urutan"
          value={urutan}
          onChange={(e) => onUrutanChange(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="termurah">Termurah</option>
          <option value="termahal">Termahal</option>
        </select>
      </div>
    </div>
  )
}

export default SearchFilter
