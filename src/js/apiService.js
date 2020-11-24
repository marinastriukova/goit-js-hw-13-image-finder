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
