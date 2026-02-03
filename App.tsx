
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MatchDetails from './pages/MatchDetails';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin-goallive-pro/login" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              {/* User Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/match/:id" element={<MatchDetails />} />
              
              {/* Hidden Admin Routes */}
              <Route path="/admin-goallive-pro/login" element={<AdminLogin />} />
              <Route 
                path="/admin-goallive-pro/dashboard" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
