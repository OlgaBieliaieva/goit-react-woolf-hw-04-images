import { useState } from 'react';
import Loader from '../Loader/Loader';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import useModal from 'hooks/useModal';
import Modal from '../Modal/Modal';
import css from './ImageGallery.module.css';

export default function ImageGallery({
  images,
  page,
  onChangePage,
  status,
  disabled,
}) {
  const [modalImg, setModalImg] = useState('');
  const { ref, onOpen, onClose } = useModal();

  const openModal = img => {
    if(modalImg !== img) {
      setModalImg(img);
      onOpen();
    } else {
      setModalImg('');
    }
    
  };

  return status ? (
    <section className={css.Pending}>
      <Loader />
    </section>
  ) : (
    <section>
      <ul className={css.ImageGallery}>
        {images.map((image, index) => (
          <ImageGalleryItem key={index} image={image} showModal={openModal} />
        ))}
      </ul>
      <Button page={page} onChangePage={onChangePage} isActive={disabled} />

      <Modal ref={ref} onClose={onClose} onOpen={onOpen}>
        <img src={modalImg} alt="large" className={css.modalImg}></img>
      </Modal>
    </section>
  );
}
