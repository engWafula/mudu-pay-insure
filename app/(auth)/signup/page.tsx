export default function Signup() {
    return (
      <div className="min-h-screen bg-white text-gray-900 p-8 pb-20 sm:p-20">
        <header className="flex justify-between items-center py-6">
          <h1 className="text-xl font-bold">Create an Account</h1>
          <a href="/login" className="hover:underline">Login</a>
        </header>
  
        <main className="flex flex-col items-center py-12">
          <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
          <div className="w-full max-w-md">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 mb-4 text-lg border border-gray-300 rounded-lg"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 mb-4 text-lg border border-gray-300 rounded-lg"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 mb-4 text-lg border border-gray-300 rounded-lg"
            />
            <button className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700">
              Sign Up
            </button>
          </div>
        </main>
      </div>
    );
  }
  