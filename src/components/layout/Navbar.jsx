import React from 'react';

const Navbar = () => (
  <nav className="fixed w-full z-50 backdrop-blur-md bg-[#030303]/80 border-b border-white/10 p-6 flex justify-between items-center">
    <h1 className="text-xl font-bold tracking-tighter">SAGAL RAI</h1>
    <div className="flex gap-6 text-sm text-gray-400">
      {['About', 'Services', 'Projects', 'Contact'].map(item => (
        <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">{item}</a>
      ))}
    </div>
  </nav>
);

export default Navbar;