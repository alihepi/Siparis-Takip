import React, { useEffect, useState } from 'react';

const calculateTotalValue = (totalValue, kdvIncluded, kdvValue, indIncluded, indValue) => {
  if (kdvIncluded && indIncluded) {
    return (totalValue + parseFloat(kdvValue) - (isNaN(parseFloat(indValue)) ? 0 : parseFloat(indValue))).toFixed(2);
  } else if (kdvIncluded) {
    return (totalValue + parseFloat(kdvValue)).toFixed(2);
  } else if (indIncluded) {
    return (totalValue - (isNaN(parseFloat(indValue)) ? 0 : parseFloat(indValue))).toFixed(2);
  } else {
    return totalValue.toFixed(2);
  }
};

const Sales = ({ totalValue, setIndirimInf = () => { }, setKdvInf = () => { }, setTotal = () => {} }) => {
  const [kdvIncluded, setKdvIncluded] = useState(false);
  const [kdvValue, setKdvValue] = useState(0);

  const [indIncluded, setIndIncluded] = useState(false);
  const [indValue, setIndValue] = useState(0);

  const kdvCheckboxChange = () => {
    setKdvIncluded(!kdvIncluded);
  };

  const indCheckboxChange = () => {
    setIndIncluded(!indIncluded);
    setIndValue(0);
  };

  const handleInputChange = (event) => {
    setIndValue(event.target.value);
    setIndirimInf(event.target.value);
  }

  useEffect(() => {
    setKdvValue((totalValue * 0.20).toFixed(2));
  }, [totalValue]);

  const totalSale = calculateTotalValue(totalValue, kdvIncluded, kdvValue, indIncluded, indValue);

  useEffect(() => {
    if (kdvIncluded) {
      setKdvInf(true);
    } else {
      setKdvInf(false);
    }
    if (!indIncluded) {
      setIndirimInf(0);
    }

    setTotal(totalSale);

  }, [totalSale]);



  return (
    <div className="d-flex justify-content-center mt-3">
      <div className="d-flex justify-content-end float-left gap-2 col-12 ">
        <div className="d-flex product-total-kdv flex-column jusitfy-content-start align-items-start gap-2">
          <div className="exclude-from-print">
            <input type="checkbox" checked={kdvIncluded} onChange={kdvCheckboxChange} /> KDV Dahil
          </div>
          <div className="exclude-from-print">
            <input type="checkbox" checked={indIncluded} onChange={indCheckboxChange} /> İndirim
          </div>
        </div>

        <div className="d-flex flex-column product-total-kdv-sale gap-2">
          {kdvIncluded && (
            <div id="kdv" className="d-flex justify-content-end float-left gap-2 product-total-sale pr-border">
              <div className="d-flex align-items-center product-total-sale1">KDV %20</div>
              <div className="d-flex align-items-center product-total-sale2">
                <div className="d-flex justify-content-end align-items-center product-total-sale3 product-border product-sale">{kdvValue} TL</div>
              </div>
            </div>
          )}

          {indIncluded && (
            <div id="kdv" className="d-flex justify-content-end float-left gap-2 product-total-sale pr-border">
              <div className="d-flex align-items-center product-total-sale1">İndirim Tutarı</div>
              <div className="d-flex align-items-center product-total-sale2">
                <div className="d-flex justify-content-end align-items-center product-total-sale3 product-border1 product-sale">
                  <input
                    type="text"
                    value={indValue}
                    onChange={handleInputChange}
                    className='ind-input'
                  /> TL
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

export default Sales;