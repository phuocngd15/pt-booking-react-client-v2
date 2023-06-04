import React, { useState } from 'react';
import { Button } from 'antd';
import AvatarDefault from '@/views/Profile/components/DefaultAvatarSVG';

const ImageUploader = ({ onClickImg }) => {
  const [fileInputState, setFileInputState] = useState('');
  const [OriginSource] = useState('https://bootdey.com/img/Content/avatar/avatar7.png');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error('Error');
    };
  };
  const cancelUpload = (e) => {
    setPreviewSource('');
    setFileInputState('');
    setPreviewSource('');
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      await fetch('http://localhost:3000/api/images/upload-image', {
        method: 'POST',
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { 'Content-Type': 'application/json' },
      });
      setFileInputState('');
      setPreviewSource('');
    } catch (err) {
      console.error(err);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  return (
    <div>
      {previewSource ? (
        <img
          src={previewSource || OriginSource}
          alt="chosen"
          // style={{ width: '300px' }}
          onClick={(e) => onClickImg(e)}
        />
      ) : (
        <AvatarDefault width="300px" height="300px" />
      )}

      <form onSubmit={handleSubmitFile} className="form">
        <input
          hidden={previewSource !== ''}
          id="fileInput"
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
          className="form-input"
        />
        {previewSource && <Button htmlType="submit">Update</Button>}
        {previewSource && <Button onClick={cancelUpload}>Cancel</Button>}
      </form>
    </div>
  );
};

export default ImageUploader;
