import React from 'react';
import type { PredictionResult } from '../types';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { ProbabilityChart } from './ProbabilityChart';
import { motion } from 'framer-motion';

interface Props {
  prediction: PredictionResult;
}

export const ScreeningResultCard: React.FC<Props> = ({ prediction }) => {
  const isReferable = prediction.referable;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="bg-ink-900/50 backdrop-blur-sm border border-ink-800 rounded-2xl overflow-hidden flex flex-col shadow-xl"
    >
      <div className={cn(
        "p-6 md:p-8 border-b",
        isReferable ? "bg-amber-950/20 border-amber-900/30" : "bg-teal-950/20 border-teal-900/30"
      )}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1">
            <h2 className={cn("text-2xl font-serif font-bold tracking-tight mb-2", isReferable ? "text-amber-400" : "text-teal-400")}>
              Model suggests {isReferable ? "referral" : "no referral"}
            </h2>
            <p className="text-ink-300 leading-relaxed max-w-2xl">
              {isReferable 
                ? "The referable probability exceeds the clinical threshold. Ophthalmologist review is recommended." 
                : "The referable probability is below the clinical threshold for severe or proliferative disease."}
            </p>
          </div>
          {isReferable ? (
            <div className="p-4 bg-amber-900/20 rounded-full self-start">
              <AlertTriangle className="w-10 h-10 text-amber-500" />
            </div>
          ) : (
            <div className="p-4 bg-teal-900/20 rounded-full self-start">
              <CheckCircle2 className="w-10 h-10 text-teal-500" />
            </div>
          )}
        </div>
      </div>

      <div className="p-6 md:p-8 flex-1 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-ink-950 p-6 rounded-xl border border-ink-800 shadow-inner">
            <p className="text-xs text-ink-400 mb-2 uppercase tracking-widest font-semibold">Predicted Grade</p>
            <p className="text-3xl font-serif font-bold text-paper-50">{prediction.predicted_label}</p>
            <p className="text-sm text-ink-500 mt-2 font-medium">Class {prediction.predicted_class}</p>
          </div>
          <div className="bg-ink-950 p-6 rounded-xl border border-ink-800 shadow-inner">
            <p className="text-xs text-ink-400 mb-2 uppercase tracking-widest font-semibold">Referable Confidence</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-serif font-bold text-paper-50 tabular-nums">{prediction.referable_probability.toFixed(1)}%</p>
            </div>
            <p className="text-sm text-ink-500 mt-2 font-medium tabular-nums">Threshold: {(prediction.referable_threshold * 100).toFixed(1)}%</p>
          </div>
        </div>

        <div className="flex-1 bg-ink-950/30 p-6 rounded-xl border border-ink-800/50">
          <ProbabilityChart probabilities={prediction.class_probabilities} />
        </div>
        
        <div className="mt-8 pt-6 border-t border-ink-800">
           <p className="text-xs text-ink-500 leading-relaxed max-w-3xl">
             <strong className="text-ink-400">Clinical Disclaimer:</strong> This is a research prototype designed for assistive screening support. It does not provide a standalone autonomous diagnosis. All results require clinician review and verification.
           </p>
        </div>
      </div>
    </motion.div>
  );
};
