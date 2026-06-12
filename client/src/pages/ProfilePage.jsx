import { useState } from "react";
import axios from "axios";

function ProfilePage() {
  const storedUser = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const [userInfo, setUserInfo] = useState(storedUser);

  const uploadAvatarHandler = async (file) => {
    if (!file) return;

    try {
      const formData = new FormData();

      formData.append("avatar", file);

      const { data } = await axios.put(
        "http://localhost:5000/api/user/avatar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      const updatedUser = {
        ...userInfo,
        avatar: data.avatar,
      };

      setUserInfo(updatedUser);

      localStorage.setItem(
        "userInfo",
        JSON.stringify(updatedUser)
      );

      alert("Profile photo updated successfully");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Upload failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center p-8">

      <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl shadow-2xl p-10">

        {/* Avatar */}
        <div className="flex flex-col items-center">

          <label className="cursor-pointer">

            <img
              src={
                userInfo.avatar
                  ? `http://localhost:5000${userInfo.avatar}`
                  : `https://ui-avatars.com/api/?name=${userInfo.name}`
              }
              alt="avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 hover:opacity-80 duration-200"
            />

            <input
              type="file"
              hidden
              onChange={(e) =>
                uploadAvatarHandler(e.target.files[0])
              }
            />

          </label>

         <p className="text-sm text-slate-400 mt-3">
            Click photo to change profile picture
          </p>

         <h1 className="text-3xl font-bold mt-5 text-white">
            My Profile
          </h1>

        </div>

        {/* Information */}
        <div className="mt-10 space-y-6">

          {/* Name */}
          <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">

            <p className="text-slate-400 mb-1">
              Name
            </p>

           <h2 className="text-xl font-semibold text-white">
              {userInfo.name}
            </h2>

          </div>

          {/* Email */}
        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">

           <p className="text-slate-400 mb-1">
              Email
            </p>

        <h2 className="text-xl font-semibold text-white">
              {userInfo.email}
            </h2>

          </div>

          {/* Role */}
         <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">

            <p className="text-slate-400 mb-1">
              Role
            </p>

            <h2 className="text-xl font-semibold capitalize text-white">
              {userInfo.role}
            </h2>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProfilePage;