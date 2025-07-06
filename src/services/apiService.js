const API_BASE_URL = 'http://127.0.0.1:8000';

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.json();
};

const handleError = (error, context) => {
  console.error(`Gagal ${context}:`, error);
  throw error;
};

export const fetchMatches = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/matches`);
    return await handleResponse(response);
  } catch (error) {
    handleError(error, "mengambil daftar pertandingan");
  }
};

export const fetchPrediction = async (matchId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/matches/${matchId}/prediction`);
    return await handleResponse(response);
  } catch (error) {
    handleError(error, `mengambil prediksi untuk match ${matchId}`);
  }
};

export const fetchMatchDetails = async (matchId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/matches/${matchId}`);
    return await handleResponse(response);
  } catch (error) {
    handleError(error, `mengambil detail untuk match ${matchId}`);
  }
};