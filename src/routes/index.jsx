import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import MoviePage from "../pages/MoviePage";
import SeatSelectionPage from "../pages/SeatSelectionPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/movies/:id" element={<MoviePage />} />

        <Route
          path="/movies/:id/seats"
          element={<SeatSelectionPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}