import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './theme/ThemeProvider';
import { AppProvider } from './context/AppContext';
import { Suspense, lazy, useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Preloader from './component/Preloader';

// Lazy load route components
const Home = lazy(() => import('./page/Home'));
const PostBlog = lazy(() => import('./page/PostBlog'));
const Contact = lazy(() => import('./page/Contact'));
const About = lazy(() => import('./page/About'));
const BlogDetails = lazy(() => import('./page/BlogDetails'));
const Admin = lazy(() => import('./page/Admin'));
const AdminBlogDetails = lazy(() => import('./page/AdminBlogDetails'));
const Login = lazy(() => import('./page/Login'));

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AppProvider>
      <ThemeProvider>
        {loading && <Preloader />}
        <Navbar />
        <div className='app-container'>
          <div className="app-section">
            <Suspense fallback={<Preloader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<PostBlog />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog-details/:id" element={<BlogDetails />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/blog-details/:id" element={<AdminBlogDetails />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </Suspense>
          </div>
        </div>
        <Footer />
        <Toaster position="bottom-right" richColors />
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;

