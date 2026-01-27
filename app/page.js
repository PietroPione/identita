'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import VideoModal from '@/components/VideoModal';
import PinList from '@/components/PinList';

const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="identita-frame h-[500px] w-full shadow-2xl">
      <div className="identita-frame-inner h-full w-full bg-slate-50 animate-pulse flex items-center justify-center text-slate-500">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-yellow-200 border-t-yellow-500 rounded-full animate-spin"></div>
          <p className="font-medium">Caricamento mappa interattiva...</p>
        </div>
      </div>
    </div>
  ),
});

export default function Home() {
  const [pins, setPins] = useState([]);
  const [selectedPin, setSelectedPin] = useState(null);

  const slugify = (value) =>
    value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

  useEffect(() => {
    fetch('/data/pins.json')
      .then((res) => res.json())
      .then((data) => setPins(data))
      .catch(err => console.error("Error loading pins:", err));
  }, []);

  useEffect(() => {
    if (pins.length === 0) return;

    const openFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const paramValue = params.get('pin');
      const hashMatch = window.location.hash.match(/^#luogo-(.+)$/);
      const targetSlug = paramValue || (hashMatch ? hashMatch[1] : null);

      if (!targetSlug) return;

      const match = pins.find((pin) => slugify(pin.title) === String(targetSlug));
      if (match) setSelectedPin(match);
    };

    openFromUrl();
    window.addEventListener('hashchange', openFromUrl);
    window.addEventListener('popstate', openFromUrl);
    return () => {
      window.removeEventListener('hashchange', openFromUrl);
      window.removeEventListener('popstate', openFromUrl);
    };
  }, [pins]);

  const handlePinClick = (pin) => {
    setSelectedPin(pin);
    const hash = `#luogo-${slugify(pin.title)}`;
    if (window.location.hash !== hash) {
      window.history.replaceState(null, '', hash);
    }
  };

  const handleCloseModal = () => {
    setSelectedPin(null);
    if (window.location.hash.startsWith('#luogo-')) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--identita-blue)]/80 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="mb-16 text-center">
          

          <div className="flex flex-col items-center justify-center gap-4 mb-6">
            <div className="rounded-full bg-white shadow-2xl">
              <div className=" p-4">
                <img
                  src="/logo-identita.png"
                  alt="Logo Progetto Identita"
                  className="w-24 h-24 object-contain"
                />
              </div>
            </div>
            <h1 className="text-5xl font-black text-white tracking-tight leading-tight">
              Esplora i <span className="text-[var(--identita-yellow)]">Punti di Interesse</span>
            </h1>
          </div>
          
        </header>

        {/* Map Section */}
        <section className="mb-24 relative">
          <div className="absolute -inset-4 bg-gradient-to-br from-yellow-50 to-blue-50 rounded-[3rem] -z-10 blur-2xl opacity-50"></div>
          <MapComponent pins={pins} onPinClick={handlePinClick} />
        </section>

        {/* List Section */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="text-4xl font-black text-white mb-2">I Luoghi</h2>
              <p className="text-white font-medium">* i video usati come esempio in questo mockup sono stati realizzati nel comune di Monopoli</p>
            </div>
            <div className="h-0.5 flex-1 bg-yellow-100 mb-4 hidden md:block mx-8"></div>
            <div className="text-sm font-bold text-white uppercase tracking-widest">
              {pins.length} Risultati Trovati
            </div>
          </div>
          <PinList pins={pins} onPinClick={handlePinClick} />
        </section>

        {/* Footer info */}
        <footer className="mt-24 pt-12 border-t border-yellow-100 text-center">
          <p className="text-white text-sm font-medium">
            Progetto Identità - Creato da: Sara Bianchi e Giorgio Penna | NB: i video usati come esempio in questo mockup sono stati realizzati nel comune di Monopoli
          </p>
        </footer>
      </div>

      <VideoModal pin={selectedPin} pins={pins} onClose={handleCloseModal} />
    </main>
  );
}
