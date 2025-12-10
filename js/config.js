// ========================================
// PAMASKO QUIZ 2025 - CONFIGURATION
// Central configuration file
// ========================================

const CONFIG = {
    // Quiz Settings
    BASE_AMOUNT: 500,
    MIN_AMOUNT: 20,
    MAX_AMOUNT: 500,
    TOTAL_QUESTIONS: 10,
    
    // Storage Keys
    STORAGE_KEY: 'pamasko_quiz_sessions_v2',
    
    // Animation Timings (ms)
    ANIMATION_DELAY: 300,
    LOADING_MIN_TIME: 1000,
    RESULT_DELAY: 500,
    
    // Score Thresholds
    THRESHOLDS: {
        EXCEPTIONAL: 90,
        OUTSTANDING: 75,
        GREAT: 60,
        NEEDS_IMPROVEMENT: 45,
        CRITICAL: 0
    },
    
    // Bonus/Penalty Amounts
    BONUS: {
        EXCEPTIONAL: 100,
        OUTSTANDING: 50,
        GREAT: 25,
        PENALTY: -50
    },
    
    // App Info
    VERSION: '2.0.0',
    AUTHOR: 'Niel Blanca',
    YEAR: 2025,
    
    // Debug Mode
    DEBUG: false
};

// Helper Functions
const log = (...args) => {
    if (CONFIG.DEBUG) {
        console.log('[Pamasko Quiz]', ...args);
    }
};

const error = (...args) => {
    console.error('[Pamasko Quiz ERROR]', ...args);
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG, log, error };
}