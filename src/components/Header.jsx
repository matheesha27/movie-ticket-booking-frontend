import { Link } from "react-router-dom";

export default function Header() {

  return (

    <header className="fixed top-0 left-0 w-full bg-primary text-accent px-10 py-1">

      <div className="flex items-center justify-between">

        <h1 className="text-2xl font-bold text-accent">
          CineMax
        </h1>

        <nav className="flex gap-12">

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