const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

const InvoiceModel = require('./models/Invoice');
const QuotationModel = require('./models/Quotation');
const UserModel = require('./models/User');
const RegisterModel = require('./models/Register');

dotenv.config();
const app = express();
app.use(express.json());

// ✅ Allowed Origins
const allowedOrigins = [
  'https://invoicerly.vercel.app',
  'https://invoicerly-basants-projects-54b8f0df.vercel.app'
];

// ✅ Proper CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // ✅ Preflight for all routes

// ✅ Optional: fallback CORS headers (just in case)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3001;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB Connection Error:', err));

// ✅ Helper error handler
const handleError = (res, error, message = "Something went wrong!") => {
  console.error(error);
  res.status(500).json({ error: message, details: error.message });
};

// 🔹 Routes

// Create Invoice
app.post('/invoices', async (req, res) => {
  try {
    const invoice = await InvoiceModel.create(req.body);
    res.json(invoice);
  } catch (error) {
    handleError(res, error);
  }
});

// Create Quotation
app.post('/quotation', async (req, res) => {
  try {
    const quotation = await QuotationModel.create(req.body);
    res.json(quotation);
  } catch (error) {
    handleError(res, error);
  }
});

// Get Quotation by ID
app.get('/quotation/:id', async (req, res) => {
  try {
    const quotation = await QuotationModel.findById(req.params.id);
    quotation ? res.json(quotation) : res.status(404).json({ error: "Quotation not found" });
  } catch (error) {
    handleError(res, error);
  }
});

// Get Invoices by Email
app.post('/invdata', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    const invoices = await InvoiceModel.find({ email });
    res.json(invoices);
  } catch (error) {
    handleError(res, error);
  }
});

// Get Quotations by Email
app.post('/quotdata', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    const quotations = await QuotationModel.find({ email });
    res.json(quotations);
  } catch (error) {
    handleError(res, error);
  }
});

// Get Invoice by ID
app.get('/invoices/:id', async (req, res) => {
  try {
    const invoice = await InvoiceModel.findById(req.params.id);
    invoice ? res.json(invoice) : res.status(404).json({ error: "Invoice not found" });
  } catch (error) {
    handleError(res, error);
  }
});

// Register user with hashed password
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await RegisterModel.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await RegisterModel.create({ email, password: hashedPassword });

    res.json({ status: "success", user: newUser });
  } catch (error) {
    handleError(res, error);
  }
});

// Login user
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await RegisterModel.findOne({ email });

    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Incorrect password" });

    res.json({ status: "success", message: "Login successful" });
  } catch (error) {
    handleError(res, error);
  }
});

// Get User by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    user ? res.json(user) : res.status(404).json({ error: 'User not found' });
  } catch (error) {
    handleError(res, error);
  }
});

// Update user
app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    updatedUser ? res.json({ message: 'User updated successfully', user: updatedUser }) : res.status(404).json({ error: 'User not found' });
  } catch (error) {
    handleError(res, error);
  }
});

// Check user by email
app.post('/check', async (req, res) => {
  try {
    const user = await RegisterModel.findOne({ email: req.body.email });
    user ? res.json({ status: "success", data: user }) : res.json({ status: "fail" });
  } catch (error) {
    handleError(res, error);
  }
});

// Global error fallback
app.use((err, req, res, next) => handleError(res, err));

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
