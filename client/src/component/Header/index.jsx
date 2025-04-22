import { useState } from "react";
import { Link } from "react-router-dom";
import { HeaderData } from "../../Data";
import { Menu, X } from "lucide-react";

const Header = () => {
  const { CompanyName, HeaderOptions } = HeaderData;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-gradient-to-b from-green-950/90 via-emerald-950 to-black backdrop-blur-md shadow-md p-4 sticky top-0 z-50">
        {/* <header className="bg-[#129e5d] shadow-md p-4 sticky top-0 z-50"> */}
        {/*bg-gradient-to-r from-[#39e775] via-emerald-300 to-emerald-300 */}
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl md:text-5xl font-[Poppins] text-white">
            <Link to="/">{CompanyName}</Link>
          </h1>

          <nav className="hidden md:flex gap-8 font-[Poppins] text-white text-lg md:text-4xl">
            {HeaderOptions.map((option) =>
              option.path.startsWith("#") ? (
                <a
                  key={option.key}
                  href={option.path}
                  className="px-3 py-1 rounded hover:text-blue-500 hover:bg-blue-50 transition duration-200"
                >
                  {option.key}
                </a>
              ) : (
                <Link
                  key={option.key}
                  to={option.path}
                  className="px-3 py-1 rounded hover:text-blue-500 hover:bg-blue-50 transition duration-200"
                >
                  {option.key}
                </Link>
              )
            )}
          </nav>

          <button
            className="md:hidden text-emerald-800"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden mt-2 bg-emerald-100 rounded shadow px-4 py-2 font-[Poppins] text-gray-700 text-base space-y-2">
            {HeaderOptions.map((option) =>
              option.path.startsWith("#") ? (
                <a
                  key={option.key}
                  href={option.path}
                  onClick={() => setMenuOpen(false)}
                  className="block px-2 py-1 rounded hover:bg-blue-100"
                >
                  {option.key}
                </a>
              ) : (
                <Link
                  key={option.key}
                  to={option.path}
                  onClick={() => setMenuOpen(false)}
                  className="block px-2 py-1 rounded hover:bg-blue-100"
                >
                  {option.key}
                </Link>
              )
            )}
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
