import { useEffect, useState } from "react";
import axios from "axios";

function ManageUsers() {
  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/user/all",
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteHandler = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      fetchUsers();
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-8 duration-300">

      <div className="max-w-6xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-black dark:text-white mb-8">
          Manage Users
        </h1>

        <div className="space-y-4">

          {users.map((user) => (

            <div
              key={user._id}
              className="bg-slate-100 dark:bg-slate-700 rounded-2xl p-5 flex justify-between items-center"
            >

              <div>

                <h2 className="font-bold text-lg text-black dark:text-white">
                  {user.name}
                </h2>

                <p className="text-gray-500 dark:text-gray-300">
                  {user.email}
                </p>

                <p className="text-sm text-blue-600">
                  {user.role}
                </p>

              </div>

              <button
                onClick={() => deleteHandler(user._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl duration-200"
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default ManageUsers;