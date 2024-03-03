var mongoose = require("mongoose");

var product = new mongoose.Schema({
  no: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, default: 0 } 
}, { versionKey: false });

mongoose.model("product", product, "products");