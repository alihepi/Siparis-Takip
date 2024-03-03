import React, { useEffect, useReducer, useState } from "react";


const CustomerAddSale = () => {

    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div>
            <div className="d-flex flex-column gap-5">
                <div className="d-flex gap-3 justify-content-start align-items-center">
                    <label htmlFor="searchInput">Müşteri Ara:</label>
                    <input
                        type="text"
                        id="searchInput"
                        value={searchTerm}
                        placeholder="İsim ya da Telefon ?"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="d-flex justify-content-center">
                    <div className="d-flex flex-column col-12 gap-3">
                        <div className="inf-border"><h4>Müşteri Bilgileri</h4></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerAddSale
