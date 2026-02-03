
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Match } from '../types';
import { subscribeToMatches } from '../services/matchService';

const MatchDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToMatches((matches) => {
      const found = matches.find(m => m.id === id);
      setMatch(found || null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!match) return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold mb-4">Match not found</h2>
      <Link to="/" className="text-blue-500 hover:underline">Back to Home</Link>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Link to="/" className="text-slate-400 hover:text-white flex items-center gap-2 mb-4">
          &larr; Back to Matches
        </Link>
        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col items-center flex-1">
              <img src={match.homeLogo} alt={match.homeTeam} className="w-24 h-24 mb-4 object-contain" />
              <h2 className="text-xl font-bold text-center">{match.homeTeam}</h2>
            </div>
            
            <div className="text-center flex-shrink-0">
                <div className="text-slate-400 uppercase tracking-widest text-sm mb-2">{match.league}</div>
                <div className="text-5xl font-black mb-2">
                    {match.status === 'upcoming' 
                        ? 'VS' 
                        : `${match.score?.home ?? 0} - ${match.score?.away ?? 0}`
                    }
                </div>
                {match.status === 'live' && (
                    <div className="text-red-500 font-bold animate-pulse flex items-center justify-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        LIVE NOW
                    </div>
                )}
            </div>

            <div className="flex flex-col items-center flex-1">
              <img src={match.awayLogo} alt={match.awayTeam} className="w-24 h-24 mb-4 object-contain" />
              <h2 className="text-xl font-bold text-center">{match.awayTeam}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Stream Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-black aspect-video rounded-2xl overflow-hidden shadow-2xl relative border border-slate-700">
            {match.status === 'upcoming' ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-center p-6">
                    <h3 className="text-2xl font-bold mb-2">Broadcast starts soon</h3>
                    <p className="text-slate-400">This match is scheduled for {match.startTime?.toDate().toLocaleString()}</p>
                </div>
            ) : match.status === 'finished' ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-center p-6">
                    <h3 className="text-2xl font-bold mb-2">Match Finished</h3>
                    <p className="text-slate-400">Stream has ended.</p>
                </div>
            ) : (
                <iframe 
                    src={match.streamUrl} 
                    className="w-full h-full border-0" 
                    allowFullScreen
                    title="Match Stream"
                ></iframe>
            )}
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <h3 className="text-xl font-bold mb-4">Match Information</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                    <p className="text-slate-500 uppercase font-bold text-xs mb-1">Status</p>
                    <p className="capitalize">{match.status}</p>
                </div>
                <div>
                    <p className="text-slate-500 uppercase font-bold text-xs mb-1">League</p>
                    <p>{match.league}</p>
                </div>
                <div>
                    <p className="text-slate-500 uppercase font-bold text-xs mb-1">Kickoff</p>
                    <p>{match.startTime?.toDate().toLocaleTimeString()}</p>
                </div>
                <div>
                    <p className="text-slate-500 uppercase font-bold text-xs mb-1">Venue</p>
                    <p>Live Stadium</p>
                </div>
            </div>
          </div>
        </div>

        {/* Ad Sidebar */}
        <div className="space-y-6">
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 text-center">
                <p className="text-xs text-slate-500 mb-2">ADVERTISEMENT</p>
                <div className="bg-slate-700 w-full h-[250px] rounded flex items-center justify-center">
                    <span className="text-slate-500 italic">HilltopAds Banner</span>
                </div>
            </div>
            
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <h4 className="font-bold mb-3 border-b border-slate-700 pb-2">Top Leagues</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                    <li className="hover:text-blue-400 cursor-pointer">Premier League</li>
                    <li className="hover:text-blue-400 cursor-pointer">La Liga</li>
                    <li className="hover:text-blue-400 cursor-pointer">UEFA Champions League</li>
                    <li className="hover:text-blue-400 cursor-pointer">Serie A</li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;
