// server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const User = require('./models/Users');
const Employee =require('./routes/employeeRoute')

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'https://deploy-mern-machine.vercel.app',
              methods : ["POST", "GET", "PUT","DELETE"],
              credentials: true }));
app.use('/api/employee', Employee)
app.use('/uploads', express.static('uploads'));

const JWT_SECRET = '1a27fe120df2afe6992f01488ef035a51dfa70e195a7d850c6becc9056bd8e64';

// MongoDB connection
mongoose.connect('mongodb+srv://saipatnam99:royals@cluster0.y3bvq.mongodb.net/emp?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected')).catch((err) => console.log(err));

// Register route

app.post('/api/register', async (req,res) => {
    const {username,password} = req.body;
    try{
      const userDoc = await User.create({
        username,
        password,
      });
      res.json(userDoc);
      console.log(userDoc)
    } catch(e) {
      console.log(e);
      res.status(400).json(e);
    }
  });
  
// Login route
// app.post('/api/login', async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ username });

//   if (!user || !await bcrypt.compare(password, user.password)) {
//     return res.status(401).json({ message: 'Invalid credentials' });
//   }

//   const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
//   res.json({ token });
// });
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt:', username);

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
    console.log('Login successful');
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3001');
});
