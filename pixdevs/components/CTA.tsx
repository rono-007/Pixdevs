import React from 'react';

const CTA: React.FC = () => {
  return (
    <section id="contact" className="py-40 px-6 md:px-12 bg-background flex flex-col items-center text-center">
      <div className="max-w-4xl reveal-on-scroll">
        <h2 className="text-4xl md:text-6xl font-display font-medium text-white mb-12 leading-tight tracking-tight">
          Have a complex problem or an idea worth building?
        </h2>
        <p className="text-xl text-zinc-400 mb-16 font-light">
          Let's explore it together.
        </p>
        
        <a href="mailto:hello@pixdevs.com" className="inline-block px-10 py-5 bg-white text-black font-medium text-lg rounded-sm hover:bg-zinc-200 hover:scale-105 active:scale-95 transition-all duration-300 ease-out-expo shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
          Contact Pixdevs
        </a>
      </div>
    </section>
  );
};

export default CTA;