function paginateBlog() {
  var paginateNumber = 5;
  var paginateControl = document.querySelector('#paginate-control');
  var posts = document.querySelectorAll('.post-preview');

  if (posts.length <= paginateNumber) {
    return;
  }

  paginateControl.classList.remove('is-paginate-control-hidden');

  posts.forEach(function(e, index) {
    if (index < paginateNumber) {
      return;
    }
    e.classList.add('is-post-hidden');
  });

  function loadMorePosts() {
    var hiddenPosts = document.querySelectorAll('.is-post-hidden');
    for (var i = 0; i < paginateNumber; i++) {
      if (hiddenPosts[i]) {
        hiddenPosts[i].classList.remove('is-post-hidden');
      }
    }
    checkHiddenPosts();
  }

  function checkHiddenPosts() {
    var hiddenPosts = document.querySelectorAll('.is-post-hidden');
    if (hiddenPosts.length === 0) {
      document
        .querySelector('#paginate-control')
        .classList.add('is-paginate-control-hidden');
    }
  }

  paginateControl.addEventListener('click', loadMorePosts);
}

paginateBlog();
