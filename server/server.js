const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const multer = require('multer');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require('bcrypt');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const uri = "mongodb+srv://faheej:admin123@cluster0.5y1l7q0.mongodb.net/searchApp?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
  ssl: true,
  tlsAllowInvalidCertificates: false,
});

let db;

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db("searchApp");
    console.log("You successfully connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

connectToDatabase().then(() => {
  app.listen(3001, () => {
    console.log("Running on port 3001");
  });
});

app.use((req, res, next) => {
  if (!db) {
    return res.status(503).send("Database connection not established");
  }
  req.db = db;
  next();
});

app.post("/api/signupInsert", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const collection = req.db.collection("user");
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await collection.insertOne({ name, email, password: hashedPassword });
    res.status(200).send("User signed up successfully");
  } catch (err) {
    console.error("Error inserting data into MongoDB:", err);
    res.status(500).send("Error inserting data into MongoDB");
  }
});

app.post("/api/loginProcess", async (req, res) => {
  const { email, password } = req.body;
  try {
    const collection = req.db.collection("user");
    const user = await collection.findOne({ email });
    if (!user) {
      return res.status(400).send("Email not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send("Invalid password");
    }
    res.status(200).send("Login successful");
  } catch (err) {
    console.error("Error processing login:", err);
    res.status(500).send("Error processing login");
  }
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/api/complaint", upload.single('image'), async (req, res) => {
  try {
    const {
      name, dob, age, gender, phno, email, datalast, timelast, lastwearing, lastlocation
    } = req.body;
    const image = req.file ? {
      data: req.file.buffer,
      contentType: req.file.mimetype,
      filename: req.file.originalname
    } : null;

    const collection = req.db.collection("complaint");
    const result = await collection.insertOne({
      name,
      dob,
      age,
      gender,
      phno,
      email,
      datalast,
      timelast,
      lastwearing,
      lastlocation,
      image
    });
    res.status(200).send("Complaint submitted successfully");
  } catch (err) {
    console.error("Error processing complaint:", err);
    res.status(500).send("Error processing complaint");
  }
});

app.get("/api/complaints", async (req, res) => {
  try {
    const collection = req.db.collection("complaint");
    const complaints = await collection.find({}).toArray();

    const formattedComplaints = complaints.map(complaint => ({
      ...complaint,
      image: complaint.image
        ? {
            contentType: complaint.image.contentType,
            data: complaint.image.data.toString('base64')
          }
        : null
    }));

    res.status(200).json(formattedComplaints);
  } catch (err) {
    console.error("Error fetching complaints:", err);
    res.status(500).send("Error fetching complaints");
  }
});


app.get("/api/profile", async (req, res) => {
  if (!req.query.email) {
    return res.status(400).send("Email is required");
  }
  try {
    const email = req.query.email;
    const collection = req.db.collection("complaint");
    const complaints = await collection.find({ email: email }).toArray();
    const totalRecords = await collection.countDocuments();
    res.json({ totalRecords, complaints: complaints.length });
  } catch (err) {
    console.error("Error fetching complaints:", err);
    res.status(500).send("Error fetching complaints");
  }
});

app.delete("/api/complaints/:id", async (req, res) => {
  const { id } = req.params;

  // Validate the ObjectId
  if (!ObjectId.isValid(id)) {
    console.error("Invalid ObjectId:", id);
    return res.status(400).json({ error: 'Invalid complaint ID' });
  }

  try {
    const collection = req.db.collection("complaint");
    if (!collection) {
      console.error("Collection 'complaint' not found in database");
      return res.status(500).json({ error: 'Internal server error' });
    }

    const objectId = new ObjectId(id);
    console.log("Attempting to delete complaint with ID:", objectId);
    const deletedComplaint = await collection.findOneAndDelete({ _id: objectId });

    if (!deletedComplaint.value) {
      console.error("Complaint not found with ID:", id);
      return res.status(404).json({ error: 'Complaint not found' });
    }

    console.log("Complaint deleted successfully:");
    res.status(200).json({ message: 'Complaint deleted successfully' });
  } catch (err) {
    console.error("Error deleting complaint:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
