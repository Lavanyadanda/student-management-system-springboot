


// import { useEffect, useState, useRef } from "react";
// import { getMyProfile } from "../services/api";
// import { useNavigate } from "react-router-dom";

// export default function StudentDashboard() {
//   const [profile, setProfile] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("profile");
//   const [profileImage, setProfileImage] = useState(null);
//   const fileInputRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     getMyProfile()
//       .then(res => { setProfile(res.data); setLoading(false); })
//       .catch(() => { setError("❌ Failed to load profile."); setLoading(false); });

//     // Load saved image from localStorage
//     const savedImage = localStorage.getItem("profileImage");
//     if (savedImage) setProfileImage(savedImage);
//   }, []);

//   const logout = () => { localStorage.clear(); navigate("/login"); };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (file.size > 2 * 1024 * 1024) {
//       alert("Image size must be less than 2MB!");
//       return;
//     }
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setProfileImage(reader.result);
//       localStorage.setItem("profileImage", reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const removeImage = () => {
//     setProfileImage(null);
//     localStorage.removeItem("profileImage");
//   };

//   const getGpaColor = (gpa) => {
//     if (gpa >= 8) return "#2e7d32";
//     if (gpa >= 6) return "#f57f17";
//     return "#c62828";
//   };

//   const getGrade = (gpa) => {
//     if (gpa >= 9) return "A+";
//     if (gpa >= 8) return "A";
//     if (gpa >= 7) return "B";
//     if (gpa >= 6) return "C";
//     return "D";
//   };

//   const getGpaLabel = (gpa) => {
//     if (gpa >= 9) return "Outstanding 🌟";
//     if (gpa >= 8) return "Excellent ⭐";
//     if (gpa >= 7) return "Good 👍";
//     if (gpa >= 6) return "Average 📚";
//     return "Needs Improvement 💪";
//   };

//   const attendance = [
//     { subject: "Data Structures", present: 42, total: 45, color: "#1a237e" },
//     { subject: "Operating Systems", present: 38, total: 45, color: "#1565c0" },
//     { subject: "Database Management", present: 44, total: 45, color: "#0288d1" },
//     { subject: "Computer Networks", present: 35, total: 45, color: "#00838f" },
//     { subject: "Software Engineering", present: 40, total: 45, color: "#2e7d32" },
//   ];

//   const exams = [
//     { subject: "Data Structures", date: "2026-04-10", time: "10:00 AM", room: "Hall A", type: "Internal" },
//     { subject: "Operating Systems", date: "2026-04-12", time: "02:00 PM", room: "Hall B", type: "Internal" },
//     { subject: "Database Management", date: "2026-04-15", time: "10:00 AM", room: "Hall C", type: "External" },
//     { subject: "Computer Networks", date: "2026-04-18", time: "02:00 PM", room: "Hall A", type: "External" },
//     { subject: "Software Engineering", date: "2026-04-20", time: "10:00 AM", room: "Hall B", type: "Internal" },
//   ];

//   const announcements = [
//     { id: 1, title: "Fee Payment Deadline", message: "Last date to pay semester fees is April 5, 2026.", date: "2026-03-28", type: "urgent", icon: "⚠️" },
//     { id: 2, title: "Exam Schedule Released", message: "Internal exam schedule for April has been released.", date: "2026-03-27", type: "info", icon: "📋" },
//     { id: 3, title: "Holiday Notice", message: "College will remain closed on April 14 for Dr. Ambedkar Jayanti.", date: "2026-03-26", type: "holiday", icon: "🎉" },
//     { id: 4, title: "Project Submission", message: "Final year project reports must be submitted by April 25, 2026.", date: "2026-03-25", type: "info", icon: "📝" },
//     { id: 5, title: "Sports Day", message: "Annual sports day will be held on April 8. Register before April 5.", date: "2026-03-24", type: "event", icon: "🏆" },
//   ];

//   const tabs = [
//     { id: "profile", label: "👤 Profile" },
//     { id: "attendance", label: "📅 Attendance" },
//     { id: "exams", label: "📝 Exams" },
//     { id: "notices", label: "📢 Notices" },
//   ];

//   const getAnnouncementColor = (type) => {
//     switch(type) {
//       case "urgent": return "#ffebee";
//       case "holiday": return "#e8f5e9";
//       case "event": return "#e3f2fd";
//       default: return "#f3e5f5";
//     }
//   };

//   const getDaysLeft = (dateStr) => {
//     const today = new Date();
//     const examDate = new Date(dateStr);
//     const diff = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24));
//     if (diff < 0) return "Completed";
//     if (diff === 0) return "Today!";
//     return `${diff} days left`;
//   };

//   return (
//     <div style={styles.container}>
//       {/* Header */}
//       <div style={styles.header}>
//         <h2 style={styles.headerTitle}>🎓 Student Portal</h2>
//         <div style={styles.headerRight}>
//           <span style={styles.welcome}>👋 {localStorage.getItem("username")}</span>
//           <button style={styles.logoutBtn} onClick={logout}>Logout</button>
//         </div>
//       </div>

//       {loading && <div style={styles.centerBox}><p>⏳ Loading...</p></div>}
//       {error && <div style={styles.errorBox}><p>{error}</p></div>}

//       {profile && (
//         <>
//           {/* Tab Navigation */}
//           <div style={styles.tabBar}>
//             {tabs.map(tab => (
//               <button key={tab.id} style={{
//                 ...styles.tabBtn,
//                 ...(activeTab === tab.id ? styles.activeTab : {})
//               }} onClick={() => setActiveTab(tab.id)}>
//                 {tab.label}
//               </button>
//             ))}
//           </div>

//           {/* PROFILE TAB */}
//           {activeTab === "profile" && (
//             <div style={styles.tabContent}>
//               <div style={styles.profileGrid}>

//                 {/* Avatar Card */}
//                 <div style={styles.card}>
//                   <div style={styles.avatarBox}>

//                     {/* Profile Image Upload */}
//                     <div style={styles.imageContainer}>
//                       {profileImage ? (
//                         <img src={profileImage} alt="Profile"
//                           style={styles.profileImg} />
//                       ) : (
//                         <div style={styles.avatar}>
//                           {profile.name?.charAt(0).toUpperCase()}
//                         </div>
//                       )}
//                       {/* Upload Button */}
//                       <div style={styles.uploadOverlay}
//                         onClick={() => fileInputRef.current.click()}>
//                         📷
//                       </div>
//                       <input
//                         type="file"
//                         ref={fileInputRef}
//                         style={{ display: "none" }}
//                         accept="image/*"
//                         onChange={handleImageUpload}
//                       />
//                     </div>

//                     {/* Remove image option */}
//                     {profileImage && (
//                       <button style={styles.removeImgBtn} onClick={removeImage}>
//                         ✕ Remove Photo
//                       </button>
//                     )}
//                     {!profileImage && (
//                       <p style={styles.uploadHint}>
//                         Click 📷 to upload photo
//                       </p>
//                     )}

//                     <h2 style={styles.name}>{profile.name}</h2>
//                     <p style={styles.course}>📚 {profile.course}</p>
//                     <div style={{
//                       ...styles.gpaBadge,
//                       background: getGpaColor(profile.gpa)
//                     }}>
//                       GPA: {profile.gpa} / 10
//                     </div>
//                     <p style={styles.gpaLabel}>{getGpaLabel(profile.gpa)}</p>
//                   </div>

//                   {/* Info Grid */}
//                   <div style={styles.infoGrid}>
//                     {[
//                       { label: "📧 Email", value: profile.email },
//                       { label: "📱 Phone", value: profile.phone },
//                       { label: "📖 Course", value: profile.course },
//                       { label: "🆔 Student ID", value: `STU-${String(profile.id).padStart(4, '0')}` },
//                     ].map((item, i) => (
//                       <div key={i} style={styles.infoItem}>
//                         <span style={styles.infoLabel}>{item.label}</span>
//                         <span style={styles.infoValue}>{item.value}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Stats Card */}
//                 <div style={styles.statsCard}>
//                   <h3 style={styles.statsTitle}>📊 Academic Summary</h3>
//                   <div style={styles.statsGrid}>
//                     <div style={styles.statItem}>
//                       <span style={styles.statValue}>{profile.gpa}</span>
//                       <span style={styles.statLabel}>GPA</span>
//                     </div>
//                     <div style={styles.statItem}>
//                       <span style={styles.statValue}>{getGrade(profile.gpa)}</span>
//                       <span style={styles.statLabel}>Grade</span>
//                     </div>
//                     <div style={styles.statItem}>
//                       <span style={styles.statValue}>
//                         {Math.round((profile.gpa / 10) * 100)}%
//                       </span>
//                       <span style={styles.statLabel}>Score</span>
//                     </div>
//                   </div>

//                   {/* GPA Progress Bar */}
//                   <div style={styles.progressSection}>
//                     <div style={styles.progressLabel}>
//                       <span>GPA Progress</span>
//                       <span>{profile.gpa}/10</span>
//                     </div>
//                     <div style={styles.progressBar}>
//                       <div style={{
//                         ...styles.progressFill,
//                         width: `${(profile.gpa / 10) * 100}%`,
//                         background: getGpaColor(profile.gpa)
//                       }} />
//                     </div>
//                   </div>

//                   {/* Subject wise GPA bars */}
//                   <h4 style={styles.subjectTitle}>📚 Subject Performance</h4>
//                   {[
//                     { subject: "Data Structures", marks: 88 },
//                     { subject: "Operating Systems", marks: 75 },
//                     { subject: "Database Management", marks: 92 },
//                     { subject: "Computer Networks", marks: 70 },
//                     { subject: "Software Engineering", marks: 85 },
//                   ].map((sub, i) => (
//                     <div key={i} style={styles.subjectRow}>
//                       <span style={styles.subjectName}>{sub.subject}</span>
//                       <div style={styles.subjectBar}>
//                         <div style={{
//                           ...styles.subjectFill,
//                           width: `${sub.marks}%`,
//                           background: sub.marks >= 80 ? "#2e7d32" :
//                                       sub.marks >= 60 ? "#f57f17" : "#c62828"
//                         }} />
//                       </div>
//                       <span style={styles.subjectMarks}>{sub.marks}%</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* ATTENDANCE TAB */}
//           {activeTab === "attendance" && (
//             <div style={styles.tabContent}>
//               <h3 style={styles.sectionTitle}>📅 Attendance Summary</h3>
//               <div style={styles.attendanceGrid}>
//                 {attendance.map((item, i) => {
//                   const percent = Math.round((item.present / item.total) * 100);
//                   return (
//                     <div key={i} style={styles.attendanceCard}>
//                       <div style={styles.attendanceHeader}>
//                         <span style={styles.attendanceSubject}>{item.subject}</span>
//                         <span style={{
//                           ...styles.attendanceBadge,
//                           background: percent >= 75 ? "#e8f5e9" : "#ffebee",
//                           color: percent >= 75 ? "#2e7d32" : "#c62828"
//                         }}>
//                           {percent >= 75 ? "✅" : "⚠️"} {percent}%
//                         </span>
//                       </div>
//                       <div style={styles.attendanceBar}>
//                         <div style={{
//                           ...styles.attendanceFill,
//                           width: `${percent}%`,
//                           background: percent >= 75 ? "#2e7d32" : "#c62828"
//                         }} />
//                       </div>
//                       <div style={styles.attendanceCount}>
//                         <span>{item.present} classes attended</span>
//                         <span>{item.total} total classes</span>
//                       </div>
//                       {percent < 75 && (
//                         <p style={styles.attendanceWarning}>
//                           ⚠️ Need {Math.ceil(item.total * 0.75 - item.present)} more classes to reach 75%
//                         </p>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {/* EXAMS TAB */}
//           {activeTab === "exams" && (
//             <div style={styles.tabContent}>
//               <h3 style={styles.sectionTitle}>📝 Upcoming Exams</h3>
//               <div style={styles.examsList}>
//                 {exams.map((exam, i) => {
//                   const daysLeft = getDaysLeft(exam.date);
//                   const isUrgent = typeof daysLeft === "string" &&
//                     daysLeft !== "Completed" &&
//                     parseInt(daysLeft) <= 7;
//                   return (
//                     <div key={i} style={{
//                       ...styles.examCard,
//                       borderLeft: `4px solid ${exam.type === "External" ? "#c62828" : "#1a237e"}`
//                     }}>
//                       <div style={styles.examLeft}>
//                         <span style={styles.examSubject}>{exam.subject}</span>
//                         <div style={styles.examDetails}>
//                           <span>📅 {exam.date}</span>
//                           <span>⏰ {exam.time}</span>
//                           <span>🏫 {exam.room}</span>
//                         </div>
//                       </div>
//                       <div style={styles.examRight}>
//                         <span style={{
//                           ...styles.examType,
//                           background: exam.type === "External" ? "#ffebee" : "#e3f2fd",
//                           color: exam.type === "External" ? "#c62828" : "#1565c0"
//                         }}>
//                           {exam.type}
//                         </span>
//                         <span style={{
//                           ...styles.daysLeft,
//                           color: isUrgent ? "#c62828" : "#2e7d32"
//                         }}>
//                           {isUrgent ? "🔥" : "📆"} {daysLeft}
//                         </span>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {/* NOTICES TAB */}
//           {activeTab === "notices" && (
//             <div style={styles.tabContent}>
//               <h3 style={styles.sectionTitle}>📢 Announcements & Notices</h3>
//               <div style={styles.noticesList}>
//                 {announcements.map((notice) => (
//                   <div key={notice.id} style={{
//                     ...styles.noticeCard,
//                     background: getAnnouncementColor(notice.type)
//                   }}>
//                     <div style={styles.noticeIcon}>{notice.icon}</div>
//                     <div style={styles.noticeContent}>
//                       <h4 style={styles.noticeTitle}>{notice.title}</h4>
//                       <p style={styles.noticeMessage}>{notice.message}</p>
//                       <span style={styles.noticeDate}>📅 {notice.date}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </>
//       )}
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
//   logoutBtn: { background: "#e53935", color: "#fff", padding: "8px 16px",
//     border: "none", borderRadius: "6px", cursor: "pointer" },
//   centerBox: { textAlign: "center", padding: "60px" },
//   errorBox: { background: "#ffebee", padding: "24px", borderRadius: "12px",
//     textAlign: "center", color: "#c62828" },
//   tabBar: { display: "flex", gap: "8px", marginBottom: "24px",
//     background: "#fff", padding: "8px", borderRadius: "12px",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.08)" },
//   tabBtn: { flex: 1, padding: "10px 16px", border: "none",
//     borderRadius: "8px", cursor: "pointer", background: "transparent",
//     fontSize: "14px", color: "#666", fontWeight: "500" },
//   activeTab: { background: "#1a237e", color: "#fff" },
//   tabContent: { animation: "fadeIn 0.3s ease" },
//   profileGrid: { display: "grid", gridTemplateColumns: "1fr 1.5fr",
//     gap: "24px" },
//   card: { background: "#fff", borderRadius: "12px",
//     boxShadow: "0 4px 20px rgba(0,0,0,0.08)", overflow: "hidden" },
//   avatarBox: { background: "#1a237e", padding: "32px",
//     textAlign: "center", color: "#fff" },
//   imageContainer: { position: "relative", width: "100px",
//     height: "100px", margin: "0 auto 16px", cursor: "pointer" },
//   profileImg: { width: "100px", height: "100px", borderRadius: "50%",
//     objectFit: "cover", border: "3px solid #fff" },
//   avatar: { width: "100px", height: "100px", borderRadius: "50%",
//     background: "#fff", color: "#1a237e", fontSize: "40px",
//     fontWeight: "bold", display: "flex", alignItems: "center",
//     justifyContent: "center" },
//   uploadOverlay: { position: "absolute", bottom: "0", right: "0",
//     background: "#fff", borderRadius: "50%", width: "30px",
//     height: "30px", display: "flex", alignItems: "center",
//     justifyContent: "center", cursor: "pointer", fontSize: "16px",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.2)" },
//   removeImgBtn: { background: "rgba(255,255,255,0.2)", color: "#fff",
//     border: "1px solid rgba(255,255,255,0.5)", borderRadius: "20px",
//     padding: "4px 12px", cursor: "pointer", fontSize: "12px",
//     marginBottom: "12px" },
//   uploadHint: { fontSize: "11px", opacity: 0.7, marginBottom: "8px",
//     marginTop: "4px" },
//   name: { margin: "0 0 8px", fontSize: "22px" },
//   course: { margin: "0 0 16px", opacity: 0.8, fontSize: "14px" },
//   gpaBadge: { display: "inline-block", padding: "6px 16px",
//     borderRadius: "20px", color: "#fff", fontWeight: "bold",
//     fontSize: "16px", marginBottom: "8px" },
//   gpaLabel: { margin: 0, fontSize: "13px", opacity: 0.9 },
//   infoGrid: { padding: "16px" },
//   infoItem: { display: "flex", justifyContent: "space-between",
//     alignItems: "center", padding: "12px 8px",
//     borderBottom: "1px solid #f0f0f0" },
//   infoLabel: { fontSize: "13px", color: "#999", fontWeight: "bold" },
//   infoValue: { fontSize: "14px", color: "#333", fontWeight: "500" },
//   statsCard: { background: "#fff", borderRadius: "12px",
//     boxShadow: "0 4px 20px rgba(0,0,0,0.08)", padding: "24px",
//     overflowY: "auto" },
//   statsTitle: { color: "#1a237e", marginTop: 0, marginBottom: "24px" },
//   statsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
//     gap: "16px", marginBottom: "24px" },
//   statItem: { textAlign: "center", padding: "16px",
//     background: "#f5f5f5", borderRadius: "8px" },
//   statValue: { display: "block", fontSize: "28px", fontWeight: "bold",
//     color: "#1a237e" },
//   statLabel: { fontSize: "12px", color: "#999", marginTop: "4px" },
//   progressSection: { marginBottom: "24px" },
//   progressLabel: { display: "flex", justifyContent: "space-between",
//     marginBottom: "8px", fontSize: "14px", color: "#666" },
//   progressBar: { background: "#f0f0f0", borderRadius: "8px",
//     height: "12px", overflow: "hidden" },
//   progressFill: { height: "100%", borderRadius: "8px",
//     transition: "width 0.5s ease" },
//   subjectTitle: { color: "#1a237e", marginBottom: "16px" },
//   subjectRow: { display: "flex", alignItems: "center", gap: "8px",
//     marginBottom: "12px" },
//   subjectName: { fontSize: "12px", color: "#555", width: "160px",
//     flexShrink: 0 },
//   subjectBar: { flex: 1, background: "#f0f0f0", borderRadius: "4px",
//     height: "8px", overflow: "hidden" },
//   subjectFill: { height: "100%", borderRadius: "4px",
//     transition: "width 0.5s ease" },
//   subjectMarks: { fontSize: "12px", color: "#333", width: "40px",
//     textAlign: "right" },
//   sectionTitle: { color: "#1a237e", marginBottom: "20px" },
//   attendanceGrid: { display: "grid", gridTemplateColumns: "1fr 1fr",
//     gap: "16px" },
//   attendanceCard: { background: "#fff", padding: "20px",
//     borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" },
//   attendanceHeader: { display: "flex", justifyContent: "space-between",
//     alignItems: "center", marginBottom: "12px" },
//   attendanceSubject: { fontWeight: "bold", color: "#333", fontSize: "14px" },
//   attendanceBadge: { padding: "4px 10px", borderRadius: "20px",
//     fontSize: "13px", fontWeight: "bold" },
//   attendanceBar: { background: "#f0f0f0", borderRadius: "8px",
//     height: "10px", overflow: "hidden", marginBottom: "8px" },
//   attendanceFill: { height: "100%", borderRadius: "8px",
//     transition: "width 0.5s ease" },
//   attendanceCount: { display: "flex", justifyContent: "space-between",
//     fontSize: "12px", color: "#999" },
//   attendanceWarning: { fontSize: "12px", color: "#c62828",
//     marginTop: "8px", background: "#ffebee", padding: "6px 10px",
//     borderRadius: "6px" },
//   examsList: { display: "flex", flexDirection: "column", gap: "16px" },
//   examCard: { background: "#fff", padding: "20px", borderRadius: "12px",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.08)", display: "flex",
//     justifyContent: "space-between", alignItems: "center" },
//   examLeft: { display: "flex", flexDirection: "column", gap: "8px" },
//   examSubject: { fontWeight: "bold", fontSize: "16px", color: "#333" },
//   examDetails: { display: "flex", gap: "16px", fontSize: "13px",
//     color: "#666" },
//   examRight: { display: "flex", flexDirection: "column",
//     alignItems: "flex-end", gap: "8px" },
//   examType: { padding: "4px 12px", borderRadius: "20px",
//     fontSize: "12px", fontWeight: "bold" },
//   daysLeft: { fontSize: "14px", fontWeight: "bold" },
//   noticesList: { display: "flex", flexDirection: "column", gap: "16px" },
//   noticeCard: { padding: "20px", borderRadius: "12px", display: "flex",
//     gap: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
//   noticeIcon: { fontSize: "32px", flexShrink: 0 },
//   noticeContent: { flex: 1 },
//   noticeTitle: { margin: "0 0 8px", color: "#333", fontSize: "16px" },
//   noticeMessage: { margin: "0 0 8px", color: "#555", fontSize: "14px" },
//   noticeDate: { fontSize: "12px", color: "#999" },
// };




import { useEffect, useState, useRef } from "react";
import { getMyProfile, getAttendance, getExams, getAnnouncements } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const [profile, setProfile] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [exams, setExams] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) setProfileImage(savedImage);

    Promise.all([
      getMyProfile(),
      getAttendance(),
      getExams(),
      getAnnouncements()
    ]).then(([profileRes, attendanceRes, examsRes, announcementsRes]) => {
      setProfile(profileRes.data);
      setAttendance(attendanceRes.data);
      setExams(examsRes.data);
      setAnnouncements(announcementsRes.data);
      setLoading(false);
    }).catch(() => {
      setError("❌ Failed to load data.");
      setLoading(false);
    });
  }, []);

  const logout = () => { localStorage.clear(); navigate("/login"); };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be less than 2MB!");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
      localStorage.setItem("profileImage", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setProfileImage(null);
    localStorage.removeItem("profileImage");
  };

  const getGpaColor = (gpa) => {
    if (gpa >= 8) return "#2e7d32";
    if (gpa >= 6) return "#f57f17";
    return "#c62828";
  };

  const getGrade = (gpa) => {
    if (gpa >= 9) return "A+";
    if (gpa >= 8) return "A";
    if (gpa >= 7) return "B";
    if (gpa >= 6) return "C";
    return "D";
  };

  const getGpaLabel = (gpa) => {
    if (gpa >= 9) return "Outstanding 🌟";
    if (gpa >= 8) return "Excellent ⭐";
    if (gpa >= 7) return "Good 👍";
    if (gpa >= 6) return "Average 📚";
    return "Needs Improvement 💪";
  };

  const getDaysLeft = (dateStr) => {
    const today = new Date();
    const examDate = new Date(dateStr);
    const diff = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24));
    if (diff < 0) return "Completed";
    if (diff === 0) return "Today!";
    return `${diff} days left`;
  };

  const getAnnouncementColor = (type) => {
    switch(type) {
      case "urgent": return "#ffebee";
      case "holiday": return "#e8f5e9";
      case "event": return "#e3f2fd";
      default: return "#f3e5f5";
    }
  };

  const tabs = [
    { id: "profile", label: "👤 Profile" },
    { id: "attendance", label: "📅 Attendance" },
    { id: "exams", label: "📝 Exams" },
    { id: "notices", label: "📢 Notices" },
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.headerTitle}>🎓 Student Portal</h2>
        <div style={styles.headerRight}>
          <span style={styles.welcome}>
            👋 {localStorage.getItem("username")}
          </span>
          <button style={styles.logoutBtn} onClick={logout}>Logout</button>
        </div>
      </div>

      {loading && <div style={styles.centerBox}><p>⏳ Loading...</p></div>}
      {error && <div style={styles.errorBox}><p>{error}</p></div>}

      {profile && (
        <>
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

          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <div style={styles.profileGrid}>
              <div style={styles.card}>
                <div style={styles.avatarBox}>
                  <div style={styles.imageContainer}>
                    {profileImage ? (
                      <img src={profileImage} alt="Profile"
                        style={styles.profileImg} />
                    ) : (
                      <div style={styles.avatar}>
                        {profile.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div style={styles.uploadOverlay}
                      onClick={() => fileInputRef.current.click()}>
                      📷
                    </div>
                    <input type="file" ref={fileInputRef}
                      style={{ display: "none" }} accept="image/*"
                      onChange={handleImageUpload} />
                  </div>
                  {profileImage ? (
                    <button style={styles.removeImgBtn} onClick={removeImage}>
                      ✕ Remove Photo
                    </button>
                  ) : (
                    <p style={styles.uploadHint}>Click 📷 to upload photo</p>
                  )}
                  <h2 style={styles.name}>{profile.name}</h2>
                  <p style={styles.course}>📚 {profile.course}</p>
                  <div style={{
                    ...styles.gpaBadge,
                    background: getGpaColor(profile.gpa)
                  }}>
                    GPA: {profile.gpa} / 10
                  </div>
                  <p style={styles.gpaLabel}>{getGpaLabel(profile.gpa)}</p>
                </div>
                <div style={styles.infoGrid}>
                  {[
                    { label: "📧 Email", value: profile.email },
                    { label: "📱 Phone", value: profile.phone },
                    { label: "📖 Course", value: profile.course },
                    { label: "🆔 Student ID", value: `STU-${String(profile.id).padStart(4, '0')}` },
                  ].map((item, i) => (
                    <div key={i} style={styles.infoItem}>
                      <span style={styles.infoLabel}>{item.label}</span>
                      <span style={styles.infoValue}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={styles.statsCard}>
                <h3 style={styles.statsTitle}>📊 Academic Summary</h3>
                <div style={styles.statsGrid}>
                  {[
                    { value: profile.gpa, label: "GPA" },
                    { value: getGrade(profile.gpa), label: "Grade" },
                    { value: `${Math.round((profile.gpa / 10) * 100)}%`, label: "Score" },
                  ].map((stat, i) => (
                    <div key={i} style={styles.statItem}>
                      <span style={styles.statValue}>{stat.value}</span>
                      <span style={styles.statLabel}>{stat.label}</span>
                    </div>
                  ))}
                </div>
                <div style={styles.progressSection}>
                  <div style={styles.progressLabel}>
                    <span>GPA Progress</span>
                    <span>{profile.gpa}/10</span>
                  </div>
                  <div style={styles.progressBar}>
                    <div style={{
                      ...styles.progressFill,
                      width: `${(profile.gpa / 10) * 100}%`,
                      background: getGpaColor(profile.gpa)
                    }} />
                  </div>
                </div>

                {/* Dynamic Attendance Summary in Profile */}
                <h4 style={styles.subjectTitle}>📚 Attendance Overview</h4>
                {attendance.map((item, i) => {
                  const percent = Math.round(
                    (item.presentCount / item.totalCount) * 100);
                  return (
                    <div key={i} style={styles.subjectRow}>
                      <span style={styles.subjectName}>{item.subject}</span>
                      <div style={styles.subjectBar}>
                        <div style={{
                          ...styles.subjectFill,
                          width: `${percent}%`,
                          background: percent >= 75 ? "#2e7d32" :
                                      percent >= 60 ? "#f57f17" : "#c62828"
                        }} />
                      </div>
                      <span style={styles.subjectMarks}>{percent}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ATTENDANCE TAB */}
          {activeTab === "attendance" && (
            <div>
              <h3 style={styles.sectionTitle}>📅 Attendance Summary</h3>
              <div style={styles.attendanceGrid}>
                {attendance.map((item, i) => {
                  const percent = Math.round(
                    (item.presentCount / item.totalCount) * 100);
                  return (
                    <div key={i} style={styles.attendanceCard}>
                      <div style={styles.attendanceHeader}>
                        <span style={styles.attendanceSubject}>
                          {item.subject}
                        </span>
                        <span style={{
                          ...styles.attendanceBadge,
                          background: percent >= 75 ? "#e8f5e9" : "#ffebee",
                          color: percent >= 75 ? "#2e7d32" : "#c62828"
                        }}>
                          {percent >= 75 ? "✅" : "⚠️"} {percent}%
                        </span>
                      </div>
                      <div style={styles.attendanceBar}>
                        <div style={{
                          ...styles.attendanceFill,
                          width: `${percent}%`,
                          background: percent >= 75 ? "#2e7d32" : "#c62828"
                        }} />
                      </div>
                      <div style={styles.attendanceCount}>
                        <span>{item.presentCount} attended</span>
                        <span>{item.totalCount} total</span>
                      </div>
                      {percent < 75 && (
                        <p style={styles.attendanceWarning}>
                          ⚠️ Need {Math.ceil(
                            item.totalCount * 0.75 - item.presentCount
                          )} more classes to reach 75%
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* EXAMS TAB */}
          {activeTab === "exams" && (
            <div>
              <h3 style={styles.sectionTitle}>📝 Upcoming Exams</h3>
              {exams.length === 0 ? (
                <p style={styles.noData}>No upcoming exams!</p>
              ) : (
                <div style={styles.examsList}>
                  {exams.map((exam, i) => {
                    const daysLeft = getDaysLeft(exam.examDate);
                    const isUrgent = daysLeft !== "Completed" &&
                      daysLeft !== "Today!" &&
                      parseInt(daysLeft) <= 7;
                    return (
                      <div key={i} style={{
                        ...styles.examCard,
                        borderLeft: `4px solid ${exam.examType === "External" ?
                          "#c62828" : "#1a237e"}`
                      }}>
                        <div style={styles.examLeft}>
                          <span style={styles.examSubject}>{exam.subject}</span>
                          <div style={styles.examDetails}>
                            <span>📅 {exam.examDate}</span>
                            <span>⏰ {exam.examTime}</span>
                            <span>🏫 {exam.room}</span>
                          </div>
                        </div>
                        <div style={styles.examRight}>
                          <span style={{
                            ...styles.examType,
                            background: exam.examType === "External" ?
                              "#ffebee" : "#e3f2fd",
                            color: exam.examType === "External" ?
                              "#c62828" : "#1565c0"
                          }}>
                            {exam.examType}
                          </span>
                          <span style={{
                            ...styles.daysLeft,
                            color: isUrgent ? "#c62828" : "#2e7d32"
                          }}>
                            {isUrgent ? "🔥" : "📆"} {daysLeft}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* NOTICES TAB */}
          {activeTab === "notices" && (
            <div>
              <h3 style={styles.sectionTitle}>📢 Announcements</h3>
              {announcements.length === 0 ? (
                <p style={styles.noData}>No announcements!</p>
              ) : (
                <div style={styles.noticesList}>
                  {announcements.map((notice) => (
                    <div key={notice.id} style={{
                      ...styles.noticeCard,
                      background: getAnnouncementColor(notice.type)
                    }}>
                      <div style={styles.noticeIcon}>{notice.icon}</div>
                      <div style={styles.noticeContent}>
                        <h4 style={styles.noticeTitle}>{notice.title}</h4>
                        <p style={styles.noticeMessage}>{notice.message}</p>
                        <span style={styles.noticeDate}>
                          📅 {notice.announcementDate}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
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
  centerBox: { textAlign: "center", padding: "60px" },
  errorBox: { background: "#ffebee", padding: "24px", borderRadius: "12px",
    textAlign: "center", color: "#c62828" },
  tabBar: { display: "flex", gap: "8px", marginBottom: "24px",
    background: "#fff", padding: "8px", borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)" },
  tabBtn: { flex: 1, padding: "10px 16px", border: "none",
    borderRadius: "8px", cursor: "pointer", background: "transparent",
    fontSize: "14px", color: "#666", fontWeight: "500" },
  activeTab: { background: "#1a237e", color: "#fff" },
  profileGrid: { display: "grid", gridTemplateColumns: "1fr 1.5fr",
    gap: "24px" },
  card: { background: "#fff", borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)", overflow: "hidden" },
  avatarBox: { background: "#1a237e", padding: "32px",
    textAlign: "center", color: "#fff" },
  imageContainer: { position: "relative", width: "100px", height: "100px",
    margin: "0 auto 16px", cursor: "pointer" },
  profileImg: { width: "100px", height: "100px", borderRadius: "50%",
    objectFit: "cover", border: "3px solid #fff" },
  avatar: { width: "100px", height: "100px", borderRadius: "50%",
    background: "#fff", color: "#1a237e", fontSize: "40px",
    fontWeight: "bold", display: "flex", alignItems: "center",
    justifyContent: "center" },
  uploadOverlay: { position: "absolute", bottom: "0", right: "0",
    background: "#fff", borderRadius: "50%", width: "30px", height: "30px",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", fontSize: "16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)" },
  removeImgBtn: { background: "rgba(255,255,255,0.2)", color: "#fff",
    border: "1px solid rgba(255,255,255,0.5)", borderRadius: "20px",
    padding: "4px 12px", cursor: "pointer", fontSize: "12px",
    marginBottom: "12px" },
  uploadHint: { fontSize: "11px", opacity: 0.7,
    marginBottom: "8px", marginTop: "4px" },
  name: { margin: "0 0 8px", fontSize: "22px" },
  course: { margin: "0 0 16px", opacity: 0.8, fontSize: "14px" },
  gpaBadge: { display: "inline-block", padding: "6px 16px",
    borderRadius: "20px", color: "#fff", fontWeight: "bold",
    fontSize: "16px", marginBottom: "8px" },
  gpaLabel: { margin: 0, fontSize: "13px", opacity: 0.9 },
  infoGrid: { padding: "16px" },
  infoItem: { display: "flex", justifyContent: "space-between",
    alignItems: "center", padding: "12px 8px",
    borderBottom: "1px solid #f0f0f0" },
  infoLabel: { fontSize: "13px", color: "#999", fontWeight: "bold" },
  infoValue: { fontSize: "14px", color: "#333", fontWeight: "500" },
  statsCard: { background: "#fff", borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)", padding: "24px" },
  statsTitle: { color: "#1a237e", marginTop: 0, marginBottom: "24px" },
  statsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
    gap: "16px", marginBottom: "24px" },
  statItem: { textAlign: "center", padding: "16px",
    background: "#f5f5f5", borderRadius: "8px" },
  statValue: { display: "block", fontSize: "28px", fontWeight: "bold",
    color: "#1a237e" },
  statLabel: { fontSize: "12px", color: "#999", marginTop: "4px" },
  progressSection: { marginBottom: "24px" },
  progressLabel: { display: "flex", justifyContent: "space-between",
    marginBottom: "8px", fontSize: "14px", color: "#666" },
  progressBar: { background: "#f0f0f0", borderRadius: "8px",
    height: "12px", overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: "8px",
    transition: "width 0.5s ease" },
  subjectTitle: { color: "#1a237e", marginBottom: "16px" },
  subjectRow: { display: "flex", alignItems: "center", gap: "8px",
    marginBottom: "12px" },
  subjectName: { fontSize: "12px", color: "#555",
    width: "160px", flexShrink: 0 },
  subjectBar: { flex: 1, background: "#f0f0f0", borderRadius: "4px",
    height: "8px", overflow: "hidden" },
  subjectFill: { height: "100%", borderRadius: "4px",
    transition: "width 0.5s ease" },
  subjectMarks: { fontSize: "12px", color: "#333",
    width: "40px", textAlign: "right" },
  sectionTitle: { color: "#1a237e", marginBottom: "20px" },
  noData: { textAlign: "center", color: "#999", padding: "40px" },
  attendanceGrid: { display: "grid", gridTemplateColumns: "1fr 1fr",
    gap: "16px" },
  attendanceCard: { background: "#fff", padding: "20px",
    borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" },
  attendanceHeader: { display: "flex", justifyContent: "space-between",
    alignItems: "center", marginBottom: "12px" },
  attendanceSubject: { fontWeight: "bold", color: "#333", fontSize: "14px" },
  attendanceBadge: { padding: "4px 10px", borderRadius: "20px",
    fontSize: "13px", fontWeight: "bold" },
  attendanceBar: { background: "#f0f0f0", borderRadius: "8px",
    height: "10px", overflow: "hidden", marginBottom: "8px" },
  attendanceFill: { height: "100%", borderRadius: "8px",
    transition: "width 0.5s ease" },
  attendanceCount: { display: "flex", justifyContent: "space-between",
    fontSize: "12px", color: "#999" },
  attendanceWarning: { fontSize: "12px", color: "#c62828", marginTop: "8px",
    background: "#ffebee", padding: "6px 10px", borderRadius: "6px" },
  examsList: { display: "flex", flexDirection: "column", gap: "16px" },
  examCard: { background: "#fff", padding: "20px", borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)", display: "flex",
    justifyContent: "space-between", alignItems: "center" },
  examLeft: { display: "flex", flexDirection: "column", gap: "8px" },
  examSubject: { fontWeight: "bold", fontSize: "16px", color: "#333" },
  examDetails: { display: "flex", gap: "16px", fontSize: "13px",
    color: "#666" },
  examRight: { display: "flex", flexDirection: "column",
    alignItems: "flex-end", gap: "8px" },
  examType: { padding: "4px 12px", borderRadius: "20px",
    fontSize: "12px", fontWeight: "bold" },
  daysLeft: { fontSize: "14px", fontWeight: "bold" },
  noticesList: { display: "flex", flexDirection: "column", gap: "16px" },
  noticeCard: { padding: "20px", borderRadius: "12px", display: "flex",
    gap: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
  noticeIcon: { fontSize: "32px", flexShrink: 0 },
  noticeContent: { flex: 1 },
  noticeTitle: { margin: "0 0 8px", color: "#333", fontSize: "16px" },
  noticeMessage: { margin: "0 0 8px", color: "#555", fontSize: "14px" },
  noticeDate: { fontSize: "12px", color: "#999" },
};