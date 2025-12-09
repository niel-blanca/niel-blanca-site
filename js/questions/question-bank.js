// js/questions/question-bank.js
// ADVANCED PAMASKO QUIZ - Intelligent Behavior-Aware System

const QUESTION_BANK = [
    // ========== MIXED QUESTION TYPES ==========
    
    // TYPE: Multiple Choice - Frequency
    {
        id: "q1",
        type: "choice",
        text: "Gaano ka kadalas tumulong sa household chores? 🏠",
        category: "behavior",
        options: [
            { text: "Araw-araw, walang sinasabi!", value: "daily", pts: 100, trait: "responsible" },
            { text: "Pag sinabihan lang", value: "when_asked", pts: 50, trait: "obedient" },
            { text: "Pag may kapalit (baon, extra allowance)", value: "transactional", pts: 20, trait: "transactional" },
            { text: "Rare, busy sa phone eh", value: "rarely", pts: -30, trait: "distracted" }
        ],
        fact: "🧹 Harvard study: Kids doing daily chores earn 40% more sa career! Plus si Lola masaya, blessing yan! 💝"
    },
    
    // TYPE: Scale Rating
    {
        id: "q2",
        type: "scale",
        text: "Sa scale ng 1-5, gaano ka ka-honest sa parents about school? 📚",
        category: "character",
        options: [
            { text: "5 - Bukas libro ako!", value: 5, pts: 100, trait: "honest" },
            { text: "4 - Mostly honest", value: 4, pts: 75, trait: "truthful" },
            { text: "3 - Depende sa situation", value: 3, pts: 40, trait: "selective" },
            { text: "2 - Pinapaganda ko minsan", value: 2, pts: 0, trait: "creative" },
            { text: "1 - Secret agent level", value: 1, pts: -50, trait: "secretive" }
        ],
        fact: "💎 Real talk: Honesty builds trust = More freedom later! Parents respect truth over perfect lies! 🙏"
    },
    
    // TYPE: Scenario-based
    {
        id: "q3",
        type: "scenario",
        text: "May nakita kang ₱500 sa mesa. Ano gagawin mo? 💵",
        category: "character",
        options: [
            { text: "Itatanong ko kung kanino", value: "ask", pts: 100, trait: "honest" },
            { text: "Iiwan ko lang dun", value: "leave", pts: 75, trait: "cautious" },
            { text: "Hihintayin may maghanap", value: "wait", pts: 90, trait: "patient" },
            { text: "Kunin ko, sabihin ko later", value: "take", pts: -50, trait: "impulsive" }
        ],
        fact: "💰 Integrity test! 95% ng successful people passed this in real life. Character > Money! 👑"
    },
    
    // TYPE: Frequency with context
    {
        id: "q4",
        type: "choice",
        text: "Gaano ka kadalas mag-'Thank you' at 'I love you' sa parents? 💝",
        category: "gratitude",
        options: [
            { text: "Lagi! Part ng daily routine", value: "always", pts: 100, trait: "loving" },
            { text: "Pag may special occasion lang", value: "occasions", pts: 40, trait: "reserved" },
            { text: "Pag may kailangan ako", value: "transactional", pts: 0, trait: "practical" },
            { text: "Nahihiya ako eh", value: "shy", pts: 20, trait: "shy" }
        ],
        fact: "❤️ Science: Saying 'I love you' releases oxytocin - happiness hormone! Try it tonight, guaranteed ngiti! 😊"
    },
    
    // TYPE: Academic performance with context
    {
        id: "q5",
        type: "choice",
        text: "Describe your approach sa pag-aaral 📖",
        category: "education",
        options: [
            { text: "Advanced reader, nag-aaral ahead!", value: "proactive", pts: 100, trait: "proactive" },
            { text: "On-time, sumusunod sa schedule", value: "punctual", pts: 80, trait: "disciplined" },
            { text: "Cramming but still passing", value: "crammer", pts: 40, trait: "procrastinator" },
            { text: "Bahala na, swertehin naman", value: "lucky", pts: -30, trait: "careless" }
        ],
        fact: "📚 Warren Buffett: 'The best investment is in yourself!' Top students plan ahead = Less stress + Better grades! 🎯"
    },
    
    // TYPE: Social behavior
    {
        id: "q6",
        type: "scenario",
        text: "May classmate na nahihirapan. Ano gagawin mo? 🤝",
        category: "social",
        options: [
            { text: "Tutulungan ko without asking!", value: "proactive_help", pts: 100, trait: "compassionate" },
            { text: "Tutulungan pag nag-ask", value: "reactive_help", pts: 70, trait: "helpful" },
            { text: "Bibigyan ko tips lang", value: "minimal", pts: 40, trait: "reserved" },
            { text: "Busy din ako eh", value: "self_focused", pts: 0, trait: "individualist" }
        ],
        fact: "💪 Leadership secret: Helping others = practicing future boss skills! CEOs help, hindi nag-iisa lang! 🚀"
    },
    
    // TYPE: Respect & manners
    {
        id: "q7",
        type: "choice",
        text: "Paano ka makikipag-usap sa matatanda? 👴👵",
        category: "behavior",
        options: [
            { text: "'Po' at 'Opo' natural sa akin!", value: "respectful", pts: 100, trait: "respectful" },
            { text: "Ginagamit ko pero minsan nakakalimutan", value: "trying", pts: 60, trait: "learning" },
            { text: "Pag formal situation lang", value: "situational", pts: 30, trait: "selective" },
            { text: "Hindi ako sanay eh", value: "casual", pts: 0, trait: "informal" }
        ],
        fact: "🇵🇭 Filipino pride worldwide! 'Po/Opo' = Respect culture. Other countries envy our values! Ipakita mo! 👏"
    },
    
    // TYPE: Responsibility check
    {
        id: "q8",
        type: "scale",
        text: "Gaano ka ka-organized sa gamit mo? (1-5) 📱💼",
        category: "character",
        options: [
            { text: "5 - Everything has its place!", value: 5, pts: 100, trait: "organized" },
            { text: "4 - Mostly organized", value: 4, pts: 75, trait: "tidy" },
            { text: "3 - Organized chaos", value: 3, pts: 40, trait: "casual" },
            { text: "2 - Hinahanap ko palagi", value: 2, pts: 10, trait: "messy" },
            { text: "1 - Ano nga ba gamit ko?", value: 1, pts: -20, trait: "chaotic" }
        ],
        fact: "🎯 CEOs are 85% more organized! Small things = Big things. Master your stuff, master your life! 📊"
    },
    
    // TYPE: Goal-oriented
    {
        id: "q9",
        type: "choice",
        text: "May specific goals ka ba for this year? 🎯",
        category: "goals",
        options: [
            { text: "Yes! Written with action plan pa!", value: "detailed", pts: 100, trait: "planner" },
            { text: "May idea pero not written", value: "mental", pts: 70, trait: "casual_planner" },
            { text: "General lang (mag-improve)", value: "vague", pts: 40, trait: "unfocused" },
            { text: "Wala pa, go with the flow", value: "none", pts: 0, trait: "spontaneous", end: "find_passion" }
        ],
        fact: "🌟 Harvard: Written goals = 10x more likely to achieve! Isulat mo, mangyayari yan! ✍️"
    },
    
    // TYPE: Screen time awareness
    {
        id: "q10",
        type: "choice",
        text: "Gaano ka-addicted sa phone/gadgets? 📱",
        category: "behavior",
        options: [
            { text: "Balanced, may set time limits", value: "controlled", pts: 100, trait: "disciplined" },
            { text: "Uso lang, pero may control", value: "moderate", pts: 70, trait: "balanced" },
            { text: "Mahirap iwanan, pero kaya", value: "dependent", pts: 30, trait: "attached" },
            { text: "First thing tingin, last thing bago tulog", value: "addicted", pts: -20, trait: "addicted" }
        ],
        fact: "📵 Studies show: 2-hour screen limit = 40% better focus! Balance is key! Nature + Tech = Perfect! 🌳📱"
    },
    
    // TYPE: Sibling relationship
    {
        id: "q11",
        type: "scenario",
        text: "Relationship mo sa siblings/cousins? 👫",
        category: "social",
        options: [
            { text: "Best friends! Super close!", value: "close", pts: 100, trait: "family_oriented" },
            { text: "Okay naman, walang away", value: "neutral", pts: 60, trait: "peaceful" },
            { text: "On-off, minsan okay minsan hindi", value: "volatile", pts: 30, trait: "moody" },
            { text: "Laging nag-aaway", value: "conflict", pts: -30, trait: "conflicted" }
        ],
        fact: "👨‍👩‍👧‍👦 Real talk: Siblings = lifelong teammates! Invest in that relationship now, thank me later! 🤝"
    },
    
    // TYPE: Initiative & proactiveness
    {
        id: "q12",
        type: "scenario",
        text: "May nakita kang basura sa sahig ng bahay. Gagawin mo? 🗑️",
        category: "behavior",
        options: [
            { text: "Pick up kaagad!", value: "proactive", pts: 100, trait: "responsible" },
            { text: "Kukunin ko pag papunta na ako dun", value: "convenient", pts: 60, trait: "practical" },
            { text: "Sabihin ko sa kasama kong pulutin", value: "delegate", pts: 20, trait: "delegator" },
            { text: "Not my basura, not my problem", value: "ignore", pts: -40, trait: "apathetic" }
        ],
        fact: "♻️ Bayanihan spirit! Small acts = Big character. Future leaders see problems & solve them! 💪"
    },
    
    // TYPE: Financial literacy
    {
        id: "q13",
        type: "choice",
        text: "Ano ginagawa mo sa allowance/money mo? 💰",
        category: "character",
        options: [
            { text: "May budget, may savings!", value: "saver", pts: 100, trait: "financially_smart" },
            { text: "Ginagastos pero may natitira", value: "balanced", pts: 70, trait: "moderate" },
            { text: "Nauubos agad, YOLO!", value: "spender", pts: 20, trait: "impulsive" },
            { text: "Ano bang allowance?", value: "none", pts: 50, trait: "independent" }
        ],
        fact: "💵 Money fact: Save 20% habit now = ₱1M by age 30! Start young, compound interest magic! 📈"
    },
    
    // TYPE: Emotional intelligence
    {
        id: "q14",
        type: "scenario",
        text: "Galit ka sa kapatid mo. Ano gagawin? 😤",
        category: "character",
        options: [
            { text: "Kausapin after magcool down", value: "mature", pts: 100, trait: "emotionally_intelligent" },
            { text: "Mag-sorry agad", value: "peacemaker", pts: 90, trait: "humble" },
            { text: "Hintayin siya mag-approach", value: "passive", pts: 40, trait: "passive" },
            { text: "Cold war for days", value: "stubborn", pts: -30, trait: "stubborn" }
        ],
        fact: "🧠 EQ > IQ sa success! 90% ng top performers = High emotional intelligence. Master your emotions! 💪"
    },
    
    // TYPE: Humility check
    {
        id: "q15",
        type: "choice",
        text: "May achievement ka, paano mo ishashare? 🏆",
        category: "humility",
        options: [
            { text: "Simple lang, thank everyone who helped", value: "humble", pts: 100, trait: "humble" },
            { text: "Share pero hindi nag-brag", value: "balanced", pts: 80, trait: "confident" },
            { text: "Post everywhere with details!", value: "proud", pts: 30, trait: "showy" },
            { text: "Flex to the max! Champion mindset!", value: "boastful", pts: -80, trait: "arrogant", end: "pride" }
        ],
        fact: "🙏 'Ang tunay na mayaman, di nagmamalaki' - Filipino wisdom. Humility + Success = Unstoppable! 👑"
    },
    
    // TYPE: Time management
    {
        id: "q16",
        type: "choice",
        text: "Paano mo ba-balance school, family, at play? ⚖️",
        category: "education",
        options: [
            { text: "May schedule, sinusunod!", value: "organized", pts: 100, trait: "disciplined" },
            { text: "Flexible, pero natapos lahat", value: "adaptive", pts: 75, trait: "flexible" },
            { text: "Minsan nakakalimutan", value: "forgetful", pts: 30, trait: "scattered" },
            { text: "Last minute lahat", value: "crammer", pts: 0, trait: "procrastinator" }
        ],
        fact: "⏰ Time = Money! Students with schedules = 60% less stress + better grades! Plan ahead = Win! 📅"
    },
    
    // TYPE: Community involvement
    {
        id: "q17",
        type: "choice",
        text: "Involved ka ba sa community/church activities? ⛪",
        category: "social",
        options: [
            { text: "Yes! Active member ako!", value: "active", pts: 100, trait: "community_leader" },
            { text: "Sometimes, pag may time", value: "occasional", pts: 60, trait: "participant" },
            { text: "Rare, pag required lang", value: "minimal", pts: 20, trait: "reluctant" },
            { text: "Hindi ako sumasali", value: "none", pts: 0, trait: "isolated" }
        ],
        fact: "🌍 Bayanihan DNA! Volunteers are 42% happier + build connections. Serving others = blessing yourself! 🤝"
    },
    
    // TYPE: Academic integrity
    {
        id: "q18",
        type: "scenario",
        text: "May exam, hindi ka nag-review. May naniningil ng sagot. Gagawin mo? 📝",
        category: "character",
        options: [
            { text: "No! Kaya ko to, sariling sagot", value: "integrity", pts: 100, trait: "honest" },
            { text: "Hihiramin pero guilty ako", value: "tempted", pts: 20, trait: "conflicted" },
            { text: "Titingin, emergency naman", value: "cheater", pts: -50, trait: "dishonest" },
            { text: "Mag-blangko na lang, honest", value: "honest_fail", pts: 80, trait: "principled" }
        ],
        fact: "💎 Integrity = Who you are when nobody's watching. Cheating = short-term gain, long-term shame! 🎯"
    },
    
    // TYPE: Gratitude awareness
    {
        id: "q19",
        type: "scale",
        text: "Naa-appreciate mo ba sacrifices ng parents? (1-5) 💪",
        category: "gratitude",
        options: [
            { text: "5 - Sobrang grateful!", value: 5, pts: 100, trait: "grateful" },
            { text: "4 - Yes, sinasabi ko rin", value: 4, pts: 80, trait: "appreciative" },
            { text: "3 - Alam ko naman", value: 3, pts: 50, trait: "aware" },
            { text: "2 - Hindi ko masyado naiisip", value: 2, pts: 10, trait: "unaware" },
            { text: "1 - Obligasyon nila yan", value: 1, pts: -60, trait: "entitled" }
        ],
        fact: "👨‍👩‍👧 Real talk: Every meal, tuition, birthday = OT, stress, sacrifice. They work for YOUR dreams! ❤️"
    },
    
    // TYPE: Conflict resolution
    {
        id: "q20",
        type: "choice",
        text: "May away kayo ng friend. Paano mo reresolve? 💔",
        category: "social",
        options: [
            { text: "Kausapin ASAP, ayusin", value: "proactive", pts: 100, trait: "mature" },
            { text: "Give space, then talk", value: "patient", pts: 85, trait: "wise" },
            { text: "Wait na siya mag-approach", value: "passive", pts: 40, trait: "passive" },
            { text: "Move on, marami pang friends", value: "avoidant", pts: -20, trait: "dismissive" }
        ],
        fact: "🤝 Social intelligence! Strong relationships = 75% ng life happiness. Invest in connections! 💝"
    }
];

// ========== PERSONALITY PROFILES & SMART ENDINGS ==========

const PERSONALITY_TRAITS = {
    // Positive traits
    responsible: { weight: 1.0, category: "positive" },
    honest: { weight: 1.0, category: "positive" },
    humble: { weight: 1.0, category: "positive" },
    compassionate: { weight: 0.9, category: "positive" },
    disciplined: { weight: 0.9, category: "positive" },
    proactive: { weight: 0.9, category: "positive" },
    grateful: { weight: 0.9, category: "positive" },
    
    // Neutral traits
    practical: { weight: 0.6, category: "neutral" },
    reserved: { weight: 0.6, category: "neutral" },
    casual: { weight: 0.5, category: "neutral" },
    
    // Negative traits
    impulsive: { weight: 0.3, category: "negative" },
    careless: { weight: 0.2, category: "negative" },
    arrogant: { weight: 0.1, category: "negative" },
    dishonest: { weight: 0.1, category: "negative" },
    entitled: { weight: 0.1, category: "negative" }
};

const DYNAMIC_ENDINGS = {
    // Profile-based endings
    exemplary_child: {
        criteria: { positive_ratio: 0.90, avg_score: 85 },
        title: "🌟 EXEMPLARY INAANAK! WORLD-CLASS! 🌟",
        baseMultiplier: 1.2,
        bonus: 150,
        bonusMsg: "⭐ Role Model Bonus: +₱150! You inspire others!",
        personalizedMsg: (traits) => {
            const top = traits[0];
            return `You're ${top}! That's rare and valuable. Keep shining!`;
        },
        motivation: "You're not just good - you're EXCEPTIONAL! Your character, discipline, and heart are top-tier. You're already a leader, even if you don't realize it yet. The world needs more people like you!",
        psa: "🎯 CHALLENGE: Mentor someone younger. Share your habits. Your success can multiply through others! Be the change! 🚀"
    },
    
    great_kid: {
        criteria: { positive_ratio: 0.75, avg_score: 70 },
        title: "⭐ GREAT INAANAK! DOING EXCELLENT! ⭐",
        baseMultiplier: 1.0,
        bonus: 100,
        bonusMsg: "💪 Excellence Bonus: +₱100! Almost perfect!",
        personalizedMsg: (traits) => {
            return `Your strength: ${traits[0]}. Small improvements will make you unstoppable!`;
        },
        motivation: "You're doing REALLY well! A few tweaks here and there, and you'll be world-class. Your foundation is strong - now build higher!",
        psa: "📈 FOCUS AREAS: Work on those 2-3 weak spots. Track monthly progress. You're closer to excellence than you think! 💯"
    },
    
    good_potential: {
        criteria: { positive_ratio: 0.60, avg_score: 55 },
        title: "👍 GOOD INAANAK WITH HUGE POTENTIAL! 👍",
        baseMultiplier: 0.85,
        bonus: 50,
        bonusMsg: "🌱 Growth Potential: +₱50 investment in you!",
        personalizedMsg: (traits) => {
            const needs_work = traits.filter(t => PERSONALITY_TRAITS[t]?.category !== "positive");
            return `You're ${traits[0]} but need to work on: ${needs_work.slice(0,2).join(", ")}. Totally doable!`;
        },
        motivation: "You have MASSIVE potential waiting to explode! Right now you're a seed - with the right care, you'll become a tree! Don't settle for 'good enough'!",
        psa: "🎯 30-DAY PLAN: Pick ONE habit to change. ONE skill to build. Track it daily. Small wins = BIG changes! Start today! 🔥"
    },
    
    needs_guidance: {
        criteria: { positive_ratio: 0.40, avg_score: 40 },
        title: "💪 INAANAK NEEDS GUIDANCE & SUPPORT 💪",
        baseMultiplier: 0.70,
        bonus: 0,
        bonusMsg: "🧭 Direction Fund: Time to realign priorities!",
        personalizedMsg: (traits) => {
            const negative = traits.filter(t => PERSONALITY_TRAITS[t]?.category === "negative");
            return `We need to address: ${negative.slice(0,2).join(" and ")}. But I believe in you!`;
        },
        motivation: "Real talk: You're off track. But OFF TRACK ≠ LOST! Everyone struggles. What matters? GETTING BACK UP! I'm here to help guide you back!",
        psa: "🚨 IMMEDIATE ACTION: (1) Family talk TODAY. (2) List what's wrong. (3) Ask for help. We're a team - let's fix this together! 💚"
    },
    
    crisis_mode: {
        criteria: { positive_ratio: 0.25, avg_score: 25 },
        title: "🚨 URGENT: INAANAK NEEDS INTERVENTION! 🚨",
        baseMultiplier: 0.50,
        bonus: 0,
        bonusMsg: "⚠️ Wake-Up Call Fund: This is serious!",
        personalizedMsg: (traits) => {
            return `Multiple red flags detected. Primary concerns: behavior and character. Time for change!`;
        },
        motivation: "This isn't a joke anymore. Your choices are leading you down a bad path. But it's NOT too late! Right now, TODAY, you can turn everything around. But you need to COMMIT!",
        psa: "⚡ EMERGENCY PLAN: Parents meeting NOW. Counselor if needed. Reset habits completely. Delete bad influences. This is your wake-up call - take it seriously! 🆘"
    },
    
    // Special endings
    pride_intervention: {
        triggered_by: "arrogant",
        title: "🙏 HUMILITY INTERVENTION NEEDED! 🙏",
        baseMultiplier: 0.40,
        bonus: -50,
        bonusMsg: "💎 Character Penalty: -₱50. Pride is expensive!",
        motivation: "Your talent is real. Your achievements are real. But your PRIDE is killing your potential! Talent + Arrogance = NOTHING. Talent + Humility = EVERYTHING!",
        psa: "🔄 7-DAY RESET: Compliment 5 people daily. Say 'thank you' 10x. Help without bragging. Watch your life change! Pride blocks blessings! 🚫"
    },
    
    honesty_crisis: {
        triggered_by: "dishonest",
        title: "💎 INTEGRITY EMERGENCY! 💎",
        baseMultiplier: 0.35,
        bonus: -100,
        bonusMsg: "⚠️ Trust Penalty: -₱100. Honesty is everything!",
        motivation: "Dishonesty destroys EVERYTHING - relationships, opportunities, self-respect. One lie needs 100 more lies. STOP NOW before it's too late!",
        psa: "🛑 IMMEDIATE ACTION: Confess everything to parents TODAY. Clean slate. Rebuild trust step by step. Your future depends on this! ⏰"
    },
    
    find_purpose: {
        triggered_by: "no_goals",
        title: "🎯 DISCOVER YOUR PURPOSE! 🎯",
        baseMultiplier: 0.75,
        bonus: 50,
        bonusMsg: "🧭 Exploration Bonus: +₱50 to find yourself!",
        motivation: "Not knowing your direction is normal! But SEARCHING for it is mandatory! Your passion exists - you just haven't met it yet. Let's go find it!",
        psa: "✨ 30-DAY QUEST: Try 5 new activities. Shadow 3 professionals. Research 5 careers. Journal what excites you. Your calling is waiting! 🔍"
    },
    
    screen_addiction: {
        triggered_by: "addicted",
        title: "📵 DIGITAL DETOX NEEDED! 📵",
        baseMultiplier: 0.60,
        bonus: 0,
        bonusMsg: "⚠️ Reality Check: Screen time destroying your potential!",
        motivation: "Your phone is stealing your LIFE! Every scroll = minutes of dreams dying. Real success happens OFFLINE. Time to break free!",
        psa: "🔋 DETOX PLAN: 2-hour daily limit. No phone 1hr before bed. Replace with: reading, sports, family time. Reclaim your life! 💪"
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { QUESTION_BANK, PERSONALITY_TRAITS, DYNAMIC_ENDINGS };
}