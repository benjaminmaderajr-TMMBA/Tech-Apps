# AIR Resume Builder & Portfolio

A modern, AI-powered resume builder built with React and integrated with Base44 backend.

## Features

- ✨ **Create & Edit Resumes** - Comprehensive form with all professional resume fields
- 🎨 **Multiple Templates** - Choose from Professional, Modern, and Creative designs
- 📊 **AI Resume Scoring** - Get feedback on your resume quality
- 🔗 **Public Resume Links** - Share your resume with a unique URL
- 📥 **PDF Export** - Download your resume as a professional PDF
- 💾 **Cloud Storage** - Resumes automatically saved to Base44 backend
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile

## Tech Stack

- **Frontend**: React 18 with Vite
- **Routing**: React Router v6
- **Styling**: Custom CSS with modern design system
- **Icons**: Lucide React
- **PDF Export**: jsPDF + html2canvas
- **Backend**: Base44 API integration

## Getting Started

### Installation

```bash
cd resume-builder
npm install
```

### Development

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
resume-builder/
├── src/
│   ├── api/              # Base44 API integration
│   ├── components/       # Reusable React components
│   ├── templates/        # Resume templates (Professional, Modern, Creative)
│   ├── pages/           # Main page components
│   ├── styles/          # CSS stylesheets
│   ├── App.jsx          # Main app component
│   └── main.jsx         # App entry point
├── public/              # Static assets
├── index.html           # HTML template
└── package.json         # Dependencies

```

## API Integration

This app integrates with Base44 API for resume storage and management. The API supports:

- **Filterable fields**: title, headline, summary, target_role, target_industry, seniority_level, photo_url, banner_url, contact_email, contact_phone, location, linkedin_url, website_url, ai_score, ai_feedback, is_primary, template, public_link_id

- **Operations**: Create, Read, Update, Delete resumes

## Resume Templates

### Professional Template
Classic and elegant design perfect for corporate roles. Features centered layout with traditional styling.

### Modern Template
Clean and contemporary layout with visual tags, gradient accents, and modern UI elements.

### Creative Template
Bold two-column design with colored sidebar, perfect for creative professionals and designers.

## Usage

1. **Create a Resume**: Click "Create New Resume" and fill out the form
2. **Choose Template**: Select from Professional, Modern, or Creative templates
3. **Preview**: See live preview as you type
4. **Save**: Resume is automatically saved to Base44
5. **Share**: Use the public link to share your resume
6. **Export**: Download as PDF for applications

## Features in Detail

### Resume Fields
- Basic Info: Name, headline, professional summary
- Career Focus: Target role, industry, seniority level
- Contact: Email, phone, location, LinkedIn, website
- Media: Profile photo, banner image
- AI Analytics: Resume score and feedback

### Public Links
Each resume gets a unique public link (e.g., `/resume/abc123xyz`) that can be shared with recruiters and employers.

### PDF Export
High-quality PDF export using html2canvas to capture the exact visual appearance of your resume.

## License

MIT License - feel free to use this project for your own resume builder!

## Author

Created as part of the Tech-Apps project.
