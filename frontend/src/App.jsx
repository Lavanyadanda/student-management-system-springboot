// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./components/Login";
// import AdminDashboard from "./components/AdminDashboard";
// import StudentDashboard from "./components/StudentDashboard";

// function PrivateRoute({ children, role }) {
//   const token = localStorage.getItem("token");
//   const userRole = localStorage.getItem("role");
//   if (!token) return <Navigate to="/login" />;
//   if (role && userRole !== role) return <Navigate to="/login" />;
//   return children;
// }

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/admin" element={
//           <PrivateRoute role="ADMIN"><AdminDashboard /></PrivateRoute>
//         } />
//         <Route path="/student" element={
//           <PrivateRoute role="STUDENT"><StudentDashboard /></PrivateRoute>
//         } />
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";

function PrivateRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  if (!token) return <Navigate to="/login" />;
  if (role && userRole !== role) return <Navigate to="/login" />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={
          <PrivateRoute role="ADMIN">
            <AdminDashboard />
          </PrivateRoute>
        } />
        <Route path="/student" element={
          <PrivateRoute role="STUDENT">
            <StudentDashboard />
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}