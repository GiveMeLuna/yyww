const { MongoClient } = require('mongodb');

async function main() {
  const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB connection string
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('todolist');
    const collection = database.collection('todolist');

    const documents = await collection.find({}).toArray();
    console.log(documents);
  } finally {
    await client.close();
  }
}

main().catch(console.error);