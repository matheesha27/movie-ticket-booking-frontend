import './App.css'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import MoviePage from './pages/MoviePage'
import SeatSelectionPage from './pages/SeatSelectionPage'

function App() {

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <div className="w-full min-h-screen bg-primary">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/movie" element={<MoviePage />} />
          <Route
            path="/seat-selection"
            element={<SeatSelectionPage />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App