import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import button from 'auth/Login';

const AuthModule = lazy(() => import('auth/Login'));
// const InventoryModule = lazy(() => import('inventory/StockLevels'));
// const FinanceModule = lazy(() => import('finance/PurchaseOrders'));

const RouterConfig = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/auth" element={<Suspense fallback={<div>Loading...</div>}><AuthModule /></Suspense>} />
      {/* <Route path="/inventory" element={<Suspense fallback={<div>Loading...</div>}><InventoryModule /></Suspense>} /> */}
      {/* <Route path="/finance" element={<Suspense fallback={<div>Loading...</div>}><FinanceModule /></Suspense>} /> */}
    </Routes>
  </BrowserRouter>
);

export default RouterConfig;
