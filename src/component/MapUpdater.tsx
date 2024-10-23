import { useEffect } from 'react';
import { useMap, Marker } from 'react-leaflet';

interface MapUpdaterProps {
  coordinates: [number, number] | null;
}

export default function MapUpdater({ coordinates }: MapUpdaterProps) {
  const map = useMap();

  useEffect(() => {
    if (coordinates) {
      map.setView(coordinates, 13);
    }
  }, [coordinates, map]);

  return coordinates ? <Marker position={coordinates} /> : null;
}
