export default function MovieCard({ movie }) {
  return (
    <div className="bg-primary rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition duration-300">
      
      <img
        src={movie.banner_image}
        alt={movie.title}
        className="w-full h-80 object-cover"
      />

      <div className="p-4 text-white">
        
        <h2 className="text-xl font-bold text-white">
          {movie.title}
        </h2>

        <p className="text-gray-300 mt-2 text-sm line-clamp-2">
          {movie.description}
        </p>

        <p className="text-gray-400 mt-3 text-sm">
          Duration: {movie.duration} mins
        </p>

      </div>

    </div>
  );
}