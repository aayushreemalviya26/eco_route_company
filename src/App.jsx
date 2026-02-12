import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import FleetManagement from './pages/FleetManagement';
import Drivers from './pages/Drivers';
import Deliveries from './pages/Deliveries';
import ESGReports from './pages/ESGReports';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import PlanRoute from './pages/PlanRoute'; 

function App() {
  return (
    <Router 
      future={{ 
        v7_startTransition: true, 
        v7_relativeSplatPath: true 
      }}
    >
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/plan-route" element={<PlanRoute />} />
          <Route path="/fleet" element={<FleetManagement />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/deliveries" element={<Deliveries />} />
          <Route path="/esg-reports" element={<ESGReports />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;