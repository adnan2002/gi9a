import React from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

const TestApiButton = () => {
  const handleDownload = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/story.pdf', {
        responseType: 'blob', // Set the response type to handle binary data
      });

      // Use FileSaver.js to save the file
      const blob = new Blob([response.data], { type: 'application/pdf' });
      saveAs(blob, 'nowstaywoke.pdf'); // Set the desired filename
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  return (
    <div>
      <button onClick={handleDownload}>Download PDF</button>
    </div>
  );
};

export default TestApiButton;
