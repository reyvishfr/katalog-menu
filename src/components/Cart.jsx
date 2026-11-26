import { formatRupiah } from '../data/menu.js'
import Button from './Button.jsx'

// Komponen Cart untuk menampilkan daftar belanjaan dan total harga
// props: menerima isiKeranjang, onTambahJumlah, onKurangJumlah, onHapus, total, dan onKeMenu
function Cart({
  isiKeranjang,
  onTambahJumlah,
  onKurangJumlah,
  onHapus,
  total,
  onKeMenu,
}) {
  // conditional rendering: jika isiKeranjang kosong, tampilkan pesan Keranjang masih kosong
  if (isiKeranjang.length === 0) {
    return (
      <div className="cart-card empty-state">
        <p className="empty-title">Keranjang Anda masih kosong</p>
        <p className="empty-subtitle">
          Pilih menu makanan atau minuman dari katalog untuk menambahkannya ke sini.
        </p>
        {onKeMenu && (
          <div className="empty-action">
            <Button
              label="Buka Katalog Menu"
              variant="primary"
              onClick={onKeMenu}
            />
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="cart-card">
      <div className="cart-list">
        {/* list rendering: merender setiap item di keranjang dengan map() dan key={item.id} */}
        {isiKeranjang.map((item) => {
          const subtotal = item.harga * item.jumlah

          return (
            <div key={item.id} className="cart-row">
              <div className="cart-item-details">
                <span className="cart-item-icon" aria-hidden="true">
                  {item.emoji}
                </span>
                <div>
                  <h4 className="cart-item-name">{item.nama}</h4>
                  <p className="cart-item-unit-price">{formatRupiah(item.harga)}</p>
                </div>
              </div>

              <div className="cart-item-actions">
                <div className="qty-picker">
                  {/* conditional rendering: tombol kurang (-) disabled jika jumlah sudah 1 */}
                  <Button
                    label="-"
                    variant="secondary"
                    disabled={item.jumlah <= 1}
                    onClick={() => onKurangJumlah(item.id)}
                  />
                  <span className="qty-val">{item.jumlah}</span>
                  <Button
                    label="+"
                    variant="secondary"
                    onClick={() => onTambahJumlah(item.id)}
                  />
                </div>

                <div className="cart-item-subtotal-box">
                  <span className="subtotal-label">Subtotal</span>
                  <strong className="subtotal-value">{formatRupiah(subtotal)}</strong>
                </div>

                <Button
                  label="Hapus"
                  variant="danger"
                  onClick={() => onHapus(item.id)}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="cart-footer">
        {onKeMenu && (
          <Button
            label="← Tambah Menu Lain"
            variant="secondary"
            onClick={onKeMenu}
          />
        )}
        <div className="cart-total-group">
          <span className="total-label">Total Pembayaran:</span>
          <strong className="total-value">{formatRupiah(total)}</strong>
        </div>
      </div>
    </div>
  )
}

export default Cart
