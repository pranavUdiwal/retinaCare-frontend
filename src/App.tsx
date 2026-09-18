import { useEffect } from 'react';
import { ShieldAlert, Loader2, ImagePlus } from 'lucide-react';
import { useScreening } from './features/screening/hooks/useScreening';
import { ImageUploader } from './features/screening/components/ImageUploader';
import { QualityStatus } from './features/screening/components/QualityStatus';
import { ScreeningResultCard } from './features/screening/components/ScreeningResultCard';
import { VesselViewer } from './features/screening/components/VesselViewer';
import { Navigation } from './features/screening/components/Navigation';
import { ScrollSpyProvider, useScrollSpy } from './features/screening/components/ScrollSpyProvider';
import { Hero } from './features/screening/components/Hero';
import { ContextStrip } from './features/screening/components/ContextStrip';
import { motion } from 'framer-motion';

function AppContent() {
  const { scrollTo } = useScrollSpy();
  const {
    state,
    file,
    imagePreviewUrl,
    gradingResult,
    vesselMaskUrl,
    error,
    handleFileSelect,
    startAnalysis,
    reset
  } = useScreening();

  const isAnalyzing = state === 'uploading' || state === 'segmenting';
  const hasResults = gradingResult !== null || state === 'error';

  // Auto-scroll to results when analysis starts showing progress
  useEffect(() => {
    if (state === 'segmenting' || state === 'complete' || state === 'quality_failed' || state === 'error') {
      scrollTo('results');
    }
  }, [state]);

  // Handle explicit re-upload intent
  const handleUploadAnother = () => {
    reset();
    scrollTo('upload');
  };

  return (
    <div className="min-h-screen bg-ink-950 font-sans text-paper-100 flex flex-col">
      <Navigation />
      
      <main className="flex-1 flex flex-col">
        <Hero />
        <ContextStrip />
        
        {/* Upload Workspace */}
        <section id="upload" className="py-24 bg-ink-950 relative">
          <div className="max-w-4xl mx-auto px-6">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-serif font-bold text-paper-50 mb-4">Start with a retinal image.</h2>
              <p className="text-ink-300">Upload a fundus capture to begin the automated quality and screening pipeline.</p>
            </div>

            <div className="bg-ink-900/40 border border-ink-800 rounded-2xl p-6 md:p-10 shadow-2xl backdrop-blur-sm">
              <ImageUploader 
                onFileSelect={(selectedFile) => {
                  handleFileSelect(selectedFile);
                  // Explicitly invalidate results of the previous image
                  if (hasResults) {
                    reset();
                    handleFileSelect(selectedFile);
                  }
                }} 
                file={file} 
                previewUrl={imagePreviewUrl}
                onClear={reset}
                disabled={isAnalyzing}
              />

              {file && state === 'idle' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 flex justify-center">
                  <button
                    onClick={startAnalysis}
                    className="w-full md:w-auto px-12 py-4 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl transition-all shadow-[0_0_30px_-5px_rgba(20,184,166,0.2)] hover:shadow-[0_0_40px_-5px_rgba(20,184,166,0.4)] focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-500/50"
                  >
                    Analyze Image
                  </button>
                </motion.div>
              )}

              {isAnalyzing && (
                <div className="mt-8 bg-ink-900/80 border border-ink-800 text-teal-300 font-medium py-4 px-6 rounded-xl flex items-center justify-center gap-3">
                  <Loader2 className="w-5 h-5 animate-spin text-teal-400" />
                  {state === 'uploading' ? 'Analyzing Quality & Grading...' : 'Extracting Vessel Structure...'}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Results Workspace */}
        <section id="results" className="py-24 bg-ink-900/20 border-t border-ink-900 min-h-screen">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="text-3xl font-serif font-bold text-paper-50 mb-4">Review Results</h2>
                <p className="text-ink-300">Automated quality gates, referral thresholds, and structural evidence.</p>
              </div>
              
              {hasResults && (
                <button
                  onClick={handleUploadAnother}
                  className="px-6 py-3 bg-ink-800 hover:bg-ink-700 text-paper-100 border border-ink-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                  <ImagePlus className="w-4 h-4" />
                  Upload another image
                </button>
              )}
            </div>

            {!hasResults && !isAnalyzing && (
              <div className="h-[400px] border-2 border-dashed border-ink-800 rounded-2xl flex flex-col items-center justify-center text-ink-500 p-8 text-center bg-ink-900/10">
                <ShieldAlert className="w-12 h-12 mb-4 opacity-20" />
                <p className="text-lg font-medium text-ink-400 mb-2">No Active Analysis</p>
                <p className="text-sm max-w-sm">Results will appear here once an image has been uploaded and analyzed.</p>
              </div>
            )}

            {error && (
              <div className="mb-8 p-6 bg-red-950/30 border border-red-900/50 rounded-xl flex items-start gap-4 shadow-xl">
                <ShieldAlert className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-400 text-lg">Analysis Failed</h3>
                  <p className="text-red-200/80 mt-2">{error}</p>
                </div>
              </div>
            )}

            {gradingResult && (
              <div className="flex flex-col gap-8">
                {/* 1. Quality summary band */}
                <QualityStatus quality={gradingResult.image_quality} />

                {/* 2. Referral & Severity */}
                {gradingResult.prediction && !gradingResult.image_quality.recapture_required && (
                  <ScreeningResultCard prediction={gradingResult.prediction} />
                )}

                {/* 3. Structural Evidence */}
                {(state === 'segmenting' || state === 'complete') && imagePreviewUrl && (
                  <VesselViewer 
                    originalImage={imagePreviewUrl} 
                    maskImage={vesselMaskUrl} 
                    isLoading={state === 'segmenting'} 
                  />
                )}
              </div>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}

function App() {
  return (
    <ScrollSpyProvider>
      <AppContent />
    </ScrollSpyProvider>
  );
}

export default App;
