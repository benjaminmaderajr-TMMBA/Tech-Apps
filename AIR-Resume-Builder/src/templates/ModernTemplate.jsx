import React from 'react';

export default function ModernTemplate({ resume }) {
  if (!resume) return null;

  return (
    <div className="resume-preview modern-template" id="resume-content">
      {resume.banner_url && (
        <div
          style={{
            width: 'calc(100% + 80px)',
            height: '200px',
            backgroundImage: `url(${resume.banner_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            margin: '-40px -40px 30px',
            position: 'relative'
          }}
        >
          {resume.photo_url && (
            <img
              src={resume.photo_url}
              alt={resume.title || 'Profile'}
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '12px',
                objectFit: 'cover',
                position: 'absolute',
                bottom: '-60px',
                left: '40px',
                border: '4px solid white',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            />
          )}
        </div>
      )}

      <div style={{ marginTop: resume.banner_url ? '70px' : '0' }}>
        <h1 className="resume-name" style={{ fontSize: '36px', marginBottom: '8px' }}>
          {resume.title || 'Your Name'}
        </h1>
        {resume.headline && (
          <p style={{ fontSize: '20px', color: '#2563eb', fontWeight: 600, marginBottom: '12px' }}>
            {resume.headline}
          </p>
        )}
        {resume.target_role && (
          <div style={{
            display: 'inline-flex',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '20px'
          }}>
            <span style={{
              background: '#dbeafe',
              color: '#1e40af',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: 500
            }}>
              {resume.target_role}
            </span>
            {resume.target_industry && (
              <span style={{
                background: '#d1fae5',
                color: '#065f46',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 500
              }}>
                {resume.target_industry}
              </span>
            )}
            {resume.seniority_level && (
              <span style={{
                background: '#fef3c7',
                color: '#92400e',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 500
              }}>
                {resume.seniority_level}
              </span>
            )}
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
          padding: '20px',
          background: '#f9fafb',
          borderRadius: '12px',
          marginBottom: '30px'
        }}>
          {resume.contact_email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px' }}>📧</span>
              <span style={{ fontSize: '14px' }}>{resume.contact_email}</span>
            </div>
          )}
          {resume.contact_phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px' }}>📱</span>
              <span style={{ fontSize: '14px' }}>{resume.contact_phone}</span>
            </div>
          )}
          {resume.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px' }}>📍</span>
              <span style={{ fontSize: '14px' }}>{resume.location}</span>
            </div>
          )}
          {resume.linkedin_url && (
            <a
              href={resume.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#2563eb',
                textDecoration: 'none'
              }}
            >
              <span style={{ fontSize: '18px' }}>💼</span>
              <span style={{ fontSize: '14px' }}>LinkedIn</span>
            </a>
          )}
          {resume.website_url && (
            <a
              href={resume.website_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#2563eb',
                textDecoration: 'none'
              }}
            >
              <span style={{ fontSize: '18px' }}>🌐</span>
              <span style={{ fontSize: '14px' }}>Website</span>
            </a>
          )}
        </div>
      </div>

      {resume.summary && (
        <div className="resume-section">
          <h2 className="resume-section-title" style={{ fontSize: '24px', marginBottom: '16px' }}>
            About Me
          </h2>
          <div className="resume-section-content">
            <p style={{ fontSize: '16px', lineHeight: '1.8' }}>{resume.summary}</p>
          </div>
        </div>
      )}

      {resume.ai_score && (
        <div className="resume-section">
          <h2 className="resume-section-title" style={{ fontSize: '24px', marginBottom: '16px' }}>
            Resume Analytics
          </h2>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '24px',
            borderRadius: '12px',
            color: 'white'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                fontWeight: 'bold'
              }}>
                {resume.ai_score}%
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
                  AI Resume Score
                </p>
                {resume.ai_feedback && (
                  <p style={{ fontSize: '14px', opacity: 0.9 }}>{resume.ai_feedback}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
