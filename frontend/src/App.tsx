import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import BoxerList from './pages/Boxers/BoxerList/BoxerList';
import BoxerDetail from './pages/Boxers/BoxerDetails/BoxerDetail';
// import BoxerEdit from './pages/Boxers/BoxerEdit';
import AdminDashboard from './pages/Admin/AdminDashboard/AdminDashboard';
import AddBoxerPage from './pages/Admin/AddBoxer/AddBoxerPage';
import ManageBoxerPage from './pages/Admin/ManageBoxer/ManageBoxerPage';
import AnalyticsPage from './pages/Admin/Analytics/AnalyticsPage';
import EditBoxerPage from './pages/Admin/EditBoxer/EditBoxerPage';
import AddContestPage from './pages/Admin/AddContest/AddContest';
import ContactPage from './pages/Contact/ContactPage';
import RegisterPage from './pages/Register/RegisterPage';
import LoginPage from './pages/Login/LoginPage';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/boxers" element={<BoxerList />} />
          <Route path="/boxers/:id" element={<BoxerDetail />} />
          {/* <Route path="/boxers/:id/edit" element={<BoxerEdit />} /> */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<AdminDashboard />}>
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="add-boxer" element={<AddBoxerPage />} />
            <Route path="manage-boxer" element={<ManageBoxerPage />} />
            <Route path="add-contest" element={<AddContestPage />} />
            <Route path="boxers/:id/edit" element={<EditBoxerPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
