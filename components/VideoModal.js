'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';

export default function VideoModal({ pin, pins, onClose }) {
  useEffect(() => {
    if (!pin) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin, onClose]);

  if (!pin) return null;

  const nextPin = pins && pins.length > 0
    ? pins[(pins.findIndex(p => p.id === pin.id) + 1) % pins.length]
    : null;

  return (
    <div className="fixed inset-0 z-[2000] bg-black/40 backdrop-blur-sm flex items-center justify-center px-4 sm:px-8">
      <div className="relative w-full max-w-5xl animate-in fade-in zoom-in duration-300">
        {/* Logo in top right */}
        <div className="absolute -top-12 -right-8 z-[2100] w-32 h-32 md:w-40 md:h-40">
          <img
            src="/logo-identita.png"
            alt="Logo Identità"
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </div>

        {/* Modal Container with Yellow Border */}
        <div className="bg-[#fbbf24] p-[10px] md:p-[12px] rounded-[2.5rem] md:rounded-[3rem] shadow-2xl overflow-hidden">
          <div className="bg-black rounded-[2rem] md:rounded-[2.5rem] overflow-hidden flex flex-col">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-50 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors md:hidden"
              aria-label="Chiudi modal"
            >
              <X size={20} />
            </button>

            {/* Desktop Close Button (subtle) */}
            <button
              onClick={onClose}
              className="absolute -top-10 left-0 text-white/70 hover:text-white flex items-center gap-2 transition-colors hidden md:flex"
            >
              <X size={20} />
              <span className="font-medium">Chiudi</span>
            </button>

            {/* Video Area */}
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full border-0"
                src={pin.videoUrl}
                title={pin.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Light Blue Footer */}
            <div className="bg-[#93c5fd] p-6 md:p-8 text-white">
              <div className="flex flex-col gap-1">
                <h2 className="text-xl md:text-2xl font-bold leading-tight">
                  {pin.title}
                </h2>
                {nextPin && (
                  <p className="text-sm md:text-base font-medium opacity-90">
                    Prossima tappa: <span className="font-bold">{nextPin.title}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
