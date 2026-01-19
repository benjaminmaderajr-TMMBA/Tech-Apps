import React, { useState, useEffect } from 'react';

export default function ResumeForm({ resume, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    headline: '',
    summary: '',
    target_role: '',
    target_industry: '',
    seniority_level: '',
    photo_url: '',
    banner_url: '',
    contact_email: '',
    contact_phone: '',
    location: '',
    linkedin_url: '',
    website_url: '',
    template: 'professional',
    is_primary: false,
    ...resume
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (resume) {
      setFormData({ ...formData, ...resume });
    }
  }, [resume]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      await onSave(formData);
    } catch (err) {
      setError(err.message || 'Failed to save resume');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="editor-form">
      <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: 'bold' }}>
        {resume?._id ? 'Edit Resume' : 'Create New Resume'}
      </h2>

      {error && (
        <div className="error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Basic Information */}
      <div className="form-group">
        <label className="form-label">Full Name *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="form-input"
          required
          placeholder="e.g., John Doe"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Professional Headline</label>
        <input
          type="text"
          name="headline"
          value={formData.headline}
          onChange={handleChange}
          className="form-input"
          placeholder="e.g., Senior Software Engineer | Full-Stack Developer"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Professional Summary</label>
        <textarea
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          className="form-textarea"
          rows="5"
          placeholder="Write a brief summary of your professional background, skills, and career goals..."
        />
      </div>

      {/* Career Focus */}
      <h3 style={{ fontSize: '18px', fontWeight: 600, marginTop: '32px', marginBottom: '16px' }}>
        Career Focus
      </h3>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Target Role</label>
          <input
            type="text"
            name="target_role"
            value={formData.target_role}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g., Senior Developer"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Target Industry</label>
          <input
            type="text"
            name="target_industry"
            value={formData.target_industry}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g., Technology, Finance"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Seniority Level</label>
        <select
          name="seniority_level"
          value={formData.seniority_level}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Select level</option>
          <option value="Entry Level">Entry Level</option>
          <option value="Mid Level">Mid Level</option>
          <option value="Senior">Senior</option>
          <option value="Lead">Lead</option>
          <option value="Principal">Principal</option>
          <option value="Director">Director</option>
          <option value="VP">VP</option>
          <option value="C-Level">C-Level</option>
        </select>
      </div>

      {/* Contact Information */}
      <h3 style={{ fontSize: '18px', fontWeight: 600, marginTop: '32px', marginBottom: '16px' }}>
        Contact Information
      </h3>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="contact_email"
            value={formData.contact_email}
            onChange={handleChange}
            className="form-input"
            placeholder="email@example.com"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Phone</label>
          <input
            type="tel"
            name="contact_phone"
            value={formData.contact_phone}
            onChange={handleChange}
            className="form-input"
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="form-input"
          placeholder="City, State, Country"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">LinkedIn URL</label>
          <input
            type="url"
            name="linkedin_url"
            value={formData.linkedin_url}
            onChange={handleChange}
            className="form-input"
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Website URL</label>
          <input
            type="url"
            name="website_url"
            value={formData.website_url}
            onChange={handleChange}
            className="form-input"
            placeholder="https://yourwebsite.com"
          />
        </div>
      </div>

      {/* Media */}
      <h3 style={{ fontSize: '18px', fontWeight: 600, marginTop: '32px', marginBottom: '16px' }}>
        Profile Images
      </h3>

      <div className="form-group">
        <label className="form-label">Photo URL</label>
        <input
          type="url"
          name="photo_url"
          value={formData.photo_url}
          onChange={handleChange}
          className="form-input"
          placeholder="https://example.com/photo.jpg"
        />
        {formData.photo_url && (
          <img
            src={formData.photo_url}
            alt="Preview"
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              objectFit: 'cover',
              marginTop: '8px'
            }}
            onError={(e) => e.target.style.display = 'none'}
          />
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Banner URL</label>
        <input
          type="url"
          name="banner_url"
          value={formData.banner_url}
          onChange={handleChange}
          className="form-input"
          placeholder="https://example.com/banner.jpg"
        />
        {formData.banner_url && (
          <img
            src={formData.banner_url}
            alt="Banner Preview"
            style={{
              width: '100%',
              height: '120px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginTop: '8px'
            }}
            onError={(e) => e.target.style.display = 'none'}
          />
        )}
      </div>

      {/* Template Selection */}
      <h3 style={{ fontSize: '18px', fontWeight: 600, marginTop: '32px', marginBottom: '16px' }}>
        Resume Template
      </h3>

      <div className="form-group">
        <label className="form-label">Select Template</label>
        <select
          name="template"
          value={formData.template}
          onChange={handleChange}
          className="form-select"
        >
          <option value="professional">Professional</option>
          <option value="modern">Modern</option>
          <option value="creative">Creative</option>
        </select>
      </div>

      <div className="form-group">
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            name="is_primary"
            checked={formData.is_primary}
            onChange={handleChange}
            style={{ width: 'auto' }}
          />
          <span>Set as primary resume</span>
        </label>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={saving}
        >
          {saving ? 'Saving...' : (resume?._id ? 'Update Resume' : 'Create Resume')}
        </button>
        {onCancel && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={saving}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
