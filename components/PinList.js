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
          <div className="sm:w-2/5 h-56 sm:h-auto relative overflow-hidden">
            <img
              src={pin.image}
              alt={pin.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors pointer-events-none"></div>
          </div>
          <div className="sm:w-3/5 p-8 flex flex-col justify-between bg-white">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">Esplora</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors">{pin.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 italic">&quot;{pin.description}&quot;</p>
            </div>
            <button
              onClick={() => onPinClick(pin)}
              className="flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 py-3 px-6 rounded-2xl font-bold hover:bg-indigo-600 hover:text-white transition-all duration-300 w-full sm:w-fit"
            >
              <Play size={18} fill="currentColor" />
              Guarda Video
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
