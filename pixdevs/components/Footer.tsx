import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 px-6 md:px-12 border-t border-border bg-background">
      <div className="flex flex-col md:flex-row justify-between items-center text-xs font-mono text-zinc-600 uppercase tracking-widest gap-4">
        <div>
          Pixdevs &copy; {new Date().getFullYear()}
        </div>
        <div className="flex gap-8">
          <span>AI</span>
          <span>Software</span>
          <span>Data</span>
        </div>
        <div className="flex gap-8">
           <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
           <a href="#" className="hover:text-white transition-colors">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;