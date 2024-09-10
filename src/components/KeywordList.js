import React from 'react';

function KeywordList({ keywords }) {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-200">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Suggested Keywords:</h3>
      <p className="text-gray-600 whitespace-pre-wrap">{keywords}</p>
    </div>
  );
}

export default KeywordList;
