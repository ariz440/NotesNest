import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <nav className="bg-slate-950 border-b border-slate-800 shadow-2xl shadow-black/30 sticky top-0 z-50">

      <div className="w-full px-6 md:px-10 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-blue-500 hover:text-blue-400 duration-300"
        >
          📚 NotesNest
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="text-gray-300 hover:text-blue-500 duration-200"
          >
            🏡 Home
          </Link>

          {userInfo ? (
            <>
              <Link
                to="/dashboard"
                className="text-gray-300 hover:text-blue-500 duration-200"
              >
                ⬜ Dashboard
              </Link>

              <Link
                to="/chat"
                className="text-gray-300 hover:text-blue-500 duration-200"
              >
                💬 Community Chat
              </Link>

              {userInfo.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-purple-400 font-semibold hover:text-purple-300 duration-200"
                >
                  😎 Admin Panel
                </Link>
              )}

              <Link
                to="/profile"
                className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-full hover:bg-slate-700 duration-200"
              >
                <img
                  src={
                    userInfo.avatar
                      ? `http://localhost:5000${userInfo.avatar}`
                      : `https://ui-avatars.com/api/?name=${userInfo.name}`
                  }
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />

                <span className="font-medium text-white">
                  {userInfo.name}
                </span>
              </Link>

              <button
                onClick={logoutHandler}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="border border-blue-500 text-blue-500 px-5 py-2 rounded-xl hover:bg-blue-500 hover:text-white duration-200"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 duration-200"
              >
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;

