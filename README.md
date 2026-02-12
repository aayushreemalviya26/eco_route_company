#  Eco-Route - Sustainable Transport Solutions

A React + Vite web application for eco-friendly fleet management and route optimization.

## 🚀 Features

- **Dashboard** - Live fleet tracking and real-time metrics
- **Fleet Management** - Vehicle monitoring with eco-scores and maintenance tracking
- **Drivers** - Driver profiles, leaderboards, and performance metrics
- **Deliveries** - Delivery tracking and route assignments
- **ESG Reports** - Audit-ready sustainability reports with compliance certifications
- **Analytics** - Advanced insights with payload simulation and traffic analysis
- **Settings** - System configuration, integrations, and team management

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

## 📦 Project Structure

```
eco-route-app/
├── src/
│   ├── components/          # Shared components
│   │   ├── Layout.jsx       # Main layout wrapper
│   │   ├── Sidebar.jsx      # Navigation sidebar
│   │   └── *.css           # Component styles
│   ├── pages/              # Page components
│   │   ├── Dashboard.jsx   # Main dashboard
│   │   ├── FleetManagement.jsx
│   │   ├── Drivers.jsx
│   │   ├── Deliveries.jsx
│   │   ├── ESGReports.jsx
│   │   ├── Analytics.jsx
│   │   ├── Settings.jsx
│   │   └── *.css          # Page styles
│   ├── styles/            # Global styles
│   │   └── index.css      # Base CSS
│   ├── App.jsx           # Main app component with routing
│   └── main.jsx          # Application entry point
├── public/               # Static assets
├── index.html           # HTML template
├── package.json        # Dependencies
├── vite.config.js     # Vite configuration
└── README.md         # This file
```

## 🎨 Design System

### Color Palette
- **Primary Green**: `#00c853` to `#00e676`
- **Dark Sidebar**: `#1a1a1a`
- **Background**: `#f5f5f5`
- **White Cards**: `#ffffff`
- **Success Green**: `#e8f5e9`
- **Info Blue**: `#e3f2fd`
- **Warning Orange**: `#fff3e0`
- **Error Red**: `#ffebee`

### Typography
- **Font Family**: System fonts (SF Pro, Roboto, Segoe UI)
- **Headings**: 700 weight
- **Body**: 500 weight
- **Small Text**: 600 weight

## 🧩 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🔧 Key Technologies

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **CSS Modules** - Component styling

## 📱 Routes

- `/` - Dashboard
- `/fleet` - Fleet Management
- `/drivers` - Drivers
- `/deliveries` - Deliveries
- `/esg-reports` - ESG Reports & Compliance
- `/analytics` - Analytics & Insights
- `/settings` - Settings

## 🎯 Hackathon Features Highlighted

### Core "Green" Navigation
✅ A/B Route Comparison (Grey vs Neon Green paths)
✅ Dynamic Elevation Penalty visualization
✅ Live Traffic Rerouting with CO₂ calculations

### Commercial B2B Features
✅ Vehicle Profile Selector (Heavy Diesel, Light Van, EV)
✅ Payload Input with carbon penalty calculations
✅ Comprehensive fleet metrics and monitoring

### Sustainability Dashboard
✅ Carbon Ledger (CO₂ saved, fuel cost, tree equivalents)
✅ Audit-Ready ESG Reports (GRI, CDP, SASB compliant)
✅ Downloadable reports in multiple formats

## 🚧 Expanding the Project

To add more functionality:

1. **Add API Integration:**
   ```javascript
   // src/services/api.js
   export const fetchFleetData = async () => {
     const response = await fetch('/api/fleet')
     return response.json()
   }
   ```

2. **Add State Management:**
   ```bash
   npm install zustand
   # or
   npm install @reduxjs/toolkit react-redux
   ```

3. **Add UI Components:**
   ```bash
   npm install @radix-ui/react-primitives
   # or
   npm install @mui/material @emotion/react @emotion/styled
   ```

## 📸 Screenshots

### Dashboard
Live fleet map with real-time vehicle tracking and eco-route monitoring.

### Fleet Management
Comprehensive vehicle cards with eco-scores, fuel efficiency, and maintenance alerts.

### ESG Reports
Audit-ready sustainability reports with compliance certifications.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is created for hackathon purposes.

## 🎉 Credits

Built with ❤️ for sustainable transportation
