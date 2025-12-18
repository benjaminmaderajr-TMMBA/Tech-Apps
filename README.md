# Benjamin Madera JR - Portfolio Website

A modern, responsive portfolio website showcasing professional experience, skills, certifications, and education.

## 🌟 Features

- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI/UX** - Clean, professional design with smooth animations
- **Dark Theme** - Eye-friendly dark color scheme with blue accents
- **Interactive Elements** - Smooth scrolling, hover effects, and fade-in animations
- **SEO Optimized** - Proper HTML structure and meta tags
- **Fast Loading** - Optimized CSS and JavaScript

## 🚀 Quick Start

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A local web server (optional, but recommended)

### Installation

1. Clone this repository:
```bash
git clone https://github.com/benjaminmaderajr-TMMBA/Tech-Apps.git
cd Tech-Apps
```

2. Add your images to the `images` directory:
   - `profile.jpg` - Your professional headshot
   - `hero-bg.jpg` - Hero section background image

3. Open the website:

   **Option A: Direct File Opening**
   - Simply open `index.html` in your web browser

   **Option B: Using Python HTTP Server (Recommended)**
   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   Then navigate to `http://localhost:8000`

   **Option C: Using Node.js http-server**
   ```bash
   npx http-server
   ```

## 📁 Project Structure

```
Tech-Apps/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── images/             # Image assets directory
│   ├── README.md       # Instructions for adding images
│   ├── profile.jpg     # Your profile photo (add this)
│   └── hero-bg.jpg     # Hero background image (add this)
└── README.md           # This file
```

## 🎨 Customization

### Updating Personal Information

Edit `index.html` to update:
- Contact information (email, phone, LinkedIn)
- Professional summary
- Work experience
- Education details
- Skills and certifications

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2563eb;      /* Main blue color */
    --secondary-color: #1e40af;    /* Darker blue */
    --accent-color: #3b82f6;       /* Lighter blue */
    --text-primary: #ffffff;       /* White text */
    --text-secondary: #d1d5db;     /* Gray text */
    --bg-dark: #0a0a0a;           /* Main background */
    --bg-section: #1a1a1a;        /* Section background */
    --bg-card: #252525;           /* Card background */
}
```

### Adding New Sections

Follow the existing section structure in `index.html`:

```html
<section class="your-section">
    <div class="container">
        <h2 class="section-title">Your Section Title</h2>
        <!-- Your content here -->
    </div>
</section>
```

## 🌐 Deployment

### GitHub Pages

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select your branch (usually `main` or `master`)
4. Click Save
5. Your site will be available at `https://yourusername.github.io/Tech-Apps/`

### Netlify

1. Sign up at [Netlify](https://www.netlify.com/)
2. Click "New site from Git"
3. Connect your GitHub repository
4. Click "Deploy site"

### Vercel

1. Sign up at [Vercel](https://vercel.com/)
2. Click "Import Project"
3. Import your GitHub repository
4. Click "Deploy"

## 📱 Sections

1. **Hero Section** - Profile image, name, title, and contact buttons
2. **Professional Summary** - Brief overview of experience and expertise
3. **Core Skills** - Key competencies and abilities
4. **Certifications** - Professional certifications and credentials
5. **Experience Highlights** - Detailed work history and achievements
6. **Education** - Academic background and training
7. **Languages** - Languages spoken
8. **Footer** - Contact links and copyright information

## 🛠️ Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript
- Font Awesome 6.4.0 (for icons)

## 📄 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📞 Contact

- **Email**: benjamin.maderajr@gmail.com
- **Phone**: (407) 636-0708
- **LinkedIn**: [linkedin.com/in/benjamin-madera-jr](https://www.linkedin.com/in/benjamin-madera-jr/)
- **Location**: Lacey, WA 98516

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Design inspired by modern tech portfolio templates
- Icons provided by Font Awesome
- Typography using system fonts for optimal performance

---

**© 2025 Benjamin Madera JR. All rights reserved.**
