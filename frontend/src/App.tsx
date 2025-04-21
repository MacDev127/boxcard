import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import BoxerList from './pages/Boxers/BoxerList/BoxerList';
import BoxerDetail from './pages/Boxers/BoxerDetails/BoxerDetail';
import BoxerEdit from './pages/Boxers/BoxerEdit';
import AdminDashboard from './pages/Admin/AdminDashboard/AdminDashboard';
import AddBoxerPage from './pages/Admin/AddBoxer/AddBoxerPage';
import ManageBoxerPage from './pages/Admin/ManageBoxer/ManageBoxerPage';
import AnalyticsPage from './pages/Admin/Analytics/AnalyticsPage';
import EditBoxerPage from './pages/Admin/EditBoxer/EditBoxerPage';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/boxers" element={<BoxerList />} />
          <Route path="/boxers/:id" element={<BoxerDetail />} />
          <Route path="/boxers/:id/edit" element={<BoxerEdit />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<AdminDashboard />}>
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="add-boxer" element={<AddBoxerPage />} />
            <Route path="manage-boxer" element={<ManageBoxerPage />} />
            <Route path="boxers/:id/edit" element={<EditBoxerPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
