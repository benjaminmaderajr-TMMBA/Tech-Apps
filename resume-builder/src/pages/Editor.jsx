import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, ArrowLeft } from 'lucide-react';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';
import { fetchResume, createResume, updateResume, generatePublicLinkId } from '../api/base44';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (id) {
      loadResume();
    }
  }, [id]);

  const loadResume = async () => {
    try {
      setLoading(true);
      const data = await fetchResume(id);
      setResume(data);
      setPreviewData(data);
    } catch (err) {
      console.error('Error loading resume:', err);
      alert('Failed to load resume');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (formData) => {
    try {
      let savedResume;

      // Generate public link ID if creating new resume
      if (!formData._id && !formData.public_link_id) {
        formData.public_link_id = generatePublicLinkId();
      }

      if (formData._id) {
        // Update existing resume
        savedResume = await updateResume(formData._id, formData);
      } else {
        // Create new resume
        savedResume = await createResume(formData);
      }

      // Update preview
      setPreviewData(savedResume);
      setResume(savedResume);

      // Show success message
      const message = formData._id ? 'Resume updated successfully!' : 'Resume created successfully!';
      alert(message);

      // Navigate to dashboard after creating
      if (!formData._id) {
        navigate('/');
      }
    } catch (err) {
      console.error('Error saving resume:', err);
      throw err;
    }
  };

  const handleExportPDF = async () => {
    try {
      setExporting(true);
      const element = document.getElementById('resume-content');

      if (!element) {
        throw new Error('Resume content not found');
      }

      // Capture the resume as canvas
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false
      });

      // Convert to PDF
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

      const fileName = `${previewData?.title || 'resume'}.pdf`.replace(/\s+/g, '_');
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

  return (
    <div className="page">
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px'
        }}>
          <button
            onClick={() => navigate('/')}
            className="btn btn-secondary"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          {previewData && (
            <button
              onClick={handleExportPDF}
              className="btn btn-primary"
              disabled={exporting}
            >
              <Download size={20} />
              {exporting ? 'Exporting...' : 'Export PDF'}
            </button>
          )}
        </div>

        <div className="editor-layout">
          <ResumeForm
            resume={resume}
            onSave={handleSave}
          />
          <ResumePreview resume={previewData} />
        </div>
      </div>
    </div>
  );
}
