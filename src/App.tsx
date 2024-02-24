import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Sites/Dashboard/Dashboard';
import Login from './components/Login/Login';
import NavBar from './components/NavBar/NavBar';
import Gateway from './components/Sites/Gateway/Gateway';
import Endpoints from './components/Sites/Endpoints/Endpoints';
import Logs from './components/Sites/Logs/Logs';
import Footer from './components/Footer/Footer';

function AppContent() {

  const token = localStorage.getItem('token');
  if (!token) {
    return <Login />;
  }


  return (
    <>
      <div className="wrapper">
        <div className="sidebar">
          <NavBar />
        </div>
        <div className="content-wrapper">
          <Routes>
            <Route path="/web/dashboard" element={<Dashboard />} />
            <Route path="/web/gateway" element={<Gateway />} />
            <Route path="/web/dashboard" element={<Dashboard />} />
            <Route path="/web/endpoints" element={<Endpoints />} />
            <Route path="/web/logs" element={<Logs />} />

            <Route path="*" element={<Navigate to="/web/dashboard" replace />} />

          </Routes>
        </div>
        <Footer />
      </div>

    </>
  );
}

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
}

export default App;
