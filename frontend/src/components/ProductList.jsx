import React from 'react';
import DataService from "../services/VenueDataService";

const ProductList = ({ Data = [] , onDeleteProduct = () => {} }) => {

    const handleDeleteProduct = async () => {
        onDeleteProduct(Data.id);
    }

    return (
        <div id="new-pr" className="d-flex justify-content-center gap-2">
            <div className="product-input d-flex justify-content-center float-left gap-2 col-12 pr-border sale-add">

                <div className='d-flex justify-content-center align-items-center product-border product-sale'> {Data.no} </div>

                <div className="d-flex align-items-center product-border product-name"> {Data.name} </div>

                <div className="d-flex justify-content-end align-items-center product-border product-sale">{Data.price} TL</div>

                <div className="d-flex align-items-center" onClick={handleDeleteProduct}>
                    <i className="fa-solid fa-trash exclude-from-print"></i>
                </div>
            </div>
        </div>
    );
}

export default ProductList;
