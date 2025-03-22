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

export const deleteData = async (params, token) => {
  try {
    const response = await fetch(`${API_URL}${params}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    return { success: true, message: "Deleted successfully" };
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};
export const updateData = async (params, body, token) => {
  try {
    const response = await fetch(`${API_URL}${params}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};