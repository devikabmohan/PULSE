import { useState } from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import axios from '../services/api';


export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container h-100 w-screen flex justify-center items-center">
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="input" />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="input" />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">Login</button>
      </form>
      <h3 className='pt-1'>Don't have an account? <span><Link to='/signup' >Join Now</Link></span></h3>
    </div>
    </div>
  );
}
