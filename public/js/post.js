const postCreate = async () => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const body = document.querySelector('#post-body').value.trim();

  if (title && body) {
    const response = await fetch('/api/posts/', {
      method: 'POST',
      body: JSON.stringify({ title, body }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      const newPost = await response.json()
      document.location.replace(`/post/${newPost.id}`)
    } else {
      alert('Unable to create post.')
    }
  }
};

const postUpdate = async () => {
  event.preventDefault();

  const body = document.querySelector('#post-body').value.trim();
  const postPath = document.location.pathname.split('/');
  const postId = postPath[postPath.length - 1];

  if (body) {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({ body }),
      headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
      window.location.reload();
    }
  }
};

const postDelete = async () => {
  event.preventDefault();

  const postPath = document.location.pathname.split('/');
  const postId = postPath[postPath.length - 1];
  
  if (confirm('Are you sure you want to delete this post?')) {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
    
    if (response.ok) {
      document.location.replace('/dashboard');
    }
  }
};

const editPost = async () => {
  const postContents = document.querySelector('.post-body').textContent.trim();
  document.querySelector('.post-body').innerHTML = `
  <form class='post-edit text-center'>
    <div class="form-group">
      <textarea class="col-12" name='body' id='post-body'>${postContents}</textarea>
    </div
    <div class="form-group">
      <button class="col-10 col-lg-4 btn btn-dark" type='submit'>Save Changes</button>
    </div>
  </form>
  `
  document.querySelector('.post-edit').addEventListener('submit', postUpdate)
}

if (document.location.pathname === '/create') {
  document.querySelector('.post-form').addEventListener('submit', postCreate);
} else {
  document.querySelector('#post-edit').addEventListener('click', editPost);
  
  document.querySelector('#post-delete').addEventListener('click', postDelete)
}