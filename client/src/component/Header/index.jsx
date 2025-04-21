import { Link } from "react-router-dom";
import { HeaderData } from "../../Data";

const Header = () => {
  const { CompanyName, HeaderOptions } = HeaderData;
  return (
    <header className="bg-emerald-200 shadow-md p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-emerald-800">
          <Link to="/">{CompanyName}</Link>
        </h1>
        <nav className="hidden md:flex gap-8 font-[Poppins] text-gray-700 text-lg">
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
      </div>
    </header>
  );
};

export default Header;
