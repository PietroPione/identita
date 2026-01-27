'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with Next.js
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

function FitToPins({ pins }) {
  const map = useMap();

  useEffect(() => {
    if (!pins || pins.length === 0) return;

    const bounds = L.latLngBounds(pins.map((pin) => [pin.lat, pin.lng]));
    map.whenReady(() => {
      map.fitBounds(bounds, { padding: [10, 10], maxZoom: 17 });
    });
  }, [map, pins]);

  return null;
}

export default function MapComponent({ pins, onPinClick }) {
  return (
    <div className="identita-frame h-[500px] w-full shadow-2xl">
      <div
        className="identita-frame-inner h-full w-full"
        style={{ filter: 'sepia(0.4) saturate(1.2) brightness(0.95) contrast(1.1)' }}
      >
        <MapContainer
          center={[43.5, 12.0]}
          zoom={6}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <FitToPins pins={pins} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {pins.map((pin) => (
            <Marker
              key={pin.id}
              position={[pin.lat, pin.lng]}
              eventHandlers={{
                click: () => {
                  // We can also trigger the modal directly on click if we want
                  // but usually the Popup is good too.
                },
              }}
            >
            <Popup maxWidth={420} minWidth={280} closeButton={true}>
              <div className="px-4 py-3">
                <h3 className="font-bold text-slate-800 text-base mb-1">{pin.title}</h3>
                <p className="text-sm text-slate-600 mb-3">Narrato da: {pin.narratore}</p>
                <button
                  onClick={() => onPinClick(pin)}
                  className="w-full identita-button-yellow py-2 px-3 rounded-lg text-sm font-semibold transition-colors"
                >
                  Guarda Video
                </button>
                <button
                  type="button"
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                        `${pin.lat},${pin.lng}`
                      )}`,
                      '_blank',
                      'noopener,noreferrer'
                    )
                  }
                  className="mt-2 flex items-center justify-center w-full identita-button-yellow py-2 px-3 rounded-lg text-sm font-semibold transition-colors"
                >
                  Ottieni indicazioni
                </button>
              </div>
            </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
