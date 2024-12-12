const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer();

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://jordym2:KWeCDwrZq8RPAAFM@activityinfo.s2cr2.mongodb.net/ActivityData?retryWrites=true&w=majority";
const client = new MongoClient(uri);

// Connect once when the server starts
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

// Handle cleanup on server shutdown
process.on('SIGINT', async () => {
  await client.close();
  process.exit();
});

// Get all activities
app.get('/activities', async (req, res) => {
  try {
    const database = client.db('ActivityData');
    const collection = database.collection('home_screen');
    const activities = await collection.find({}).toArray();
    res.json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Create new activity
app.post('/api/activities', async (req, res) => {
  try {
    const database = client.db('ActivityData');
    const collection = database.collection('home_screen');

    const {
      studentName,
      activityTitle,
      description,
      targetAudience,
      eventCategories,
      image,
      location,
      expirationDate,
    } = req.body;

    const newActivity = {
      student_name: studentName,
      activity_title: activityTitle,
      activity_summary: description,
      activity_home_image: image,
      activity_type: eventCategories,
      audience: targetAudience,
      flagged: false,
      location: location,
      expiration_date: expirationDate === 'Never' ? null : expirationDate,
    };

    const result = await collection.insertOne(newActivity);
    res.status(201).json({
      message: 'Activity created successfully',
      data: { ...newActivity, _id: result.insertedId },
    });
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).json({ message: 'Failed to create activity' });
  }
});

// Add review to activity
app.post('/activities/:id/reviews', upload.single('image'), async (req, res) => {
  console.log('Received review data:', req.body);
  console.log('Received file:', req.file);

  try {
    const database = client.db('ActivityData');
    const collection = database.collection('home_screen');

    const { id } = req.params;
    const { user, text, safety_rating, general_rating } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid activity ID format.' });
    }

    if (!user || !text || !safety_rating || !general_rating || !req.file) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (text.split(' ').length < 20) {
      return res.status(400).json({ message: 'Review must be at least 20 words long.' });
    }

    const imageBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    const activity = await collection.findOne({ _id: new ObjectId(id) });
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    const newReview = {
      user,
      text,
      safety_rating: parseInt(safety_rating, 10),
      general_rating: parseInt(general_rating, 10),
      image: imageBase64,
    };

    const updatedReviews = [...(activity.reviews || []), newReview];
    const updatedSafetyRating =
      updatedReviews.reduce((sum, review) => sum + review.safety_rating, 0) / updatedReviews.length;
    const updatedGeneralRating =
      updatedReviews.reduce((sum, review) => sum + review.general_rating, 0) / updatedReviews.length;

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          reviews: updatedReviews,
          safety_rating: updatedSafetyRating,
          general_rating: updatedGeneralRating,
        },
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(500).json({ message: 'Failed to update activity with the new review.' });
    }

    const updatedActivity = await collection.findOne({ _id: new ObjectId(id) });
    res.status(200).json(updatedActivity);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get single activity
app.get('/activities/:id', async (req, res) => {
  try {
    const database = client.db('ActivityData');
    const collection = database.collection('home_screen');
    
    const { id } = req.params;
    const activity = await collection.findOne({ _id: new ObjectId(id) });
    
    if (activity) {
      res.json(activity);
    } else {
      res.status(404).json({ message: 'Activity not found' });
    }
  } catch (error) {
    console.error('Error fetching activity:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const database = client.db('ActivityData');
    const usersCollection = database.collection('users');

    const { username, password } = req.body;
    console.log('Login attempt for username:', username);

    const user = await usersCollection.findOne({ username });

    if (!user) {
      console.log('User not found:', username);
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    if (password !== user.password) {
      console.log('Invalid password for user:', username);
      return res.status(401).json({ message: 'Invalid username or password' });
    }

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
  }
});

// Signup endpoint
app.post('/api/v1/user/signup', async (req, res) => {
  try {
    const database = client.db('ActivityData');
    const usersCollection = database.collection('users');

    const { username, password, email } = req.body;

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
      password,
      email,
      bookmarkedActivities: [],
    };

    await usersCollection.insertOne(newUser);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Bookmark activities
app.post('/api/v1/user/:username/bookmarked-activities', async (req, res) => {
  try {
    const database = client.db('ActivityData');
    const usersCollection = database.collection('users');

    const { username } = req.params;
    const { activity_title } = req.body;

    console.log('Username:', username);
    console.log('Activity title:', activity_title);

    const user = await usersCollection.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let updatedActivities = user.bookmarkedActivities || [];

    if (updatedActivities.includes(activity_title)) {
      updatedActivities.splice(updatedActivities.indexOf(activity_title), 1);
    } else {
      updatedActivities.push(activity_title);
    }

    await usersCollection.updateOne(
      { username },
      { $set: { bookmarkedActivities: updatedActivities } }
    );

    console.log('Updated activities:', updatedActivities);
    res.status(200).json({ bookmarkedActivities: updatedActivities });
  } catch (error) {
    console.error('Error updating bookmarked activity:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user data
app.get('/api/v1/user/:username', async (req, res) => {
  try {
    const database = client.db('ActivityData');
    const usersCollection = database.collection('users');

    const { username } = req.params;
    const user = await usersCollection.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get bookmarked activities
app.get('/api/v1/user/:username/bookmarked-activities', async (req, res) => {
  try {
    const database = client.db('ActivityData');
    const usersCollection = database.collection('users');

    const { username } = req.params;
    const user = await usersCollection.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.bookmarkedActivities) {
      return res.status(404).json({ message: 'User has no bookmarked activities' });
    }

    res.json({ bookmarkedActivities: user.bookmarkedActivities });
  } catch (error) {
    console.error('Error fetching bookmarked activities:', error.message);
    console.error(error.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update activity flag status
app.post('/activities/:id/flagged', async (req, res) => {
  try {
    const database = client.db('ActivityData');
    const collection = database.collection('home_screen');
    
    const { id } = req.params;
    const { isFlagged } = req.body;

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { flagged: isFlagged } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    res.json({ message: 'Activity flag status updated successfully' });
  } catch (error) {
    console.error('Error updating flag status:', error);
    res.status(500).json({ message: 'Failed to update activity' });
  }
});

// Initialize the server
async function startServer() {
  await connectToDatabase();
  
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

startServer().catch(console.error);
