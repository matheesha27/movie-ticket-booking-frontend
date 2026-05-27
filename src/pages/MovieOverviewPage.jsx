import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MovieCard from '../components/MovieCard';

export default function MovieOverviewPage() {

  const location = useLocation();
  const navigate = useNavigate();
  const movieFromState = location.state?.movie; // Access the movie object (single) passed via state
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState(null);

  return (

    <div className="min-h-screen flex flex-col bg-secondary text-white">

      <Header />

      {/* Main Content */}
      <main className="flex-1 px-6 lg:px-12 py-28">

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* LEFT SIDE - TRAILER */}
          <div className="w-full">

            <div className="rounded-lg overflow-hidden shadow-2xl bg-black">
              
              <video
                controls
                className="w-full h-125 object-cover"
              >
                <source
                  src={movieFromState.trailer}
                  type="video/mp4"
                />
              </video>

            </div>

          </div>

          {/* RIGHT SIDE - MOVIE DETAILS */}
          <div className="flex flex-col justify-center h-full">

            {/* Movie Title */}
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-black mb-5">
              {movieFromState.title}
            </h1>

            {/* Movie Meta Info */}
            <div className="flex flex-wrap items-center gap-3 mb-6">

              <span
                className="
                  bg-primary/90
                  backdrop-blur-sm
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  font-medium
                  text-white
                  shadow-md
                "
              >
                {movieFromState.category}
              </span>

              <span
                className="
                  bg-primary/50
                  border
                  border-primary/40
                  backdrop-blur-sm
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  font-medium
                  text-white
                "
              >
                ⏱ {movieFromState.duration} mins
              </span>

            </div>

            {/* Description */}
            <p
              className="
                text-black/90
                text-base
                text-justify
                font-semibold
                lg:text-md
                leading-relaxed
                max-w-2xl
              "
            >
              {movieFromState.description}
            </p>

            <div className="mt-8">
              <button onClick={() => navigate("/movies/cinemas/" + movieFromState.id, { state: { movie: movieFromState } })}
                className="
                  bg-red-600
                  hover:bg-red-700
                  text-white
                  px-8
                  py-4
                  rounded-xl
                  text-lg
                  font-semibold
                  shadow-xl
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:shadow-red-500/30
                "
              >
                🎟 Book Tickets
              </button>
            </div>

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
}
