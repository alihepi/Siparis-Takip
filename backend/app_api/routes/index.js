var express = require('express');
var router = express.Router();
var ctrlProduct = require("../controllers/ProductController");
var ctrlCustomer = require("../controllers/CustomerController");

router
  .route("/products")
  .get(ctrlProduct.listAllProduct)
  .post(ctrlProduct.addProduct);

router
  .route("/products/:id")
  .get(ctrlProduct.getProduct)
  .put(ctrlProduct.updateProduct)
  .delete(ctrlProduct.deleteProduct);

router
  .route("/customers")
  .get(ctrlCustomer.listAllCustomer)
  .post(ctrlCustomer.createCustomer);

router
  .route("/customers/:id")
  .get(ctrlCustomer.getCustomer)
  .put(ctrlCustomer.updateCustomer)
  .delete(ctrlCustomer.deleteCustomer);

router
  .route("/customers/:customerId/sales")
  .post(ctrlCustomer.addSalesToCustomer)
  .delete(ctrlCustomer.removeSaleListFromCustomer);

router
  .route("/customers/:customerId/sales/:saleId")
  .delete(ctrlCustomer.removeSaleListFromCustomer);

module.exports = router;