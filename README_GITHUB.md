# 🚀 CodePath Academy - C++ Learning Platform

> A modern, production-ready educational platform for learning C++ from zero to advanced level

<div align="center">

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Language](https://img.shields.io/badge/language-C%2B%2B-red)
![HTML](https://img.shields.io/badge/HTML-5-orange)
![CSS](https://img.shields.io/badge/CSS-3-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow)

[📖 Documentation](#-documentation) • [🎓 Courses](#-courses) • [⚡ Quick Start](#-quick-start) • [🎨 Features](#-features)

</div>

---

## 📋 About

**CodePath Academy** is a modern educational platform for learning C++. This project showcases:

- ✅ **16+ complete lessons** with real C++ code
- ✅ **3 difficulty levels**: Beginner, Intermediate, Advanced  
- ✅ **50+ code examples** with detailed explanations
- ✅ **Progress tracking** via browser localStorage
- ✅ **Light & dark themes** with smooth transitions
- ✅ **100% responsive design** (mobile, tablet, desktop)
- ✅ **Smooth animations** and modern UI
- ✅ **Completely free** with no registration required

---

## 🎯 Key Features

### 🏠 Home Page
- Eye-catching hero section
- "How it works" with 4-step learning process
- Project statistics (16+ lessons, 3 levels, 50+ code examples)
- Call-to-action buttons

### 📚 Courses Page
- **3 complete C++ courses**
- Filter by difficulty level (Beginner, Intermediate, Advanced)
- Progress indicators for each course
- Beautiful course cards with statistics

### 📖 Lessons Page
- Full lesson content with code examples
- Side panel with course progress
- "What you learned" outcomes list
- Previous/Next lesson navigation
- Mark lesson as completed
- Copy code to clipboard with one click

### 📊 Progress Page
- Circular progress chart (SVG)
- Progress by difficulty level
- Detailed statistics with visual bars
- Percentage completion

### ℹ️ About Page
- Platform information and mission
- Target audience description
- Learning approach explanation
- Main features list
- Course structure overview
- Technology stack details

### 🌓 Additional Features
- Light/Dark theme toggle
- Responsive mobile menu
- Smooth page transitions
- Browser progress persistence (localStorage)
- GSAP-powered animations
- Copy code functionality

---

## 🎓 Curriculum

### 🟢 C++ for Beginners (7 lessons)
1. **What is C++?** - Introduction, history, applications
2. **Compiler Installation** - Setup for Windows/Linux/macOS
3. **Hello World** - Program structure, compilation, execution
4. **Variables & Data Types** - int, double, bool, char, string
5. **Operators & Expressions** - Arithmetic, logical, comparison
6. **Conditional Statements** - if, else, else if, switch
7. **Loops** - for, while, do-while, break, continue

### 🟡 C++ Intermediate Level (4 lessons)
1. **Functions** - Declaration, parameters, return values, scope
2. **Arrays & Strings** - Arrays, 2D arrays, string methods
3. **Pointers** - Pointers, dereferencing, dynamic memory
4. **References & Memory Management** - References, RAII, smart pointers

### 🔴 C++ Advanced Level (5 lessons)
1. **Classes & Objects** - Class definition, constructors, encapsulation
2. **Inheritance** - Class inheritance, virtual functions, hierarchy
3. **Polymorphism** - Virtual functions, abstract classes
4. **Templates** - Function templates, class templates, specialization
5. **STL** - Vector, map, set, iterators, algorithms

---

## ⚡ Quick Start

### Option 1: Direct Browser Access (Fastest)
```bash
# Simply open in your browser:
c:\Users\ххх\Desktop\SCHOOL9\index.html
```

### Option 2: Node.js Server
```bash
cd c:\Users\ххх\Desktop\SCHOOL9
node server.js
# Open http://localhost:8000
```

### Option 3: Python Server
```bash
cd c:\Users\ххх\Desktop\SCHOOL9
python -m http.server 8000
# Open http://localhost:8000
```

### Option 4: Clone from GitHub
```bash
git clone https://github.com/Dimka123987/school9.git
cd school9
node server.js
# Open http://localhost:8000
```

---

## 📁 Project Structure

```
school9/
├── 📄 index.html              # Home page
├── 📄 courses.html            # Courses listing
├── 📄 lesson.html             # Individual lesson page
├── 📄 progress.html           # Progress tracking
├── 📄 about.html              # About platform
├── 📄 server.js               # Node.js HTTP server
├── 📄 package.json            # npm configuration
│
├── 📁 src/
│   ├── 📁 css/
│   │   ├── variables.css        # CSS variables & design system
│   │   ├── base.css             # Base styles & typography
│   │   ├── components.css       # Component styles (900+ lines)
│   │   ├── animations.css       # Animations (20+ types)
│   │   └── responsive.css       # Mobile/tablet styles
│   │
│   ├── 📁 js/
│   │   ├── themes.js            # Light/Dark theme switching
│   │   ├── storage.js           # Progress storage (localStorage)
│   │   ├── courses.js           # Course utilities
│   │   └── animations.js        # GSAP animations
│   │
│   └── 📁 data/
│       └── courses.json         # 16 complete lessons content
│
└── 📁 assets/                 # Images folder
```

---

## 🎨 Technology Stack

### Frontend
- **HTML5** - Semantic structure
- **CSS3** - Grid, Flexbox, Custom Properties, Animations
- **JavaScript ES6+** - Vanilla (No frameworks)
- **GSAP 3.12+** - Advanced animations (Optional)

### Architecture
- **SPA-like** with separate HTML pages
- **localStorage** for progress persistence
- **JSON-based** course data structure
- **Modular CSS** (5 separate files)
- **Modular JavaScript** (4 modules)

### Design System
- CSS Custom Properties for colors, typography, spacing
- Light and dark theme support
- Mobile-first responsive design
- Breakpoints: 1200px, 768px, 480px
- Gradient system (primary to secondary)

---

## 📊 Statistics

| Metric | Value |
|--------|-------|
| Total Lines of Code | 5800+ |
| HTML Pages | 5 |
| CSS Files | 5 |
| JS Modules | 4 |
| Courses | 3 |
| Lessons | 16 |
| Code Examples | 50+ |
| Animations | 20+ |
| Total Size | ~0.3 MB |

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [README.md](README.md) | Project overview (this file) |
| [QUICKSTART.md](QUICKSTART.md) | Get started in 5 minutes |
| [API.md](API.md) | JavaScript API reference |
| [PAGES.md](PAGES.md) | Page structure documentation |
| [MANIFEST.md](MANIFEST.md) | Complete file listing |
| [GIT_SETUP.md](GIT_SETUP.md) | GitHub setup instructions |

---

## 💾 Progress Tracking

Progress is automatically saved in **browser localStorage**:

```javascript
// Data structure
{
    "cpp-basics": {
        "lesson-1-1": {
            "completed": true,
            "timestamp": 1234567890,
            "timeSpent": 600
        }
    }
}
```

**Features:**
- Track completion per lesson
- View overall progress percentage
- View progress by difficulty level
- Export progress as JSON
- Clear progress (for testing)

---

## 🌐 Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ 90+ |
| Firefox | ✅ 88+ |
| Safari | ✅ 14+ |
| Edge | ✅ 90+ |
| IE 11 | ❌ Not supported |

---

## 🚀 Deployment

### Quick Deploy Options

**Vercel** (Recommended)
```bash
vercel
```

**Netlify**
```bash
netlify deploy
```

**GitHub Pages**
Settings → Pages → Select main branch

**Your Own Server**
```bash
npm install
node server.js
```

---

## 🎯 Learning Path

```
Start Here (index.html)
    ↓
Choose Courses (courses.html)
    ↓
Start Learning (lesson.html)
    ↓
Track Progress (progress.html)
    ↓
Learn More (about.html)
```

---

## 🔐 Data Privacy

✅ All progress is stored locally in your browser
✅ No server-side tracking
✅ No cookies or analytics
✅ Completely private learning

---

## 🤝 Contributing

This is an educational project. Contributions welcome:

1. 🐛 Report bugs via Issues
2. 💡 Suggest features in Discussions
3. 📝 Improve documentation
4. 🎨 Suggest design improvements
5. 📚 Add new courses/lessons

```bash
git clone https://github.com/Dimka123987/school9.git
git checkout -b feature/new-feature
# Make your changes...
git commit -am "Add new feature"
git push origin feature/new-feature
```

---

## 📄 License

MIT License - Free for personal and commercial use

---

## 👨‍💻 Author

Created as a modern educational platform for learning C++

**Connect:**
- GitHub: [@Dimka123987](https://github.com/Dimka123987)
- Repository: [school9](https://github.com/Dimka123987/school9)

---

## ❓ FAQ

**Q: Do I need to install anything?**
A: No! Just open index.html in your browser. Optionally use Node.js for a local server.

**Q: Where is my progress saved?**
A: Automatically in your browser's localStorage. No account needed!

**Q: Can I download this?**
A: Yes! Clone the repo or download as ZIP. Fully open-source.

**Q: Is it really free?**
A: Yes! MIT licensed, completely free forever.

**Q: Can I use this for teaching?**
A: Absolutely! Perfect for classrooms and self-learning.

---

<div align="center">

**[⬆ Back to Top](#-codepath-academy---c-learning-platform)**

Made with ❤️ for C++ developers | © 2026 CodePath Academy

</div>
