
import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { Match, MatchStatus } from '../types';
import { subscribeToMatches, addMatch, updateMatch, deleteMatch, createTimestamp } from '../services/matchService';

const AdminDashboard: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({
    homeTeam: '',
    awayTeam: '',
    homeLogo: '',
    awayLogo: '',
    league: '',
    startTime: '',
    status: 'upcoming',
    streamUrl: '',
    score: { home: 0, away: 0 }
  });

  useEffect(() => {
    const unsubscribe = subscribeToMatches(setMatches);
    return () => unsubscribe();
  }, []);

  const handleLogout = () => signOut(auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      startTime: createTimestamp(new Date(formData.startTime)),
      score: {
        home: parseInt(formData.score.home),
        away: parseInt(formData.score.away)
      }
    };

    try {
      if (editingId) {
        await updateMatch(editingId, data);
      } else {
        await addMatch(data);
      }
      resetForm();
    } catch (err) {
      alert('Error saving match');
    }
  };

  const resetForm = () => {
    setFormData({
      homeTeam: '',
      awayTeam: '',
      homeLogo: '',
      awayLogo: '',
      league: '',
      startTime: '',
      status: 'upcoming',
      streamUrl: '',
      score: { home: 0, away: 0 }
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const startEdit = (match: Match) => {
    setEditingId(match.id);
    setIsAdding(true);
    setFormData({
      ...match,
      startTime: match.startTime.toDate().toISOString().slice(0, 16),
      score: match.score || { home: 0, away: 0 }
    });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this match?')) {
      await deleteMatch(id);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-10 bg-slate-800 p-6 rounded-2xl border border-slate-700">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-slate-400 text-sm">Real-time Global Sync Enabled</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-bold transition-colors"
          >
            + New Match
          </button>
          <button 
            onClick={handleLogout}
            className="bg-slate-700 hover:bg-slate-600 px-6 py-2 rounded-lg font-bold transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 w-full max-w-2xl my-8">
            <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit Match' : 'Add New Match'}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Home Team</label>
                  <input required value={formData.homeTeam} onChange={e => setFormData({...formData, homeTeam: e.target.value})} className="admin-input" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Home Logo URL</label>
                  <input required value={formData.homeLogo} onChange={e => setFormData({...formData, homeLogo: e.target.value})} className="admin-input" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Score (Home)</label>
                  <input type="number" value={formData.score.home} onChange={e => setFormData({...formData, score: {...formData.score, home: e.target.value}})} className="admin-input" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Away Team</label>
                  <input required value={formData.awayTeam} onChange={e => setFormData({...formData, awayTeam: e.target.value})} className="admin-input" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Away Logo URL</label>
                  <input required value={formData.awayLogo} onChange={e => setFormData({...formData, awayLogo: e.target.value})} className="admin-input" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Score (Away)</label>
                  <input type="number" value={formData.score.away} onChange={e => setFormData({...formData, score: {...formData.score, away: e.target.value}})} className="admin-input" />
                </div>
              </div>

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-1">League</label>
                  <input required value={formData.league} onChange={e => setFormData({...formData, league: e.target.value})} className="admin-input" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Start Time</label>
                  <input type="datetime-local" required value={formData.startTime} onChange={e => setFormData({...formData, startTime: e.target.value})} className="admin-input" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="admin-input">
                    <option value="upcoming">Upcoming</option>
                    <option value="live">Live</option>
                    <option value="finished">Finished</option>
                  </select>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-1">Stream URL (Iframe Embed)</label>
                <input required value={formData.streamUrl} onChange={e => setFormData({...formData, streamUrl: e.target.value})} className="admin-input" placeholder="https://..." />
              </div>

              <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                <button type="button" onClick={resetForm} className="px-6 py-2 bg-slate-700 rounded-lg hover:bg-slate-600">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 font-bold">Save Match</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-slate-900/50 text-slate-400 text-sm uppercase">
            <tr>
              <th className="p-4">Match</th>
              <th className="p-4">Status</th>
              <th className="p-4">Time</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {matches.map(m => (
              <tr key={m.id} className="hover:bg-slate-700/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="font-bold">{m.homeTeam}</span>
                    <span className="text-slate-500 font-normal">vs</span>
                    <span className="font-bold">{m.awayTeam}</span>
                  </div>
                  <div className="text-xs text-slate-500">{m.league}</div>
                </td>
                <td className="p-4">
                   <span className={`text-xs px-2 py-1 rounded-full font-bold uppercase ${
                     m.status === 'live' ? 'bg-red-500/10 text-red-500 animate-pulse' :
                     m.status === 'upcoming' ? 'bg-blue-500/10 text-blue-500' :
                     'bg-slate-700 text-slate-400'
                   }`}>
                     {m.status}
                   </span>
                </td>
                <td className="p-4 text-slate-400 text-sm">
                  {m.startTime.toDate().toLocaleString()}
                </td>
                <td className="p-4 text-right flex justify-end gap-3">
                  <button onClick={() => startEdit(m)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(m.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-all">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .admin-input {
          width: 100%;
          background: #0f172a;
          border: 1px solid #334155;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          color: white;
          outline: none;
        }
        .admin-input:focus {
          border-color: #3b82f6;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
