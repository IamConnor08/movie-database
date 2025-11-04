import { Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './pages/Home';
import TVShows from './pages/TVShows';
import Movies from './pages/Movies';
import SearchResults from './pages/searchPage';
import SearchMulti from './pages/MultiSearch';



function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tvshows" element={<TVShows />} />
          <Route path="/search/:title" element={<SearchMulti />} />
          <Route path="/movie/:title" element={<SearchResults />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;