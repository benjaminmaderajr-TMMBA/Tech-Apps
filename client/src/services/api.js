import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/password', data),
  deleteAccount: () => api.delete('/auth/account')
};

// Resume API
export const resumeAPI = {
  getAll: () => api.get('/resumes'),
  getById: (id) => api.get(`/resumes/${id}`),
  getBySlug: (slug) => api.get(`/resumes/public/${slug}`),
  create: (data) => api.post('/resumes', data),
  update: (id, data) => api.put(`/resumes/${id}`, data),
  delete: (id) => api.delete(`/resumes/${id}`),
  duplicate: (id) => api.post(`/resumes/${id}/duplicate`)
};

// AI API
export const aiAPI = {
  generateSummary: (resumeId, targetJobTitle) =>
    api.post(`/resumes/${resumeId}/ai/summary`, { targetJobTitle }),

  optimizeBulletPoints: (bulletPoints, jobTitle) =>
    api.post('/resumes/ai/optimize-bullets', { bulletPoints, jobTitle }),

  generateAchievements: (jobTitle, company, responsibilities) =>
    api.post('/resumes/ai/generate-achievements', { jobTitle, company, responsibilities }),

  analyzeATSScore: (resumeId) =>
    api.post(`/resumes/${resumeId}/ai/ats-score`),

  suggestSkills: (jobTitle, industry, currentSkills = []) =>
    api.post('/resumes/ai/suggest-skills', { jobTitle, industry, currentSkills }),

  generateCoverLetter: (resumeId, jobDescription, companyName) =>
    api.post(`/resumes/${resumeId}/ai/cover-letter`, { jobDescription, companyName })
};

export default api;
