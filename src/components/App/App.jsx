import React, { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import getImages from 'services/api';

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    status: '',
    disabled: true,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      getImages(this.state.query, this.state.page).then(res => {
        this.setState({
          images: [...this.state.images, ...res.data.hits],
          status: '',
          disabled:
            this.state.images.length + res.data.hits.length ===
            res.data.totalHits,
        });
      });
    }
  }

  handleFormSubmit = query => {
    this.setState({ query: query, images: [], page: 1, status: 'pending' });
  };

  handleChangePage = e => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    return (
      <main>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          images={this.state.images}
          page={this.state.page}
          onChangePage={this.handleChangePage}
          status={this.state.status}
          disabled={this.state.disabled}
        />
      </main>
    );
  }
}

export default App;
