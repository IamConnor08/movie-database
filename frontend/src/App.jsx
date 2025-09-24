import { useState } from 'react';
import Navbar from './components/NavBar';
import Home from './pages/Home';
import TVShows from './pages/TVShows';



function App() {
  const [currentPage, setCurrentPage] = useState('Home');

  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <Home />;
      case 'TV Shows':
        return <TVShows />;
      default:
        return <Home />;
    }
  };

  return (
    <div>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;