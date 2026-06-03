import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (

    <header className="fixed top-0 left-0 right-0 bg-primary shadow-lg z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 sm:px-0 flex items-center justify-between">

        <Link to="/" className="text-3xl font-bold text-white py-4 inline-block">
          CineMax
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-10 text-white text-xl font-medium">
          <Link to="/" className="hover:text-secondary">
            Home
          </Link>

          <Link to="/movies" className="hover:text-secondary">
            Movies
          </Link>

          <Link to="/login" className="hover:text-secondary">
            Login
          </Link>

          <Link to="/about" className="hover:text-secondary">
            About
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-3xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`
            md:hidden
            absolute
            top-full
            left-0
            w-full
            bg-primary
            border-t
            overflow-hidden
            transition-all
            duration-500
            ease-in-out
            ${
              menuOpen
                ? "max-h-96 opacity-100 translate-y-0"
                : "max-h-0 opacity-0 -translate-y-4"
            }
          `}
        >
          <div className="flex flex-col gap-4 py-4 px-6 text-white">

            <Link
              to="/"
              className="py-2 hover:text-secondary"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              to="/movies"
              className="py-2 hover:text-secondary"
              onClick={() => setMenuOpen(false)}
            >
              Movies
            </Link>

            <Link
              to="/login"
              className="py-2 hover:text-secondary"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>

            <Link
              to="/about"
              className="py-2 hover:text-secondary"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>

          </div>
        </div>
      )}

    </header>
  );
}