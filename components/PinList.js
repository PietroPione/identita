'use client';

import { Play } from 'lucide-react';

export default function PinList({ pins, onPinClick }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
      {pins.map((pin) => (
        <div
          key={pin.id}
          className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 flex flex-col sm:flex-row h-full group"
        >
          <div className="sm:w-2/5 h-56 sm:h-auto relative overflow-hidden bg-black">
            {pin.videoUrl ? (
              <button
                type="button"
                onClick={() => onPinClick(pin)}
                className="w-full h-full relative block"
                aria-label={`Apri video: ${pin.title}`}
              >
                <iframe
                  className="w-full h-full border-0 pointer-events-none"
                  src={pin.videoUrl}
                  title={pin.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/0 transition-colors">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/90 text-blue-600 shadow-lg">
                    <Play size={20} fill="currentColor" />
                  </span>
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
          <div className="sm:w-3/5 p-8 flex flex-col justify-between bg-white">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                <span className="text-xs font-bold text-yellow-600 uppercase tracking-widest">Esplora</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">{pin.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 italic">&quot;{pin.description}&quot;</p>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => onPinClick(pin)}
                className="flex items-center justify-center gap-2 bg-blue-50 text-blue-600 py-3 px-6 rounded-2xl font-bold hover:bg-blue-600 hover:text-white transition-all duration-300 w-full"
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
                className="flex items-center justify-center gap-2 bg-yellow-50 text-yellow-600 py-3 px-6 rounded-2xl font-bold hover:bg-yellow-600 hover:text-white transition-all duration-300 w-full"
              >
                Ottieni indicazioni
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
