import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

const formatPhoneNumber = (phoneNumber) => {
    return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6, 8)} ${phoneNumber.slice(8, 10)}`;
};

const CustomerInfOldSale = ({ setCust = () => { }, detaInputFalse = true }) => {

    const location = useLocation();
    const customerData = location.state && location.state.customerData;
    
    const [nameInput, setNameInput] = useState('');
    const [phoneInput, setPhoneInput] = useState('');
    const [dateInput, setDateInput] = useState('');

    const formattedDate = new Date(dateInput).toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });

    useEffect(() => {
        if (customerData && customerData.customerData.name) {
            setNameInput(customerData.customerData.name);
        }
        if (customerData && customerData.customerData.phone) {
            setPhoneInput(customerData.customerData.phone);
        }
        if (customerData && customerData.saleData.date) {
            setDateInput(customerData.saleData.date);
        }
    }, [customerData]);

    const nameInputChange = (event) => {
        setNameInput(event.target.value);
    };
    const phoneInputChange = (event) => {
        setPhoneInput(event.target.value);
    };
    const dateInputChange = (event) => {
        setDateInput(event.target.value);
    };

    useEffect(() => {
        setCust({ name: nameInput, phone: phoneInput, date: dateInput });
    }, [nameInput, phoneInput, dateInput]);



    return (
        <div className="d-flex flex-column gap-3">
            <div className="d-flex">
                <div className="customer-inf">Ad Soyad</div>
                <input
                    type="text"
                    className="customer-int-intput"
                    value={nameInput}
                    onChange={nameInputChange}
                    disabled={customerData && customerData.customerData.name}
                    placeholder='Müşteri İsmi'
                />
            </div>

            <div className="d-flex">
                <div className="customer-inf">Telefon</div>
                <input
                    type="text"
                    className="customer-int-intput"
                    value={formatPhoneNumber(phoneInput)}
                    onChange={phoneInputChange}
                    disabled={customerData && customerData.customerData.phone}
                    placeholder='Müşteri İsmi'
                />
            </div>

            <div className="d-flex">
                <div className="customer-inf">Tarih</div>
                <input
                    type="text"
                    className="customer-int-intput"
                    value={formattedDate}
                    onChange={dateInputChange}
                    disabled={customerData && customerData.customerData.name}
                    placeholder='Müşteri İsmi'
                />
            </div>            
        </div>
    );
};

export default CustomerInfOldSale;
