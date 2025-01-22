import React from "react";

const ImageModal = ({ selectedImage, closeModal }) => {
  return (
    <div className="modal" onClick={closeModal}>
      <img src={selectedImage.urls.regular} alt={selectedImage.description} />
      <button className="modal-close" onClick={closeModal}>
        X
      </button>
    </div>
  );
};

export default ImageModal;
