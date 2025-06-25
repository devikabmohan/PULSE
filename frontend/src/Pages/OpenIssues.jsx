import { useEffect, useState } from 'react';
import axios from '../services/api'; // make sure baseURL is set in api.js

export default function ViewIssues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // let issues =[]

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get('/issues/get-all-issues');
        // issues.push(response.data); // Assuming response.data is an array of issues
        setIssues(response.data);
      } catch (err) {
        setError('Failed to fetch issues.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen mt-35">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Reported Issues</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {issues.map((issue) => (
          <div key={issue._id} className="bg-white p-5 rounded-xl shadow-md">
            {issue.imageURL && (
              <img
                src={`http://localhost:5000/uploads/${issue.imageURL}`}
                alt="Issue"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{issue.title}</h2>
            <p className="text-gray-600 mb-1"><span className="font-medium">Description:</span> {issue.description}</p>
            <p className="text-gray-600 mb-1"><span className="font-medium">Location:</span> {issue.location}</p>
            <p className="text-sm mt-2">
              <span className="font-semibold text-gray-700">Status:</span>{' '}
              <span className={`px-2  rounded text-white ${
                issue.status === 'open'
                  ? 'bg-red-500'
                  : issue.status === 'in progress'
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              }`}>
                {issue.status}
              </span>
            </p>
            <p className="text-sm text-gray-500 mt-1">Reported by: {issue.createdBy?.name || 'Anonymous'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
