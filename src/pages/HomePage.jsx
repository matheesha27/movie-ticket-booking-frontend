import Header from '../components/Header';
import Footer from '../components/Footer';

export default function HomePage() {

  return (

    <div className="min-h-screen bg-secondary text-white">

      <Header />

      <main className="p-28">

        <h1 className="text-4xl font-bold">
          Home Page
        </h1>

      </main>

      <Footer />

    </div>
  );
}