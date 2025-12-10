// js/main.js - Pamasko Quiz Core Logic

// Global State
let totalScore = 0;
let questionCount = 0;
const maxQuestions = 8;
const baseAmount = 500;
let selectedQuestions = [];
let currentQuestionIndex = 0;
let forceEnd = null;

const generosityLevels = [
    "Getting to know you! 💝",
    "Learning about you! 😊",
    "You're doing okay! 🌟",
    "Good progress! ⭐",
    "Great work! 💪",
    "AMAZING! So proud! 🎉"
];

// Initialize Quiz
function initQuiz() {
    totalScore = 0;
    questionCount = 0;
    currentQuestionIndex = 0;
    forceEnd = null;
    
    selectedQuestions = selectRandomQuestions();
    renderQuestion();
}

// Select Random Questions from Different Categories
function selectRandomQuestions() {
    const categories = {};
    
    // Group questions by category
    QUESTION_BANK.forEach(q => {
        if (!categories[q.category]) {
            categories[q.category] = [];
        }
        categories[q.category].push(q);
    });
    
    const selected = [];
    const categoryKeys = Object.keys(categories);
    
    // Get at least one from each major category
    const priorityCategories = ['values', 'behavior', 'education', 'character', 'goals'];
    
    priorityCategories.forEach(cat => {
        if (categories[cat] && categories[cat].length > 0) {
            const randomIndex = Math.floor(Math.random() * categories[cat].length);
            selected.push(categories[cat][randomIndex]);
        }
    });
    
    // Fill remaining slots with random questions
    while (selected.length < maxQuestions) {
        const randomCat = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
        const questions = categories[randomCat];
        
        if (questions && questions.length > 0) {
            const randomQ = questions[Math.floor(Math.random() * questions.length)];
            
            // Avoid duplicates
            if (!selected.find(q => q.id === randomQ.id)) {
                selected.push(randomQ);
            }
        }
    }
    
    // Shuffle the selected questions
    return shuffleArray(selected);
}

// Shuffle Array Helper
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Render Current Question
function renderQuestion() {
    if (currentQuestionIndex >= selectedQuestions.length) {
        showResult();
        return;
    }
    
    const question = selectedQuestions[currentQuestionIndex];
    questionCount++;
    
    // Update UI elements
    document.getElementById('question').textContent = question.text;
    document.getElementById('questionNum').textContent = `Question ${questionCount} of ${maxQuestions}`;
    document.getElementById('questionNum').classList.remove('hidden');
    
    // Show fun fact
    const factEl = document.getElementById('funFact');
    if (question.fact) {
        factEl.textContent = question.fact;
        factEl.classList.remove('hidden');
    } else {
        factEl.classList.add('hidden');
    }
    
    // Update progress bar
    updateProgress();
    
    // Update generosity meter
    updateGenerosityMeter();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Handle Answer
function answer(choice) {
    const question = selectedQuestions[currentQuestionIndex];
    const response = question[choice];
    
    if (!response) return;
    
    // Add/subtract points
    totalScore += response.pts || 0;
    
    // Check for forced ending
    if (response.end) {
        forceEnd = response.end;
        showResult();
        return;
    }
    
    // Update amount display with animation
    updateAmountDisplay();
    
    // Move to next question
    currentQuestionIndex++;
    
    setTimeout(() => {
        renderQuestion();
    }, 300);
}

// Update Amount Display
function updateAmountDisplay() {
    const currentAmount = calculateCurrentAmount();
    const amountEl = document.getElementById('currentAmount');
    
    // Animate the number change
    animateValue(amountEl, parseInt(amountEl.textContent), currentAmount, 500);
}

// Animate Number Value
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.round(current);
    }, 16);
}

// Calculate Current Amount Based on Score
function calculateCurrentAmount() {
    const maxPossibleScore = selectedQuestions.reduce((sum, q) => {
        const yesPoints = q.yes?.pts || 0;
        const noPoints = q.no?.pts || 0;
        return sum + Math.max(yesPoints, noPoints);
    }, 0);
    
    const percentage = Math.max(0, totalScore / maxPossibleScore);
    return Math.round(baseAmount * percentage);
}

// Update Progress Bar
function updateProgress() {
    const percent = (questionCount / maxQuestions) * 100;
    document.getElementById('progress').style.width = percent + '%';
}

// Update Generosity Meter
function updateGenerosityMeter() {
    const progress = Math.min(questionCount / maxQuestions, 1);
    const index = Math.min(
        Math.floor(progress * generosityLevels.length), 
        generosityLevels.length - 1
    );
    document.getElementById('generosityLevel').textContent = generosityLevels[index];
}

// Show Final Result
function showResult() {
    // Hide question elements
    document.getElementById('btns').classList.add('hidden');
    document.getElementById('funFact').classList.add('hidden');
    document.getElementById('ninongMeter').classList.add('hidden');
    document.getElementById('question').classList.add('hidden');
    document.getElementById('questionNum').classList.add('hidden');
    
    // Determine ending type
    let ending;
    if (forceEnd) {
        ending = ENDINGS[forceEnd];
    } else {
        ending = determineEnding();
    }
    
    // Calculate final amount
    const finalAmount = calculateFinalAmount(ending);
    
    // Animate to final amount
    const amountEl = document.getElementById('currentAmount');
    animateValue(amountEl, parseInt(amountEl.textContent), finalAmount, 1500);
    
    // Show result after animation
    setTimeout(() => {
        displayResult(ending, finalAmount);
    }, 1600);
    
    // Update progress to 100%
    updateProgress();
    document.getElementById('progress').style.width = '100%';
}

// Determine Ending Based on Score
function determineEnding() {
    const maxScore = selectedQuestions.reduce((sum, q) => {
        const yesPoints = q.yes?.pts || 0;
        const noPoints = q.no?.pts || 0;
        return sum + Math.max(yesPoints, noPoints);
    }, 0);
    
    const percentage = totalScore / maxScore;
    
    if (percentage >= 0.95) return ENDINGS.perfect;
    if (percentage >= 0.85) return ENDINGS.excellent;
    if (percentage >= 0.70) return ENDINGS.good;
    if (percentage >= 0.50) return ENDINGS.needs_work;
    return ENDINGS.study_harder;
}

// Calculate Final Amount
function calculateFinalAmount(ending) {
    if (ending === ENDINGS.not_godchild) {
        return ending.bonus;
    }
    
    let amount = Math.round(baseAmount * ending.multiplier);
    amount += ending.bonus;
    
    return Math.max(amount, 30); // Minimum ₱30
}

// Display Result
function displayResult(ending, finalAmount) {
    const resultEl = document.getElementById('result');
    
    const html = `
        <div class="result-title">${ending.title}</div>
        
        <div class="result-section">
            <div class="result-label">💬 Message:</div>
            ${ending.message}
        </div>
        
        <div class="result-section">
            <div class="result-label">🎁 Aguinaldo:</div>
            <strong style="font-size: 24px; color: #27ae60;">₱${finalAmount}</strong>
        </div>
        
        <div class="result-section">
            <div class="result-label">✨ ${ending.bonusMsg ? ending.bonusMsg.split(':')[0] + ':' : 'Bonus:'}</div>
            ${ending.bonusMsg ? ending.bonusMsg.split(':').slice(1).join(':').trim() : 'Good job completing!'}
        </div>
        
        <div class="result-section">
            <div class="result-label">💪 Motivation:</div>
            ${ending.motivation}
        </div>
        
        <div class="result-section">
            <div class="result-label">📢 PSA / Next Steps:</div>
            ${ending.psa}
        </div>
    `;
    
    resultEl.innerHTML = html;
    resultEl.classList.remove('hidden');
    
    // Show gift icon
    document.getElementById('gift').classList.remove('hidden');
    
    // Show screenshot note
    document.getElementById('screenshotNote').classList.remove('hidden');
    
    // Show restart button
    document.getElementById('restartBtn').classList.remove('hidden');
}

// Restart Quiz
function restartQuiz() {
    // Hide result elements
    document.getElementById('gift').classList.add('hidden');
    document.getElementById('result').classList.add('hidden');
    document.getElementById('screenshotNote').classList.add('hidden');
    document.getElementById('restartBtn').classList.add('hidden');
    
    // Show question elements
    document.getElementById('question').classList.remove('hidden');
    document.getElementById('btns').classList.remove('hidden');
    document.getElementById('ninongMeter').classList.remove('hidden');
    document.getElementById('funFact').classList.remove('hidden');
    
    // Reset amount display
    document.getElementById('currentAmount').textContent = baseAmount;
    
    // Reset progress
    document.getElementById('progress').style.width = '0%';
    
    // Restart quiz
    initQuiz();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initQuiz();
});

// Export functions for HTML onclick handlers
window.answer = answer;
window.restartQuiz = restartQuiz;