import { 
  handleSubmit, 
  isValidUrl, 
  showError, 
  clearResults,
  handleAnalysisResponse // Add this line
} from '../client/js/formHandler';

describe('Form Handler Tests', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="urlForm">
        <input id="url" value=""/>
      </form>
      <div id="error-message" class="hidden"></div>
      <div id="results" class="hidden">
        <div id="sentiment"></div>
        <div id="subjectivity"></div>
        <div id="text-preview"></div>
        <div id="sentiment-progress" class="progress"></div>
        <div id="subjectivity-progress" class="progress"></div>
      </div>
    `;

    global.fetch = jest.fn();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('URL Validation', () => {
    test('Validates correct URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://sub.domain.co.uk/path')).toBe(true);
    });

    test('Rejects invalid URLs', () => {
      expect(isValidUrl('not-a-url')).toBe(false);
      expect(isValidUrl('ftp://invalid.protocol')).toBe(false);
    });
  });

  describe('Error Handling', () => {
    test('showError displays messages', () => {
      showError('Test error');
      const errorElement = document.getElementById('error-message');
      expect(errorElement.textContent).toBe('Test error');
      expect(errorElement.classList.contains('hidden')).toBe(false);
    });

    test('clearResults resets UI', () => {
      document.getElementById('results').classList.remove('hidden');
      document.getElementById('sentiment').textContent = 'test';
      clearResults();
      
      expect(document.getElementById('results').classList.contains('hidden')).toBe(true);
      expect(document.getElementById('sentiment').textContent).toBe('');
    });
  });

  describe('Analysis Response Handling', () => {
    test('Updates UI with analysis data', () => {
      const testData = {
        sentiment: 'POSITIVE',
        scores: { Positive: 0.95, Negative: 0.05 },
        text: 'Test content'
      };

      handleAnalysisResponse(testData);

      expect(document.getElementById('results').classList.contains('hidden')).toBe(false);
      expect(document.getElementById('sentiment').textContent).toBe('Sentiment: POSITIVE');
      expect(document.getElementById('subjectivity').textContent).toContain('95%');
      expect(document.getElementById('sentiment-progress').style.width).toBe('95%');
      expect(document.getElementById('text-preview').textContent).toBe('Test content');
    });
  });

  describe('Form Submission', () => {
    test('Successful submission updates UI', async () => {
      const event = { preventDefault: jest.fn() };
      document.getElementById('url').value = 'https://valid.com';
      
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          sentiment: 'POSITIVE',
          scores: { Positive: 0.95, Negative: 0.05 },
          text: 'Sample text'
        })
      });

      await handleSubmit(event);

      expect(fetch).toHaveBeenCalledWith('http://localhost:8080/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: 'https://valid.com' })
      });

      expect(document.getElementById('results').classList.contains('hidden')).toBe(false);
      expect(document.getElementById('sentiment').textContent).toBe('Sentiment: POSITIVE');
      expect(document.getElementById('subjectivity').textContent).toContain('95%');
    });

    test('Handles invalid URL submission', async () => {
      const event = { preventDefault: jest.fn() };
      document.getElementById('url').value = 'invalid-url';
      
      await handleSubmit(event);
      
      expect(document.getElementById('error-message').textContent)
        .toBe('Invalid URL format');
    });

    test('Handles server errors', async () => {
      const event = { preventDefault: jest.fn() };
      document.getElementById('url').value = 'https://error.com';
      
      global.fetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ error: 'API failure' })
      });
    
      await handleSubmit(event);
      
      expect(document.getElementById('error-message').textContent)
        .toBe('API failure'); // Now matches the test expectation
    });
    

    test('Handles network errors', async () => {
      const event = { preventDefault: jest.fn() };
      document.getElementById('url').value = 'https://valid.com';
      
      global.fetch.mockRejectedValueOnce(new Error('Network error'));

      await handleSubmit(event);
      
      expect(document.getElementById('error-message').textContent)
        .toBe('Network error');
    });
  });
});