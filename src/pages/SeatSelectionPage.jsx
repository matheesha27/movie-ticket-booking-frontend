import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import axios from "axios";
import api from "../api/axios";
import Header from '../components/Header';
import toast from "react-hot-toast";

export default function SeatSelectionPage() {

  const location = useLocation();
  const {
    // movie,
    cinema,
    showTime
  } = location.state;
  const [seats, setSeats] = useState([]);
  const [selectedSeatsSet, setSelectedSeatsSet] = useState(new Set());
  const [selectedSeatLabels, setSelectedSeatLabels] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [sectionMap, setSectionMap] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const [movie, setMovie] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedDate) {
      getExactMovieRow();
      fetchSeats();
    }
  }, [selectedDate]);

  const [uniqueMovieSeatIdPrefix, setUniqueMovieSeatIdPrefix] = useState("");

  async function getExactMovieRow() {

    try {
      const response = await api.get("/movies/movie", {
        params: {
          cinema_id: cinema.id,
          show_time: showTime,
        },
      });
      setMovie(response.data);
      console.log("Exact movie fetched successfully:", response.data);
      // setUniqueMovieSeatIdPrefix(`${response.data.id}_${cinema.id}_${showTime.replace(":", "-")}`); ADDED BY SUGGESSION
      return response.data;

    } catch (error) {
      console.error("Error fetching movie:", error);
      return null;
    }
  }

  async function fetchSeats() {

    try {
      const response = await api.get(
        `/seats/unique-movie-seats`,
        {
          params: {
            cinema_id: cinema.id,
            movie_id: movie.id, // change
            movie_title: movie.title, // change
            date: selectedDate,
            show_time: showTime
          }
        }
      );
      console.log(response.data);
      if (!response.data || response.data.length === 0) {
        toast.error("No seats found for selected date and show time");
        setSeats([]);
        setSectionMap({});
        return;
      }
      // console.log(response.data[0].unique_movie_seat_id.slice(0, -2));
      setSeats(response.data);
      
      const sections = {};
      response.data.forEach((seat) => {
        if (!sections[seat.section]) {
          sections[seat.section] = [];
        }
        sections[seat.section].push(seat);
      });
      setSectionMap(sections);

    } catch (error) {
      console.error(error);
    }
  }


  function handleSeatClick(seat) {

    // Already booked
    if (seat.status === "BOOKED") {
      return;
    }

    if (seat == null) {
      toast.error("Please select seat(s) to proceed!")
    }

    // Toggle selection
    const updated = new Set(selectedSeatsSet);
    const seatLabel = `${seat.row}${seat.seat_number}`; // unique

    if (updated.has(seat.id)) {
      updated.delete(seat.id);
      setSelectedSeatLabels(prev =>
        prev.filter(label => label !== seatLabel)
      );

    } else {
      updated.add(seat.id);
      setSelectedSeatLabels(prev => [...prev, seatLabel]);
    }
    setSelectedSeatsSet(updated);
    setTotalPrice((prevTotal) => prevTotal + (updated.has(seat.id) ? seat.price : -seat.price));
  }


  function getSeatClass(seat) {

    if (seat.status === "BOOKED") {
      return "bg-gray-700 cursor-not-allowed text-white";
    }

    if (seat.status === "HELD") {
      return "bg-blue-600 cursor-not-allowed text-white";
    }

    if (selectedSeatsSet.has(seat.id)) {
      return "bg-green-500 text-white";
    }

    return "bg-white text-black md:hover:bg-green-500";
    }


  function groupSeatsByRow(seats) {

    const grouped = {};

    seats.forEach((seat) => {
        if (!grouped[seat.row]) {
          grouped[seat.row] = [];
      }
      grouped[seat.row].push(seat);

    });

    // sort each row by seat number
    Object.keys(grouped).forEach((row) => {
      grouped[row].sort((a, b) => {
        return Number(a.seat_number) - Number(b.seat_number);
      });
    });

    return Object.entries(grouped);
    }


  async function holdSelectedSeats() {
    try {
      console.log({
        cinema_id: cinema.id,
        movie_id: movie.id,
        date: selectedDate,
        show_time: showTime,
        selected_seats: selectedSeatLabels
      });
      const response = await api.post(
        "/seats/hold",
        {
          cinema_id: cinema.id,
          movie_id: movie.id,
          date: selectedDate,
          show_time: showTime,
          selected_seats: selectedSeatLabels
        }
      );

      return response.data.status === "SUCCESS";

    } catch (error) {
      console.error(error);

      if (error.response?.data?.detail) {
        toast.error(error.response.data.detail);
      } else {
        toast.error("Failed to hold seats");
      }

      return false;
    }
  }

  return (

    <div className="min-h-screen bg-secondary py-20">

      <Header />

      {/* HEADER */}
      <div className="mb-8 text-black px-4">
        <h1 className="text-2xl md:text-4xl font-bold">
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
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2 rounded bg-white"
        />
      </div>

      {/* SECTION PRICES */}
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
          w-full
          max-w-5xl
          text-gray-600
          text-center
          py-3
          rounded-md
          font-bold
          tracking-widest
        ">
          All eyes this way please!
        </div>
      </div>

      {/* SEATS */}
      {selectedDate && (
        <div className="w-full overflow-x-auto pb-4">

          <div className="flex flex-col gap-8 items-center min-w-150 md:min-w-max">

            {Object.entries(sectionMap).map(([sectionName, sectionSeats]) => (

              <div
                key={sectionName}
                className="w-full flex flex-col items-center px-4"
              >

                {/* Section Label */}
                <div className="mb-2">
                  <h3 className="text-md font-semibold text-gray-800">
                    {sectionName}
                  </h3>
                </div>

                {/* Seats in Section */}
                {groupSeatsByRow(sectionSeats).map(
                  ([row, rowSeats]) => (
                    <div
                      key={`${sectionName}-${row}`}
                      className="flex gap-1 md:gap-2 items-center mb-2 whitespace-nowrap"
                    >
                      <span className="w-6 font-bold text-gray-600 sticky left-0 bg-secondary pr-2">
                        {row}
                      </span>

                      {rowSeats.map((seat) => (
                        <button
                          key={seat.id}
                          onClick={() => handleSeatClick(seat)}
                          className={`
                            w-8
                            h-8
                            md:w-9
                            md:h-9
                            text-xs
                            md:text-sm
                            rounded
                            border
                            transition-all
                            duration-200
                            ${getSeatClass(seat)}
                          `}
                        >
                          {seat.seat_number}
                        </button>
                      ))}
                    </div>
                  )
                )}

                {/* Section Separator */}
                <div className="w-full max-w-4xl mt-2 mb-0">
                  <hr className="border-gray-400" />
                </div>

              </div>
            ))}

          </div>

        </div>
      )}
      
      {!selectedDate && (
        <p className="text-center text-gray-600">
          Please select a date to view available seats.
        </p>
      )}

      {/* SELECTED SEATS */}
      <div className="mt-10 text-center">

        <h2 className="text-2xl font-bold mb-4 text-black">
          Selected Seats
        </h2>

        <div
          className="
            flex
            flex-wrap
            max-h-32
            overflow-y-auto
            gap-2
            justify-center
            mt-5
            px-4
          "
        >
          {seats
            .filter(seat => selectedSeatsSet.has(seat.id))
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
          {selectedSeatsSet.size === 0 && (
            <p className="text-gray-600">No seats selected</p>
          )}          
          {console.log('SELECTED SEAT LABELS:' + selectedSeatLabels)}
        </div>

      </div>

      {/* LEGENDS */}
      <div
        className="
          flex
          flex-wrap
          gap-4
          justify-center
          px-4
          mt-8
        "
      >

        <div className="flex gap-3 justify-center">

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-700 rounded"></div>
            <span className="text-black">Booked</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded"></div>
            <span className="text-black">Held</span>
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
      <div className="mt-10 text-center md:static sticky bottom-0 bg-secondary py-4">

        <button
          disabled={selectedSeatsSet.size === 0}
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            font-semibold
            py-2
            px-4
            rounded
            transition-colors
            duration-200
          "
          onClick={async () => {

          if (selectedSeatsSet.size === 0) {
            toast.error("Please select seat(s) to proceed!");
            return;
          }

          const success = await holdSelectedSeats();

          if (!success) {
            return;
          }

          navigate("/booking", {
            state: {
              movie,
              cinema,
              selectedDate,
              showTime,
              selectedSeatLabels,
              totalPrice,
              uniqueMovieSeatIdPrefix
            }
          });
        }}
        >
          Proceed to Booking
        </button>
      </div>

    </div>
  );
}