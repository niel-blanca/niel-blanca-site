// ========================================
// PAMASKO QUIZ 2025 - STORAGE MANAGER
// Enhanced with verification code system
// ========================================

const StorageManager = {
    /**
     * Generate unique verification code
     * @returns {string} Verification code in format PMSK-XXXXXXXX
     */
    generateVerificationCode: function() {
        const timestamp = Date.now().toString();
        const random = Math.random().toString(36).substring(2, 6).toUpperCase();
        const code = `PMSK-${timestamp.slice(-4)}${random}`;
        return code;
    },
    
    /**
     * Save a quiz session to local storage with verification code
     * @param {Object} sessionData - Session data to save
     * @returns {Object} Saved session with verification code
     */
    save: function(sessionData) {
        try {
            const sessions = this.getAll();
            const verificationCode = this.generateVerificationCode();
            
            const newSession = {
                ...sessionData,
                verificationCode,
                timestamp: new Date().toISOString(),
                id: Date.now(),
                version: CONFIG.VERSION,
                approved: false,
                adjustedAmount: null,
                adjustReason: null
            };
            
            sessions.push(newSession);
            
            // Keep only last 100 sessions
            const limitedSessions = sessions.slice(-100);
            
            localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(limitedSessions));
            log('Session saved with code:', verificationCode);
            return newSession;
        } catch (e) {
            error('Failed to save session:', e);
            return null;
        }
    },
    
    /**
     * Get all saved sessions
     * @returns {Array} Array of session objects
     */
    getAll: function() {
        try {
            const data = localStorage.getItem(CONFIG.STORAGE_KEY);
            if (!data) return [];
            
            const sessions = JSON.parse(data);
            log('Retrieved sessions:', sessions.length);
            return Array.isArray(sessions) ? sessions : [];
        } catch (e) {
            error('Failed to retrieve sessions:', e);
            return [];
        }
    },
    
    /**
     * Get session by verification code
     * @param {string} code - Verification code
     * @returns {Object|null} Session object or null
     */
    getByVerificationCode: function(code) {
        const sessions = this.getAll();
        const normalizedCode = code.trim().toUpperCase();
        const session = sessions.find(s => s.verificationCode === normalizedCode);
        
        if (session) {
            log('Session found for code:', normalizedCode);
        } else {
            log('No session found for code:', normalizedCode);
        }
        
        return session || null;
    },
    
    /**
     * Approve a session (mark as approved by Ninong/Ninang)
     * @param {string} code - Verification code
     * @param {number} adjustedAmount - Optional adjusted amount
     * @param {string} adjustReason - Reason for adjustment
     * @returns {boolean} Success status
     */
    approveSession: function(code, adjustedAmount = null, adjustReason = null) {
        try {
            const sessions = this.getAll();
            const normalizedCode = code.trim().toUpperCase();
            const sessionIndex = sessions.findIndex(s => s.verificationCode === normalizedCode);
            
            if (sessionIndex === -1) {
                error('Session not found for approval:', normalizedCode);
                return false;
            }
            
            sessions[sessionIndex].approved = true;
            sessions[sessionIndex].approvalDate = new Date().toISOString();
            
            if (adjustedAmount !== null) {
                sessions[sessionIndex].adjustedAmount = adjustedAmount;
                sessions[sessionIndex].adjustReason = adjustReason;
            }
            
            localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(sessions));
            log('Session approved:', normalizedCode);
            return true;
        } catch (e) {
            error('Failed to approve session:', e);
            return false;
        }
    },
    
    /**
     * Get the last session
     * @returns {Object|null} Last session or null
     */
    getLast: function() {
        const sessions = this.getAll();
        return sessions.length > 0 ? sessions[sessions.length - 1] : null;
    },
    
    /**
     * Get session by ID
     * @param {number} id - Session ID
     * @returns {Object|null} Session object or null
     */
    getById: function(id) {
        const sessions = this.getAll();
        return sessions.find(s => s.id === id) || null;
    },
    
    /**
     * Clear all sessions
     */
    clear: function() {
        try {
            localStorage.removeItem(CONFIG.STORAGE_KEY);
            log('All sessions cleared');
            return true;
        } catch (e) {
            error('Failed to clear sessions:', e);
            return false;
        }
    },
    
    /**
     * Delete a specific session
     * @param {number} id - Session ID to delete
     */
    deleteById: function(id) {
        try {
            const sessions = this.getAll();
            const filtered = sessions.filter(s => s.id !== id);
            localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(filtered));
            log('Session deleted:', id);
            return true;
        } catch (e) {
            error('Failed to delete session:', e);
            return false;
        }
    },
    
    /**
     * Get statistics from all sessions
     * @returns {Object} Statistics object
     */
    getStats: function() {
        const sessions = this.getAll();
        
        if (sessions.length === 0) {
            return {
                totalAttempts: 0,
                averageScore: 0,
                highestScore: 0,
                lowestScore: 0,
                totalPrize: 0,
                averagePrize: 0,
                approvedCount: 0
            };
        }
        
        const scores = sessions.map(s => s.score?.percentage || 0);
        const prizes = sessions.map(s => s.prize?.amount || 0);
        const approvedSessions = sessions.filter(s => s.approved);
        
        return {
            totalAttempts: sessions.length,
            averageScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
            highestScore: Math.max(...scores),
            lowestScore: Math.min(...scores),
            totalPrize: prizes.reduce((a, b) => a + b, 0),
            averagePrize: Math.round(prizes.reduce((a, b) => a + b, 0) / prizes.length),
            lastAttempt: sessions[sessions.length - 1].timestamp,
            approvedCount: approvedSessions.length,
            pendingCount: sessions.length - approvedSessions.length
        };
    },
    
    /**
     * Export sessions as JSON
     * @returns {string} JSON string of all sessions
     */
    export: function() {
        const sessions = this.getAll();
        return JSON.stringify(sessions, null, 2);
    },
    
    /**
     * Import sessions from JSON
     * @param {string} jsonData - JSON string to import
     */
    import: function(jsonData) {
        try {
            const sessions = JSON.parse(jsonData);
            if (!Array.isArray(sessions)) {
                throw new Error('Invalid data format');
            }
            localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(sessions));
            log('Sessions imported:', sessions.length);
            return true;
        } catch (e) {
            error('Failed to import sessions:', e);
            return false;
        }
    },
    
    /**
     * Check if storage is available
     * @returns {boolean} True if storage is available
     */
    isAvailable: function() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { StorageManager };
}