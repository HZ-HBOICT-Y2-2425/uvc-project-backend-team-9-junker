import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });
import indexRouter from './routes/index.js';
import cors from "cors";

const app = express();
 
const port = process.env.PORT || 3012; // Make sure the correct port is set

// CORS setup allowing frontend origin
const corsOptions = {
  origin: 'http://localhost:5173',  // Change this to the correct frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions)); // Apply the CORS settings here

// Support json encoded and url-encoded bodies
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

// Set up index route for your API
app.use('/', indexRouter);

// Start the server
app.listen(port, () => {
  console.log(`User Server running on ${port}...`);
});
