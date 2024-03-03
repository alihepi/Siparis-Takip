import React, { useEffect, useReducer, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import VenueReducer from "../services/VenueReducer";
import DataService from "../services/VenueDataService";

import ProductAdd from "./ProductAdd";
import CustomerInf from "./CustomerInf";
import Sales from "./Sales";

const ProductPageSingle = ({ setCustomerSalesInf = () => { } }) => {

    const location = useLocation();
    const customerData = location.state && location.state.customerData;

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

    const [productList, setProductList] = useState([{ id: 1 }]);
    const [productTotals, setProductTotals] = useState({});
    const [isReceiptCreated, setIsReceiptCreated] = useState(true);

    const [realList, setRealList] = useState({});
    const [prod, setProd] = useState({});
    const [cust, setCust] = useState({});

    const [kdvInf, setKdvInf] = useState(false);
    const [indirimInf, setIndirimInf] = useState();

    useEffect(() => {
        if(prod.product){
            setRealList(prevRealList => ({ ...prevRealList, [prod.product.no]: prod }));
        }
        /*
        if (prod.product && realList.hasOwnProperty(prod.product.no)) {
            alert(prod.product.no + " No'lu ürün önceden eklenmiş \n\nTekrardan ekleme yapılması önerilmez! \nHatalar oluşabilir!");
        } else if(prod.product) {
            setRealList(prevRealList => ({ ...prevRealList, [prod.product.no]: prod }));
        }*/
    }, [productList, prod]);

    /*
    useEffect(() => {
        setCustomerSalesInf({customer: cust, sale: prod});
    }, [prod, cust]);
    */

    const handleAddProduct = () => {
        //setProd("");
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

    const calculateGrandTotal = () => {
        const valuesArray = Object.values(productTotals);
        return valuesArray.reduce((acc, current) => acc + current, 0);
    };

    const [total, setTotal] = useState(0);

    const handleCreateReceipt = async () => {
        try {
            if (!cust.name) {
                alert("Ad Soyad alanı zorunlu! \nLütfen Ad Soyad Bilgisi giriniz");
                return;
            }
            if (!cust.phone) {
                alert("Telefon alanı zorunlu! \nLütfen Telefon Bilgisi giriniz");
                return;
            }
            if (!cust.date) {
                alert("Tarih alanı zorunlu! \nLütfen Tarih Bilgisi giriniz");
                return;
            }

            const response = await DataService.createCustomer({
                name: cust.name,
                phone: cust.phone,
                sales: [
                    {
                        date: cust.date,
                        totalPrice: calculateGrandTotal(),
                        total: total,
                        kdv: kdvInf,
                        indirim: indirimInf,
                        saleList: Object.values(realList).map(list => ({
                            no: list.product.no,
                            piece: list.prodNum
                        }))
                    }
                ]
            });


            const confirmDelete = window.confirm("Yeni Müşteri ve Satış başarıyla oluşturuldu \nSipariş Fişi oluşturmak istermisiniz? \n(Fiş 10sn içerisinde otomatik olarak oluşturulacaktır) \n\nİptale basmanız durumunda Anasayfaya yönlendirileceksiniz!");

            if (confirmDelete) {
                const customerData = {
                    customerData: {
                        id: response.data._id,
                        name: response.data.name,
                        phone: response.data.phone
                    },
                    saleData: {
                        _id: response.data.sales[0]._id,
                        date: response.data.sales[0].date,
                        indirim: response.data.sales[0].indirim,
                        kdv: response.data.sales[0].kdv,
                        saleList: response.data.sales[0].saleList,
                        total: response.data.sales[0].total,
                        totalPrice: response.data.sales[0].totalPrice
                    }
                }
                navigate(`/sales-receipt/${response.data._id}/sales/${response.data.sales[0]._id}`, { state: { customerData: customerData } });
            } else {
                navigate('/');
            }

        } catch (error) {
            console.error("Müşteri ve Satış oluşturulurken hata:", error.response.data);
            alert(`${error.response.data.error}`);
            if (error.response.data.status === "Hata2") {
                navigate('/');
            }
        }
    };

    return (
        <div>
            <div className="d-flex flex-column gap-5">
                <div className="d-flex justify-content-center">
                    <div className="d-flex flex-column col-12 gap-3">
                        <div className="inf-border"><h4>Müşteri Bilgileri</h4></div>
                        <CustomerInf setCust={setCust} customerData={customerData} />
                    </div>
                </div>

                <div className="d-flex flex-column justify-content-center gap-3 exclude-from-print">
                    <div className="exclude-from-print">
                        <div className="d-flex justify-content-center">
                            <div className="d-flex justify-content-end col-12">
                                <button type="button" className="add-pr-btn btn btn-success" onClick={handleAddProduct}>Ürün Ekle</button>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex float-left red"><strong>Dikkat!</strong> &nbsp; aynı "Ürün No" ya sahip ürünlerin aynı liste içerisinde birden fazla kullanılmsı önerilmez</div>

                    <div className="d-flex justify-content-center gap-2 mt-4">
                        <div className="inf-border col-12 "><h4>Sipariş Bilgileri</h4></div>
                    </div>

                    <div className="d-flex flex-column gap-2">
                        <div className="d-flex justify-content-center">
                            <div className="product-input d-flex justify-content-center float-left gap-2 col-12">
                                <div className="d-flex align-items-center product-inf product-inf-print1">Ürün No</div>
                                <div className="d-flex align-items-center product-inf product-inf-print2">Ürün Adı</div>
                                <div className="d-flex align-items-center product-inf product-inf-print3">Adet</div>
                                <div className="d-flex align-items-center product-inf product-inf-print4">Adet Fiyatı</div>
                                <div className="d-flex align-items-center product-inf product-inf-print5">Toplam Tutar</div>
                            </div>
                        </div>

                        {productList.map(item => (
                            <ProductAdd
                                key={item.id}
                                onDelete={() => handleProductDelete(item.id)}
                                onTotalChange={(value) => handleProductTotalChange(item.id, value)}
                                setProd={setProd}
                            />
                        ))}

                        <Sales totalValue={calculateGrandTotal()} setIndirimInf={setIndirimInf} setKdvInf={setKdvInf} setTotal={setTotal} />

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

export default ProductPageSingle;
