

// import { useEffect, useState } from "react";
// import { getAllStudents, addStudent, deleteStudent, updateStudent } from "../services/api";
// import { useNavigate } from "react-router-dom";

// export default function AdminDashboard() {
//   const [students, setStudents] = useState([]);
//   const [form, setForm] = useState({
//     name: "", email: "", phone: "",
//     course: "", gpa: "", username: "", password: ""
//   });
//   const [showForm, setShowForm] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("success");
//   const navigate = useNavigate();

//   useEffect(() => { fetchStudents(); }, []);

//   const fetchStudents = async () => {
//     try {
//       const res = await getAllStudents();
//       setStudents(res.data);
//     } catch {
//       showMessage("❌ Failed to fetch students", "error");
//     }
//   };

//   const showMessage = (msg, type = "success") => {
//     setMessage(msg);
//     setMessageType(type);
//     setTimeout(() => setMessage(""), 3000);
//   };

//   const resetForm = () => {
//     setForm({ name: "", email: "", phone: "", course: "", gpa: "", username: "", password: "" });
//     setEditingId(null);
//     setShowForm(false);
//   };

//   const handleAdd = async () => {
//     try {
//       await addStudent(form);
//       showMessage("✅ Student added successfully!");
//       resetForm();
//       fetchStudents();
//     } catch {
//       showMessage("❌ Failed to add student", "error");
//     }
//   };

//   const handleUpdate = async () => {
//     try {
//       await updateStudent(editingId, form);
//       showMessage("✅ Student updated successfully!");
//       resetForm();
//       fetchStudents();
//     } catch {
//       showMessage("❌ Failed to update student", "error");
//     }
//   };

//   const handleEdit = (student) => {
//     setForm({
//       name: student.name,
//       email: student.email,
//       phone: student.phone,
//       course: student.course,
//       gpa: student.gpa,
//       username: "",
//       password: ""
//     });
//     setEditingId(student.id);
//     setShowForm(true);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this student?")) {
//       try {
//         await deleteStudent(id);
//         showMessage("✅ Student deleted successfully!");
//         fetchStudents();
//       } catch {
//         showMessage("❌ Failed to delete student", "error");
//       }
//     }
//   };

//   const logout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <div style={styles.container}>
//       {/* Header */}
//       <div style={styles.header}>
//         <h2 style={styles.headerTitle}>🎓 Admin Dashboard</h2>
//         <div style={styles.headerRight}>
//           <span style={styles.welcome}>
//             👋 {localStorage.getItem("username")}
//           </span>
//           <button style={styles.addBtn}
//             onClick={() => { resetForm(); setShowForm(!showForm); }}>
//             {showForm ? "✕ Cancel" : "+ Add Student"}
//           </button>
//           <button style={styles.logoutBtn} onClick={logout}>
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Message */}
//       {message && (
//         <div style={{
//           ...styles.message,
//           background: messageType === "error" ? "#ffebee" : "#e8f5e9",
//           color: messageType === "error" ? "#c62828" : "#2e7d32"
//         }}>
//           {message}
//         </div>
//       )}

//       {/* Add / Edit Form */}
//       {showForm && (
//         <div style={styles.formCard}>
//           <h3 style={styles.formTitle}>
//             {editingId ? "✏️ Edit Student" : "➕ Add New Student"}
//           </h3>
//           <div style={styles.formGrid}>
//             <input style={styles.input} placeholder="Full Name"
//               value={form.name}
//               onChange={e => setForm({ ...form, name: e.target.value })} />
//             <input style={styles.input} placeholder="Email"
//               value={form.email}
//               onChange={e => setForm({ ...form, email: e.target.value })} />
//             <input style={styles.input} placeholder="Phone (10 digits)"
//               value={form.phone}
//               onChange={e => setForm({ ...form, phone: e.target.value })} />
//             <input style={styles.input} placeholder="Course"
//               value={form.course}
//               onChange={e => setForm({ ...form, course: e.target.value })} />
//             <input style={styles.input} type="number"
//               placeholder="GPA (0-10)" value={form.gpa}
//               onChange={e => setForm({ ...form, gpa: e.target.value })} />

//             {/* Only show username/password for new students */}
//             {!editingId && (
//               <>
//                 <input style={styles.input} placeholder="Username"
//                   value={form.username}
//                   onChange={e => setForm({ ...form, username: e.target.value })} />
//                 <input style={styles.input} type="password"
//                   placeholder="Password" value={form.password}
//                   onChange={e => setForm({ ...form, password: e.target.value })} />
//               </>
//             )}
//           </div>

//           <div style={styles.formBtns}>
//             <button style={styles.saveBtn}
//               onClick={editingId ? handleUpdate : handleAdd}>
//               {editingId ? "💾 Update Student" : "💾 Save Student"}
//             </button>
//             <button style={styles.cancelBtn} onClick={resetForm}>
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Students Table */}
//       <div style={styles.tableWrapper}>
//         <h3 style={styles.tableTitle}>
//           📋 All Students ({students.length})
//         </h3>
//         {students.length === 0 ? (
//           <p style={styles.noData}>⚠️ No students found. Add one!</p>
//         ) : (
//           <div style={styles.tableScroll}>
//             <table style={styles.table}>
//               <thead>
//                 <tr style={styles.thead}>
//                   <th style={styles.th}>ID</th>
//                   <th style={styles.th}>Name</th>
//                   <th style={styles.th}>Email</th>
//                   <th style={styles.th}>Phone</th>
//                   <th style={styles.th}>Course</th>
//                   <th style={styles.th}>GPA</th>
//                   <th style={styles.th}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {students.map((s, i) => (
//                   <tr key={s.id} style={{
//                     ...styles.row,
//                     background: i % 2 === 0 ? "#f9f9f9" : "#fff"
//                   }}>
//                     <td style={styles.td}>{s.id}</td>
//                     <td style={styles.td}>{s.name}</td>
//                     <td style={styles.td}>{s.email}</td>
//                     <td style={styles.td}>{s.phone}</td>
//                     <td style={styles.td}>{s.course}</td>
//                     <td style={styles.td}>
//                       <span style={styles.gpa}>{s.gpa}</span>
//                     </td>
//                     <td style={styles.td}>
//                       <button style={styles.editBtn}
//                         onClick={() => handleEdit(s)}>
//                         ✏️ Edit
//                       </button>
//                       <button style={styles.deleteBtn}
//                         onClick={() => handleDelete(s.id)}>
//                         🗑️ Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: { padding: "24px", fontFamily: "sans-serif",
//     background: "#f0f4f8", minHeight: "100vh" },
//   header: { display: "flex", justifyContent: "space-between",
//     alignItems: "center", background: "#1a237e", color: "#fff",
//     padding: "16px 24px", borderRadius: "12px", marginBottom: "24px" },
//   headerTitle: { margin: 0, fontSize: "22px" },
//   headerRight: { display: "flex", alignItems: "center", gap: "12px" },
//   welcome: { color: "#fff", fontSize: "14px" },
//   addBtn: { background: "#fff", color: "#1a237e", padding: "8px 16px",
//     border: "none", borderRadius: "6px", cursor: "pointer",
//     fontWeight: "bold" },
//   logoutBtn: { background: "#e53935", color: "#fff", padding: "8px 16px",
//     border: "none", borderRadius: "6px", cursor: "pointer" },
//   message: { padding: "12px 16px", borderRadius: "8px",
//     marginBottom: "16px", fontWeight: "bold" },
//   formCard: { background: "#fff", padding: "24px", borderRadius: "12px",
//     boxShadow: "0 2px 12px rgba(0,0,0,0.08)", marginBottom: "24px" },
//   formTitle: { color: "#1a237e", marginBottom: "16px", marginTop: 0 },
//   formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr",
//     gap: "12px", marginBottom: "16px" },
//   input: { padding: "10px 12px", border: "1px solid #ddd",
//     borderRadius: "6px", fontSize: "14px" },
//   formBtns: { display: "flex", gap: "12px" },
//   saveBtn: { background: "#1a237e", color: "#fff", padding: "10px 24px",
//     border: "none", borderRadius: "6px", cursor: "pointer",
//     fontSize: "14px" },
//   cancelBtn: { background: "#fff", color: "#666", padding: "10px 24px",
//     border: "1px solid #ddd", borderRadius: "6px", cursor: "pointer",
//     fontSize: "14px" },
//   tableWrapper: { background: "#fff", padding: "24px",
//     borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" },
//   tableTitle: { color: "#1a237e", marginBottom: "16px", marginTop: 0 },
//   noData: { textAlign: "center", color: "#999", padding: "40px" },
//   tableScroll: { overflowX: "auto" },
//   table: { width: "100%", borderCollapse: "collapse" },
//   thead: { background: "#1a237e", color: "#fff" },
//   th: { padding: "12px 16px", textAlign: "left", fontSize: "14px" },
//   row: { borderBottom: "1px solid #eee" },
//   td: { padding: "12px 16px", fontSize: "14px" },
//   gpa: { background: "#e8f5e9", color: "#2e7d32", padding: "4px 8px",
//     borderRadius: "4px", fontWeight: "bold" },
//   editBtn: { background: "#e3f2fd", color: "#1565c0", padding: "6px 12px",
//     border: "1px solid #1565c0", borderRadius: "4px", cursor: "pointer",
//     fontSize: "12px", marginRight: "8px" },
//   deleteBtn: { background: "#ffebee", color: "#e53935", padding: "6px 12px",
//     border: "1px solid #e53935", borderRadius: "4px", cursor: "pointer",
//     fontSize: "12px" }
// };



import { useEffect, useState } from "react";
import { getAllStudents, addStudent, deleteStudent, updateStudent } from "../services/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = axios.create({ baseURL: "http://localhost:8080/api" });
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("students");
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    course: "", gpa: "", username: "", password: ""
  });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  // Attendance form
  const [attendanceForm, setAttendanceForm] = useState({
    studentId: "", subject: "", presentCount: "", totalCount: ""
  });

  // Exam form
  const [examForm, setExamForm] = useState({
    subject: "", examDate: "", examTime: "", room: "", examType: "Internal"
  });

  // Announcement form
  const [announcementForm, setAnnouncementForm] = useState({
    title: "", message: "", announcementDate: "", type: "info", icon: "📋"
  });

  const navigate = useNavigate();

  useEffect(() => { fetchStudents(); }, []);

  const fetchStudents = async () => {
    try {
      const res = await getAllStudents();
      setStudents(res.data);
    } catch {
      showMessage("❌ Failed to fetch students", "error");
    }
  };

  const showMessage = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(""), 3000);
  };

  const resetForm = () => {
    setForm({ name: "", email: "", phone: "", course: "",
      gpa: "", username: "", password: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleAdd = async () => {
    try {
      await addStudent(form);
      showMessage("✅ Student added!");
      resetForm();
      fetchStudents();
    } catch {
      showMessage("❌ Failed to add student", "error");
    }
  };

  const handleUpdate = async () => {
    try {
      await updateStudent(editingId, form);
      showMessage("✅ Student updated!");
      resetForm();
      fetchStudents();
    } catch {
      showMessage("❌ Failed to update", "error");
    }
  };

  const handleEdit = (student) => {
    setForm({ name: student.name, email: student.email,
      phone: student.phone, course: student.course,
      gpa: student.gpa, username: "", password: "" });
    setEditingId(student.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this student?")) {
      try {
        await deleteStudent(id);
        showMessage("✅ Student deleted!");
        fetchStudents();
      } catch {
        showMessage("❌ Failed to delete", "error");
      }
    }
  };

  const handleAddAttendance = async () => {
    try {
      await API.post("/student/admin/attendance", attendanceForm);
      showMessage("✅ Attendance added!");
      setAttendanceForm({ studentId: "", subject: "",
        presentCount: "", totalCount: "" });
    } catch {
      showMessage("❌ Failed to add attendance", "error");
    }
  };

  const handleAddExam = async () => {
    try {
      await API.post("/student/admin/exam", examForm);
      showMessage("✅ Exam added!");
      setExamForm({ subject: "", examDate: "", examTime: "",
        room: "", examType: "Internal" });
    } catch {
      showMessage("❌ Failed to add exam", "error");
    }
  };

  const handleAddAnnouncement = async () => {
    try {
      await API.post("/student/admin/announcement", announcementForm);
      showMessage("✅ Announcement added!");
      setAnnouncementForm({ title: "", message: "",
        announcementDate: "", type: "info", icon: "📋" });
    } catch {
      showMessage("❌ Failed to add announcement", "error");
    }
  };

  const logout = () => { localStorage.clear(); navigate("/login"); };

  const tabs = [
    { id: "students", label: "👥 Students" },
    { id: "attendance", label: "📅 Attendance" },
    { id: "exams", label: "📝 Exams" },
    { id: "notices", label: "📢 Notices" },
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.headerTitle}>🎓 Admin Dashboard</h2>
        <div style={styles.headerRight}>
          <span style={styles.welcome}>
            👋 {localStorage.getItem("username")}
          </span>
          <button style={styles.logoutBtn} onClick={logout}>Logout</button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div style={{
          ...styles.message,
          background: messageType === "error" ? "#ffebee" : "#e8f5e9",
          color: messageType === "error" ? "#c62828" : "#2e7d32"
        }}>
          {message}
        </div>
      )}

      {/* Tabs */}
      <div style={styles.tabBar}>
        {tabs.map(tab => (
          <button key={tab.id} style={{
            ...styles.tabBtn,
            ...(activeTab === tab.id ? styles.activeTab : {})
          }} onClick={() => setActiveTab(tab.id)}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* STUDENTS TAB */}
      {activeTab === "students" && (
        <div>
          <div style={styles.tabHeader}>
            <h3 style={styles.tabTitle}>👥 Manage Students</h3>
            <button style={styles.addBtn}
              onClick={() => { resetForm(); setShowForm(!showForm); }}>
              {showForm ? "✕ Cancel" : "+ Add Student"}
            </button>
          </div>

          {showForm && (
            <div style={styles.formCard}>
              <h3 style={styles.formTitle}>
                {editingId ? "✏️ Edit Student" : "➕ Add New Student"}
              </h3>
              <div style={styles.formGrid}>
                {[
                  { key: "name", placeholder: "Full Name" },
                  { key: "email", placeholder: "Email" },
                  { key: "phone", placeholder: "Phone (10 digits)" },
                  { key: "course", placeholder: "Course" },
                ].map(({ key, placeholder }) => (
                  <input key={key} style={styles.input}
                    placeholder={placeholder} value={form[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })} />
                ))}
                <input style={styles.input} type="number"
                  placeholder="GPA (0-10)" value={form.gpa}
                  onChange={e => setForm({ ...form, gpa: e.target.value })} />
                {!editingId && (
                  <>
                    <input style={styles.input} placeholder="Username"
                      value={form.username}
                      onChange={e => setForm({ ...form, username: e.target.value })} />
                    <input style={styles.input} type="password"
                      placeholder="Password" value={form.password}
                      onChange={e => setForm({ ...form, password: e.target.value })} />
                  </>
                )}
              </div>
              <div style={styles.formBtns}>
                <button style={styles.saveBtn}
                  onClick={editingId ? handleUpdate : handleAdd}>
                  {editingId ? "💾 Update" : "💾 Save"}
                </button>
                <button style={styles.cancelBtn} onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div style={styles.tableWrapper}>
            <p style={styles.tableCount}>Total: {students.length} students</p>
            {students.length === 0 ? (
              <p style={styles.noData}>No students found. Add one!</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={styles.table}>
                  <thead>
                    <tr style={styles.thead}>
                      {["ID","Name","Email","Phone","Course","GPA","Actions"]
                        .map(h => <th key={h} style={styles.th}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s, i) => (
                      <tr key={s.id} style={{
                        ...styles.row,
                        background: i % 2 === 0 ? "#f9f9f9" : "#fff"
                      }}>
                        <td style={styles.td}>{s.id}</td>
                        <td style={styles.td}>{s.name}</td>
                        <td style={styles.td}>{s.email}</td>
                        <td style={styles.td}>{s.phone}</td>
                        <td style={styles.td}>{s.course}</td>
                        <td style={styles.td}>
                          <span style={styles.gpa}>{s.gpa}</span>
                        </td>
                        <td style={styles.td}>
                          <button style={styles.editBtn}
                            onClick={() => handleEdit(s)}>✏️ Edit</button>
                          <button style={styles.deleteBtn}
                            onClick={() => handleDelete(s.id)}>🗑️ Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ATTENDANCE TAB */}
      {activeTab === "attendance" && (
        <div>
          <h3 style={styles.tabTitle}>📅 Add Attendance</h3>
          <div style={styles.formCard}>
            <div style={styles.formGrid}>
              <div>
                <label style={styles.label}>Select Student</label>
                <select style={styles.input}
                  value={attendanceForm.studentId}
                  onChange={e => setAttendanceForm({
                    ...attendanceForm, studentId: e.target.value })}>
                  <option value="">-- Select Student --</option>
                  {students.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} (ID: {s.id})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={styles.label}>Subject</label>
                <input style={styles.input} placeholder="Subject name"
                  value={attendanceForm.subject}
                  onChange={e => setAttendanceForm({
                    ...attendanceForm, subject: e.target.value })} />
              </div>
              <div>
                <label style={styles.label}>Classes Attended</label>
                <input style={styles.input} type="number"
                  placeholder="Present count"
                  value={attendanceForm.presentCount}
                  onChange={e => setAttendanceForm({
                    ...attendanceForm, presentCount: e.target.value })} />
              </div>
              <div>
                <label style={styles.label}>Total Classes</label>
                <input style={styles.input} type="number"
                  placeholder="Total count"
                  value={attendanceForm.totalCount}
                  onChange={e => setAttendanceForm({
                    ...attendanceForm, totalCount: e.target.value })} />
              </div>
            </div>
            <button style={styles.saveBtn} onClick={handleAddAttendance}>
              💾 Save Attendance
            </button>
          </div>
        </div>
      )}

      {/* EXAMS TAB */}
      {activeTab === "exams" && (
        <div>
          <h3 style={styles.tabTitle}>📝 Add Exam Schedule</h3>
          <div style={styles.formCard}>
            <div style={styles.formGrid}>
              <div>
                <label style={styles.label}>Subject</label>
                <input style={styles.input} placeholder="Subject name"
                  value={examForm.subject}
                  onChange={e => setExamForm({
                    ...examForm, subject: e.target.value })} />
              </div>
              <div>
                <label style={styles.label}>Exam Date</label>
                <input style={styles.input} type="date"
                  value={examForm.examDate}
                  onChange={e => setExamForm({
                    ...examForm, examDate: e.target.value })} />
              </div>
              <div>
                <label style={styles.label}>Exam Time</label>
                <input style={styles.input} placeholder="e.g. 10:00 AM"
                  value={examForm.examTime}
                  onChange={e => setExamForm({
                    ...examForm, examTime: e.target.value })} />
              </div>
              <div>
                <label style={styles.label}>Room</label>
                <input style={styles.input} placeholder="e.g. Hall A"
                  value={examForm.room}
                  onChange={e => setExamForm({
                    ...examForm, room: e.target.value })} />
              </div>
              <div>
                <label style={styles.label}>Exam Type</label>
                <select style={styles.input}
                  value={examForm.examType}
                  onChange={e => setExamForm({
                    ...examForm, examType: e.target.value })}>
                  <option value="Internal">Internal</option>
                  <option value="External">External</option>
                </select>
              </div>
            </div>
            <button style={styles.saveBtn} onClick={handleAddExam}>
              💾 Save Exam
            </button>
          </div>
        </div>
      )}

      {/* NOTICES TAB */}
      {activeTab === "notices" && (
        <div>
          <h3 style={styles.tabTitle}>📢 Add Announcement</h3>
          <div style={styles.formCard}>
            <div style={styles.formGrid}>
              <div>
                <label style={styles.label}>Title</label>
                <input style={styles.input} placeholder="Announcement title"
                  value={announcementForm.title}
                  onChange={e => setAnnouncementForm({
                    ...announcementForm, title: e.target.value })} />
              </div>
              <div>
                <label style={styles.label}>Date</label>
                <input style={styles.input} type="date"
                  value={announcementForm.announcementDate}
                  onChange={e => setAnnouncementForm({
                    ...announcementForm,
                    announcementDate: e.target.value })} />
              </div>
              <div>
                <label style={styles.label}>Type</label>
                <select style={styles.input}
                  value={announcementForm.type}
                  onChange={e => setAnnouncementForm({
                    ...announcementForm, type: e.target.value })}>
                  <option value="info">Info</option>
                  <option value="urgent">Urgent</option>
                  <option value="holiday">Holiday</option>
                  <option value="event">Event</option>
                </select>
              </div>
              <div>
                <label style={styles.label}>Icon</label>
                <select style={styles.input}
                  value={announcementForm.icon}
                  onChange={e => setAnnouncementForm({
                    ...announcementForm, icon: e.target.value })}>
                  <option value="📋">📋 Info</option>
                  <option value="⚠️">⚠️ Urgent</option>
                  <option value="🎉">🎉 Holiday</option>
                  <option value="🏆">🏆 Event</option>
                  <option value="📝">📝 Submission</option>
                </select>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={styles.label}>Message</label>
                <textarea style={{ ...styles.input, height: "80px",
                  resize: "vertical" }}
                  placeholder="Announcement message"
                  value={announcementForm.message}
                  onChange={e => setAnnouncementForm({
                    ...announcementForm, message: e.target.value })} />
              </div>
            </div>
            <button style={styles.saveBtn} onClick={handleAddAnnouncement}>
              💾 Post Announcement
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: "24px", fontFamily: "sans-serif",
    background: "#f0f4f8", minHeight: "100vh" },
  header: { display: "flex", justifyContent: "space-between",
    alignItems: "center", background: "#1a237e", color: "#fff",
    padding: "16px 24px", borderRadius: "12px", marginBottom: "24px" },
  headerTitle: { margin: 0, fontSize: "22px" },
  headerRight: { display: "flex", alignItems: "center", gap: "12px" },
  welcome: { color: "#fff", fontSize: "14px" },
  logoutBtn: { background: "#e53935", color: "#fff", padding: "8px 16px",
    border: "none", borderRadius: "6px", cursor: "pointer" },
  message: { padding: "12px 16px", borderRadius: "8px",
    marginBottom: "16px", fontWeight: "bold" },
  tabBar: { display: "flex", gap: "8px", marginBottom: "24px",
    background: "#fff", padding: "8px", borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)" },
  tabBtn: { flex: 1, padding: "10px 16px", border: "none",
    borderRadius: "8px", cursor: "pointer", background: "transparent",
    fontSize: "14px", color: "#666", fontWeight: "500" },
  activeTab: { background: "#1a237e", color: "#fff" },
  tabHeader: { display: "flex", justifyContent: "space-between",
    alignItems: "center", marginBottom: "16px" },
  tabTitle: { color: "#1a237e", margin: 0 },
  addBtn: { background: "#1a237e", color: "#fff", padding: "10px 20px",
    border: "none", borderRadius: "6px", cursor: "pointer",
    fontWeight: "bold" },
  formCard: { background: "#fff", padding: "24px", borderRadius: "12px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)", marginBottom: "24px" },
  formTitle: { color: "#1a237e", marginBottom: "16px", marginTop: 0 },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr",
    gap: "16px", marginBottom: "16px" },
  label: { display: "block", fontSize: "13px", color: "#666",
    marginBottom: "6px", fontWeight: "bold" },
  input: { width: "100%", padding: "10px 12px", border: "1px solid #ddd",
    borderRadius: "6px", fontSize: "14px", boxSizing: "border-box" },
  formBtns: { display: "flex", gap: "12px" },
  saveBtn: { background: "#1a237e", color: "#fff", padding: "10px 24px",
    border: "none", borderRadius: "6px", cursor: "pointer",
    fontSize: "14px" },
  cancelBtn: { background: "#fff", color: "#666", padding: "10px 24px",
    border: "1px solid #ddd", borderRadius: "6px", cursor: "pointer",
    fontSize: "14px" },
  tableWrapper: { background: "#fff", padding: "24px",
    borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" },
  tableCount: { color: "#666", fontSize: "14px", marginBottom: "16px" },
  noData: { textAlign: "center", color: "#999", padding: "40px" },
  table: { width: "100%", borderCollapse: "collapse" },
  thead: { background: "#1a237e", color: "#fff" },
  th: { padding: "12px 16px", textAlign: "left", fontSize: "14px" },
  row: { borderBottom: "1px solid #eee" },
  td: { padding: "12px 16px", fontSize: "14px" },
  gpa: { background: "#e8f5e9", color: "#2e7d32", padding: "4px 8px",
    borderRadius: "4px", fontWeight: "bold" },
  editBtn: { background: "#e3f2fd", color: "#1565c0", padding: "6px 12px",
    border: "1px solid #1565c0", borderRadius: "4px", cursor: "pointer",
    fontSize: "12px", marginRight: "8px" },
  deleteBtn: { background: "#ffebee", color: "#e53935", padding: "6px 12px",
    border: "1px solid #e53935", borderRadius: "4px", cursor: "pointer",
    fontSize: "12px" },
};