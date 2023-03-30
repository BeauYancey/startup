function login() {
  const nameEl = document.querySelector("#login-username");
  localStorage.setItem("username", nameEl.value);
  window.location.href = "home.html";
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