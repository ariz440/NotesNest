import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";

import AdminDashboard from "./pages/AdminDashboard";
import ManageUsers from "./pages/ManageUsers";
import ManageNotes from "./pages/ManageNotes";

import ChatPage from "./pages/ChatPage";

function App() {

  const [darkMode, setDarkMode] = useState(false);

  return (
    <BrowserRouter>

      <div className={darkMode ? "bg-slate-900 text-white min-h-screen" : "bg-slate-100 min-h-screen"}>

        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <Routes>

          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<PrivateRoute />}>

            <Route
              path="/dashboard"
              element={<DashboardPage />}
            />

            <Route
              path="/profile"
              element={<ProfilePage />}
            />

            <Route
              path="/chat"
              element={<ChatPage />}
            />

            <Route
              path="/admin"
              element={<AdminDashboard />}
            />

            <Route
              path="/admin/users"
              element={<ManageUsers />}
            />

            <Route
              path="/admin/notes"
              element={<ManageNotes />}
            />

          </Route>

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;