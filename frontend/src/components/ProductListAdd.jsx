import React, { useEffect, useState } from 'react';

const ProductListAdd = ({ Data = [] , setNewProductInf = () => {}}) => {
    const [productNo, setProductNo] = useState('');
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');

    const handleProductNoChange = (e) => {
        setProductNo(e.target.value);
    };

    const handleProductNameChange = (e) => {
        setProductName(e.target.value);
    };

    const handleProductPriceChange = (e) => {
        setProductPrice(e.target.value);
    };

    useEffect(() => {
        setNewProductInf({no: productNo, name: productName, price: productPrice})
    }, [productNo, productName, productPrice])

    return (
        <div key={Data.id} id="new-pr" className="d-flex justify-content-center gap-2">
            <div className="product-input d-flex justify-content-center float-left gap-2 col-12 pr-border sale-add">

                <div className='d-flex justify-content-center align-items-center product-border-1 product-sale '>
                    <input
                        className="text-center"
                        type='number'
                        placeholder="Ürün No"
                        value={productNo}
                        onChange={handleProductNoChange}
                    />
                </div>

                <div className="d-flex align-items-center product-border-1 product-name">
                    <input
                        type='text'
                        placeholder="Ürün Adı"
                        value={productName}
                        onChange={handleProductNameChange}
                    />
                </div>

                <div className="d-flex justify-content-end align-items-center product-border-1 product-sale">
                    <input
                        className="text-center"
                        type='number'
                        placeholder="Ürün Tutarı"
                        value={productPrice}
                        onChange={handleProductPriceChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default ProductListAdd;