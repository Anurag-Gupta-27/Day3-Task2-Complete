import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface ClientMapProps {
  coordinates: [number, number] | null;
}

const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const ClientMapInner: React.FC<ClientMapProps> = ({ coordinates }) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!coordinates) return;

    if (!mapRef.current) {
      mapRef.current = L.map('map', { center: coordinates, zoom: 13 });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
    } else {
      mapRef.current.setView(coordinates);
    }

    const marker = L.marker(coordinates, { icon: customIcon }).addTo(mapRef.current);

    return () => {
      if (marker) {
        marker.remove();
      }
    };
  }, [coordinates]);

  return (
    <div id="map" style={{ height: "100%", width: "100%" }} />
  );
};

export default ClientMapInner;
