(async () => {
  let authenticated = false;
  const username = localStorage.getItem('username');
  if (username) {
    const nameEl = document.querySelector('#login-username');
    nameEl.value = username;
    const user = await getUser(nameEl.value);
    authenticated = user?.authenticated;
  }

  if (authenticated) {
    setDisplay('loginControls', 'none');
    setDisplay('readyControls', 'block');
  } else {
    setDisplay('loginControls', 'block');
    setDisplay('readyControls', 'none');
  }
})();

async function loginUser() {
  loginOrCreate(`/api/auth/login`);
}

async function createUser() {
  loginOrCreate(`/api/auth/create`);
}

async function loginOrCreate(endpoint) {
  const username = document.querySelector('#login-username')?.value;
  const password = document.querySelector('#login-password')?.value;
  const response = await fetch(endpoint, {
    method: 'post',
    body: JSON.stringify({ username: username, password: password }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const body = await response.json();

  if (response?.status === 200) {
    localStorage.setItem('username', username);
    window.location.href = 'home.html';
  }
}

function home() {
  window.location.href = 'home.html';
}

function logout() {
  fetch(`/api/auth/logout`, {
    method: 'delete',
  }).then(() => (window.location.href = '/'));
}

async function getUser(username) {
  // See if we have a user with the given username.
  const response = await fetch(`/api/user/${username}`);
  if (response.status === 200) {
    return response.json();
  }

  return null;
}

function setDisplay(controlId, display) {
  const playControlEl = document.querySelector(`#${controlId}`);
  if (playControlEl) {
    playControlEl.style.display = display;
  }
}



function getQuote() {
  fetch('https://api.quotable.io/random')
  .then((response) => response.json())
  .then((data) => {
    const containerEl = document.querySelector('#quote-block');

    const quoteEl = document.createElement('p');
    quoteEl.classList.add('quote-text', 'quote-body');
    const authorEl = document.createElement('p');
    authorEl.classList.add('quote-author', 'quote-body');

    quoteEl.textContent = data.content;
    authorEl.textContent = data.author;

    containerEl.appendChild(quoteEl);
    containerEl.appendChild(authorEl);
  });
}

getQuote();