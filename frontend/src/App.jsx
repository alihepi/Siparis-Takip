import { useState } from 'react'
import { Routes, Route } from "react-router-dom";

import './App.css'
import '../src/css/settings.css'
import '../src/css/special.css'
import '../src/css/printFish.css'

import Home from './components/Home'
import ProductPage from './components/ProductPage'
import ProductPageSingle from './components/ProductPageSingle'
import SingleCustomer from './components/SingleCustomer';
import PageNotFound from './components/PageNotFound';
import CustomerList from './components/CustomerList';
import SaleList from './components/SaleList';
import ProductListPage from './components/ProductListPage';
import CustomerUpdate from './components/CustomerUpdate';
import CustomerAddSale from './components/CustomerAddSale';
import ProductPageOldSale from './components/ProductPageOldSale';
import SalesReceipt from './components/SalesReceipt';
import Template from './components/Template';

function App() {
  return (
    <div >

      <Routes>

        <Route path="/" element={<Template />}>

          <Route path="/" element={<Home />} />

          <Route path="/urun-listesi" element={<ProductListPage />} />

          <Route path='/musteri-listesi' element={<CustomerList />} />

          <Route path="/musteri" element={<ProductPage />} />
          <Route path="/musteri/:id/guncelle" element={<CustomerUpdate />} />
          <Route path="/musteri/:id" element={<SingleCustomer />} />
          <Route path="/musteri/:id/satis" element={<ProductPage />} />

          <Route path="/musteri/:id/satis-detay/:id" element={<ProductPageOldSale />} />

          <Route path="/tek-satis" element={<ProductPageSingle />} />

          <Route path="/musteriye-satis" element={<CustomerList />} />

          <Route path="/satis-listesi" element={<SaleList />} />

          <Route path="*" element={<PageNotFound />} />

        </Route>

        <Route path="/sales-receipt/:id/sales/:id" element={<SalesReceipt />} />

      </Routes>
    </div>
  )
}

export default App
