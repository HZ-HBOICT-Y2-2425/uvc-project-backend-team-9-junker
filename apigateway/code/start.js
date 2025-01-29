import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' }); // Ensure the correct path to your .env file
import indexRouter from './routes/index.js';
import cors from 'cors'; 
import aggregatorRoutes from './routes/aggregatorRoutes.js';

const app = express();

// Use CORS middleware before other routes
app.use(cors());

// Support json encoded and url-encoded bodies, mainly used for POST and UPDATE requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define the route for the aggregator API
app.use('/api/aggregator', aggregatorRoutes);

// Your index route
app.use('/', indexRouter);

// Set up port and start server
app.set('port', process.env.PORT || 3010);
const server = app.listen(app.get('port'), () => {
  console.log(`🍿 Express running → PORT ${server.address().port}`);
});
