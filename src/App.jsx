import Header from "./components/Header";
import Footer from "./components/Footer";
import WeekAlbums from "./components/WeekAlbums";
import WeekArtists from "./components/WeekArtists";

function App() {
  return (
    <div className="App">
      <Header title="Dirk G's Weekly" />
      <h1 className="text-7xl my-5">Artists</h1>
      <div id="artists">
        <WeekArtists />
      </div>
      <h1 className="text-7xl my-5">Albums</h1>
      <div id="albums">
        <WeekAlbums />
      </div>
      <h1 className="text-7xl my-5">Songs</h1>
      <div id="songs"></div>
      <Footer galleryInfo="A musical summary of the last seven days" />
    </div>
  );
}

export default App;
