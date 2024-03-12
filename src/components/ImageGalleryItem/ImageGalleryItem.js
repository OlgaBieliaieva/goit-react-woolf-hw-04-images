import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ image, showModal }) {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItemImage}
        src={image.webformatURL}
        alt={image.tags}
        onClick={() => showModal(image.largeImageURL)}
      />
    </li>
  );
}

export default ImageGalleryItem;
