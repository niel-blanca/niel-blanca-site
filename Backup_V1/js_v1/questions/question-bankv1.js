// js/questions/question-bank.js
// Pamasko Quiz - Question Bank with Filipino Spirit

const QUESTION_BANK = [
    // ========== CATEGORY: VALUES & RELATIONSHIP ==========
    {
        id: "q1",
        text: "Inaanak ba talaga kita? Sigurado ka? 🤔",
        category: "values",
        yes: { pts: 50 },
        no: { pts: -100, end: "not_godchild" },
        fact: "💡 Sa Pilipinas, average of 15-20 inaanak per ninong/ninang. Pero real talk: dapat totoo ang connection natin! Quality over quantity! 😊"
    },
    {
        id: "q2",
        text: "Alam mo ba birthday ko? At least ang month? 🎂",
        category: "values",
        yes: { pts: 75 },
        no: { pts: 0 },
        fact: "📅 Fun fact: Only 15% ng inaanak knows their ninong/ninang's birthday. Pero okay lang! What matters is we care for each other! Set a reminder na! 💝"
    },
    {
        id: "q3",
        text: "Nakikita mo ba ako at least once a year? (Hindi lang pag Pasko?) 🤝",
        category: "values",
        yes: { pts: 50 },
        no: { pts: 0 },
        fact: "👥 Studies show: Regular family interaction builds stronger relationships. Let's not be seasonal friends lang ha! Year-round tayo! 😄"
    },

    // ========== CATEGORY: BEHAVIOR & CHARACTER ==========
    {
        id: "q4",
        text: "Mabait ka ba sa parents mo? Honest answer lang! 👨‍👩‍👧",
        category: "behavior",
        yes: { pts: 100 },
        no: { pts: -50 },
        fact: "❤️ Harvard research: Kids who respect parents grow 75% more successful & happier. Your parents are your first heroes! Treat them like VIPs! 💪"
    },
    {
        id: "q5",
        text: "Tumutulong ka ba sa household chores? Kahit simple tasks? 🏠",
        category: "behavior",
        yes: { pts: 75 },
        no: { pts: 0 },
        fact: "🧹 Did you know? Kids doing chores earn 40% more in their careers later! Life skills = money skills. Plus, 'Salamat anak' from parents? Priceless! 😊"
    },
    {
        id: "q6",
        text: "Mabait ka ba sa mga kapatid/pinsan mo? 👫",
        category: "behavior",
        yes: { pts: 50 },
        no: { pts: -25 },
        fact: "👨‍👩‍👧‍👦 Sibling fact: 80% ng successful people credit their siblings as inspiration. Bond with them now - they're your lifelong squad! 🤝"
    },
    {
        id: "q7",
        text: "Sinasabi mo ba ng 'Po' at 'Opo' sa matatanda? 🙏",
        category: "behavior",
        yes: { pts: 50 },
        no: { pts: 0 },
        fact: "🇵🇭 Filipino pride: 'Po/Opo' shows respect worldwide! Other countries admire our culture. Ikaw na mag-represent ng Pinoy values! 👏"
    },
    {
        id: "q8",
        text: "Nagsasalita ka ba ng maganda kahit galit ka? 😤",
        category: "behavior",
        yes: { pts: 75 },
        no: { pts: 0 },
        fact: "💬 Psychology fact: People with emotional control earn 58% more respect at work. Master your words, master your future! Self-control FTW! 🎯"
    },

    // ========== CATEGORY: EDUCATION & GROWTH ==========
    {
        id: "q9",
        text: "Nakapasa ka ba this semester/quarter? 📚",
        category: "education",
        yes: { pts: 100 },
        no: { pts: -75 },
        fact: "🎓 Real talk: Education is your superpower! Bill Gates, Mark Zuckerberg - all started with good education. Not about perfect scores - it's about learning! 📈"
    },
    {
        id: "q10",
        text: "Nag-effort ka ba talaga mag-aral? Hindi lang copy-paste sa Google? 📖",
        category: "education",
        yes: { pts: 75 },
        no: { pts: 0 },
        fact: "💡 Success secret: Real effort = real results! Yung confidence from 'I earned this' beats 'I cheated' anytime. Future you will thank present you! 💪"
    },
    {
        id: "q11",
        text: "May awards/recognition ka ba this year? Kahit certificate lang! 🏆",
        category: "education",
        yes: { pts: 100 },
        no: { pts: 0 },
        fact: "⭐ Every win counts! Perfect attendance? Amazing! Helping classmates? Leadership! Remember: Character beats certificates any day! 👑"
    },
    {
        id: "q12",
        text: "Nagbabasa ka ba ng books or educational content for fun? 📖",
        category: "education",
        yes: { pts: 50 },
        no: { pts: 0 },
        fact: "📚 CEO secret: Bill Gates reads 50 books/year! Elon Musk learned rocket science from books! Start with 1 book/month. Reading = riches! 🚀"
    },
    {
        id: "q13",
        text: "Nag-aaral ka ba ahead? Hindi lang last minute? ⏰",
        category: "education",
        yes: { pts: 75 },
        no: { pts: 0 },
        fact: "📅 Time management fact: Students who plan ahead reduce stress by 70%! Cramming = brain damage. Planning = brain power! Work smart! 🧠"
    },

    // ========== CATEGORY: RESPONSIBILITY & HONESTY ==========
    {
        id: "q14",
        text: "Honest ka ba sa parents about school performance? 🤝",
        category: "character",
        yes: { pts: 100 },
        no: { pts: -50 },
        fact: "💎 Trust fact: Honesty builds relationships! Mahirap aminin ang mistakes, pero that's how we GROW! Parents respect truth over perfection! 🙏"
    },
    {
        id: "q15",
        text: "Responsible ka ba sa gamit mo? Phone, bag, assignments? 📱",
        category: "character",
        yes: { pts: 75 },
        no: { pts: 0 },
        fact: "🎯 Life skill alert: Responsibility with small things = success with big things! Future CEO material starts here. Keep it up! 🌟"
    },
    {
        id: "q16",
        text: "Sumusunod ka ba sa curfew/house rules ng parents? 🏠",
        category: "character",
        yes: { pts: 50 },
        no: { pts: 0 },
        fact: "⏰ Discipline = freedom! Rules teach self-management. CEOs, athletes, leaders - all have discipline. Future success training starts now! 👔"
    },
    {
        id: "q17",
        text: "Kapag may binulgar sayo, pinapahalagahan mo ba? 💰",
        category: "character",
        yes: { pts: 50 },
        no: { pts: 0 },
        fact: "💵 Money management 101: Saving 20% of baon = ₱5,000/year! Start young, retire rich. Wise inaanak = wealthy adult! 🏦"
    },

    // ========== CATEGORY: GOALS & DREAMS ==========
    {
        id: "q18",
        text: "May dreams/goals ka ba for your future? 🌟",
        category: "goals",
        yes: { pts: 100 },
        no: { pts: 0, end: "find_passion" },
        fact: "🎯 Harvard study: People with written goals earn 10x more! Dream big, start small. Every billionaire started with a dream. What's yours? 💭✨"
    },
    {
        id: "q19",
        text: "Gumagawa ka ba ng steps to achieve your goals? 📋",
        category: "goals",
        yes: { pts: 100 },
        no: { pts: 0 },
        fact: "🪜 Action beats dreams! Goals without steps = wishes. Baby steps count! Remember: Progress > Perfection. One step daily = 365 steps yearly! 👣"
    },
    {
        id: "q20",
        text: "May ginagawa ka bang hobby/skill development? 🎨",
        category: "goals",
        yes: { pts: 75 },
        no: { pts: 0 },
        fact: "🎯 Hidden talent alert: Drawing, coding, sports - yan future career mo! Mark Zuckerberg started coding as hobby. Explore your potential! 🚀"
    },

    // ========== CATEGORY: GRATITUDE & VALUES ==========
    {
        id: "q21",
        text: "Sinasabi mo ba 'Thank you' & 'I love you' sa family? 🙏",
        category: "gratitude",
        yes: { pts: 75 },
        no: { pts: 0 },
        fact: "💝 Science says: Expressing gratitude increases happiness by 25%! Simple 'Thank you' makes parents' whole day! Try tonight, watch them smile! 😊"
    },
    {
        id: "q22",
        text: "Alam mo ba kung gaano kahirap ang sacrifices ng parents mo? 💪",
        category: "gratitude",
        yes: { pts: 100 },
        no: { pts: 0 },
        fact: "👨‍👩‍👧 Reality check: Every meal, tuition, birthday = overtime, stress, sacrifice. They work for YOUR dreams. Never, ever forget that! ❤️"
    },
    {
        id: "q23",
        text: "Nag-aambag ka ba financially kahit ₱20 from allowance? 💵",
        category: "gratitude",
        yes: { pts: 100 },
        no: { pts: 0 },
        fact: "💰 Maturity level 100! Even ₱20 shows huge heart! Not about amount - it's the spirit of contributing. Future philanthropist ka! 🌟"
    },

    // ========== CATEGORY: HUMILITY & WISDOM ==========
    {
        id: "q24",
        text: "Kahit may achievements, humble ka pa rin ba? 🌟",
        category: "humility",
        yes: { pts: 100 },
        no: { pts: -100, end: "pride" },
        fact: "🙏 Filipino wisdom: 'Ang tunay na mayaman, 'di nagmamalaki.' Humble + Success = Unstoppable! Pride = downfall. Choose wisely! 👑"
    },
    {
        id: "q25",
        text: "Open-minded ka ba sa feedback/constructive criticism? 💬",
        category: "humility",
        yes: { pts: 75 },
        no: { pts: 0 },
        fact: "🎯 Growth hack: Feedback = free improvement lessons! Warren Buffett, Steve Jobs - all welcomed criticism. Level up your mindset! 📈"
    },
    {
        id: "q26",
        text: "Nag-aapologize ka ba kapag nagkamali? 🙏",
        category: "humility",
        yes: { pts: 75 },
        no: { pts: 0 },
        fact: "💪 Strength fact: Saying 'sorry' shows maturity, not weakness! Real leaders admit mistakes. Ego kills careers, humility builds empires! 🏰"
    },

    // ========== CATEGORY: SOCIAL & COMMUNITY ==========
    {
        id: "q27",
        text: "Tumutulong ka ba sa community/church activities? ⛪",
        category: "social",
        yes: { pts: 100 },
        no: { pts: 0 },
        fact: "🌍 Bayanihan spirit! Service to others = Filipino DNA! Harvard study: Volunteers are 42% happier. Help others, help yourself! 🤝"
    },
    {
        id: "q28",
        text: "May kaibigan ka bang positive influence sayo? 👥",
        category: "social",
        yes: { pts: 50 },
        no: { pts: 0 },
        fact: "👫 Truth bomb: 'Show me your friends, I'll show you your future!' Choose friends who lift you UP, not drag you DOWN! Surround yourself wisely! 🚀"
    },
    {
        id: "q29",
        text: "Tinutulungan mo ba classmates na nahihirapan? 🤝",
        category: "social",
        yes: { pts: 75 },
        no: { pts: 0 },
        fact: "💪 Leadership secret: Helping others builds your own skills too! Teaching = learning twice! Future boss ka nyan! Keep it up! 🔄"
    },
    {
        id: "q30",
        text: "Respectful ka ba sa teachers/authority figures? 👨‍🏫",
        category: "social",
        yes: { pts: 50 },
        no: { pts: 0 },
        fact: "🎓 Success pattern: Respectful students get 60% more opportunities! Teachers remember & recommend polite students. Respect = doors opening! 🚪"
    }
];

const ENDINGS = {
    perfect: {
        title: "🌟 PERFECT INAANAK! AMAZING! 🌟",
        message: "You're doing EVERYTHING right! Super proud na proud ako sayo!",
        multiplier: 1.0,
        bonus: 100,
        bonusMsg: "✨ Excellence Bonus: +₱100 for being exemplary!",
        motivation: "Keep being this awesome! You're not just living, you're THRIVING! Your attitude inspires everyone around you. Never stop growing, never stop caring. The world needs more people like you!",
        psa: "💡 MISSION: Share your blessings & wisdom. Teach your friends what you know. Lift others up. Together tayong aasenso! Remember: True success = helping others succeed too! 🚀"
    },
    
    excellent: {
        title: "⭐ EXCELLENT! GREAT INAANAK! ⭐",
        message: "You're doing really well! Just small improvements na lang!",
        multiplier: 0.9,
        bonus: 50,
        bonusMsg: "🎯 Near-Perfect Bonus: +₱50! Malapit ka na!",
        motivation: "You're on the perfect path! Those small areas? Easy fix lang yan! Every day you get better. Every choice brings you closer to your dreams. I see your potential - it's HUGE!",
        psa: "📈 NEXT LEVEL PLAN: Identify 2-3 weak spots. Focus on ONE per month. Track your progress. Before you know it, perfect ka na! You can do this! Kaya mo yan! 💪"
    },
    
    good: {
        title: "👍 GOOD JOB! KEEP LEVELING UP! 👍",
        message: "You're doing okay, pero I KNOW you can be GREAT!",
        multiplier: 0.75,
        bonus: 25,
        bonusMsg: "💪 Growth Investment: +₱25 para sa self-improvement!",
        motivation: "You have SO MUCH potential inside you! Don't settle for 'okay' when GREATNESS is waiting! I see it in you - that fire, that drive. Fan the flames! Start small, dream BIG!",
        psa: "🎯 ONE-MONTH CHALLENGE: Pick ONE skill to improve. Read one book. Make one new habit. Small changes = BIG results! Prove to yourself you can level up! Go! 🌱"
    },
    
    needs_work: {
        title: "💪 TIME TO LEVEL UP, INAANAK! 💪",
        message: "Kailangan tayo mag-heart-to-heart talk. But I'm here to HELP!",
        multiplier: 0.6,
        bonus: 0,
        bonusMsg: "🔄 Fresh Start Fund: Use this wisely. Time to change!",
        motivation: "Real talk: Everyone struggles. EVERYONE. What separates winners from losers? Winners get back up! You're not failing - you're LEARNING. But now, it's action time! I BELIEVE you can turn everything around!",
        psa: "🚨 ACTION PLAN TODAY: (1) Talk to parents HONESTLY. (2) List 3 things to improve. (3) Ask for help - family, teachers, me! We ALL want you to succeed! Let's do this together! 💚"
    },
    
    study_harder: {
        title: "📚 EDUCATION PRIORITY, INAANAK! 📚",
        message: "Grades matter! Let's get serious about your future!",
        multiplier: 0.5,
        bonus: 0,
        bonusMsg: "📖 School Supplies Fund: Invest in your education!",
        motivation: "Listen carefully: Your BRAIN is your ticket to success! No inheritance, no business - pero may utak ka! That's MORE valuable! Kaya mo yan, just need discipline & effort! I'll help you!",
        psa: "⚡ URGENT ACTION: (1) Make study schedule TODAY. (2) Find study buddy this week. (3) Ask teacher for help. Next quarter target: PASSING GRADES minimum! We'll celebrate together! Promise! 🤝"
    },
    
    pride: {
        title: "🙏 HUMILITY CHECK, INAANAK! 🙏",
        message: "Pride is blocking your blessings. Let's fix this!",
        multiplier: 0.4,
        bonus: 0,
        bonusMsg: "💎 Character Building Investment: Learn from this moment!",
        motivation: "'Pride goes before the fall' - totoo yan! You're talented, YES! But talent + pride = WASTED. Talent + humility = UNSTOPPABLE FORCE! Choose wisely. Your future depends on it!",
        psa: "💡 7-DAY CHALLENGE: (1) Compliment 3 people daily. (2) Say 'thank you' more. (3) Help someone without bragging. Feel the difference? That's humility's superpower! Try it! 🌟"
    },
    
    find_passion: {
        title: "🎯 DISCOVER YOUR PURPOSE! 🎯",
        message: "Life needs direction! Let's find what makes you excited!",
        multiplier: 0.7,
        bonus: 30,
        bonusMsg: "🧭 Exploration Fund: +₱30 to discover yourself!",
        motivation: "Not knowing your path is TOTALLY NORMAL! Most teens don't know! But successful people? They EXPLORED until they found it! Your passion exists - we just need to discover it together!",
        psa: "✨ 30-DAY DISCOVERY: (1) Try 3 new hobbies/activities. (2) Talk to 3 people about their careers. (3) Research 3 different college courses. Keep journal of what excites you! Your calling awaits! 🎵"
    },
    
    not_godchild: {
        title: "🤔 WAIT... WHAT?! HAHAHA! 🤔",
        message: "Hindi ka pala inaanak ko? Naligaw ka ata! 😅",
        multiplier: 0,
        bonus: 100,
        bonusMsg: "😂 Honesty Jackpot: +₱100 for being REAL!",
        motivation: "Okay this is AWKWARD but HILARIOUS! 😂 You know what I love? Your HONESTY! Most people would lie for money. You chose TRUTH. That's real character right there!",
        psa: "🎄 GO FIND YOUR REAL NINONG/NINANG NOW! They probably have better aguinaldo! 😂 But seriously, good luck sa life! Stay honest always - it's rare & valuable! You'll go far! 😊"
    }
};

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { QUESTION_BANK, ENDINGS };
}