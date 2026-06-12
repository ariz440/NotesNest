import { useEffect, useState } from "react";
import axios from "axios";

function ChatPage() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/messages",
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();

    const interval = setInterval(() => {
      fetchMessages();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const sendHandler = async (e) => {
    e.preventDefault();

    if (!message) return;

    try {
      await axios.post(
        "http://localhost:5000/api/messages",
        { message },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setMessage("");
      fetchMessages();
    } catch (error) {
      alert("Failed to send");
    }
  };

  const editHandler = async (msg) => {
    const newMessage = prompt("Edit your message", msg.message);
    if (!newMessage) return;

    try {
      await axios.put(
        `http://localhost:5000/api/messages/${msg._id}`,
        { message: newMessage },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      fetchMessages();
    } catch (error) {
      alert("Update failed");
    }
  };

  const deleteHandler = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/messages/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      fetchMessages();
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-3 sm:p-8">

      <div className="max-w-5xl mx-auto">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-4 sm:p-8">

          <h1 className="text-2xl sm:text-4xl font-bold text-cyan-500 mb-3">
            💬 Community Chat
          </h1>

          <p className="text-slate-400 mb-6 sm:mb-8 text-sm sm:text-base">
            Discuss and request notes with other users.
          </p>

          {/* INPUT */}
          <form
            onSubmit={sendHandler}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8"
          >

            <input
              type="text"
              placeholder="Anyone have DSA notes?"
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-3 sm:p-4 text-white outline-none focus:border-cyan-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button className="bg-cyan-600 hover:bg-cyan-700 px-6 sm:px-8 py-3 rounded-xl text-white font-semibold duration-300 w-full sm:w-auto">
              Send
            </button>

          </form>

          {/* MESSAGES */}
          <div className="space-y-4 sm:space-y-5">

            {messages.map((msg) => (
              <div
                key={msg._id}
                className="bg-slate-800 border border-slate-700 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center"
              >

                <div className="break-words">

                  <h2 className="font-bold text-base sm:text-lg text-white">
                    👤 {msg.name}
                  </h2>

                  <p className="text-slate-300 mt-2 sm:mt-3 text-sm sm:text-base">
                    {msg.message}
                  </p>

                </div>

                {(msg.user?._id === userInfo._id ||
                  userInfo.role === "admin") && (

                  <div className="flex flex-wrap gap-3 w-full sm:w-auto">

                    {msg.user?._id === userInfo._id && (
                      <button
                        onClick={() => editHandler(msg)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 sm:px-5 py-2 rounded-xl duration-300 w-full sm:w-auto"
                      >
                        Edit
                      </button>
                    )}

                    <button
                      onClick={() => deleteHandler(msg._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-5 py-2 rounded-xl duration-300 w-full sm:w-auto"
                    >
                      Delete
                    </button>

                  </div>

                )}

              </div>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
}

export default ChatPage;