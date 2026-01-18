const express = require('express');
const router = express.Router();
const {
  createResume,
  getResumes,
  getResume,
  getResumeBySlug,
  updateResume,
  deleteResume,
  duplicateResume,
  generateSummary,
  optimizeBulletPoints,
  generateAchievements,
  analyzeATSScore,
  suggestSkills,
  generateCoverLetter
} = require('../controllers/resumeController');
const { protect, optionalAuth } = require('../middleware/auth');
const {
  validateResume,
  validateObjectId,
  handleValidationErrors
} = require('../middleware/validation');

// Public routes
router.get('/public/:slug', getResumeBySlug);

// Protected routes - Resume CRUD
router.route('/')
  .get(protect, getResumes)
  .post(protect, validateResume, handleValidationErrors, createResume);

router.route('/:id')
  .get(optionalAuth, validateObjectId('id'), handleValidationErrors, getResume)
  .put(protect, validateObjectId('id'), handleValidationErrors, updateResume)
  .delete(protect, validateObjectId('id'), handleValidationErrors, deleteResume);

router.post('/:id/duplicate', protect, validateObjectId('id'), handleValidationErrors, duplicateResume);

// AI-powered features
router.post('/:id/ai/summary', protect, validateObjectId('id'), handleValidationErrors, generateSummary);
router.post('/:id/ai/ats-score', protect, validateObjectId('id'), handleValidationErrors, analyzeATSScore);
router.post('/:id/ai/cover-letter', protect, validateObjectId('id'), handleValidationErrors, generateCoverLetter);
router.post('/ai/optimize-bullets', protect, optimizeBulletPoints);
router.post('/ai/generate-achievements', protect, generateAchievements);
router.post('/ai/suggest-skills', protect, suggestSkills);

module.exports = router;
