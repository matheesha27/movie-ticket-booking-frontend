export default function Seat({
  seat,
  onClick,
}) {

  return (
    <button
      disabled={seat.status !== "AVAILABLE"}
      onClick={() => onClick(seat)}
    >
      {seat.seat_number}
    </button>
  );
}