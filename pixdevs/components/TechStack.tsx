import React from 'react';

const TechStack: React.FC = () => {
  const stack = [
    { category: 'Frontend', techs: ['React', 'TypeScript', 'Tailwind', 'Next.js'] },
    { category: 'Backend', techs: ['Node.js', 'Python', 'Go', 'PostgreSQL'] },
    { category: 'AI & ML', techs: ['TensorFlow', 'PyTorch', 'OpenAI API', 'LangChain'] },
    { category: 'Cloud', techs: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes'] },
  ];

  return (
    <section className="py-24 bg-background border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-xl font-semibold text-white mb-12 text-center">Powered by Modern Technologies</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {stack.map((group, index) => (
            <div key={index} className="space-y-4">
              <h4 className="text-sm font-medium text-primary uppercase tracking-wider border-l-2 border-primary pl-3">
                {group.category}
              </h4>
              <ul className="space-y-2">
                {group.techs.map((tech, idx) => (
                  <li key={idx} className="text-zinc-400 text-sm hover:text-white transition-colors cursor-default">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;