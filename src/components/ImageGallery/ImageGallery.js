import { Component } from 'react';
import Loader from '../Loader/Loader';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import css from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    showModal: false,
    modalImg: '',
  };

  toggleModal = img => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      modalImg: img || '',
    }));
  };

  render() {
    const { images, page, onChangePage, status, disabled } = this.props;

    if (status === 'pending') {
      return (
        <section className={css.Pending}>
          <Loader />
        </section>
      );
    } else {
      return (
        <section className={status}>
          <ul className={css.ImageGallery}>
            {images.map((image, index) => (
              <ImageGalleryItem
                key={index}
                image={image}
                showModal={this.toggleModal}
              />
            ))}
          </ul>
          <Button page={page} onChangePage={onChangePage} isActive={disabled} />
          {this.state.showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={this.state.modalImg} alt="large"></img>
            </Modal>
          )}
        </section>
      );
    }
  }
}
export default ImageGallery;
