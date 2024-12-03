import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });

import chatRoutes from './routes/chatRoutes.js';

const app = express();

// Middleware to handle JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/chat', chatRoutes);

app.set('port', process.env.PORT || 3014);
const server = app.listen(app.get('port'), () => {
  console.log(`🚀 Chat service running → PORT ${server.address().port}`);
});