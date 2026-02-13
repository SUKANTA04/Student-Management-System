const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "yourpassword", // replace with your MySQL password
  database: "studentdb"
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

app.use(express.json());
app.use(express.static("public"));

// Get all students
app.get("/api/students", (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add a new student
app.post("/api/students", (req, res) => {
  const { name, email, course } = req.body;
  db.query("INSERT INTO students (name, email, course) VALUES (?, ?, ?)", 
    [name, email, course], 
    (err, result) => {
      if (err) throw err;
      res.json({ id: result.insertId, name, email, course });
    }
  );
});

// Delete a student
app.delete("/api/students/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM students WHERE id = ?", [id], (err, result) => {
    if (err) throw err;
    res.json({ message: "Student deleted" });
  });
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
