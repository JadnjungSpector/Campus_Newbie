const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bcrypt = require('bcryptjs');// For password hashing
const jwt = require('jsonwebtoken'); // For generating JWT tokens

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

app.post('/api/activities', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('ActivityData');
    const collection = database.collection('home_screen');

    const { studentName, activityTitle, description, targetAudience, eventCategories, image } = req.body;

    const newActivity = {
      student_name: studentName,
      activity_title: activityTitle,
      activity_summary: description,
      activity_home_image: image, // Save the Base64 image string
      activity_type: eventCategories,
      audience: targetAudience,
    };

    const result = await collection.insertOne(newActivity);
    res.status(201).json({ message: 'Activity created successfully', data: result.ops[0] });
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).json({ message: 'Failed to create activity' });
  } finally {
    await client.close();
  }
});

app.get('/activities/:id', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('ActivityData');
    const collection = database.collection('home_screen');
    
    const { id } = req.params;
    const ObjectId = require('mongodb').ObjectId; // Make sure to import ObjectId
    
    const activity = await collection.findOne({ _id: new ObjectId(id) });
    
    if (activity) {
      res.json(activity);
    } else {
      res.status(404).json({ message: 'Activity not found' });
    }
  } catch (error) {
    console.error('Error fetching activity:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
});

// new login endpoint
app.post('/login', async (req, res) => {
    try {
      await client.connect();
      const database = client.db('ActivityData');
      const usersCollection = database.collection('users');
  
      const { username, password } = req.body;
  
      console.log('Login attempt for username:', username); // Log the login attempt
  
      // Find the user by username
      const user = await usersCollection.findOne({ username });
  
      if (!user) {
        console.log('User not found:', username);
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      console.log('User found:', user.username); // Log that the user was found
  
      // Compare the provided password with the stored password
      if (password !== user.password) {
        console.log('Invalid password for user:', username);
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Generate a JWT token
      const token = jwt.sign(
        { id: user._id, username: user.username },
        'your_jwt_secret',
        { expiresIn: '1h' }
      );
  
      console.log('Login successful for user:', username);
      res.json({ token });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      await client.close();
    }
  });

  // account creation
  app.post('/api/v1/user/signup', async (req, res) => {
    try {
      await client.connect();
      const database = client.db('ActivityData');
      const usersCollection = database.collection('users');
  
      const { username, password, email } = req.body;
  
      // Check if username already exists
      const existingUser = await usersCollection.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      const existingEmail = await usersCollection.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      
      if (!email.endsWith("@uw.edu")) {
        return res.status(400).json({ message: 'Email is not a valid UW email' });
      }
      // Insert new user without hashing the password
      await usersCollection.insertOne({ username, password, email });
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      await client.close();
    }
  });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
