import { Link } from "react-router-dom";

export default function Header() {

  return (

    <header className="fixed top-0 left-0 w-full h-25 bg-primary px-10 py-1">

      <div className="flex items-center justify-between">

        <h1 className="text-2xl font-bold">
          CineMax
        </h1>

        <nav className="flex gap-12 text-white text-lg">

          <Link to="/">Home</Link>

          <Link to="/movies">
            Movies
          </Link>

          <Link to="/login">
            Login
          </Link>

        </nav>

      </div>

    </header>
  );
}