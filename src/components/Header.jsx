import { Link } from "react-router-dom";

export default function Header() {

  return (

    <header className="w-full bg-primary text-white px-6 py-4">

      <div className="flex items-center justify-between">

        <h1 className="text-2xl font-bold">
          CineMax
        </h1>

        <nav className="flex gap-6">

          <Link to="/">Home</Link>

          <Link to="/movie/1">
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