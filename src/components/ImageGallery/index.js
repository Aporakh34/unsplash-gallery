import React from "react";

const ImageGallery = ({ columns, openModal }) => {
  return (
    <div className="gallery">
      {columns.map((columnImages, columnIndex) => (
        <div className="column" key={columnIndex}>
          {columnImages.map((image) => (
            <div
              key={image.id}
              className="image-card"
              onClick={() => openModal(image)}
            >
              <img src={image.urls.small} alt={image.description} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
