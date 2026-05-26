import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MovieCard from '../components/MovieCard';

export default function MovieOverviewPage({ movieId }) {

  const location = useLocation();
  const movieFromState = location.state?.movie;
  console.log('MovieOverviewPage received movie from location state:', movieFromState);

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

            <div className="rounded-2xl overflow-hidden shadow-2xl bg-black">
              
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

          {/* RIGHT SIDE - DETAILS */}
          <div className="flex flex-col justify-center">

            <h1 className="text-4xl lg:text-5xl font-bold mb-5">
              {movieFromState.title}
            </h1>

            {/* Movie Info */}
            <div className="flex flex-wrap gap-3 mb-6">

              <span className="bg-primary px-4 py-2 rounded-full text-sm text-gray-200">
                {movieFromState.category}
              </span>

              <span className="bg-primary px-4 py-2 rounded-full text-sm text-gray-200">
                {movieFromState.duration} mins
              </span>

            </div>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed text-lg mb-8">
              {movieFromState.description}
            </p>

            {/* Button */}
            <button
              className="
                bg-red-600
                hover:bg-red-700
                transition-all
                duration-300
                px-8
                py-4
                rounded-xl
                text-lg
                font-semibold
                shadow-lg
                hover:scale-105
                w-fit
              "
            >
              Book Tickets
            </button>

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
}
