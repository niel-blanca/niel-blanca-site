# 🎄 Pamasko Aguinaldo Quiz - Positive Ninong Edition

A fun, interactive quiz for Filipino godparents (Ninong/Ninang) to assess their godchildren (inaanak) with positive motivation, cultural humor, and realistic aguinaldo (Christmas gift money) calculations!

## 📁 Project Structure

```
pamasko/
├── index.html                      # Main HTML file
├── css/
│   └── style.css                   # All styles and animations
├── js/
│   ├── main.js                     # Core quiz logic and functionality
│   └── questions/
│       └── question-bank.js        # Question database and endings
└── README.md                       # This file
```

## ✨ Features

### 🎯 **Smart Question System**
- **30+ Questions** across 7 categories:
  - Values & Relationship
  - Behavior & Character
  - Education & Growth
  - Responsibility & Honesty
  - Goals & Dreams
  - Gratitude & Values
  - Humility & Wisdom
  - Social & Community

- **Random Selection**: Each quiz picks 8 random questions from different categories
- **No Repetition**: Questions are shuffled for variety every time

### 💰 **Realistic Aguinaldo Calculation**
- **Base Amount**: ₱500
- **Score-Based**: Final amount depends on quiz performance
- **Range**: ₱30 - ₱600
- **Formula**: Base × Multiplier + Bonus

### 🎭 **8 Different Endings**
1. **Perfect** (95%+) - ₱600 (₱500 × 1.0 + ₱100 bonus)
2. **Excellent** (85-94%) - ₱500 (₱500 × 0.9 + ₱50 bonus)
3. **Good** (70-84%) - ₱400 (₱500 × 0.75 + ₱25 bonus)
4. **Needs Work** (50-69%) - ₱300 (₱500 × 0.6)
5. **Study Harder** (<50%) - ₱250 (₱500 × 0.5)
6. **Pride Lesson** - ₱200 (₱500 × 0.4)
7. **Find Passion** - ₱380 (₱500 × 0.7 + ₱30 bonus)
8. **Not Godchild** - ₱100 (honesty bonus!)

### 📊 **Each Ending Includes**:
- ✅ **Title**: Engaging and appropriate
- ✅ **Short Message**: Personal and caring
- ✅ **Aguinaldo Amount**: Calculated realistically
- ✅ **Bonus/Conditions**: Humor and motivation
- ✅ **PSA/Goals**: Actionable advice and next steps

### 🎨 **Beautiful Design**
- Christmas-themed gradient background
- Floating parol (star) decorations
- Smooth animations and transitions
- Mobile-responsive design
- Progress tracking with visual feedback
- "Ninong's Heart" meter showing love level

### 📱 **Interactive Elements**
- Animated money counter
- Score breakdown display
- Fun facts with Filipino culture and humor
- Smooth question transitions
- Screenshot reminder for FB Messenger

## 🚀 How to Use

### Installation
```bash
# 1. Download/clone the project
# 2. Ensure folder structure is correct:
pamasko/
├── index.html
├── css/style.css
├── js/main.js
└── js/questions/question-bank.js

# 3. Open index.html in your browser
# No server required! Pure HTML/CSS/JS
```

### Usage
1. Open `index.html` in any modern web browser
2. Answer 8 randomly selected questions
3. View your personalized result with aguinaldo amount
4. Screenshot and send to Ninong/Ninang on FB Messenger
5. Click "Try Again" for different questions!

## 🎓 Educational Focus

All questions and endings are designed to:
- ✅ **Motivate** rather than criticize
- ✅ **Educate** with real facts and statistics
- ✅ **Encourage** positive behavior and growth
- ✅ **Guide** with actionable advice
- ✅ **Celebrate** Filipino culture and values

## 💡 Fun Facts Feature

Each question includes a fun fact that:
- Mixes reality with humor
- Provides educational value
- References Filipino culture
- Includes statistics and research
- Motivates positive change

Examples:
- "Kids doing chores earn 40% more in their careers later!"
- "Only 15% ng inaanak knows their ninong's birthday"
- "Bill Gates reads 50 books per year!"

## 🎯 Scoring System

### Points Distribution:
- **Positive behaviors**: +50 to +100 points
- **Neutral answers**: 0 points
- **Negative behaviors**: -25 to -100 points

### Special Cases:
- Forced endings for critical answers (pride, not godchild)
- Bonus points for exceptional behavior
- Scaled multipliers based on overall performance

## 🔧 Customization

### Adding New Questions
Edit `js/questions/question-bank.js`:

```javascript
{
    id: "q31",
    text: "Your question here? 🎯",
    category: "behavior", // or: values, education, character, goals, gratitude, humility, social
    yes: { pts: 75 },
    no: { pts: 0 },
    fact: "💡 Your interesting fact with humor and reality!"
}
```

### Modifying Endings
Edit `ENDINGS` object in `js/questions/question-bank.js`:

```javascript
ending_name: {
    title: "🎉 YOUR TITLE 🎉",
    message: "Your caring message here",
    multiplier: 0.9, // 0.0 to 1.0
    bonus: 50, // Additional amount
    bonusMsg: "✨ Bonus description",
    motivation: "Motivational message",
    psa: "📢 Actionable advice"
}
```

### Changing Base Amount
Edit in `js/main.js`:
```javascript
const baseAmount = 500; // Change to any amount
```

## 🎨 Styling Customization

All styles are in `css/style.css`:
- Colors: Search for color codes (e.g., `#c31432`)
- Fonts: Modify `@import` and `font-family`
- Animations: Edit `@keyframes` sections
- Layout: Adjust `.container` max-width and padding

## 📱 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🙏 Credits

Made with ❤️ for Filipino families celebrating Christmas tradition of giving aguinaldo to inaanak!

## 📄 License

Free to use and modify for personal use. Please maintain the spirit of positive motivation and Filipino cultural values!

---

## 🎄 Merry Christmas! Maligayang Pasko! 🎅

*"Ang tunay na yaman ay hindi pera, pero pera pa rin sana!" - Every Ninong/Ninang* 😄