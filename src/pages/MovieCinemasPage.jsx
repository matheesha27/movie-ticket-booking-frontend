import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MovieCard from '../components/MovieCard';

export default function MovieCinemasPage() {

  const location = useLocation();
  const navigate = useNavigate();
  const movieFromState = location.state?.movie;
  const [cinemas, setCinemas] = useState([]);
  const [showTimes, setShowTimes] = useState({});
  const [loading, setLoading] = useState(false);

  console.log("Movie Cinemas Page - Movie from state:", movieFromState);

  async function fetchMovieCinemas() {

    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8000/movies/cinemas/',
        {
          movie_title: movieFromState.title
        }
      );
      setCinemas(response.data);
      // console.log('Cinemas fetched successfully:', response.data);

    } catch (error) {
      console.error('Error fetching cinemas:', error);

    } finally {
      setLoading(false);
    }
  }

  async function getShowTime(cinemaId, movieTitle) {

    setLoading(true);
    try {
        const response = await axios.post(
                'http://localhost:8000/movies/showtime',
        {
            cinema_id: cinemaId,
            movie_title: movieTitle
        });

        setShowTimes(prev => ({
            ...prev,
            [cinemaId]: response.data.show_time
        }));

    } catch (error) {
      console.error('Error fetching show time:', error);
      return 'Show time not available';

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMovieCinemas();
  }, []);

  useEffect(() => {
    if (cinemas.length > 0) {
        cinemas.forEach((cinema) => {
        getShowTime(cinema.id, movieFromState.title);
        });
    }
  }, [cinemas]);

  return (

    <div className="min-h-screen flex flex-col bg-secondary text-white">

      <Header />

      {/* Main Content */}
      <main className="flex-1 px-6 lg:px-12 py-28">

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* LEFT SIDE - BANNER */}
          <div className="w-full">

            <div className="rounded-lg overflow-hidden shadow-2xl bg-black">
              
              <img src={movieFromState.banner_image} alt={movieFromState.title} className="w-full h-125 object-cover" />

            </div>

          </div>

          {/* RIGHT SIDE - MOVIE DETAILS */}
          <div className="flex flex-col justify-center h-full">

            {/* Movie Title */}
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-black mb-5">
              {movieFromState.title}
            </h1>

            <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight text-black mb-5">
              Now Showing in Theaters...
            </h2>

            {/* Movie Meta Info */}
            <div className="flex flex-col gap-4 mb-6">

              {loading ? (

                <p className="text-black">Loading cinemas...</p>

              ) : cinemas.length > 0 ? (

                cinemas.map((cinema, index) => (

                  <div
                    key={index}
                    onClick={() =>
                      navigate('/seat-selection', {
                        state: {
                            movie: movieFromState,
                            cinema: cinema,
                            showTime: showTimes[cinema.id]
                        }
                        })
                    }
                    className="
                      cursor-pointer
                      bg-white
                      text-black
                      rounded-xl
                      p-5
                      shadow-lg
                      hover:scale-102
                      hover:bg-red-600
                      hover:text-white
                      transition-all
                      duration-300
                    "
                  >

                    <h3 className="text-2xl font-bold">
                      {cinema.name}
                    </h3>

                    <p className="text-lg">
                      {cinema.city}
                    </p>

                    <p className="mt-2 font-semibold">
                      🕒 Show Time: {showTimes[cinema.id] || "Loading..."}
                    </p>

                  </div>

                ))

              ) : (
                <p className="text-black">No cinemas available.</p>
              )}

            </div>

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
}
