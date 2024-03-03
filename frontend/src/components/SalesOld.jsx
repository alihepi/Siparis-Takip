import React, { useEffect, useState } from 'react';

const calculateTotalValue = (total, kdv, indirim) => {
  var indValue = parseFloat(indirim);
  var kdvValue = total * 0.2;

  if (kdv === "true" && indValue === 0) {
    return (total + kdvValue).toFixed(2);
  } else if (kdv === "false" && indValue !== 0) {
    return (total - indValue).toFixed(2);
  } else if (kdv === "true" && indValue !== 0) {
    return (total + kdvValue - indValue).toFixed(2);
  } else {
    return total.toFixed(2);
  }
};


const SalesOld = ({ data = {} }) => {

  const kdvCheckboxChange = () => {
  };

  const indCheckboxChange = () => {
  };

  const handleInputChange = (event) => {

  };

  const totalSale = calculateTotalValue( data.totalPrice, data.kdv, data.indirim );

  return (
    <div className="d-flex justify-content-center mt-3">
      <div className="d-flex justify-content-end float-left gap-2 col-12 ">
        <div className="d-flex product-total-kdv flex-column jusitfy-content-start align-items-start gap-2">
          <div className="exclude-from-print">
            <input type="checkbox" checked={data.kdv === "true"} onChange={kdvCheckboxChange} /> KDV Dahil
          </div>
          <div className="exclude-from-print">
            <input type="checkbox" checked={data.indirim != 0} onChange={indCheckboxChange} /> İndirim
          </div>
        </div>

        <div className="d-flex flex-column product-total-kdv-sale gap-2">
          {data.kdv === "true" && (
            <div id="kdv" className="d-flex justify-content-end float-left gap-2 product-total-sale pr-border">
              <div className="d-flex align-items-center product-total-sale1">KDV %20</div>
              <div className="d-flex align-items-center product-total-sale2">
                <div className="d-flex justify-content-end align-items-center product-total-sale3 product-border product-sale">{(data.totalPrice * 0.2).toFixed(2)} TL</div>
              </div>
            </div>
          )}

          {data.indirim != 0 && (
            <div id="kdv" className="d-flex justify-content-end float-left gap-2 product-total-sale pr-border">
              <div className="d-flex align-items-center product-total-sale1">İndirim Tutarı</div>
              <div className="d-flex align-items-center product-total-sale2">
                <div className="d-flex justify-content-end align-items-center product-total-sale3 product-border1 product-sale">
                  <input
                    type="text"
                    value={(parseFloat(data.indirim)).toFixed(2)}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className='ind-input'
                  />  TL
                </div>
              </div>
            </div>
          )}

          <div id="total-sale" className="d-flex justify-content-end float-left gap-2 product-total-sale pr-border">
            <div className="d-flex align-items-center product-total-sale1">Toplam Tutar </div>
            <div className="d-flex align-items-center product-total-sale2">
              <div id='sale' className="d-flex justify-content-end align-items-center product-total-sale3 product-border product-sale">
                {totalSale + ' TL'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesOld;
