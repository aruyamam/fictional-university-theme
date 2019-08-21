import $ from 'jquery';

class Like {
  constructor() {
    this.events();
  }

  events() {
    $('.like-box').on('click', this.ourClickDispatcher.bind(this));
  }

  ourClickDispatcher(e) {
    const currentLikebox = $(e.target).closest('.like-box');

    if (currentLikebox.attr('data-exists') === 'yes') {
      this.deleteLike(currentLikebox);
    } else {
      this.createLike(currentLikebox);
    }
  }

  createLike(currentLikeBox) {
    $.ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
      },
      url: universityData.root_url + '/wp-json/university/v1/manageLike',
      type: 'POST',
      data: {
        professorId: currentLikeBox.data('professor')
      },
      success: response => {
        currentLikeBox.attr('data-exists', 'yes');
        const likeCountEle = currentLikeBox.find('.like-count');
        let likeCount = parseInt(likeCountEle.html(), 10);
        likeCount++;
        likeCountEle.html(likeCount);
        currentLikeBox.attr('data-like', response);
        console.log(response);
      },
      error: response => {
        console.log(response);
      }
    });
  }

  deleteLike(currentLikeBox) {
    $.ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
      },
      url: universityData.root_url + '/wp-json/university/v1/manageLike',
      data: { like: currentLikeBox.attr('data-like') },
      type: 'DELETE',
      success: response => {
        console.log('no');
        currentLikeBox.attr('data-exists', 'no');
        const likeCountEle = currentLikeBox.find('.like-count');
        let likeCount = parseInt(likeCountEle.html(), 10);
        likeCount--;
        likeCountEle.html(likeCount);
        currentLikeBox.attr('data-like', '');
        console.log(response);
      },
      error: response => {
        console.log('error');
        console.log(response);
      }
    });
  }
}

export default Like;
