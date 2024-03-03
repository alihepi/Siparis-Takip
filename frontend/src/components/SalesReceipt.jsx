import React, { useState, useEffect, useReducer, useRef } from "react";
import { useLocation } from "react-router-dom";
import VenueReducer from "../services/VenueReducer";
import DataService from "../services/VenueDataService";

const formatPhoneNumber = (phoneNumber) => {
    return `+90 ${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6, 8)} ${phoneNumber.slice(8, 10)}`;
};

const SalesReceipt = () => {
    const location = useLocation();
    const customerData = location.state && location.state.customerData;

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

    useEffect(() => {
        // Sayfanın yazdırılması 
    }, []);

    const customerDate = customerData.saleData.date ? new Date(customerData.saleData.date) : new Date();
    const formattedCustomerDate = customerDate.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });

    const productName = (prodNo) => {
        const matchedProduct = product.data.find(item => item.no === parseInt(prodNo));
        return matchedProduct;
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            window.print();
        }, 7000);
        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <div className='d-flex flex-column col-12'>
            <div className='d-flex float-left'>
                <div className='d-flex col-9'><h4>Müşteri Bilgileri</h4></div>
                <div className='d-flex float-left col-3 align-items-center justify-content-end'>
                    <div><strong>Tarih :</strong> {formattedCustomerDate}</div>
                </div>
            </div>

            <div className='inf-border opacity-50 mt-3'></div>

            <div className='d-flex gap-2 flex-column col-12 mt-4 '>
                <div className='d-flex float-left'><strong className='receipt-set1'>Ad Soyad</strong> : &nbsp; {customerData.customerData.name}</div>
                <div className='d-flex float-left'><strong className='receipt-set1'>Telefon</strong> : &nbsp; {formatPhoneNumber(customerData.customerData.phone)}</div>
            </div>

            <div className='inf-border opacity-25 mt-4'></div>

            <div className='mt-4 d-flex float-left justify-content-between'>
                &nbsp;
                <div className='col-1 text-center inf-border'><strong> Ürün No</strong></div>
                <div className='col-5 inf-border'><strong>Ürün Adı</strong></div>
                <div className='col-1 text-center inf-border'><strong>Adet</strong></div>
                <div className='col-2 text-center inf-border'><strong>Adet Fiyatı</strong></div>
                <div className='col-2 text-center inf-border'><strong>Toplam Tutar</strong></div>
            </div>

            <div className="mt-2"></div>

            {customerData.saleData.saleList.map((data, index) => (
                <div className="mt-2" key={index}>
                    <div className="inf-border opacity-25"></div>
                    <div className='d-flex float-left justify-content-between'>
                        <div className="opacity-50">{(index + 1) + '.'}</div>
                        <div className='col-1 text-center'>{data.no}</div>
                        <div className='col-5 '>{productName(data.no)?.name}</div>
                        <div className='col-1 text-center'>{data.piece}</div>
                        <div className='col-2 text-center'>{productName(data.no)?.price}</div>
                        <div className='col-2 text-center'>{(productName(data.no)?.price * data.piece).toFixed(2)}</div>
                    </div>
                    <div className="inf-border opacity-25"></div>
                </div>
            ))}

            <div className='mt-5 d-flex float-left col-12 justify-content-end'>
                <div className="col-3 d-flex flex-column align-items-end">
                    {customerData.saleData.kdv != "false" ? (
                        <div className="d-flex float-left">
                            <div className='receipt-set1'><strong>KDV %20</strong></div> : &nbsp;
                            <div className="receipt-set2 text-end">{((customerData.saleData.totalPrice) * 0.2).toFixed(2)}</div>
                        </div>
                    ) : null}
                    {customerData.saleData.indirim != 0 ? (
                        <div className="d-flex float-left">
                            <div className='receipt-set1'><strong>İndirim</strong></div> : &nbsp;
                            <div className="receipt-set2 text-end" >{(parseFloat(customerData.saleData.indirim)).toFixed(2)}</div>
                        </div>
                    ) : null}
                    <div className="d-flex float-left">
                        <div className='receipt-set1'><strong>Toplam Tutar</strong></div> : &nbsp;
                        <div className="receipt-set2 text-end" >{customerData.saleData.total.toFixed(2)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SalesReceipt;
