// start.js setup from learnnode.com by Wes Bos
import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });
import indexRouter from './routes/index.js';
import cors from "cors";

const app = express();
const port = process.env.PORT;
// support json encoded and url-encoded bodies, mainly used for post and update
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`Item Server running on ${port}...`)
})