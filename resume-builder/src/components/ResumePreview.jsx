import React from 'react';
import ProfessionalTemplate from '../templates/ProfessionalTemplate';
import ModernTemplate from '../templates/ModernTemplate';
import CreativeTemplate from '../templates/CreativeTemplate';

export default function ResumePreview({ resume }) {
  if (!resume) {
    return (
      <div className="editor-preview">
        <div className="text-center" style={{ padding: '60px 20px', color: '#9ca3af' }}>
          <p>Fill out the form to see your resume preview</p>
        </div>
      </div>
    );
  }

  const templates = {
    professional: ProfessionalTemplate,
    modern: ModernTemplate,
    creative: CreativeTemplate
  };

  const TemplateComponent = templates[resume.template] || ProfessionalTemplate;

  return (
    <div className="editor-preview">
      <TemplateComponent resume={resume} />
    </div>
  );
}
