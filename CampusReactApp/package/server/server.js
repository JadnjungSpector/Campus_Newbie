// const express = require('express');
// const { MongoClient } = require('mongodb');
// const cors = require('cors');

// const app = express();
// const port = 5000;

// // Middleware
// app.use(cors()); // Enable CORS for all routes
// app.use(express.json()); // Parse incoming JSON requests

// // MongoDB URI (replace with your actual connection string)
// const uri = 'mongodb+srv://jordym2:KWeCDwrZq8RPAAFM@activityinfo.s2cr2.mongodb.net/?retryWrites=true&w=majority&appName=ActivityInfo';
// const client = new MongoClient(uri);

// // Connect to MongoDB
// async function connectToMongo() {
//   try {
//     await client.connect();
//     console.log('Connected to MongoDB');
//   } catch (err) {
//     console.error('Failed to connect to MongoDB', err);
//   }
// }

// connectToMongo();

// // Example route
// app.get('/', (req, res) => {
//   res.send('Backend is running!');
// });

// // Define your database and collection
// const databaseName = 'ActivityInfo';
// const collectionName = 'ActivityData';

// // GET API route to fetch data from MongoDB
// app.get('/api/blogs', async (req, res) => {
//   try {
//     const database = client.db(databaseName);
//     const collection = database.collection(collectionName);

//     const blogs = await collection.find({}).toArray(); // Get all documents
//     res.json(blogs); // Return the data as JSON
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching blogs', error: err });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
