import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function LoginPage() {

  return (
    <div className="min-h-screen bg-secondary text-white flex flex-col">

      <Header />

      <main className="flex-1 flex items-center justify-center px-6">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 30 }}
          transition={{ duration: 0.6 }}
          className="
            bg-primary
            p-10
            rounded-2xl
            shadow-2xl
            text-center
            max-w-lg
            w-full
          "
        >
          <div className="text-6xl mb-4">🚧</div>

          <h1 className="text-4xl font-bold mb-4">
            About Us
          </h1>

          <p className="text-gray-300 text-lg">
            This page is currently under development.
          </p>

          <p className="text-gray-400 mt-2">
            Please check back soon.
          </p>
        </motion.div>

      </main>

      <Footer />

    </div>
  );
}