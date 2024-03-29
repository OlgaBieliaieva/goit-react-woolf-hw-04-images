import { useState, useEffect } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import getImages from 'services/api';

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isPending, setIsPending] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (query.length > 0) {
      getImages(query, page).then(res => {
        setImages(prevImgs => [...prevImgs, ...res.data.hits]);
        setIsPending(false);
        setIsDisabled(!(page < Math.ceil(res.data.totalHits / 12)));
      });
    }
  }, [query, page]);

  const handleFormSubmit = query => {
    setImages([]);
    setQuery(query);
    setPage(1);
    setIsPending(true);
  };

  const handleChangePage = () => {
    setPage(page + 1);
  };

  return (
    <main>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery
        images={images}
        page={page}
        onChangePage={handleChangePage}
        status={isPending}
        disabled={isDisabled}
      />
    </main>
  );
}
