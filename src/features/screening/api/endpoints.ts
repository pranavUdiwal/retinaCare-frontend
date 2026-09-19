import axios from 'axios';
import type { GradingResponse } from '../types';

const GRADING_API = import.meta.env.VITE_GRADING_API_URL || 'http://localhost:8000';
const SEGMENTATION_API = import.meta.env.VITE_SEGMENTATION_API_URL || 'http://localhost:8001';

export const analyzeImage = async (file: File): Promise<GradingResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post<GradingResponse>(`${GRADING_API}/predict/aptos`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const segmentVessels = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(`${SEGMENTATION_API}/predict/vessel`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'blob',
  });

  return URL.createObjectURL(response.data);
};
