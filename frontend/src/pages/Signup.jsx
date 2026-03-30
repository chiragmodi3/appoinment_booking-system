import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await API.post("/auth/signup", {
        username,
        password,
        role,
      });

      toast.success("User registered successfully ✅");

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch {
      toast.error("Error creating user ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-purple-900">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl w-96">

        <h1 className="text-3xl text-white font-bold text-center mb-6">
          Register User
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-4 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-3 mb-6 rounded-lg bg-white/20 text-white focus:outline-none"
        >
          <option value="user" className="text-black">User</option>
          <option value="admin" className="text-black">Admin</option>
        </select>

        <button
          onClick={handleSignup}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:scale-105 transition"
        >
          Register
        </button>
      </div>
    </div>
  );
}