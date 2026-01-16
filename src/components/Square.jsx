export default function Square({ value, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        height: 80,
        width: 80,
        fontSize: 32,
        cursor: "pointer",
        borderRadius: 10,
        border: "1px solid #ccc",
        background: "white",
      }}
    >
      {value}
    </button>
  );
}