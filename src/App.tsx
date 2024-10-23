import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/layout/Header';
import { Login } from './pages/Login';
import { Upload } from './pages/Upload';
import { AuthGuard } from './components/auth/AuthGuard';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/"
                  element={
                    <div className="text-center py-20">
                      <h1 className="text-4xl font-bold text-gray-900">
                        Welcome to Earworm
                      </h1>
                      <p className="mt-4 text-xl text-gray-600">
                        Your platform for music collaboration
                      </p>
                    </div>
                  }
                />
                <Route
                  path="/upload"
                  element={
                    <AuthGuard>
                      <Upload />
                    </AuthGuard>
                  }
                />
                <Route
                  path="/profile/:username"
                  element={
                    <AuthGuard>
                      <div>Profile Page (Protected)</div>
                    </AuthGuard>
                  }
                />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
