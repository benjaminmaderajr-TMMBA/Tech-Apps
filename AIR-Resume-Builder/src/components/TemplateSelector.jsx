import React from 'react';

export default function TemplateSelector({ selectedTemplate, onSelect }) {
  const templates = [
    {
      id: 'professional',
      name: 'Professional',
      description: 'Classic and elegant design perfect for corporate roles',
      preview: '📄'
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and contemporary layout with visual appeal',
      preview: '✨'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Bold sidebar design for creative professionals',
      preview: '🎨'
    }
  ];

  return (
    <div className="template-selector">
      {templates.map((template) => (
        <div
          key={template.id}
          className={`template-option ${selectedTemplate === template.id ? 'selected' : ''}`}
          onClick={() => onSelect(template.id)}
        >
          <div className="template-preview">
            <div style={{ fontSize: '48px' }}>{template.preview}</div>
          </div>
          <div className="template-name">{template.name}</div>
          <p style={{
            fontSize: '13px',
            color: '#6b7280',
            marginTop: '8px'
          }}>
            {template.description}
          </p>
        </div>
      ))}
    </div>
  );
}
