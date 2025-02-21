const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors'); // 添加CORS支持
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors()); // 使用CORS中间件
app.use(bodyParser.json());

const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB connection string
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('todolist');
    const collection = database.collection('todolist');

    app.post('/add', async (req, res) => {
      const { task, completed, dueDate } = req.body;
      const newDocument = {
        task,
        completed,
        dueDate: new Date(dueDate)
      };
      await collection.insertOne(newDocument);
      res.send('Document inserted');
    });

    app.get('/list', async (req, res) => {
      const documents = await collection.find({}).toArray();
      res.json(documents);
    });

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

run().catch(console.error);