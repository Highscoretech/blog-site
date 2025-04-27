import axios from 'axios';
import { toast } from 'sonner';
import Cookies from 'js-cookie';

const apiClient = axios.create({
  baseURL: import.meta.env.DEV ? 'http://localhost:5000' : 'https://blogsitebackend-jsvo.onrender.com',
  timeout: 60000, // Increase timeout to 60 seconds for larger uploads
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for 401 errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear invalid token and redirect to login
      Cookies.remove('token');
      Cookies.remove('isAdmin');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const api = {
  // Auth
  login: async (credentials) => {
    try {
      const response = await apiClient.post('/api/auth/login', credentials);
      // Store token and isAdmin status in cookies
      Cookies.set('token', response.data.token, { expires: 7 }); // Expires in 7 days
      Cookies.set('isAdmin', response.data.isAdmin, { expires: 7 });
      toast.success('Login successful');
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    }
  },

  // Blogs
  getBlogs: async (params = {}) => {
    try {
      const response = await apiClient.get('/api/blogs', { params });
      return response;
    } catch (error) {
      throw error;
    }
  },

  getBlogById: async (id) => {
    try {
      const response = await apiClient.get(`/api/blogs/${id}`);
      return response;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Blog not found');
      }
      throw error;
    }
  },

  incrementBlogViews: async (id) => {
    try {
      const response = await apiClient.post(`/api/blogs/${id}/views`);
      return response;
    } catch (error) {
      console.error('Error incrementing views:', error);
      // Silently fail for view increments as it's not critical
      return null;
    }
  },

  createBlog: async (blogData) => {
    try {
      const response = await apiClient.post('/api/blogs', blogData);
      return response;
    } catch (error) {
      if (error.response?.status === 413) {
        throw new Error('Image size too large. Please use smaller images or fewer images.');
      }
      throw error;
    }
  },

  updateBlogStatus: async (blogId, statusData) => {
    try {
      const response = await apiClient.patch(`/api/blogs/${blogId}/status`, statusData);
      return response;
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Authentication required');
      } else if (error.response?.status === 403) {
        toast.error('Admin access required');
      } else {
        toast.error(error.response?.data?.message || 'Error updating blog status');
      }
      throw error;
    }
  },

  searchBlogs: async (searchTerm) => {
    try {
      if (!searchTerm?.trim()) {
        return { data: { blogs: [] } };
      }
      
      const response = await apiClient.get('/api/blogs/search', {
        params: { q: searchTerm.trim() }
      });
      return response;
    } catch (error) {
      console.error('Error searching blogs:', error);
      throw error;
    }
  },
};

export { apiClient };















