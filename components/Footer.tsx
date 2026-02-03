
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-black uppercase mb-4">Goal<span className="text-blue-500">live</span> Pro</h3>
            <p className="text-slate-500 text-sm max-w-md leading-relaxed">
              The world's leading professional platform for high-quality live football streaming. 
              Watch your favorite teams from every major league across the globe in HD.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="text-sm text-slate-500 space-y-2">
              <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
              <li className="hover:text-white cursor-pointer transition-colors">Contact Us</li>
              <li className="hover:text-white cursor-pointer transition-colors">DMCA</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
               {/* Social Icons Placeholder */}
               <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all cursor-pointer">T</div>
               <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all cursor-pointer">F</div>
               <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all cursor-pointer">I</div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-900 text-center text-slate-600 text-xs">
          &copy; {new Date().getFullYear()} Goallive Pro. All rights reserved. 
          Streaming links are gathered from external public sources.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
