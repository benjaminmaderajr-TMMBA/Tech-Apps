import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { resumeAPI } from '../services/api';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash, FaCopy, FaEye, FaFileAlt, FaSpinner } from 'react-icons/fa';
import { format } from 'date-fns';

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await resumeAPI.getAll();
      setResumes(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch resumes');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await resumeAPI.delete(id);
        toast.success('Resume deleted successfully');
        fetchResumes();
      } catch (error) {
        toast.error('Failed to delete resume');
        console.error(error);
      }
    }
  };

  const handleDuplicate = async (id) => {
    try {
      const response = await resumeAPI.duplicate(id);
      toast.success('Resume duplicated successfully');
      fetchResumes();
    } catch (error) {
      toast.error('Failed to duplicate resume');
      console.error(error);
    }
  };

  const handleCreateNew = () => {
    navigate('/resumes/new');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <FaSpinner className="animate-spin text-4xl text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link to="/dashboard" className="text-2xl font-bold text-indigo-600">
              AI Resume Builder
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Welcome, {user?.firstName}!
              </span>
              <Link
                to="/profile"
                className="text-gray-700 hover:text-indigo-600 transition"
              >
                Profile
              </Link>
              <button
                onClick={logout}
                className="text-gray-700 hover:text-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Resumes</h1>
            <p className="text-gray-600 mt-2">
              Manage your resumes and create new ones with AI assistance
            </p>
          </div>
          <button
            onClick={handleCreateNew}
            className="flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition shadow-md hover:shadow-lg font-medium"
          >
            <FaPlus className="mr-2" />
            Create New Resume
          </button>
        </div>

        {resumes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FaFileAlt className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No resumes yet
            </h3>
            <p className="text-gray-600 mb-6">
              Get started by creating your first AI-powered resume
            </p>
            <button
              onClick={handleCreateNew}
              className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-medium"
            >
              <FaPlus className="mr-2" />
              Create Your First Resume
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div
                key={resume._id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1 truncate">
                        {resume.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Updated {format(new Date(resume.updatedAt), 'MMM dd, yyyy')}
                      </p>
                    </div>
                    {resume.isDefault && (
                      <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-medium">
                        Default
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <span className="capitalize">{resume.template || 'modern'} template</span>
                    {resume.isPublic && (
                      <>
                        <span>•</span>
                        <span className="flex items-center">
                          <FaEye className="mr-1" />
                          {resume.views} views
                        </span>
                      </>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/resumes/${resume._id}/edit`}
                      className="flex-1 flex items-center justify-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm font-medium"
                    >
                      <FaEdit className="mr-2" />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDuplicate(resume._id)}
                      className="flex items-center justify-center bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition text-sm"
                      title="Duplicate"
                    >
                      <FaCopy />
                    </button>
                    <button
                      onClick={() => handleDelete(resume._id, resume.title)}
                      className="flex items-center justify-center bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition text-sm"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  {resume.isPublic && resume.slug && (
                    <div className="mt-4 pt-4 border-t">
                      <Link
                        to={`/r/${resume.slug}`}
                        className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center"
                        target="_blank"
                      >
                        <FaEye className="mr-2" />
                        View Public Page
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
