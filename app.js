require('dotenv').config();

const express = require('express');
const authenticateToken = require('./middlewares/authMiddleware');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const matrixRoutes = require('./routes/matrixRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/auth', authRoutes);
app.use('/api/matrix', authenticateToken, matrixRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Matrix API running on http://localhost:${PORT}`);
});

module.exports = app;
