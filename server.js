const express = require('express');
const { neon } = require('@neondatabase/serverless');
const app = express();
const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT || 4242;
app.get('/', async (_, res) => {
    const sql = neon('postgresql://default:uPokli5ZMnA4@ep-young-cherry-a4c0yn1p-pooler.us-east-1.aws.neon.tech/verceldb?sslmode=require');
    const response = await sql`SELECT * FROM locations`;
    res.json(response);
});
app.listen(3000, () => {
    console.log(`Listening to http://localhost:3000`);
});