import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Loader2 } from "lucide-react";

function Dropzone({ onDrop, maxFileSize = 5 * 1024 * 1024, allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'] }) {
  const handleDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      if (!allowedTypes.includes(file.type)) {
        alert("Please upload a valid image file.");
        return;
      }
      if (file.size > maxFileSize) {
        alert("File size exceeds the limit of 5MB.");
        return;
      }
      onDrop(file);
    }
  }, [onDrop, maxFileSize, allowedTypes]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: allowedTypes.join(','),
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 p-6 w-96 h-36 rounded-lg flex items-center justify-center 
        ${isDragActive ? 'border-green-500' : 'border-gray-500'} 
        bg-gray-700 hover:border-green-500 cursor-pointer transition-all`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <Loader2 className="w-8 h-8 text-gray-500 animate-spin" />
      ) : (
        <>
          <Upload className="w-8 h-8 text-gray-500 mb-2" />
        </>
      )}
    </div>
  );
}

export default Dropzone;
