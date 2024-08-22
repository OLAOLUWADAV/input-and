// index.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));

// Array to store student details
const students = [];

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route to display the form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Route to handle form submission
app.post('/add-student', (req, res) => {
  const student = {
    name: req.body.name,
    age: req.body.age,
    course: req.body.course
  };
  students.push(student);
  res.redirect('/students');
});

// Route to display the student details
app.get('/students', (req, res) => {
  let studentList = '<h1>Student Details</h1>';
  students.forEach((student, index) => {
    studentList += `<p><strong>${index + 1}. Name:</strong> ${student.name}, <strong>Age:</strong> ${student.age}, <strong>Course:</strong> ${student.course}</p>`;
  });
  studentList += '<a href="/">Add Another Student</a>';
  res.send(studentList);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
