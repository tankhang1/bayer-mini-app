const uploadFile = async ({ file, url }: { file: File; url: string }) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: file, // Send the raw file data directly
      headers: {
        Accept: "application/json",
      },
    });

    // Check if the response is OK (status 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error; // Re-throw the error to handle it further up if needed
  }
};

export default uploadFile;
