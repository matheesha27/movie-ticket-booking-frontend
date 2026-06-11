import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-secondary text-primary flex flex-col">

      <Header />

      <main className="flex-1 pt-28 pb-16 px-6 lg:px-16">

        <div className="max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-primary mb-4">
              About Us
            </h1>

            <p className="text-xl text-primary max-w-3xl mx-auto">
              Delivering modern, reliable and scalable software solutions
              powered by cutting-edge technologies.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">

            <div className="bg-white/60 backdrop-blur rounded-3xl p-8 border border-white/10">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Our Platform
              </h2>

              <p className="text-primary leading-relaxed">
                This platform is designed to provide users with a seamless,
                secure and intuitive experience. The application focuses on
                performance, reliability and user satisfaction while utilizing
                modern web technologies and scalable architecture.
              </p>

              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">
                  Key Features
                </h3>

                <ul className="space-y-2 text-primary">
                  <li>🎟️ Online Booking System</li>
                  <li>⚡ Real-Time Availability</li>
                  <li>🔒 Secure Authentication</li>
                  <li>📧 Automated Notifications</li>
                  <li>📱 Responsive User Interface</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur rounded-3xl p-8 border border-white/10">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Technology Stack
              </h2>

              <div className="grid grid-cols-2 gap-3 mt-6">

                {[
                  "React",
                  "Vite",
                  "FastAPI",
                  "PostgreSQL",
                  "Tailwind CSS",
                  "JWT",
                  "Axios",
                  "SQLAlchemy",
                  "Python",
                  "REST APIs",
                ].map((tech) => (
                  <div
                    key={tech}
                    className="bg-blue-600 border border-blue-500 rounded-xl p-3 text-center text-white font-medium shadow-md"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="bg-white/60 backdrop-blur rounded-3xl p-8 border border-white/10">

            <h2 className="text-3xl font-bold text-primary mb-6">
              Meet The Developer
            </h2>

            <div className="grid lg:grid-cols-3 gap-8 mt-6 items-center">

              <div className="flex justify-center">
                <div className="w-56 h-56 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-7xl">
                  👨‍💻
                </div>
              </div>

              <div className="lg:col-span-2">

                <h3 className="text-xl font-bold mb-3">
                  Matheesha Abeysekera
                </h3>

                <p className="text-primary leading-relaxed mb-4">
                  Software Engineer specializing in modern web application
                  development, backend systems, database design and scalable
                  software architecture. Passionate about building reliable,
                  high-performance applications that deliver exceptional user
                  experiences.
                </p>

                <div className="grid md:grid-cols-2 gap-4 mt-6">

                  <div>
                    <h4 className="font-semibold text-primary mb-2">
                      Expertise
                    </h4>

                    <ul className="space-y-1 text-primary">
                      <li>React Development</li>
                      <li>FastAPI Development</li>
                      <li>Spring Boot Development</li>
                      <li>PostgreSQL/MySQL/MongoDB Databases</li>
                      <li>REST API Design</li>
                      <li>Authentication Systems</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-primary mb-2">
                      Special Interests
                    </h4>

                    <ul className="space-y-1 text-primary">
                      <li>Microservices</li>
                      <li>System Design</li>
                      <li>Scalable Architectures</li>
                      <li>Data Structures & Algorithms</li>
                      <li>Cloud Deployment</li>
                      <li>Performance Optimization</li>
                    </ul>
                  </div>

                </div>

              </div>

            </div>

          </div>

          <div className="mt-16 text-center">

            <h2 className="text-3xl font-bold text-primary mb-4">
              Our Mission
            </h2>

            <p className="text-primary max-w-4xl mx-auto text-lg leading-relaxed">
              To create innovative digital solutions that are reliable,
              scalable and user-focused while maintaining the highest standards
              of software engineering excellence.
            </p>

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
}