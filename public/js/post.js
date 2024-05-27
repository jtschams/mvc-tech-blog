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
      console.log(response);
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
    if (body) {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
      
      if (response.ok) {
        document.location.replace('/dashboard');
      }
    }
  }
};

const editPost = () => {
  const postContents = document.querySelector('.post-body').textContent;
  document.querySelector('.post-body').innerHTML = `
  <form class='post-edit'>
    <textarea name='body' id='post-body'>${postContents}</textarea>
    <button type='submit'>
  </form>
  `
  document.querySelector('.post-edit').addEventListener('submit', postUpdate)
}

document.querySelector('#edit-post').addEventListener('click', editPost);

document.querySelector('.post-form').addEventListener('submit', postCreate);

document.querySelector('#post-delete').addEventListener('click', postDelete)