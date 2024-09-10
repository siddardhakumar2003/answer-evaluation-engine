const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const AWS = require('aws-sdk');
const fs = require('fs');
const dotenv = require('dotenv');
const { spawn } = require('child_process');

const app = express();
const PORT = 5000;

dotenv.config();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, 'build')));
// const [fileName,setfileName]=useState();
// Enable CORS
app.use(cors());

const fileName=Date.now();

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null,file.originalname);
  },
});

  // Set up S3 upload parameters
// setfileName(fileName++);

const upload = multer({ storage: storage });

const dir = './uploads';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

dotenv.config(); // Load environment variables from .env file

app.use(express.static(path.join(__dirname, 'build')));




function runPythonScript(req) {
  // Arguments to pass to the Python script
  const args = ['./'+req.file.path,req.file.originalname];

  // Spawn a new child process to run the Python script
  const pythonProcess = spawn('python', ['OCR.py', ...args]);


  // Listen for data from stdout
  pythonProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
  });
  // Listen for data from stderr
  pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
  });

  // Listen for the close event to know when the process has finished
  pythonProcess.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      const filePath = "./uploads/"+req.file.filename;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file: ${err}`);
          return;
        }
        console.log('File deleted successfully');
        });
  });
}


app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file);
// Function to run the Python script
  runPythonScript(req);
  });
  
app.get('/start',(req,res)=>{
    const python = spawn('python', ['checker.py']);
    python.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
  // Listen for data from stderr
  python.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
  });
  python.on('close',(code)=>{
    res.sendStatus(200);
  });
});


const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(cors());
app.use(bodyParser.json());
// MongoDB connection
mongoose.connect("mongodb+srv://"+process.env.DB_USER+":"+process.env.DB_PASSWORD+"@sidhardha.g5zcqjd.mongodb.net/project?retryWrites=true&w=majority&appName=sidhardha", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Schema and Model
const studentSchema = new mongoose.Schema({
  rollno: String,
  qno: Number,
  spell: Number,
  score: Number,
  total: Number,
});

const Student = mongoose.model('Student', studentSchema, 'students');

// Routes
app.get('/marks', async (req, res) => {
  try {
    const marks = await Student.find({});
    res.json(marks);

  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
