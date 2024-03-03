import React, { useEffect, useReducer, useState } from "react";
import VenueReducer from "../services/VenueReducer";
import DataService from "../services/VenueDataService";

const ProductListUpdate = ({ Data = [], setUpProductInf = () => {} }) => {
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

  const [searchTerm, setSearchTerm] = useState("");
  const [matchedProduct, setMatchedProduct] = useState(null);

  useEffect(() => {
    async function fetchProductData() {
      try {
        const responsePro = await DataService.listAllProducts();
        const foundProduct = responsePro.data.find(
          (item) => item.no === parseInt(searchTerm)
        );
        setMatchedProduct(foundProduct);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchProductData();
  }, [searchTerm]);

  const [nameInput, setNameInput] = useState("");
  const [priceInput, setPriceInput] = useState("");

  useEffect(() => {
    if (matchedProduct) {
      setNameInput(matchedProduct.name);
      setPriceInput(matchedProduct.price.toString());
    } else {
      setNameInput("");
      setPriceInput("");
    }
  }, [matchedProduct]);

  useEffect(() => {
    const updatedProductInfo = {
      id: matchedProduct ? matchedProduct.id : null,
      no: matchedProduct ? matchedProduct.no : null,
      name: nameInput,
      price: priceInput,
    };
    setUpProductInf(updatedProductInfo);
  }, [matchedProduct, nameInput, priceInput, setUpProductInf]);

  return (
    <div key={Data.id} id="new-pr" className="d-flex justify-content-center gap-2">
      <div className="product-input d-flex justify-content-center float-left gap-2 col-12 pr-border sale-add">
        <div className='d-flex justify-content-center align-items-center product-border-1 product-sale '>
          <input
            className="text-center"
            type='number'
            placeholder="Ürün No"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="d-flex align-items-center product-border-1 product-name">
          <input
            type='text'
            placeholder="Ürün Adı"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-end align-items-center product-border-1 product-sale">
          <input
            className="text-center"
            type='text'
            placeholder="Ürün Tutarı"
            value={priceInput}
            onChange={(e) => setPriceInput(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductListUpdate;