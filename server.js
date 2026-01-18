const express = require('express');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Database connection
const connectDB = require('./config/database');

// Initialize Express app
const app = express();

// Port configuration
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));

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
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Rate limiting
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false
});
app.use('/api/', limiter);

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/resumes', require('./routes/resumes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        status: 'OK',
        message: 'AI Resume Builder API is running',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: 'Connected'
    });
});

// Serve React build in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
} else {
    // Development mode - serve old portfolio for legacy support
    app.use(express.static(path.join(__dirname, 'public'), {
        maxAge: '1d',
        etag: true
    }));

    app.get('/', (req, res) => {
        res.json({
            message: 'AI Resume Builder API',
            version: '2.0.0',
            endpoints: {
                health: '/api/health',
                auth: '/api/auth',
                resumes: '/api/resumes'
            },
            documentation: 'Please use the React client on port 3000'
        });
    });
}

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
    console.log('│   🚀 AI Resume Builder - API Server                 │');
    console.log('│                                                     │');
    console.log('│   Server Status: ✅ Running                         │');
    console.log(`│   Port: ${PORT}                                      │`);
    console.log(`│   URL: http://localhost:${PORT}                      │`);
    console.log('│   Environment: ' + (process.env.NODE_ENV || 'development').padEnd(37) + '│');
    console.log('│                                                     │');
    console.log('│   API Endpoints:                                    │');
    console.log(`│   • Health: http://localhost:${PORT}/api/health      │`);
    console.log(`│   • Auth: http://localhost:${PORT}/api/auth          │`);
    console.log(`│   • Resumes: http://localhost:${PORT}/api/resumes    │`);
    console.log('│                                                     │');
    console.log('│   Features:                                         │');
    console.log('│   ✓ User Authentication (JWT)                       │');
    console.log('│   ✓ Resume Builder                                  │');
    console.log('│   ✓ AI Content Generation (OpenAI)                  │');
    console.log('│   ✓ ATS Score Analysis                              │');
    console.log('│   ✓ Public Resume Showcase                          │');
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
