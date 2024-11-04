const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 5001; // or any port of your choice

app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // For parsing application/json

const uri = "mongodb+srv://jordym2:KWeCDwrZq8RPAAFM@activityinfo.s2cr2.mongodb.net/ActivityData?retryWrites=true&w=majority";
const client = new MongoClient(uri);

app.get('/activities', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('ActivityData');
        const collection = database.collection('home_screen');
        const activities = await collection.find({}).toArray();

        // Log the activities to the console
        console.log('Fetched activities:', activities);
        
        res.json(activities);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
