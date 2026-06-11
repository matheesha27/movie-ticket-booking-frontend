import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/loader";

import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function login() {

    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setIsLoading(true);

      // Login API call here

      toast.success("Login successful");

      navigate("/");

    } catch (error) {

      console.error(error);

      toast.error(
        error?.response?.data?.detail ||
        "Login failed"
      );

    } finally {

      setIsLoading(false);

    }
  }

  return (
    <div className="min-h-screen bg-secondary text-white flex flex-col">

      <Header />

      <main className="flex-1 flex items-center justify-center px-6 py-10">

        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE */}
          <div className="hidden lg:flex flex-col justify-center items-center text-center">

            <Link to="/" className="text-8xl font-bold text-primary py-4 inline-block">
              CineMax
            </Link>

            <h1 className="text-xl font-bold text-primary mt-6">
              Admin Login
            </h1>

            <p className="text-xl text-primary/80 font-semibold mt-5 max-w-lg italic leading-relaxed">
              Administrator access only. Please login with your admin credentials to manage movies, bookings, and users.
            </p>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex justify-center">

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="
                w-full
                max-w-md
                bg-white/10
                backdrop-blur-xl
                border border-white/20
                rounded-3xl
                shadow-xl
                p-8
                mt-20
              "
            >

              <h1 className="text-4xl font-bold text-center text-primary">
                Welcome Back
              </h1>

              <p className="text-center text-primary mt-2 mb-8">
                Sign in to your account
              </p>

              {/* EMAIL */}
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full
                  h-12
                  px-4
                  rounded-xl
                  bg-white/10
                  border border-white/20
                  text-white
                  placeholder-gray-400
                  focus:outline-none
                  focus:ring-2
                  focus:ring-accent
                  mt-4
                  mb-4
                "
              />

              {/* PASSWORD */}
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                  w-full
                  h-12
                  px-4
                  rounded-xl
                  bg-white/10
                  border border-white/20
                  text-white
                  placeholder-gray-400
                  focus:outline-none
                  focus:ring-2
                  focus:ring-accent
                "
              />

              <div className="flex justify-end mt-3 mb-6">

                <Link
                  to="/forgot-password"
                  className="
                    text-primary
                    text-sm
                    font-semibold
                    hover:underline
                  hover:text-blue-700
                  "
                >
                  Forgot Password?
                </Link>

              </div>

              <button
                onClick={login}
                disabled={isLoading}
                className="
                  w-full
                  h-12
                  rounded-xl
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  font-bold
                  cursor-pointer
                  transition-all
                  duration-200
                  hover:scale-[1.02]
                  hover:shadow-lg
                  disabled:opacity-60
                "
              >
                {isLoading ? "Logging In..." : "Login"}
              </button>

              {/* REGISTER */}
              <div className="mt-6 text-center">

                <span className="text-gray-primary text-sm text-primary font-medium">
                  Don't have an account?
                </span>

                <Link
                  to="/register"
                  className="
                    ml-2
                    text-primary
                    text-sm
                    font-semibold
                    hover:underline
                    hover:text-blue-700
                  "
                >
                  Sign Up
                </Link>

              </div>

            </motion.div>

          </div>

        </div>

        {isLoading && <Loader />}

      </main>

      <Footer />

    </div>
  );
}