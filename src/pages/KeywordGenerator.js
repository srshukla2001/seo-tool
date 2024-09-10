// src/pages/KeywordGenerator.js
import React, { useState } from 'react';
import KeywordInput from '../components/KeywordInput';
import KeywordList from '../components/KeywordList';
import CopyButton from '../components/CopyButton';
import { generateKeywords } from '../services/openaiService';
import Navbar from '../components/Navbar';

function KeywordGenerator() {
  const [keywords, setKeywords] = useState('');

  const handleGenerate = async (topic, description) => {
    const generatedKeywords = await generateKeywords(topic, description);
    setKeywords(generatedKeywords);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar/>
      <div className="container mx-auto p-6">
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 mb-8">
          <KeywordInput onGenerate={handleGenerate} />
        </div>
        {keywords && (
          <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 mb-8">
            <KeywordList keywords={keywords} />
            <div className="mt-4">
              <CopyButton text={keywords} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default KeywordGenerator;
