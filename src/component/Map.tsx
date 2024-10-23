

import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map() {
  useEffect(() => {
    // Check if window is defined (we're on the client side)
    if (typeof window !== 'undefined') {
      // Initialize the map
      const map = L.map('map').setView([51.505, -0.09], 13);

      // Add the tile layer (you can change this to any tile provider you prefer)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Clean up function
      return () => {
        map.remove();
      };
    }
  }, []);

  return <div id="map" style={{ height: '100vh', width: '100%' }} />;
}