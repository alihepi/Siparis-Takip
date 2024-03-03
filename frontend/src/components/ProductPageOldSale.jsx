import React, { useEffect, useReducer, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import VenueReducer from "../services/VenueReducer";
import DataService from "../services/VenueDataService";

import ProductAdd from "./ProductAdd";
import Sales from "./Sales";
import CustomerInfOldSale from "./CustomerInfOldSale";
import ProductAddSingle from "./ProductAddSingle";
import SalesOld from "./SalesOld";

const ProductPageOldSale = ({ setCustomerSalesInf = () => { } }) => {

    const navigate = useNavigate();

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

    const [productList, setProductList] = useState([{ id: 1 }]);
    const [productTotals, setProductTotals] = useState({});
    const [isReceiptCreated, setIsReceiptCreated] = useState(true);

    const [realList, setRealList] = useState({});
    const [prod, setProd] = useState({});
    const [cust, setCust] = useState({});

    const [kdvInf, setKdvInf] = useState(false);
    const [indirimInf, setIndirimInf] = useState();

    useEffect(() => {
        if (prod.product) {
            setRealList(prevRealList => ({ ...prevRealList, [prod.product.no]: prod }));
        }
    }, [productList, prod]);

    /*
    useEffect(() => {
        setCustomerSalesInf({customer: cust, sale: prod});
    }, [prod, cust]);
    */

    const handleAddProduct = () => {
        const newProductId = Math.random();
        setProductList(prevList => [...prevList, { id: newProductId }]);
        setProductTotals(prevTotals => ({ ...prevTotals, [newProductId]: 0 }));
    };

    const handleProductDelete = (id) => {
        setProductList(prevList => prevList.filter(item => item.id !== id));
        setProductTotals(prevTotals => {
            const { [id]: deletedItem, ...rest } = prevTotals;
            return rest;
        });
    };

    const handleProductTotalChange = (id, value) => {
        setProductTotals(prevTotals => ({ ...prevTotals, [id]: value }));
    };

    // customerData.saleData.date'den tarih bilgisini alın
    const customerDate = new Date(customerData.saleData.date);

    // Tarihi istediğiniz formata çevirin
    const formattedCustomerDate = customerDate.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const handleDeleteSaleList = async () => {

        const confirmDelete = window.confirm(formattedCustomerDate + " Tarihli Sipariş silinecektir \nBu siparişi silmek istediğinizden emin misiniz?\nBu işlem geri alınamaz.");

        if (confirmDelete) {
            const customerId = customerData.customerData.id;
            const saleListId = customerData.saleData._id;

            try {
                await DataService.removeSaleListFromCustomer(customerId, saleListId);
                alert(formattedCustomerDate + " Tarihli Sipariş Başarıyla Silindi \nAnasayfaya yönlendiriliyorsunuz");
                navigate('/');
            } catch (error) {
                console.error("Sipariş Silme Hatası:", error);
            }
        }

    }

    const handleCreateReceipt = async () => {
        navigate(`/sales-receipt/${customerData.customerData.id}/sales/${customerData.saleData._id}`, { state: { customerData: customerData } });
    };

    return (
        <div>
            <div className="d-flex flex-column gap-5">
                <div className="d-flex justify-content-center">
                    <div className="d-flex flex-column col-12 gap-3">
                        <div className="inf-border"><h4>Müşteri Bilgileri</h4></div>
                        <CustomerInfOldSale setCust={setCust} customerData={customerData} />
                    </div>
                </div>

                <div className="d-flex flex-column justify-content-center gap-3 exclude-from-print">

                    <div className="exclude-from-print">
                        <div className="d-flex justify-content-center">
                            <div className="d-flex justify-content-end col-12 gap-3">
                                <button type="button" className="add-pr-btn btn btn-danger" onClick={handleDeleteSaleList}>Bu Siparişi Sil</button>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center gap-2 mt-5">
                        <div className="inf-border col-12 "><h4>Sipariş Bilgileri</h4></div>
                    </div>

                    <div className="d-flex flex-column gap-2">
                        <div className="d-flex justify-content-center">
                            <div className="product-input d-flex justify-content-center float-left gap-2 col-12 old">
                                <div className="d-flex align-items-center product-inf product-inf-print1">Ürün No</div>
                                <div className="d-flex align-items-center product-inf product-inf-print2">Ürün Adı</div>
                                <div className="d-flex align-items-center product-inf product-inf-print3">Adet</div>
                                <div className="d-flex align-items-center product-inf product-inf-print4">Adet Fiyatı</div>
                                <div className="d-flex align-items-center product-inf product-inf-print5">Toplam Tutar</div>
                            </div>
                        </div>

                        {customerData.saleData.saleList.map(item => (
                            <ProductAddSingle
                                key={item._id}
                                onTotalChange={(value) => handleProductTotalChange(item.id, value)}
                                data={item}
                            />
                        ))}

                        <SalesOld data={customerData.saleData} />

                        <div className="exclude-from-print">
                            <div className="d-flex justify-content-center mt-5">
                                <div className="d-flex justify-content-end col-12 gap-3">
                                    <button type="button" className="add-pr-btn btn btn-info" onClick={handleCreateReceipt}>Fiş Oluştur</button>
                                    {/*<button type="button" className="add-pr-btn btn btn-primary" >Sipariş Oluştur</button>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPageOldSale;
