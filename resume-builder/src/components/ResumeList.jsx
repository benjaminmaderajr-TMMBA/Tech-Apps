import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, ExternalLink, Star } from 'lucide-react';

export default function ResumeList({ resumes, onDelete, loading }) {
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading resumes...</p>
      </div>
    );
  }

  if (!resumes || resumes.length === 0) {
    return (
      <div className="text-center" style={{ padding: '60px 20px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '12px', color: '#6b7280' }}>
          No resumes yet
        </h2>
        <p style={{ color: '#9ca3af', marginBottom: '24px' }}>
          Create your first resume to get started
        </p>
        <Link to="/create" className="btn btn-primary">
          Create New Resume
        </Link>
      </div>
    );
  }

  return (
    <div className="resume-list">
      {resumes.map((resume) => (
        <div key={resume._id} className="resume-card">
          <div className="resume-card-header">
            {resume.photo_url && (
              <img
                src={resume.photo_url}
                alt={resume.title}
                className="resume-photo"
                onError={(e) => e.target.style.display = 'none'}
              />
            )}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 className="resume-card-title">{resume.title || 'Untitled Resume'}</h3>
                {resume.is_primary && (
                  <Star size={16} fill="#fbbf24" color="#fbbf24" title="Primary Resume" />
                )}
              </div>
              {resume.headline && (
                <p className="resume-card-subtitle">{resume.headline}</p>
              )}
              {resume.target_role && (
                <p className="resume-card-subtitle">
                  {resume.target_role}
                  {resume.seniority_level && ` • ${resume.seniority_level}`}
                </p>
              )}
              {resume.ai_score && (
                <div style={{
                  marginTop: '8px',
                  display: 'inline-block',
                  background: resume.ai_score >= 80 ? '#d1fae5' :
                             resume.ai_score >= 60 ? '#fef3c7' : '#fecaca',
                  color: resume.ai_score >= 80 ? '#065f46' :
                         resume.ai_score >= 60 ? '#92400e' : '#991b1b',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 600
                }}>
                  AI Score: {resume.ai_score}%
                </div>
              )}
            </div>
          </div>

          <div className="resume-card-actions">
            <Link
              to={`/edit/${resume._id}`}
              className="btn btn-small btn-primary"
            >
              <Edit size={16} />
              Edit
            </Link>
            {resume.public_link_id && (
              <Link
                to={`/resume/${resume.public_link_id}`}
                target="_blank"
                className="btn btn-small btn-secondary"
              >
                <ExternalLink size={16} />
                View
              </Link>
            )}
            <button
              onClick={() => {
                if (window.confirm(`Delete "${resume.title}"?`)) {
                  onDelete(resume._id);
                }
              }}
              className="btn btn-small btn-danger"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
