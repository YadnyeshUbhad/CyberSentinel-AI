const API_BASE_URL = "http://localhost:8000/api";

export const analyzeText = async (text) => {
  const response = await fetch(`${API_BASE_URL}/analyze/text`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail || "Text analysis failed");
  }
  return response.json();
};

export const analyzeUrl = async (url) => {
  const response = await fetch(`${API_BASE_URL}/analyze/url`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });
  
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail || "URL analysis failed");
  }
  return response.json();
};

export const analyzeFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/analyze/file`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail || "File analysis failed");
  }
  return response.json();
};

export const getScanHistory = async () => {
  const response = await fetch(`${API_BASE_URL}/history`);
  if (!response.ok) {
    throw new Error("Failed to fetch scan history");
  }
  return response.json();
};

export const getDashboardStats = async () => {
  const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
  if (!response.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }
  return response.json();
};
