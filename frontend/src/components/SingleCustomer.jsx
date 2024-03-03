import React, { useEffect, useReducer } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import VenueReducer from "../services/VenueReducer";
import DataService from "../services/VenueDataService";
import CustomerInf from './CustomerInf';
import SaleAdd from "./SaleAdd";

const SingleCustomer = () => {

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

    const handleAddProduct = () => {
        navigate(`/musteri/${customerData.id}/satis`, { state: { customerData: customerData } });
    }

    const handleUpdateCustomer = () => {
        navigate(`/musteri/${customerData.id}/guncelle`, { state: { customerData: customerData } });
    }

    return (
        <div>
            <div className="d-flex flex-column gap-5">
                <div className="d-flex justify-content-center">
                    <div className="d-flex flex-column col-12 gap-3">
                        <div className="inf-border"><h4>Müşteri Bilgileri</h4></div>
                        <CustomerInf detaInputFalse={false} customerData={customerData} />
                    </div>
                </div>

                <div className="d-flex flex-column justify-content-center gap-3 exclude-from-print">
                    <div className="exclude-from-print">
                        <div className="d-flex justify-content-center">
                            <div className="d-flex justify-content-end col-12 gap-3">
                                <button type="button" className="add-pr-btn btn btn-success" onClick={handleUpdateCustomer}>Müşteri Düzenle</button>
                                <button type="button" className="add-pr-btn btn btn-primary" onClick={handleAddProduct}>Sipariş Ekle</button>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center gap-2">
                        <div className="inf-border col-12 "><h4>Geçmiş Siparişler</h4></div>
                    </div>

                    {customerData && customerData.sales && customerData.sales.map((sale, index) => (
                        <SaleAdd key={index} saleData={sale} products={product.data} customerData={customerData}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SingleCustomer;