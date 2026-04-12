import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-white hover:text-blue-400 transition">
          🍌 Spoiled Bananas
        </Link>
        <nav>
          <Link to="/" className="text-gray-300 hover:text-white transition text-sm">
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}
