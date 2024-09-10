import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [fileDetails, setFileDetails] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await axios.post('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setFileDetails(res.data);
      } catch (err) {
        console.error('Error uploading file:', err);
      }
    } else {
      console.log('No file selected');
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {fileDetails && (
        <div>
          <h3>Uploaded File Details:</h3>
          <p>File Name: {fileDetails.fileName}</p>
          <p>File Path: {fileDetails.filePath}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
