import React, { useRef, useState } from 'react';
import { UploadCloud, X, FileImage } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageUploaderProps {
  onFileSelect: (file: File) => void;
  file: File | null;
  previewUrl: string | null;
  onClear: () => void;
  disabled?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onFileSelect,
  file,
  previewUrl,
  onClear,
  disabled = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (isValidImage(droppedFile)) {
        onFileSelect(droppedFile);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (isValidImage(selectedFile)) {
        onFileSelect(selectedFile);
      }
    }
  };

  const isValidImage = (f: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    return validTypes.includes(f.type) && f.size <= 10 * 1024 * 1024;
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!file || !previewUrl ? (
          <motion.div
            key="upload-zone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              "relative group flex flex-col items-center justify-center w-full h-72 border-2 border-dashed rounded-xl transition-all duration-300 bg-ink-950/50",
              isDragging ? "border-teal-500 bg-teal-900/20" : "border-ink-700 hover:border-ink-500 hover:bg-ink-900/80",
              disabled && "opacity-50 cursor-not-allowed pointer-events-none"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-ink-400 group-hover:text-ink-300 transition-colors">
              <UploadCloud className="w-14 h-14 mb-4 text-ink-600 group-hover:text-teal-400 transition-colors duration-300" />
              <p className="mb-2 text-base">
                <span className="font-semibold text-teal-400">Select a file</span> or drag and drop
              </p>
              <p className="text-sm text-ink-500">JPG, JPEG, PNG up to 10MB</p>
              <p className="text-xs text-ink-600 mt-4 max-w-xs text-center">
                Ensure the image is a valid fundus capture. Ordinary photographs cannot be accurately analyzed.
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/jpeg, image/png, image/jpg"
              onChange={handleFileChange}
              disabled={disabled}
            />
          </motion.div>
        ) : (
          <motion.div
            key="preview-zone"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-xl overflow-hidden border border-ink-800 bg-ink-950 shadow-2xl"
          >
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClear();
                }}
                disabled={disabled}
                className="p-2.5 bg-ink-950/80 hover:bg-ink-800 text-ink-300 hover:text-paper-50 rounded-full backdrop-blur-md transition-all disabled:opacity-50 shadow-lg border border-ink-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="w-full aspect-[4/3] sm:aspect-video bg-[#050505] flex items-center justify-center overflow-hidden">
              <img 
                src={previewUrl} 
                alt="Fundus preview" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="flex items-center gap-4 p-4 bg-ink-900 border-t border-ink-800">
              <div className="p-2 bg-ink-800 rounded-lg">
                <FileImage className="w-6 h-6 text-teal-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-paper-100 truncate">{file.name}</p>
                <p className="text-xs text-ink-400 tabular-nums">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
