'use client';

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function VideoModal({ pin, pins, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!pin) return;
    setIsPlaying(false);

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin, onClose]);

  if (!pin) return null;

  const getPreviewImage = () => pin.image || null;

  const getVideoUrl = () => {
    if (!pin.videoUrl) return '';
    if (!isPlaying) return pin.videoUrl;
    const hasQuery = pin.videoUrl.includes('?');
    return `${pin.videoUrl}${hasQuery ? '&' : '?'}autoplay=1`;
  };

  const nextPin = pins && pins.length > 0
    ? pins[(pins.findIndex(p => p.id === pin.id) + 1) % pins.length]
    : null;

  return (
    <div
      className="fixed inset-0 z-[2000] bg-black/40 backdrop-blur-sm flex items-center justify-center px-4 sm:px-8"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-5xl animate-in fade-in zoom-in duration-300"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Logo in top right */}
        <div className="absolute -top-12 -right-8 z-[2100] w-32 h-32 md:w-40 md:h-40">
          <img
            src="/logo-identita.png"
            alt="Logo Identità"
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </div>

        {/* Modal Container with Yellow Border */}
        <div className="identita-frame shadow-2xl">
          <div className="identita-frame-inner flex flex-col">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-50 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors md:hidden"
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
            <div className="aspect-video w-full identita-panel relative overflow-hidden">
              {isPlaying || !pin.videoUrl ? (
                <iframe
                  className="absolute inset-0 w-full h-full border-0"
                  src={getVideoUrl()}
                  title={pin.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 block"
                  aria-label={`Riproduci video: ${pin.title}`}
                >
                  {getPreviewImage() ? (
                    <img
                      src={getPreviewImage()}
                      alt={`Preview ${pin.title}`}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full bg-black"></div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <img
                      src="/PlayAzzurro.png"
                      alt="Play"
                      className="w-20 h-20 md:w-24 md:h-24 object-contain opacity-90"
                    />
                  </div>
                </button>
              )}
            </div>

            {/* Light Blue Footer */}
            <div className="identita-footer p-6 md:p-8">
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
