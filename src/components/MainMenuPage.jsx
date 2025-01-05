import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

function MainMenuPage() {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uplodSuccess, setUploadSuccess] = useState(false);

  const onDrop = useCallback(acceptedFiles => {
    // Handle the dropped files here
    const file = acceptedFiles[0]; // Get the first file from the array
    if (file) {
      uploadFileToServer(file); // Call the function to upload the file to the server
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: "image/*" });     
  // accept: "image/*     This will restrict to upload image file only"

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
        // Handle the server response here
      })
      .catch(error => {
        console.error('Error uploading file:', error);
        setUploading(false);
        setUploadError("Failed to upload the file");
        // Handle error
      });
  };

  return (
    <div className='flex items-center justify-center h-screen w-full bg-[#212121] text-[#ECECEC]'>
      <div className='text-center'>
        <h1 className='text-2xl mb-4 font-bold'>Upload Your Handwriting!</h1>

        {/* Dropzone container */}
        <div 
          {...getRootProps()} 
          className={`border-2 p-6 w-80 h-36 rounded-lg flex items-center justify-center 
            ${isDragActive ? 'border-green-500' : 'border-gray-500'} 
            bg-gray-700 hover:border-green-500 cursor-pointer transition-all`}
        >
          {/* Input for file upload */}
          <input {...getInputProps()} className='hidden' />
          <p className='text-lg text-gray-300'>
            {isDragActive ? 'Release to drop the files here' : 'Drag & Drop your handwriting here, or click to select'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MainMenuPage;
