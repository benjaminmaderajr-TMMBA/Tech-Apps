# AI Resume Builder

A full-stack MERN application that helps users create professional resumes with AI-powered features using OpenAI GPT-4. Features include AI content generation, ATS score analysis, LinkedIn-style profile showcase, and multiple resume templates.

## ✨ Features

### Core Features
- 🤖 **AI-Powered Content Generation** - GPT-4 generates professional summaries, optimizes bullet points, and creates compelling achievements
- 📊 **ATS Score Analysis** - Real-time feedback on Applicant Tracking System compatibility
- 🎨 **Multiple Templates** - Modern, Classic, Minimal, Creative, and Professional resume designs
- 🔗 **Public Resume Showcase** - LinkedIn-style public profile pages with custom URLs
- 💼 **Cover Letter Generator** - AI-generated personalized cover letters
- 🎯 **Smart Skill Suggestions** - AI recommends relevant skills based on job title and industry
- 📈 **Resume Analytics** - Track views and engagement on public resumes

### Technical Features
- User authentication with JWT
- MongoDB database with Mongoose ODM
- RESTful API with Express.js
- React frontend with React Router
- Responsive design with Tailwind CSS
- Form validation
- Real-time notifications
- Rate limiting and security

## 🚀 Quick Start

### Prerequisites
- Node.js >= 14.0.0
- npm >= 6.0.0
- MongoDB (local or MongoDB Atlas)
- OpenAI API key

### Installation Steps

1. **Install all dependencies**
```bash
# Backend dependencies
npm install

# Frontend dependencies
cd client && npm install && cd ..
```

2. **Set up environment variables**

Create `.env` in root:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-resume-builder
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=30d
OPENAI_API_KEY=sk-your-openai-api-key-here
OPENAI_MODEL=gpt-4
CLIENT_URL=http://localhost:3000
```

Create `.env` in client directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

3. **Run the application**
```bash
# Development mode (runs both backend and frontend)
npm run dev

# Or run separately:
# Terminal 1 - Backend:
npm run dev

# Terminal 2 - Frontend:
cd client && npm start
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Project Structure

```
Tech-Apps/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── contexts/      # React contexts (Auth)
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── App.js
│   └── package.json
├── config/                # Backend config
├── controllers/           # Request handlers
├── middleware/            # Express middleware
├── models/               # Mongoose models
├── routes/               # API routes
├── utils/                # Utilities (OpenAI service)
├── server.js
└── package.json
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/password` - Change password

### Resumes
- `GET /api/resumes` - Get all resumes
- `POST /api/resumes` - Create resume
- `GET /api/resumes/:id` - Get resume
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume
- `POST /api/resumes/:id/duplicate` - Duplicate resume

### AI Features
- `POST /api/resumes/:id/ai/summary` - Generate summary
- `POST /api/resumes/:id/ai/ats-score` - Analyze ATS score
- `POST /api/resumes/:id/ai/cover-letter` - Generate cover letter
- `POST /api/resumes/ai/optimize-bullets` - Optimize bullets
- `POST /api/resumes/ai/generate-achievements` - Generate achievements
- `POST /api/resumes/ai/suggest-skills` - Suggest skills

## 🗄️ MongoDB Setup

### Option 1: Local MongoDB
```bash
# Start MongoDB
sudo systemctl start mongodb

# Or with Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Option 2: MongoDB Atlas (Recommended)
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Add to `.env`

## 🤖 OpenAI Setup

1. Create account at https://platform.openai.com
2. Generate API key
3. Add to `.env`

Note: GPT-4 requires billing. Use `gpt-3.5-turbo` for lower costs.

## 🚢 Deployment

### Heroku
```bash
heroku create
heroku config:set MONGODB_URI=your-uri
heroku config:set JWT_SECRET=your-secret
heroku config:set OPENAI_API_KEY=your-key
git push heroku main
```

## 👤 Author

**Benjamin Madera Jr**
- Email: benjamin.maderajr@gmail.com
- LinkedIn: https://www.linkedin.com/in/benjamin-madera-jr/

## 📄 License

MIT License

---

Built with ❤️ using React, Node.js, MongoDB, and OpenAI GPT-4
