const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'HypeSpokane API is running!',
    timestamp: new Date().toISOString()
  });
});

// Get all venues
app.get('/api/venues', async (req, res) => {
  try {
    const venues = await prisma.venue.findMany();
    res.json(venues);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch venues' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 HypeSpokane API running on http://localhost:${PORT}`);
});

// Cleanup on shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});
