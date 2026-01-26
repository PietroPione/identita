'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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

export default function MapComponent({ pins, onPinClick }) {
  return (
    <div className="h-[500px] w-full rounded-2xl overflow-hidden shadow-lg border-4 border-white">
      <MapContainer
        center={[43.5, 12.0]}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
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
            <Popup>
              <div className="p-1 max-w-[200px]">
                <h3 className="font-bold text-slate-800 text-base mb-1">{pin.title}</h3>
                <p className="text-sm text-slate-600 mb-2">{pin.description}</p>
                <button
                  onClick={() => onPinClick(pin)}
                  className="w-full bg-indigo-400 text-white py-1.5 px-3 rounded-lg text-sm font-medium hover:bg-indigo-500 transition-colors"
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
