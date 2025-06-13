const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const { MongoClient } = require('mongodb');

dotenv.config();
const app = express();


app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // Adjust this to your React app's URL
}));

const client = new MongoClient(process.env.MONGO_URI);

const connectDB = async () => { // Connect to mongodb
  try {
    await client.connect();
    console.log('MongoDB Connected');
  } 
  catch (err) {
    console.error('MongoDB Connection Failed', err);
    process.exit(1);
  }
};

const getDB = () => client.db('DevOps_Practice'); // Database Name

app.use("/api/data", async(req, res) => {
    try{
        await connectDB();
        const db = getDB();
        const usersCollection = await db.collection("Users");
        const userData = await usersCollection.find({}).toArray();
        return res.status(200).json(userData);
    }
    catch(err) {
        return res.status(500).json("Internal server error");
    }
});

app.listen(process.env.PORT || 4500, '0.0.0.0', () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
