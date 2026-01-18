const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  current: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    maxlength: 2000
  },
  achievements: [{
    type: String,
    maxlength: 500
  }],
  skills: [String]
});

const EducationSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: true,
    trim: true
  },
  degree: {
    type: String,
    required: true,
    trim: true
  },
  field: {
    type: String,
    trim: true
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  current: {
    type: Boolean,
    default: false
  },
  gpa: {
    type: String
  },
  description: {
    type: String,
    maxlength: 1000
  },
  achievements: [String]
});

const CertificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  issuer: {
    type: String,
    required: true,
    trim: true
  },
  issueDate: {
    type: Date
  },
  expirationDate: {
    type: Date
  },
  credentialId: String,
  credentialUrl: String,
  description: String
});

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    maxlength: 1000
  },
  role: String,
  startDate: Date,
  endDate: Date,
  url: String,
  technologies: [String],
  highlights: [String]
});

const ResumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please provide a resume title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  template: {
    type: String,
    enum: ['modern', 'classic', 'minimal', 'creative', 'professional'],
    default: 'modern'
  },
  personalInfo: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    location: {
      city: String,
      state: String,
      country: String
    },
    linkedin: String,
    github: String,
    portfolio: String,
    website: String
  },
  professionalSummary: {
    type: String,
    maxlength: 2000
  },
  experience: [ExperienceSchema],
  education: [EducationSchema],
  skills: [{
    category: {
      type: String,
      required: true
    },
    items: [{
      name: {
        type: String,
        required: true
      },
      level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced', 'expert'],
        default: 'intermediate'
      }
    }]
  }],
  certifications: [CertificationSchema],
  projects: [ProjectSchema],
  languages: [{
    name: {
      type: String,
      required: true
    },
    proficiency: {
      type: String,
      enum: ['elementary', 'limited-working', 'professional-working', 'full-professional', 'native'],
      default: 'professional-working'
    }
  }],
  customSections: [{
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    order: Number
  }],
  aiMetadata: {
    lastOptimized: Date,
    atsScore: {
      type: Number,
      min: 0,
      max: 100
    },
    suggestions: [String],
    targetJobTitle: String,
    targetIndustry: String
  },
  views: {
    type: Number,
    default: 0
  },
  slug: {
    type: String,
    unique: true,
    sparse: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Generate slug from title and user id
ResumeSchema.pre('save', function(next) {
  if (this.isModified('title') && this.isPublic) {
    const slugBase = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    this.slug = `${slugBase}-${this._id.toString().slice(-6)}`;
  }
  next();
});

// If setting this resume as default, unset other defaults
ResumeSchema.pre('save', async function(next) {
  if (this.isDefault && this.isModified('isDefault')) {
    await this.constructor.updateMany(
      { user: this.user, _id: { $ne: this._id } },
      { isDefault: false }
    );
  }
  next();
});

// Increment view count
ResumeSchema.methods.incrementViews = async function() {
  this.views += 1;
  return await this.save();
};

module.exports = mongoose.model('Resume', ResumeSchema);
