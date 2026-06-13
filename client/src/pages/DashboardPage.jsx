import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DashboardPage() {
  const navigate = useNavigate();

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/notes",
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );


      setNotes(data);

    } catch (error) {
      console.log(error);
    }


  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const uploadHandler = async (e) => {
    e.preventDefault();


    if (!title || !file) {
      return alert(
        "Please enter title and select file"
      );
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("file", file);

      const uploadResponse = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      await axios.post(
        "http://localhost:5000/api/notes",
        {
          title,
          fileName: uploadResponse.data.fileName,
          fileUrl: uploadResponse.data.fileUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setTitle("");
      setFile(null);

      fetchNotes();

      alert("Note uploaded successfully");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Upload failed"
      );

    } finally {

      setLoading(false);

    }


  };

  const deleteHandler = async (id) => {
    try {


      await axios.delete(
        `http://localhost:5000/api/notes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      fetchNotes();

      alert("Deleted successfully");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Delete failed"
      );

    }


  };

  const editHandler = async (note) => {


    const newTitle = prompt(
      "Enter new title",
      note.title
    );

    if (!newTitle) return;

    try {

      await axios.put(
        `http://localhost:5000/api/notes/${note._id}`,
        {
          title: newTitle,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      fetchNotes();

      alert("Updated successfully");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Update failed"
      );

    }


  };

  const filteredNotes = notes.filter((note) =>
    note.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (<div className="min-h-screen bg-slate-950 p-3 md:p-8 overflow-x-hidden">


    <div className="max-w-5xl mx-auto">


      <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-xl p-4 md:p-6 flex flex-col md:flex-row gap-4 md:justify-between md:items-center">


        <div>

          <h1 className="text-4xl font-bold text-black dark:text-white">
            Dashboard
          </h1>

          <p className="text-gray-500 dark:text-gray-300 mt-2">
            Welcome, {userInfo?.name}
          </p>

        </div>

        <button
          onClick={logoutHandler}
          className="bg-red-600 text-white px-5 py-3 rounded-lg"
        >
          Logout
        </button>

      </div>

      <div className="bg-slate-800 border border-slate-700 mt-8 rounded-xl shadow-xl p-8">

        <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
          Upload Note
        </h2>

        <form
          onSubmit={uploadHandler}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Note Title"
            className="w-full border border-slate-600 p-3 rounded-lg bg-slate-700 text-white placeholder-gray-400"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <input
            type="file"
            className="w-full border border-slate-600 p-3 rounded-lg bg-slate-700 text-white"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
          />

          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            {loading
              ? "Uploading..."
              : "Upload"}
          </button>

        </form>

      </div>

      <div className="bg-slate-800 border border-slate-700 mt-8 rounded-xl shadow-xl p-8">

        <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
          Uploaded Notes ({notes.length})
        </h2>

        <input

          type="text"
          placeholder="Search notes..."
          className="w-full border border-slate-600 p-3 rounded-lg mb-6 bg-slate-700 text-white placeholder-gray-400"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        {filteredNotes.length === 0 ? (
          <div className="bg-slate-700 text-white p-5 rounded-lg">
            No notes found
          </div>
        ) : (
          <div className="space-y-4">

            {filteredNotes.map((note) => (


              <div
                key={note._id}
                className="bg-slate-700 border border-slate-600 rounded-xl p-5 flex flex-col md:flex-row gap-4 md:justify-between md:items-center"
              >



                <div>

                  <h3 className="font-bold text-lg text-black dark:text-white">
                    {note.title}
                  </h3>

                  <p className="text-gray-300 text-sm mt-1">
                    Uploaded by {note.user?.name}
                  </p>

                </div>


                <div className="grid grid-cols-1 sm:flex gap-3 w-full md:w-auto">



                  <a
                    href={`http://localhost:5000${note.fileUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg w-full md:w-auto text-center duration-200"
                  >
                    Download
                  </a>

                  {(note.user?._id ===
                    userInfo._id ||
                    userInfo.role ===
                    "admin") && (
                      <>
                        <button
                          onClick={() =>
                            editHandler(note)
                          }
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg w-full md:w-auto duration-200"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            deleteHandler(note._id)
                          }
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg w-full md:w-auto duration-200"
                        >
                          Delete
                        </button>
                      </>
                    )}

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </div>

  </div>


  );
}

export default DashboardPage;
