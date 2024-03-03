var mongoose = require("mongoose");
var Customer = mongoose.model("customer");

const createResponse = function (res, status, content) {
  res.status(status).json(content);
};

const listAllCustomer = async function (req, res) {
  try {
    const allCustomer = await Customer.find({});
    const customerList = allCustomer.map((customer) => {
      return {
        id: customer._id,
        name: customer.name,
        phone: customer.phone,
        sales: customer.sales,
      };
    });
    createResponse(res, 200, customerList);
  } catch (error) {
    createResponse(res, 500, { status: "Sunucu hatası" });
  }
};

const getCustomer = async function (req, res) {
  try {
    const customer = await Customer.findById(req.params.id).exec();
    createResponse(res, 200, customer);
  } catch (error) {
    createResponse(res, 404, { status: "Böyle bir müşteri yok" });
  }
};

// Müşteri ve satış eklemek için fonksiyon
const createCustomer = async (req, res) => {
  try {
    // Gelen isteğin body kısmından name ve phone alınır
    const { name, phone } = req.body;

    // name ve phone'un boş olup olmadığını kontrol et
    if (!name || !phone ) {
      return res.status(400).json({ status: "Hata", error: "'İsim', 'Telefon' ve 'Tarih' alanları zorunludur." });
    }

    const existingCustomer = await Customer.findOne({ name, phone });

    if (existingCustomer) {
      return res.status(400).json({ status: "Hata2", error: "Bu müşteri zaten kayıtlı. 'Müşteriye Satış Ekle' sayfasından satış ekleyiniz!" });
    }

    // Aynı isim ve telefon numarasına sahip müşteri yoksa yeni müşteri oluştur
    const newCustomer = new Customer(req.body);
    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (error) {
    res.status(500).json({ status: "Sunucu hatası", error: error.message });
  }
};

const addSalesToCustomer = async function (req, res) {
  try {
    const customerId = req.body.id;
    const newSaleList = req.body.sales;

    const customer = await Customer.findById(customerId).exec();

    if (!customer) {
      return res.status(404).json({ status: "Hata", error: "Müşteri bulunamadı!!!" });
    }

    newSaleList.forEach(sale => {
      customer.sales.push({ date: sale.date, totalPrice: sale.totalPrice, total: sale.total, kdv: sale.kdv, indirim: sale.indirim, saleList: sale.saleList });
    });

    const updatedCustomer = await customer.save();

    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ status: "Sunucu hatası", error: error.message });
  }
};

const removeSaleListFromCustomer = async function (req, res) {
  try {
    const customerId = req.params.customerId; // Değişiklik
    const saleIdToRemove = req.params.saleId;

    const customer = await Customer.findById(customerId).exec();

    if (!customer) {
      return res.status(404).json({ status: "Error", error: "Müşteri bulunamadı!!!" });
    }

    // Müşterinin satış listesindeki istenen satışı bul ve kaldır
    const updatedSales = customer.sales.filter(sale => sale._id.toString() !== saleIdToRemove);

    if (customer.sales.length === updatedSales.length) {
      return res.status(404).json({ status: "Error", error: "Belirtilen satış bulunamadı!!!" });
    }

    customer.sales = updatedSales;

    const updatedCustomer = await customer.save();

    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ status: "Server Error", error: error.message });
  }
};

const updateCustomer = async function (req, res) {
  try {
    const customerId = req.params.id; 
    const { name, phone } = req.body; 

    if (!name || !phone) {
      return res.status(400).json({ status: "Hata", error: "'İsim' ve 'Telefon' alanları zorunludur." });
    }

    const customer = await Customer.findById(customerId).exec();

    if (!customer) {
      return res.status(404).json({ status: "Hata", error: "Müşteri bulunamadı" });
    }

    customer.name = name;
    customer.phone = phone;

    const updatedCustomer = await customer.save();

    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ status: "Sunucu hatası", error: error.message });
  }
};

const deleteCustomer = async function (req, res) {
  try {
    const customerId = req.params.id;

    const deletedCustomer = await Customer.findByIdAndDelete(customerId).exec();

    if (!deletedCustomer) {
      return res.status(404).json({ status: "Hata", error: "Müşteri bulunamadı" });
    }

    res.status(200).json({ status: "Başarılı", message: "Müşteri başarıyla silindi", deletedCustomer });
  } catch (error) {
    res.status(500).json({ status: "Sunucu hatası", error: error.message });
  }
};

module.exports = {
  listAllCustomer,
  getCustomer,
  createCustomer,
  addSalesToCustomer,
  removeSaleListFromCustomer,
  updateCustomer,
  deleteCustomer 
};