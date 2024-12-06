import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS middleware
import chatRoutes from './routes/chatRoutes.js';

dotenv.config({ path: 'variables.env' });

const app = express();

// Enable CORS
app.use(cors()); // Allow requests from all origins

app.use(express.json());
app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 3014;

app.listen(PORT, () => {
  console.log(`🚀 Chat service running on PORT ${PORT}`);
});