import { useState } from 'react';

export const useFileUpload = (endpoint, token) => {
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [apiData, setApiData] = useState(null);

  const uploadFile = async (file) => {
    setUploading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append('file', file);

    const headers = token
      ? { 'Authorization': `Bearer ${token}` }
      : {};  // Only add Authorization header if token is available

    try {
      // Here we Upload the file
      const uploadResponse = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: headers,
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file');
      }

      const uploadData = await uploadResponse.json();
      console.log(uploadData);

      // Here we Fetch API Data
      const apiResponse = await fetch('https://meowfacts.herokuapp.com');
      if (!apiResponse.ok) {
        throw new Error('Failed to fetch API data');
      }

      const data = await apiResponse.json();
      setApiData(data);  // Here we Store API data
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return {
    uploading,
    success,
    error,
    apiData,
    uploadFile,
  };
};
