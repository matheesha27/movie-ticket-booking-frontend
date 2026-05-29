import './App.css'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import MovieOverviewPage from './pages/MovieOverviewPage'
import MoviesPage from './pages/MoviesPage'
import SeatSelectionPage from './pages/SeatSelectionPage'
import MovieCinemasPage from './pages/MovieCinemasPage'
import BookingPage from './pages/BookingPage'
import AboutPage from './pages/AboutPage';

function App() {

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <div className="w-full min-h-screen bg-green-500">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieOverviewPage />} />
          <Route path="/seat-selection" element={<SeatSelectionPage />}/>
          <Route path="/movies/cinemas/:movieId" element={<MovieCinemasPage />}/>
          <Route path="/booking" element={<BookingPage />}/>
          <Route path="/about" element={<AboutPage />}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App