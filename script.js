async function loadStudents() {
  const res = await fetch("/api/students");
  const students = await res.json();
  const list = document.getElementById("student-list");
  list.innerHTML = "";
  students.forEach(s => {
    const li = document.createElement("li");
    li.textContent = `${s.name} (${s.email}) - ${s.course}`;
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = async () => {
      await fetch(`/api/students/${s.id}`, { method: "DELETE" });
      loadStudents();
    };
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

document.getElementById("student-form").addEventListener("submit", async e => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const course = document.getElementById("course").value;
  await fetch("/api/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, course })
  });
  e.target.reset();
  loadStudents();
});

loadStudents();
