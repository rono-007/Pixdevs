import React from 'react';
import { Star, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full bg-background pt-28 pb-12 px-4 md:px-8 flex flex-col justify-center">
       <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">

          {/* 1. Main Headline Block */}
          <div className="col-span-1 md:col-span-8 bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] p-8 md:p-14 flex flex-col justify-between relative overflow-hidden group">
             
             {/* Content */}
             <div className="relative z-10 pt-4">
               <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium text-white leading-[0.95] tracking-tight mb-8">
                 Engineering <br/>
                 <span className="text-zinc-500">Digital Intelligence</span>
               </h1>
               <p className="text-lg text-zinc-400 max-w-md leading-relaxed">
                 Pixdevs builds scalable AI pipelines and enterprise architectures that transform business logic into competitive advantage.
               </p>
             </div>

             {/* Rotating Badge (Reference Style) */}
             <div className="absolute right-6 bottom-6 md:right-12 md:bottom-12 z-20">
                <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                   <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path
                          id="textPath"
                          d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                          fill="transparent"
                        />
                        <text className="text-[11px] font-mono uppercase tracking-[0.2em] fill-zinc-400">
                          <textPath href="#textPath" startOffset="0%">
                            System • Architecture • Intelligence • Scale •
                          </textPath>
                        </text>
                      </svg>
                   </div>
                   <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg shadow-white/20">
                      <ArrowUpRight className="w-5 h-5 text-black" />
                   </div>
                </div>
             </div>

             {/* Gradient Accent */}
             <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-zinc-800/20 blur-[100px] rounded-full pointer-events-none" />
          </div>

          {/* 2. Secondary Info Block (Global Partners) */}
          <div className="col-span-1 md:col-span-4 bg-zinc-900/30 border border-zinc-800 rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden group hover:border-zinc-700 transition-colors duration-500">
             <div className="flex justify-between items-start">
               <h3 className="text-3xl font-display font-medium text-white leading-tight">
                 Global <br/> Infrastructure
               </h3>
               <div className="bg-white text-black p-4 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                 <Star className="w-6 h-6 fill-current" />
               </div>
             </div>
             
             <div className="mt-12">
               <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                 Officially partnered with top-tier cloud providers to deliver 99.99% uptime for mission-critical applications.
               </p>
               <div className="flex items-center gap-2">
                  <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-zinc-900 bg-zinc-700 overflow-hidden flex items-center justify-center text-[10px] text-zinc-400">
                        P{i}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-mono text-zinc-500 ml-2">+20 Partners</span>
               </div>
             </div>
          </div>

          {/* 3. Stat Block 1 (Dark Theme) */}
          <div className="col-span-1 md:col-span-3 bg-black border border-zinc-800 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between group hover:border-emerald-500/30 transition-colors duration-500 min-h-[240px]">
             <div className="text-6xl font-display font-semibold text-white tracking-tighter">
               98<span className="text-emerald-500">%</span>
             </div>
             <div>
               <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">Efficiency Boost</p>
               <p className="text-sm text-zinc-400 leading-snug">Average performance gain in deployed AI workflows.</p>
             </div>
          </div>

          {/* 4. Stat Block 2 (Lighter Theme) */}
          <div className="col-span-1 md:col-span-3 bg-zinc-800/80 border border-zinc-700 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between min-h-[240px] relative overflow-hidden">
             <div className="absolute top-6 right-6 p-2 bg-white/10 rounded-full">
                <ArrowUpRight className="w-5 h-5 text-white" />
             </div>
             <div className="text-6xl font-display font-semibold text-white tracking-tighter z-10">
               2.5<span className="text-3xl align-top ml-1">x</span>
             </div>
             <div className="z-10">
               <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">ROI Multiplier</p>
               <p className="text-sm text-zinc-300 leading-snug">Revenue growth post-transformation.</p>
             </div>
             {/* Decorative blob */}
             <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-emerald-500/20 blur-[60px] rounded-full" />
          </div>

          {/* 5. Visual/Arches Block */}
          <div className="col-span-1 md:col-span-6 bg-zinc-900 border border-zinc-800 rounded-[2.5rem] relative overflow-hidden flex items-center justify-center min-h-[240px] md:min-h-auto">
             {/* Animated Arches */}
             <div className="absolute bottom-0 w-full h-full flex flex-col items-center justify-end pb-0 pointer-events-none">
                <div className="w-[120%] aspect-square border border-zinc-800 rounded-full mb-[-40%] opacity-50" />
                <div className="w-[90%] aspect-square border border-zinc-700/50 rounded-full absolute -bottom-[30%] opacity-70 animate-[pulse_4s_ease-in-out_infinite]" />
                <div className="w-[60%] aspect-square border border-zinc-600/50 rounded-full absolute -bottom-[15%] transition-all duration-1000 group-hover:border-emerald-500/50" />
                <div className="w-[30%] aspect-square border border-emerald-500/20 rounded-full absolute -bottom-[5%] bg-emerald-500/5" />
             </div>
             
             {/* Central 3D Object */}
             <div className="relative z-10 w-24 h-24">
                <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-900 rounded-[2rem] shadow-2xl flex items-center justify-center border border-zinc-700 transform rotate-12 hover:rotate-0 transition-transform duration-700 ease-out-expo">
                   <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
             </div>
          </div>

       </div>
    </section>
  );
};

export default Hero;