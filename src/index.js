import './styles.css';

import NewApiService from './js/apiService';
import LoadMoreBtn from './js/loadMoreBtn';
import gallery from './templates/gallery.hbs';
import 'material-design-icons/iconfont/material-icons.css';

import "@pnotify/core/dist/PNotify.css";
import '@pnotify/core/dist/BrightTheme.css';
import { defaults, alert } from '@pnotify/core';

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

function pushError() {
    alert({
        text: 'Шеф, все пропало! Введи что то другое.'
    });
}


// defaults.styling = 'material';
// defaults.icons = 'material';
// defaults.width = '360px'; // ширина
// defaults.minHeight = '40px'; // мин высота
// defaults.delay = '1500'; // время показа уведомления
// defaults.closer = false; // крестик закрытия
// defaults.sticker = false; // иконка булавки
// defaults.addClass = 'error'; // кастомный класс для своих стилей
// defaults.autoOpen = true; // сработка при объявлении


