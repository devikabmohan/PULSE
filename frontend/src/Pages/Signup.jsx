import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from '../services/api';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/signup', form);
      alert('Signup successful!');
      navigate('/')
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow">
      <h2 className="text-2xl mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="input" />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="input" />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="input" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Sign Up</button>
      </form>
      <h3>Already have an account? <b><Link to='/login'>Login</Link></b></h3>
      
    </div>
  );
}
