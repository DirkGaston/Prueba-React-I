import { Link } from "react-router-dom";

const MenuItems = ({ showMenu, active }) => {
  return (
    <ul className={active ? "flex-col flex items-center md:hidden" : "hidden"}>
      <li>
        <Link to="/musica">Escucho Música 🎼</Link>
      </li>
      <li>
        <Link to="/cine">Veo Películas 🎥</Link>
      </li>
      <li>
        <Link to="/libros">Leo Libros 📚</Link>
      </li>
    </ul>
  );
};

export default MenuItems;
