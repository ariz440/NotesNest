import { Link } from "react-router-dom";

function AdminDashboard() {
  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  return (
    <div className="min-h-screen bg-slate-950 p-8">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-10 mb-10">

          <h1 className="text-5xl font-bold text-violet-500">
            👑 Admin Dashboard
          </h1>

          <p className="text-slate-400 mt-4 text-lg">
            Welcome back, {userInfo?.name}
          </p>

        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* Users */}
          <Link
            to="/admin/users"
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl hover:border-blue-500 hover:-translate-y-2 duration-300"
          >

            <div className="text-5xl mb-5">
              👥
            </div>

            <h2 className="text-3xl font-bold text-blue-500">
              Users
            </h2>

            <p className="text-slate-400 mt-4">
              Manage all registered users.
            </p>

          </Link>

          {/* Notes */}
          <Link
            to="/admin/notes"
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl hover:border-green-500 hover:-translate-y-2 duration-300"
          >

            <div className="text-5xl mb-5">
              📄
            </div>

            <h2 className="text-3xl font-bold text-green-500">
              Notes
            </h2>

            <p className="text-slate-400 mt-4">
              Manage all uploaded notes.
            </p>

          </Link>

          {/* Profile */}
          <Link
            to="/profile"
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl hover:border-orange-500 hover:-translate-y-2 duration-300"
          >

            <div className="text-5xl mb-5">
              👤
            </div>

            <h2 className="text-3xl font-bold text-orange-500">
              Profile
            </h2>

            <p className="text-slate-400 mt-4">
              View your profile details.
            </p>

          </Link>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;