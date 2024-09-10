// src/pages/Home.js
import React from 'react';
import Navbar from '../components/Navbar';

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Welcome to SEO Tools</h1>
        <p className="text-gray-600">
          Use our tools to enhance your SEO strategy. Navigate to the keyword generator or SEO audit tool using the menu above.
        </p>
      </div>
    </div>
  );
}

export default Home;
