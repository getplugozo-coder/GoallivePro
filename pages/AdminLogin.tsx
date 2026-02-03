
import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) return <Navigate to="/admin-goallive-pro/dashboard" replace />;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin-goallive-pro/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700">
        <h2 className="text-3xl font-bold text-center mb-8">Admin Access</h2>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Admin Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin@goallivepro.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2">Secret Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Secure Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
