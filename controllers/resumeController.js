const Resume = require('../models/Resume');
const User = require('../models/User');
const aiService = require('../utils/openai');

// @desc    Create new resume
// @route   POST /api/resumes
// @access  Private
exports.createResume = async (req, res) => {
  try {
    const resumeData = {
      ...req.body,
      user: req.user._id
    };

    const resume = await Resume.create(resumeData);

    // Add resume to user's resumes array
    await User.findByIdAndUpdate(req.user._id, {
      $push: { resumes: resume._id }
    });

    res.status(201).json({
      success: true,
      data: resume
    });
  } catch (error) {
    console.error('Create resume error:', error);
    res.status(500).json({
      success: false,
      error: 'Error creating resume'
    });
  }
};

// @desc    Get all user's resumes
// @route   GET /api/resumes
// @access  Private
exports.getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id }).sort('-updatedAt');

    res.json({
      success: true,
      count: resumes.length,
      data: resumes
    });
  } catch (error) {
    console.error('Get resumes error:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching resumes'
    });
  }
};

// @desc    Get single resume by ID
// @route   GET /api/resumes/:id
// @access  Private/Public (if resume is public)
exports.getResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id).populate('user', 'firstName lastName profileImage');

    if (!resume) {
      return res.status(404).json({
        success: false,
        error: 'Resume not found'
      });
    }

    // Check authorization
    if (!resume.isPublic && (!req.user || resume.user._id.toString() !== req.user._id.toString())) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to view this resume'
      });
    }

    // Increment views if public and not owner
    if (resume.isPublic && (!req.user || resume.user._id.toString() !== req.user._id.toString())) {
      await resume.incrementViews();
    }

    res.json({
      success: true,
      data: resume
    });
  } catch (error) {
    console.error('Get resume error:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching resume'
    });
  }
};

// @desc    Get resume by slug (public URL)
// @route   GET /api/resumes/public/:slug
// @access  Public
exports.getResumeBySlug = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      slug: req.params.slug,
      isPublic: true
    }).populate('user', 'firstName lastName profileImage headline location');

    if (!resume) {
      return res.status(404).json({
        success: false,
        error: 'Resume not found'
      });
    }

    // Increment views
    await resume.incrementViews();

    res.json({
      success: true,
      data: resume
    });
  } catch (error) {
    console.error('Get resume by slug error:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching resume'
    });
  }
};

// @desc    Update resume
// @route   PUT /api/resumes/:id
// @access  Private
exports.updateResume = async (req, res) => {
  try {
    let resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        error: 'Resume not found'
      });
    }

    // Check authorization
    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this resume'
      });
    }

    resume = await Resume.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: resume
    });
  } catch (error) {
    console.error('Update resume error:', error);
    res.status(500).json({
      success: false,
      error: 'Error updating resume'
    });
  }
};

// @desc    Delete resume
// @route   DELETE /api/resumes/:id
// @access  Private
exports.deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        error: 'Resume not found'
      });
    }

    // Check authorization
    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this resume'
      });
    }

    await resume.deleteOne();

    // Remove from user's resumes array
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { resumes: resume._id }
    });

    res.json({
      success: true,
      message: 'Resume deleted successfully'
    });
  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({
      success: false,
      error: 'Error deleting resume'
    });
  }
};

// @desc    Duplicate resume
// @route   POST /api/resumes/:id/duplicate
// @access  Private
exports.duplicateResume = async (req, res) => {
  try {
    const originalResume = await Resume.findById(req.params.id);

    if (!originalResume) {
      return res.status(404).json({
        success: false,
        error: 'Resume not found'
      });
    }

    // Check authorization
    if (originalResume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to duplicate this resume'
      });
    }

    // Create duplicate
    const duplicateData = originalResume.toObject();
    delete duplicateData._id;
    delete duplicateData.slug;
    delete duplicateData.createdAt;
    delete duplicateData.updatedAt;
    delete duplicateData.views;
    duplicateData.title = `${duplicateData.title} (Copy)`;
    duplicateData.isDefault = false;
    duplicateData.isPublic = false;

    const newResume = await Resume.create(duplicateData);

    // Add to user's resumes
    await User.findByIdAndUpdate(req.user._id, {
      $push: { resumes: newResume._id }
    });

    res.status(201).json({
      success: true,
      data: newResume
    });
  } catch (error) {
    console.error('Duplicate resume error:', error);
    res.status(500).json({
      success: false,
      error: 'Error duplicating resume'
    });
  }
};

// @desc    Generate AI professional summary
// @route   POST /api/resumes/:id/ai/summary
// @access  Private
exports.generateSummary = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        error: 'Resume not found'
      });
    }

    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized'
      });
    }

    const summary = await aiService.generateProfessionalSummary({
      experience: resume.experience,
      skills: resume.skills,
      targetJobTitle: req.body.targetJobTitle || resume.aiMetadata?.targetJobTitle
    });

    res.json({
      success: true,
      data: { summary }
    });
  } catch (error) {
    console.error('Generate summary error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error generating summary'
    });
  }
};

// @desc    Optimize bullet points with AI
// @route   POST /api/resumes/:id/ai/optimize-bullets
// @access  Private
exports.optimizeBulletPoints = async (req, res) => {
  try {
    const { bulletPoints, jobTitle } = req.body;

    if (!bulletPoints || !Array.isArray(bulletPoints)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide bullet points array'
      });
    }

    const optimized = await aiService.optimizeBulletPoints(bulletPoints, jobTitle);

    res.json({
      success: true,
      data: { optimizedBulletPoints: optimized }
    });
  } catch (error) {
    console.error('Optimize bullets error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error optimizing bullet points'
    });
  }
};

// @desc    Generate achievements with AI
// @route   POST /api/resumes/ai/generate-achievements
// @access  Private
exports.generateAchievements = async (req, res) => {
  try {
    const { jobTitle, company, responsibilities } = req.body;

    if (!jobTitle || !company) {
      return res.status(400).json({
        success: false,
        error: 'Please provide job title and company'
      });
    }

    const achievements = await aiService.generateAchievements(jobTitle, company, responsibilities);

    res.json({
      success: true,
      data: { achievements }
    });
  } catch (error) {
    console.error('Generate achievements error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error generating achievements'
    });
  }
};

// @desc    Analyze ATS score
// @route   POST /api/resumes/:id/ai/ats-score
// @access  Private
exports.analyzeATSScore = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        error: 'Resume not found'
      });
    }

    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized'
      });
    }

    const analysis = await aiService.analyzeATSScore(resume);

    // Update resume with ATS score and suggestions
    resume.aiMetadata = {
      ...resume.aiMetadata,
      lastOptimized: new Date(),
      atsScore: analysis.score,
      suggestions: analysis.suggestions
    };
    await resume.save();

    res.json({
      success: true,
      data: analysis
    });
  } catch (error) {
    console.error('ATS analysis error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error analyzing ATS score'
    });
  }
};

// @desc    Get skill suggestions
// @route   POST /api/resumes/ai/suggest-skills
// @access  Private
exports.suggestSkills = async (req, res) => {
  try {
    const { jobTitle, industry, currentSkills } = req.body;

    if (!jobTitle || !industry) {
      return res.status(400).json({
        success: false,
        error: 'Please provide job title and industry'
      });
    }

    const skills = await aiService.suggestSkills(jobTitle, industry, currentSkills);

    res.json({
      success: true,
      data: { suggestedSkills: skills }
    });
  } catch (error) {
    console.error('Suggest skills error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error suggesting skills'
    });
  }
};

// @desc    Generate cover letter
// @route   POST /api/resumes/:id/ai/cover-letter
// @access  Private
exports.generateCoverLetter = async (req, res) => {
  try {
    const { jobDescription, companyName } = req.body;
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        error: 'Resume not found'
      });
    }

    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized'
      });
    }

    if (!jobDescription || !companyName) {
      return res.status(400).json({
        success: false,
        error: 'Please provide job description and company name'
      });
    }

    const coverLetter = await aiService.generateCoverLetter(resume, jobDescription, companyName);

    res.json({
      success: true,
      data: { coverLetter }
    });
  } catch (error) {
    console.error('Generate cover letter error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error generating cover letter'
    });
  }
};
