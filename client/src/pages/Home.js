import React from 'react';
import { Link } from 'react-router-dom';
import { FaRobot, FaCheckCircle, FaChartLine, FaFileDownload, FaBrain, FaUsers } from 'react-icons/fa';

const Home = () => {
  const features = [
    {
      icon: <FaRobot className="text-4xl text-indigo-600" />,
      title: 'AI-Powered Content Generation',
      description: 'Let GPT-4 craft professional summaries, optimize bullet points, and generate compelling achievements tailored to your target role.'
    },
    {
      icon: <FaChartLine className="text-4xl text-indigo-600" />,
      title: 'ATS Score Analysis',
      description: 'Get real-time feedback on how well your resume performs with Applicant Tracking Systems and receive actionable suggestions.'
    },
    {
      icon: <FaFileDownload className="text-4xl text-indigo-600" />,
      title: 'Beautiful Templates',
      description: 'Choose from multiple professional resume templates designed to make your experience stand out.'
    },
    {
      icon: <FaBrain className="text-4xl text-indigo-600" />,
      title: 'Smart Skill Suggestions',
      description: 'AI analyzes your target role and industry to suggest relevant skills that enhance your profile.'
    },
    {
      icon: <FaUsers className="text-4xl text-indigo-600" />,
      title: 'LinkedIn-Style Showcase',
      description: 'Share your resume with a public URL that looks professional and modern, just like LinkedIn profiles.'
    },
    {
      icon: <FaCheckCircle className="text-4xl text-indigo-600" />,
      title: 'Cover Letter Generator',
      description: 'Generate personalized cover letters based on your resume and the job description in seconds.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-indigo-600">AI Resume Builder</h1>
            <div className="space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-indigo-600 font-medium transition"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Build Your Perfect Resume
          <span className="block text-indigo-600 mt-2">With AI-Powered Intelligence</span>
        </h2>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Create professional resumes that get you hired. Our AI-powered platform helps you craft compelling content,
          optimize for ATS systems, and showcase your experience like never before.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition shadow-lg hover:shadow-xl"
          >
            Create Your Resume Free
          </Link>
          <Link
            to="/login"
            className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Powerful Features to Land Your Dream Job
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Career?
          </h3>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of professionals who have landed their dream jobs with AI-powered resumes.
          </p>
          <Link
            to="/register"
            className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition inline-block shadow-lg"
          >
            Get Started Now - It's Free
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2026 AI Resume Builder. Built with ❤️ using React, Node.js, MongoDB, and OpenAI GPT-4.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
