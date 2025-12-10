# 🎄 Pamasko Aguinaldo Quiz 2025 - Enhanced Edition

A fun, intelligent, interactive Christmas quiz for Filipino godparents (Ninong/Ninang) to assess their godchildren (inaanak) with personalized feedback, behavior analysis, and realistic aguinaldo calculations!

## 🆕 What's New in Version 2.0

### ✨ Major Enhancements
- **Smarter Scoring System**: Multi-dimensional behavioral analysis
- **GCash Voucher Layout**: Professional prize display with voucher codes
- **Intelligent Messaging**: Personalized feedback based on behavior patterns
- **Enhanced Questions**: 20 behavioral questions covering 10 categories
- **Local Storage**: Session history tracking without database
- **Better UX**: Smooth animations, mobile-responsive, accessibility features

### 💰 Prize System (₱20 - ₱500)
- **Base Amount**: ₱500
- **Dynamic Calculation**: Based on percentage score + bonuses
- **Bonus System**:
  - 90%+: +₱100 (Exceptional)
  - 80-89%: +₱50 (Outstanding)
  - 70-79%: +₱25 (Great)
  - <45%: -₱50 (Needs Work)

## 📁 Project Structure

```
pamasko/
├── index.html                          # Main HTML file
├── css/
│   ├── style.css                       # Core styles & layout
│   └── components.css                  # Component-specific styles
├── js/
│   ├── config.js                       # Configuration constants
│   ├── main.js                         # Main application logic
│   ├── storage.js                      # Local storage manager
│   ├── scoring.js                      # Scoring engine
│   ├── messages.js                     # Message generator
│   └── questions/
│       └── question-bank.js            # Question database (20 questions)
├── .gitignore                          # Git ignore file
├── LICENSE                             # MIT License
└── README.md                           # This file
```

## ✨ Features

### 🎯 **Smart Scoring System**
- **Multi-dimensional Analysis**: 
  - Raw score calculation
  - Percentage-based grading
  - Category breakdown (responsibility, integrity, respect, etc.)
  - Dominant trait identification
  - Behavior flag detection

### 🎓 **10 Assessment Categories**
1. **Responsibility** - Household chores, duties
2. **Integrity** - Honesty, academic integrity
3. **Respect** - Filipino values, manners
4. **Discipline** - Screen time, organization
5. **Ambition** - Goals, future planning
6. **Education** - Study habits, achievement
7. **Gratitude** - Family appreciation
8. **Financial** - Money management
9. **Social** - Relationships, community
10. **Emotional Intelligence** - Conflict resolution

### 💬 **Intelligent Messaging**
- **5 Performance Tiers**:
  - Exceptional (90%+)
  - Outstanding (75-89%)
  - Great (60-74%)
  - Needs Improvement (45-59%)
  - Critical (<45%)

- **Each Message Includes**:
  - Personalized assessment based on behavior
  - Motivational message tailored to personality
  - Specific action plan with steps
  - Category strength/weakness analysis
  - Dominant trait identification

### 💳 **GCash-Style Voucher**
- Professional voucher layout
- Animated prize reveal
- Unique voucher codes
- Performance statistics
- Bonus/penalty breakdown

### 💾 **Local Storage System**
- Session history (up to 50 sessions)
- View past attempts
- Statistics tracking
- Export/import capability
- No database required

### 🎨 **Beautiful Design**
- Christmas-themed gradient backgrounds
- Floating parol (star) decorations
- Smooth animations and transitions
- Mobile-responsive layout
- Accessibility features (keyboard nav, screen readers)

## 🚀 Quick Start

### Installation
```bash
# 1. Clone or download the repository
git clone https://github.com/yourusername/pamasko-quiz.git

# 2. Navigate to the project folder
cd pamasko-quiz

# 3. Open index.html in your browser
# No build process or server required!
```

### Usage
1. Open `index.html` in any modern web browser
2. Answer 10 randomly selected questions
3. View your personalized result with:
   - GCash-style voucher with prize amount
   - Detailed behavioral assessment
   - Personalized motivation
   - Specific action plan
4. Screenshot and send to Ninong/Ninang on FB Messenger!
5. Click "Try Again" for different questions

## 🎓 Question System

### Question Types
- **Frequency**: How often do you do X?
- **Scale**: Rate yourself 1-5
- **Scenario**: What would you do in X situation?
- **Behavior**: How do you handle X?

### Each Question Includes
- Clear, relatable text in Filipino
- 4 answer options with point values (0-5)
- Trait mapping for personality analysis
- Educational insight/fun fact

### Sample Questions
- "Tumutulong ka ba sa household chores?"
- "Gaano ka ka-honest sa parents?"
- "May nakita kang ₱500 sa mesa. Ano gagawin?"
- "Sinasabi mo ba 'Po' at 'Opo'?"

## 🎯 Scoring Details

### Point System
- Each question: 0-5 points
- Total possible: 50 points (10 questions × 5)
- Percentage calculated: (actual/50) × 100

### Prize Calculation Formula
```
baseAmount = 500
multiplier = percentage / 100
bonus = based on tier
finalAmount = (baseAmount × multiplier) + bonus
finalAmount = max(20, min(500, finalAmount))
```

### Behavior Analysis
- Tracks dominant personality traits
- Identifies strength categories
- Flags areas needing improvement
- Provides category-wise breakdown

## 🔧 Configuration

### Edit `js/config.js`
```javascript
const CONFIG = {
    BASE_AMOUNT: 500,        // Base prize amount
    MIN_AMOUNT: 20,          // Minimum prize
    MAX_AMOUNT: 500,         // Maximum prize
    TOTAL_QUESTIONS: 10,     // Questions per quiz
    
    THRESHOLDS: {            // Score thresholds
        EXCEPTIONAL: 90,
        OUTSTANDING: 75,
        GREAT: 60,
        NEEDS_IMPROVEMENT: 45
    },
    
    BONUS: {                 // Bonus amounts
        EXCEPTIONAL: 100,
        OUTSTANDING: 50,
        GREAT: 25,
        PENALTY: -50
    }
};
```

## 🎨 Customization

### Adding New Questions
Edit `js/questions/question-bank.js`:

```javascript
{
    id: 21,
    text: "Your question here? 🎯",
    category: "responsibility", // or any category
    type: "scale",
    options: [
        { text: "Option 1", value: 5, trait: "positive_trait" },
        { text: "Option 2", value: 3, trait: "neutral_trait" },
        { text: "Option 3", value: 1, trait: "concerning_trait" },
        { text: "Option 4", value: 0, trait: "negative_trait" }
    ],
    insight: "💡 Educational fact or insight!"
}
```

### Customizing Styles
- **Main styles**: `css/style.css`
- **Component styles**: `css/components.css`
- **CSS variables** in `:root` for easy theming

### Modifying Messages
Edit message templates in `js/messages.js`

## 📱 Browser Support

- ✅ Chrome 90+ (recommended)
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Requirements
- JavaScript enabled
- Local storage enabled (for history)
- Modern browser with ES6 support

## 🔐 Privacy & Data

- **100% Client-Side**: No server, no database
- **Local Storage Only**: Data stays on user's device
- **No Tracking**: No analytics, no cookies
- **Privacy-First**: Can be used completely offline

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

Free to use and modify for personal use. Please maintain:
- Credit to original author
- Spirit of positive motivation
- Filipino cultural values

## 🙏 Credits

**Developer**: Niel Blanca  
**Facebook**: [StackRealm](https://www.facebook.com/StackRealm/)  
**Year**: 2025  
**Version**: 2.0.0

Made with ❤️ for Filipino families celebrating the Christmas tradition of giving aguinaldo!

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/pamasko-quiz/issues)
- **Facebook**: [StackRealm Page](https://www.facebook.com/StackRealm/)
- **Email**: your-email@example.com

---

## 🎄 Merry Christmas! Maligayang Pasko! 🎅

*"Ang tunay na yaman ay hindi pera, pero pera pa rin sana!"* - Every Ninong/Ninang 😄

### 🌟 Remember:
The real gift isn't the money - it's the love, guidance, and care that binds Ninong/Ninang and Inaanak together. This quiz is just a fun way to strengthen that bond!

**May your Christmas be filled with joy, love, and aguinaldo!** 🎁💝