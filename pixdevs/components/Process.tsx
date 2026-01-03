import React from 'react';

const Process: React.FC = () => {
  const steps = [
    { title: 'Understand deeply', desc: 'We start by deconstructing the business problem, not just the technical requirements.' },
    { title: 'Design for scale', desc: 'Architecture that handles growth gracefully, avoiding premature optimization while ensuring extensibility.' },
    { title: 'Build specifically', desc: 'Production-ready code delivered with precision. No bloat, no unnecessary dependencies.' },
    { title: 'Support consistently', desc: 'We remain partners beyond deployment, ensuring system health and adaptation.' },
  ];

  return (
    <section id="approach" className="py-32 px-6 md:px-12 border-b border-border overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-20 reveal-on-scroll">
           <h2 className="text-4xl md:text-5xl font-display text-white mb-6">The Approach</h2>
           <div className="w-full h-px bg-border"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative pt-8 lg:pt-0 lg:px-8 first:pl-0 lg:border-l lg:border-border border-l-0 border-t border-border lg:border-t-0 group reveal-on-scroll"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="mb-6">
                <span className="block w-2 h-2 bg-zinc-600 rounded-full mb-8 group-hover:bg-white group-hover:scale-150 transition-all duration-500 ease-out-expo"></span>
                <h3 className="text-xl font-medium text-white mb-4 group-hover:translate-x-2 transition-transform duration-500 ease-out-expo">{step.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed pr-4 group-hover:text-zinc-300 transition-colors duration-300">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;