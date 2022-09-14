import { useState, useEffect } from "react";
import BookCard from "../components/BookCard";

function Books() {
  const [Books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const inputValue = (search) => {
    setSearchTerm(search);
  };

  const getData = () => {
    fetch("books.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setBooks(myJson.books);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bookContainer">
      <h1 className="text-7xl my-5">📚 Libros 📚 </h1>
      <div className="pageDesc">
        <p>
          La pila de libros que estoy leyendo y que me juzgan tanto desde mi
          velador como desde las profundidades de mi Kindle
        </p>
      </div>
      <div className="searchBarContainer">
        <form>
          <label htmlFor="searchText">Buscar Libro</label>
          <input
            className="searchBar"
            id="searchText"
            type="text"
            placeholder="Título u autor..."
            required
            onChange={(e) => {
              inputValue(e.target.value);
            }}
          />
        </form>
      </div>
      <div className="cardContainer">
        {Books.filter(
          (book) =>
            book.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.Author.toLowerCase().includes(searchTerm.toLowerCase())
        ).map((book, i) => (
          <BookCard
            key={i}
            imgSrc={book.imgSrc}
            Author={book.Author}
            Title={book.Title}
            infoLink={book.infoLink}
          />
        ))}
      </div>
    </div>
  );
}

export default Books;
