var mongoose = require("mongoose");

var saleProd = new mongoose.Schema({
  no: { type: Number },
  piece: { type: Number },
});

var sale = new mongoose.Schema({
  date: { type: Date , required: true },
  totalPrice: { type: Number },
  total: { type: Number },
  kdv: { type: String },
  indirim: { type: String },
  saleList: [saleProd],
});

var customer = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  sales: [sale]
}, { versionKey: false });

mongoose.model("customer", customer, "customers");