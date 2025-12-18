const express = require('express');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

// Initialize Express app
const app = express();

// Port configuration
const PORT = process.env.PORT || 3000;

// Security middleware - Helmet helps secure Express apps
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            fontSrc: ["'self'", "https://cdnjs.cloudflare.com"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"]
        }
    }
}));

// Compression middleware - Compress all responses
app.use(compression());

// Logging middleware - Log HTTP requests
app.use(morgan('dev'));

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: '1d', // Cache static assets for 1 day
    etag: true
}));

// Route for home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// API endpoint for contact info (can be extended later)
app.get('/api/contact', (req, res) => {
    res.json({
        name: 'Benjamin Madera JR',
        emails: {
            usarmy: 'benjamin.maderajr@usarmy.vet',
            gmail: 'benjamin.maderajr@gmail.com'
        },
        phone: '(407) 636-0708',
        location: 'Lacey, WA 98516',
        linkedin: 'https://www.linkedin.com/feed/'
    });
});

// 404 handler - Handle unknown routes
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// Start server
const server = app.listen(PORT, () => {
    console.log('┌─────────────────────────────────────────────────────┐');
    console.log('│                                                     │');
    console.log('│   🚀 Benjamin Madera JR - Portfolio Server          │');
    console.log('│                                                     │');
    console.log('│   Server Status: ✅ Running                         │');
    console.log(`│   Port: ${PORT}                                      │`);
    console.log(`│   URL: http://localhost:${PORT}                      │`);
    console.log('│   Environment: ' + (process.env.NODE_ENV || 'development').padEnd(37) + '│');
    console.log('│                                                     │');
    console.log('│   Endpoints:                                        │');
    console.log(`│   • Home: http://localhost:${PORT}/                  │`);
    console.log(`│   • Health: http://localhost:${PORT}/health          │`);
    console.log(`│   • API: http://localhost:${PORT}/api/contact        │`);
    console.log('│                                                     │');
    console.log('│   Press Ctrl+C to stop the server                   │');
    console.log('│                                                     │');
    console.log('└─────────────────────────────────────────────────────┘');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('\n📛 SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('✅ HTTP server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('\n\n📛 SIGINT signal received: closing HTTP server');
    process.exit(0);
});
