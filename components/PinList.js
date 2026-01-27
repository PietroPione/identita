'use client';

import { Play } from 'lucide-react';

export default function PinList({ pins, onPinClick }) {
  const getPreviewImage = (pin) => {
    return pin.image || null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
      {pins.map((pin) => (
        <div
          key={pin.id}
          className="identita-frame h-full shadow-sm hover:shadow-md transition-all duration-300 group"
        >
          <div className="identita-frame-inner flex flex-col sm:flex-row h-full">
            <div className="sm:w-2/5 relative overflow-hidden bg-black aspect-video">
            {pin.videoUrl ? (
              <button
                type="button"
                onClick={() => onPinClick(pin)}
                className="w-full h-full relative block"
                aria-label={`Apri video: ${pin.title}`}
              >
                {getPreviewImage(pin) ? (
                  <img
                    src={getPreviewImage(pin)}
                    alt={`Preview ${pin.title}`}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full "></div>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/0 transition-colors">
                  <img
                    src="/PlayAzzurro.png"
                    alt="Play"
                    className="w-16 h-16 md:w-20 md:h-20 object-contain opacity-90"
                  />
                </div>
              </button>
            ) : (
              <img
                src={pin.image}
                alt={pin.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            )}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors pointer-events-none"></div>
            </div>
            <div className="sm:w-3/5 p-8 flex flex-col justify-between identita-footer">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full identita-bg"></span>
                <span className="text-xs font-bold identita-text-strong uppercase tracking-widest">Esplora</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors">{pin.title}</h3>
              <p className="text-white text-sm leading-relaxed mb-6 line-clamp-3 italic">
                Narrato da: {pin.narratore}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => onPinClick(pin)}
                className="flex items-center justify-center gap-2 identita-button-yellow py-3 px-6 rounded-2xl font-bold transition-all duration-300 w-full"
              >
                <Play size={18} fill="currentColor" />
                Ascolta la testimonianza
              </button>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                  `${pin.lat},${pin.lng}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 identita-button-yellow py-3 px-6 rounded-2xl font-bold transition-all duration-300 w-full"
              >
                Ottieni indicazioni
              </a>
            </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
