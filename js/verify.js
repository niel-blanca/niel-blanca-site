// ========================================
// PAMASKO QUIZ 2025 - VERIFICATION PAGE
// Ninong/Ninang verification portal logic
// ========================================

const VerifyApp = {
    currentSession: null,
    
    /**
     * Initialize verification app
     */
    init: function() {
        log('Initializing Verification Portal...');
        this.setupEventListeners();
        this.checkURLParams();
    },
    
    /**
     * Setup event listeners
     */
    setupEventListeners: function() {
        const verifyBtn = document.getElementById('verifyBtn');
        const input = document.getElementById('verificationCodeInput');
        const approveBtn = document.getElementById('approveBtn');
        const adjustBtn = document.getElementById('adjustBtn');
        const closeAdjustBtn = document.getElementById('closeAdjustBtn');
        const saveAdjustBtn = document.getElementById('saveAdjustBtn');
        const cancelAdjustBtn = document.getElementById('cancelAdjustBtn');
        
        if (verifyBtn) {
            verifyBtn.addEventListener('click', () => this.verifyCode());
        }
        
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.verifyCode();
                }
            });
            
            // Auto-format input
            input.addEventListener('input', (e) => {
                let value = e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, '');
                if (value.length > 13) value = value.substring(0, 13);
                e.target.value = value;
            });
        }
        
        if (approveBtn) {
            approveBtn.addEventListener('click', () => this.approveSession());
        }
        
        if (adjustBtn) {
            adjustBtn.addEventListener('click', () => this.showAdjustModal());
        }
        
        if (closeAdjustBtn) {
            closeAdjustBtn.addEventListener('click', () => this.hideAdjustModal());
        }
        
        if (saveAdjustBtn) {
            saveAdjustBtn.addEventListener('click', () => this.saveAdjustment());
        }
        
        if (cancelAdjustBtn) {
            cancelAdjustBtn.addEventListener('click', () => this.hideAdjustModal());
        }
    },
    
    /**
     * Check URL parameters for auto-verification
     */
    checkURLParams: function() {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        
        if (code) {
            document.getElementById('verificationCodeInput').value = code;
            this.verifyCode();
        }
    },
    
    /**
     * Verify code and display results
     */
    verifyCode: function() {
        const input = document.getElementById('verificationCodeInput');
        const code = input.value.trim().toUpperCase();
        
        if (!code) {
            this.showMessage('Please enter a verification code.', 'error');
            return;
        }
        
        if (!code.startsWith('PMSK-') || code.length !== 13) {
            this.showMessage('Invalid code format. Code should be: PMSK-XXXXXXXX', 'error');
            return;
        }
        
        log('Verifying code:', code);
        
        // Get session from storage
        const session = StorageManager.getByVerificationCode(code);
        
        if (!session) {
            this.showMessage('❌ Verification Failed! Code not found. Please check the code and try again.', 'error');
            this.hideResult();
            return;
        }
        
        // Success - display results
        this.currentSession = session;
        this.showMessage('✅ Verification Successful! Quiz results found.', 'success');
        this.displayResults(session);
    },
    
    /**
     * Display verification results
     */
    displayResults: function(session) {
        const { score, prize, answers, questions, timestamp, verificationCode, approved } = session;
        
        // Show result section
        document.getElementById('verifiedResult').classList.remove('hidden');
        
        // Fill basic info
        document.getElementById('verifiedCode').textContent = verificationCode;
        document.getElementById('verifiedDate').textContent = new Date(timestamp).toLocaleString();
        document.getElementById('verifiedScore').textContent = `${score.percentage}%`;
        
        const prizeAmount = session.adjustedAmount || prize.amount;
        document.getElementById('verifiedPrize').textContent = `₱${prizeAmount}`;
        if (session.adjustedAmount) {
            document.getElementById('verifiedPrize').innerHTML += 
                ` <small style="color: #f39c12;">(Adjusted)</small>`;
        }
        
        // Fill performance summary
        document.getElementById('verifiedRawScore').textContent = `${score.raw}/${score.possible}`;
        document.getElementById('verifiedGrade').textContent = score.grade;
        document.getElementById('verifiedTrait').textContent = this.formatTrait(score.dominantTrait);
        document.getElementById('verifiedTier').textContent = this.getTierName(score.percentage);
        
        // Fill category breakdown
        this.displayCategories(score.categories);
        
        // Fill answer details
        this.displayAnswers(answers, questions);
        
        // Update approval status
        this.updateApprovalStatus(approved);
        
        // Scroll to results
        document.getElementById('verifyResultSection').scrollIntoView({ behavior: 'smooth' });
    },
    
    /**
     * Display category breakdown
     */
    displayCategories: function(categories) {
        const container = document.getElementById('categoryChart');
        container.innerHTML = '';
        
        const sortedCategories = Object.entries(categories)
            .map(([name, data]) => ({ name, ...data }))
            .sort((a, b) => b.percentage - a.percentage);
        
        sortedCategories.forEach(cat => {
            const item = document.createElement('div');
            item.className = 'category-item';
            item.innerHTML = `
                <div class="category-name">
                    <span>${this.formatCategory(cat.name)}</span>
                    <span>${cat.percentage}%</span>
                </div>
                <div class="category-bar">
                    <div class="category-bar-fill" style="width: ${cat.percentage}%"></div>
                </div>
            `;
            container.appendChild(item);
        });
    },
    
    /**
     * Display answer details
     */
    displayAnswers: function(answers, questionIds) {
        const container = document.getElementById('answersList');
        container.innerHTML = '';
        
        answers.forEach((answer, index) => {
            const question = QUESTION_BANK.find(q => q.id === answer.questionId);
            if (!question) return;
            
            const maxPoints = 5;
            const badge = this.getAnswerBadge(answer.value, maxPoints);
            
            const item = document.createElement('div');
            item.className = 'answer-item';
            item.innerHTML = `
                <div class="answer-question">
                    ${index + 1}. ${question.text}
                </div>
                <div class="answer-response">
                    <span class="answer-badge ${badge.class}">${badge.text}</span>
                    <span class="answer-points">${answer.value}/${maxPoints} points</span>
                </div>
                <div class="answer-choice">
                    <strong>Selected:</strong> ${answer.text}
                </div>
                <div class="answer-trait">
                    Trait: ${this.formatTrait(answer.trait)}
                </div>
            `;
            container.appendChild(item);
        });
    },
    
    /**
     * Get answer badge based on points
     */
    getAnswerBadge: function(points, max) {
        const percentage = (points / max) * 100;
        
        if (percentage >= 80) {
            return { text: '✓ Excellent', class: 'correct' };
        } else if (percentage >= 50) {
            return { text: '○ Good', class: 'partial' };
        } else {
            return { text: '✗ Needs Work', class: 'wrong' };
        }
    },
    
    /**
     * Update approval status
     */
    updateApprovalStatus: function(approved) {
        const approveBtn = document.getElementById('approveBtn');
        
        if (approved) {
            approveBtn.textContent = '✓ Already Approved';
            approveBtn.disabled = true;
            approveBtn.style.opacity = '0.6';
        } else {
            approveBtn.textContent = '✓ Approve & Give Aguinaldo';
            approveBtn.disabled = false;
            approveBtn.style.opacity = '1';
        }
    },
    
    /**
     * Approve session
     */
    approveSession: function() {
        if (!this.currentSession) return;
        
        const code = this.currentSession.verificationCode;
        const success = StorageManager.approveSession(code);
        
        if (success) {
            alert('✅ Approved! The inaanak can now claim their aguinaldo!');
            this.currentSession.approved = true;
            this.updateApprovalStatus(true);
        } else {
            alert('❌ Failed to approve. Please try again.');
        }
    },
    
    /**
     * Show adjust modal
     */
    showAdjustModal: function() {
        if (!this.currentSession) return;
        
        const modal = document.getElementById('adjustModal');
        const input = document.getElementById('adjustAmount');
        
        input.value = this.currentSession.adjustedAmount || this.currentSession.prize.amount;
        modal.classList.remove('hidden');
    },
    
    /**
     * Hide adjust modal
     */
    hideAdjustModal: function() {
        document.getElementById('adjustModal').classList.add('hidden');
    },
    
    /**
     * Save adjustment
     */
    saveAdjustment: function() {
        if (!this.currentSession) return;
        
        const amount = parseInt(document.getElementById('adjustAmount').value);
        const reason = document.getElementById('adjustReason').value;
        
        if (isNaN(amount) || amount < 20 || amount > 1000) {
            alert('Please enter a valid amount between ₱20 and ₱1000');
            return;
        }
        
        const code = this.currentSession.verificationCode;
        const success = StorageManager.approveSession(code, amount, reason);
        
        if (success) {
            alert(`✅ Amount adjusted to ₱${amount}!`);
            this.currentSession.adjustedAmount = amount;
            this.currentSession.adjustReason = reason;
            this.currentSession.approved = true;
            
            // Update display
            document.getElementById('verifiedPrize').innerHTML = 
                `₱${amount} <small style="color: #f39c12;">(Adjusted)</small>`;
            this.updateApprovalStatus(true);
            this.hideAdjustModal();
        } else {
            alert('❌ Failed to save adjustment. Please try again.');
        }
    },
    
    /**
     * Show message
     */
    showMessage: function(text, type) {
        const messageEl = document.getElementById('verifyMessage');
        messageEl.textContent = text;
        messageEl.className = `verify-message ${type}`;
        messageEl.classList.remove('hidden');
        
        document.getElementById('verifyResultSection').classList.remove('hidden');
    },
    
    /**
     * Hide result
     */
    hideResult: function() {
        document.getElementById('verifiedResult').classList.add('hidden');
    },
    
    /**
     * Get tier name from percentage
     */
    getTierName: function(percentage) {
        if (percentage >= CONFIG.THRESHOLDS.EXCEPTIONAL) return 'Exceptional';
        if (percentage >= CONFIG.THRESHOLDS.OUTSTANDING) return 'Outstanding';
        if (percentage >= CONFIG.THRESHOLDS.GREAT) return 'Great';
        if (percentage >= CONFIG.THRESHOLDS.NEEDS_IMPROVEMENT) return 'Needs Improvement';
        return 'Critical';
    },
    
    /**
     * Format category name
     */
    formatCategory: function(category) {
        return category
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    },
    
    /**
     * Format trait name
     */
    formatTrait: function(trait) {
        return trait
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    VerifyApp.init();
});

// Export for debugging
if (typeof window !== 'undefined') {
    window.VerifyApp = VerifyApp;
}