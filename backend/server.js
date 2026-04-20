const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

app.set('io', io);

// Routes
const authRoutes = require('./routes/auth');
const ingestRoutes = require('./routes/ingest');
const secureRoutes = require('./routes/secure');
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/ingest', ingestRoutes);
app.use('/api/v1', secureRoutes);

app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'TrueVote Secure Backend is running', timestamp: new Date() });
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
});

// Self-healing port binder (EADDRINUSE fix)
const startServer = (port) => {
  server.listen(port)
    .on('listening', () => {
      console.log(`\n======================================================`);
      console.log(`[ SECURE NODE ONLINE ] -> Listening natively on Port ${port}`);
      console.log(`======================================================\n`);
    })
    .on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.warn(`[!] Port ${port} is occupied (EADDRINUSE). Auto-shifting to target port ${port + 1}...`);
        startServer(port + 1); // Automatically increment and retry
      } else {
        console.error('Fatal Server Error:', err);
      }
    });
};

const INITIAL_PORT = process.env.PORT || 5000;
startServer(INITIAL_PORT);
