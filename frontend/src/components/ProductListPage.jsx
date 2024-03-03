import React, { useEffect, useReducer, useState } from "react";
import VenueReducer from "../services/VenueReducer";
import DataService from "../services/VenueDataService";
import ProductList from './ProductList';
import ProductListAdd from "./ProductListAdd";
import ProductListUpdate from "./ProductListUpdate";

const ProductListPage = () => {
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

    const [addProductInf, setAddProductInf] = useState(false);
    const [updateProductInf, setUpdateProductInf] = useState();

    const handleAddProduct = () => {
        setAddProductInf(true);
        setUpdateProductInf(false);
    };

    const handleUpdateProduct = () => {
        setUpdateProductInf(true);
        setAddProductInf(false);
    }

    const [searchTerm, setSearchTerm] = useState("");

    const filteredProducts = product.data.filter((productItem) =>
        (productItem.name && productItem.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const [matchedProduct, setMatchedProduct] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const responsePro = await DataService.listAllProducts();
                setMatchedProduct(responsePro.data.find(item => item.no === parseInt(searchTerm)));
            } catch (error) {
                console.error("Veri alınırken bir hata oluştu:", error);
            }
        }
        fetchData();
    }, [searchTerm]);


    const [isNew, setIsNew] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    const [newProductInf, setNewProductInf] = useState({});

    const [nullYap, setNullYap] = useState(false);

    const handleNewProduct = async () => {
        try {

            if (!newProductInf.no || !newProductInf.name || !newProductInf.price) {
                alert("Ürün No, Adı ve Fiyatı boş olamaz.");
                return;
            }

            await DataService.addProduct({
                no: newProductInf.no,
                name: newProductInf.name,
                price: newProductInf.price
            });

            console.log("Yeni Ürün başarıyla eklendi");

            setRefreshFlag(!refreshFlag);

            setIsNew(true);
            setTimeout(() => {
                setIsNew(false);
                setAddProductInf(false);
            }, 2500);

        } catch (error) {
            console.error("Veri alınırken bir hata oluştu");
            alert(error.response.data.error);
        }
    }

    const [upProductInf, setUpProductInf] = useState({});

    const handleUpProduct = async () => {
        try {
            if (!upProductInf.name || !upProductInf.price) {
                alert("Ürün Adı ve Fiyatı boş olamaz.");
                return;
            }

            await DataService.updateProduct(upProductInf.id, {
                name: upProductInf.name,
                price: upProductInf.price
            });
            console.log("Ürün başarıyla güncellendi");

            setRefreshFlag(!refreshFlag);

            setIsUpdate(true);
            setTimeout(() => {
                setIsUpdate(false);
                setUpdateProductInf(false);
            }, 2500);

        } catch (error) {
            console.error("Ürün güncellenirken bir hata oluştu:", error);
        }
    }

    const [deleteProductId, setDeleteProductId] = useState("");

    const handleDeleteProduct = async (productId) => {
        // Silme işlemi için onay iste
        const confirmDelete = window.confirm("Bu ürünü silmek istediğinizden emin misiniz?\nBu işlem geri alınamaz.");

        if (confirmDelete) {
            setDeleteProductId(productId);
            try {
                await DataService.deleteProduct(productId);
                console.log("Ürün başarıyla silindi");
                setRefreshFlag(!refreshFlag);
            } catch (error) {
                console.error("Ürün silinirken bir hata oluştu", error);
            }
        }
    }

    const [refreshFlag, setRefreshFlag] = useState(false);

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
    }, [refreshFlag]);

    return (
        <div>
            <div className="d-flex flex-column gap-4 col-12">
                <div><h1>Ürün Listesi</h1></div>
                <div className="d-flex"><strong>"Ürün No"</strong> &nbsp; öğrenmek için &nbsp; <strong>Ürün Adı</strong> &nbsp; ile &nbsp; <strong>Ürün Arama</strong> &nbsp; yapabilirsiniz</div>

                <div className="mt-2 d-flex justify-content-center">
                    <div className="d-flex flex-column col-4 gap-2">
                        <div className="d-flex gap-3 justify-content-start align-items-center">
                            <label htmlFor="searchInput"><strong>Ürün Ara:</strong></label>
                            <input
                                type="text"
                                id="searchInput"
                                value={searchTerm}
                                placeholder="Ürün İsmi Giriniz?"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="d-flex justify-content-end col-8 gap-3 flex-wrap">
                        <button type="button" className="add-pr-btn btn btn-primary" onClick={handleUpdateProduct}>Ürün Bilgisi Düzenle</button>
                        <button type="button" className="add-pr-btn btn btn-success" onClick={handleAddProduct}>Ürün Ekle</button>
                    </div>
                </div>

                <div className="inf-border"></div>

                {addProductInf ? (
                    <div className="d-flex flex-column justify-content-between add-prod gap-1">
                        <div className="d-flex justify-content-center">
                            <div className="product-input d-flex justify-content-center float-left gap-2 col-12">
                                <div className="d-flex align-items-center product-inf product-inf1">Ürün No</div>
                                <div className="d-flex align-items-center product-inf product-inf2">Ürün Adı</div>
                                <div className="d-flex align-items-center product-inf product-inf3">Adet Fiyatı</div>
                            </div>
                        </div>

                        <ProductListAdd setNewProductInf={setNewProductInf} />

                        <div className="d-flex justify-content-end col-12 mt-3">
                            <button type="button" className="add-pr-btn btn btn-success" onClick={handleNewProduct}>Ürünü Kaydet</button>
                        </div>

                        <div className={`red ${isNew ? '' : 'd-none'}`}>{newProductInf.no} &nbsp; nolu &nbsp; {newProductInf.name} &nbsp; ürünü başarıyla eklendi</div>
                    </div>
                ) : (
                    <></>
                )}

                {updateProductInf ? (
                    <div className="d-flex flex-column justify-content-between add-prod gap-1">
                        "Ürün No" girerek güncellenecek ürünü bulabilirsiniz !!! <br />
                        ("Ürün No" güncellenemez)
                        <div className="d-flex justify-content-center">
                            <div className="product-input d-flex justify-content-center float-left gap-2 col-12">
                                <div className="d-flex align-items-center product-inf product-inf1">Ürün No</div>
                                <div className="d-flex align-items-center product-inf product-inf2">Ürün Adı</div>
                                <div className="d-flex align-items-center product-inf product-inf3">Adet Fiyatı</div>
                            </div>
                        </div>

                        <ProductListUpdate setUpProductInf={setUpProductInf} nullYap={nullYap} />

                        <div className="d-flex justify-content-end col-12 mt-3">
                            <button type="button" className="add-pr-btn btn btn-success" onClick={handleUpProduct}>Ürünü Güncelle</button>
                        </div>

                        <div className={`red ${isUpdate ? '' : 'd-none'}`}>{upProductInf.no} &nbsp; nolu &nbsp; {upProductInf.name} &nbsp; ürünü başarıyla güncellendi</div>
                    </div>
                ) : (
                    <></>
                )}

                <div className="d-flex justify-content-center mt-4">
                    <div className="product-input d-flex justify-content-center float-left gap-2 col-12 up-new">
                        <div className="d-flex align-items-center product-inf product-inf1">Ürün No</div>
                        <div className="d-flex align-items-center product-inf product-inf2">Ürün Adı</div>
                        <div className="d-flex align-items-center product-inf product-inf3">Adet Fiyatı</div>
                    </div>
                </div>

                <div className="mt-1 d-flex flex-column gap-3 col-12">
                    {filteredProducts
                        .sort((a, b) => a.no - b.no)
                        .map((item, index) => (
                            <ProductList key={index} Data={item} onDeleteProduct={handleDeleteProduct} />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default ProductListPage;