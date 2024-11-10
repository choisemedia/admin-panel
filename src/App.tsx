import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import BotManagement from './pages/BotManagement';
import ShopProfile from './pages/ShopProfile';
import { Menu } from 'lucide-react';

function App() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Public shop profile route */}
          <Route path="/shop/:username" element={<ShopProfile />} />
          
          {/* Admin routes */}
          <Route
            path="/*"
            element={
              <div className="flex min-h-screen bg-gray-50">
                <button
                  className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <Menu className="w-6 h-6" />
                </button>

                <div
                  className={`fixed inset-0 z-40 lg:static lg:z-auto transition-transform duration-300 ease-in-out transform 
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                    lg:translate-x-0`}
                >
                  <Sidebar onClose={() => setSidebarOpen(false)} />
                </div>

                {sidebarOpen && (
                  <div
                    className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                  />
                )}

                <div className="flex-1 min-w-0 overflow-hidden">
                  <main className="flex-1 relative z-0 overflow-y-auto pt-16 pb-6 px-4 sm:px-6 lg:px-8 focus:outline-none">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/orders" element={<Orders />} />
                      <Route path="/customers" element={<Customers />} />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route path="/settings/*" element={<Settings />} />
                      <Route path="/bots" element={<BotManagement />} />
                    </Routes>
                  </main>
                </div>
              </div>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;