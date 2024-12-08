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

// app.post('/api/activities', async (req, res) => {
//   try {
//     await client.connect();
//     const database = client.db('ActivityData');
//     const collection = database.collection('home_screen');

//     const { studentName, activityTitle, description, targetAudience, eventCategories, image } = req.body;

//     const newActivity = {
//       student_name: studentName,
//       activity_title: activityTitle,
//       activity_summary: description,
//       activity_home_image: image, // Save the Base64 image string
//       activity_type: eventCategories,
//       audience: targetAudience,
//     };

//     const result = await collection.insertOne(newActivity);
//     res.status(201).json({ message: 'Activity created successfully', data: result.ops[0] });
//   } catch (error) {
//     console.error('Error creating activity:', error);
//     res.status(500).json({ message: 'Failed to create activity' });
//   } finally {
//     await client.close();
//   }
// });

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
      flagged: false,
    };

    const result = await collection.insertOne(newActivity);

    // Instead of `result.ops[0]`, access the insertedId
    res.status(201).json({
      message: 'Activity created successfully',
      data: { ...newActivity, _id: result.insertedId },
    });
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
      const newUser = {
        username,
        password, // Consider hashing the password for security
        email,
        bookmarkedActivities: [], // Initialize with an empty array
      };
  
      await usersCollection.insertOne(newUser);
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      await client.close();
    }
  });

  app.post('/api/v1/user/:username/bookmarked-activities', async (req, res) => {
    try {
      await client.connect();
      const database = client.db('ActivityData');
      const usersCollection = database.collection('users');
  
      const { username } = req.params;
      const { activity_title } = req.body; // Extract from request body
  
      console.log('Username:', username);
      console.log('Activity title:', activity_title);
  
      // Find the user by username
      const user = await usersCollection.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Get current bookmarked activities or initialize empty array
      let updatedActivities = user.bookmarkedActivities || [];
  
      // Toggle the activity: remove if present, add if not
      if (updatedActivities.includes(activity_title)) {
        // updatedActivities = updatedActivities.filter(activity => activity !== activity_title);
        updatedActivities.splice(updatedActivities.indexOf(activity_title), 1);
      } else {
        updatedActivities.push(activity_title);
      }
  
      // Update the user document in the database
      await usersCollection.updateOne(
        { username },
        { $set: { bookmarkedActivities: updatedActivities } }
      );
  
      console.log('Updated activities:', updatedActivities);
  
      res.status(200).json({ bookmarkedActivities: updatedActivities });
    } catch (error) {
      console.error('Error updating bookmarked activity:', error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      await client.close();
    }
  });
  

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


app.get('/api/v1/user/:username', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('ActivityData');
    const usersCollection = database.collection('users');

    const { username } = req.params;

    // Find the user by username
    const user = await usersCollection.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user); // Return the user data
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
});

app.get('/api/v1/user/:username/bookmarked-activities', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('ActivityData');
    const usersCollection = database.collection('users');

    const { username } = req.params;

    // Find the user by username
    const user = await usersCollection.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.bookmarkedActivities) {
      return res.status(404).json({ message: 'User has no bookmarked activities' });
    }

    // Return only the bookmarked activities field
    res.json({ bookmarkedActivities: user.bookmarkedActivities });
  } catch (error) {
    console.error('Error fetching bookmarked activities:', error.message); // Log the error message
    console.error(error.stack); // Log the stack trace for more details
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
});

app.post('/activities/:id/flagged', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('ActivityData');
    const collection = database.collection('home_screen');
    
    const { id } = req.params;
    const { isFlagged } = req.body

    await collection.updateOne(
      { id },
      { $set: { flagged: isFlagged } }
    );
  } catch (error) {
    res.status(500).json({ error: 'Failed to update activity' });
  }
});
