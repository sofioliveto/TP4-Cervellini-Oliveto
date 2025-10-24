const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Inicializar base de datos
const db = new sqlite3.Database('./palabras.db', (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos SQLite');
    // Crear tabla si no existe
    db.run(`CREATE TABLE IF NOT EXISTS palabras (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      palabra TEXT NOT NULL,
      fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  }
});

// Rutas
// Obtener todas las palabras
app.get('/api/palabras', (req, res) => {
  db.all('SELECT * FROM palabras ORDER BY fecha_creacion DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Agregar una nueva palabra
app.post('/api/palabras', (req, res) => {
  const { palabra } = req.body;
  
  if (!palabra) {
    return res.status(400).json({ error: 'La palabra es requerida' });
  }

  db.run('INSERT INTO palabras (palabra) VALUES (?)', [palabra], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ 
        id: this.lastID, 
        palabra: palabra,
        mensaje: 'Palabra agregada exitosamente' 
      });
    }
  });
});

// Eliminar una palabra
app.delete('/api/palabras/:id', (req, res) => {
  const { id } = req.params;
  
  db.run('DELETE FROM palabras WHERE id = ?', id, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ mensaje: 'Palabra eliminada exitosamente' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});