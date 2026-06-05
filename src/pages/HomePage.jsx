import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

export default function HomePage() {

  const navigate = useNavigate();
  const [movieBanners, setMovieBanners] = useState([]);

  useEffect(() => {
    fetchMovieBanners();
  }, []);

  async function fetchMovieBanners() {

    try {
      const response = await api.get(
        '/movies/banners'
      );
      setMovieBanners(response.data);
      console.log("Movie banners fetched successfully:", response.data);

    } catch (error) {
      console.error("Error fetching movie banners:", error);
    }
  }

  return (
    <div className="min-h-screen bg-secondary text-white overflow-hidden">

      <Header />

      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center justify-center">

        {/* Background Glow */}
        <div className="absolute inset-0 overflow-hidden">

          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 12
            }}
            className="
              absolute
              w-96
              h-96
              bg-blue-500/20
              rounded-full
              blur-3xl
              top-10
              left-10
            "
          />

          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 15
            }}
            className="
              absolute
              w-96
              h-96
              bg-purple-500/20
              rounded-full
              blur-3xl
              bottom-10
              right-10
            "
          />

        </div>

        <div className="relative z-10 text-center max-w-4xl px-6">

          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-7xl font-bold text-black leading-tight"
          >
            Book Movie Tickets
            <span className="block text-blue-600">
              In Seconds
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-xl text-primary font-medium"
          >
            Choose your movie, select your seats,
            verify by email and enjoy the show.
          </motion.p>

          <motion.button
            whileHover={{
              scale: 1.08
            }}
            whileTap={{
              scale: 0.95
            }}
            onClick={() => navigate("/movies")}
            className="
              mt-10
              px-8
              py-4
              bg-blue-600
              rounded-xl
              font-semibold
              text-lg
              hover:bg-blue-700
              cursor-pointer
              transition-all
              duration-100
            "
          >
            Browse Movies
          </motion.button>

        </div>

      </section>

      {/* FEATURES */}
      <section className="py-0 px-10">

        <h2 className="text-4xl font-bold text-center text-primary mb-14">
          Why Choose Us?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {[
            {
              icon: "🎟️",
              title: "Easy Booking",
              text: "Book tickets in a few clicks."
            },
            {
              icon: "💺",
              title: "Live Seat Selection",
              text: "See available seats instantly."
            },
            {
              icon: "📧",
              title: "Instant Confirmation",
              text: "Receive booking confirmation immediately."
            }
          ].map((feature, index) => (

            <motion.div
              key={index}
              whileHover={{
                y: -10,
                scale: 1.03
              }}
              className="
                bg-blue-700/90
                backdrop-blur-sm
                rounded-2xl
                p-8
                text-center
                shadow-lg
                mt-6
              "
            >
              <div className="text-5xl">
                {feature.icon}
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                {feature.title}
              </h3>

              <p className="mt-3 text-gray-300">
                {feature.text}
              </p>

            </motion.div>

          ))}

        </div>

      </section>

      {/* MOVING POSTERS */}
      <section className="py-10 overflow-hidden">

        <h2 className="text-4xl font-bold text-center text-primary mb-10">
          Now Showing...
        </h2>

        <motion.div
          animate={{
            x: ["0%", "-50%"]
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear"
          }}
          className="flex gap-6 w-max mt-6"
        >
          {[...movieBanners, ...movieBanners].map((movie, index) => (

            <div
              key={`${movie.id}-${index}`}
              className="relative"
            >
              <img
                src={movie.banner_image}
                alt={movie.title}
                className="
                  w-56
                  h-80
                  object-cover
                  rounded-xl
                  shadow-xl
                "
              />

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  bg-black/70
                  text-white
                  text-center
                  py-2
                  rounded-b-xl
                "
              >
                {movie.title}
              </div>
            </div>

          ))}
        </motion.div>

      </section>

      <Footer />

    </div>
  );
}