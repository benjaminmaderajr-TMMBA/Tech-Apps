import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Download } from 'lucide-react';
import ProfessionalTemplate from '../templates/ProfessionalTemplate';
import ModernTemplate from '../templates/ModernTemplate';
import CreativeTemplate from '../templates/CreativeTemplate';
import { fetchResumeByPublicLink } from '../api/base44';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function PublicResume() {
  const { publicLinkId } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    loadResume();
  }, [publicLinkId]);

  const loadResume = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchResumeByPublicLink(publicLinkId);

      if (!data) {
        setError('Resume not found');
        return;
      }

      setResume(data);
    } catch (err) {
      console.error('Error loading resume:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = async () => {
    try {
      setExporting(true);
      const element = document.getElementById('resume-content');

      if (!element) {
        throw new Error('Resume content not found');
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(
        imgData,
        'PNG',
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      const fileName = `${resume?.title || 'resume'}.pdf`.replace(/\s+/g, '_');
      pdf.save(fileName);
    } catch (err) {
      console.error('Error exporting PDF:', err);
      alert('Failed to export PDF: ' + err.message);
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading resume...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <div className="container">
          <div className="error" style={{ marginTop: '40px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>Error</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="page">
        <div className="container text-center" style={{ paddingTop: '60px' }}>
          <h2 style={{ fontSize: '24px', color: '#6b7280' }}>Resume not found</h2>
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
    <div className="page" style={{ background: '#f9fafb' }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '24px'
        }}>
          <button
            onClick={handleExportPDF}
            className="btn btn-primary"
            disabled={exporting}
          >
            <Download size={20} />
            {exporting ? 'Exporting...' : 'Download PDF'}
          </button>
        </div>

        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <TemplateComponent resume={resume} />
        </div>
      </div>
    </div>
  );
}
