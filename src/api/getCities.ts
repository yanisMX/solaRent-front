const getData = async (url: string) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.log(
        "Failed to fetch data from API",
        response.status,
        response.statusText,
      );
      return null;
    }
    return await response.json();
  } catch (e) {
    console.log("Failed to fetch data from API", e);
    return null;
  }
};

export default getData;
