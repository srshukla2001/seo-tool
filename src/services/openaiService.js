import axios from 'axios';

export const generateKeywords = async (topic, description) => {
  // Uncomment the following code to use the real API when your quota issue is resolved.
  /*
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/gpt-3.5-turbo-0125/completions',
      {
        prompt: `Generate SEO keywords for: ${topic}\n\nDescription: ${description}`,
        max_tokens: 50,
        n: 1,
        stop: null,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
        },
      }
    );
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error generating keywords:', error);
    return '';
  }
  */

  // Mock Data
  const mockKeywords = `SEO, Marketing, Content Strategy, ${topic}, Online Visibility`;
  return mockKeywords;
};
