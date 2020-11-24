import './styles.css';

import NewApiService from './js/apiService';
import LoadMoreBtn from './js/loadMoreBtn';
import gallery from './templates/gallery.hbs';
import 'material-design-icons/iconfont/material-icons.css';



const debounce = require('lodash.debounce');

const searchForm = document.querySelector('.search-form');
const listGallery = document.querySelector('.gallery-list');


const newApiService = new NewApiService();
const newLoadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});


searchForm.addEventListener('input', debounce(onSearch, 500));
newLoadMoreBtn.refs.button.addEventListener('click', fetchGalleryCard);

function onSearch(event) {
    event.preventDefault();
    const search = newApiService.searchQuery = event.target.value;

    clearGallery();
    newLoadMoreBtn.hide();

    if (search === '') {
        return 
    };

    newLoadMoreBtn.show();
    newApiService.resetPage();
    fetchGalleryCard();
}

function fetchGalleryCard() {
    newLoadMoreBtn.disable();
    newApiService.fetchGallery()
        .then(image => {
            renderGalleryCard(image.hits);
            newApiService.incrementPage();
            newLoadMoreBtn.enable();
            
            if (newApiService.page === 1) {
                return
            }
            scroolTo();
        })
}


function renderGalleryCard(image) {
    listGallery.insertAdjacentHTML('beforeend', gallery(image));
}

function clearGallery() {
    listGallery.innerHTML = '';
}

function scroolTo() {
    const { y } = listGallery.getBoundingClientRect();
    const screenHeight = document.documentElement.clientHeight;

    window.scrollTo({ top: screenHeight - y, behavior: 'smooth' });

}




