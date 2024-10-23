'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Define the prop types for ClientMap
interface ClientMapProps {
  coordinates: [number, number] | null;
}

// Set up the custom icon using CDN URLs
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function MapUpdater({ coordinates }: { coordinates: [number, number] | null }) {
  const map = useMap();

  useEffect(() => {
    if (coordinates) {
      map.setView(coordinates, map.getZoom());
    }
  }, [coordinates, map]);

  return null;
}

const ClientMap: React.FC<ClientMapProps> = ({ coordinates }) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([51.505, -0.09]);

  useEffect(() => {
    if (coordinates) {
      setMapCenter(coordinates);
    }
  }, [coordinates]);

  return (
    <MapContainer center={mapCenter} zoom={13} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapUpdater coordinates={coordinates} />
      {coordinates && (
        <Marker position={coordinates} icon={customIcon}>
          <Popup>
            <span>Coordinates: {coordinates[0]}, {coordinates[1]}</span>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default ClientMap;
