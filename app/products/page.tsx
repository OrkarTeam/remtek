import React, { Suspense } from 'react';
import ProductPage from '@/components/ProductPage';

const Loading = () => <div>Loading...</div>;

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <ProductPage />
      </Suspense>
    </div>
  );
}

export default App;
