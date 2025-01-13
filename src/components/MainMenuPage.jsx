import React, { useState } from 'react';
import Dropzone from '../components/DropzoneContainer';
import ApiData from './APIdata';
import { useFileUpload } from './FileUpload';
import TypewriterText from './TypewriterText';

function MainMenuPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const { uploading, success, error, apiData, uploadFile } = useFileUpload(
    "http://localhost:3000/upload",
    //Backend Endpoint
    ""
    //Token(i think its optional)
  );

  const handleFileDrop = (file) => {
    if (!file) {
      setErrorMessage("Please upload a valid file.");
      return; 
    }
    uploadFile(file);
  };

  return (
    <div className="flex items-center justify-center h-screen w-full bg-[#212121] text-[#ECECEC]">
      <div className="text-center">
        <h1 className="text-2xl mb-4 font-bold">Upload Your Handwriting!</h1>

        {/* If any Error while the file upload*/}
        {success && <p className="text-green-500">File Uploaded Successfully!</p>}
        {(error || errorMessage) && (
          <p className="text-red-500">{error || errorMessage}</p>
        )}

        {/* Dropzone */}
        <Dropzone onDrop={handleFileDrop} />

        {/* this is for uploading Status */}
        {uploading && <p className="text-yellow-400">Uploading...</p>}

        {/* API Component */}
        {apiData && !uploading && (
          <div className='mt-8 bg-gray-700 p-4 rounded-lg w-96 mx-auto text-wrap'>
           <div className='max-h-80 overflow-y-auto'>
           <TypewriterText text={apiData?.data[0] || "No Data Available"} speed={50} />
           </div>
          </div>
        )

        }

      </div>
    </div>
  );
}

export default MainMenuPage;
