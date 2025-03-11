import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import BoxerList from './pages/Boxers/BoxerList';
import BoxerDetail from './pages/Boxers/BoxerDetail';
import BoxerEdit from './pages/Boxers/BoxerEdit';
import AdminDashboard from './pages/Admin/AdminDashboard';
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/boxers" element={<BoxerList />} />
          <Route path="/boxers/:id" element={<BoxerDetail />} />
          <Route path="/boxers/:id/edit" element={<BoxerEdit />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
