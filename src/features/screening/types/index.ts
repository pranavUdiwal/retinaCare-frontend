export interface QualityAssessment {
  status: string;
  quality_score: number;
  focus_score: number;
  illumination_score: number;
  field_of_view_score: number;
  enhancement_applied: boolean;
  enhancements: string[];
  recapture_required: boolean;
  recapture_feedback: string | null;
}

export interface ClassProbabilities {
  "No DR": number;
  "Mild DR": number;
  "Moderate DR": number;
  "Severe DR": number;
  "Proliferative DR": number;
}

export interface PredictionResult {
  predicted_class: number;
  predicted_label: string;
  confidence: number;
  class_probabilities: ClassProbabilities;
  referable_probability: number;
  referable_threshold: number;
  referable: boolean;
  referable_label: string;
}

export interface GradingResponse {
  success: boolean;
  filename: string;
  image_quality: QualityAssessment;
  prediction?: PredictionResult;
}

export type ScreeningState = 'idle' | 'uploading' | 'quality_failed' | 'grading_complete' | 'segmenting' | 'complete' | 'error';
