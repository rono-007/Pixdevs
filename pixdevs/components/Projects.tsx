import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'AI Resume Screening Platform',
      role: 'Machine Learning / Automation',
      summary: 'Automated candidate evaluation using custom NLP models designed to reduce bias and increase processing speed by 400%.',
      year: '2023'
    },
    {
      title: 'Inventory Forecasting System',
      role: 'Data Science / Dashboard',
      summary: 'Predictive analytics engine enabling smarter supply-chain decisions for a mid-market retail enterprise.',
      year: '2023'
    },
    {
      title: 'FinTech Compliance Pipeline',
      role: 'Backend / Security',
      summary: 'End-to-end automated reporting workflow ensuring real-time regulatory compliance with zero manual oversight.',
      year: '2024'
    },
  ];

  return (
    <section id="work" className="py-32 px-6 md:px-12 border-b border-border bg-surface">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 reveal-on-scroll">
          <h2 className="text-6xl md:text-8xl font-display text-white tracking-tightest">Selected Work</h2>
          <span className="text-zinc-500 font-mono text-sm uppercase tracking-widest mt-4 md:mt-0">Case Studies</span>
        </div>

        <div className="flex flex-col">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="group border-t border-border py-16 transition-all duration-500 hover:bg-white/5 px-4 -mx-4 cursor-pointer reveal-on-scroll"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 transform group-hover:translate-x-4 transition-transform duration-500 ease-out-expo">
                  <h3 className="text-3xl md:text-4xl font-display font-medium text-zinc-200 group-hover:text-white transition-colors mb-2">
                    {project.title}
                  </h3>
                  <span className="text-sm text-zinc-500 font-mono">{project.role}</span>
                </div>
                
                <div className="lg:col-span-5 lg:col-start-7 flex flex-col justify-between h-full">
                  <p className="text-lg text-zinc-400 leading-relaxed max-w-xl group-hover:text-zinc-300 transition-colors">
                    {project.summary}
                  </p>
                  <div className="mt-8 flex items-center justify-between">
                     <span className="text-xs font-mono text-zinc-600 group-hover:text-zinc-400 transition-colors">{project.year}</span>
                     <div className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out-expo -translate-x-8 group-hover:translate-x-0">
                        <ArrowUpRight className="w-4 h-4 text-white" />
                     </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="border-t border-border reveal-on-scroll"></div>
        </div>
      </div>
    </section>
  );
};

export default Projects;