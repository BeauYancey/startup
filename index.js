function loadGoals() {
  let goals = {daily: [], weekly: [], monthly: []};
  const goalsText = localStorage.getItem('goals');
  
  if (goalsText) {
    goals = JSON.parse(goalsText);
  }
  
  // LOAD DAILY GOALS
  const dailyListEl = document.querySelector(`#daily-goals`);
  
  if (goals.daily.length) {
    for (const [goal, streak] of goals.daily) {
      const checkboxEl = document.createElement('input');
      const labelEl = document.createElement('label');
      const streakEl = document.createElement('p');
      
      checkboxEl.type = "checkbox";
      checkboxEl.style.marginRight = "5px";
      labelEl.textContent = goal;
      streakEl.classList.add('streak');
      streakEl.textContent = `🔥 ${streak} days`;
      
      const goalDivEl = document.createElement('div');
      goalDivEl.classList.add('goal');
      goalDivEl.classList.add('private');
      goalDivEl.appendChild(checkboxEl);
      goalDivEl.appendChild(labelEl);
      goalDivEl.appendChild(streakEl);

      dailyListEl.appendChild(goalDivEl);
    }
  } else {
    dailyListEl.innerHTML = '<div class=goal private><label>Add a goal to get started</label></div>';
  }

  // LOAD WEEKLY GOALS
  const weeklyListEl = document.querySelector(`#weekly-goals`);
  
  if (goals.weekly.length) {
    for (const [goal, streak] of goals.weekly) {
      const checkboxEl = document.createElement('input');
      const labelEl = document.createElement('label');
      const streakEl = document.createElement('p');
      
      checkboxEl.type = "checkbox";
      checkboxEl.style.marginRight = "5px";
      labelEl.textContent = goal;
      streakEl.classList.add('streak');
      streakEl.textContent = `🔥 ${streak} weeks`;
      
      const goalDivEl = document.createElement('div');
      goalDivEl.classList.add('goal');
      goalDivEl.classList.add('private');
      goalDivEl.appendChild(checkboxEl);
      goalDivEl.appendChild(labelEl);
      goalDivEl.appendChild(streakEl);

      weeklyListEl.appendChild(goalDivEl);

    }
  } else {
    weeklyListEl.innerHTML = '<div class=goal private><label>Add a goal to get started</label></div>';
  }


  // LOAD MONTHLY GOALS
  const monthlyListEl = document.querySelector(`#monthly-goals`);
  
  if (goals.monthly.length) {
    for (const [goal, streak] of goals.monthly) {
      const checkboxEl = document.createElement('input');
      const labelEl = document.createElement('label');
      const streakEl = document.createElement('p');
      
      checkboxEl.type = "checkbox";
      checkboxEl.style.marginRight = "5px";
      labelEl.textContent = goal;
      streakEl.classList.add('streak');
      streakEl.textContent = `🔥 ${streak} months`;
      
      const goalDivEl = document.createElement('div');
      goalDivEl.classList.add('goal');
      goalDivEl.classList.add('private');
      goalDivEl.appendChild(checkboxEl);
      goalDivEl.appendChild(labelEl);
      goalDivEl.appendChild(streakEl);

      monthlyListEl.appendChild(goalDivEl);
    }
  } else {
    monthlyListEl.innerHTML = '<div class=goal private><label>Add a goal to get started</label></div>';
  }

}

// Do this everytime the webiste loads
loadGoals();


// Do this when a new goal is saved
function uploadGoal(section) {

  const newGoalEl = document.querySelector(`#new-${section}`);
  const newGoal = newGoalEl.value;
  newGoalEl.value = '';

  const radioEl = document.querySelector(`input[name="${section}-privacy"]:checked`)
  const privacyVal = radioEl.value;
  console.log(`Selected privacy value is ${privacyVal}`)

  if (!newGoal) {
    return
  }

  let goals = {daily: [], weekly: [], monthly: []};
  const goalsText = localStorage.getItem('goals');
  
  if (goalsText) {
    goals = JSON.parse(goalsText);
  }

  if (section == 'daily') {
    goals.daily.push([newGoal, 0, privacyVal]);
  } else if (section == 'weekly') {
    goals.weekly.push([newGoal, 0, privacyVal]);
  } else if (section == 'monthly') {
    goals.monthly.push([newGoal, 0, privacyVal]);
  }

  localStorage.setItem('goals', JSON.stringify(goals));

  reloadGoals();
}

function reloadGoals() {
  const dailyListEl = document.querySelector(`#daily-goals`);
  while (dailyListEl.firstChild) {
    dailyListEl.removeChild(dailyListEl.firstChild);
  }

  const weeklyListEl = document.querySelector(`#weekly-goals`);
  while (weeklyListEl.firstChild) {
    weeklyListEl.removeChild(weeklyListEl.firstChild);
  }

  const monthlyListEl = document.querySelector(`#monthly-goals`);
  while (monthlyListEl.firstChild) {
    monthlyListEl.removeChild(monthlyListEl.firstChild);
  }

  loadGoals();
}

function clearInput(section) {
  const newGoalEl = document.querySelector(`#new-${section}`);
  newGoalEl.value = '';

  const privacyEls = document.querySelectorAll(`input[name="${section}-privacy"]`)
  for (el of privacyEls) {
    if (el.value === 'public') {
      el.checked = true;
    }
  }
}




// localStorage.goals has the following format

//       goals = {
//         'daily': [[goal, streak, private/public], [goal, streak, private/public]],
//         'weekly': [[goal, streak, private/public], [goal, streak, private/public]], 
//         'monthly': [[goal, streak, private/public], [goal, streak, private/public]]
//       } 