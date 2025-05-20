const express = require('express');
const statsRoutes = require('./routes/statsRoutes');

const app = express();
app.use(express.json());

app.use('/api', statsRoutes);

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Stats API running on http://localhost:${PORT}`);
});
