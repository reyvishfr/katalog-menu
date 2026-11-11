import { formatRupiah } from '../data/menu.js'
import Button from './Button.jsx'

// Komponen Cart untuk menampilkan daftar belanjaan dan total harga
// props: menerima isiKeranjang, onTambahJumlah, onKurangJumlah, onHapus, dan total
function Cart({
  isiKeranjang,
  onTambahJumlah,
  onKurangJumlah,
  onHapus,
  total,
}) {
  // conditional rendering: jika isiKeranjang kosong, tampilkan pesan Keranjang masih kosong
  if (isiKeranjang.length === 0) {
    return (
      <div className="cart-box empty-state">
        <p className="empty-title">Keranjang masih kosong</p>
        <p className="empty-subtitle">
          Silakan pilih menu favoritmu di bagian daftar menu di atas.
        </p>
      </div>
    )
  }

  return (
    <div className="cart-box">
      <div className="cart-list">
        {/* list rendering: merender setiap item di keranjang dengan map() dan key={item.id} */}
        {isiKeranjang.map((item) => {
          const subtotal = item.harga * item.jumlah

          return (
            <div key={item.id} className="cart-item">
              <div className="cart-item-info">
                <span className="cart-emoji" aria-hidden="true">
                  {item.emoji}
                </span>
                <div>
                  <h4 className="cart-item-title">{item.nama}</h4>
                  <p className="cart-item-price">{formatRupiah(item.harga)} / porsi</p>
                </div>
              </div>

              <div className="cart-item-controls">
                <div className="qty-control">
                  {/* conditional rendering: tombol kurang (-) disabled jika jumlah sudah 1 */}
                  <Button
                    label="-"
                    variant="secondary"
                    disabled={item.jumlah <= 1}
                    onClick={() => onKurangJumlah(item.id)}
                  />
                  <span className="qty-number">{item.jumlah}</span>
                  <Button
                    label="+"
                    variant="secondary"
                    onClick={() => onTambahJumlah(item.id)}
                  />
                </div>

                <div className="cart-item-subtotal">
                  <span>Subtotal:</span>
                  <strong>{formatRupiah(subtotal)}</strong>
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

      <div className="cart-summary">
        <span>Total Harga Pesanan</span>
        <strong className="cart-total-amount">{formatRupiah(total)}</strong>
      </div>
    </div>
  )
}

export default Cart
