import React, { useEffect, useState } from "react";
import DataService from "../services/VenueDataService";

const ProductAdd = ({ onDelete = () => {}, onTotalChange = () => {}, setProd = () => {}}) => {
    const [productInput, setProductInput] = useState('');
    const [pieceValue, setPieceValue] = useState(1);
    const [prevPieceValue, setPrevPieceValue] = useState(1);
    const [matchedProduct, setMatchedProduct] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    const handleInputChange = (event) => {
        setProductInput(event.target.value);
    };

    const handlePieceChange = (event) => {
        setPieceValue(event.target.value);
    };

    const productDelete = () => {
        onDelete();
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const responsePro = await DataService.listAllProducts();
                setMatchedProduct(responsePro.data.find(item => item.no === parseInt(productInput)));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [productInput]);

    useEffect(() => {
        if (matchedProduct) {
            setTotalPrice(parseFloat(matchedProduct.price) * pieceValue);
            onTotalChange(parseFloat(matchedProduct.price) * pieceValue);
        }
        setProd({ product: matchedProduct, prodNum: pieceValue });
    }, [matchedProduct, pieceValue]);

    return (
        <div id="new-pr" className="d-flex justify-content-center gap-2">
            <div className="product-input d-flex justify-content-center float-left gap-2 col-12 pr-border">
                <input
                    type="number"
                    value={productInput}
                    onChange={handleInputChange}
                    placeholder="Ürün No"
                    className="text-center"
                />
                <div className="d-flex align-items-center product-border product-name">
                    {matchedProduct && matchedProduct.name}
                </div>
                <input
                    type="number"
                    value={pieceValue}
                    onChange={handlePieceChange}
                    className="piece text-center"
                />
                <div className="d-flex justify-content-end align-items-center product-border product-sale"> {matchedProduct && matchedProduct.price} TL </div>
                <div className="d-flex justify-content-end align-items-center product-border product-sale"> {matchedProduct && totalPrice.toFixed(2)} TL</div>

                <div className="d-flex align-items-center" onClick={productDelete}>
                    <i className="fa-solid fa-trash exclude-from-print"></i>
                </div>
            </div>
        </div>
    );
};

export default ProductAdd;
