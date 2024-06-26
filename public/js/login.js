const loginHandler = async () => {
  event.preventDefault();

  const email = document.querySelector('#login-email').value.trim();
  const password = document.querySelector('#login-password').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Login failed');
    }
  }
};

const signupHandler = async () => {
  event.preventDefault();
  
  const name = document.querySelector('#signup-name').value.trim();
  const email = document.querySelector('#signup-email').value.trim();
  const password = document.querySelector('#signup-password').value.trim();
  
  if (name && email && password) {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Signup failed');
    }
  }
}

if (document.location.pathname === '/login'){
  document.querySelector('.login-form').addEventListener('submit', loginHandler)
} else if (document.location.pathname === '/signup'){
  document.querySelector('.signup-form').addEventListener('submit', signupHandler)
}