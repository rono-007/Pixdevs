import React from 'react';

const WhyPixdevs: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 border-b border-border bg-background">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 reveal-on-scroll">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
            Why Pixdevs
          </span>
        </div>
        
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
           <div className="space-y-4 reveal-on-scroll" style={{ transitionDelay: '100ms' }}>
              <div className="h-px w-8 bg-white mb-6 transition-all duration-500 ease-out-expo origin-left hover:w-16"></div>
              <h4 className="text-white font-medium">Clear Communication</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                We speak your language, not just code. Transparent updates and clear roadmaps are standard.
              </p>
           </div>
           
           <div className="space-y-4 reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
              <div className="h-px w-8 bg-white mb-6 transition-all duration-500 ease-out-expo origin-left hover:w-16"></div>
              <h4 className="text-white font-medium">Engineering First</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                We don't cut corners. Every solution is architected for stability, security, and future scale.
              </p>
           </div>

           <div className="space-y-4 reveal-on-scroll" style={{ transitionDelay: '300ms' }}>
              <div className="h-px w-8 bg-white mb-6 transition-all duration-500 ease-out-expo origin-left hover:w-16"></div>
              <h4 className="text-white font-medium">Long-term Vision</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                We build for the 3-year plan, not just the launch day. Sustainable codebases that grow with you.
              </p>
           </div>
        </div>
      </div>
    </section>
  );
};

export default WhyPixdevs;