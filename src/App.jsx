import './App.css'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import MovieOverviewPage from './pages/MovieOverviewPage'
import MoviesPage from './pages/MoviesPage'
import SeatSelectionPage from './pages/SeatSelectionPage'

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
          <Route path="/seat-selection/:seatId" element={<SeatSelectionPage />}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App