// start.js setup from learnnode.com by Wes Bos
import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });
import indexRouter from './routes/index.js';
import cors from "cors";

const app = express();
const port = process.env.TOKEN_SERVER_PORT;
// support json encoded and url-encoded bodies, mainly used for post and update
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

app.use('/', indexRouter);
app.listen(port, () => {
  console.log(`Community Server running on ${port}...`)
})

import knex from 'knex';
import development from './knexfile.js';
const db = knex(development);

async function runSeeds() {
  try {
      console.log('Running database seeds...');
      await knex.seed.run(); // This will run all seeds in the configured directory
      console.log('Database seeding completed.');
  } catch (error) {
      console.error('Error running seeds:', error);
  } finally {
      await db.destroy();
  }
}

// Run seeds and then start the server
await runSeeds();
