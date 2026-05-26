export default function Footer() {
  return (
    <footer className="w-full bg-primary border-t border-gray-800 text-gray-300">
      
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Section */}
        <div className="flex flex-col gap-2 text-sm text-center md:text-left">
          
          <p>
            <span className="font-semibold text-white">
              Contact Us:
            </span>{" "}
            <br />
            
            <a
              href="tel:+94775399695"
              className="hover:text-red-400 transition-colors duration-200"
            >
              (+94) 77 539 9695
            </a>
          </p>

          <p>
            <a
              href="mailto:info@cinemax.lk"
              className="hover:text-red-400 transition-colors duration-200"
            >
              matheesha27@gmail.com
            </a>
          </p>

          <p className="text-gray-500 text-xs pt-1">
            Developed by{" "}
            <span className="text-gray-300">
              Matheesha Abeysekera
            </span>
          </p>

        </div>

        {/* Right Section */}
        <div className="text-sm text-gray-500 text-center md:text-right">
          © 2026 CineMax (Pvt.) Ltd.
          <br />
          All rights reserved.
        </div>

      </div>

    </footer>
  );
}