const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const InvoiceModel = require('./models/Invoice');
const QuotationModel = require('./models/Quotation');
const UserModel = require('./models/User');
const RegisterModel = require('./models/Register');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const mongoURI = process.env.MONGO_URI;

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors({
  origin: "https://invoicerly.vercel.app",
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  credentials: true,
}));

// CORS preflight middleware
app.options('*', cors()); // Enable preflight requests for all routes

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit the process with an error code
});

// Middleware for input validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Routes
app.post('/invoices', async (req, res, next) => {
  try {
    const invoices = await InvoiceModel.create(req.body);
    res.json(invoices);
  } catch (err) {
    next(err);
  }
});

app.post('/quotations', async (req, res, next) => {
  try {
    const quotation = await QuotationModel.create(req.body);
    res.json(quotation);
  } catch (err) {
    next(err);
  }
});

app.get('/quotations/:id', async (req, res, next) => {
  try {
    const quotation = await QuotationModel.findById(req.params.id);
    if (quotation) {
      res.json(quotation);
    } else {
      res.status(404).json({ error: "Quotation not found" });
    }
  } catch (err) {
    next(err);
  }
});

app.post('/invdata', [
  body('email').isEmail().normalizeEmail()
], validate, async (req, res, next) => {
  const { email } = req.body;
  try {
    const invoices = await InvoiceModel.find({ email });
    res.json(invoices);
  } catch (err) {
    next(err);
  }
});

app.post('/quotdata', [
  body('email').isEmail().normalizeEmail()
], validate, async (req, res, next) => {
  const { email } = req.body;
  try {
    const quotations = await QuotationModel.find({ email });
    res.json(quotations);
  } catch (err) {
    next(err);
  }
});

app.get('/users/:id', async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    next(err);
  }
});

app.put('/users/:id', async (req, res, next) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (user) {
      res.json({ message: 'User updated successfully', user });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    next(err);
  }
});

app.post('/register', async (req, res, next) => {
  try {
    const register = await RegisterModel.create(req.body);
    res.json(register);
  } catch (err) {
    next(err);
  }
});

app.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await RegisterModel.findOne({ email });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        res.json({ status: "success", message: "Login successful" });
      } else {
        res.status(400).json({ error: "Incorrect password" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    next(err);
  }
});

app.post('/check', async (req, res, next) => {
  try {
    const user = await RegisterModel.findOne({ email: req.body.email });
    if (user) {
      res.json({ status: "success", data: user });
    } else {
      res.json({ status: "fail" });
    }
  } catch (err) {
    next(err);
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
