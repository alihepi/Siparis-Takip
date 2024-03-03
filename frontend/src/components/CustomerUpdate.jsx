import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import DataService from "../services/VenueDataService";

const CustomerUpdate = ({ }) => {

    const navigate = useNavigate();

    const location = useLocation();
    const customerData = location.state && location.state.customerData;

    const [nameInput, setNameInput] = useState(customerData.name);
    const [phoneInput, setPhoneInput] = useState(customerData.phone);

    const nameInputChange = (event) => {
        setNameInput(event.target.value);
    };
    const phoneInputChange = (event) => {
        setPhoneInput(event.target.value);
    };

    const handleUpdateCustomer = async () => {

        if ((nameInput === "") || (phoneInput === "") || (nameInput === "" && phoneInput === "")) {
            alert("Kullanıcı bilgileri boş olamaz!");
            return;
        }

        try {
            const customerId = customerData.id;
            const updatedCustomerData = { name: nameInput, phone: phoneInput };

            await DataService.updateCustomer(customerId, updatedCustomerData);

            alert("Müşteri ve Satış Bilgileri başarıyla güncellendi \nMüşteri Listesi sayfasına yönlendiriliyorsunuz!");
            navigate('/musteri-listesi');
        } catch (error) {
            console.error("Müşteri güncelleme hatası:", error);
        }
    }

    const handleDeleteCustomer = async () => {

        const confirmDelete = window.confirm("Müşteriyi Silmeniz durumunda satış bilgileri dahil tüm bilgiler silinecektir \nBu müşteri silmek istediğinizden emin misiniz?\nBu işlem geri alınamaz.");

        if (confirmDelete) {

            const customerId = customerData.id;

            try {
                await DataService.deleteCustomer(customerId);
                alert("Müşteri ve Satış Bilgileri başarıyla silindi \nMüşteri Listesi sayfasına yönlendiriliyorsunuz!");
                navigate('/musteri-listesi');
            } catch (error) {
                console.error("Müşteri silme hatası:", error);
            }
        }

    };

    return (
        <div>

            <div className='d-flex flex-column gap-5'>

                <div className="inf-border"><h4>Müşteri Bilgileri</h4></div>

                <div className="d-flex flex-column gap-3">

                    <div className="d-flex">
                        <div className="customer-inf">Ad Soyad</div>
                        <input
                            type="text"
                            className="customer-int-intput"
                            value={nameInput}
                            onChange={nameInputChange}
                        />
                    </div>


                    <div className="d-flex">
                        <div className="customer-inf">Telefon</div>
                        <input
                            type="text"
                            className="customer-int-intput"
                            value={phoneInput}
                            onChange={phoneInputChange}
                            placeholder='Başında 0 olmadan yazınız!'
                        />
                    </div>

                    <div className='red'>Telefon Numarasında başında 0 olmadan yazınız</div>

                </div>

                <div className="d-flex justify-content-center">
                    <div className="d-flex justify-content-end col-12 gap-3">
                        <button type="button" className="add-pr-btn btn btn-success" onClick={handleUpdateCustomer}>Müşteri Düzenlemeyi Kaydet</button>
                        <button type="button" className="add-pr-btn btn btn-danger" onClick={handleDeleteCustomer}>Müşteriyi Sil</button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default CustomerUpdate
