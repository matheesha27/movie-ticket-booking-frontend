import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from '../components/Header';

export default function SeatSelectionPage() {

  const location = useLocation();
  const {
    movie,
    cinema,
    showTime
  } = location.state;
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState(new Set());
  const [selectedDate, setSelectedDate] = useState("");
  const [sectionMap, setSectionMap] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchSeats();
  }, []);

  async function fetchSeats() {

    try {
      const response = await axios.get(
        `http://localhost:8000/seats/movie/${movie.id}`
      );
      setSeats(response.data);
      // console.log('Seats fetched successfully:', response.data);
      const sections = {};
      response.data.forEach((seat) => {
        if (!sections[seat.section]) {
          sections[seat.section] = [];
        }
        sections[seat.section].push(seat);
      });
      setSectionMap(sections);
      console.log('Section map:', sections);

    } catch (error) {
      console.error(error);
    }
  }

  function handleSeatClick(seat) {

    // Already booked
    if (seat.status === "BOOKED") {
      return;
    }

    // Toggle selection
    const updated = new Set(selectedSeats);

    if (updated.has(seat.id)) {
      updated.delete(seat.id);
    } else {
      updated.add(seat.id);
    }

    setSelectedSeats(updated);
    setTotalPrice((prevTotal) => prevTotal + (updated.has(seat.id) ? seat.price : -seat.price));
  }

function getSeatClass(seat) {

  if (seat.status === "BOOKED") {
    return "bg-gray-700 cursor-not-allowed text-white";
  }

  if (selectedSeats.has(seat.id)) {
    return "bg-green-500 text-white";
  }

  return "bg-white text-black hover:bg-green-500";
  }

  function groupSeatsByRow(seats) {

    const grouped = {};

    seats.forEach((seat) => {
        if (!grouped[seat.row]) {
          grouped[seat.row] = [];
      }
      grouped[seat.row].push(seat);

    });

    return Object.entries(grouped);
    }

  return (

    <div className="min-h-screen bg-secondary py-20">

      <Header />

      {/* HEADER */}
      <div className="mb-8 text-black">
        <h1 className="text-4xl font-bold text-text-gray-800">
          {movie.title}
        </h1>

        <p className="text-xl">
          {cinema.name}
        </p>

        <p>
          🕒 {showTime}
        </p>
      </div>

      {/* DATE SELECTOR */}
      <div className="mb-2 text-black">
        <label className="font-bold mr-4">
          Movie Date:
        </label>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) =>
            setSelectedDate(e.target.value)
          }
          className="border p-2 rounded bg-white"
        />
      </div>

      {/* PRICE */}
      <div className="flex justify-center">
        <div className="
          w-200
          text-gray-800
          text-center
          py-3
          text-sm
          rounded-md
        ">
          {
            [...new Map(
              seats.map(seat => [
                seat.section,
                seat.price
              ])
            ).entries()]
            .map(([section, price]) =>
              `${section}: LKR ${price}`
            )
            .join(" | ")
          }
        </div>
      </div>

      {/* SCREEN */}
      <div className="flex justify-center mb-12">
        <div className="
          bg-blue-200
          w-200
          text-gray-600
          text-center
          py-3
          rounded-md
          font-bold
        ">
          All eyes this way please!
        </div>
      </div>

      {/* SEATS */}
      <div className="flex flex-col gap-2 items-center"> {/* All seats division */}

        {groupSeatsByRow(seats).map(
          
          ([row, rowSeats]) => (
          <div
            key={row}
            className="flex gap-2 items-center"
          >
            <span className="w-5 font-bold text-gray-600"> {/* Row Label */}
              {row}
            </span>

            {rowSeats.map((seat) => (
              <button
                key={seat.id}
                onClick={() =>
                  handleSeatClick(seat)
                }
                className={`
                  w-6
                  h-6
                  text-sm
                  rounded
                  border
                  transition-all
                  duration-200
                  ${getSeatClass(seat)}
                `}
              >
                {console.log('SELECTED SEAT' + seat.id)}
                {seat.seat_number}
              </button>
            ))}
          </div>

        ))}

      </div>

      {/* SELECTED SEATS */}
      <div className="mt-10 text-center"> {/* All seats division */}

        <h2 className="text-2xl font-bold mb-4 text-black">
          Selected Seats
        </h2>

        <div className="flex gap-3 justify-center mt-5">
          {seats
            .filter(seat => selectedSeats.has(seat.id))
            .map((seat) => (
           <div
              key={seat.id}
              className="
                bg-green-500
                text-black
                font-semibold
                px-4
                py-2
                rounded
              "
            >
              {seat.row}
              {seat.seat_number}
            </div>
          ))}
         {selectedSeats.size === 0 && (
            <p className="text-black">No seats selected</p>
          )}

        </div>

      </div>

      {/* LEGENDS */}
      <div className="mt-10 text-center"> {/* Legends division */}

        <div className="flex gap-3 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-700 rounded"></div>
            <span className="text-black">Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded"></div>
            <span className="text-black">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded border"></div>
            <span className="text-black">Available</span>
          </div>
        </div>

      </div>

      {/* TOTAL PRICE */}
      <div className="mt-10 text-center"> {/* Total price */}
        <p className="text-xl font-semibold text-black">
          Total Price: LKR {totalPrice.toFixed(2)}
        </p>
      </div>

      {/* PROCEED */}
      <div className="mt-10 text-center"> {/* Proceed button */}

        <button
          disabled={selectedSeats.size === 0}
          className={`
            bg-blue-600
            hover:bg-blue-700
            text-white
            font-semibold
            py-2
            px-4
            rounded
            transition-colors
            duration-200
          `}
        >
          Proceed to Booking
        </button>
      </div>

    </div>
  );
}