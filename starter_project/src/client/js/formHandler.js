// starter_project\src\client\js\formHandler.js
function isValidUrl(url) {
    try {
        const urlObj = new URL(url);
        return ['http:', 'https:'].includes(urlObj.protocol);
    } catch {
        return false;
    }
}
function showError(message) {
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
}

function clearResults() {
    const results = document.getElementById('results');
    if (results) results.classList.add('hidden');
    
    ['sentiment', 'subjectivity', 'text-preview'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = '';
    });
}

function handleAnalysisResponse(data) {
    const results = document.getElementById('results');
    if (!results) return;

    results.classList.remove('hidden');

    // Update Sentiment
    const sentimentScore = data.scores?.Positive || 0;
    document.getElementById('sentiment-progress').style.width = `${sentimentScore * 100}%`;
    document.getElementById('sentiment').textContent = `Sentiment: ${data.sentiment}`;

    // Update Confidence
    const mainScore = Math.max(...Object.values(data.scores || {}));
    document.getElementById('subjectivity-progress').style.width = `${mainScore * 100}%`;
    document.getElementById('subjectivity').textContent = `Confidence: ${Math.round(mainScore * 100)}%`;

    // Update text preview
    document.getElementById('text-preview').textContent = data.text || 'No text available';
}

async function handleSubmit(event) {
    event.preventDefault();
    const errorElement = document.getElementById('error-message');
    errorElement.classList.add('hidden');
    clearResults();

    try {
        const url = document.getElementById('url').value.trim();
        if (!url) throw new Error('Please enter a URL');
        if (!isValidUrl(url)) throw new Error('Invalid URL format');

        const response = await fetch('http://localhost:8080/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Analysis failed');
        }

        handleAnalysisResponse(data);

    } catch (error) {
        showError(error.message);
        console.error('Error:', error);
    }
}

// Initialize form
if (typeof document !== 'undefined') {
    const form = document.getElementById('urlForm');
    if (form) form.addEventListener('submit', handleSubmit);
}

export { 
    handleSubmit, 
    isValidUrl, 
    showError, 
    clearResults,
    handleAnalysisResponse // Added missing export
  };