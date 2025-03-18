const API_URL = "http://localhost:5000/api";

export const getData = async (params, token) => {
  try {
    const response = await fetch(`${API_URL}${params}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const postData = async (params, body, token) => {
  try {
    const response = await fetch(`${API_URL}${params}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
