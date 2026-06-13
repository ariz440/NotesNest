import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <nav className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-blue-500"
        >
          📚 NotesNest
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">

          <Link to="/" className="text-gray-300 hover:text-blue-500">
            🏡 Home
          </Link>

          {userInfo && (
            <>
              <Link
                to="/dashboard"
                className="text-gray-300 hover:text-blue-500"
              >
                ⬜ Dashboard
              </Link>

              <Link
                to="/chat"
                className="text-gray-300 hover:text-blue-500"
              >
                💬 Community Chat
              </Link>

              {userInfo.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-purple-400 font-semibold"
                >
                  😎 Admin Panel
                </Link>
              )}

              <Link
                to="/profile"
                className="flex items-center gap-2 bg-slate-800 px-3 py-2 rounded-full"
              >
                <img
                  src={
                    userInfo.avatar
                      ? `https://notesnest-k3g1.onrender.com${userInfo.avatar}`
                      : `https://ui-avatars.com/api/?name=${userInfo.name}`
                  }
                  alt=""
                  className="w-9 h-9 rounded-full object-cover"
                />

                <span className="text-white">
                  {userInfo.name}
                </span>
              </Link>

              <button
                onClick={logoutHandler}
                className="bg-red-500 px-5 py-2 rounded-xl text-white"
              >
                Logout
              </button>
            </>
          )}

          {!userInfo && (
            <>
              <Link
                to="/login"
                className="border border-blue-500 text-blue-500 px-4 py-2 rounded-xl"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-xl"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Icon */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-slate-900 px-5 py-4 flex flex-col gap-4">

          <Link to="/">🏡 Home</Link>

          {userInfo && (
            <>
              <Link to="/dashboard">⬜ Dashboard</Link>

              <Link to="/chat">
                💬 Community Chat
              </Link>

              {userInfo.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-purple-400"
                >
                  😎 Admin Panel
                </Link>
              )}

              <Link to="/profile">
                👤 Profile
              </Link>

              <button
                onClick={logoutHandler}
                className="bg-red-500 py-2 rounded-xl text-white"
              >
                Logout
              </button>
            </>
          )}

          {!userInfo && (
            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;