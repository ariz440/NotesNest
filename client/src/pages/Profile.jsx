function ProfilePage() {
const userInfo = JSON.parse(
localStorage.getItem("userInfo")
);

return ( <div className="min-h-screen bg-slate-100 flex justify-center items-center">

```
  <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-lg">

    <div className="flex flex-col items-center">

      <div className="w-28 h-28 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
        {userInfo?.name?.charAt(0)}
      </div>

      <h1 className="text-3xl font-bold mt-5">
        {userInfo?.name}
      </h1>

      <p className="text-gray-500 mt-2">
        {userInfo?.email}
      </p>

      <div className="mt-8 w-full">

        <div className="bg-slate-100 p-4 rounded-xl mb-4">
          <h3 className="font-semibold">
            Role
          </h3>

          <p className="text-gray-500 mt-1">
            {userInfo?.role}
          </p>
        </div>

        <div className="bg-slate-100 p-4 rounded-xl">
          <h3 className="font-semibold">
            User ID
          </h3>

          <p className="text-gray-500 mt-1 break-all">
            {userInfo?._id}
          </p>
        </div>

      </div>

    </div>

  </div>

</div>


);
}

export default ProfilePage;
