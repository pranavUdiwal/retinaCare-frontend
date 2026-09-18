import { Eye } from 'lucide-react';
import { useScrollSpy } from './ScrollSpyProvider';
import { cn } from '../../../lib/utils';
import { useScreening } from '../hooks/useScreening';

export const Navigation = () => {
  const { activeSection, scrollTo } = useScrollSpy();
  const { state } = useScreening();

  const hasResults = state === 'quality_failed' || state === 'segmenting' || state === 'complete' || state === 'error';

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-ink-950/80 backdrop-blur-lg border-b border-ink-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <button 
          onClick={() => scrollTo('landing')}
          className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg p-1"
        >
          <div className="bg-teal-900/50 p-2 rounded-lg border border-teal-800/50">
            <Eye className="w-6 h-6 text-teal-400" />
          </div>
          <span className="text-xl font-serif font-bold text-paper-50 tracking-wide">RetinaCare</span>
        </button>

        <div className="hidden md:flex items-center gap-1 bg-ink-900/50 p-1.5 rounded-full border border-ink-800">
          <button
            onClick={() => scrollTo('landing')}
            className={cn(
              "px-5 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500",
              activeSection === 'landing' || activeSection === '' 
                ? "bg-ink-800 text-paper-50 shadow-sm" 
                : "text-ink-300 hover:text-paper-100 hover:bg-ink-800/50"
            )}
          >
            Overview
          </button>
          <button
            onClick={() => scrollTo('upload')}
            className={cn(
              "px-5 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500",
              activeSection === 'upload' 
                ? "bg-ink-800 text-paper-50 shadow-sm" 
                : "text-ink-300 hover:text-paper-100 hover:bg-ink-800/50"
            )}
          >
            Workspace
          </button>
          <button
            onClick={() => scrollTo('results')}
            disabled={!hasResults}
            className={cn(
              "px-5 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500",
              activeSection === 'results' 
                ? "bg-ink-800 text-paper-50 shadow-sm" 
                : "text-ink-300 hover:text-paper-100 hover:bg-ink-800/50",
              !hasResults && "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-ink-300"
            )}
          >
            Results
          </button>
        </div>
      </div>
    </nav>
  );
};
