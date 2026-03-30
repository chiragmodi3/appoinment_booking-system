import logo from './logo.svg';
import './App.css';
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import Admin from "./pages/Admin";
import Signup from './pages/Signup';

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#fff",
            borderRadius: "10px",
          },
        }}
      />
      <Routes>
        <Route
          path="/"
          element={
            !token ? (
              <Login />
            ) : role === "admin" ? (
              <Admin />
            ) : (
              <UserDashboard />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;