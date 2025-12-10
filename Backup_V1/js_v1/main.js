// js/main.js - ADVANCED PAMASKO QUIZ ENGINE
// Intelligent, Behavior-Aware, Dynamic Scoring System

// ========== GLOBAL STATE ==========
let quizState = {
    currentQuestionIndex: 0,
    selectedQuestions: [],
    answers: [],
    personalityTraits: {},
    totalPoints: 0,
    maxPossiblePoints: 0,
    behaviorFlags: [],
    moodLevel: 5
};

const BASE_AMOUNT = 500;
const MAX_QUESTIONS = 8;

// Mood levels for Ninong meter
const MOOD_LEVELS = [
    { level: 0, text: "Concerned... 😟", color: "#e74c3c" },
    { level: 1, text: "Needs improvement 😐", color: "#e67e22" },
    { level: 2, text: "Getting there! 🙂", color: "#f39c12" },
    { level: 3, text: "Good progress! 😊", color: "#3498db" },
    { level: 4, text: "Doing great! 🤩", color: "#2ecc71" },
    { level: 5, text: "Proud of you! 💝", color: "#27ae60" }
];

// ========== INITIALIZATION ==========
function initQuiz() {
    quizState = {
        currentQuestionIndex: 0,
        selectedQuestions: [],
        answers: [],
        personalityTraits: {},
        totalPoints: 0,
        maxPossiblePoints: 0,
        behaviorFlags: [],
        moodLevel: 5
    };
    
    selectIntelligentQuestions();
    renderCurrentQuestion();
    updateUI();
}

// ========== INTELLIGENT QUESTION SELECTION ==========
function selectIntelligentQuestions() {
    const categories = {};
    
    // Group by category
    QUESTION_BANK.forEach(q => {
        if (!categories[q.category]) categories[q.category] = [];
        categories[q.category].push(q);
    });
    
    const selected = [];
    const categoryKeys = Object.keys(categories);
    
    // Ensure diversity: at least one from each major category
    const priorityCategories = ['behavior', 'character', 'education', 'social', 'goals'];
    
    priorityCategories.forEach(cat => {
        if (categories[cat] && categories[cat].length > 0) {
            const randomQ = categories[cat][Math.floor(Math.random() * categories[cat].length)];
            selected.push(randomQ);
        }
    });
    
    // Fill remaining slots with variety
    while (selected.length < MAX_QUESTIONS && categoryKeys.length > 0) {
        const randomCat = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
        const availableQuestions = categories[randomCat].filter(
            q => !selected.find(s => s.id === q.id)
        );
        
        if (availableQuestions.length > 0) {
            const randomQ = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
            selected.push(randomQ);
        }
    }
    
    quizState.selectedQuestions = shuffleArray(selected.slice(0, MAX_QUESTIONS));
    
    // Calculate max possible points
    quizState.maxPossiblePoints = quizState.selectedQuestions.reduce((sum, q) => {
        const maxPoints = Math.max(...q.options.map(opt => opt.pts));
        return sum + maxPoints;
    }, 0);
}

// ========== RENDER QUESTION ==========
function renderCurrentQuestion() {
    const question = quizState.selectedQuestions[quizState.currentQuestionIndex];
    
    if (!question) {
        showFinalResult();
        return;
    }
    
    // Update question text
    document.getElementById('question').textContent = question.text;
    
    // Update question number
    document.getElementById('questionNum').textContent = 
        `Question ${quizState.currentQuestionIndex + 1} of ${MAX_QUESTIONS}`;
    document.getElementById('questionNum').classList.remove('hidden');
    
    // Render dynamic buttons based on question type
    renderAnswerButtons(question);
    
    // Show fun fact
    const factEl = document.getElementById('funFact');
    factEl.textContent = question.fact;
    factEl.classList.remove('hidden');
    
    // Update progress
    updateProgress();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== DYNAMIC BUTTON RENDERING ==========
function renderAnswerButtons(question) {
    const btnGroup = document.getElementById('btns');
    btnGroup.innerHTML = ''; // Clear existing buttons
    
    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.textContent = option.text;
        btn.onclick = () => handleAnswer(option, question);
        
        // Style based on type
        if (question.type === 'scale') {
            btn.className = 'btn-scale';
            btn.style.flex = '0 0 calc(20% - 10px)';
        } else if (question.options.length === 2) {
            btn.className = option.value.includes('yes') || option.value === 'always' ? 'btn-yes' : 'btn-no';
        } else if (question.options.length === 3) {
            btn.className = 'btn-choice';
            btn.style.flex = '0 0 calc(33.33% - 13px)';
        } else {
            btn.className = 'btn-choice';
            btn.style.flex = '1 1 100%';
            btn.style.marginBottom = '10px';
        }
        
        btnGroup.appendChild(btn);
    });
    
    // Adjust layout for many options
    if (question.options.length > 3) {
        btnGroup.style.flexDirection = 'column';
    } else {
        btnGroup.style.flexDirection = 'row';
    }
}

// ========== ANSWER HANDLING ==========
function handleAnswer(option, question) {
    // Record answer
    quizState.answers.push({
        questionId: question.id,
        category: question.category,
        selectedOption: option.value,
        points: option.pts,
        trait: option.trait
    });
    
    // Update points
    quizState.totalPoints += option.pts;
    
    // Track personality trait
    if (option.trait) {
        quizState.personalityTraits[option.trait] = 
            (quizState.personalityTraits[option.trait] || 0) + 1;
    }
    
    // Update mood based on answer quality
    updateMoodLevel(option.pts, question);
    
    // Check for triggered endings
    if (option.end) {
        showSpecialEnding(option.end);
        return;
    }
    
    // Check for behavior flags
    if (option.pts < 0) {
        quizState.behaviorFlags.push({
            category: question.category,
            concern: option.trait,
            severity: Math.abs(option.pts)
        });
    }
    
    // Animate points change
    animatePointsChange(option.pts);
    
    // Mini celebration for good answers
    if (option.pts >= 80) {
        showMiniCelebration();
    }
    
    // Move to next question
    quizState.currentQuestionIndex++;
    
    setTimeout(() => {
        renderCurrentQuestion();
    }, 400);
}

// ========== MOOD SYSTEM ==========
function updateMoodLevel(points, question) {
    // Calculate mood based on answer quality
    const maxPoints = Math.max(...question.options.map(opt => opt.pts));
    const ratio = points / maxPoints;
    
    if (ratio >= 0.9) {
        quizState.moodLevel = Math.min(5, quizState.moodLevel + 0.3);
    } else if (ratio >= 0.7) {
        quizState.moodLevel = Math.min(5, quizState.moodLevel + 0.1);
    } else if (ratio >= 0.4) {
        // Neutral
    } else {
        quizState.moodLevel = Math.max(0, quizState.moodLevel - 0.4);
    }
    
    updateMoodMeter();
}

function updateMoodMeter() {
    const moodIndex = Math.round(quizState.moodLevel);
    const mood = MOOD_LEVELS[moodIndex];
    
    const meterEl = document.getElementById('ninongMeter');
    const levelEl = document.getElementById('generosityLevel');
    
    levelEl.textContent = mood.text;
    meterEl.style.background = `linear-gradient(135deg, ${mood.color} 0%, ${adjustBrightness(mood.color, 30)} 100%)`;
}

function adjustBrightness(color, percent) {
    const num = parseInt(color.replace("#",""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 +
        (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255))
        .toString(16).slice(1);
}

// ========== ANIMATIONS ==========
function animatePointsChange(points) {
    const amountEl = document.getElementById('currentAmount');
    const currentValue = parseInt(amountEl.textContent) || BASE_AMOUNT;
    
    // Estimate new value (rough calculation for visual feedback)
    const progress = quizState.currentQuestionIndex / MAX_QUESTIONS;
    const estimatedAmount = Math.round(
        BASE_AMOUNT * (1 - progress * 0.3) + 
        (quizState.totalPoints / quizState.maxPossiblePoints) * BASE_AMOUNT * progress
    );
    
    animateValue(amountEl, currentValue, estimatedAmount, 600);
    
    // Show score breakdown
    updateScoreBreakdown();
}

function showMiniCelebration() {
    // Create confetti burst
    const colors = ['#FFD700', '#FFA500', '#FF6B6B', '#4ECDC4', '#45B7D1'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createConfetti(colors[Math.floor(Math.random() * colors.length)]);
        }, i * 30);
    }
}

function createConfetti(color) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.background = color;
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-20px';
    confetti.style.borderRadius = '50%';
    confetti.style.zIndex = '9999';
    confetti.style.pointerEvents = 'none';
    
    document.body.appendChild(confetti);
    
    const animation = confetti.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        { transform: `translateY(${window.innerHeight}px) rotate(${360 * Math.random()}deg)`, opacity: 0 }
    ], {
        duration: 2000 + Math.random() * 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    animation.onfinish = () => confetti.remove();
}

// ========== SCORE BREAKDOWN ==========
function updateScoreBreakdown() {
    const breakdownEl = document.getElementById('scoreBreakdown');
    const bonusEl = document.getElementById('bonusDisplay');
    const penaltyEl = document.getElementById('penaltyDisplay');
    
    const positivePoints = quizState.answers
        .filter(a => a.points > 0)
        .reduce((sum, a) => sum + a.points, 0);
        
    const negativePoints = quizState.answers
        .filter(a => a.points < 0)
        .reduce((sum, a) => sum + a.points, 0);
    
    if (positivePoints > 0) {
        bonusEl.textContent = `Bonuses: +${positivePoints} pts`;
        bonusEl.classList.remove('hidden');
    }
    
    if (negativePoints < 0) {
        penaltyEl.textContent = `Penalties: ${negativePoints} pts`;
        penaltyEl.classList.remove('hidden');
    }
    
    breakdownEl.classList.remove('hidden');
}

// ========== INTELLIGENT ENDING SELECTION ==========
function determineIntelligentEnding() {
    // Calculate personality profile
    const traitCounts = Object.entries(quizState.personalityTraits)
        .sort((a, b) => b[1] - a[1]);
    
    const dominantTraits = traitCounts.slice(0, 3).map(t => t[0]);
    
    // Calculate ratios
    const positiveCount = traitCounts.filter(([trait]) => 
        PERSONALITY_TRAITS[trait]?.category === 'positive'
    ).reduce((sum, [, count]) => sum + count, 0);
    
    const totalTraits = traitCounts.reduce((sum, [, count]) => sum + count, 0);
    const positiveRatio = positiveCount / totalTraits;
    
    const avgScore = (quizState.totalPoints / quizState.maxPossiblePoints) * 100;
    
    // Check for triggered special endings
    for (const trait of dominantTraits) {
        for (const [key, ending] of Object.entries(DYNAMIC_ENDINGS)) {
            if (ending.triggered_by === trait) {
                return { ending, traits: dominantTraits, avgScore, positiveRatio };
            }
        }
    }
    
    // Find matching profile-based ending
    for (const [key, ending] of Object.entries(DYNAMIC_ENDINGS)) {
        if (ending.criteria) {
            const { positive_ratio, avg_score } = ending.criteria;
            if (positiveRatio >= positive_ratio && avgScore >= avg_score) {
                return { ending, traits: dominantTraits, avgScore, positiveRatio };
            }
        }
    }
    
    // Default to good_potential
    return { 
        ending: DYNAMIC_ENDINGS.good_potential, 
        traits: dominantTraits, 
        avgScore, 
        positiveRatio 
    };
}

// ========== FINAL RESULT ==========
function showFinalResult() {
    // Hide quiz elements
    document.getElementById('btns').classList.add('hidden');
    document.getElementById('funFact').classList.add('hidden');
    document.getElementById('question').classList.add('hidden');
    document.getElementById('questionNum').classList.add('hidden');
    
    // Determine ending
    const { ending, traits, avgScore, positiveRatio } = determineIntelligentEnding();
    
    // Calculate final amount
    const finalAmount = calculateFinalAmount(ending);
    
    // Animate to final amount
    const amountEl = document.getElementById('currentAmount');
    animateValue(amountEl, parseInt(amountEl.textContent), finalAmount, 2000);
    
    // Show result
    setTimeout(() => {
        displayIntelligentResult(ending, traits, finalAmount, avgScore, positiveRatio);
    }, 2200);
    
    // Complete progress
    document.getElementById('progress').style.width = '100%';
}

// ========== AMOUNT CALCULATION ==========
function calculateFinalAmount(ending) {
    let amount = BASE_AMOUNT * ending.baseMultiplier;
    amount += ending.bonus || 0;
    
    // Mood bonus
    const moodBonus = Math.round(quizState.moodLevel * 20);
    amount += moodBonus;
    
    // Consistency bonus (all positive answers)
    const allPositive = quizState.answers.every(a => a.points >= 0);
    if (allPositive) {
        amount += 50;
    }
    
    return Math.max(Math.round(amount), 50); // Minimum ₱50
}

// ========== DISPLAY RESULT ==========
function displayIntelligentResult(ending, traits, finalAmount, avgScore, positiveRatio) {
    const resultEl = document.getElementById('result');
    
    // Personalized message
    const personalMsg = ending.personalizedMsg ? 
        ending.personalizedMsg(traits) : 
        `Your profile shows: ${traits.slice(0,2).join(", ")}`;
    
    // Behavior insights
    const insights = generateBehaviorInsights(avgScore, positiveRatio);
    
    const html = `
        <div class="result-title">${ending.title}</div>
        
        <div class="result-section">
            <div class="result-label">🎯 Your Profile:</div>
            ${personalMsg}
        </div>
        
        <div class="result-section">
            <div class="result-label">💬 Ninong's Message:</div>
            ${ending.motivation}
        </div>
        
        <div class="result-section">
            <div class="result-label">📊 Performance:</div>
            Score: <strong>${avgScore.toFixed(1)}%</strong> | 
            Positive Traits: <strong>${(positiveRatio * 100).toFixed(0)}%</strong>
            <div style="margin-top:8px; font-size:14px;">${insights}</div>
        </div>
        
        <div class="result-section">
            <div class="result-label">🎁 Aguinaldo:</div>
            <strong style="font-size: 32px; color: #27ae60;">₱${finalAmount}</strong>
        </div>
        
        <div class="result-section">
            <div class="result-label">✨ ${ending.bonusMsg ? 'Bonus/Penalty:' : 'Notes:'}</div>
            ${ending.bonusMsg || 'Standard aguinaldo based on performance'}
        </div>
        
        <div class="result-section">
            <div class="result-label">📢 Action Plan:</div>
            ${ending.psa}
        </div>
        
        ${quizState.behaviorFlags.length > 0 ? `
        <div class="result-section" style="background:#fff3cd; padding:12px; border-radius:8px; margin-top:15px;">
            <div class="result-label">⚠️ Areas Needing Attention:</div>
            ${quizState.behaviorFlags.map(f => `• ${f.concern}`).join('<br>')}
        </div>
        ` : ''}
    `;
    
    resultEl.innerHTML = html;
    resultEl.classList.remove('hidden');
    
    // Show other elements
    document.getElementById('gift').classList.remove('hidden');
    document.getElementById('screenshotNote').classList.remove('hidden');
    document.getElementById('restartBtn').classList.remove('hidden');
    
    // Celebration if score is high
    if (avgScore >= 80) {
        for (let i = 0; i < 30; i++) {
            setTimeout(() => showMiniCelebration(), i * 100);
        }
    }
}

// ========== BEHAVIOR INSIGHTS ==========
function generateBehaviorInsights(avgScore, positiveRatio) {
    if (avgScore >= 85 && positiveRatio >= 0.85) {
        return "🌟 Exceptional! You're a role model!";
    } else if (avgScore >= 70) {
        return "💪 Strong foundation! Small tweaks needed.";
    } else if (avgScore >= 55) {
        return "🌱 Good potential! Focus on consistency.";
    } else if (avgScore >= 40) {
        return "🔄 Needs improvement. Time to level up!";
    } else {
        return "🚨 Serious concerns. Need immediate support!";
    }
}

// ========== UI UPDATES ==========
function updateProgress() {
    const percent = (quizState.currentQuestionIndex / MAX_QUESTIONS) * 100;
    document.getElementById('progress').style.width = percent + '%';
}

function updateUI() {
    document.getElementById('currentAmount').textContent = BASE_AMOUNT;
    updateMoodMeter();
}

// ========== SPECIAL ENDINGS ==========
function showSpecialEnding(endingKey) {
    const ending = DYNAMIC_ENDINGS[endingKey];
    if (ending) {
        quizState.currentQuestionIndex = MAX_QUESTIONS; // Force end
        setTimeout(() => showFinalResult(), 500);
    }
}

// ========== UTILITIES ==========
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

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

// ========== RESTART ==========
function restartQuiz() {
    document.getElementById('gift').classList.add('hidden');
    document.getElementById('result').classList.add('hidden');
    document.getElementById('screenshotNote').classList.add('hidden');
    document.getElementById('restartBtn').classList.add('hidden');
    document.getElementById('scoreBreakdown').classList.add('hidden');
    
    document.getElementById('question').classList.remove('hidden');
    document.getElementById('btns').classList.remove('hidden');
    document.getElementById('ninongMeter').classList.remove('hidden');
    
    initQuiz();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== INITIALIZE ==========
document.addEventListener('DOMContentLoaded', () => {
    initQuiz();
});

window.restartQuiz = restartQuiz;