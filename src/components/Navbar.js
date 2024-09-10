// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">SEO Tools</Link>
        <div>
          <Link to="/keyword-generator" className="mr-4 hover:underline">Keyword Generator</Link>
          <Link to="/seo-audit" className="hover:underline">SEO Audit</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
