const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');
const sequelize = require('./config/db');
const { startPriceEngine } = require('./utils/priceEngine');
const User = require('./models/User');
const Balance = require('./models/Balance');
const Deposit = require('./models/Deposit');
const Trade = require('./models/Trade');
const Portfolio = require('./models/Portfolio');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const tradeRoutes = require('./routes/trade');
global.memeCoins = []; // Global for trade.js

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/trade', tradeRoutes);

app.get('/', (req, res) => res.send('API Running'));

(async () => {
  await sequelize.sync({ force: false });
  let admin = await User.findOne({ where: { username: 'admin' } });
  if (!admin) {
    const hashed = await require('bcryptjs').hash('admin123', 10);
    admin = await User.create({ username: 'admin', email: 'admin@example.com', password: hashed, role: 'admin' });
  }
  global.memeCoins = startPriceEngine(io);
  server.listen(5000, () => console.log('Server on 5000'));
})();