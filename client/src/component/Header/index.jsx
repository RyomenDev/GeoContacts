import { useState } from "react";
import { Link } from "react-router-dom";
import { HeaderData } from "../../Data";
import { Menu, X } from "lucide-react";

const Header = () => {
  const { CompanyName, HeaderOptions } = HeaderData;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-b from-green-950/90 via-emerald-950 to-black backdrop-blur-md shadow-md p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl md:text-5xl font-[Poppins] text-white">
          <Link to="/">{CompanyName}</Link>
        </h1>

        <nav className="hidden md:flex gap-8 font-[Poppins] text-white text-lg md:text-4xl">
          {HeaderOptions.map((option) => (
            <NavItem key={option.key} option={option} />
          ))}
        </nav>

        <button
          className="md:hidden text-emerald-800"
          onClick={() => setMenuOpen((prevState) => !prevState)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-2 bg-emerald-100 rounded shadow px-4 py-2 font-[Poppins] text-gray-700 text-base space-y-2">
          {HeaderOptions.map((option) => (
            <NavItem
              key={option.key}
              option={option}
              onClick={() => setMenuOpen(false)}
            />
          ))}
        </div>
      )}
    </header>
  );
};

const NavItem = ({ option, onClick }) => {
  const { key, path } = option;

  return path.startsWith("#") ? (
    <a
      href={path}
      onClick={onClick}
      className="block px-2 py-1 rounded hover:bg-blue-100 transition duration-200"
    >
      {key}
    </a>
  ) : (
    <Link
      to={path}
      onClick={onClick}
      className="block px-2 py-1 rounded hover:bg-blue-100 transition duration-200"
    >
      {key}
    </Link>
  );
};

export default Header;
