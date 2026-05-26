import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Header from '../components/Header';
import Footer from '../components/Footer';
import MovieCard from '../components/MovieCard';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchAllMovies() {
    setLoading(true);

    try {
      const response = await axios.get(
        'http://localhost:8000/movies'
      );
      setMovies(response.data);
      console.log('Movies fetched successfully:', response.data);

    } catch (error) {
      console.error('Error fetching movies:', error);

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllMovies();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-secondary text-white">
      
      <Header />

      <main className="flex-1 p-28">
        
        {loading ? (
          <p className="text-center text-lg">
            Loading movies...
          </p>
        ) : movies.length > 0 ? (
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((item) => (
              <MovieCard
                key={item.movieId}
                movie={item}
              />
            ))}
          </div>

        ) : (
          <p className="text-center text-gray-400 text-lg mt-10">
            No movies found
          </p>
        )}

      </main>

      <Footer />

    </div>
  );
}