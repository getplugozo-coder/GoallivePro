
import React, { useEffect, useState } from 'react';
import { Match } from '../types';
import { subscribeToMatches } from '../services/matchService';
import MatchCard from '../components/MatchCard';

const Home: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'live' | 'upcoming' | 'finished'>('all');

  useEffect(() => {
    const unsubscribe = subscribeToMatches((data) => {
      setMatches(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredMatches = matches.filter(m => {
    if (activeTab === 'all') return true;
    return m.status === activeTab;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold text-white tracking-tight">Match Center</h1>
        
        <div className="flex bg-slate-800 p-1 rounded-lg overflow-x-auto whitespace-nowrap">
          {['all', 'live', 'upcoming', 'finished'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-md capitalize transition-all ${
                activeTab === tab 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {filteredMatches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-800/50 rounded-2xl border border-dashed border-slate-700">
          <p className="text-slate-400 text-lg">No matches found for this category.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
