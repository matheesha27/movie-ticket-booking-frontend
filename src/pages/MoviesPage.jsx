import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen text-white">
    
          <Header />
    
          <main className="p-28 bg-secondary">
    
            <h1 className="text-4xl font-bold">
              All Movies Page
            </h1>
    
          </main>
    
          <Footer />
    
        </div>
  );
}
