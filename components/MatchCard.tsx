
import React from 'react';
import { Link } from 'react-router-dom';
import { Match } from '../types';

interface Props {
  match: Match;
}

const MatchCard: React.FC<Props> = ({ match }) => {
  const isLive = match.status === 'live';
  
  return (
    <Link 
      to={`/match/${match.id}`}
      className="match-card bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-xl block hover:border-blue-500/50"
    >
      <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{match.league}</span>
        {isLive && (
          <span className="flex items-center gap-1.5 bg-red-500/10 text-red-500 px-2.5 py-1 rounded-full text-xs font-bold animate-pulse">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            LIVE
          </span>
        )}
        {match.status === 'upcoming' && (
           <span className="bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-full text-xs font-bold">
            UPCOMING
          </span>
        )}
        {match.status === 'finished' && (
           <span className="bg-slate-700 text-slate-400 px-2.5 py-1 rounded-full text-xs font-bold">
            FINISHED
          </span>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col items-center flex-1">
            <img src={match.homeLogo} alt={match.homeTeam} className="w-14 h-14 object-contain mb-3" />
            <span className="text-sm font-semibold text-center line-clamp-1">{match.homeTeam}</span>
          </div>
          
          <div className="flex flex-col items-center">
            {isLive || match.status === 'finished' ? (
              <div className="text-3xl font-black text-white tabular-nums">
                {match.score?.home ?? 0} : {match.score?.away ?? 0}
              </div>
            ) : (
              <div className="text-sm font-bold text-blue-400">
                {match.startTime?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            )}
            <div className="text-[10px] text-slate-500 mt-1">
                {match.startTime?.toDate().toLocaleDateString()}
            </div>
          </div>

          <div className="flex flex-col items-center flex-1">
            <img src={match.awayLogo} alt={match.awayTeam} className="w-14 h-14 object-contain mb-3" />
            <span className="text-sm font-semibold text-center line-clamp-1">{match.awayTeam}</span>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-3 bg-slate-900/50 text-center">
        <span className="text-blue-500 text-sm font-semibold hover:underline">Watch Match &rarr;</span>
      </div>
    </Link>
  );
};

export default MatchCard;
