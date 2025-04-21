    

export const apiHandler = async (apiFn, ...args) => {
  try {
    const data = await apiFn(...args);
    return { data, error: null };
  } catch (err) {
    console.error("API Error:", err);
    return { data: null, error: err.message || "An error occurred." };
  }
};
