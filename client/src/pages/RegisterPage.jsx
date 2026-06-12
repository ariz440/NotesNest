import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
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
        "http://localhost:5000/api/auth/register",
        {
          name,
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
          "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center items-center px-5">

      <div className="w-full max-w-md bg-slate-800 rounded-3xl shadow-2xl shadow-black/30 p-10">

        <h1 className="text-4xl font-bold text-center text-white mb-3">
          Create Account 🚀
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Join NotesNest and start managing your notes
        </p>

        <form
          onSubmit={submitHandler}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Full Name"
            className="w-full bg-slate-700 border border-slate-600 rounded-2xl p-4 text-white placeholder-gray-400 outline-none focus:border-green-500 duration-200"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full bg-slate-700 border border-slate-600 rounded-2xl p-4 text-white placeholder-gray-400 outline-none focus:border-green-500 duration-200"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Create Password"
            className="w-full bg-slate-700 border border-slate-600 rounded-2xl p-4 text-white placeholder-gray-400 outline-none focus:border-green-500 duration-200"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-semibold duration-300">
            Register
          </button>

        </form>

        <p className="text-center text-gray-400 mt-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 font-semibold hover:text-blue-400"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default RegisterPage;

