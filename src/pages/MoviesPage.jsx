import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Header from '../components/Header';
import Footer from '../components/Footer';
import MovieCard from '../components/MovieCard';

export default function MoviesPage() {

  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchAllMovies() {

    setLoading(true);
    
    try {
      const response = await axios.get(
        'http://localhost:8000/movies'
      );
      // Get distinct movies by title
      const uniqueMovies = response.data.filter(
        (movie, index, self) =>
          index === self.findIndex(
            (m) => m.title === movie.title
          )
      );
      setMovies(uniqueMovies);
      setFilteredMovies(uniqueMovies);
      console.log('All Movies fetched successfully:', response.data);
      console.log('Unique Movies filtered successfully:', uniqueMovies);

    } catch (error) {
      console.error('Error fetching movies:', error);

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllMovies();
  }, []);

  // Search Handler
  function handleSearch(value) {

    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredMovies(filtered);
  }

  return (

    <div className="min-h-screen flex flex-col bg-secondary text-white">

      <Header />

      {/* Search Bar */}
      <div className="sticky top-20 z-30 bg-secondary px-6 py-4">
        
        <div className="max-w-xl mx-auto">
          
          <input
            type="text"
            placeholder="Search movies..."
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-5 py-3 rounded-xl bg-primary border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

        </div>

      </div>

      {/* Main Content */}
      <main className="flex-1 px-10 pb-10 py-25">

        {loading ? (

          <p className="text-center text-lg mt-10">
            Loading movies...
          </p>

        ) : filteredMovies.length > 0 ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {filteredMovies.map((item) => (
              <MovieCard
                key={item.movieId}
                movie={item}
              />
            ))}

          </div>

        ) : (

          <p className="text-center text-gray-600 text-lg mt-10">
            No movies found
          </p>

        )}

      </main>

      <Footer />

    </div>
  );
}