function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900 px-5 py-16">

      <div className="max-w-7xl mx-auto">

        {/* Hero Section */}
        <div className="bg-slate-800 rounded-3xl shadow-2xl shadow-black/30 p-14 text-center">

          <h1 className="text-7xl font-bold text-blue-500">
            📚 NotesNest
          </h1>

          <p className="text-gray-300 text-2xl mt-6">
            Your Smart Space for Learning & Sharing
          </p>

          <p className="text-gray-400 mt-6 text-lg max-w-3xl mx-auto">
            Store notes, discover study materials, and connect with others
            through the community chat. Everything you need for productive
            learning, all in one place.
          </p>

        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          <div className="bg-slate-800 p-8 rounded-3xl shadow-2xl shadow-black/20 hover:bg-slate-700 hover:scale-105 duration-300">

            <h2 className="text-2xl font-bold text-white mb-4">
              📂 Organized Notes
            </h2>

            <p className="text-gray-300">
              Keep all your study materials neatly organized and easy to find.
            </p>

          </div>

          <div className="bg-slate-800 p-8 rounded-3xl shadow-2xl shadow-black/20 hover:bg-slate-700 hover:scale-105 duration-300">

            <h2 className="text-2xl font-bold text-white mb-4">
              🌍 Access Anywhere
            </h2>

            <p className="text-gray-300">
              Open and download your notes whenever you need them.
            </p>

          </div>

          <div className="bg-slate-800 p-8 rounded-3xl shadow-2xl shadow-black/20 hover:bg-slate-700 hover:scale-105 duration-300">

            <h2 className="text-2xl font-bold text-white mb-4">
              🔒 Secure Storage
            </h2>

            <p className="text-gray-300">
              Your documents remain safe and available whenever you need them.
            </p>

          </div>

          <div className="bg-slate-800 p-8 rounded-3xl shadow-2xl shadow-black/20 hover:bg-slate-700 hover:scale-105 duration-300">

            <h2 className="text-2xl font-bold text-white mb-4">
              💬 Community Chat
            </h2>

            <p className="text-gray-300">
              Ask others for notes and help each other learn better.
            </p>

          </div>

        </div>

        {/* Bottom Section */}
        <div className="text-center mt-24">

          <h2 className="text-4xl font-bold text-blue-500">
            Learn Together. Grow Together. 🚀
          </h2>

          <p className="text-gray-400 mt-5 text-lg">
            Smart • Secure • Collaborative
          </p>

        </div>

      </div>

    </div>
  );
}

export default HomePage;

