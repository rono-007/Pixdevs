import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 w-full z-50 flex justify-center transition-all duration-500 ease-out-expo pointer-events-none ${scrolled ? 'pt-4' : 'pt-4 md:pt-5'}`}>
      <nav className={`
        pointer-events-auto
        flex items-center justify-between
        transition-all duration-700 cubic-bezier(0.19, 1, 0.22, 1)
        ${scrolled
          ? 'w-[90%] md:w-[700px] bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-2 shadow-2xl shadow-black/50'
          : 'w-[92%] max-w-[1600px] bg-transparent border border-transparent rounded-full px-0 py-1.5'}
      `}>
        {/* Logo */}
        <Link to="/" className="flex items-center hover:opacity-90 transition-opacity duration-300 pl-2">
          <img src="/logo.png" alt="Pixdevs Logo" className="h-24 w-auto -my-10 object-contain rounded-xl" />
        </Link>

        {/* Links - Hidden on mobile, visible on desktop */}
        <div className={`hidden md:flex items-center gap-8 transition-all duration-500 ${scrolled ? 'gap-6' : 'gap-10'}`}>
          {['Capabilities', 'Approach', 'Work'].map((item) => (
            isHomePage ? (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-300 hover-underline-animation"
              >
                {item}
              </a>
            ) : (
              <Link
                key={item}
                to={`/#${item.toLowerCase()}`}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-300 hover-underline-animation"
              >
                {item}
              </Link>
            )
          ))}
        </div>

        {/* CTA */}
        <div>
          <Link to="/contact" className={`
            group text-sm font-medium transition-all duration-500 ease-out active:scale-95 inline-block
            ${scrolled
              ? 'bg-white text-black px-5 py-2 rounded-full hover:bg-zinc-200 shadow-[0_0_10px_rgba(255,255,255,0.2)]'
              : 'text-white border border-white/20 px-6 py-2.5 rounded-full hover:bg-white hover:text-black hover:border-white'}
          `}>
            Contact
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;