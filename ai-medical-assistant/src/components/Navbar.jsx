function Navbar() {
  return (
    <nav className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center border-b border-slate-700">
      <h1 className="text-3xl font-bold text-cyan-400">
        🩺 AI Medical Assistant
      </h1>

      <ul className="flex gap-8 text-lg">
        <li className="hover:text-cyan-400 cursor-pointer transition">
          Home
        </li>

        <li className="hover:text-cyan-400 cursor-pointer transition">
          Features
        </li>

        <li className="hover:text-cyan-400 cursor-pointer transition">
          Dashboard
        </li>

        <li className="hover:text-cyan-400 cursor-pointer transition">
          Chatbot
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;