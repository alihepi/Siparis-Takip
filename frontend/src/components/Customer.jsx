import React from 'react';
import { useNavigate } from "react-router-dom";

const formatPhoneNumber = (phoneNumber) => {
    return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6, 8)} ${phoneNumber.slice(8, 10)}`;
};

const Customer = ({ data }) => {
    const navigate = useNavigate();

    const latestOrderDate = data.sales.reduce((latestDate, sale) => {
        const saleDate = new Date(sale.date);
        return saleDate > latestDate ? saleDate : latestDate;
    }, new Date(0));

    const formattedLatestOrderDate = latestOrderDate.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const handleOpenCustomerPage = () => {
        navigate(`/musteri/${data.id}`, { state: { customerData: data } });
    };

    return (
        <div onClick={handleOpenCustomerPage} >
            <div className='d-flex float-left gap-2 pr-border customer-list'>
                <div className='product-border customer-list-name'>
                    {data.name}
                </div>
                <div className='product-border customer-list-phone'>
                    {formatPhoneNumber(data.phone)}
                </div>
                <div className='product-border customer-list-other'>
                    Son Sipariş Tarihi: {formattedLatestOrderDate}
                </div>
            </div>
        </div>
    );
};

export default Customer;
