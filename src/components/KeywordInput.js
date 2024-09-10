import React, { useState } from 'react';

function KeywordInput({ onGenerate }) {
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    onGenerate(topic, description);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Generate Keywords</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows="4"
        ></textarea>
      </div>
      <button
        onClick={handleSubmit}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Generate Keywords
      </button>
    </div>
  );
}

export default KeywordInput;
