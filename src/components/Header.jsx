import { Link } from "react-router-dom";

export default function Header() {

  return (

    <header className="fixed top-0 left-0 w-full h-25 bg-primary px-10 py-1 z-1">

      <div className="flex items-center justify-between h-full">

        <h1 className="text-2xl font-bold text-white">
          CineMax
        </h1>

        <nav className="flex gap-12 text-white text-lg">

          <Link to="/" className="hover:text-secondary">
            Home
          </Link>

          <Link to="/movies" className="hover:text-secondary">
            Movies
          </Link>

          <Link to="/login" className="hover:text-secondary">
            Login
          </Link>

        </nav>

      </div>

    </header>
  );
}