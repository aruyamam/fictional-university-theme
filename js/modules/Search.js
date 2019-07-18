import $ from 'jquery';

class Search {
  constructor() {
    this.openButton = $('.js-search-trigger');
    this.closeButton = $('.search-overlay__close');
    this.searchOverlay = $('.search-overlay');
    this.events();
    this.isOverlayOpen = false;
  }

  events() {
    this.openButton.on('click', this.openOverlay.bind(this));
    this.closeButton.on('click', this.closeOverlay.bind(this));
    $(document).on('keydown', this.keyPressDispatcher.bind(this));
  }

  keyPressDispatcher(e) {
    if (e.key === 's' && !this.isOverlayOpen) {
      this.openOverlay();
    }

    if (e.key === 'Escape' && this.isOverlayOpen) {
      this.closeOverlay();
    }
  }

  openOverlay() {
    this.searchOverlay.addClass('search-overlay--active');
    console.log('our open method just run');
    this.isOverlayOpen = true;
  }

  closeOverlay() {
    this.searchOverlay.removeClass('search-overlay--active');
    console.log('our close method just run');
    this.isOverlayOpen = false;
  }
}

export default Search;
