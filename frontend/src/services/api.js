// import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:8080/api" });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export const login = (data) => API.post("/auth/login", data);
// export const getAllStudents = () => API.get("/admin/students");
// export const addStudent = (data) => API.post("/admin/students", data);
// export const updateStudent = (id, data) => API.put(`/admin/students/${id}`, data);
// export const deleteStudent = (id) => API.delete(`/admin/students/${id}`);
// export const getMyProfile = () => API.get("/student/profile");


import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080/api" });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const login = (data) => API.post("/auth/login", data);
export const getAllStudents = () => API.get("/admin/students");
export const addStudent = (data) => API.post("/admin/students", data);
export const updateStudent = (id, data) => API.put(`/admin/students/${id}`, data);
export const deleteStudent = (id) => API.delete(`/admin/students/${id}`);
export const getMyProfile = () => API.get("/student/profile");

// ✅ New dynamic APIs
export const getAttendance = () => API.get("/student/attendance");
export const getExams = () => API.get("/student/exams");
export const getAnnouncements = () => API.get("/student/announcements");