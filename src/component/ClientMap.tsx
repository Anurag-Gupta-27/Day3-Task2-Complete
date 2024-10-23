'use client';

import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
});

interface ClientMapProps {
  coordinates: [number, number] | null;
}

function MapUpdater({ coordinates }: ClientMapProps) {
  const map = useMap();

  useEffect(() => {
    if (coordinates) {
      map.setView(coordinates, 13);
    }
  }, [coordinates, map]);

  return coordinates ? <Marker position={coordinates} /> : null;
}

export default function ClientMap({ coordinates }: ClientMapProps) {
  const [mapCenter, setMapCenter] = useState<[number, number]>([51.505, -0.09]);

  useEffect(() => {
    if (coordinates) {
      setMapCenter(coordinates);
    }
  }, [coordinates]);

  return (
    <MapContainer center={mapCenter} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapUpdater coordinates={coordinates} />
    </MapContainer>
  );
}
