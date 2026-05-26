import Header from '../components/Header';
import Footer from '../components/Footer';

export default function HomePage() {

  return (

    <div className="min-h-screen text-white">

      <Header />

      <main className="flex-1 p-28 bg-secondary">

        <h1 className="text-4xl font-bold">
          Home Page
        </h1>

      </main>

      <Footer />

    </div>
  );
}