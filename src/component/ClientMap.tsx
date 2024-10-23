import dynamic from 'next/dynamic';

// Define the prop types for ClientMap
interface ClientMapProps {
  coordinates: [number, number] | null;
}

// Dynamically import the ClientMapInner component
const DynamicClientMap = dynamic(() => import('./ClientMapInner').then(mod => mod.default), {
  ssr: false,
  loading: () => <p>Loading map...</p>
});

const ClientMap: React.FC<ClientMapProps> = ({ coordinates }) => {
  return <DynamicClientMap coordinates={coordinates} />;
};

export default ClientMap;
