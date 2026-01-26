'use client';

import { X } from 'lucide-react';

export default function VideoModal({ pin, onClose }) {
  if (!pin) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl overflow-hidden w-full max-w-4xl shadow-2xl relative animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full transition-colors shadow-md text-slate-600"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/3 aspect-video bg-black">
            <iframe
              className="w-full h-full border-0"
              src={pin.videoUrl}
              title={pin.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="md:w-1/3 p-8 bg-rose-50/50 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">{pin.title}</h2>
            <p className="text-slate-600 leading-relaxed mb-6">{pin.description}</p>
            <div className="mt-auto">
              <span className="inline-block bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                Esperienza Immersiva
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
