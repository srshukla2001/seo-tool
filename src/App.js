// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import KeywordGenerator from './pages/KeywordGenerator';
import SeoAuditPage from './pages/SeoAuditPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/keyword-generator" element={<KeywordGenerator />} />
        <Route path="/seo-audit" element={<SeoAuditPage />} />
      </Routes>
    </Router>
  );
}

export default App;
