

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const DynamicMap = dynamic(() => import('../Map'), {
  ssr: false,
  loading: () => <p>A map is loading</p>
});

export default function DynamicMapLoader() {
  return (
    <Suspense fallback={<p>Loading map...</p>}>
      <DynamicMap />
    </Suspense>
  );
}
