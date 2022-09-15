import { useState } from "react";
import { NavLink } from "react-router-dom";
import MenuItems from "./MenuItems";
const Header = ({ title }) => {
  const [active, setActive] = useState(false);

  const showMenu = () => {
    setActive(!active);
  };

  return (
    <nav className="bg-black fixed w-full z-20 top-0 border-gray-200 px-2 sm:px-4 py-3 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap justify-between items-center mx-10">
        <NavLink to="">
          <span className="mr-3 self-center whitespace-nowrap dark:text-white galleryTitle">
            {title}
          </span>
        </NavLink>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={showMenu}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 mt-4 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:border-gray-700 menuItems">
            <li>
              <NavLink
                to="/musica"
                className="block py-2 pr-4 pl-3 hover:text-white active:text-white"
                aria-current="page"
              >
                Escucho Música 🎼
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cine"
                className="block py-2 pr-4 pl-3 hover:text-white active:text-white"
              >
                Veo Películas 🎥
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/libros"
                className="block py-2 pr-4 pl-3 hover:text-white active:text-white"
              >
                Leo Libros 📚
              </NavLink>
            </li>
          </ul>
          <MenuItems showMenu={showMenu} active={active} />
        </div>
      </div>
    </nav>
  );
};

export default Header;
