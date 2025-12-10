// ========================================
// PAMASKO QUIZ 2025 - QUESTION BANK
// Enhanced question database with 20 questions
// ========================================

const QUESTION_BANK = [
    // ===== RESPONSIBILITY =====
    {
        id: 1,
        text: "Tumutulong ka ba sa household chores nang hindi kinakailangan pang sabihan? 🏠",
        category: "responsibility",
        type: "frequency",
        options: [
            { text: "Araw-araw, walang sinabi!", value: 5, trait: "proactive" },
            { text: "Madalas, 3-4x a week", value: 4, trait: "helpful" },
            { text: "Pag sinabihan lang", value: 2, trait: "reactive" },
            { text: "Rare, busy sa phone", value: 0, trait: "distracted" }
        ],
        insight: "Kids doing daily chores develop 40% better work ethic and earn more later in life!"
    },
    
    // ===== INTEGRITY =====
    {
        id: 2,
        text: "Gaano ka ka-honest sa mga magulang about school performance? 📚",
        category: "integrity",
        type: "scale",
        options: [
            { text: "100% transparent!", value: 5, trait: "honest" },
            { text: "Mostly honest", value: 4, trait: "truthful" },
            { text: "Depende sa situation", value: 2, trait: "selective" },
            { text: "Pinapaganda ko minsan", value: 0, trait: "deceptive" }
        ],
        insight: "Honesty builds trust which leads to more freedom and better relationships!"
    },
    
    // ===== RESPECT =====
    {
        id: 3,
        text: "Sinasabi mo ba ang 'Po' at 'Opo' sa matatanda? 🙏",
        category: "respect",
        type: "frequency",
        options: [
            { text: "Palagi, natural na!", value: 5, trait: "respectful" },
            { text: "Madalas, pero minsan nakakalimutan", value: 3, trait: "trying" },
            { text: "Pag formal lang", value: 1, trait: "selective" },
            { text: "Hindi ako sanay", value: 0, trait: "casual" }
        ],
        insight: "Filipino values of respect are admired worldwide! 'Po/Opo' is our cultural treasure!"
    },
    
    // ===== DISCIPLINE =====
    {
        id: 4,
        text: "Gaano ka ka-addicted sa phone/gadgets? 📱",
        category: "discipline",
        type: "scale",
        options: [
            { text: "Balanced, may time limits", value: 5, trait: "disciplined" },
            { text: "Moderate use lang", value: 3, trait: "controlled" },
            { text: "Mahirap iwanan", value: 1, trait: "dependent" },
            { text: "First & last thing bago tulog", value: 0, trait: "addicted" }
        ],
        insight: "2-hour daily screen limit improves focus by 40% and academic performance!"
    },
    
    // ===== AMBITION =====
    {
        id: 5,
        text: "May specific goals ka ba para sa future? 🎯",
        category: "ambition",
        type: "clarity",
        options: [
            { text: "Yes! Written with action plan!", value: 5, trait: "goal_oriented" },
            { text: "May idea pero not written", value: 3, trait: "dreamer" },
            { text: "General lang (mag-improve)", value: 1, trait: "vague" },
            { text: "Wala pa, go with flow", value: 0, trait: "aimless" }
        ],
        insight: "Harvard study: Written goals are 10x more likely to be achieved!"
    },
    
    // ===== EDUCATION =====
    {
        id: 6,
        text: "Nag-aaral ka ba ahead o last minute lang? 📖",
        category: "education",
        type: "behavior",
        options: [
            { text: "Advanced reader, nag-aaral ahead", value: 5, trait: "proactive" },
            { text: "On-time, sumusunod sa schedule", value: 4, trait: "punctual" },
            { text: "Cramming pero passing", value: 2, trait: "procrastinator" },
            { text: "Bahala na, swertehin naman", value: 0, trait: "careless" }
        ],
        insight: "Students who plan ahead reduce stress by 70% and get better grades!"
    },
    
    // ===== GRATITUDE =====
    {
        id: 7,
        text: "Sinasabi mo ba 'Thank you' at 'I love you' sa family? 💝",
        category: "gratitude",
        type: "frequency",
        options: [
            { text: "Daily, part ng routine!", value: 5, trait: "loving" },
            { text: "Pag may special occasion", value: 2, trait: "reserved" },
            { text: "Pag may kailangan lang", value: 0, trait: "transactional" },
            { text: "Nahihiya ako eh", value: 1, trait: "shy" }
        ],
        insight: "Expressing gratitude releases happiness hormones and strengthens family bonds!"
    },
    
    // ===== FINANCIAL LITERACY =====
    {
        id: 8,
        text: "Ano ginagawa mo sa allowance/baon? 💰",
        category: "financial",
        type: "behavior",
        options: [
            { text: "May budget at savings!", value: 5, trait: "financially_smart" },
            { text: "Ginagastos pero may natitira", value: 3, trait: "moderate" },
            { text: "Nauubos agad, YOLO!", value: 0, trait: "impulsive" },
            { text: "Wala akong allowance", value: 2, trait: "independent" }
        ],
        insight: "Saving 20% of allowance now = ₱1 Million by age 30 through compound interest!"
    },
    
    // ===== CHARACTER TEST =====
    {
        id: 9,
        text: "May nakita kang ₱500 sa mesa ng bahay. Ano gagawin? 💵",
        category: "integrity",
        type: "scenario",
        options: [
            { text: "Itatanong kung kanino", value: 5, trait: "honest" },
            { text: "Hihintayin may maghanap", value: 4, trait: "patient" },
            { text: "Iiwan ko lang dun", value: 3, trait: "cautious" },
            { text: "Kunin, sabihin later", value: 0, trait: "impulsive" }
        ],
        insight: "95% of successful people passed this integrity test in real life situations!"
    },
    
    // ===== SOCIAL SKILLS =====
    {
        id: 10,
        text: "Relationship mo sa siblings/cousins? 👫",
        category: "social",
        type: "quality",
        options: [
            { text: "Best friends, super close!", value: 5, trait: "family_oriented" },
            { text: "Okay naman, walang away", value: 3, trait: "peaceful" },
            { text: "On-off, minsan okay minsan hindi", value: 1, trait: "unstable" },
            { text: "Laging nag-aaway", value: 0, trait: "conflicted" }
        ],
        insight: "Strong sibling bonds = lifelong support system and better mental health!"
    },
    
    // ===== COMPASSION =====
    {
        id: 11,
        text: "Tumutulong ka ba sa classmate na nahihirapan? 🤝",
        category: "social",
        type: "behavior",
        options: [
            { text: "Tutulungan without asking!", value: 5, trait: "compassionate" },
            { text: "Tutulungan pag nag-ask", value: 3, trait: "helpful" },
            { text: "Bibigyan tips lang", value: 2, trait: "minimal" },
            { text: "Busy din ako eh", value: 0, trait: "self_focused" }
        ],
        insight: "Helping others develops future leadership skills and builds networks!"
    },
    
    // ===== ORGANIZATION =====
    {
        id: 12,
        text: "Gaano ka ka-organized sa gamit mo? 📱💼",
        category: "discipline",
        type: "scale",
        options: [
            { text: "Everything has its place!", value: 5, trait: "organized" },
            { text: "Mostly organized", value: 4, trait: "tidy" },
            { text: "Organized chaos", value: 2, trait: "casual" },
            { text: "Hinahanap ko palagi", value: 0, trait: "messy" }
        ],
        insight: "Organized people are 85% more productive and successful in careers!"
    },
    
    // ===== ACHIEVEMENT =====
    {
        id: 13,
        text: "May achievement ka ba this year? (Awards, recognition) 🏆",
        category: "achievement",
        type: "quality",
        options: [
            { text: "Yes! Multiple achievements!", value: 5, trait: "achiever" },
            { text: "May isa o dalawa", value: 4, trait: "successful" },
            { text: "Small wins lang", value: 2, trait: "progressing" },
            { text: "Wala pa this year", value: 0, trait: "struggling" }
        ],
        insight: "Every achievement, big or small, builds confidence and momentum!"
    },
    
    // ===== EMOTIONAL INTELLIGENCE =====
    {
        id: 14,
        text: "Galit ka sa kapatid mo. Ano gagawin? 😤",
        category: "emotional_intelligence",
        type: "scenario",
        options: [
            { text: "Kausapin after cool down", value: 5, trait: "mature" },
            { text: "Mag-sorry agad", value: 4, trait: "humble" },
            { text: "Hintayin siya mag-approach", value: 2, trait: "passive" },
            { text: "Cold war for days", value: 0, trait: "stubborn" }
        ],
        insight: "Emotional intelligence (EQ) beats IQ in predicting life success!"
    },
    
    // ===== HUMILITY =====
    {
        id: 15,
        text: "Kahit may achievements, humble ka pa rin ba? 🌟",
        category: "character",
        type: "behavior",
        options: [
            { text: "Yes, thankful sa lahat!", value: 5, trait: "humble" },
            { text: "Share pero di nag-brag", value: 4, trait: "balanced" },
            { text: "Post everywhere with details", value: 1, trait: "showy" },
            { text: "Flex to the max!", value: 0, trait: "arrogant" }
        ],
        insight: "Humility + Success = Unstoppable! Pride destroys, humility builds!"
    },
    
    // ===== TIME MANAGEMENT =====
    {
        id: 16,
        text: "Paano mo ba-balance school, family, at play? ⚖️",
        category: "discipline",
        type: "quality",
        options: [
            { text: "May schedule, sinusunod!", value: 5, trait: "disciplined" },
            { text: "Flexible, pero natapos lahat", value: 4, trait: "adaptive" },
            { text: "Minsan nakakalimutan", value: 2, trait: "forgetful" },
            { text: "Last minute lahat", value: 0, trait: "procrastinator" }
        ],
        insight: "Time management = life management! Successful people schedule everything!"
    },
    
    // ===== COMMUNITY =====
    {
        id: 17,
        text: "Involved ka ba sa community/church activities? ⛪",
        category: "social",
        type: "frequency",
        options: [
            { text: "Yes! Active member!", value: 5, trait: "community_leader" },
            { text: "Sometimes, pag may time", value: 3, trait: "participant" },
            { text: "Rare, pag required lang", value: 1, trait: "reluctant" },
            { text: "Hindi ako sumasali", value: 0, trait: "isolated" }
        ],
        insight: "Community volunteers are 42% happier and build lifelong connections!"
    },
    
    // ===== ACADEMIC INTEGRITY =====
    {
        id: 18,
        text: "May exam, hindi ka nag-review. May nanghihingi ng sagot. Gagawin mo? 📝",
        category: "integrity",
        type: "scenario",
        options: [
            { text: "No! Kaya ko to, sariling sagot", value: 5, trait: "honest" },
            { text: "Hihiramin pero guilty ako", value: 2, trait: "conflicted" },
            { text: "Titingin, emergency naman", value: 0, trait: "cheater" },
            { text: "Mag-blangko, honest", value: 4, trait: "principled" }
        ],
        insight: "Integrity = who you are when nobody's watching. Build it young!"
    },
    
    // ===== GRATITUDE DEPTH =====
    {
        id: 19,
        text: "Naa-appreciate mo ba sacrifices ng parents? 💪",
        category: "gratitude",
        type: "scale",
        options: [
            { text: "Sobrang grateful! Alam ko lahat!", value: 5, trait: "grateful" },
            { text: "Yes, sinasabi ko rin", value: 4, trait: "appreciative" },
            { text: "Alam ko naman", value: 2, trait: "aware" },
            { text: "Hindi ko masyado naiisip", value: 0, trait: "unaware" }
        ],
        insight: "Every meal, tuition, birthday = OT, stress, sacrifice. They work for YOUR dreams!"
    },
    
    // ===== CONFLICT RESOLUTION =====
    {
        id: 20,
        text: "May away kayo ng friend. Paano mo reresolve? 💔",
        category: "social",
        type: "scenario",
        options: [
            { text: "Kausapin ASAP, ayusin", value: 5, trait: "mature" },
            { text: "Give space, then talk", value: 4, trait: "wise" },
            { text: "Wait na siya mag-approach", value: 2, trait: "passive" },
            { text: "Move on, marami pang friends", value: 0, trait: "dismissive" }
        ],
        insight: "Strong relationships = 75% of life happiness. Invest in connections!"
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { QUESTION_BANK };
}