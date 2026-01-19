import React from 'react';

export default function CreativeTemplate({ resume }) {
  if (!resume) return null;

  return (
    <div className="resume-preview creative-template" id="resume-content">
      <div style={{
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: '40px',
        minHeight: '100%'
      }}>
        {/* Left Sidebar */}
        <div style={{
          background: 'linear-gradient(180deg, #1e3a8a 0%, #1e40af 100%)',
          color: 'white',
          padding: '40px 30px',
          margin: '-40px 0 -40px -40px',
          borderRadius: '0 20px 20px 0'
        }}>
          {resume.photo_url && (
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <img
                src={resume.photo_url}
                alt={resume.title || 'Profile'}
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '5px solid rgba(255, 255, 255, 0.3)',
                  marginBottom: '20px'
                }}
              />
              <h1 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '8px',
                color: 'white'
              }}>
                {resume.title || 'Your Name'}
              </h1>
              {resume.headline && (
                <p style={{
                  fontSize: '14px',
                  opacity: 0.9,
                  marginBottom: '8px'
                }}>
                  {resume.headline}
                </p>
              )}
            </div>
          )}

          <div style={{ marginBottom: '30px' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 'bold',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
              paddingBottom: '8px'
            }}>
              Contact
            </h3>
            {resume.contact_email && (
              <div style={{ marginBottom: '12px', fontSize: '13px', display: 'flex', gap: '8px' }}>
                <span>📧</span>
                <span style={{ wordBreak: 'break-word' }}>{resume.contact_email}</span>
              </div>
            )}
            {resume.contact_phone && (
              <div style={{ marginBottom: '12px', fontSize: '13px', display: 'flex', gap: '8px' }}>
                <span>📱</span>
                <span>{resume.contact_phone}</span>
              </div>
            )}
            {resume.location && (
              <div style={{ marginBottom: '12px', fontSize: '13px', display: 'flex', gap: '8px' }}>
                <span>📍</span>
                <span>{resume.location}</span>
              </div>
            )}
            {resume.linkedin_url && (
              <div style={{ marginBottom: '12px', fontSize: '13px' }}>
                <a
                  href={resume.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'white', textDecoration: 'underline' }}
                >
                  💼 LinkedIn Profile
                </a>
              </div>
            )}
            {resume.website_url && (
              <div style={{ marginBottom: '12px', fontSize: '13px' }}>
                <a
                  href={resume.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'white', textDecoration: 'underline' }}
                >
                  🌐 Personal Website
                </a>
              </div>
            )}
          </div>

          {(resume.target_role || resume.target_industry || resume.seniority_level) && (
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
                paddingBottom: '8px'
              }}>
                Career Focus
              </h3>
              {resume.target_role && (
                <div style={{ marginBottom: '12px' }}>
                  <p style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px' }}>Target Role</p>
                  <p style={{ fontSize: '14px', fontWeight: 500 }}>{resume.target_role}</p>
                </div>
              )}
              {resume.target_industry && (
                <div style={{ marginBottom: '12px' }}>
                  <p style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px' }}>Industry</p>
                  <p style={{ fontSize: '14px', fontWeight: 500 }}>{resume.target_industry}</p>
                </div>
              )}
              {resume.seniority_level && (
                <div style={{ marginBottom: '12px' }}>
                  <p style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px' }}>Level</p>
                  <p style={{ fontSize: '14px', fontWeight: 500 }}>{resume.seniority_level}</p>
                </div>
              )}
            </div>
          )}

          {resume.ai_score && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.15)',
              padding: '20px',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '12px', marginBottom: '8px', opacity: 0.9 }}>AI Resume Score</p>
              <div style={{
                fontSize: '36px',
                fontWeight: 'bold',
                marginBottom: '8px'
              }}>
                {resume.ai_score}%
              </div>
              {resume.ai_feedback && (
                <p style={{ fontSize: '11px', opacity: 0.8, lineHeight: '1.5' }}>
                  {resume.ai_feedback}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Right Content */}
        <div style={{ paddingTop: '20px' }}>
          {!resume.photo_url && (
            <>
              <h1 style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '12px', color: '#1e3a8a' }}>
                {resume.title || 'Your Name'}
              </h1>
              {resume.headline && (
                <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '30px' }}>
                  {resume.headline}
                </p>
              )}
            </>
          )}

          {resume.banner_url && (
            <div
              style={{
                width: '100%',
                height: '200px',
                backgroundImage: `url(${resume.banner_url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '12px',
                marginBottom: '30px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            />
          )}

          {resume.summary && (
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1e3a8a',
                marginBottom: '16px',
                position: 'relative',
                paddingLeft: '20px'
              }}>
                <span style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '8px',
                  height: '24px',
                  background: 'linear-gradient(180deg, #1e3a8a 0%, #1e40af 100%)',
                  borderRadius: '4px'
                }} />
                Professional Summary
              </h2>
              <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#374151' }}>
                {resume.summary}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
