# 📰 News Article NLP Analyzer 🌐

## Overview
This web application analyzes news articles using Natural Language Processing (NLP). Users can submit a URL to get sentiment analysis, subjectivity detection, and text summarization of the article content.

## Features
- **🔗 URL Validation**: Checks for valid URL format
- **📊 Sentiment Analysis**: Detects positive/negative/neutral sentiment
- **🤔 Subjectivity Detection**: Identifies objective vs subjective content
- **📝 Text Preview**: Shows summarized article text
- **⚡ Offline Support**: Works with service workers when offline
- **🧪 Unit Tests**: Full test coverage with Jest

### Tech Stack
<img align="left" alt="JavaScript" width="50px" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" />
<img align="left" alt="Node.js" width="50px" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" />
<img align="left" alt="Jest" width="50px" src="https://jestjs.io/img/favicon/favicon.ico" />
<br><br>

## 🚀 Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/evaluate-news-nlp.git
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

For production build:
```bash
npm run build-prod 
```

## 🧪 Testing
Run unit tests with:
```bash
npm test
```

## 📂 Project Structure
```
evaluate-news-nlp/
├── src/
│   ├── client/          # Frontend code
│   │   ├── js/          # JavaScript files
│   │   ├── styles/      # SCSS stylesheets
│   │   └── views/       # HTML templates
│   ├── server/          # Backend server
│   └── __test__/        # Jest unit tests
├── webpack.dev.js       # Development config
└── webpack.prod.js      # Production config
```

## 🌟 Features Implementation
### Service Worker Setup
Configured in `webpack.prod.js`:
```javascript
const { GenerateSW } = require('workbox-webpack-plugin');
// ...
plugins: [new GenerateSW()]
```

### Sentiment Analysis Display
```javascript
function handleAnalysisResponse(data) {
    document.getElementById('sentiment-progress').style.width = `${data.scores.Positive * 100}%`;
    document.getElementById('sentiment').textContent = `Sentiment: ${data.sentiment}`;
}
```

