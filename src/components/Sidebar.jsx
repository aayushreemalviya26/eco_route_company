import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: '📊', label: 'Dashboard' },
    // Add Plan Route here so it's part of the main navigation list
    { path: '/plan-route', icon: '📍', label: 'Plan Route' }, 
    { path: '/fleet', icon: '🚛', label: 'Fleet Management' },
    { path: '/drivers', icon: '👥', label: 'Drivers' },
    { path: '/deliveries', icon: '📦', label: 'Deliveries' },
    { path: '/esg-reports', icon: '🌍', label: 'ESG Reports' },
    { path: '/analytics', icon: '📈', label: 'Analytics' },
    { path: '/settings', icon: '⚙️', label: 'Settings' },
  ];

  return (
    <aside className="sidebar-nav">
      <div className="company-header">
        <div className="company-logo">🌿 Eco-Route</div>
        <div className="company-name">Sustainable Transport Solutions</div>
      </div>

      <nav className="nav-menu">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;