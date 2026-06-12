import { useEffect, useState } from "react";
import axios from "axios";

function ManageNotes() {
  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const [notes, setNotes] = useState([]);

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

  const deleteHandler = async (id) => {
    if (!window.confirm("Delete this note?")) return;

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

    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-8 duration-300">

      <div className="max-w-6xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-black dark:text-white mb-8">
          Manage Notes
        </h1>

        <div className="space-y-4">

          {notes.map((note) => (

            <div
              key={note._id}
              className="bg-slate-100 dark:bg-slate-700 rounded-2xl p-5 flex justify-between items-center"
            >

              <div>

                <h2 className="font-bold text-lg text-black dark:text-white">
                  {note.title}
                </h2>

                <p className="text-gray-500 dark:text-gray-300">
                  Uploaded by {note.uploadedBy}
                </p>

              </div>

              <button
                onClick={() => deleteHandler(note._id)}
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

export default ManageNotes;