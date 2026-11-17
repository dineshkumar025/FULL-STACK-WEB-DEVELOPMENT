import { useEffect, useState } from "react";
import "./style.css";

const API = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "") + "/api";

const initialForm = {
  rollNumber: "",
  name: "",
  email: "",
  department: "Computer Science",
  year: 1,
  gpa: "",
  enrollmentStatus: "Active",
};

export default function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [departmentSummary, setDepartmentSummary] = useState([]);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load students & department summary from Express API
  async function loadData() {
    try {
      setLoading(true);
      const [resStudents, resSummary] = await Promise.all([
        fetch(`${API}/students`),
        fetch(`${API}/reports/department-summary`),
      ]);

      if (!resStudents.ok) throw new Error("Could not retrieve student records from server");
      const studentsList = await resStudents.json();
      setStudents(studentsList);

      if (resSummary.ok) {
        const summaryData = await resSummary.json();
        setDepartmentSummary(summaryData);
      }
    } catch (err) {
      setMessage(err.message || "Network error communicating with API backend");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const payload = {
      ...form,
      year: Number(form.year),
      gpa: Number(form.gpa),
    };

    const url = editingId ? `${API}/students/${editingId}` : `${API}/students`;
    const method = editingId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        setMessage(result.message || "Failed to persist student record");
        setIsError(true);
        return;
      }

      setMessage(
        editingId
          ? "Student record updated successfully in MongoDB Atlas!"
          : "Student registered and persisted to MongoDB Atlas successfully!"
      );
      setIsError(false);
      setForm(initialForm);
      setEditingId(null);
      await loadData();
    } catch (err) {
      setMessage(err.message || "Failed to connect to backend server");
      setIsError(true);
    }
  }

  function startEdit(student) {
    setEditingId(student._id);
    setForm({
      rollNumber: student.rollNumber,
      name: student.name,
      email: student.email,
      department: student.department,
      year: student.year,
      gpa: String(student.gpa),
      enrollmentStatus: student.enrollmentStatus,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(initialForm);
  }

  async function removeStudent(id) {
    if (!window.confirm("Are you sure you want to permanently delete this student record?")) return;
    try {
      const response = await fetch(`${API}/students/${id}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) {
        setMessage(result.message || "Delete operation failed");
        setIsError(true);
        return;
      }
      setMessage("Student record removed from MongoDB database successfully");
      setIsError(false);
      await loadData();
    } catch (err) {
      setMessage(err.message || "Failed to delete student record");
      setIsError(true);
    }
  }

  return (
    <main className="container">
      <header>
        <h1>Student Management System</h1>
        <p>A cloud-native full-stack application with MongoDB Atlas, Express.js, React, Node.js, Vercel, and Render.</p>
        <div className="author-pill">
          P. Dinesh Kumar | Roll No: A24126552101 | Case Study Question Q3
        </div>
      </header>

      {/* Analytics Summary Cards */}
      <section className="summary-cards">
        <div className="card">
          <h4>TOTAL STUDENTS</h4>
          <p className="stat">{students.length}</p>
          <p className="stat-sub">Persisted in MongoDB Atlas</p>
        </div>
        {departmentSummary.map((item) => (
          <div className="card" key={item.department}>
            <h4>{item.department.toUpperCase()}</h4>
            <p className="stat-sub">
              Enrolled: <strong>{item.totalStudents}</strong> | Avg GPA: <strong>{item.averageGpa}</strong>
            </p>
          </div>
        ))}
      </section>

      {/* Feedback Notification Banner */}
      {message && (
        <div className={`message-banner ${isError ? "error" : "success"}`} role="status">
          <span>{message}</span>
          <button onClick={() => setMessage("")} title="Dismiss notification">×</button>
        </div>
      )}

      {/* Student Form Section */}
      <section className="form-card">
        <h2>{editingId ? "Update Student Record" : "Enroll New Student"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            ROLL NUMBER
            <input
              name="rollNumber"
              value={form.rollNumber}
              onChange={handleChange}
              placeholder="e.g. A24126552101"
              required
              disabled={!!editingId}
            />
          </label>

          <label>
            STUDENT FULL NAME
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Dinesh Kumar"
              required
            />
          </label>

          <label>
            ACADEMIC EMAIL
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="e.g. dinesh@campus.edu"
              required
            />
          </label>

          <label>
            DEPARTMENT
            <select name="department" value={form.department} onChange={handleChange} required>
              <option value="Computer Science">Computer Science</option>
              <option value="Electronics">Electronics</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
            </select>
          </label>

          <label>
            ACADEMIC YEAR
            <select name="year" value={form.year} onChange={handleChange} required>
              <option value={1}>1st Year</option>
              <option value={2}>2nd Year</option>
              <option value={3}>3rd Year</option>
              <option value={4}>4th Year</option>
            </select>
          </label>

          <label>
            CUMULATIVE GPA (0.00 - 10.00)
            <input
              type="number"
              step="0.01"
              min="0"
              max="10"
              name="gpa"
              value={form.gpa}
              onChange={handleChange}
              placeholder="e.g. 9.15"
              required
            />
          </label>

          <label>
            ENROLLMENT STATUS
            <select
              name="enrollmentStatus"
              value={form.enrollmentStatus}
              onChange={handleChange}
              required
            >
              <option value="Active">Active</option>
              <option value="Graduated">Graduated</option>
              <option value="Suspended">Suspended</option>
            </select>
          </label>

          <div className="btn-group">
            <button type="submit" className="btn-primary">
              {editingId ? "Update Student" : "Save to Database"}
            </button>
            {editingId && (
              <button type="button" className="btn-cancel" onClick={cancelEdit}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </section>

      {/* Student Records Directory */}
      <section className="records-card">
        <div className="records-header">
          <h2>Student Records Directory</h2>
          <span className="record-count">{students.length} Records</span>
        </div>

        {loading && <p style={{ color: "var(--text-muted)", marginBottom: 12 }}>Syncing with MongoDB Atlas...</p>}

        {students.length === 0 && !loading ? (
          <p className="no-records">No student records found in the database. Use the form above to add a student.</p>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="table-responsive desktop-view">
              <table>
                <thead>
                  <tr>
                    <th>Roll Number</th>
                    <th>Full Name</th>
                    <th>Email Address</th>
                    <th>Department</th>
                    <th>Year</th>
                    <th>GPA</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student._id}>
                      <td><strong>{student.rollNumber}</strong></td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.department}</td>
                      <td>Year {student.year}</td>
                      <td><span className="badge-gpa">{Number(student.gpa).toFixed(2)}</span></td>
                      <td><span className="badge-status">{student.enrollmentStatus}</span></td>
                      <td>
                        <button className="btn-sm edit" onClick={() => startEdit(student)} title="Edit student details">
                          Edit
                        </button>
                        <button className="btn-sm delete" onClick={() => removeStudent(student._id)} title="Delete record">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Touch Cards View */}
            <div className="mobile-cards-view">
              {students.map((student) => (
                <div className="student-card" key={student._id}>
                  <div className="student-card-header">
                    <span className="student-card-roll">{student.rollNumber}</span>
                    <span className="badge-status">{student.enrollmentStatus}</span>
                  </div>
                  <h3 className="student-card-name">{student.name}</h3>
                  <div className="student-card-details">
                    <div className="card-detail-item">
                      <span className="detail-label">Email</span>
                      <span className="detail-value">{student.email}</span>
                    </div>
                    <div className="card-detail-item">
                      <span className="detail-label">Department</span>
                      <span className="detail-value">{student.department}</span>
                    </div>
                    <div className="card-detail-item">
                      <span className="detail-label">Year</span>
                      <span className="detail-value">Year {student.year}</span>
                    </div>
                    <div className="card-detail-item">
                      <span className="detail-label">GPA</span>
                      <span className="badge-gpa">{Number(student.gpa).toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="student-card-actions">
                    <button className="btn-mobile edit" onClick={() => startEdit(student)}>
                      ✏️ Edit
                    </button>
                    <button className="btn-mobile delete" onClick={() => removeStudent(student._id)}>
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
