import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useScrollSpy } from './ScrollSpyProvider';

export const Hero = () => {
  const { scrollTo } = useScrollSpy();

  return (
    <section id="landing" className="relative min-h-[90vh] pt-20 flex items-center bg-ink-950 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-ink-800/40 via-ink-950 to-ink-950"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Typography Left */}
        <div className="lg:col-span-5 flex flex-col pt-12 lg:pt-0 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-950/50 border border-teal-800/50 text-teal-300 text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
              Research prototype · Clinician review required
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-serif font-bold text-paper-50 leading-[1.1] tracking-tight mb-6">
              A clearer first look at retinal health.
            </h1>
            
            <p className="text-lg lg:text-xl text-ink-300 leading-relaxed mb-10 max-w-lg">
              Review retinal image quality, DR screening results, and vessel structure in one connected workspace.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo('upload')}
                className="px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-semibold transition-all shadow-[0_0_40px_-10px_rgba(20,184,166,0.3)] hover:shadow-[0_0_60px_-15px_rgba(20,184,166,0.5)] flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-500/50"
              >
                Start screening
                <ArrowDown className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => scrollTo('context')}
                className="px-8 py-4 bg-ink-900/50 hover:bg-ink-800 text-paper-100 border border-ink-700 hover:border-ink-600 rounded-xl font-semibold transition-all flex items-center justify-center focus:outline-none focus-visible:ring-4 focus-visible:ring-ink-700"
              >
                Explore workflow
              </button>
            </div>
          </motion.div>
        </div>

        {/* Image Right */}
        <div className="lg:col-span-7 translate-x-40 relative flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden shadow-[0_0_80px_rgba(20,184,166,0.15)] aspect-square w-full max-w-[750px]"
          >
            {/* Using the provided main-home1.png */}
            <img 
              src="/main-home1.png" 
              alt="Clinician operating a fundus camera in a rural setting" 
              className="absolute inset-0 w-full h-full object-cover object-right"
            />
            {/* Subtle gradient overlay to ensure the image sits comfortably in the dark theme */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
