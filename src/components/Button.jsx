// Komponen Button yang bisa dipakai ulang (reusable) di berbagai bagian aplikasi
// props: menerima label, onClick, variant ("primary" | "secondary" | "danger"), dan disabled
function Button({ label, onClick, variant = 'primary', disabled = false }) {
  return (
    // event handling: menjalankan fungsi onClick saat tombol diklik
    <button
      type="button"
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

export default Button
