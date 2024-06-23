const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String},
  company: { type: String  },
  password: { type: String },
  email: { type: String },
  logo: { type: String  },
  address: { type: String },
  accountNumber: { type: String  },
  city: { type: String },
  mobile: { type: Number }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
