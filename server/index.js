const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const InvoiceModel = require('./models/Invoice');
const QuotationModel = require('./models/Quotation');
const UserModel = require('./models/User');
const RegisterModel = require('./models/Register');

dotenv.config();

const app = express();
app.use(express.json());

const allowedOrigins = [
  'https://invoicerly.vercel.app',
  'https://invoicerly-basants-projects-54b8f0df.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  optionsSuccessStatus: 200,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  credentials: true,
  preflightContinue: false,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3001;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.post('/invoices', async (req, res, next) => {
  try {
    const invoices = await InvoiceModel.create(req.body);
    res.json(invoices);
  } catch (err) {
    next(err);
  }
});

app.post('/quotation', (req, res) => {
  QuotationModel.create(req.body)
    .then(quotation => res.json(quotation))
    .catch(err => res.json(err));
});

app.get('/quotation/:id', (req, res) => {
  QuotationModel.findById(req.params.id)
    .then(quotation => {
      if (quotation) {
        res.json(quotation);
      } else {
        res.status(404).json({ error: "Quotation not found" });
      }
    })
    .catch(err => res.json(err));
});

app.post('/invdata', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  InvoiceModel.find({ email: email })
    .then(invoices => res.json(invoices))
    .catch(err => res.status(400).json(err));
});

app.post('/quotdata', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  QuotationModel.find({ email: email })
    .then(quotations => res.json(quotations))
    .catch(err => res.status(400).json(err));
});

app.get('/invoices/:id', async (req, res, next) => {
  try {
    const invoice = await InvoiceModel.findById(req.params.id);
    if (invoice) {
      res.json(invoice);
    } else {
      res.status(404).json({ error: "Invoice not found" });
    }
  } catch (err) {
    next(err);
  }
});

app.post("/register", async (req, res, next) => {
  try {
    const register = await RegisterModel.create(req.body);
    res.json(register);
  } catch (err) {
    next(err);
  }
});

app.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await RegisterModel.findOne({ email });
    if (user) {
      if (user.password === password) {
        res.json("success");
      } else {
        res.status(400).json("Incorrect password");
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    next(error);
  }
});

app.get('/users/:id', async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
});

app.put('/users/:id', async (req, res, next) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (user) {
      res.json({ message: 'User updated successfully', user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
});

app.post("/check", async (req, res, next) => {
  try {
    const user = await RegisterModel.findOne({ email: req.body.email });
    if (user) {
      res.json({ status: "success", data: user });
    } else {
      res.json({ status: "fail" });
    }
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

