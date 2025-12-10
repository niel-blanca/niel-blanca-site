// ========================================
// PAMASKO QUIZ 2025 - MESSAGE GENERATOR
// Intelligent, personalized messaging system
// ========================================

const MessageGenerator = {
    /**
     * Generate complete message based on score and behavior
     * @param {Object} scoreData - Score data
     * @param {Object} prizeData - Prize calculation data
     * @returns {Object} Message data
     */
    generate: function(scoreData, prizeData) {
        const { percentage, dominantTrait, categories, behaviorFlags } = scoreData;
        
        // Determine message tier
        const tier = this._determineTier(percentage);
        
        // Get category insights
        const insights = ScoringEngine.getCategoryInsights(categories);
        
        // Generate components
        const title = this._generateTitle(tier, percentage);
        const assessment = this._generateAssessment(tier, percentage, dominantTrait, insights);
        const motivation = this._generateMotivation(tier, dominantTrait);
        const actionPlan = this._generateActionPlan(tier, insights, behaviorFlags);
        const categoryInsights = this._formatCategoryInsights(insights, dominantTrait);
        
        return {
            title,
            assessment,
            motivation,
            actionPlan,
            insights: categoryInsights,
            tier
        };
    },
    
    /**
     * Determine message tier based on score
     * @private
     */
    _determineTier: function(percentage) {
        if (percentage >= CONFIG.THRESHOLDS.EXCEPTIONAL) return 'exceptional';
        if (percentage >= CONFIG.THRESHOLDS.OUTSTANDING) return 'outstanding';
        if (percentage >= CONFIG.THRESHOLDS.GREAT) return 'great';
        if (percentage >= CONFIG.THRESHOLDS.NEEDS_IMPROVEMENT) return 'needs_improvement';
        return 'critical';
    },
    
    /**
     * Generate title with emoji
     * @private
     */
    _generateTitle: function(tier, percentage) {
        const titles = {
            exceptional: '🌟 EXCEPTIONAL INAANAK! WORLD-CLASS! 🌟',
            outstanding: '⭐ OUTSTANDING INAANAK! EXCELLENT! ⭐',
            great: '💪 GREAT POTENTIAL! KEEP GOING! 💪',
            needs_improvement: '📚 NEEDS IMPROVEMENT - LET\'S WORK TOGETHER! 📚',
            critical: '🚨 URGENT: WAKE-UP CALL NEEDED! 🚨'
        };
        
        return titles[tier] || titles.great;
    },
    
    /**
     * Generate assessment message
     * @private
     */
    _generateAssessment: function(tier, percentage, trait, insights) {
        const messages = {
            exceptional: `Grabe ka! You scored ${percentage}%! Your dominant trait "${trait}" is exceptional. You're not just good - you're WORLD-CLASS! ${insights.strength ? `Your strength in ${insights.strength.category} (${insights.strength.percentage}%) is outstanding!` : ''}`,
            
            outstanding: `Ang galing! You achieved ${percentage}%! You show strong "${trait}" qualities. Almost perfect na! ${insights.strength ? `Your ${insights.strength.category} skills (${insights.strength.percentage}%) are impressive!` : ''}`,
            
            great: `Good job! You scored ${percentage}%. You're "${trait}" but need consistency. ${insights.weakness ? `Your ${insights.weakness.category} (${insights.weakness.percentage}%) needs attention.` : 'Small improvements will make you unstoppable!'}`,
            
            needs_improvement: `You scored ${percentage}%. This shows you're struggling in some areas, particularly with "${trait}" behaviors. ${insights.weakness ? `Your ${insights.weakness.category} (${insights.weakness.percentage}%) is a major concern.` : ''} But it's NOT too late to turn things around!`,
            
            critical: `Critical score: ${percentage}%. Multiple red flags detected in "${trait}" behavior. ${insights.weakness ? `Your ${insights.weakness.category} (${insights.weakness.percentage}%) needs IMMEDIATE attention.` : ''} This is a serious wake-up call, but change is still possible TODAY!`
        };
        
        return messages[tier] || messages.great;
    },
    
    /**
     * Generate motivation message
     * @private
     */
    _generateMotivation: function(tier, trait) {
        const messages = {
            exceptional: `You're not just living, you're THRIVING! Your character, discipline, and heart are top-tier. You're already a leader, even if you don't realize it yet. Keep shining - the world needs more people like you! Your "${trait}" nature inspires everyone around you.`,
            
            outstanding: `You're doing EXCELLENT! Small improvements here and there will make you unstoppable. Your foundation is rock-solid. A few tweaks in weak areas, and you'll be world-class. Never stop growing! Your "${trait}" quality is your superpower.`,
            
            great: `You have MASSIVE potential waiting to explode! Right now you're a seed - with the right care, you'll become a mighty tree! Don't settle for "good enough" when greatness is within reach. Channel your "${trait}" trait into positive actions!`,
            
            needs_improvement: `Real talk: You're off track. But OFF-TRACK ≠ LOST! Every great person had setbacks. What matters? Getting back up! I BELIEVE you can turn everything around. Your "${trait}" tendencies can be redirected toward success. Start today!`,
            
            critical: `This isn't a joke anymore. Your choices are leading down a dangerous path. But it's NOT too late! Right now, TODAY, you can turn everything around. It requires COMMITMENT and ACTION. Your family loves you - let them help you change your "${trait}" patterns!`
        };
        
        return messages[tier] || messages.great;
    },
    
    /**
     * Generate action plan
     * @private
     */
    _generateActionPlan: function(tier, insights, flags) {
        const plans = {
            exceptional: `🎯 CHALLENGE FOR YOU: (1) Mentor someone younger - share your habits and wisdom. (2) Set an even higher goal for next quarter. (3) Document your routine to help others learn. Your success can multiply through others!`,
            
            outstanding: `📈 NEXT LEVEL PLAN: (1) Identify your 2-3 weak spots. (2) Focus on improving ONE area per month. (3) Track progress daily in a journal. (4) Celebrate small wins. Before you know it, you'll be perfect! You're so close!`,
            
            great: `🎯 30-DAY TRANSFORMATION: (1) Choose ONE habit to improve this month. (2) Pick ONE skill to build. (3) Find an accountability partner. (4) Track daily progress. Small daily wins = BIG life changes! ${insights.weakness ? `Start with ${insights.weakness.category}.` : ''}`,
            
            needs_improvement: `🚨 IMMEDIATE ACTION NEEDED: (1) Family talk TODAY - be honest about struggles. (2) List 3 things to change immediately. (3) Ask for help from parents, teachers, or counselors. (4) Delete negative influences. ${flags.length > 0 ? `Priority: Address ${flags[0].category} issues.` : ''} We're here to help you!`,
            
            critical: `⚡ EMERGENCY PLAN: (1) Parents meeting NOW - no delays! (2) Consider professional counseling. (3) Complete routine reset required. (4) Remove ALL bad influences immediately. (5) Daily check-ins with family. ${flags.length > 0 ? `Critical concerns: ${flags.slice(0,2).map(f => f.category).join(', ')}.` : ''} This is your moment - take it SERIOUSLY!`
        };
        
        return plans[tier] || plans.great;
    },
    
    /**
     * Format category insights
     * @private
     */
    _formatCategoryInsights: function(insights, trait) {
        const result = [];
        
        if (insights.strength) {
            result.push(`💪 Strength: ${this._formatCategory(insights.strength.category)} (${insights.strength.percentage}%)`);
        }
        
        if (insights.weakness) {
            result.push(`📍 Focus Area: ${this._formatCategory(insights.weakness.category)} (${insights.weakness.percentage}%)`);
        }
        
        result.push(`🎯 Dominant Trait: ${this._formatTrait(trait)}`);
        
        if (insights.needsWork.length > 0) {
            const categories = insights.needsWork.map(c => this._formatCategory(c.category)).join(', ');
            result.push(`⚠️ Needs Work: ${categories}`);
        }
        
        return result;
    },
    
    /**
     * Format category name for display
     * @private
     */
    _formatCategory: function(category) {
        return category
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    },
    
    /**
     * Format trait name for display
     * @private
     */
    _formatTrait: function(trait) {
        return trait
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    },
    
    /**
     * Generate humor/encouragement based on score
     * @param {number} percentage - Score percentage
     * @returns {string} Encouraging message
     */
    generateEncouragement: function(percentage) {
        if (percentage >= 90) {
            return "Ninong/Ninang is doing a happy dance! 💃🕺";
        } else if (percentage >= 75) {
            return "Ninong/Ninang is proud of you! Keep it up! 👏";
        } else if (percentage >= 60) {
            return "Good start! Let's work together to improve! 🤝";
        } else if (percentage >= 45) {
            return "We have work to do, but I believe in you! 💪";
        } else {
            return "Time for a serious talk. But I'm here to help! 💚";
        }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MessageGenerator };
}