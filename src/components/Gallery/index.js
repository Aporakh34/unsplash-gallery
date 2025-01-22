import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import SearchForm from "../SearchForm";
import ImageGallery from "../ImageGallery";
import ImageModal from "../ImageModal";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [infoMessage, setInfoMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasMoreImages, setHasMoreImages] = useState(true);

  const fetchImages = useCallback(
    async (page) => {
      if (!searchQuery.trim()) {
        setInfoMessage(
          "Enter something in the search field to start searching."
        );
        setErrorMessage(null);
        setImages([]);
        setHasMoreImages(false);
        return;
      }

      setIsLoading(true);
      setErrorMessage(null);
      setInfoMessage(null);

      try {
        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: { query: searchQuery, page },
            headers: {
              Authorization:
                "Client-ID n_OQufvWxK7XOcvAYrwAF2stmUm-HaBz-EKvZMNH7CA",
            },
          }
        );

        if (response.data.results.length === 0) {
          setInfoMessage(`No results found for "${searchQuery}".`);
          setHasMoreImages(false);
          return;
        }

        if (response.data.results.length < 10) {
          setHasMoreImages(false);
        }

        setImages((prevImages) => [...prevImages, ...response.data.results]);
      } catch (err) {
        setErrorMessage("Error fetching images");
      } finally {
        setIsLoading(false);
      }
    },
    [searchQuery]
  );

  useEffect(() => {
    setImages([]);
    setCurrentPage(1);
    setHasMoreImages(true);
    fetchImages(1);
  }, [searchQuery, fetchImages]);

  useEffect(() => {
    if (currentPage > 1) {
      fetchImages(currentPage);
    }
  }, [currentPage, fetchImages]);

  const handleScroll = () => {
    const doc = document.documentElement;
    const scrolled = window.innerHeight + doc.scrollTop;
    const threshold = doc.offsetHeight * 0.6;

    if (
      scrolled >= threshold &&
      doc.scrollHeight > doc.clientHeight &&
      hasMoreImages &&
      !isLoading
    ) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMoreImages, isLoading]);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const columns = [[], [], []];
  images.forEach((image, index) => {
    columns[index % 3].push(image);
  });

  return (
    <div>
      <SearchForm searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {infoMessage && (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          {infoMessage}
        </div>
      )}
      {errorMessage && (
        <div style={{ textAlign: "center", margin: "20px 0", color: "red" }}>
          {errorMessage}
        </div>
      )}
      {!errorMessage && !infoMessage && (
        <ImageGallery columns={columns} openModal={openModal} />
      )}
      {isLoading && (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <ClipLoader size={50} color="#123abc" loading={true} />
        </div>
      )}
      {!hasMoreImages && !isLoading && searchQuery.trim() && (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          No more images found for this query.
        </div>
      )}
      {selectedImage && (
        <ImageModal selectedImage={selectedImage} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Gallery;
