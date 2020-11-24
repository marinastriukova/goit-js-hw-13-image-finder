const API_KEY = '19199045-2bc94f1b29c918ae7d7bc7dd7';
const BASE_URL = 'https://pixabay.com/api';
const options = {
  headers: {
    Authorization: API_KEY,
  },
};

export default class NewApiService {
  constructor(){
      this.searchQuery = '';
      this.page = null;
  }

  fetchGallery() {
      const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
  
      return fetch(url)
        .then(response => response.json())
        .then(image => {
            return image;
            });
        }

      incrementPage() {
        this.page += 1;
      }
    
      resetPage() {
        this.page = null;
      }

}
