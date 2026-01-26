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
    <div className="h-[500px] w-full rounded-2xl overflow-hidden shadow-lg border-4 border-white">
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
            <Popup maxWidth={800} minWidth={360}>
              <div className="p-4 max-w-[420px]">
                <h3 className="font-bold text-slate-800 text-xl mb-2">{pin.title}</h3>
                <p className="text-base text-slate-600 mb-4">{pin.description}</p>
                <button
                  onClick={() => onPinClick(pin)}
                  className="w-full bg-indigo-400 text-white py-2.5 px-4 rounded-xl text-base font-semibold hover:bg-indigo-500 transition-colors"
                >
                  Guarda Video
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
