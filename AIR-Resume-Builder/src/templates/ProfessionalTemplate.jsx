import React from 'react';

export default function ProfessionalTemplate({ resume }) {
  if (!resume) return null;

  return (
    <div className="resume-preview professional-template" id="resume-content">
      <div className="resume-header">
        {resume.photo_url && (
          <img
            src={resume.photo_url}
            alt={resume.title || 'Profile'}
            className="resume-photo"
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              objectFit: 'cover',
              margin: '0 auto 20px'
            }}
          />
        )}
        {resume.banner_url && (
          <div
            style={{
              width: '100%',
              height: '150px',
              backgroundImage: `url(${resume.banner_url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '8px',
              marginBottom: '20px'
            }}
          />
        )}
        <h1 className="resume-name">{resume.title || 'Your Name'}</h1>
        {resume.headline && <p className="resume-headline">{resume.headline}</p>}
        {resume.target_role && (
          <p style={{ fontSize: '16px', color: '#2563eb', fontWeight: 500 }}>
            {resume.target_role}
            {resume.target_industry && ` • ${resume.target_industry}`}
            {resume.seniority_level && ` • ${resume.seniority_level}`}
          </p>
        )}
        <div className="resume-contact">
          {resume.contact_email && (
            <span>📧 {resume.contact_email}</span>
          )}
          {resume.contact_phone && (
            <span>📱 {resume.contact_phone}</span>
          )}
          {resume.location && (
            <span>📍 {resume.location}</span>
          )}
          {resume.linkedin_url && (
            <a href={resume.linkedin_url} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          )}
          {resume.website_url && (
            <a href={resume.website_url} target="_blank" rel="noopener noreferrer">
              Website
            </a>
          )}
        </div>
      </div>

      {resume.summary && (
        <div className="resume-section">
          <h2 className="resume-section-title">Professional Summary</h2>
          <div className="resume-section-content">
            <p>{resume.summary}</p>
          </div>
        </div>
      )}

      {resume.ai_score && (
        <div className="resume-section">
          <h2 className="resume-section-title">AI Resume Score</h2>
          <div className="resume-section-content">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '12px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: `conic-gradient(#10b981 ${resume.ai_score * 3.6}deg, #e5e7eb 0deg)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#10b981'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {resume.ai_score}%
                </div>
              </div>
              {resume.ai_feedback && (
                <p style={{ flex: 1, fontSize: '14px', color: '#6b7280' }}>
                  {resume.ai_feedback}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .professional-template {
          font-family: 'Georgia', serif;
        }

        .professional-template .resume-section-title {
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 18px;
        }
      `}</style>
    </div>
  );
}
