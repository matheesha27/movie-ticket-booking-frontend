import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
// import axios from "axios";
import api from "../api/axios";
import { toast } from "react-hot-toast";
import Header from '../components/Header';

export default function BookingPage() {

  const location = useLocation();
  const {
    movie,
    cinema,
    selectedDate,
    showTime,
    selectedSeatLabels,
    totalPrice,
    uniqueMovieSeatIdPrefix
  } = location.state;
  const [handlingFee, setHandlingFee] = useState(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [bookingReference, setBookingReference] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmingBooking, setConfirmingBooking] = useState(false);

  useEffect(() => {
    calculateHandlingFee();
  }, []);

  function calculateHandlingFee() {

    {/* Calculate 10% handling fee */}
    const fee = totalPrice * 0.1;
    setHandlingFee(fee);
  }

  async function sendOtp() {

    setLoading(true);

    try {
      await api.post(
        '/bookings/send-otp',
        {
          email: email
        }
      );
      setOtpSent(true);
      toast.success("OTP sent to your email.!");

    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP.");

    } finally {
      setLoading(false);
    }
  }

  async function verifyOtpAndConfirmBooking() {

    setConfirmingBooking(true);

    try {
      const response = await api.post(
        "/bookings/verify-otp",
        {
          email,
          otp,
          cinema_id: cinema.id,
          movie_id: movie.id,
          selected_date: selectedDate,
          show_time: showTime,
          seats: selectedSeatLabels,
          total_price: totalPrice,
          customer_name: name,
          customer_mobile: mobile
        }
      );
      if (response.data.success) {
        setBookingReference(response.data.booking_reference);
        toast.success("Booking confirmed!");

      } else {
        toast.error(response.data.message + ". Booking failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message + ". Booking failed.");

    } finally {
      setConfirmingBooking(false);
    }
    
  }

  return (

    <div className="min-h-screen bg-secondary py-20">

      <Header />

      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8 mt-10">
        <h2 className="text-2xl font-bold mb-4 text-black">Booking Details</h2>
        <p className="text-md">Movie: {movie.title}</p>
        <p className="text-md">Cinema: {cinema.name}</p>
        <p className="text-md">Date: {selectedDate}</p>
        <p className="text-md">Show Time: {showTime}</p>
        <p className="text-md">Seats: {selectedSeatLabels.join(", ")}</p>
        <br />
        <p className="text-md">Ticket(s) Price: LKR {totalPrice.toFixed(2)}</p>
        <p className="text-md">Booking Fee (10%): LKR {handlingFee.toFixed(2)}</p>
        <br />
        <p className="text-xl font-bold">Amount Payable: LKR {(totalPrice + handlingFee).toFixed(2)}</p>
      </div>

      <div className="max-w-2xl mx-auto p-8">
        <h2 className="text-xl font-bold text-black">Enter Your Details</h2>
      </div>

      <div className="flex justify-center">

        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded mb-4 w-64 bg-white text-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

      </div>

      <div className="flex justify-center">

        <input
          type="text"
          placeholder="Email"
          className="border p-2 rounded mb-4 w-64 bg-white text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

      </div>

      <div className="flex justify-center">

        <input
          type="text"
          placeholder="Mobile Number"
          className="border p-2 rounded mb-4 w-64 bg-white text-black"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
         />

      </div>

      <div className="flex justify-center mt-10">

      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-6 flex flex-col items-center gap-5">

        {/* SEND OTP BUTTON */}
        {!otpSent && (
          <button
            onClick={sendOtp}
            disabled={loading || confirmingBooking || bookingReference}
            className={`
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              font-semibold
              py-3
              rounded-lg
              transition-all
              duration-200

              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }
            `}
          >
            {
              loading
                ? "Sending OTP..."
                : "Send OTP"
            }
          </button>
        )}

        {/* OTP SECTION */}
        {otpSent && !bookingReference && (

          <div className="w-full flex flex-col items-center gap-4">

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="
                w-full
                border
                p-3
                rounded-lg
                text-center
                tracking-widest
                focus:outline-none
                focus:ring-2
                focus:ring-green-500
              "
            />
            <button
                onClick={verifyOtpAndConfirmBooking}
                disabled={loading || confirmingBooking || bookingReference}
                className={`
                w-full
                bg-blue-600
                hover:bg-blue-700
                text-white
                font-semibold
                py-3
                rounded-lg
                transition-all
                duration-200

                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }
              `}
            >
              {
                confirmingBooking
                  ? "Confirming Booking..."
                  : "Verify OTP & Confirm Booking"
              }
            </button>

          </div>
        )}

        {/* SUCCESS SECTION */}
        {bookingReference && (

          <div className="
            w-full
            mt-4
            bg-green-50
            border
            border-green-200
            p-5
            rounded-xl
            text-center
          ">

            <h2 className="text-xl font-bold text-green-700">
              Booking Confirmed 🎉
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Your booking reference is
            </p>

            <p className="text-2xl font-bold tracking-widest text-green-800 mt-2">
              {bookingReference}
            </p>

            <p className="mt-2 text-xs text-gray-600">
              The Booking Confirmation is sent to your email.
              You may produce the booking reference at the cinema for verification.
              Please keep the reference number safe for any future correspondence.
            </p>

          </div>
        )}

      </div>

    </div>

    </div>
    
  );
}