
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-500/20">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
          </div>
          <span className="text-xl font-black tracking-tighter uppercase">Goal<span className="text-blue-500">live</span> Pro</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-semibold hover:text-blue-500 transition-colors">Home</Link>
          <a href="#" className="text-sm font-semibold hover:text-blue-500 transition-colors">Schedule</a>
          <a href="#" className="text-sm font-semibold hover:text-blue-500 transition-colors">Live Score</a>
          <a href="#" className="text-sm font-semibold hover:text-blue-500 transition-colors">Highlights</a>
        </div>

        <button className="md:hidden p-2 text-slate-400">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
           </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
