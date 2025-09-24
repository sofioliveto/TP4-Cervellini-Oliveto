const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;

// Servir archivos estáticos
app.use(express.static(__dirname));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Frontend corriendo en http://localhost:${PORT}`);
});