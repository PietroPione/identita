'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import VideoModal from '@/components/VideoModal';
import PinList from '@/components/PinList';

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
          

          <div className="flex flex-col items-center justify-center gap-4 mb-6">
            <div className="p-4 bg-white rounded-[2rem] shadow-xl shadow-indigo-100/50 border border-indigo-50/50">
              <img
                src="/Logo%20identità.png"
                alt="Logo Progetto Identita"
                className="w-24 h-24 object-contain"
              />
            </div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Esplora i <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-rose-400">Punti di Interesse</span>
            </h1>
          </div>
          
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
              <p className="text-slate-500 font-medium">I luoghi visitabili più vicini a te.</p>
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
            Progetto Identità - Creato da: Sara Bianchi e Giorgio Penna
          </p>
        </footer>
      </div>

      <VideoModal pin={selectedPin} onClose={() => setSelectedPin(null)} />
    </main>
  );
}
