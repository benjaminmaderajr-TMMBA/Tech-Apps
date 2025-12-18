# Benjamin Madera JR - Portfolio Website

A modern, responsive portfolio website built with Node.js and Express, showcasing professional experience, skills, certifications, and education.

## 🌟 Features

- **Node.js Backend** - Express server with security and performance optimizations
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI/UX** - Clean, professional design with smooth animations
- **Dark Theme** - Eye-friendly dark color scheme with blue accents
- **Interactive Elements** - Smooth scrolling, hover effects, and fade-in animations
- **Security Headers** - Helmet.js for enhanced security
- **Compression** - Gzip compression for faster page loads
- **API Endpoints** - RESTful API for contact information and health checks
- **SEO Optimized** - Proper HTML structure and meta tags

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher)

Check your versions:
```bash
node --version
npm --version
```

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/benjaminmaderajr-TMMBA/Tech-Apps.git
cd Tech-Apps
```

2. **Install dependencies**:
```bash
npm install
```

3. **Add your images** to the `public/images` directory:
   - `profile.jpg` - Your professional headshot
   - `hero-bg.jpg` - Hero section background image

4. **Start the server**:

   **Production mode:**
   ```bash
   npm start
   ```

   **Development mode (with auto-restart):**
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
Tech-Apps/
├── server.js           # Express server configuration
├── package.json        # Node.js dependencies and scripts
├── public/             # Static files directory
│   ├── index.html      # Main HTML file
│   ├── styles.css      # CSS styling
│   ├── script.js       # JavaScript functionality
│   └── images/         # Image assets
│       ├── README.md   # Instructions for adding images
│       ├── profile.jpg # Your profile photo (add this)
│       └── hero-bg.jpg # Hero background image (add this)
├── .gitignore          # Git ignore rules
├── LICENSE             # MIT License
└── README.md           # This file
```

## 🔌 API Endpoints

The server provides the following endpoints:

### `GET /`
- **Description**: Main portfolio page
- **Response**: HTML page

### `GET /health`
- **Description**: Server health check
- **Response**: JSON with server status
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2025-12-18T02:00:00.000Z",
  "uptime": 12345.67
}
```

### `GET /api/contact`
- **Description**: Contact information endpoint
- **Response**: JSON with contact details
```json
{
  "name": "Benjamin Madera JR",
  "email": "benjamin.maderajr@gmail.com",
  "phone": "(407) 636-0708",
  "location": "Lacey, WA 98516",
  "linkedin": "https://www.linkedin.com/in/benjamin-madera-jr/"
}
```

## 🎨 Customization

### Updating Personal Information

Edit `public/index.html` to update:
- Contact information (email, phone, LinkedIn)
- Professional summary
- Work experience
- Education details
- Skills and certifications

### Changing Colors

Edit the CSS variables in `public/styles.css`:

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

### Changing Port

Set the PORT environment variable:

```bash
# Linux/Mac
PORT=8080 npm start

# Windows (Command Prompt)
set PORT=8080 && npm start

# Windows (PowerShell)
$env:PORT=8080; npm start
```

Or create a `.env` file:
```
PORT=8080
NODE_ENV=production
```

## 🌐 Deployment

### Heroku

1. **Install Heroku CLI** and login:
```bash
heroku login
```

2. **Create a new Heroku app**:
```bash
heroku create benjamin-madera-portfolio
```

3. **Deploy**:
```bash
git push heroku main
```

4. **Open your app**:
```bash
heroku open
```

### Render

1. Sign up at [Render](https://render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Click "Create Web Service"

### Railway

1. Sign up at [Railway](https://railway.app/)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will auto-detect Node.js and deploy

### Vercel (Serverless)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### DigitalOcean App Platform

1. Go to [DigitalOcean Apps](https://cloud.digitalocean.com/apps)
2. Click "Create App" → Connect your GitHub repository
3. Configure build settings:
   - **Build Command**: `npm install`
   - **Run Command**: `npm start`
4. Deploy

### Traditional VPS (Ubuntu/Debian)

1. **Install Node.js**:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2. **Clone and setup**:
```bash
git clone https://github.com/benjaminmaderajr-TMMBA/Tech-Apps.git
cd Tech-Apps
npm install
```

3. **Install PM2** (Process Manager):
```bash
sudo npm install -g pm2
pm2 start server.js --name portfolio
pm2 startup
pm2 save
```

4. **Configure Nginx** (optional):
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📱 Website Sections

1. **Hero Section** - Profile image, name, title, and contact buttons
2. **Professional Summary** - Brief overview of experience and expertise
3. **Core Skills** - Key competencies and abilities
4. **Certifications** - Professional certifications and credentials
5. **Experience Highlights** - Detailed work history and achievements
6. **Education** - Academic background and training
7. **Languages** - Languages spoken
8. **Footer** - Contact links and copyright information

## 🛠️ Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Helmet** - Security middleware
- **Compression** - Response compression
- **Morgan** - HTTP request logger

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Grid and Flexbox
- **Vanilla JavaScript** - Interactive features
- **Font Awesome 6.4.0** - Icons

## 🔒 Security Features

- Content Security Policy (CSP) headers
- XSS protection
- MIME type sniffing prevention
- Clickjacking protection (X-Frame-Options)
- HTTPS enforcement ready
- DNS prefetch control

## 📊 Performance Optimizations

- Gzip compression for all responses
- Static asset caching
- ETags for cache validation
- Minification ready
- Lazy loading for animations

## 🧪 Development

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload (requires nodemon)
- `npm test` - Run tests (to be implemented)

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
```

## 📄 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## 📞 Contact

- **Name**: Benjamin Madera JR
- **Email**: benjamin.maderajr@gmail.com
- **Phone**: (407) 636-0708
- **LinkedIn**: [linkedin.com/in/benjamin-madera-jr](https://www.linkedin.com/in/benjamin-madera-jr/)
- **Location**: Lacey, WA 98516

## 🐛 Troubleshooting

### Port already in use
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use a different port
PORT=8080 npm start
```

### Dependencies not installing
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Images not loading
- Ensure images are in `public/images/` directory
- Check file names: `profile.jpg` and `hero-bg.jpg`
- Check file permissions
- Clear browser cache

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Design inspired by modern tech portfolio templates
- Icons provided by Font Awesome
- Typography using system fonts for optimal performance
- Built with Express.js and modern web standards

## 🚧 Future Enhancements

- [ ] Contact form with email integration
- [ ] Blog section with CMS
- [ ] Project portfolio gallery
- [ ] Resume download feature
- [ ] Dark/Light theme toggle
- [ ] Multi-language support (English/Spanish)
- [ ] Analytics integration
- [ ] Admin dashboard

---

**© 2025 Benjamin Madera JR. All rights reserved.**

Built with ❤️ using Node.js and Express
