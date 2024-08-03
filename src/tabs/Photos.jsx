import { getPhotos } from "apiService/photos";
import {
  Button,
  Form,
  Loader,
  PhotoModal,
  PhotosGallery,
  Text,
} from "components";
import { useEffect, useState } from "react";

export const Photos = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState("");
  const [modalAlt, setModalAlt] = useState("");

  useEffect(() => {
    if (!query) return;
    const fetchImages = async () => {
      setLoader(true);
      try {
        const { per_page, photos, total_results } = await getPhotos(
          query,
          page
        );
        if (!photos.length) return setIsEmpty(true);
        setImages((prevImages) => [...prevImages, ...photos]);
        setIsVisible(page < Math.ceil(total_results / per_page));
      } catch (error) {
        setError(error);
      } finally {
        setLoader(false);
      }
    };
    fetchImages();
  }, [query, page]);

  const onHandleSubmit = (searchQuery) => {
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
    setError(null);
    setIsVisible(false);
    setIsEmpty(false);
  };
  const onLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const openModal = (url, alt) => {
    setShowModal(true);
    setModalUrl(url);
    setModalAlt(alt);
  };
  const closeModal = () => {
    setShowModal(false);
    setModalUrl("");
    setModalAlt("");
  };
  return (
    <>
      <Form onSubmit={onHandleSubmit} />
      {images.length > 0 && (
        <PhotosGallery openModal={openModal} images={images} />
      )}
      {isVisible && (
        <Button onClick={onLoadMore} disabled={loader}>
          {loader ? "LOADING" : "Load More"}
        </Button>
      )}
      {!images.length && !isEmpty && (
        <Text textAlign="center">Let`s begin search 🔎</Text>
      )}
      {loader && <Loader />}
      {error && (
        <Text textAlign="center">❌ Something went wrong - {error}</Text>
      )}
      {isEmpty && (
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      )}
      <PhotoModal
        modalIsOpen={showModal}
        src={modalUrl}
        alt={modalAlt}
        closeModal={closeModal}
      />
    </>
  );
};
