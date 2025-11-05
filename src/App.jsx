import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from './components/NavBar';
import AuthForm from './components/AuthForm';
import ShortenForm from './components/ShortenForm';
import UrlList from './components/UrlList';
import { BASE_URL } from './config/api';

const App = () => {
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '', mobile: '' });
  
  const [urlForm, setUrlForm] = useState({ longUrl: '', customAlias: '', expiryDate: '' });
  
  const [shortenedUrl, setShortenedUrl] = useState(null);
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
      fetchUserUrls(token);
    }
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = authMode === 'login' ? '/auth/login' : '/auth/register';
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authForm)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      if (authMode === 'login') {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        toast.success('Login successful!');
        fetchUserUrls(data.token);
      } else {
        toast.success('Registration successful! Please login.');
        setAuthMode('login');
      }

      setAuthForm({ name: '', email: '', password: '', mobile: '' });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleShortenUrl = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShortenedUrl(null);

    try {
      const token = localStorage.getItem('token');
      const payload = {
        longUrl: urlForm.longUrl,
        ...(urlForm.customAlias && { customAlias: urlForm.customAlias }),
        ...(urlForm.expiryDate && { expiry: new Date(urlForm.expiryDate).toISOString() })
      };

      const response = await fetch(`${BASE_URL}/url/shorten`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to shorten URL');
      }

      console.log('Shortened URL response:', data);
      setShortenedUrl(data.data);
      setUrlForm({ longUrl: '', customAlias: '', expiryDate: '' });
      toast.success('URL shortened successfully!');
      fetchUserUrls(token);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserUrls = async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/url`, { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await response.json();
      if (response.ok) {
        setUrls(data.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch URLs:', err);
    }
  };

  const deleteUrl = async (shortId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/url/${shortId}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });

      if (response.ok) {
        toast.success('URL deleted successfully!');
        fetchUserUrls(token);
      } else {
        toast.error('Failed to delete URL');
      }
    } catch (err) {
      toast.error('Failed to delete URL');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!', { autoClose: 2000 });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setUrls([]);
    setShortenedUrl(null);
    toast.info('Logged out successfully');
  };

  const isUrlExpired = (expiryDate) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  if (!user) {
    return (
      <div>
        <ToastContainer position="top-right" autoClose={3000} />
        <AuthForm
          authMode={authMode}
          setAuthMode={setAuthMode}
          authForm={authForm}
          setAuthForm={setAuthForm}
          handleAuth={handleAuth}
          loading={loading}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <ToastContainer position="top-right" autoClose={3000} />
      <NavBar user={user} onLogout={handleLogout} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ShortenForm
          urlForm={urlForm}
          setUrlForm={setUrlForm}
          handleShortenUrl={handleShortenUrl}
          loading={loading}
          shortenedUrl={shortenedUrl}
        />

        <UrlList urls={urls} copyToClipboard={(text) => copyToClipboard(`${BASE_URL}/redirect/${text}`)} deleteUrl={deleteUrl} isUrlExpired={isUrlExpired} />
      </div>
    </div>
  );
};

export default App;