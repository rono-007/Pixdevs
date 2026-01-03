import React from 'react';

const Services: React.FC = () => {
  const capabilities = [
    {
      id: '01',
      title: 'AI & Automation',
      description: 'Intelligent workflows, machine learning systems, and automation designed to reduce operational friction. We move beyond hype to deliver deterministic, high-value AI implementations.',
    },
    {
      id: '02',
      title: 'UI/UX Design',
      description: 'Intuitive, user-centered interfaces that blend aesthetics with functionality. We craft seamless digital experiences through research-driven design, prototyping, and pixel-perfect execution.',
    },
    {
      id: '03',
      title: 'Data & Analytics',
      description: 'Data pipelines and insights that support informed, high-impact decisions. Transforming raw signals into actionable business intelligence through robust data engineering.',
    },
  ];

  return (
    <section id="capabilities" className="py-32 px-6 md:px-12 border-b border-border bg-background">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Section Label */}
          <div className="lg:col-span-3 reveal-on-scroll">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest sticky top-32">
              Capabilities
            </span>
          </div>

          {/* Content List */}
          <div className="lg:col-span-9 flex flex-col">
            {capabilities.map((item, index) => (
              <div
                key={item.id}
                className="group border-t border-border py-12 first:border-t-0 lg:first:border-t hover:bg-surface/30 transition-all duration-500 px-0 lg:px-6 -mx-0 lg:-mx-6 rounded-sm reveal-on-scroll"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-baseline">
                  <div className="md:col-span-1">
                    <span className="font-mono text-xs text-zinc-600 group-hover:text-zinc-400 transition-colors duration-300">
                      /{item.id}
                    </span>
                  </div>
                  <div className="md:col-span-5">
                    <h3 className="text-3xl font-display font-medium text-zinc-200 group-hover:text-white group-hover:translate-x-4 transition-all duration-500 ease-out-expo">
                      {item.title}
                    </h3>
                  </div>
                  <div className="md:col-span-6">
                    <p className="text-zinc-400 leading-relaxed text-sm md:text-base max-w-lg group-hover:text-zinc-300 transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;