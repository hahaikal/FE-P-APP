const API_BASE_URL = 'http://127.0.0.1:8000';

export const fetchMatches = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/matches`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Gagal mengambil data pertandingan:", error);
    throw error;
  }
};