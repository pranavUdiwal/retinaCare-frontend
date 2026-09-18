import { useState, useCallback } from 'react';
import { analyzeImage, segmentVessels } from '../api/endpoints';
import type { GradingResponse, ScreeningState } from '../types';

export const useScreening = () => {
  const [state, setState] = useState<ScreeningState>('idle');
  const [file, setFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [gradingResult, setGradingResult] = useState<GradingResponse | null>(null);
  const [vesselMaskUrl, setVesselMaskUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile);
    setImagePreviewUrl(URL.createObjectURL(selectedFile));
    setState('idle');
    setGradingResult(null);
    setVesselMaskUrl(null);
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setFile(null);
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
    }
    if (vesselMaskUrl) {
      URL.revokeObjectURL(vesselMaskUrl);
    }
    setImagePreviewUrl(null);
    setState('idle');
    setGradingResult(null);
    setVesselMaskUrl(null);
    setError(null);
  }, [imagePreviewUrl, vesselMaskUrl]);

  const startAnalysis = useCallback(async () => {
    if (!file) return;

    setState('uploading');
    setError(null);

    try {
      const gradingResponse = await analyzeImage(file);
      setGradingResult(gradingResponse);

      if (gradingResponse.image_quality.recapture_required) {
        setState('quality_failed');
        return;
      }

      setState('segmenting');
      
      try {
        const maskUrl = await segmentVessels(file);
        setVesselMaskUrl(maskUrl);
      } catch (segErr) {
        console.error("Segmentation failed:", segErr);
        // We still complete the process because grading is the primary task
      }

      setState('complete');
    } catch (err: any) {
      console.error("Analysis error:", err);
      setError(err.response?.data?.detail || err.message || "An error occurred during analysis");
      setState('error');
    }
  }, [file]);

  return {
    state,
    file,
    imagePreviewUrl,
    gradingResult,
    vesselMaskUrl,
    error,
    handleFileSelect,
    startAnalysis,
    reset,
  };
};
