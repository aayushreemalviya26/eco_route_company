const API_BASE_URL = "http://127.0.0.1:8000";

export const analyzeRoute = async (start, end) => {
  console.log("Frontend sending:", { start, end }); // Check your browser console
  const response = await fetch("http://127.0.0.1:8000/api/analyze-route", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      start: start.trim(), 
      end: end.trim() 
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to analyze route');
  }
  return response.json();
};