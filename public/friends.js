function loadFriends() {
  let friends = {};
  const friendsText = localStorage.getItem('friends');
  
  if (friendsText) {
    friends = JOSN.parse(friendsText);
  }

  // Creating an array of friend's goals for testing purposes
  friends = {
    'Lee': {
      'daily': [['Work on startup', 3], ['Serve someone', 9]],
      'weekly': [['Be on time to CS260', 9]], 
      'monthly': []
    },
    'Ron': {
      'daily': [['Spanish Study', 8]],
      'weekly': [], 
      'monthly': []
    },
    'Sarah': {
      'daily': [['Wake up on time', 7], ['Go to bed on time', 7]],
      'weekly': [], 
      'monthly': []
    },
    'Alex': {
      'daily': [['Scripture study', 3]],
      'weekly': [], 
      'monthly': [['Go on a date', 3]]
    }
  };

  const accordionEl = document.querySelector('div.accordion');

  if (Object.keys(friends).length == 0) {
    const addFriendsEl = document.createElement('h5');
    addFriendsEl.textContent = 'Add friends to see their goals here!';
    addFriendsEl.style.textAlign = 'center';
    addFriendsEl.style.paddingTop = '20px';

    accordionEl.appendChild(addFriendsEl);
  }

  for (fr in friends) {
    // Create an accordion button for each friend
    const accItem = document.createElement('div');
    accItem.classList.add('accordion-item');

    const accHead = document.createElement('h3');
    accHead.classList.add('accordion-header');

    const accBtn = document.createElement('button');
    accBtn.classList.add('accordion-button');
    accBtn.type = 'button';
    accBtn.setAttribute('data-bs-toggle', 'collapse');
    accBtn.setAttribute('data-bs-target', `#${fr}-collapse`);
    accBtn.textContent = `${fr}'s Summary`;

    accHead.appendChild(accBtn);
    accItem.appendChild(accHead);
    accordionEl.appendChild(accItem);


    // Create an accordino dropdown for each friend
    const accCollapse = document.createElement('div');
    accCollapse.classList.add('accordion-collapse', 'collapse', 'collapse');
    accCollapse.setAttribute('id', `${fr}-collapse`)

    const accBody = document.createElement('div');
    accBody.classList.add('accordion-body');

    const sharedGoals = document.createElement('div');
    sharedGoals.classList.add('shared-goals');

    for (t in friends[fr]){
      if (friends[fr][t].length > 0){
        // t is the time frame -- meaning daily/weekly/monthly
        // this if statement ignores all time frames without goals

        let pos = 0;
        while (pos < friends[fr][t].length){

          const goalEl = document.createElement('div');
          goalEl.classList.add('goal');

          const checkEl = document.createElement('input');
          checkEl.type = 'checkbox';
          checkEl.disabled = true;
          checkEl.style.marginRight = '5px';

          const labelEl = document.createElement('label');
          labelEl.textContent = friends[fr][t][pos][0];

          let interval = 'days';
          if (t === 'weekly') {
            interval = 'weeks';
          } else if (t === 'monthly') {
            interval = 'months';
          }

          const streakEl = document.createElement('p');
          streakEl.classList.add('streak');
          streakEl.textContent = `🔥 ${friends[fr][t][pos][1]} ${interval}`;


          goalEl.appendChild(checkEl);
          goalEl.appendChild(labelEl);
          goalEl.appendChild(streakEl);

          sharedGoals.append(goalEl);

          pos++;
        }
      }
    }

    accBody.appendChild(sharedGoals);
    accCollapse.appendChild(accBody);
    accItem.appendChild(accCollapse);

  }

}

// Adding event handler to click search button if enter is pressed
document.querySelector('#friend-search-input')
  .addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
      document.querySelector('#friend-search-input').parentElement.querySelector('button').click();
    }
});

function addSearchConfirm() {

  removeSearchConfirm();

  const userName = document.querySelector('#friend-search-input').value;
  document.querySelector('#friend-search-input').value = '';
  const parent = document.querySelector('#friend-search');

  const divEl = document.createElement('div');
  divEl.setAttribute('id', 'confirmation-div')

  const labelEl = document.createElement('label');
  labelEl.htmlFor = 'add-confirm';
  labelEl.textContent = `Are you sure you want to add ${userName}?`;

  const yesBtn = document.createElement('button');
  yesBtn.classList.add('btn', 'btn-secondary', 'add-confirm');
  yesBtn.style.marginLeft = '10px'
  yesBtn.textContent = 'Yes';
  yesBtn.addEventListener('click', () => handleYesClick(userName))

  const noBtn = document.createElement('button');
  noBtn.classList.add('btn', 'btn-warning', 'add-confirm');
  noBtn.style.marginLeft = '5px'
  noBtn.textContent = 'No';
  noBtn.addEventListener('click', removeSearchConfirm)


  divEl.appendChild(labelEl);
  divEl.appendChild(yesBtn);
  divEl.appendChild(noBtn);
  parent.appendChild(divEl);

}

async function handleYesClick(newFriend) {
  const self = localStorage.getItem('username');
  const response = await fetch(`/api/${self}/friends`, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({user: newFriend})
  });

  removeSearchConfirm();
}

function removeSearchConfirm() {
  const toDelete = document.querySelector('#confirmation-div');
  if (toDelete) {
    toDelete.remove();
  }
}

// Do this every time the page loads
loadFriends();