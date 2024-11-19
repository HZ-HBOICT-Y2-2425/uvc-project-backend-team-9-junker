// start.js setup from learnnode.com by Wes Bos
import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });
import indexRouter from './routes/index.js';

const app = express();

// Add CORS headers manually
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5175'); // Allow requests from your frontend origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specific HTTP methods
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204); // Handle preflight requests
  }
  next();
});

// support JSON encoded and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);

app.set('port', process.env.PORT || 3011);
const server = app.listen(app.get('port'), () => {
  console.log(`🍿 Express running → PORT ${server.address().port}`);
});
