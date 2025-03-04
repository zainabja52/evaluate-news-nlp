# 📰 News Article NLP Analyzer 🌐

## Overview
This web application analyzes news articles using Natural Language Processing (NLP). Users can submit a URL to get sentiment analysis, subjectivity detection, and text summarization of the article content.

## 🎥 Demo
https://github.com/user-attachments/assets/2c13ae07-b2ed-49ea-a18d-de0dc60a3293



## ✨ Features
- **🌓 Dark/Light Mode**: Smart theme switching with animations
- **🔗 URL Validation**: Checks for valid URL format
- **📊 Sentiment Analysis**: Detects positive/negative/neutral sentiment
- **🤔 Subjectivity Detection**: Identifies objective vs subjective content
- **🎉 Interactive UI**: Particles background & confetti effects
- **📝 Article Preview**: Shows summarized text with images
- **⚡ Performance**: Optimized Webpack build & service workers
- **📱 Responsive**: Works on all screen sizes
- **🧪 Test Coverage**: 90%+ test coverage with Jest

## 🛠 Tech Stack
<img align="left" alt="JavaScript" width="50px" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" />
<img align="left" alt="Node.js" width="50px" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" />
<img align="left" alt="SCSS" width="50px" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg" />
<img align="left" alt="Jest" width="50px" src="https://jestjs.io/img/favicon/favicon.ico" />
<img align="left" alt="Webpack" width="50px" src="https://www.svgrepo.com/show/306960/webpack.svg" />
<br><br>

## 🚀 Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/zainabja52/evaluate-news-nlp.git
    ```
2. Install dependencies:
    ```bash
    npm install
    ```

## 💻 Usage
1. Start development server:
    ```bash
    npm run build-dev
    ```
2. Start backend server:
    ```bash
    npm start
    ```
3. Open `http://localhost:8080` in your browser

**Production build:**
```bash
npm run build-prod
```

## 🧪 Testing
```bash
npm test
# Test coverage report
npm run test-coverage
```

## 🎨 UI Features
```javascript
// Theme switching implementation
function toggleTheme(isDark) {
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
```

## 📂 Project Structure
```
evaluate-news-nlp/
├── src/
│   ├── client/
│   │   ├── js/          # Interactive components
│   │   ├── styles/      # SCSS modules
│   │   └── views/       # Dynamic templates
│   ├── server/          # Express API
│   └── __test__/        # Test suites
├── webpack.config/       # Build configurations
├── dist/                # Production build
└── .github/             # CI/CD workflows
```

## 🌟 Advanced Features
### Real-time Analysis
```javascript
// Sentiment visualization
function updateSentiment(score) {
  const progressBar = document.getElementById('sentiment-progress');
  progressBar.style.width = `${score * 100}%`;
  progressBar.dataset.progress = `${Math.round(score * 100)}%`;
}
```

### Performance Optimization
```javascript
// Webpack service worker configuration
new GenerateSW({
  clientsClaim: true,
  skipWaiting: true,
  runtimeCaching: [{
    urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
    handler: 'CacheFirst'
  }]
})
```

