// ========================================
// PAMASKO QUIZ 2025 - SCORING ENGINE
// Intelligent scoring and prize calculation
// ========================================

const ScoringEngine = {
    /**
     * Calculate comprehensive score from answers
     * @param {Array} answers - Array of answer objects
     * @param {Array} questions - Array of question objects
     * @returns {Object} Score data object
     */
    calculateScore: function(answers, questions) {
        const totalPossible = answers.length * 5; // Max 5 points per question
        const actualScore = answers.reduce((sum, ans) => sum + ans.value, 0);
        const percentage = Math.round((actualScore / totalPossible) * 100);
        
        // Category breakdown
        const categories = this._analyzCategories(answers, questions);
        
        // Trait analysis
        const traits = this._analyzeTraits(answers);
        
        // Behavior flags (areas of concern)
        const behaviorFlags = this._identifyBehaviorFlags(answers, questions);
        
        return {
            raw: actualScore,
            possible: totalPossible,
            percentage,
            categories,
            dominantTrait: traits.dominant,
            traits: traits.all,
            behaviorFlags,
            grade: this._calculateGrade(percentage)
        };
    },
    
    /**
     * Calculate prize amount based on score
     * @param {Object} scoreData - Score data from calculateScore
     * @returns {Object} Prize data object
     */
    calculatePrize: function(scoreData) {
        const { percentage } = scoreData;
        const baseAmount = CONFIG.BASE_AMOUNT;
        
        // Base multiplier from percentage
        let multiplier = percentage / 100;
        
        // Bonus/penalty system
        let bonus = 0;
        let bonusReason = '';
        
        if (percentage >= CONFIG.THRESHOLDS.EXCEPTIONAL) {
            bonus = CONFIG.BONUS.EXCEPTIONAL;
            bonusReason = 'Exceptional Performance Bonus';
        } else if (percentage >= CONFIG.THRESHOLDS.OUTSTANDING) {
            bonus = CONFIG.BONUS.OUTSTANDING;
            bonusReason = 'Outstanding Achievement Bonus';
        } else if (percentage >= CONFIG.THRESHOLDS.GREAT) {
            bonus = CONFIG.BONUS.GREAT;
            bonusReason = 'Great Effort Bonus';
        } else if (percentage < CONFIG.THRESHOLDS.NEEDS_IMPROVEMENT) {
            bonus = CONFIG.BONUS.PENALTY;
            bonusReason = 'Needs Improvement Adjustment';
        }
        
        // Calculate final amount
        let finalAmount = Math.round(baseAmount * multiplier + bonus);
        
        // Enforce min/max limits
        finalAmount = Math.max(CONFIG.MIN_AMOUNT, Math.min(CONFIG.MAX_AMOUNT, finalAmount));
        
        return {
            amount: finalAmount,
            baseAmount,
            multiplier: Math.round(multiplier * 100),
            bonus,
            bonusReason,
            breakdown: {
                base: Math.round(baseAmount * multiplier),
                bonus: bonus,
                total: finalAmount
            }
        };
    },
    
    /**
     * Analyze answers by category
     * @private
     */
    _analyzCategories: function(answers, questions) {
        const categories = {};
        
        answers.forEach(ans => {
            const question = questions.find(q => q.id === ans.questionId);
            if (!question) return;
            
            const cat = question.category;
            if (!categories[cat]) {
                categories[cat] = {
                    total: 0,
                    count: 0,
                    max: 0
                };
            }
            
            categories[cat].total += ans.value;
            categories[cat].count += 1;
            categories[cat].max += 5;
        });
        
        // Calculate averages and percentages
        Object.keys(categories).forEach(cat => {
            const data = categories[cat];
            data.average = data.total / data.count;
            data.percentage = Math.round((data.total / data.max) * 100);
        });
        
        return categories;
    },
    
    /**
     * Analyze personality traits from answers
     * @private
     */
    _analyzeTraits: function(answers) {
        const traitCounts = {};
        
        answers.forEach(ans => {
            if (ans.trait) {
                traitCounts[ans.trait] = (traitCounts[ans.trait] || 0) + 1;
            }
        });
        
        // Sort by frequency
        const sorted = Object.entries(traitCounts)
            .sort((a, b) => b[1] - a[1]);
        
        const dominant = sorted[0] ? sorted[0][0] : 'balanced';
        
        return {
            all: traitCounts,
            dominant,
            top3: sorted.slice(0, 3).map(t => t[0])
        };
    },
    
    /**
     * Identify behavior flags (concerns)
     * @private
     */
    _identifyBehaviorFlags: function(answers, questions) {
        const flags = [];
        
        answers.forEach(ans => {
            const question = questions.find(q => q.id === ans.questionId);
            if (!question) return;
            
            // Flag low scores in critical categories
            if (ans.value <= 1) {
                flags.push({
                    category: question.category,
                    concern: ans.trait,
                    severity: 5 - ans.value, // Higher severity for lower scores
                    question: question.text
                });
            }
        });
        
        return flags;
    },
    
    /**
     * Calculate letter grade
     * @private
     */
    _calculateGrade: function(percentage) {
        if (percentage >= 95) return 'A+';
        if (percentage >= 90) return 'A';
        if (percentage >= 85) return 'A-';
        if (percentage >= 80) return 'B+';
        if (percentage >= 75) return 'B';
        if (percentage >= 70) return 'B-';
        if (percentage >= 65) return 'C+';
        if (percentage >= 60) return 'C';
        if (percentage >= 55) return 'C-';
        if (percentage >= 50) return 'D';
        return 'F';
    },
    
    /**
     * Get strength and weakness categories
     * @param {Object} categories - Category data
     * @returns {Object} Strength and weakness info
     */
    getCategoryInsights: function(categories) {
        const entries = Object.entries(categories)
            .map(([cat, data]) => ({ category: cat, ...data }))
            .sort((a, b) => b.percentage - a.percentage);
        
        return {
            strength: entries[0] || null,
            weakness: entries[entries.length - 1] || null,
            needsWork: entries.filter(e => e.percentage < 60)
        };
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ScoringEngine };
}