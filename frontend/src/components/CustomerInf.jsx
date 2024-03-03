import React, { useEffect, useState } from 'react';

const formatPhoneNumber = (phoneNumber) => {
    return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6, 8)} ${phoneNumber.slice(8, 10)}`;
};

const CustomerInf = ({ setCust = () => { }, detaInputFalse = true, customerData = [] }) => {
    const [nameInput, setNameInput] = useState('');
    const [phoneInput, setPhoneInput] = useState('');
    const [dateInput, setDateInput] = useState('');

    useEffect(() => {
        if (customerData && customerData.name) {
            setNameInput(customerData.name);
        }
        if (customerData && customerData.phone) {
            setPhoneInput(customerData.phone);
        }
        if (customerData && customerData.date) {
            setDateInput(customerData.date);
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
                    disabled={customerData && customerData.name}
                    placeholder='Müşteri İsmi'
                />
            </div>

            {detaInputFalse ? (
                <><div className="d-flex">
                    <div className="customer-inf">Telefon</div>
                    <input
                        type="text"
                        className="customer-int-intput"
                        value={phoneInput}
                        onChange={phoneInputChange}
                        disabled={customerData && customerData.phone}
                        placeholder='Başında "0" olmadan yazınız'
                    />
                </div>

                    <div className="d-flex">
                        <div className="customer-inf">Tarih</div>
                        <input
                            type="date"
                            className="customer-int-intput"
                            value={dateInput}
                            onChange={dateInputChange}
                            disabled={customerData && customerData.date}
                        />
                    </div>
                    </>
            ) : (
                <div className="d-flex">
                    <div className="customer-inf">Telefon</div>
                    <input
                        type="text"
                        className="customer-int-intput"
                        value={formatPhoneNumber(phoneInput)}
                        onChange={phoneInputChange}
                        disabled={customerData && customerData.phone}
                    />
                </div>
            )}
        </div>
    );
};

export default CustomerInf;
