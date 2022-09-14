import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Music from "./pages/Music";
import Movies from "./pages/Movies";
import Books from "./pages/Books";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header title="Dirk Gastón" />
        <Routes>
          <Route path="/prueba-react-I" element={<Home />}></Route>
          <Route path="/prueba-react-I/musica" element={<Music />}></Route>
          <Route path="/prueba-react-I/cine" element={<Movies />}></Route>
          <Route path="/prueba-react-I/libros" element={<Books />}></Route>
        </Routes>
        <Footer galleryInfo="© Dirk Gastón 2022" />
      </div>
    </BrowserRouter>
  );
}

export default App;
