import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import ResumeList from '../components/ResumeList';
import { fetchResumes, deleteResume } from '../api/base44';

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchResumes();
      // Handle both array response and object with data array
      const resumeList = Array.isArray(data) ? data : (data.data || []);
      setResumes(resumeList);
    } catch (err) {
      console.error('Error loading resumes:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteResume(id);
      setResumes(resumes.filter(r => r._id !== id));
    } catch (err) {
      console.error('Error deleting resume:', err);
      alert('Failed to delete resume: ' + err.message);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px'
        }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
              My Resumes
            </h1>
            <p style={{ color: '#6b7280' }}>
              Manage and create your professional resumes
            </p>
          </div>
          <Link to="/create" className="btn btn-primary">
            <Plus size={20} />
            Create New Resume
          </Link>
        </div>

        {error && (
          <div className="error">
            <strong>Error loading resumes:</strong> {error}
          </div>
        )}

        <ResumeList
          resumes={resumes}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>
    </div>
  );
}
