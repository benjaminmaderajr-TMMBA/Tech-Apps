const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

class AIResumeService {

  // Generate professional summary based on user's experience
  async generateProfessionalSummary(userData) {
    try {
      const { experience, skills, targetJobTitle } = userData;

      const prompt = `Create a compelling professional summary for a resume based on the following information:

Target Job Title: ${targetJobTitle || 'Professional'}

Experience:
${experience.map(exp => `- ${exp.title} at ${exp.company} (${exp.description})`).join('\n')}

Skills:
${skills.map(s => s.items.map(i => i.name).join(', ')).join(', ')}

Write a 3-4 sentence professional summary that highlights key achievements, expertise, and value proposition. Make it compelling and ATS-friendly.`;

      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4',
        messages: [
          { role: 'system', content: 'You are an expert resume writer and career coach. Write professional, compelling, and ATS-optimized resume content.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 300
      });

      return completion.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error generating professional summary:', error);
      throw new Error('Failed to generate professional summary');
    }
  }

  // Optimize job description bullet points
  async optimizeBulletPoints(bulletPoints, jobTitle) {
    try {
      const prompt = `Optimize these job achievement bullet points for a ${jobTitle} position. Make them more impactful using the STAR method (Situation, Task, Action, Result). Include metrics where possible:

${bulletPoints.map((bp, i) => `${i + 1}. ${bp}`).join('\n')}

Return the optimized bullet points as a numbered list. Keep them concise but impactful.`;

      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4',
        messages: [
          { role: 'system', content: 'You are an expert resume writer. Transform job descriptions into achievement-focused bullet points that stand out.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      const response = completion.choices[0].message.content.trim();
      return response.split('\n').filter(line => line.trim()).map(line =>
        line.replace(/^\d+\.\s*/, '').trim()
      );
    } catch (error) {
      console.error('Error optimizing bullet points:', error);
      throw new Error('Failed to optimize bullet points');
    }
  }

  // Generate achievement bullet points from job description
  async generateAchievements(jobTitle, company, responsibilities) {
    try {
      const prompt = `Based on this job role, generate 4-5 achievement-focused bullet points:

Job Title: ${jobTitle}
Company: ${company}
Responsibilities: ${responsibilities}

Generate bullet points that:
- Start with strong action verbs
- Include quantifiable results when possible
- Highlight impact and value delivered
- Are ATS-friendly
- Follow the STAR method

Return as a numbered list.`;

      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4',
        messages: [
          { role: 'system', content: 'You are an expert resume writer. Create compelling achievement statements that showcase impact.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 400
      });

      const response = completion.choices[0].message.content.trim();
      return response.split('\n').filter(line => line.trim()).map(line =>
        line.replace(/^\d+\.\s*/, '').trim()
      );
    } catch (error) {
      console.error('Error generating achievements:', error);
      throw new Error('Failed to generate achievements');
    }
  }

  // Calculate ATS score and provide suggestions
  async analyzeATSScore(resume) {
    try {
      const resumeText = this._resumeToText(resume);

      const prompt = `Analyze this resume for ATS (Applicant Tracking System) compatibility and provide a score out of 100 along with specific improvement suggestions:

${resumeText}

Evaluate based on:
1. Keyword optimization for target role
2. Formatting (simple, ATS-friendly structure)
3. Section organization
4. Use of action verbs
5. Quantifiable achievements
6. Skills section completeness
7. Contact information clarity
8. Length and conciseness

Return a JSON object with:
{
  "score": <number 0-100>,
  "strengths": [<array of strengths>],
  "suggestions": [<array of specific improvement suggestions>]
}`;

      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4',
        messages: [
          { role: 'system', content: 'You are an ATS expert and resume analyzer. Provide actionable feedback to improve resume ATS compatibility.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.5,
        max_tokens: 600,
        response_format: { type: 'json_object' }
      });

      return JSON.parse(completion.choices[0].message.content);
    } catch (error) {
      console.error('Error analyzing ATS score:', error);
      throw new Error('Failed to analyze ATS score');
    }
  }

  // Get skill suggestions based on job title and industry
  async suggestSkills(jobTitle, industry, currentSkills = []) {
    try {
      const prompt = `Suggest relevant skills for a ${jobTitle} position in the ${industry} industry.

Current skills: ${currentSkills.join(', ')}

Provide 8-10 additional skills that would be valuable for this role, focusing on:
- Technical skills
- Soft skills
- Industry-specific tools/technologies
- Certifications to consider

Return as a simple comma-separated list.`;

      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a career development expert. Suggest relevant skills that enhance career prospects.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.6,
        max_tokens: 300
      });

      const response = completion.choices[0].message.content.trim();
      return response.split(',').map(skill => skill.trim()).filter(skill => skill);
    } catch (error) {
      console.error('Error suggesting skills:', error);
      throw new Error('Failed to suggest skills');
    }
  }

  // Generate cover letter
  async generateCoverLetter(resume, jobDescription, companyName) {
    try {
      const resumeText = this._resumeToText(resume);

      const prompt = `Generate a professional cover letter based on:

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

COMPANY:
${companyName}

Write a compelling cover letter that:
- Is 3-4 paragraphs
- Highlights relevant experience
- Shows enthusiasm for the role
- Demonstrates knowledge of the company
- Includes a strong closing

Format as plain text, ready to use.`;

      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4',
        messages: [
          { role: 'system', content: 'You are an expert cover letter writer. Create personalized, compelling cover letters that get interviews.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 800
      });

      return completion.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error generating cover letter:', error);
      throw new Error('Failed to generate cover letter');
    }
  }

  // Helper: Convert resume object to text
  _resumeToText(resume) {
    let text = '';

    if (resume.personalInfo) {
      text += `${resume.personalInfo.firstName} ${resume.personalInfo.lastName}\n`;
      text += `${resume.personalInfo.email} | ${resume.personalInfo.phone}\n\n`;
    }

    if (resume.professionalSummary) {
      text += `PROFESSIONAL SUMMARY\n${resume.professionalSummary}\n\n`;
    }

    if (resume.experience && resume.experience.length > 0) {
      text += `EXPERIENCE\n`;
      resume.experience.forEach(exp => {
        text += `${exp.title} at ${exp.company}\n`;
        if (exp.achievements) {
          exp.achievements.forEach(achievement => {
            text += `- ${achievement}\n`;
          });
        }
        text += '\n';
      });
    }

    if (resume.education && resume.education.length > 0) {
      text += `EDUCATION\n`;
      resume.education.forEach(edu => {
        text += `${edu.degree} in ${edu.field} - ${edu.institution}\n`;
      });
      text += '\n';
    }

    if (resume.skills && resume.skills.length > 0) {
      text += `SKILLS\n`;
      resume.skills.forEach(skillCat => {
        text += `${skillCat.category}: ${skillCat.items.map(i => i.name).join(', ')}\n`;
      });
    }

    return text;
  }
}

module.exports = new AIResumeService();
