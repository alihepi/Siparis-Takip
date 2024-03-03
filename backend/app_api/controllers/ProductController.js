var mongoose = require("mongoose");
var Product = mongoose.model("product");

const createResponse = function (res, status, content) {
  res.status(status).json(content);
};

const listAllProduct = async function (req, res) {
  try {
    const allProduct = await Product.find({});
    const productList = allProduct.map((product) => {
      return {
        id: product._id,
        no: product.no,
        name: product.name,
        price: product.price,
      };
    });
    createResponse(res, 200, productList);
  } catch (error) {
    createResponse(res, 500, { status: "Sunucu hatası" });
  }
};

const getProduct = async function (req, res) {
  try {
    await Product.findById(req.params.id)
      .exec()
      .then(function (product) {
        createResponse(res, 200, product);
      });
  } catch (error) {
    createResponse(res, 404, { status: "Böyle bir ürün yok" });
  }
};

const addProduct = async function (req, res) {
  try {
    const { no, name, price } = req.body;

    const existingProduct = await Product.findOne({ no });

    if (existingProduct) {
      return res.status(400).json({ status: "Hata", error: "Bu 'Ürün No' ya sahip ürün var. Lütfen farklı bir 'Ürün No' ile tekrar deneyin" });
    } else {
      const newProduct = new Product({ no, name, price });
      await newProduct.save();
      createResponse(res, 201, { status: "Ürün başarıyla eklendi", product: newProduct });
    }
  } catch (error) {
    createResponse(res, 500, { status: "Sunucu hatası", error: error.message });
  }
};





const updateProduct = async function (req, res) {
  try {
    const productId = req.params.id;
    const { name, price } = req.body;

    // Giriş kontrolleri
    if (!productId || (!name && !price)) {
      return createResponse(res, 400, { status: "Eksik veya hatalı parametreler" });
    }

    // Güncellenmiş verileri içeren nesne
    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (price) updatedFields.price = price;

    // Ürünü güncelle
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedFields,
      { new: true }
    );

    if (updatedProduct) {
      createResponse(res, 200, {
        status: "Ürün başarıyla güncellendi",
        updatedProduct: updatedProduct,
      });
    } else {
      createResponse(res, 404, { status: "Böyle bir ürün yok" });
    }
  } catch (error) {
    createResponse(res, 500, { status: "Sunucu hatası", error: error.message });
  }
};

const deleteProduct = async function (req, res) {
  try {
    const productId = req.params.id;

    // Giriş kontrolleri
    if (!productId) {
      return createResponse(res, 400, { status: "Eksik veya hatalı parametreler" });
    }

    // Ürünü sil
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (deletedProduct) {
      createResponse(res, 200, {
        status: "Ürün başarıyla silindi",
        deletedProduct: deletedProduct,
      });
    } else {
      createResponse(res, 404, { status: "Böyle bir ürün bulunamadı" });
    }
  } catch (error) {
    console.error(error); // Hata mesajını kontrol etmek için eklendi
    createResponse(res, 500, { status: "Sunucu hatası", error: error.message });
  }
};

module.exports = {
  listAllProduct,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct, // Yeni eklenen fonksiyonu modüle ekleyin
};