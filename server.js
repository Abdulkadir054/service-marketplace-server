const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors()); // NOTE: for demo only; lock down origins later
app.use(morgan('dev'));

// In-memory demo data (replace with MySQL later)
const categories = [
  { id: 1, slug: 'nakliyat', name: 'Nakliyat', serviceCount: 1245 },
  { id: 2, slug: 'temizlik', name: 'Ev Temizliği', serviceCount: 3210 },
  { id: 3, slug: 'diyetisyen', name: 'Diyetisyen', serviceCount: 420 },
  { id: 4, slug: 'boya-badana', name: 'Boya & Badana', serviceCount: 980 },
  { id: 5, slug: 'ozel-ders', name: 'Özel Ders', serviceCount: 1570 },
];

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Categories
app.get('/api/categories', (req, res) => {
  res.json(categories);
});

// Create a demo job (no DB yet)
app.post('/api/jobs', (req, res) => {
  const { title, description, categorySlug, budget } = req.body || {};
  if (!title || !categorySlug) {
    return res.status(400).json({ error: 'title and categorySlug are required' });
  }
  const job = {
    id: Math.floor(Math.random() * 1_000_000),
    title,
    description: description || '',
    categorySlug,
    budget: budget || null,
    createdAt: new Date().toISOString()
  };
  // In a real app, insert into MySQL here.
  res.status(201).json(job);
});

// Demo providers endpoint (mock)
app.get('/api/providers', (req, res) => {
  const { category } = req.query;
  const sample = [
    { id: 1001, name: 'Usta Ali', rating: 4.8, jobsDone: 320, category: 'boya-badana' },
    { id: 1002, name: 'Hızlı Nakliyat', rating: 4.6, jobsDone: 550, category: 'nakliyat' },
    { id: 1003, name: 'Pırıl Temizlik', rating: 4.9, jobsDone: 780, category: 'temizlik' },
    { id: 1004, name: 'Dyt. Ayşe', rating: 4.7, jobsDone: 120, category: 'diyetisyen' },
  ];
  const filtered = category ? sample.filter(p => p.category === category) : sample;
  res.json(filtered);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
