import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

function MainMenuPage() {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const MAX_FILE_SIZE = 5*1024*1024;

  const onDrop = useCallback(acceptedFiles => {
    // Reset previous error messages before processing new file
    setErrorMessage("");
    setUploadError(null);

    const file = acceptedFiles[0]; // Get the first file from the array
    if (file && file.type.startsWith('image/')) {

      if (file.size > MAX_FILE_SIZE) {
        setErrorMessage("File is too large. Please upload a file smaller than 5MB.");
        return; // Stop the process if file is too large
      }

      uploadFileToServer(file); // Call the function to upload the file to the server
    } else {
      setErrorMessage("Please Upload an Image File");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*" // Restrict to image files only
  });

  const uploadFileToServer = (file) => {
    const formData = new FormData();
    formData.append('file', file); // Append the file to the FormData

    // Start the upload process
    setUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    // Send the file to the backend using fetch or axios
    fetch('https://your-backend-endpoint.com/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': 'Bearer your-token', // Optional: Add your token if needed
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('File uploaded successfully:', data);
        setUploading(false);
        setUploadSuccess(true);
      })
      .catch(error => {
        console.error('Error uploading file:', error);
        setUploading(false);
        setUploadError("Failed to upload the file");
      });
  };

  return (
    <div className="flex items-center justify-center h-screen w-full bg-[#212121] text-[#ECECEC]">
      <div className="text-center">
        <h1 className="text-2xl mb-4 font-bold">Upload Your Handwriting!</h1>

        {/* Display Success Message */}
        {uploadSuccess && <p className="text-green-500">File Uploaded Successfully!</p>}

        {/* Display Upload Error Message or File Type Error */}
        {(uploadError || errorMessage) && (
          <p className="text-red-500">{uploadError || errorMessage}</p>
        )}

        {/* Dropzone container */}
        <div
          {...getRootProps()}
          className={`border-2 p-6 w-full h-36 rounded-lg flex items-center justify-center 
            ${isDragActive ? 'border-green-500' : 'border-gray-500'} 
            bg-gray-700 hover:border-green-500 cursor-pointer transition-all`}
        >
          {/* Input for file upload */}
          <input {...getInputProps()} className="hidden" />
          <p className="text-lg text-gray-300">
            {isDragActive
              ? 'Release to drop the files here'
              : 'Drag & Drop your handwriting here, or click to select'}
          </p>
        </div>

        {/* Display Uploading Status */}
        {uploading && <p className="text-yellow-400">Uploading...</p>}
      </div>
    </div>
  );
}

export default MainMenuPage;
