import React from 'react';
import type { QualityAssessment } from '../types';
import { CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { motion } from 'framer-motion';

interface Props {
  quality: QualityAssessment;
}

export const QualityStatus: React.FC<Props> = ({ quality }) => {
  const isRejected = quality.recapture_required;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "rounded-2xl border p-6 shadow-xl",
        isRejected ? "border-red-900/50 bg-red-950/20" : "border-ink-800 bg-ink-900/50 backdrop-blur-sm"
      )}
    >
      <div className="flex items-start gap-4">
        {isRejected ? (
          <div className="p-2 bg-red-900/30 rounded-full shrink-0">
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        ) : (
          <div className="p-2 bg-teal-900/30 rounded-full shrink-0">
            <CheckCircle className="w-8 h-8 text-teal-400" />
          </div>
        )}
        
        <div className="flex-1 pt-1">
          <h3 className={cn("text-xl font-serif font-bold tracking-tight", isRejected ? "text-red-400" : "text-paper-50")}>
            {isRejected ? "Image Quality Rejected" : "Image Quality Accepted"}
          </h3>
          
          <div className="mt-2 flex items-center gap-3 text-sm text-ink-300 font-medium">
            <span className="capitalize px-2 py-1 bg-ink-950 rounded-md border border-ink-800">{quality.status}</span>
            <span className="text-ink-600">•</span>
            <span className="tabular-nums">Score: {(quality.quality_score * 100).toFixed(0)}/100</span>
          </div>

          {isRejected && quality.recapture_feedback && (
            <div className="mt-5 p-4 bg-red-950/40 border border-red-900/50 rounded-xl text-sm text-red-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-400" />
              <p className="leading-relaxed">{quality.recapture_feedback}</p>
            </div>
          )}

          {!isRejected && quality.enhancement_applied && quality.enhancements.length > 0 && (
            <div className="mt-5 p-3.5 bg-ink-950/50 border border-ink-800 rounded-xl text-sm text-ink-300 flex items-start gap-3">
              <Info className="w-5 h-5 shrink-0 text-ink-500" />
              <p className="leading-relaxed">Enhanced for analysis: <span className="text-paper-200">{quality.enhancements.join(', ')}</span></p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
