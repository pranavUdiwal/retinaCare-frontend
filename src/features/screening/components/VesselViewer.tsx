import React from 'react';
import { Eye, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  originalImage: string;
  maskImage: string | null;
  isLoading: boolean;
}

export const VesselViewer: React.FC<Props> = ({ originalImage, maskImage, isLoading }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="bg-ink-900/50 backdrop-blur-sm border border-ink-800 rounded-2xl overflow-hidden shadow-xl"
    >
      <div className="p-6 border-b border-ink-800 flex items-center gap-3">
        <div className="p-2 bg-blue-900/20 rounded-lg">
          <Eye className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h3 className="font-serif font-bold text-xl text-paper-50">Vessel Segmentation</h3>
          <p className="text-ink-300 text-sm mt-1">Structural evidence extracted via DRIVE-trained UNet</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-ink-800">
        <div className="p-6 md:p-8 flex flex-col bg-ink-950/30">
          <p className="text-xs text-ink-400 mb-4 font-semibold uppercase tracking-widest">Original Fundus</p>
          <div className="flex-1 bg-[#050505] rounded-xl border border-ink-800 overflow-hidden flex items-center justify-center min-h-[300px] shadow-inner">
            <img 
              src={originalImage} 
              alt="Original Fundus" 
              className="max-w-full max-h-[400px] object-contain"
            />
          </div>
        </div>
        
        <div className="p-6 md:p-8 flex flex-col bg-ink-950/30">
          <p className="text-xs text-ink-400 mb-4 font-semibold uppercase tracking-widest">Vessel Structure Mask</p>
          <div className="flex-1 bg-[#050505] rounded-xl border border-ink-800 overflow-hidden flex items-center justify-center min-h-[300px] shadow-inner relative">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center text-ink-500">
                <Loader2 className="w-10 h-10 animate-spin mb-4 text-blue-500" />
                <p className="text-sm font-medium">Extracting vessels...</p>
              </div>
            ) : maskImage ? (
              <img 
                src={maskImage} 
                alt="Vessel Mask" 
                className="max-w-full max-h-[400px] object-contain mix-blend-screen"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <p className="text-sm text-ink-500 font-medium mb-1">Segmentation unavailable</p>
                <p className="text-xs text-ink-600">The segmentation service failed to return a valid mask.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
