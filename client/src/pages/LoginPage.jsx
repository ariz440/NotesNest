import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const userInfo = JSON.parse(
      localStorage.getItem("userInfo")
    );

    if (userInfo) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Invalid Email or Password"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center px-4 py-8">

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-10">

        <h1 className="text-3xl sm:text-4xl font-bold text-center text-white mb-3">
          Welcome Back 👋
        </h1>

        <p className="text-center text-sm sm:text-base text-slate-400 mb-8">
          Login to continue using NotesNest
        </p>

        <form
          onSubmit={submitHandler}
          className="space-y-5"
        >
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white placeholder-slate-400 outline-none focus:border-blue-500 duration-200"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white placeholder-slate-400 outline-none focus:border-blue-500 duration-200"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold duration-300">
            Login
          </button>
        </form>

        <p className="text-center text-sm sm:text-base text-slate-400 mt-8">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 font-semibold hover:text-blue-400"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default LoginPage;