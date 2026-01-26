'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';

export default function VideoModal({ pin, onClose }) {
  useEffect(() => {
    if (!pin) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin, onClose]);

  if (!pin) return null;

  return (
    <div className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 sm:px-8">
      <div className="bg-white w-full max-w-6xl h-[90vh] overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-300 rounded-3xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full transition-colors shadow-md text-slate-600"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col h-full">
          <div className="flex-1 bg-black">
            <iframe
              className="w-full h-full border-0"
              src={pin.videoUrl}
              title={pin.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="p-6 sm:p-8 bg-rose-50/50 overflow-y-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-3">{pin.title}</h2>
            <p className="text-slate-600 leading-relaxed">{pin.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
