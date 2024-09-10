import React from 'react';

function CopyButton({ text }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    alert('Keywords copied to clipboard!');
  };

  return (
    <button
      onClick={copyToClipboard}
      className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      Copy Keywords
    </button>
  );
}

export default CopyButton;
