import React, { useEffect, useReducer, useState } from "react";
import VenueReducer from "../services/VenueReducer";
import DataService from "../services/VenueDataService";

import { useNavigate } from "react-router-dom";

const SaleAdd = ({ saleData = [], deleteFalse = false, customerName = "", customerData = [] }) => {

  const navigate = useNavigate();

  const [product, dispatchProduct] = useReducer(VenueReducer, {
    data: [],
    isLoading: true,
    isSuccess: false,
    isError: false,
    isDeleted: false,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const responsePro = await DataService.listAllProducts();
        dispatchProduct({ type: "FETCH_SUCCESS", payload: responsePro.data });
      } catch (error) {
        dispatchProduct({ type: "FETCH_ERROR" });
      }
    }
    fetchData();
  }, []);

  const getProductNames = () => {
    if (saleData.saleList) {
      const productNames = saleData.saleList.map((saleItem) => {
        const matchingProduct = product.data.find((productItem) => productItem.no === saleItem.no);
        return matchingProduct ? matchingProduct.name : null;
      });

      return productNames.filter((name) => name !== null);
    }
    return [];
  };

  const saleProductNames = getProductNames();

  const formattedDate = new Date(saleData.date).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleSalesPage = () => {
    const customer = {
      customerData: {
        id: customerData.id,
        name: customerData.name,
        phone: customerData.phone
      },
      saleData: saleData,
    }
    navigate(`/musteri/${customerData.id}/satis-detay/${saleData._id}`, { state: { customerData: customer } });
  }

  return (
    <div id="new-pr" className="d-flex flex-column justify-content-center gap-2" onClick={handleSalesPage}>
      <strong>{customerName}</strong>
      <div className="product-input d-flex justify-content-center float-left gap-2 col-12 pr-border sale-add">

        <div className='d-flex justify-content-center align-items-center product-border product-sale'> {formattedDate} </div>

        <div className="d-flex align-items-center product-border product-name sale-add-ovrflw">
          {saleProductNames.join(", ")}
        </div>
        <div className="d-flex justify-content-end align-items-center product-border product-sale">{saleData.total} TL</div>

        {deleteFalse ? (
          <></>
        ) : (
          <></>
        )}

      </div>
    </div>
  );
};

export default SaleAdd;
