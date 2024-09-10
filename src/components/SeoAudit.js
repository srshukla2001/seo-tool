import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import 'chart.js/auto';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function SeoAudit() {
    const [url, setUrl] = useState('');
    const [auditResults, setAuditResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('All');

    const handleAudit = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:5000/api/audit', { url });
            setAuditResults(response.data);
        } catch (error) {
            console.error('Error performing SEO audit:', error);
            setError('Failed to perform SEO audit. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredLinks = auditResults?.links.filter((link) => {
        if (filter === 'All') return true;
        return link.status === filter;
    });

    const keywordData = {
        labels: auditResults?.keywords?.map(k => k.keyword) || [],
        datasets: [
            {
                label: 'Occurrences',
                data: auditResults?.keywords?.map(k => k.occurrences) || [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const pageSpeedData = {
        labels: ['Performance', 'Accessibility', 'Largest Contentful Paint', 'Speed Index'],
        datasets: [
            {
                label: 'Scores',
                data: [
                    auditResults?.pageSpeed?.lighthouseResult.categories?.performance?.score * 100 || 0,
                    auditResults?.pageSpeed?.lighthouseResult.audits?.['interactive'].score * 100 || 0,
                    auditResults?.pageSpeed?.lighthouseResult.audits?.['largest-contentful-paint']?.score * 100 || 0,
                    auditResults?.pageSpeed?.lighthouseResult.audits?.['speed-index']?.score * 100 || 0,
                ],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="min-h-screen flex justify-center bg-gray-100">
            <div className="w-full rounded-lg p-6">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">SEO Audit Dashboard</h2>
                <div className="flex flex-col md:flex-row justify-center items-center mb-6">
                    <input
                        type="text"
                        placeholder="Enter URL to audit"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="border border-gray-300 rounded-l-lg py-2 px-4 w-full md:w-2/3 mb-4 md:mb-0"
                    />
                    <button
                        onClick={handleAudit}
                        className={`ml-0 md:ml-2 py-2 px-4 rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Auditing...' : 'Audit URL'}
                    </button>
                </div>
                {error && <div className="text-red-500 text-center mb-6">{error}</div>}
                {loading ? (
                    <div className="mt-6 space-y-4">
                        <div className="bg-white shadow-sm rounded-lg p-4 animate-pulse">
                            <div className="h-4 bg-gray-200 rounded mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded"></div>
                        </div>
                        <div className="bg-white shadow-sm rounded-lg p-4 animate-pulse">
                            <div className="h-4 bg-gray-200 rounded mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                ) : (
                    auditResults && (
                        <div className="mt-6">
                            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Audit Results:</h3>
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-1 bg-white shadow-sm rounded-lg p-4">
                                    <div className="mt-6 mb-6">
                                        <h4 className="text-xl font-semibold mb-2 text-gray-700">Page Preview:</h4>
                                        {auditResults.pagePreview ? (
                                            <img src={`data:image/png;base64,${auditResults.pagePreview}`} alt="Page Preview" className="w-full h-auto border rounded-lg shadow-md" />
                                        ) : (
                                            <p>No preview available.</p>
                                        )}
                                    </div>
                                    <h4 className="text-xl font-semibold mb-2 text-gray-700">Link Status:</h4>
                                    <div className="mb-4 flex justify-between">
                                        <label htmlFor="filter" className="block text-sm font-medium text-gray-700">Filter Links:</label>
                                        <select
                                            id="filter"
                                            value={filter}
                                            onChange={handleFilterChange}
                                            className="mt-1 block border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        >
                                            <option value="All">All</option>
                                            <option value="Reachable">Reachable</option>
                                            <option value="404 Not Found">404 Not Found</option>
                                        </select>
                                    </div>
                                    <div className="flex-1 bg-white shadow-sm rounded-lg p-4">
                                        <h4 className="text-xl font-semibold mb-2 text-gray-700">Link Status:</h4>
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead>
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Link</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {filteredLinks && filteredLinks.map((link, index) => (
                                                    <tr key={index}>
                                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                            <a href={link.link} target="_blank" rel="noopener noreferrer" className={link.status === '404 Not Found' ? 'text-red-500' : 'text-blue-500'}>
                                                                {link.link}
                                                            </a>
                                                        </td>
                                                        <td
                                                            className={`px-6 py-4 text-sm font-medium ${link.status === '404 Not Found' ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-500'
                                                                }`}
                                                        >
                                                            {link.status}
                                                        </td>

                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="flex-1 flex-col bg-white shadow-sm rounded-lg p-4">
                                    <h4 className="text-xl font-semibold mb-2 text-gray-700">Keywords Analysis:</h4>
                                    <Bar data={keywordData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
                                    <div className="mt-6">
                                        <h4 className="text-xl font-semibold mb-2 text-gray-700">Page Speed Scores:</h4>
                                        <Bar data={pageSpeedData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default SeoAudit;
