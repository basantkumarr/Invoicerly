const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  itemName: { type: String,   },
  price: { type: Number,   min: 0 },
  gstPercentage: { type: Number, min: 0 },
  quantity: { type: Number,   min: 0 },
  total: { type: Number,   min: 0 }
});

const QuotationSchema = new mongoose.Schema({
  srNo: { type: String },
  email: { type: String },
  date: { type: Date  },
  lastDate: { type: Date  },
  billedToCompanyName: { type: String },
  address: { type: String },
  items: { type: [ItemSchema] },
  subtotal: { type: Number , min: 0 },
  gst: { type: Number,  min: 0 },
  total: { type: Number,  min: 0 }
}, { timestamps: true });

const Quotation = mongoose.model('Quotationss', QuotationSchema);

module.exports = Quotation;
