import React, { useEffect, useReducer, useState } from "react";
import { useLocation } from "react-router-dom";

import VenueReducer from "../services/VenueReducer";
import DataService from "../services/VenueDataService";

import Customer from './Customer';

const CustomerList = () => {

    const [customer, dispatchCustomer] = useReducer(VenueReducer, {
        data: [],
        isLoading: true,
        isSuccess: false,
        isError: false,
        isDeleted: false,
    });

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const responsePro = await DataService.listAllCustomers();
                dispatchCustomer({ type: "FETCH_SUCCESS", payload: responsePro.data });
            } catch (error) {
                dispatchCustomer({ type: "FETCH_ERROR" });
            }
        }
        fetchData();
    }, []);

    const filteredCustomers = customer.data.filter((customerItem) =>
        customerItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customerItem.phone.includes(searchTerm)
    );

    return (
        <div>
            <div className="d-flex flex-column gap-5 col-12">
                <div className="d-flex flex-column gap-3">
                    <div className=''><h1>Müşteri Listesi</h1></div>
                    <div className="d-flex"> Müşteriye satış eklemek &nbsp; <strong>Müşteri İsmi</strong> &nbsp; ya da &nbsp; <strong> Telefon Numarası</strong> &nbsp; ile arama yaparak Müşteriyi bulabilirsiniz</div>
                </div>

                <div className="d-flex gap-3 justify-content-end">
                    <label htmlFor="searchInput">Müşteri Ara:</label>
                    <input
                        type="text"
                        id="searchInput"
                        value={searchTerm}
                        placeholder="İsim ya da Telefon ?"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className='inf-border'></div>

                <div className="d-flex flex-column gap-3 col-12">
                    {filteredCustomers.map((customerItem) => (
                        <Customer key={customerItem.id} data={customerItem} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CustomerList;