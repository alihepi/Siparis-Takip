import React, { useEffect, useReducer, useState } from "react";
import VenueReducer from "../services/VenueReducer";
import DataService from "../services/VenueDataService";
import { useNavigate } from "react-router-dom";

import CustomerInf from './CustomerInf'
import ProductAdd from "./ProductAdd";
import Sales from "./Sales";
import SaleAdd from "./SaleAdd";
import SaleList from "./SaleList";

const Home = () => {

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

    const handleAddProduct = () => {
        navigate("/tek-satis")
    }

    const handleCustomerAddProduct = () => {
        navigate("/musteriye-satis")
    }

    const handleCustomerList = () => {
        navigate("/musteri-listesi")
    }

    const handleSaleList = () => {
        navigate("satis-listesi")
    }

    const handleProductListPage = () => {
        navigate("urun-listesi")
    }
    
    return (
        <div>
            <div className="d-flex flex-column gap-5 col-12">

                <div className="d-flex gap-3 justify-content-end flex-wrap mt-3">
                    <button type="button" className="add-pr-btn btn btn-info" onClick={handleProductListPage}>Ürün Listesi</button>
                    {/*<button type="button" className="add-pr-btn btn btn-info" onClick={handleCustomerList}>Müşteri Listesi</button>*/}
                    {/*<button type="button" className="add-pr-btn btn btn-primary" onClick={handleSaleList}>Satış Listesi</button>*/}
                    <button type="button" className="add-pr-btn btn btn-success" onClick={handleCustomerAddProduct}>Müşteriye Satış Ekle</button>
                    <button type="button" className="add-pr-btn btn btn-success" onClick={handleAddProduct}>Yeni Satış Ekle</button>
                </div>

                <div className="inf-border"></div>

                <div className="d-flex flex-column gap-3 col-12">
                    <SaleList/>
                </div>
            </div>
        </div>
    );
}

export default Home