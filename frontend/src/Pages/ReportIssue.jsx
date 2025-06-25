import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api';


export default function FormReport() {
  // const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    image: null,
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const { title, description, location } = formData;
    if (!title.trim() || !description.trim() || !location.trim()) {
      setError('All fields except image are required.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  const data = new FormData();
  data.append('title', formData.title.trim());
  data.append('description', formData.description.trim());
  data.append('location', formData.location.trim());
  if (formData.image) data.append('image', formData.image);

  try {
    const token = localStorage.getItem('token'); // or sessionStorage.getItem
    if (!token) {
      setError('You must be logged in to report an issue.');
      return;
    }

    await axios.post('/issues/report-issue', data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    navigate('/get-all-issues'); // Redirect to the issues page after successful submission
  } catch (err) {
    console.error('Error reporting issue:', err.response?.data || err.message);
    setError(err.response?.data?.error || 'Failed to submit issue. Please try again.');
  }
};

  return (
    <div className="min-h-screen mt-15 bg-white flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white border border-gray-200 shadow-md p-8 rounded-xl space-y-5"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-center text-sky-900">Report an Issue</h2>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm px-4 py-2 rounded">
            {error}
          </div>
        )}

        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Title<span className="text-red-500">*</span></label>
          <input
            type="text"
            name="title"
            placeholder="Issue title"
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-300"
            value={formData.title}
            onChange={handleChange}
            required
            maxLength={100}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Description<span className="text-red-500">*</span></label>
          <textarea
            name="description"
            placeholder="Describe the issue"
            rows="4"
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-300 resize-none"
            value={formData.description}
            onChange={handleChange}
            required
            maxLength={1000}
          ></textarea>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Location<span className="text-red-500">*</span></label>
          <input
            type="text"
            name="location"
            placeholder="Enter your locality"
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-300"
            value={formData.location}
            onChange={handleChange}
            required
            maxLength={200}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Image (optional)</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-lime-100 file:text-lime-700 hover:file:bg-lime-200"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-lime-600 text-white py-2 rounded-md hover:bg-lime-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
