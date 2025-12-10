// ========================================
// PAMASKO QUIZ 2025 - MAIN APPLICATION
// Complete quiz logic and UI management
// ========================================

// Application State
const App = {
    state: {
        currentQuestionIndex: 0,
        selectedQuestions: [],
        answers: [],
        scoreData: null,
        prizeData: null,
        messageData: null,
        isQuizActive: false
    },
    
    // Initialize Application
    init: function() {
        log('Initializing Pamasko Quiz...');
        
        // Check storage availability
        if (!StorageManager.isAvailable()) {
            error('Local storage not available!');
            alert('Warning: Your quiz history cannot be saved. Browser storage is disabled.');
        }
        
        // Hide loading screen after minimum time
        setTimeout(() => {
            this.hideLoading();
            this.startQuiz();
        }, CONFIG.LOADING_MIN_TIME);
        
        // Setup event listeners
        this.setupEventListeners();
    },
    
    // Setup Event Listeners
    setupEventListeners: function() {
        const restartBtn = document.getElementById('restartBtn');
        const historyBtn = document.getElementById('historyBtn');
        const closeHistoryBtn = document.getElementById('closeHistoryBtn');
        const clearHistoryBtn = document.getElementById('clearHistoryBtn');
        
        if (restartBtn) restartBtn.addEventListener('click', () => this.restart());
        if (historyBtn) historyBtn.addEventListener('click', () => this.showHistory());
        if (closeHistoryBtn) closeHistoryBtn.addEventListener('click', () => this.hideHistory());
        if (clearHistoryBtn) clearHistoryBtn.addEventListener('click', () => this.clearHistory());

        // Share button
        const shareBtn = document.getElementById('shareBtn');
        const closeShareBtn = document.getElementById('closeShareBtn');
        const downloadVoucherBtn = document.getElementById('downloadVoucherBtn');
        
        if (shareBtn) shareBtn.addEventListener('click', () => this.showShareModal());
        if (closeShareBtn) closeShareBtn.addEventListener('click', () => this.hideShareModal());
        if (downloadVoucherBtn) downloadVoucherBtn.addEventListener('click', () => this.downloadVoucher());
    },
    
    // Start Quiz
    startQuiz: function() {
        log('Starting new quiz...');
        
        // Reset state
        this.state = {
            currentQuestionIndex: 0,
            selectedQuestions: [],
            answers: [],
            scoreData: null,
            prizeData: null,
            messageData: null,
            isQuizActive: true
        };
        
        // Select random questions
        this.selectQuestions();
        
        // Show quiz section
        this.showSection('quizSection');
        
        // Render first question
        this.renderQuestion();
        
        // Update progress
        this.updateProgress();
    },
    
    // Select Random Questions
    selectQuestions: function() {
        const shuffled = [...QUESTION_BANK].sort(() => Math.random() - 0.5);
        this.state.selectedQuestions = shuffled.slice(0, CONFIG.TOTAL_QUESTIONS);
        log('Selected questions:', this.state.selectedQuestions.length);
    },
    
    // Render Current Question
    renderQuestion: function() {
        const question = this.state.selectedQuestions[this.state.currentQuestionIndex];
        
        if (!question) {
            error('No question to render!');
            return;
        }
        
        // Update question number
        document.getElementById('questionNumber').textContent = 
            `Question ${this.state.currentQuestionIndex + 1} of ${CONFIG.TOTAL_QUESTIONS}`;
        
        // Update category
        document.getElementById('questionCategory').textContent = 
            this.formatCategory(question.category);
        
        // Update question text with animation
        const questionEl = document.getElementById('questionText');
        questionEl.style.opacity = '0';
        setTimeout(() => {
            questionEl.textContent = question.text;
            questionEl.style.opacity = '1';
        }, 100);
        
        // Render answer options
        this.renderAnswerOptions(question);
        
        // Update fun fact
        document.getElementById('funFactText').textContent = question.insight;
        
        // Update progress
        this.updateProgress();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    // Render Answer Options
    renderAnswerOptions: function(question) {
        const container = document.getElementById('answerOptions');
        container.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'answer-option';
            optionDiv.style.animationDelay = `${index * 0.1}s`;
            
            optionDiv.innerHTML = `
                <div class="answer-number">${index + 1}</div>
                <div class="answer-text">${option.text}</div>
            `;
            
            optionDiv.addEventListener('click', () => this.handleAnswer(option, question));
            
            container.appendChild(optionDiv);
        });
    },
    
    // Handle Answer Selection
    handleAnswer: function(option, question) {
        // Record answer
        this.state.answers.push({
            questionId: question.id,
            category: question.category,
            value: option.value,
            trait: option.trait,
            text: option.text
        });
        
        log(`Answer recorded: Q${question.id} = ${option.value}pts`);
        
        // Move to next question or finish
        this.state.currentQuestionIndex++;
        
        if (this.state.currentQuestionIndex < this.state.selectedQuestions.length) {
            // Next question
            setTimeout(() => {
                this.renderQuestion();
            }, CONFIG.ANIMATION_DELAY);
        } else {
            // Quiz complete
            setTimeout(() => {
                this.finishQuiz();
            }, CONFIG.RESULT_DELAY);
        }
    },
    
    // Finish Quiz
    finishQuiz: function() {
        log('Quiz finished. Calculating results...');
        
        this.state.isQuizActive = false;
        
        // Calculate score
        this.state.scoreData = ScoringEngine.calculateScore(
            this.state.answers,
            this.state.selectedQuestions
        );
        
        // Calculate prize
        this.state.prizeData = ScoringEngine.calculatePrize(this.state.scoreData);
        
        // Generate message
        this.state.messageData = MessageGenerator.generate(
            this.state.scoreData,
            this.state.prizeData
        );
        
        // Save to storage
        StorageManager.save({
            score: this.state.scoreData,
            prize: this.state.prizeData,
            answers: this.state.answers,
            questions: this.state.selectedQuestions.map(q => q.id)
        });
        
        // Show results
        this.showResults();
    },
    
    // Show Results
    showResults: function() {
        this.showSection('resultSection');
        
        // Animate prize amount
        this.animatePrizeAmount();
        
        // Fill voucher data
        this.fillVoucherData();
        
        // Fill message data
        this.fillMessageData();
        
        // Update history counter
        this.updateHistoryCounter();
    },
    
    // Animate Prize Amount
    animatePrizeAmount: function() {
        const element = document.getElementById('prizeAmount');
        const target = this.state.prizeData.amount;
        
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const interval = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.round(current);
        }, interval);
    },
    
    // Fill Voucher Data
    fillVoucherData: function() {
        const { scoreData, prizeData } = this.state;
        
        // Prize bonus/penalty
        const bonusEl = document.getElementById('prizeBonus');
        if (prizeData.bonus !== 0) {
            bonusEl.textContent = prizeData.bonus > 0 ? 
                `+₱${prizeData.bonus} ${prizeData.bonusReason}` : 
                `${prizeData.bonus} ${prizeData.bonusReason}`;
            bonusEl.className = prizeData.bonus > 0 ? 'prize-bonus positive' : 'prize-bonus negative';
        }
        
        // Score title
        document.getElementById('scoreTitle').textContent = this.state.messageData.title;
        
        // Score info
        document.getElementById('scoreInfo').textContent = 
            `Score: ${scoreData.percentage}% | Grade: ${scoreData.grade} | Trait: ${this.formatTrait(scoreData.dominantTrait)}`;
        
        // Stats
        document.getElementById('statPoints').textContent = `${scoreData.raw}/${scoreData.possible}`;
        document.getElementById('statPercentage').textContent = `${scoreData.percentage}%`;
        document.getElementById('statAttempts').textContent = StorageManager.getAll().length;
        
        // Voucher code
        document.getElementById('voucherCode').textContent = 
            `PMSK-${Date.now().toString().slice(-8)}`;
    },
    
    // Fill Message Data
    fillMessageData: function() {
        const { messageData } = this.state;
        
        document.getElementById('messageAssessment').textContent = messageData.assessment;
        document.getElementById('messageMotivation').textContent = messageData.motivation;
        document.getElementById('messageAction').textContent = messageData.actionPlan;
        
        // Insights
        const insightsEl = document.getElementById('insightsList');
        insightsEl.innerHTML = messageData.insights.map(insight => 
            `<div>${insight}</div>`
        ).join('');
    },
    
    // Update Progress Bar
    updateProgress: function() {
        const progress = ((this.state.currentQuestionIndex + 1) / CONFIG.TOTAL_QUESTIONS) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;
        document.getElementById('progressText').textContent = 
            `${this.state.currentQuestionIndex + 1}/${CONFIG.TOTAL_QUESTIONS}`;
    },
    
    // Show History Modal
    showHistory: function() {
        const sessions = StorageManager.getAll();
        const listEl = document.getElementById('historyList');
        
        if (sessions.length === 0) {
            listEl.innerHTML = '<div class="history-empty">No quiz history yet. Take the quiz to start tracking your progress!</div>';
        } else {
            listEl.innerHTML = sessions.reverse().map(session => {
                const date = new Date(session.timestamp);
                return `
                    <div class="history-item">
                        <div class="history-date">${date.toLocaleDateString()} ${date.toLocaleTimeString()}</div>
                        <div class="history-score">Score: ${session.score.percentage}% | Grade: ${session.score.grade}</div>
                        <div class="history-prize">Prize: ₱${session.prize.amount}</div>
                    </div>
                `;
            }).join('');
        }
        
        document.getElementById('historyModal').classList.remove('hidden');
    },
    
    // Hide History Modal
    hideHistory: function() {
        document.getElementById('historyModal').classList.add('hidden');
    },
    
    // Clear History
    clearHistory: function() {
        if (confirm('Are you sure you want to clear all quiz history? This cannot be undone.')) {
            StorageManager.clear();
            this.hideHistory();
            this.updateHistoryCounter();
            log('History cleared');
        }
    },
    
    // Update History Counter
    updateHistoryCounter: function() {
        const count = StorageManager.getAll().length;
        document.getElementById('statAttempts').textContent = count;
    },
    
    // Restart Quiz
    restart: function() {
        log('Restarting quiz...');
        this.startQuiz();
    },
    
    // Show Section
    showSection: function(sectionId) {
        const sections = ['quizSection', 'resultSection'];
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                if (id === sectionId) {
                    el.classList.remove('hidden');
                    el.classList.add('fade-in');
                } else {
                    el.classList.add('hidden');
                }
            }
        });
    },
    
    // Hide Loading Screen
    hideLoading: function() {
        const loader = document.getElementById('loadingScreen');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 300);
        }
    },
    
    // Format Category Name
    formatCategory: function(category) {
        return category
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    },
    
    // Format Trait Name
    formatTrait: function(trait) {
        return trait
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    },

    // ========================================
    // Verification Code and Voucher Sharing
    // ========================================

    /**
     * Show share modal with voucher preview
     */
    showShareModal: function() {
        const modal = document.getElementById('shareModal');
        const voucherPreview = document.getElementById('voucherPreview');
        const modalCode = document.getElementById('modalVerificationCode');
        
        // Clone voucher card for preview
        const originalVoucher = document.getElementById('voucherCard');
        if (originalVoucher) {
            voucherPreview.innerHTML = originalVoucher.outerHTML;
        }
        
        // Set verification code
        const lastSession = StorageManager.getLast();
        if (lastSession && lastSession.verificationCode) {
            modalCode.textContent = lastSession.verificationCode;
        }
        
        // Load history
        this.loadShareHistory();
        
        modal.classList.remove('hidden');
    },

    /**
     * Hide share modal
     */
    hideShareModal: function() {
        document.getElementById('shareModal').classList.add('hidden');
    },

    /**
     * Load history in share modal
     */
    loadShareHistory: function() {
        const sessions = StorageManager.getAll();
        const listEl = document.getElementById('shareHistoryList');
        
        if (sessions.length === 0) {
            listEl.innerHTML = '<div class="history-empty">No quiz history yet.</div>';
            return;
        }
        
        listEl.innerHTML = sessions.reverse().slice(0, 10).map(session => {
            const date = new Date(session.timestamp);
            const approved = session.approved ? 
                '<span style="color: #27ae60; font-weight: 700;">✓ Approved</span>' : 
                '<span style="color: #f39c12; font-weight: 700;">⏳ Pending</span>';
            
            return `
                <div class="history-item">
                    <div class="history-date">${date.toLocaleDateString()} ${date.toLocaleTimeString()}</div>
                    <div class="history-score">Score: ${session.score.percentage}% | ${approved}</div>
                    <div class="history-prize">Prize: ₱${session.adjustedAmount || session.prize.amount}</div>
                    <div class="history-code" style="font-family: monospace; font-size: 12px; color: #666;">
                        Code: ${session.verificationCode}
                    </div>
                </div>
            `;
        }).join('');
    },

    /**
     * Download voucher as image (using html2canvas if available)
     */
    downloadVoucher: function() {
        // Simple fallback: Open print dialog
        alert('📸 Use your browser screenshot tool or print function to save the voucher!\n\nTip: Press Ctrl/Cmd + P to print, or take a screenshot.');
        window.print();
    },

    // Update finishQuiz method to include verification code display:
    finishQuiz: function() {
        log('Quiz finished. Calculating results...');
        
        this.state.isQuizActive = false;
        
        // Calculate score
        this.state.scoreData = ScoringEngine.calculateScore(
            this.state.answers,
            this.state.selectedQuestions
        );
        
        // Calculate prize
        this.state.prizeData = ScoringEngine.calculatePrize(this.state.scoreData);
        
        // Generate message
        this.state.messageData = MessageGenerator.generate(
            this.state.scoreData,
            this.state.prizeData
        );
        
        // Save to storage and get session with verification code
        const savedSession = StorageManager.save({
            score: this.state.scoreData,
            prize: this.state.prizeData,
            answers: this.state.answers,
            questions: this.state.selectedQuestions.map(q => q.id)
        });
        
        // Store verification code for display
        if (savedSession) {
            this.state.verificationCode = savedSession.verificationCode;
        }
        
        // Show results
        this.showResults();
    },

    // Update fillVoucherData to include verification code:
    fillVoucherData: function() {
        const { scoreData, prizeData, verificationCode } = this.state;
        
        // ... existing code ...
        
        // Voucher code (use actual verification code)
        const voucherCodeEl = document.getElementById('voucherCode');
        if (voucherCodeEl && verificationCode) {
            voucherCodeEl.textContent = verificationCode;
        }
        
        // Share verification code
        const shareCodeEl = document.getElementById('shareVerificationCode');
        if (shareCodeEl && verificationCode) {
            shareCodeEl.textContent = verificationCode;
        }
    },
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Export for debugging (if needed)
if (typeof window !== 'undefined') {
    window.PamaskoApp = App;
    window.AppConfig = CONFIG;
    window.AppStorage = StorageManager;
}