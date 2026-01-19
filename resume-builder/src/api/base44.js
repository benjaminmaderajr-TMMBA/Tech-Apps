// Base44 API Service for Resume Builder
const API_BASE = 'https://app.base44.com/api/apps/696de0b11bfe69eafdf170e0';
const API_KEY = '9a6d10b6458349ea85f3a8f90f9f2169';

const headers = {
  'api_key': API_KEY,
  'Content-Type': 'application/json'
};

/**
 * Fetch all resumes from Base44
 * @param {Object} filters - Optional filters for querying resumes
 * @returns {Promise<Array>} Array of resume objects
 */
export async function fetchResumes(filters = {}) {
  try {
    let url = `${API_BASE}/entities/Resume`;

    // Add query parameters if filters are provided
    if (Object.keys(filters).length > 0) {
      const params = new URLSearchParams(filters);
      url += `?${params.toString()}`;
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`Failed to fetch resumes: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching resumes:', error);
    throw error;
  }
}

/**
 * Fetch a single resume by ID
 * @param {string} entityId - The resume entity ID
 * @returns {Promise<Object>} Resume object
 */
export async function fetchResume(entityId) {
  try {
    const response = await fetch(`${API_BASE}/entities/Resume/${entityId}`, { headers });

    if (!response.ok) {
      throw new Error(`Failed to fetch resume: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching resume:', error);
    throw error;
  }
}

/**
 * Create a new resume
 * @param {Object} resumeData - Resume data object
 * @returns {Promise<Object>} Created resume object
 */
export async function createResume(resumeData) {
  try {
    const response = await fetch(`${API_BASE}/entities/Resume`, {
      method: 'POST',
      headers,
      body: JSON.stringify(resumeData)
    });

    if (!response.ok) {
      throw new Error(`Failed to create resume: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating resume:', error);
    throw error;
  }
}

/**
 * Update an existing resume
 * @param {string} entityId - The resume entity ID
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>} Updated resume object
 */
export async function updateResume(entityId, updateData) {
  try {
    const response = await fetch(`${API_BASE}/entities/Resume/${entityId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(updateData)
    });

    if (!response.ok) {
      throw new Error(`Failed to update resume: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating resume:', error);
    throw error;
  }
}

/**
 * Delete a resume
 * @param {string} entityId - The resume entity ID
 * @returns {Promise<void>}
 */
export async function deleteResume(entityId) {
  try {
    const response = await fetch(`${API_BASE}/entities/Resume/${entityId}`, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) {
      throw new Error(`Failed to delete resume: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting resume:', error);
    throw error;
  }
}

/**
 * Fetch resume by public link ID
 * @param {string} publicLinkId - The public link ID
 * @returns {Promise<Object>} Resume object
 */
export async function fetchResumeByPublicLink(publicLinkId) {
  try {
    const resumes = await fetchResumes({ public_link_id: publicLinkId });
    return resumes.length > 0 ? resumes[0] : null;
  } catch (error) {
    console.error('Error fetching resume by public link:', error);
    throw error;
  }
}

/**
 * Generate a unique public link ID
 * @returns {string} Random public link ID
 */
export function generatePublicLinkId() {
  return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15);
}
