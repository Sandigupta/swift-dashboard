import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './features/dashboard/pages/DashboardPage';
import Profile from './features/profile/pages/ProfilePage';
import { Header } from './common/components/layout/Header';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#f8f9fa] font-sans antialiased text-gray-900 flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
