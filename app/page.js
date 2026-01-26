'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import VideoModal from '@/components/VideoModal';
import PinList from '@/components/PinList';
import { MapPin } from 'lucide-react';

const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full bg-slate-50 animate-pulse rounded-[2.5rem] flex items-center justify-center text-slate-400 border-4 border-white shadow-inner">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>
        <p className="font-medium">Caricamento mappa interattiva...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  const [pins, setPins] = useState([]);
  const [selectedPin, setSelectedPin] = useState(null);

  useEffect(() => {
    fetch('/data/pins.json')
      .then((res) => res.json())
      .then((data) => setPins(data))
      .catch(err => console.error("Error loading pins:", err));
  }, []);

  return (
    <main className="min-h-screen bg-[#F8FAFC] py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="mb-16 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-white rounded-3xl shadow-sm mb-6 border border-slate-100">
            <div className="px-4 py-1.5 bg-indigo-50 rounded-2xl text-indigo-600 text-sm font-bold flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Proof of Concept
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 mb-6">
            <div className="p-4 bg-white rounded-[2rem] text-indigo-500 shadow-xl shadow-indigo-100/50 border border-indigo-50/50">
              <MapPin size={40} />
            </div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Esplora i <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-rose-400">Punti di Interesse</span>
            </h1>
          </div>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Un&apos;esperienza immersiva per scoprire le bellezze del territorio attraverso mappe interattive e contenuti video.
          </p>
        </header>

        {/* Map Section */}
        <section className="mb-24 relative">
          <div className="absolute -inset-4 bg-gradient-to-br from-indigo-50 to-rose-50 rounded-[3rem] -z-10 blur-2xl opacity-50"></div>
          <MapComponent pins={pins} onPinClick={setSelectedPin} />
        </section>

        {/* List Section */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-2">I Luoghi</h2>
              <p className="text-slate-500 font-medium">Scorri l&apos;elenco dei punti di interesse selezionati per te.</p>
            </div>
            <div className="h-0.5 flex-1 bg-slate-100 mb-4 hidden md:block mx-8"></div>
            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              {pins.length} Risultati Trovati
            </div>
          </div>
          <PinList pins={pins} onPinClick={setSelectedPin} />
        </section>

        {/* Footer info */}
        <footer className="mt-24 pt-12 border-t border-slate-100 text-center">
          <p className="text-slate-400 text-sm font-medium">
            &copy; 2025 PoC Mappa Interattiva. Creato con Next.js e Tailwind CSS.
          </p>
        </footer>
      </div>

      <VideoModal pin={selectedPin} onClose={() => setSelectedPin(null)} />
    </main>
  );
}
