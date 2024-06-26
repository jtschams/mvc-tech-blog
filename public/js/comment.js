const commentCreate = async () => {
  event.preventDefault();
  
  const body = document.querySelector('#comment-body').value.trim();
  const postPath = document.location.pathname.split('/');
  const post_id = postPath[postPath.length - 1];

  if (body) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ body, post_id }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      window.location.reload();
    } else {
      alert('Unable to create comment.')
    }
  }
};

const commentAdd = () => {
  document.querySelector('#comment-area').innerHTML = `
  <form class='comment-form row justify-content-center'>
    <div class="form-group">
      <textarea class="col-12" name='body' id='comment-body'></textarea>
    </div
    <div class="row justify-content-center form-group">
      <button class="col-12 col-lg-10 btn btn-dark" type='submit'>Add Comment</button>
    </div>
  </form>
  `
  document.querySelector('.comment-form').addEventListener('submit', commentCreate);
};

document.querySelector('#add-comment').addEventListener('click', commentAdd);