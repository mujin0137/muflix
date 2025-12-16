import { Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { MovieDetail } from './pages/MovieDetail';
import { Layout } from './components/Layout';


function App() {
  return (
    <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Route>
    </Routes>
  );
}

export default App;
