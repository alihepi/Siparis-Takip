import React, { useEffect, useReducer } from 'react';
import VenueReducer from '../services/VenueReducer';
import DataService from '../services/VenueDataService';
import SaleAdd from './SaleAdd';

const SaleList = () => {
  const [customers, dispatchCustomers] = useReducer(VenueReducer, {
    data: [],
    isLoading: true,
    isSuccess: false,
    isError: false,
    isDeleted: false,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const responseCustomers = await DataService.listAllCustomers();
        dispatchCustomers({ type: 'FETCH_SUCCESS', payload: responseCustomers.data });
      } catch (error) {
        dispatchCustomers({ type: 'FETCH_ERROR' });
      }
    }
    fetchData();
  }, []);

  const allSales = customers.data.flatMap((customer) =>
    customer.sales.map((sale) => ({ ...sale, customerName: customer }))
  );

  const recentSales = allSales
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className='mt-3'>
      <div className="d-flex flex-column gap-4 col-12">
        <div className='inf-border'><h4>Son 5 Satış</h4></div>
        {recentSales.map((sale, index) => (
          <SaleAdd key={index} saleData={sale} customerData={sale.customerName} deleteFalse={true}/>
        ))}
      </div>
    </div>
  );
};

export default SaleList;
